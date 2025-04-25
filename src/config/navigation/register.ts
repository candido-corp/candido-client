import {FlatNavItem, NavigationPlugin} from './types';
import {NAVIGATION_CONFIG} from "@/config/navigation/_navigation.config.ts";
import {EnumNavigationVisibility} from "@/config/navigation/enums/EnumNavigationVisibility.ts";

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
export const getNavbarItems = (): FlatNavItem[] =>
  NAVIGATION_CONFIG
    .map(({ id }) =>
      plugins.find((p) => p.id === id)?.navbar
    )
    .filter((item): item is FlatNavItem =>
      item !== undefined &&
      item.visibility !== undefined &&
      item.visibility?.indexOf(EnumNavigationVisibility.DESKTOP) > -1
    );

/**
 * Returns all plugins visible in config order (for mobile menu).
 */
export const getFullNavigationPlugins = (): NavigationPlugin[] =>
  NAVIGATION_CONFIG
    .map(({ id }) => plugins.find((p) => p.id === id))
    .filter((p): p is NavigationPlugin =>
      p !== undefined &&
      p.navbar.visibility !== undefined &&
      p.navbar.visibility?.indexOf(
        EnumNavigationVisibility.MOBILE
      ) > -1
    );