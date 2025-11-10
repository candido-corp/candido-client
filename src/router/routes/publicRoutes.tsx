import { RouteObject } from 'react-router-dom';
import OpportunitiesPage from '@/pages/opportunities/OpportunitiesPage';
import OpportunityPage from '@/pages/opportunities/OpportunityPage';
import OpportunityApplyPage from '@/pages/opportunities/OpportunityApplyPage';
import { EnumRoutes } from '@/models/enums/EnumRoutes';
import ErrorPage from '@/pages/ErrorPage';
import SidebarLayout from "@/layouts/SidebarLayout.tsx";
import {EnumNavigationPlugin} from "@/config/navigation/enums/EnumNavigationPlugin.ts";
import {RouteHandle} from "@/config/navigation";

export const publicRoutes = (): RouteObject[] => [
    {
        path: EnumRoutes.HOME,
        element: <SidebarLayout />,
        handle: {
            pluginId: EnumNavigationPlugin.OPPORTUNITIES
        } as RouteHandle,
        errorElement: <ErrorPage />,
        children: [
            { index: true, element: <OpportunitiesPage /> },
            { path: EnumRoutes.OPPORTUNITIES, element: <OpportunitiesPage /> },
            { path: EnumRoutes.OPPORTUNITIES_OPPORTUNITY, element: <OpportunityPage /> },
            { path: EnumRoutes.OPPORTUNITIES_OPPORTUNITY_APPLY, element: <OpportunityApplyPage /> },
        ],
    },
];
