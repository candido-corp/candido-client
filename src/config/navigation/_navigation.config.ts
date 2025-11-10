// src/config/_navigation.config.ts

import { EnumNavigationPlugin } from "./enums/EnumNavigationPlugin";

export const NAVIGATION_CONFIG: {
  id: EnumNavigationPlugin;
  order?: number;
}[] = [
  { id: EnumNavigationPlugin.OPPORTUNITIES, order: 1 },
  { id: EnumNavigationPlugin.DASHBOARD, order: 2 },
  { id: EnumNavigationPlugin.APPLICATIONS, order: 3 },
  { id: EnumNavigationPlugin.FORMS, order: 4 },
  { id: EnumNavigationPlugin.USERS, order: 5 },
  { id: EnumNavigationPlugin.ANALYTICS, order: 6 },
  { id: EnumNavigationPlugin.DOCUMENTS, order: 7 },
  { id: EnumNavigationPlugin.SETTINGS, order: 8 },
  { id: EnumNavigationPlugin.FORMS_FORM_ID, order: 9 },
];