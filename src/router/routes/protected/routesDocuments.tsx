import { RouteObject } from 'react-router-dom';
import { EnumRoutes } from '@/models/enums/EnumRoutes';
import SidebarLayout from '@/layouts/SidebarLayout';
import DocumentsPage from '@/pages/documents/DocumentsPage';
import DocumentsUploadPage from '@/pages/documents/DocumentsUploadPage';
import {EnumNavigationPlugin} from "@/config/navigation/enums/EnumNavigationPlugin.ts";
import {RouteHandle} from "@/config/navigation";

export const routesDocuments = (): RouteObject[] => [
    {
        path: EnumRoutes.DOCUMENTS,
        element: <SidebarLayout />,
        handle: {
            pluginId: EnumNavigationPlugin.DOCUMENTS
        } as RouteHandle,
        children: [
            { index: true, element: <DocumentsPage /> },
            { path: EnumRoutes.DOCUMENTS_UPLOAD, element: <DocumentsUploadPage /> },
        ],
    },
];
