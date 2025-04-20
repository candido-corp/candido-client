import { EnumRoutes } from '@/models/enums/EnumRoutes';
import {
  AppWindow,
  Bell,
  BookPlus,
  ChartColumn,
  CreditCard,
  Files,
  History,
  House,
  LucideIcon,
  MapPinHouse,
  NotebookPen,
  Save,
  SaveAll,
  ScanEye,
  Send,
  Settings,
  Settings2,
  Shield,
  User,
  UserPen,
  Wrench,
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
    title: 'Documents',
    url: EnumRoutes.DOCUMENTS,
    icon: Save,
  },
  {
    title: 'Upload',
    url: EnumRoutes.DOCUMENTS_UPLOAD,
    icon: SaveAll,
  },
];

export const userSidebarItems: SidebarItem[] = [
  {
    title: 'Profile',
    url: EnumRoutes.USER,
    icon: User,
  },
  {
    title: 'Personal data',
    url: EnumRoutes.USER_DETAILS,
    icon: UserPen,
  },
  {
    title: 'Addresses',
    url: EnumRoutes.USER_ADDRESSES,
    icon: MapPinHouse,
  },
  {
    title: 'Opportunities saved',
    url: EnumRoutes.USER_OPPORTUNITIES_SAVED,
    icon: SaveAll,
  },
  {
    title: 'Documents',
    url: EnumRoutes.DOCUMENTS,
    icon: Files,
  },
  {
    title: 'Analytics',
    url: EnumRoutes.ANALYTICS_USER,
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
    icon: AppWindow,
  },
  {
    title: 'History',
    url: EnumRoutes.APPLICATIONS_HISTORY,
    icon: History,
    items: [
      {
        title: 'Completed',
        url: EnumRoutes.APPLICATIONS_HISTORY + '#applications-completed',
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
    icon: Send,
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
    icon: ChartColumn,
  },
];

export const settingsSidebarItems: SidebarItem[] = [
  {
    title: 'Settings',
    url: EnumRoutes.SETTINGS,
    icon: Settings,
  },
  {
    title: 'Account',
    url: EnumRoutes.SETTINGS_ACCOUNT,
    icon: User,
  },
  {
    title: 'Communication',
    url: EnumRoutes.SETTINGS_COMMUNICATION,
    icon: Bell,
  },
  {
    title: 'Billing',
    url: EnumRoutes.SETTINGS_BILLING,
    icon: CreditCard,
  },
  {
    title: 'Preferences',
    url: EnumRoutes.SETTINGS_PREFERENCES,
    icon: Settings2,
  },
  {
    title: 'Security',
    url: EnumRoutes.SETTINGS_SECURITY,
    icon: Shield,
  },
];

export const formsSidebarItems: SidebarItem[] = [
  {
    title: 'Created opportunities',
    url: EnumRoutes.FORMS,
    icon: NotebookPen,
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
    icon: ChartColumn,
  },
];

export const formIdSidebarItems: SidebarItem[] = [
  {
    title: 'Overview',
    url: EnumRoutes.FORMS_FORM,
    icon: BookPlus,
  },
  {
    title: 'Settings',
    url: EnumRoutes.FORMS_FORM_SETTINGS,
    icon: Settings,
  },
  {
    title: 'Builder',
    url: EnumRoutes.FORMS_FORM_BUILDER,
    icon: Wrench,
  },
  {
    title: 'Preview',
    url: EnumRoutes.FORMS_FORM_PREVIEW,
    icon: ScanEye,
  },
];

export const analyticsSidebarItems: SidebarItem[] = [
  {
    title: 'Overview',
    url: EnumRoutes.ANALYTICS,
    icon: ChartColumn,
  },
  {
    title: 'Applications',
    url: EnumRoutes.APPLICATIONS,
    icon: AppWindow,
  },
  {
    title: 'Forms',
    url: EnumRoutes.ANALYTICS_FORMS,
    icon: BookPlus,
  },
  {
    title: 'User',
    url: EnumRoutes.ANALYTICS_USER,
    icon: User,
  },
];
