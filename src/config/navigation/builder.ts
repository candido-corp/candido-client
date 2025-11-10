import {FlatNavItem, NavigationPlugin, NavItem} from './types';

/**
 * Builds a tree of NavItems from a flat list using parentId.
 * @param plugin
 */
export function buildPluginNavTree(plugin: NavigationPlugin): NavItem | undefined {
    if (!plugin.navbar) return undefined;

    const sidebarTree = buildNavTree(plugin.sidebar ?? []);

    return {
        ...plugin.navbar,
        children: sidebarTree,
    };
}

/**
 * Builds a tree of NavItems from a flat list using parentId.
 */
export function buildNavTree(items: FlatNavItem[]): NavItem[] {
    const lookup = new Map<string, NavItem>();

    // Create a map of all items with empty children
    items.forEach((item) => {
        lookup.set(item.id, { ...item, children: [] });
    });

    const roots: NavItem[] = [];

    // Link children to their respective parent
    items.forEach((item) => {
        const node = lookup.get(item.id)!;
        if (item.parentId) {
            lookup.get(item.parentId)?.children?.push(node);
        } else {
            roots.push(node);
        }
    });

    return roots;
}
