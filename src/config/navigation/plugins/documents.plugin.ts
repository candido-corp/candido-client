// documents.plugin.ts
import { registerNavigationPlugin } from '../register';
import { EnumNavigationPlugin } from '@/config/navigation/enums/EnumNavigationPlugin';
import { EnumRoutes } from '@/models/enums/EnumRoutes';
import { Save, SaveAll } from 'lucide-react';

registerNavigationPlugin({
  id: EnumNavigationPlugin.DOCUMENTS,
  sidebar: [
    { id: 'documents', title: 'Documents', url: EnumRoutes.DOCUMENTS, icon: Save },
    { id: 'documents-upload', title: 'Upload', url: EnumRoutes.DOCUMENTS_UPLOAD, icon: SaveAll },
  ],
});
