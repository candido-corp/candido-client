import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';

import loaderRegisterVerifyByEmail from '@/router/loaders/auth/loaderRegisterVerifyByEmail.ts';
import { EnumRoutes } from '@/models/enums/EnumRoutes.ts';
import actionLogout from '@/router/actions/auth/actionLogout.ts';
import LoginPage from '@/pages/auth/LoginPage.tsx';
import actionRegister from '@/router/actions/auth/actionRegister.ts';
import LoginBlurPage from '@/pages/auth/LoginBlurPage.tsx';
import PublicLayout from '@/layouts/PublicLayout.tsx';
import loaderProtected from '@/router/loaders/_common/loaderProtected.ts';
import { AuthContextType } from '@/providers/AuthProvider.tsx';
import actionLogin from '@/router/actions/auth/actionLogin.ts';
import ErrorPage from '@/pages/ErrorPage.tsx';
import RegisterPage from '@/pages/auth/RegisterPage.tsx';
import UserPage from '@/pages/user/UserPage';
import UserOpportunitiesStatsPage from '@/pages/user/opportunities/UserOpportunitiesStatsPage';
import UserOpportunitiesPage from '@/pages/user/opportunities/UserOpportunitiesPage';
import UserOpportunitiesHistoryPage from '@/pages/user/opportunities/UserOpportunitiesHistoryPage';
import UserOpportunitiesSavedPage from '@/pages/user/opportunities/UserOpportunitiesSavedPage';
import FormsPage from '@/pages/forms/FormsPage';
import FormPage from '@/pages/forms/FormPage';
import FormBuilderPage from '@/pages/forms/FormBuilderPage';
import FormBuilderPreviewPage from '@/pages/forms/FormBuilderPreviewPage';
import OpportunitiesPage from '@/pages/opportunities/OpportunitiesPage';
import OpportunityPage from '@/pages/opportunities/OpportunityPage';
import OpportunityApplyPage from '@/pages/opportunities/OpportunityApplyPage';
import SettingsPage from '@/pages/settings/SettingsPage';
import SettingsGeneralPage from '@/pages/settings/SettingsGeneralPage';
import SettingsUserPage from '@/pages/settings/SettingsUserPage';
import SettingsFormsPage from '@/pages/settings/SettingsFormsPage';
import loaderAuth from './loaders/auth/loaderAuth';
import DashboardPage from '@/pages/DashboardPage';
import FormsCreatePage from '@/pages/forms/FormsCreatePage';
import actionForgotPassword from './actions/auth/actionForgotPassword';
import ForgotPasswordPage from '@/pages/auth/ForgotPasswordPage';
import ResetPasswordPage from '@/pages/auth/ResetPasswordPage';
import loaderResetPassword from './loaders/auth/loaderResetPassword';
import actionResetPassword from './actions/auth/actionResetPassword';
import loaderUser from './loaders/loaderUser';
import RegisterVerifyByEmailPage from '@/pages/auth/RegisterVerifyByEmailPage';
import { useToast } from '@/components/ui/use-toast';

export const router = (
  authContext: AuthContextType,
  toast: ReturnType<typeof useToast>['toast']
) =>
  createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route errorElement={<ErrorPage />}>
          <Route
            path={EnumRoutes.LOGIN}
            action={actionLogin(authContext, toast)}
            element={<LoginPage />}
          />

          <Route path={EnumRoutes.LOGIN_BLUR} element={<LoginBlurPage />} />

          <Route
            path={EnumRoutes.LOGOUT}
            action={actionLogout(authContext, toast)}
          />

          <Route
            path={EnumRoutes.REGISTER}
            action={actionRegister(authContext, toast)}
            element={<RegisterPage />}
          />
          <Route
            path={EnumRoutes.REGISTER_VERIFY_BY_EMAIL}
            loader={loaderRegisterVerifyByEmail(authContext, toast)}
            element={<RegisterVerifyByEmailPage />}
          />
        </Route>

        <Route errorElement={<ErrorPage />}>
          <Route
            path={EnumRoutes.FORGOT_PASSWORD}
            action={actionForgotPassword(toast)}
            element={<ForgotPasswordPage />}
          />
          <Route
            path={EnumRoutes.RESET_PASSWORD}
            action={actionResetPassword(authContext, toast)}
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

          <Route loader={loaderProtected(authContext)}>
            <Route path={EnumRoutes.DASHBOARD} element={<DashboardPage />} />

            <Route path={EnumRoutes.USER}>
              <Route
                index
                loader={loaderUser}
                action={actionForgotPassword(toast)} //as for now we have only forgot password action so we keep this here
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
        </Route>
      </>
    )
  );
