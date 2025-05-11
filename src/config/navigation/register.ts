import { NAVIGATION_CONFIG } from '@/config/navigation/_navigation.config.ts';
import { EnumNavigationVisibility } from '@/config/navigation/enums/EnumNavigationVisibility.ts';
import { EnumNavigationPlugin } from './enums/EnumNavigationPlugin';
import { FlatNavItem, NavigationPlugin } from './types';

const plugins: NavigationPlugin[] = [];

/**
 * Registers a navigation plugin (navbar + sidebar).
 */
export const registerNavigationPlugin = (plugin: NavigationPlugin) => {
  if (!plugin.id) throw new Error('Navigation plugin must have an id');
  if (plugins.some((p) => p.id === plugin.id)) {
    throw new Error(`Plugin with id '${plugin.id}' is already registered`);
  }
  plugins.push(plugin);
};

/**
 * Returns all registered navbar entries in config order.
 */
export const getNavbarItems = (isUserAuthenticated: boolean): FlatNavItem[] =>
  NAVIGATION_CONFIG.map(
    ({ id }) => plugins.find((p) => p.id === id)?.navbar
  ).filter(
    (item): item is FlatNavItem =>
      item !== undefined &&
      item.visibility !== undefined &&
      item.visibility?.indexOf(EnumNavigationVisibility.DESKTOP) > -1 &&
      (item.needsAuth === isUserAuthenticated || item.needsAuth === false)
  );

/**
 * Returns all plugins visible in config order.
 */
export const getNavigationPlugins = (): NavigationPlugin[] =>
  NAVIGATION_CONFIG.map(({ id }) => plugins.find((p) => p.id === id)).filter(
    (p): p is NavigationPlugin =>
      p !== undefined && p.navbar.visibility !== undefined
  );

/**
 * Returns all plugins with mobile visibility in config order.
 */
export const getMobileNavigationPlugins = (
  isUserAuthenticated: boolean
): NavigationPlugin[] =>
  getNavigationPlugins().filter(
    (p) =>
      p.navbar &&
      p.navbar.visibility &&
      p.navbar.visibility?.indexOf(EnumNavigationVisibility.MOBILE) > -1 &&
      (p.navbar.needsAuth === isUserAuthenticated ||
        p.navbar.needsAuth === false)
  );

/**
 * Returns a specific navigation plugin by pluginId.
 */
export const getCurrentPlugin = (
  pluginId: EnumNavigationPlugin
): NavigationPlugin | undefined => {
  return getNavigationPlugins().find((p) => p.id === pluginId);
};
