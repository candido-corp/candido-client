// forms.plugin.ts
import { EnumNavigationPlugin } from '@/config/navigation/enums/EnumNavigationPlugin';
import { EnumNavigationVisibility } from '@/config/navigation/enums/EnumNavigationVisibility.ts';
import { EnumRoutes } from '@/models/enums/EnumRoutes';
import { ChartColumn, NotebookPen } from 'lucide-react';
import { registerNavigationPlugin } from '../register';

registerNavigationPlugin({
  id: EnumNavigationPlugin.FORMS,
  navbar: {
    id: 'forms',
    title: 'Forms',
    url: EnumRoutes.FORMS,
    icon: NotebookPen,
    visibility: [
      EnumNavigationVisibility.DESKTOP,
      EnumNavigationVisibility.MOBILE,
    ],
    needsAuth: true,
  },
  sidebar: [
    {
      id: 'created-opportunities',
      title: 'Created opportunities',
      url: EnumRoutes.FORMS,
      icon: NotebookPen,
    },
    {
      id: 'analytics-forms',
      title: 'Analytics',
      url: EnumRoutes.ANALYTICS_FORMS,
      icon: ChartColumn,
    },
  ],
});
