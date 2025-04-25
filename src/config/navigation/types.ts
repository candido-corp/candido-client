import { LucideIcon } from 'lucide-react';
import {EnumNavigationPlugin} from "@/config/navigation/enums/EnumNavigationPlugin.ts";

/**
 * Flat representation of a navigation item.
 * Can later be transformed into a tree via parentId.
 */
export type FlatNavItem = {
    id: string;
    parentId?: string;
    title: string;
    url: string;
    icon?: LucideIcon;
    visible?: boolean | (() => boolean);
    roles?: string[];
};

/**
 * FlatNavItem with active state, used in rendering.
 */
export type FlatNavItemWithActive = FlatNavItem & {
    isActive: boolean;
};

/**
 * NavItem with recursive children, used in rendering.
 */
export type NavItem = FlatNavItem & {
    children?: NavItem[];
};

/**
 * A plugin represents a navigation module (e.g., dashboard, forms).
 */
export type NavigationPlugin = {
    id: string;
    navbar?: FlatNavItem;
    sidebar?: FlatNavItem[];
};

/**
 * Enum for navigation plugins.
 */
export type RouteHandle = {
    pluginId: EnumNavigationPlugin;
    [key: string]: any;
};