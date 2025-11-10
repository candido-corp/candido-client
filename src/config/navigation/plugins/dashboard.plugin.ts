// dashboard.plugin.ts
import { EnumNavigationPlugin } from '@/config/navigation/enums/EnumNavigationPlugin.ts';
import { EnumNavigationVisibility } from '@/config/navigation/enums/EnumNavigationVisibility.ts';
import { EnumRoutes } from '@/models/enums/EnumRoutes';
import { ChartColumn, House } from 'lucide-react';
import { registerNavigationPlugin } from '../register';

/**
 * Dashboard plugin defines both navbar and sidebar entries for 'dashboard'.
 */
registerNavigationPlugin({
  id: EnumNavigationPlugin.DASHBOARD,
  navbar: {
    id: 'dashboard',
    title: 'Dashboard',
    url: EnumRoutes.DASHBOARD,
    icon: House,
    visibility: [
      EnumNavigationVisibility.DESKTOP,
      EnumNavigationVisibility.MOBILE,
    ],
    needsAuth: true,
  },
  sidebar: [
    {
      id: 'overview',
      title: 'Overview',
      url: EnumRoutes.DASHBOARD,
      icon: House,
    },
    {
      id: 'analytics',
      title: 'Analytics',
      url: EnumRoutes.ANALYTICS,
      icon: ChartColumn,
    },
  ],
});
