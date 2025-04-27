import { RouteObject } from 'react-router-dom';
import { EnumRoutes } from '@/models/enums/EnumRoutes';
import SidebarLayout from '@/layouts/SidebarLayout';
import SettingsPage from '@/pages/settings/SettingsPage';
import SettingsAccountPage from '@/pages/settings/SettingsAccountPage';
import SettingsCommunicationPage from '@/pages/settings/SettingsCommunicationPage';
import SettingsBillingPage from '@/pages/settings/SettingsBillingPage';
import SettingsPreferencesPage from '@/pages/settings/SettingsPreferencesPage';
import SettingsSecurityPage from '@/pages/settings/SettingsSecurityPage';
import {EnumNavigationPlugin} from "@/config/navigation/enums/EnumNavigationPlugin.ts";
import {RouteHandle} from "@/config/navigation";

export const routesSettings = (): RouteObject[] => [
    {
        path: EnumRoutes.SETTINGS,
        element: <SidebarLayout />,
        handle: {
            pluginId: EnumNavigationPlugin.SETTINGS
        } as RouteHandle,
        children: [
            { index: true, element: <SettingsPage /> },
            { path: EnumRoutes.SETTINGS_ACCOUNT, element: <SettingsAccountPage /> },
            { path: EnumRoutes.SETTINGS_COMMUNICATION, element: <SettingsCommunicationPage /> },
            { path: EnumRoutes.SETTINGS_BILLING, element: <SettingsBillingPage /> },
            { path: EnumRoutes.SETTINGS_PREFERENCES, element: <SettingsPreferencesPage /> },
            { path: EnumRoutes.SETTINGS_SECURITY, element: <SettingsSecurityPage /> },
        ],
    },
];
