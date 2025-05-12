// users.plugin.ts
import { EnumNavigationPlugin } from '@/config/navigation/enums/EnumNavigationPlugin';
import { EnumNavigationVisibility } from '@/config/navigation/enums/EnumNavigationVisibility.ts';
import { EnumRoutes } from '@/models/enums/EnumRoutes';
import {
  ChartColumn,
  Files,
  MapPinHouse,
  SaveAll,
  Settings,
  User,
  UserPen,
} from 'lucide-react';
import { registerNavigationPlugin } from '../register';

registerNavigationPlugin({
  id: EnumNavigationPlugin.USERS,
  navbar: {
    id: 'users',
    title: 'User',
    url: EnumRoutes.USER,
    icon: User,
    visibility: [
      EnumNavigationVisibility.DESKTOP,
      EnumNavigationVisibility.MOBILE,
    ],
    needsAuth: true,
  },
  sidebar: [
    { id: 'profile', title: 'Profile', url: EnumRoutes.USER, icon: User },
    {
      id: 'personal-data',
      title: 'Personal data',
      url: EnumRoutes.USER_DETAILS,
      icon: UserPen,
    },
    {
      id: 'addresses',
      title: 'Addresses',
      url: EnumRoutes.USER_ADDRESSES,
      icon: MapPinHouse,
    },
    {
      id: 'opportunities-saved',
      title: 'Opportunities saved',
      url: EnumRoutes.USER_OPPORTUNITIES_SAVED,
      icon: SaveAll,
    },
    {
      id: 'documents',
      title: 'Documents',
      url: EnumRoutes.DOCUMENTS,
      icon: Files,
    },
    {
      id: 'analytics-user',
      title: 'Analytics',
      url: EnumRoutes.ANALYTICS_USER,
      icon: ChartColumn,
    },
    {
      id: 'settings-account',
      title: 'Settings',
      url: EnumRoutes.SETTINGS_ACCOUNT,
      icon: Settings,
    },
  ],
});
