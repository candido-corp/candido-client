import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';

import {
  dashboardSidebarItems,
  documentsSidebarItems,
  userSidebarItems,
} from '@/config/ConfigSidebars';
import ProtectedLayout from '@/layouts/ProtectedLayout';
import PublicLayout from '@/layouts/PublicLayout.tsx';
import { default as SidebarLayout } from '@/layouts/SidebarLayout';
import { EnumRoutes } from '@/models/enums/EnumRoutes.ts';
import DashboardPage from '@/pages/DashboardPage';
import DocumentsPage from '@/pages/DocumentsPage';
import ErrorPage from '@/pages/ErrorPage.tsx';
import ForgotPasswordPage from '@/pages/auth/ForgotPasswordPage';
import LoginBlurPage from '@/pages/auth/LoginBlurPage.tsx';
import LoginPage from '@/pages/auth/LoginPage.tsx';
import RegisterPage from '@/pages/auth/RegisterPage.tsx';
import RegisterVerifyByEmailPage from '@/pages/auth/RegisterVerifyByEmailPage';
import ResetPasswordPage from '@/pages/auth/ResetPasswordPage';
import FormBuilderPage from '@/pages/forms/FormBuilderPage';
import FormBuilderPreviewPage from '@/pages/forms/FormBuilderPreviewPage';
import FormPage from '@/pages/forms/FormPage';
import FormsCreatePage from '@/pages/forms/FormsCreatePage';
import FormsPage from '@/pages/forms/FormsPage';
import OpportunitiesPage from '@/pages/opportunities/OpportunitiesPage';
import OpportunityApplyPage from '@/pages/opportunities/OpportunityApplyPage';
import OpportunityPage from '@/pages/opportunities/OpportunityPage';
import SettingsFormsPage from '@/pages/settings/SettingsFormsPage';
import SettingsGeneralPage from '@/pages/settings/SettingsGeneralPage';
import SettingsPage from '@/pages/settings/SettingsPage';
import SettingsUserPage from '@/pages/settings/SettingsUserPage';
import UserPage from '@/pages/user/UserPage';
import UserOpportunitiesHistoryPage from '@/pages/user/opportunities/UserOpportunitiesHistoryPage';
import UserOpportunitiesPage from '@/pages/user/opportunities/UserOpportunitiesPage';
import UserOpportunitiesSavedPage from '@/pages/user/opportunities/UserOpportunitiesSavedPage';
import UserOpportunitiesStatsPage from '@/pages/user/opportunities/UserOpportunitiesStatsPage';
import { AuthContextType } from '@/providers/AuthProvider.tsx';
import { NotificationContextType } from '@/providers/NotificationProvider';
import actionLogin from '@/router/actions/auth/actionLogin.ts';
import actionLogout from '@/router/actions/auth/actionLogout.ts';
import actionRegister from '@/router/actions/auth/actionRegister.ts';
import loaderProtected from '@/router/loaders/_common/loaderProtected.ts';
import loaderRegisterVerifyByEmail from '@/router/loaders/auth/loaderRegisterVerifyByEmail.ts';
import actionForgotPassword from './actions/auth/actionForgotPassword';
import actionResetPassword from './actions/auth/actionResetPassword';
import loaderAuth from './loaders/auth/loaderAuth';
import loaderResetPassword from './loaders/auth/loaderResetPassword';
import loaderUser from './loaders/loaderUser';

export const router = (
  authContext: AuthContextType,
  notificationContext: NotificationContextType
) =>
  createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route loader={loaderAuth} errorElement={<ErrorPage />}>
          <Route
            path={EnumRoutes.LOGIN}
            action={actionLogin(authContext, notificationContext)}
            element={<LoginPage />}
          />

          <Route path={EnumRoutes.LOGIN_BLUR} element={<LoginBlurPage />} />

          <Route
            path={EnumRoutes.LOGOUT}
            action={actionLogout(authContext, notificationContext)}
          />

          <Route
            path={EnumRoutes.REGISTER}
            action={actionRegister(authContext, notificationContext)}
            element={<RegisterPage />}
          />
          <Route
            path={EnumRoutes.REGISTER_VERIFY_BY_EMAIL}
            loader={loaderRegisterVerifyByEmail(
              authContext,
              notificationContext
            )}
            element={<RegisterVerifyByEmailPage />}
          />
        </Route>

        <Route errorElement={<ErrorPage />}>
          <Route
            path={EnumRoutes.FORGOT_PASSWORD}
            action={actionForgotPassword(notificationContext)}
            element={<ForgotPasswordPage />}
          />
          <Route
            path={EnumRoutes.RESET_PASSWORD}
            action={actionResetPassword(authContext, notificationContext)}
            loader={loaderResetPassword}
            element={<ResetPasswordPage />}
          />
        </Route>

        <Route
          path={EnumRoutes.HOME}
          element={<PublicLayout />}
          errorElement={<ErrorPage />}
        >
          <Route index element={<OpportunitiesPage />} />

          <Route path={EnumRoutes.OPPORTUNITIES}>
            <Route index element={<OpportunitiesPage />} />

            <Route path={EnumRoutes.OPPORTUNITIES_OPPORTUNITY}>
              <Route index element={<OpportunityPage />} />

              <Route
                path={EnumRoutes.OPPORTUNITIES_OPPORTUNITY_APPLY}
                element={<OpportunityApplyPage />}
              />
            </Route>
          </Route>
        </Route>

        <Route
          loader={loaderProtected(authContext)}
          errorElement={<ErrorPage />}
        >
          <Route
            path={EnumRoutes.USER}
            element={<SidebarLayout sidebarNavItems={userSidebarItems} />}
          >
            <Route
              index
              loader={loaderUser}
              action={actionForgotPassword(notificationContext)} //as for now we have only forgot password action so we keep this here
              element={<UserPage />}
            />

            <Route path={EnumRoutes.USER_OPPORTUNITIES}>
              <Route index element={<UserOpportunitiesPage />} />

              <Route
                path={EnumRoutes.USER_OPPORTUNITIES_STATS}
                element={<UserOpportunitiesStatsPage />}
              />
              <Route
                path={EnumRoutes.USER_OPPORTUNITIES_HISTORY}
                element={<UserOpportunitiesHistoryPage />}
              />
              <Route
                path={EnumRoutes.USER_OPPORTUNITIES_SAVED}
                element={<UserOpportunitiesSavedPage />}
              />
            </Route>
          </Route>

          <Route element={<ProtectedLayout />}>
            <Route
              element={
                <SidebarLayout sidebarNavItems={dashboardSidebarItems} />
              }
            >
              <Route path={EnumRoutes.DASHBOARD} element={<DashboardPage />} />
            </Route>

            <Route path={EnumRoutes.FORMS}>
              <Route index element={<FormsPage />} />

              <Route
                path={EnumRoutes.FORMS_CREATE}
                element={<FormsCreatePage />}
              />

              <Route path={EnumRoutes.FORMS_FORM}>
                <Route index element={<FormPage />} />

                <Route path={EnumRoutes.FORMS_FORM_BUILDER}>
                  <Route index element={<FormBuilderPage />} />

                  <Route
                    path={EnumRoutes.FORMS_FORM_BUILDER_PREVIEW}
                    element={<FormBuilderPreviewPage />}
                  />
                </Route>
              </Route>
            </Route>

            <Route path={EnumRoutes.SETTINGS}>
              <Route index element={<SettingsPage />} />

              <Route
                path={EnumRoutes.SETTINGS_GENERAL}
                element={<SettingsGeneralPage />}
              />
              <Route
                path={EnumRoutes.SETTINGS_USER}
                element={<SettingsUserPage />}
              />
              <Route
                path={EnumRoutes.SETTINGS_FORM}
                element={<SettingsFormsPage />}
              />
            </Route>
          </Route>

          <Route
            path={EnumRoutes.DOCUMENTS}
            element={<SidebarLayout sidebarNavItems={documentsSidebarItems} />}
          >
            <Route index element={<DocumentsPage />} />
          </Route>
        </Route>
      </>
    )
  );
