// analytics.plugin.ts
import { registerNavigationPlugin } from '../register';
import { EnumNavigationPlugin } from '@/config/navigation/enums/EnumNavigationPlugin';
import { EnumRoutes } from '@/models/enums/EnumRoutes';
import {Target} from "lucide-react";
import {EnumNavigationVisibility} from "@/config/navigation/enums/EnumNavigationVisibility.ts";

registerNavigationPlugin({
  id: EnumNavigationPlugin.OPPORTUNITIES,
  navbar: {
    id: 'opportunities',
    title: 'Opportunities',
    url: EnumRoutes.OPPORTUNITIES,
    icon: Target,
    visibility: [EnumNavigationVisibility.DESKTOP, EnumNavigationVisibility.MOBILE]
  }
});
