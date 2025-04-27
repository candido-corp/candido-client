// config/navigation/navigationOrder.ts
import { EnumNavigationPlugin } from './enums/EnumNavigationPlugin';

export const NAVBAR_PLUGIN_ORDER: EnumNavigationPlugin[] = [
  EnumNavigationPlugin.OPPORTUNITIES,
  EnumNavigationPlugin.DASHBOARD,
  EnumNavigationPlugin.APPLICATIONS,
  EnumNavigationPlugin.FORMS,
  EnumNavigationPlugin.USERS
];
