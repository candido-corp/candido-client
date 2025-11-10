import { RouteHandle } from '@/config/navigation';
import { EnumNavigationPlugin } from '@/config/navigation/enums/EnumNavigationPlugin.ts';
import SidebarLayout from '@/layouts/SidebarLayout';
import { EnumRoutes } from '@/models/enums/EnumRoutes';
import SettingsAccountPage from '@/pages/settings/SettingsAccountPage';
import SettingsBillingPage from '@/pages/settings/SettingsBillingPage';
import SettingsCommunicationPage from '@/pages/settings/SettingsCommunicationPage';
import SettingsPage from '@/pages/settings/SettingsPage';
import SettingsPreferencesPage from '@/pages/settings/SettingsPreferencesPage';
import SettingsSecurityPage from '@/pages/settings/SettingsSecurityPage';
import { NotificationContextType } from '@/providers/NotificationProvider';
import actionAccountChangeSettings from '@/router/actions/auth/actionAccountChangeSettings';
import { RouteObject } from 'react-router-dom';

export const routesSettings = (
  notificationContext: NotificationContextType
): RouteObject[] => [
  {
    path: EnumRoutes.SETTINGS,
    element: <SidebarLayout />,
    handle: {
      pluginId: EnumNavigationPlugin.SETTINGS,
    } as RouteHandle,
    children: [
      { index: true, element: <SettingsPage /> },
      { path: EnumRoutes.SETTINGS_ACCOUNT, element: <SettingsAccountPage /> },
      {
        path: EnumRoutes.SETTINGS_COMMUNICATION,
        element: <SettingsCommunicationPage />,
      },
      { path: EnumRoutes.SETTINGS_BILLING, element: <SettingsBillingPage /> },
      {
        path: EnumRoutes.SETTINGS_PREFERENCES,
        element: <SettingsPreferencesPage />,
        action: actionAccountChangeSettings(notificationContext),
      },
      { path: EnumRoutes.SETTINGS_SECURITY, element: <SettingsSecurityPage /> },
    ],
  },
];
