// documents.plugin.ts
import { registerNavigationPlugin } from '../register';
import { EnumNavigationPlugin } from '@/config/navigation/enums/EnumNavigationPlugin';
import { EnumRoutes } from '@/models/enums/EnumRoutes';
import { File, Files, Upload} from 'lucide-react';
import {EnumNavigationVisibility} from "@/config/navigation/enums/EnumNavigationVisibility.ts";

registerNavigationPlugin({
  id: EnumNavigationPlugin.DOCUMENTS,
  navbar: {
    id: 'documents',
    title: 'Documents',
    url: EnumRoutes.DOCUMENTS,
    icon: Files,
    visibility: [EnumNavigationVisibility.MOBILE]
  },
  sidebar: [
    { id: 'documents', title: 'Documents', url: EnumRoutes.DOCUMENTS, icon: File },
    { id: 'documents-upload', title: 'Upload', url: EnumRoutes.DOCUMENTS_UPLOAD, icon: Upload },
  ],
});
