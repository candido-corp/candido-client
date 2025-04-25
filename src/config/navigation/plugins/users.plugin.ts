// users.plugin.ts
import { registerNavigationPlugin } from '../register';
import { EnumNavigationPlugin } from '@/config/navigation/enums/EnumNavigationPlugin';
import { EnumRoutes } from '@/models/enums/EnumRoutes';
import { User, UserPen, MapPinHouse, SaveAll, Files, ChartColumn, Settings } from 'lucide-react';
import {EnumNavigationVisibility} from "@/config/navigation/enums/EnumNavigationVisibility.ts";

registerNavigationPlugin({
  id: EnumNavigationPlugin.USERS,
  navbar: {
    id: 'users',
    title: 'User',
    url: EnumRoutes.USER,
    icon: User,
    visibility: [EnumNavigationVisibility.DESKTOP, EnumNavigationVisibility.MOBILE]
  },
  sidebar: [
    { id: 'profile', title: 'Profile', url: EnumRoutes.USER, icon: User },
    { id: 'personal-data', title: 'Personal data', url: EnumRoutes.USER_DETAILS, icon: UserPen },
    { id: 'addresses', title: 'Addresses', url: EnumRoutes.USER_ADDRESSES, icon: MapPinHouse },
    { id: 'opportunities-saved', title: 'Opportunities saved', url: EnumRoutes.USER_OPPORTUNITIES_SAVED, icon: SaveAll },
    { id: 'documents', title: 'Documents', url: EnumRoutes.DOCUMENTS, icon: Files },
    { id: 'analytics-user', title: 'Analytics', url: EnumRoutes.ANALYTICS_USER, icon: ChartColumn },
    { id: 'settings-account', title: 'Settings', url: EnumRoutes.SETTINGS_ACCOUNT, icon: Settings },
  ],
});
