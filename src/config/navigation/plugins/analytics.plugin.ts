// analytics.plugin.ts
import { EnumNavigationPlugin } from '@/config/navigation/enums/EnumNavigationPlugin';
import { EnumNavigationVisibility } from '@/config/navigation/enums/EnumNavigationVisibility.ts';
import { EnumRoutes } from '@/models/enums/EnumRoutes';
import {
  AppWindow,
  BookPlus,
  ChartColumn,
  ChartSpline,
  User,
} from 'lucide-react';
import { registerNavigationPlugin } from '../register';

registerNavigationPlugin({
  id: EnumNavigationPlugin.ANALYTICS,
  navbar: {
    id: 'analytics',
    title: 'Analytics',
    url: EnumRoutes.ANALYTICS,
    icon: ChartSpline,
    visibility: [EnumNavigationVisibility.MOBILE],
    needsAuth: true,
  },
  sidebar: [
    {
      id: 'overview-analytics',
      title: 'Overview',
      url: EnumRoutes.ANALYTICS,
      icon: ChartColumn,
    },
    {
      id: 'applications-analytics',
      title: 'Applications',
      url: EnumRoutes.ANALYTICS_APPLICATIONS,
      icon: AppWindow,
    },
    {
      id: 'forms-analytics',
      title: 'Forms',
      url: EnumRoutes.ANALYTICS_FORMS,
      icon: BookPlus,
    },
    {
      id: 'user-analytics',
      title: 'User',
      url: EnumRoutes.ANALYTICS_USER,
      icon: User,
    },
  ],
});
