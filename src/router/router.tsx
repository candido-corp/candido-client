import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';

import HomePage from '@/pages/HomePage.tsx';
import RegisterVerifyByEmailPage from '@/pages/auth/RegisterVerifyByEmailPage.tsx';
import loaderRegisterVerifyByEmail from '@/router/loaders/auth/loaderRegisterVerifyByEmail.ts';
import { EnumRoutes } from '@/models/enums/EnumRoutes.ts';
import actionLogout from '@/router/actions/auth/actionLogout.ts';
import loaderAccount from '@/router/loaders/loaderAccount.ts';
import LoginPage from '@/pages/auth/LoginPage.tsx';
import loaderLogin from '@/router/loaders/auth/loaderLogin.ts';
import actionRegister from '@/router/actions/auth/actionRegister.ts';
import LoginBlurPage from '@/pages/auth/LoginBlurPage.tsx';
import ProtectedLayout from '@/layouts/ProtectedLayout.tsx';
import PublicLayout from '@/layouts/PublicLayout.tsx';
import loaderProtected from '@/router/loaders/_common/loaderProtected.ts';
import { AuthContextType } from '@/providers/AuthProvider.tsx';
import actionLogin from '@/router/actions/auth/actionLogin.ts';
import loaderPublic from '@/router/loaders/_common/loaderPublic.ts';
import ErrorPage from '@/pages/ErrorPage.tsx';
import RegisterPage from '@/pages/auth/RegisterPage.tsx';
import ResetPasswordPage from '@/pages/auth/ResetPasswordPage';
import UserPage from '@/pages/user/UserPage';
import UserOpportunitiesStatsPage from '@/pages/user/opportunities/UserOpportunitiesStatsPage';
import UserOpportunitiesPage from '@/pages/user/opportunities/UserOpportunitiesPage';
import UserOpportunitiesHistoryPage from '@/pages/user/opportunities/UserOpportunitiesHistoryPage';
import UserOpportunitiesSavedPage from '@/pages/user/opportunities/UserOpportunitiesSavedPage';
import FormsPage from '@/pages/forms/FormsPage';
import FormPage from '@/pages/forms/FormPage';
import FormSettingsPage from '@/pages/forms/FormSettingsPage';
import FormBuilderPage from '@/pages/forms/FormBuilderPage';
import FormBuilderPreviewPage from '@/pages/forms/FormBuilderPreviewPage';
import OpportunitiesPage from '@/pages/opportunities/OpportunitiesPage';
import OpportunityPage from '@/pages/opportunities/OpportunityPage';
import OpportunityApplyPage from '@/pages/opportunities/OpportunityApplyPage';
import SettingsPage from '@/pages/settings/SettingsPage';
import SettingsGeneralPage from '@/pages/settings/SettingsGeneralPage';
import SettingsUserPage from '@/pages/settings/SettingsUserPage';
import SettingsFormsPage from '@/pages/settings/SettingsFormsPage';

export const router = (authContext: AuthContextType) =>
  createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route
          path={EnumRoutes.DASHBOARD}
          loader={loaderProtected(authContext)}
          element={<ProtectedLayout />}
        >
          <Route index element={<HomePage />} />

          <Route
            path={EnumRoutes.USER}
            loader={loaderAccount}
            element={<UserPage />}
            errorElement={<ErrorPage />}
          >
            <Route
              path={EnumRoutes.USER_OPPORTUNITIES}
              element={<UserOpportunitiesPage />}
            >
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

          <Route path={EnumRoutes.FORMS} element={<FormsPage />}>
            <Route path={EnumRoutes.FORMS_FORM} element={<FormPage />}>
              <Route
                path={EnumRoutes.FORMS_FORM_SETTINGS}
                element={<FormSettingsPage />}
              />
              <Route
                path={EnumRoutes.FORMS_FORM_BUILDER}
                element={<FormBuilderPage />}
              >
                <Route
                  path={EnumRoutes.FORMS_FORM_BUILDER_PREVIEW}
                  element={<FormBuilderPreviewPage />}
                />
              </Route>
            </Route>
          </Route>

          <Route path={EnumRoutes.SETTINGS} element={<SettingsPage />}>
            <Route
              path={EnumRoutes.SETTINGS_GENERAL}
              element={<SettingsGeneralPage />}
            />
            <Route
              path={EnumRoutes.SETTINGS_USER}
              element={<SettingsUserPage />}
            />
            <Route
              path={EnumRoutes.SETTINGS_FORMS}
              element={<SettingsFormsPage />}
            />
          </Route>
        </Route>

        <Route
          path={EnumRoutes.DASHBOARD}
          loader={loaderPublic}
          element={<PublicLayout />}
        >
          <Route
            path={EnumRoutes.LOGIN}
            loader={loaderLogin}
            action={actionLogin(authContext)}
            element={<LoginPage />}
            errorElement={<ErrorPage />}
          ></Route>
          <Route path={EnumRoutes.LOGIN_BLUR} element={<LoginBlurPage />} />

          <Route path={EnumRoutes.LOGOUT} action={actionLogout(authContext)} />

          <Route
            path={EnumRoutes.REGISTER}
            action={actionRegister}
            element={<RegisterPage />}
            errorElement={<ErrorPage />}
          >
            <Route
              path={EnumRoutes.REGISTER_VERIFY_BY_EMAIL}
              loader={loaderRegisterVerifyByEmail}
              element={<RegisterVerifyByEmailPage />}
            />
          </Route>

          <Route
            path={EnumRoutes.RESET_PASSWORD}
            element={<ResetPasswordPage />}
          />

          <Route
            path={EnumRoutes.OPPORTUNITIES}
            element={<OpportunitiesPage />}
          >
            <Route
              path={EnumRoutes.OPPORTUNITIES_OPPORTUNITY}
              element={<OpportunityPage />}
            >
              <Route
                path={EnumRoutes.OPPORTUNITIES_OPPORTUNITY_APPLY}
                element={<OpportunityApplyPage />}
              />
            </Route>
          </Route>
        </Route>
      </>
    )
  );
