import { RouteObject } from 'react-router-dom';
import { EnumRoutes } from '@/models/enums/EnumRoutes';
import SidebarLayout from '@/layouts/SidebarLayout';
import AnalyticsPage from '@/pages/analytics/AnalyticsPage';
import AnalyticsApplicationsPage from '@/pages/analytics/AnalyticsApplicationsPage';
import AnalyticsFormsPage from '@/pages/analytics/AnalyticsFormsPage';
import AnalyticsUsersPage from '@/pages/analytics/AnalyticsUsersPage';
import {EnumNavigationPlugin} from "@/config/navigation/enums/EnumNavigationPlugin.ts";
import {RouteHandle} from "@/config/navigation";

export const routesAnalytics = (): RouteObject[] => [
  {
    path: EnumRoutes.ANALYTICS,
    element: <SidebarLayout />,
    handle: {
      pluginId: EnumNavigationPlugin.ANALYTICS
    } as RouteHandle,
    children: [
      { index: true, element: <AnalyticsPage /> },
      { path: EnumRoutes.ANALYTICS_APPLICATIONS, element: <AnalyticsApplicationsPage /> },
      { path: EnumRoutes.ANALYTICS_FORMS, element: <AnalyticsFormsPage /> },
      { path: EnumRoutes.ANALYTICS_USER, element: <AnalyticsUsersPage /> },
    ],
  },
];
