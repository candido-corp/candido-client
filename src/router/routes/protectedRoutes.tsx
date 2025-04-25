import { RouteObject } from 'react-router-dom';
import ErrorPage from '@/pages/ErrorPage';
import loaderProtected from '@/router/loaders/_common/loaderProtected';
import { AuthContextType } from '@/providers/AuthProvider.tsx';
import { NotificationContextType } from '@/providers/NotificationProvider.tsx';
import {routesUser} from "@/router/routes/protected/routesUser.tsx";
import {routesApplications} from "@/router/routes/protected/routesApplications.tsx";
import {routesDashboard} from "@/router/routes/protected/routesDashboard.tsx";
import {routesForms} from "@/router/routes/protected/routesForms.tsx";
import {routesDocuments} from "@/router/routes/protected/routesDocuments.tsx";
import {routesAnalytics} from "@/router/routes/protected/routesAnalytics.tsx";
import {routesSettings} from "@/router/routes/protected/routesSettings.tsx";

export const protectedRoutes = (authContext: AuthContextType, notificationContext: NotificationContextType): RouteObject[] => [
    {
        loader: loaderProtected(authContext),
        errorElement: <ErrorPage />,
        children: [
            ...routesUser(authContext, notificationContext),
            ...routesDashboard(),
            ...routesApplications(),
            ...routesForms(),
            ...routesDocuments(),
            ...routesAnalytics(),
            ...routesSettings(),
        ],
    },
];
