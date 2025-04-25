import { RouteObject } from 'react-router-dom';
import { EnumRoutes } from '@/models/enums/EnumRoutes';
import DashboardPage from '@/pages/DashboardPage';
import SidebarLayout from '@/layouts/SidebarLayout';
import {EnumNavigationPlugin} from "@/config/navigation/enums/EnumNavigationPlugin.ts";
import {RouteHandle} from "@/config/navigation";

export const routesDashboard = (): RouteObject[] => [
    {
        path: EnumRoutes.DASHBOARD,
        element: <SidebarLayout />,
        handle: {
            pluginId: EnumNavigationPlugin.DASHBOARD
        } as RouteHandle,
        children: [
            { path: EnumRoutes.DASHBOARD, element: <DashboardPage /> },
        ],
    },
];
