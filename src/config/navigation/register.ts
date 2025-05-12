import { NAVIGATION_CONFIG } from '@/config/navigation/_navigation.config.ts';
import { EnumNavigationVisibility } from '@/config/navigation/enums/EnumNavigationVisibility.ts';
import { EnumNavigationPlugin } from './enums/EnumNavigationPlugin';
import { FlatNavItem, NavigationPlugin } from './types';

const plugins: NavigationPlugin[] = [];

/**
 * Registers a navigation plugin (navbar + sidebar).
 * @param plugin
 */
export const registerNavigationPlugin = (plugin: NavigationPlugin) => {
  if (!plugin.id) throw new Error('Navigation plugin must have an id');
  if (plugins.some((p) => p.id === plugin.id)) {
    throw new Error(`Plugin with id '${plugin.id}' is already registered`);
  }
  plugins.push(plugin);
};

/**
 * Returns all plugins visible in config order.
 * if isUserAuthenticated is undefined, it returns all plugins.
 * if isUserAuthenticated is true, it returns all plugins that need authentication.
 * if isUserAuthenticated is false, it returns all plugins that do not need authentication.
 * @param isUserAuthenticated
 * @returns {NavigationPlugin[]}
 */
export const getNavigationPlugins = (
  isUserAuthenticated?: boolean
): NavigationPlugin[] =>
  NAVIGATION_CONFIG.map(({ id }) => plugins.find((p) => p.id === id)).filter(
    (p): p is NavigationPlugin =>
      p !== undefined &&
      p.navbar.visibility !== undefined &&
      (isUserAuthenticated === undefined ||
        p.navbar.needsAuth === isUserAuthenticated ||
        p.navbar.needsAuth === false)
  );

/**
 * Returns all registered navbar entries in config order.
 * @param isUserAuthenticated
 * @returns {FlatNavItem[]}
 */
export const getNavbarItems = (isUserAuthenticated: boolean): FlatNavItem[] =>
  getNavigationPlugins(isUserAuthenticated)
    .map((plugin) => plugin.navbar)
    .filter(
      (item): item is FlatNavItem =>
        item !== undefined &&
        item.visibility !== undefined &&
        item.visibility?.indexOf(EnumNavigationVisibility.DESKTOP) > -1
    );

/**
 * Returns all plugins with mobile visibility in config order.
 * @param isUserAuthenticated
 * @returns {NavigationPlugin[]}
 */
export const getMobileNavigationPlugins = (
  isUserAuthenticated: boolean
): NavigationPlugin[] =>
  getNavigationPlugins(isUserAuthenticated).filter(
    (p) =>
      p.navbar &&
      p.navbar.visibility &&
      p.navbar.visibility?.indexOf(EnumNavigationVisibility.MOBILE) > -1
  );

/**
 * Returns a specific navigation plugin by pluginId.
 * @param pluginId
 * @returns {NavigationPlugin | undefined}
 */
export const getCurrentPlugin = (
  pluginId: EnumNavigationPlugin
): NavigationPlugin | undefined => {
  return getNavigationPlugins().find((p) => p.id === pluginId);
};
