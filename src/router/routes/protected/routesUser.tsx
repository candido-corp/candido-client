import { RouteObject } from 'react-router-dom';
import SidebarLayout from '@/layouts/SidebarLayout';
import { EnumRoutes } from '@/models/enums/EnumRoutes';
import UserPage from '@/pages/user/UserPage';
import UserDetailsPage from '@/pages/user/UserDetailsPage';
import UserSettingsPage from '@/pages/user/UserAddressesPage';
import UserOpportunitiesSavedPage from '@/pages/user/UserOpportunitiesSavedPage';
import loaderUser, { LOADER_USER_ID } from '@/router/loaders/loaderUser';
import actionAccountChangeDetails from '@/router/actions/auth/actionAccountChangeDetails';
import actionForgotPassword from '@/router/actions/auth/actionForgotPassword';
import { NotificationContextType } from '@/providers/NotificationProvider';
import {AuthContextType} from "@/providers/AuthProvider.tsx";
import {EnumNavigationPlugin} from "@/config/navigation/enums/EnumNavigationPlugin.ts";
import {RouteHandle} from "@/config/navigation";

export const routesUser = (_authContext: AuthContextType, notificationContext: NotificationContextType): RouteObject[] => [
    {
        path: EnumRoutes.USER,
        element: <SidebarLayout />,
        handle: {
            pluginId: EnumNavigationPlugin.USERS
        } as RouteHandle,
        loader: loaderUser,
        id: LOADER_USER_ID,
        children: [
            {
                index: true,
                element: <UserPage />,
                action: actionForgotPassword(notificationContext),
            },
            {
                path: EnumRoutes.USER_DETAILS,
                element: <UserDetailsPage />,
                action: actionAccountChangeDetails(notificationContext),
            },
            {
                path: EnumRoutes.USER_ADDRESSES,
                element: <UserSettingsPage />,
            },
            {
                path: EnumRoutes.USER_OPPORTUNITIES_SAVED,
                element: <UserOpportunitiesSavedPage />,
            },
        ],
    },
];
