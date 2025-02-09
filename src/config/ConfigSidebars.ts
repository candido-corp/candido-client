import { EnumRoutes } from '@/models/enums/EnumRoutes';
import {
  ChartColumn,
  LucideIcon,
  MapPinHouse,
  Save,
  SaveAll,
  Settings,
  User,
} from 'lucide-react';
import { LinkItem } from './ConfigNavigation';

export type SidebarItem = LinkItem & {
  icon?: LucideIcon;
  isActive?: boolean;
  items?: SidebarItem[];
  className?: string;
};

export const dashboardSidebarItems: SidebarItem[] = [
  {
    title: 'Applied opportunities',
    url: EnumRoutes.USER_OPPORTUNITIES,
    icon: User,
  },
  {
    title: 'Saved opportunities',
    url: EnumRoutes.USER_OPPORTUNITIES_SAVED,
    icon: MapPinHouse,
  },
  {
    title: 'Created opportunities',
    url: EnumRoutes.USER_OPPORTUNITIES_HISTORY,
    icon: MapPinHouse,
  },
  {
    title: 'Analytics',
    url: EnumRoutes.USER_OPPORTUNITIES_SAVED,
    icon: MapPinHouse,
  },
];

export const documentsSidebarItems: SidebarItem[] = [
  {
    title: 'Saved documents',
    url: EnumRoutes.USER,
    icon: Save,
  },
  {
    title: 'Additional documents',
    url: EnumRoutes.USER_ADDRESSES,
    icon: SaveAll,
  },
];

export const userSidebarItems: SidebarItem[] = [
  {
    title: 'Personal data',
    url: EnumRoutes.USER,
    icon: User,
  },
  {
    title: 'Addresses',
    url: EnumRoutes.USER_ADDRESSES,
    icon: MapPinHouse,
  },
  {
    title: 'Analytics',
    url: EnumRoutes.USER_ADDRESSES, //TODO change
    icon: ChartColumn,
  },
  {
    title: 'Settings',
    icon: Settings,
    items: [
      {
        title: 'Notifications',
        url: EnumRoutes.USER_OPPORTUNITIES,
      },
      {
        title: 'Language',
        url: EnumRoutes.USER_OPPORTUNITIES_HISTORY,
      },
      {
        title: 'Theme',
        url: EnumRoutes.USER_OPPORTUNITIES_SAVED,
      },
      {
        title: 'Privacy',
        url: EnumRoutes.USER_OPPORTUNITIES_STATS,
      },
      {
        title: 'Delete my account',
        url: EnumRoutes.USER_OPPORTUNITIES_STATS,
      },
    ],
  },
];

export const CreateYourOwnSidebarItems: SidebarItem[] = [
  {
    title: 'In progress',
    url: EnumRoutes.USER,
    icon: User,
  },
  {
    title: 'Ready to publish',
    url: EnumRoutes.USER_ADDRESSES,
    icon: MapPinHouse,
  },
];
