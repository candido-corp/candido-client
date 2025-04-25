import {FlatNavItem, NavigationPlugin, NavItem} from './types';
import {buildNavTree} from "@/config/navigation/builder.ts";
import {NAVBAR_PLUGIN_ORDER} from "@/config/navigation/navigationOrder.ts";

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
 * Returns all registered navbar entries.
 */
export const getNavbarItems = (): FlatNavItem[] =>
  NAVBAR_PLUGIN_ORDER
    .map((id) => plugins.find((p) => p.id === id)?.navbar)
    .filter((item): item is FlatNavItem => item !== undefined);

/**
 * Returns sidebar items for a specific plugin id.
 */
export const getSidebarItems = (pluginId: string) => {
    const plugin = plugins.find((p) => p.id === pluginId);
    return plugin?.sidebar ?? [];
};

/**
 * Flattens and returns all sidebar items from all plugins.
 */
export const getAllSidebarFlat = (): FlatNavItem[] =>
    plugins.flatMap((p) => p.sidebar ?? []);

/**
 * Builds a tree of NavItems from a flat list using parentId.
 * @param pluginId
 */
export const getSidebarTree = (pluginId: string): NavItem[] => {
    return buildNavTree(getSidebarItems(pluginId));
};

/**
 * Builds the full sidebar tree for all plugins.
 * Each plugin becomes a parent node, its sidebar items are children.
 */
export const getFullNavigationPlugins = (): NavigationPlugin[] => {
    return NAVBAR_PLUGIN_ORDER
      .map((id) => plugins.find((p) => p.id === id))
      .filter((plugin): plugin is NavigationPlugin => plugin !== undefined);
};
