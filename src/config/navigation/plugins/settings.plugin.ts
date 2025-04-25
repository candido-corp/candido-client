// settings.plugin.ts
import { registerNavigationPlugin } from '../register';
import { EnumNavigationPlugin } from '@/config/navigation/enums/EnumNavigationPlugin';
import { EnumRoutes } from '@/models/enums/EnumRoutes';
import { Settings, User, Bell, CreditCard, Settings2, Shield } from 'lucide-react';

registerNavigationPlugin({
  id: EnumNavigationPlugin.SETTINGS,
  navbar: {
    id: 'settings',
    title: 'Settings',
    url: EnumRoutes.SETTINGS,
    icon: Settings,
    visible: false
  },
  sidebar: [
    { id: 'settings', title: 'Settings', url: EnumRoutes.SETTINGS, icon: Settings },
    { id: 'account', title: 'Account', url: EnumRoutes.SETTINGS_ACCOUNT, icon: User },
    { id: 'communication', title: 'Communication', url: EnumRoutes.SETTINGS_COMMUNICATION, icon: Bell },
    { id: 'billing', title: 'Billing', url: EnumRoutes.SETTINGS_BILLING, icon: CreditCard },
    { id: 'preferences', title: 'Preferences', url: EnumRoutes.SETTINGS_PREFERENCES, icon: Settings2 },
    { id: 'security', title: 'Security', url: EnumRoutes.SETTINGS_SECURITY, icon: Shield },
  ],
});
