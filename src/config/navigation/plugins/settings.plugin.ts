// settings.plugin.ts
import { EnumNavigationPlugin } from '@/config/navigation/enums/EnumNavigationPlugin';
import { EnumNavigationVisibility } from '@/config/navigation/enums/EnumNavigationVisibility.ts';
import { EnumRoutes } from '@/models/enums/EnumRoutes';
import {
  Bell,
  CreditCard,
  Settings,
  Settings2,
  Shield,
  User,
} from 'lucide-react';
import { registerNavigationPlugin } from '../register';

registerNavigationPlugin({
  id: EnumNavigationPlugin.SETTINGS,
  navbar: {
    id: 'settings',
    title: 'Settings',
    url: EnumRoutes.SETTINGS,
    icon: Settings,
    visibility: [EnumNavigationVisibility.MOBILE],
    needsAuth: true,
  },
  sidebar: [
    {
      id: 'settings',
      title: 'Settings',
      url: EnumRoutes.SETTINGS,
      icon: Settings,
    },
    {
      id: 'account',
      title: 'Account',
      url: EnumRoutes.SETTINGS_ACCOUNT,
      icon: User,
    },
    {
      id: 'communication',
      title: 'Communication',
      url: EnumRoutes.SETTINGS_COMMUNICATION,
      icon: Bell,
    },
    {
      id: 'billing',
      title: 'Billing',
      url: EnumRoutes.SETTINGS_BILLING,
      icon: CreditCard,
    },
    {
      id: 'preferences',
      title: 'Preferences',
      url: EnumRoutes.SETTINGS_PREFERENCES,
      icon: Settings2,
    },
    {
      id: 'security',
      title: 'Security',
      url: EnumRoutes.SETTINGS_SECURITY,
      icon: Shield,
    },
  ],
});
