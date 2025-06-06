import { RouteHandle } from '@/config/navigation';
import { EnumNavigationPlugin } from '@/config/navigation/enums/EnumNavigationPlugin.ts';
import SidebarLayout from '@/layouts/SidebarLayout';
import { EnumRoutes } from '@/models/enums/EnumRoutes';
import UserAddressesPage from '@/pages/user/UserAddressesPage';
import UserDetailsPage from '@/pages/user/UserDetailsPage';
import UserOpportunitiesSavedPage from '@/pages/user/UserOpportunitiesSavedPage';
import UserPage from '@/pages/user/UserPage';
import { AuthContextType } from '@/providers/AuthProvider.tsx';
import { NotificationContextType } from '@/providers/NotificationProvider';
import actionAccountChangeDetails from '@/router/actions/auth/actionAccountChangeDetails';
import actionForgotPassword from '@/router/actions/auth/actionForgotPassword';
import actionUserAddress from '@/router/actions/auth/actionUserAddress';
import loaderUser, { LOADER_USER_ID } from '@/router/loaders/loaderUser';
import loaderUserAddresses from '@/router/loaders/loaderUserAddresses';
import { RouteObject } from 'react-router-dom';

export const routesUser = (
  _authContext: AuthContextType,
  notificationContext: NotificationContextType
): RouteObject[] => [
  {
    path: EnumRoutes.USER,
    element: <SidebarLayout />,
    handle: {
      pluginId: EnumNavigationPlugin.USERS,
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
        element: <UserAddressesPage />,
        loader: loaderUserAddresses,
        action: actionUserAddress(notificationContext),
      },
      {
        path: EnumRoutes.USER_OPPORTUNITIES_SAVED,
        element: <UserOpportunitiesSavedPage />,
      },
    ],
  },
];
