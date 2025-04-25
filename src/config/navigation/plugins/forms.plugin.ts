// forms.plugin.ts
import { registerNavigationPlugin } from '../register';
import { EnumNavigationPlugin } from '@/config/navigation/enums/EnumNavigationPlugin';
import { EnumRoutes } from '@/models/enums/EnumRoutes';
import { NotebookPen, ChartColumn } from 'lucide-react';

registerNavigationPlugin({
  id: EnumNavigationPlugin.FORMS,
  navbar: {
    id: 'forms',
    title: 'Forms',
    url: EnumRoutes.FORMS,
    icon: NotebookPen,
  },
  sidebar: [
    { id: 'created-opportunities', title: 'Created opportunities', url: EnumRoutes.FORMS, icon: NotebookPen },
    { id: 'analytics-forms', title: 'Analytics', url: EnumRoutes.ANALYTICS_FORMS, icon: ChartColumn },
  ],
});
