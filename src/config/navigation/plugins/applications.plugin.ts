// applications.plugin.ts
import { registerNavigationPlugin } from '../register';
import { EnumNavigationPlugin } from '@/config/navigation/enums/EnumNavigationPlugin';
import { EnumRoutes } from '@/models/enums/EnumRoutes';
import {
  AppWindow,
  History,
  Send,
  ChartColumn,
  CircleCheck,
  ClockAlert,
  CircleDot,
  MessageSquareText
} from 'lucide-react';
import {EnumNavigationVisibility} from "@/config/navigation/enums/EnumNavigationVisibility.ts";

registerNavigationPlugin({
  id: EnumNavigationPlugin.APPLICATIONS,
  navbar: {
    id: 'applications',
    title: 'Applications',
    url: EnumRoutes.APPLICATIONS,
    icon: AppWindow,
    visibility: [EnumNavigationVisibility.DESKTOP, EnumNavigationVisibility.MOBILE]
  },
  sidebar: [
    { id: 'in-progress', title: 'In progress', url: EnumRoutes.APPLICATIONS, icon: AppWindow },

    { id: 'history', title: 'History', url: EnumRoutes.APPLICATIONS_HISTORY, icon: History },
    { id: 'history-completed', title: 'Completed', parentId: 'history', url: EnumRoutes.APPLICATIONS_HISTORY + "#completed", icon: CircleCheck },
    { id: 'history-expired', title: 'Expired', parentId: 'history', url: EnumRoutes.APPLICATIONS_HISTORY + "#expired", icon: ClockAlert },

    { id: 'submitted', title: 'Submitted', url: EnumRoutes.APPLICATIONS_SUBMITTED, icon: Send },
    { id: 'submitted-on-going', title: 'On going', parentId: 'submitted', url: EnumRoutes.APPLICATIONS_SUBMITTED + "#on-going", icon: CircleDot },
    { id: 'submitted-under-review', title: 'Under review', parentId: 'submitted', url: EnumRoutes.APPLICATIONS_SUBMITTED + "#under-review", icon: MessageSquareText },

    { id: 'analytics-applications', title: 'Analytics', url: EnumRoutes.ANALYTICS_APPLICATIONS, icon: ChartColumn },
  ],
});
