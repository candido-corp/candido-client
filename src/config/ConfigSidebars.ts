import { EnumRoutes } from '@/models/enums/EnumRoutes';
import {
  ChartColumn,
  House,
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
    title: 'Overview',
    url: EnumRoutes.DASHBOARD,
    icon: House,
  },
  {
    title: 'Analytics',
    url: EnumRoutes.USER_OPPORTUNITIES_SAVED,
    icon: ChartColumn,
  },
];

export const documentsSidebarItems: SidebarItem[] = [
  {
    title: 'Saved documents',
    url: EnumRoutes.USER,
    icon: Save,
  },
  {
    title: 'Upload documents',
    url: EnumRoutes.DOCUMENTS_UPLOAD,
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
    title: 'Documents',
    url: EnumRoutes.DOCUMENTS,
    icon: ChartColumn,
  },
  {
    title: 'Analytics',
    url: EnumRoutes.ANALYTICS_USERS,
    icon: ChartColumn,
  },
  {
    title: 'Settings',
    url: EnumRoutes.SETTINGS_ACCOUNT,
    icon: Settings,
  },
];

export const applicationsSidebarItems: SidebarItem[] = [
  {
    title: 'In progress',
    url: EnumRoutes.APPLICATIONS,
    icon: SaveAll,
  },
  {
    title: 'History',
    url: EnumRoutes.APPLICATIONS_HISTORY,
    icon: Save,
    items: [
      {
        title: 'Complete',
        url: EnumRoutes.APPLICATIONS_HISTORY + '#applications-complete',
      },
      {
        title: 'Expired',
        url: EnumRoutes.APPLICATIONS_HISTORY + '#applications-expired',
      },
    ],
  },
  {
    title: 'Submitted',
    url: EnumRoutes.APPLICATIONS_SUBMITTED,
    icon: SaveAll,
    items: [
      {
        title: 'Ongoing',
        url: EnumRoutes.APPLICATIONS_HISTORY + '#applications-ongoing',
      },
      {
        title: 'Under review',
        url: EnumRoutes.APPLICATIONS_HISTORY + '#applications-under-review',
      },
    ],
  },
  {
    title: 'Analytics',
    url: EnumRoutes.ANALYTICS_APPLICATIONS,
    icon: SaveAll,
  },
];

export const settingsSidebarItems: SidebarItem[] = [
  {
    title: 'Notifications',
    url: EnumRoutes.APPLICATIONS,
    icon: SaveAll,
  },
  {
    title: 'Language',
    url: EnumRoutes.APPLICATIONS,
    icon: SaveAll,
  },
  {
    title: 'Theme',
    url: EnumRoutes.APPLICATIONS,
    icon: SaveAll,
  },
  {
    title: 'Password',
    url: EnumRoutes.APPLICATIONS,
    icon: SaveAll,
  },
  {
    title: 'Privacy',
    url: EnumRoutes.APPLICATIONS,
    icon: SaveAll,
  },
  {
    title: 'More',
    url: EnumRoutes.APPLICATIONS,
    icon: SaveAll,
  },
  {
    title: 'Delete my account',
    url: EnumRoutes.APPLICATIONS,
    icon: SaveAll,
  },
];

export const formsSidebarItems: SidebarItem[] = [
  {
    title: 'Create your opportunity',
    url: EnumRoutes.FORMS_CREATE,
    icon: SaveAll,
  },
  {
    title: 'Created opportunities',
    url: EnumRoutes.FORMS,
    icon: SaveAll,
    items: [
      {
        title: 'Published',
        url: EnumRoutes.FORMS_FORM,
      },
      {
        title: 'Ready to publish',
        url: EnumRoutes.FORMS_FORM,
      },
      {
        title: 'Complete',
        url: EnumRoutes.FORMS_FORM,
      },
    ],
  },
  {
    title: 'Analytics',
    url: EnumRoutes.ANALYTICS_FORMS,
  },
];
