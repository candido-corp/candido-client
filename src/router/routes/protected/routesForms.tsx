import { RouteObject } from 'react-router-dom';
import { EnumRoutes } from '@/models/enums/EnumRoutes';
import SidebarLayout from '@/layouts/SidebarLayout';
import FormsPage from '@/pages/forms/FormsPage';
import FormsCreatePage from '@/pages/forms/FormsCreatePage';
import FormPage from '@/pages/forms/FormPage';
import FormSettingsPage from '@/pages/forms/FormSettingsPage';
import FormBuilderPage from '@/pages/forms/FormBuilderPage';
import FormPreviewPage from '@/pages/forms/FormPreviewPage';
import {EnumNavigationPlugin} from "@/config/navigation/enums/EnumNavigationPlugin.ts";
import {RouteHandle} from "@/config/navigation";

export const routesForms = (): RouteObject[] => [
    {
        path: EnumRoutes.FORMS,
        element: <SidebarLayout />,
        handle: {
            pluginId: EnumNavigationPlugin.FORMS
        } as RouteHandle,
        children: [
            { index: true, element: <FormsPage /> },
            { path: EnumRoutes.FORMS_CREATE, element: <FormsCreatePage /> },
        ],
    },
    {
        path: EnumRoutes.FORMS_FORM,
        element: <SidebarLayout />,
        handle: {
            pluginId: EnumNavigationPlugin.FORMS_FORM_ID
        } as RouteHandle,
        children: [
            { index: true, element: <FormPage /> },
            { path: EnumRoutes.FORMS_FORM_SETTINGS, element: <FormSettingsPage /> },
            { path: EnumRoutes.FORMS_FORM_BUILDER, element: <FormBuilderPage /> },
            { path: EnumRoutes.FORMS_FORM_PREVIEW, element: <FormPreviewPage /> },
        ],
    },
];
