// Auto-import all navigation plugins
import.meta.glob('./plugins/*.plugin.ts', { eager: true });

// Export navigation utilities
export * from './builder';
export * from './register';
export * from './types';

import { getNavbarItems, getSidebarItems, getAllSidebarFlat } from './register';

export const Navigation = {
    getNavbarItems,
    getSidebarItems,
    getAllSidebarFlat,
};
