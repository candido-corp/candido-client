// analytics.plugin.ts
import {registerNavigationPlugin} from '../register';
import {EnumNavigationPlugin} from '@/config/navigation/enums/EnumNavigationPlugin';
import {EnumRoutes} from '@/models/enums/EnumRoutes';
import {AppWindow, BookPlus, ChartColumn, ChartSpline, User} from 'lucide-react';
import {EnumNavigationVisibility} from "@/config/navigation/enums/EnumNavigationVisibility.ts";

registerNavigationPlugin({
  id: EnumNavigationPlugin.ANALYTICS,
  navbar: {
    id: 'analytics',
    title: 'Analytics',
    url: EnumRoutes.ANALYTICS,
    icon: ChartSpline,
    visibility: [EnumNavigationVisibility.MOBILE]
  },
  sidebar: [
    { id: 'overview-analytics', title: 'Overview', url: EnumRoutes.ANALYTICS, icon: ChartColumn },
    { id: 'applications-analytics', title: 'Applications', url: EnumRoutes.ANALYTICS_APPLICATIONS, icon: AppWindow },
    { id: 'forms-analytics', title: 'Forms', url: EnumRoutes.ANALYTICS_FORMS, icon: BookPlus },
    { id: 'user-analytics', title: 'User', url: EnumRoutes.ANALYTICS_USER, icon: User },
  ],
});
