// applications.plugin.ts
import { registerNavigationPlugin } from '../register';
import { EnumNavigationPlugin } from '@/config/navigation/enums/EnumNavigationPlugin';
import { EnumRoutes } from '@/models/enums/EnumRoutes';
import { AppWindow, History, Send, ChartColumn } from 'lucide-react';

registerNavigationPlugin({
  id: EnumNavigationPlugin.APPLICATIONS,
  navbar: {
    id: 'applications',
    title: 'Applications',
    url: EnumRoutes.APPLICATIONS,
    icon: AppWindow,
  },
  sidebar: [
    { id: 'in-progress', title: 'In progress', url: EnumRoutes.APPLICATIONS, icon: AppWindow },
    { id: 'history', title: 'History', url: EnumRoutes.APPLICATIONS_HISTORY, icon: History },
    { id: 'submitted', title: 'Submitted', url: EnumRoutes.APPLICATIONS_SUBMITTED, icon: Send },
    { id: 'analytics-applications', title: 'Analytics', url: EnumRoutes.ANALYTICS_APPLICATIONS, icon: ChartColumn },
  ],
});
