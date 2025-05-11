// analytics.plugin.ts
import { EnumNavigationPlugin } from '@/config/navigation/enums/EnumNavigationPlugin';
import { EnumNavigationVisibility } from '@/config/navigation/enums/EnumNavigationVisibility.ts';
import { EnumRoutes } from '@/models/enums/EnumRoutes';
import { Target } from 'lucide-react';
import { registerNavigationPlugin } from '../register';

registerNavigationPlugin({
  id: EnumNavigationPlugin.OPPORTUNITIES,
  navbar: {
    id: 'opportunities',
    title: 'Opportunities',
    url: EnumRoutes.OPPORTUNITIES,
    icon: Target,
    visibility: [
      EnumNavigationVisibility.DESKTOP,
      EnumNavigationVisibility.MOBILE,
    ],
    needsAuth: false,
  },
});
