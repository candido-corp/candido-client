import { RouteObject } from 'react-router-dom';
import { EnumRoutes } from '@/models/enums/EnumRoutes';
import ApplicationsPage from '@/pages/applications/ApplicationsPage';
import ApplicationsHistoryPage from '@/pages/applications/ApplicationsHistoryPage';
import ApplicationsSubmittedPage from '@/pages/applications/ApplicationsSubmittedPage';
import SidebarLayout from '@/layouts/SidebarLayout';
import {EnumNavigationPlugin} from "@/config/navigation/enums/EnumNavigationPlugin.ts";
import {RouteHandle} from "@/config/navigation";

export const routesApplications = (): RouteObject[] => [
  {
    path: EnumRoutes.APPLICATIONS,
    element: <SidebarLayout />,
    handle: {
      pluginId: EnumNavigationPlugin.APPLICATIONS
    } as RouteHandle,
    children: [
      { index: true, element: <ApplicationsPage /> },
      { path: EnumRoutes.APPLICATIONS_HISTORY, element: <ApplicationsHistoryPage /> },
      { path: EnumRoutes.APPLICATIONS_SUBMITTED, element: <ApplicationsSubmittedPage /> },
    ],
  },
];
