import { EnumRoutes } from '@/models/enums/EnumRoutes';
import {
  CreateYourOwnSidebarItems,
  dashboardSidebarItems,
  documentsSidebarItems,
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
    title: 'Documents',
    url: EnumRoutes.DOCUMENTS,
    items: documentsSidebarItems,
    className: firstLevelSidebarItemClass,
  },
  {
    title: 'User',
    url: EnumRoutes.USER,
    onlySidebar: true,
    items: userSidebarItems,
    className: firstLevelSidebarItemClass,
  },
  {
    title: 'Create your own',
    url: EnumRoutes.USER,
    onlySidebar: true,
    items: CreateYourOwnSidebarItems,
    className: firstLevelSidebarItemClass,
  },
];
