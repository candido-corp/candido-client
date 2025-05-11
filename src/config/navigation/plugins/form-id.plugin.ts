// form-id.plugin.ts
import { EnumNavigationPlugin } from '@/config/navigation/enums/EnumNavigationPlugin';
import { EnumRoutes } from '@/models/enums/EnumRoutes';
import { AppWindow, BookPlus, ScanEye, Settings, Wrench } from 'lucide-react';
import { registerNavigationPlugin } from '../register';

registerNavigationPlugin({
  id: EnumNavigationPlugin.FORMS_FORM_ID,
  navbar: {
    id: 'forms-form-id',
    title: 'Form ID',
    url: EnumRoutes.FORMS_FORM,
    icon: AppWindow,
    visibility: [],
    needsAuth: true,
  },
  sidebar: [
    {
      id: 'overview-form',
      title: 'Overview',
      url: EnumRoutes.FORMS_FORM,
      icon: BookPlus,
    },
    {
      id: 'settings-form',
      title: 'Settings',
      url: EnumRoutes.FORMS_FORM_SETTINGS,
      icon: Settings,
    },
    {
      id: 'builder-form',
      title: 'Builder',
      url: EnumRoutes.FORMS_FORM_BUILDER,
      icon: Wrench,
    },
    {
      id: 'preview-form',
      title: 'Preview',
      url: EnumRoutes.FORMS_FORM_PREVIEW,
      icon: ScanEye,
    },
  ],
});
