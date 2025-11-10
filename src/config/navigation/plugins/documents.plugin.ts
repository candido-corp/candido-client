// documents.plugin.ts
import { EnumNavigationPlugin } from '@/config/navigation/enums/EnumNavigationPlugin';
import { EnumNavigationVisibility } from '@/config/navigation/enums/EnumNavigationVisibility.ts';
import { EnumRoutes } from '@/models/enums/EnumRoutes';
import { File, Files, Upload } from 'lucide-react';
import { registerNavigationPlugin } from '../register';

registerNavigationPlugin({
  id: EnumNavigationPlugin.DOCUMENTS,
  navbar: {
    id: 'documents',
    title: 'Documents',
    url: EnumRoutes.DOCUMENTS,
    icon: Files,
    visibility: [EnumNavigationVisibility.MOBILE],
    needsAuth: true,
  },
  sidebar: [
    {
      id: 'documents',
      title: 'Documents',
      url: EnumRoutes.DOCUMENTS,
      icon: File,
    },
    {
      id: 'documents-upload',
      title: 'Upload',
      url: EnumRoutes.DOCUMENTS_UPLOAD,
      icon: Upload,
    },
  ],
});
