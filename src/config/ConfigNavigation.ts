import { EnumRoutes } from '@/models/enums/EnumRoutes';
import {
  applicationsSidebarItems,
  dashboardSidebarItems,
  formsSidebarItems,
  SidebarItem,
  userSidebarItems,
} from './ConfigSidebars';

export type NavigationItem = Required<LinkItem> & {
  onlySidebar?: boolean;
  items?: SidebarItem[];
  className?: string;
};

export type LinkItem = {
  title: string;
  url?: string;
};

const firstLevelSidebarItemClass = 'text-md';

export const navigationData: NavigationItem[] = [
  {
    title: 'Opportunities',
    url: EnumRoutes.OPPORTUNITIES,
    className: firstLevelSidebarItemClass,
  },
  {
    title: 'Dashboard',
    url: EnumRoutes.DASHBOARD,
    items: dashboardSidebarItems,
    className: firstLevelSidebarItemClass,
  },
  {
    title: 'Applications',
    url: EnumRoutes.APPLICATIONS,
    items: applicationsSidebarItems,
    className: firstLevelSidebarItemClass,
  },
  {
    title: 'Forms',
    url: EnumRoutes.FORMS,
    items: formsSidebarItems,
    className: firstLevelSidebarItemClass,
  },
  {
    title: 'User',
    url: EnumRoutes.USER,
    items: userSidebarItems,
    className: firstLevelSidebarItemClass,
  },
];
