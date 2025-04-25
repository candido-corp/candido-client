import {createBrowserRouter} from 'react-router-dom';
import {authRoutes} from './routes/authRoutes';
import {publicRoutes} from './routes/publicRoutes';
import {protectedRoutes} from './routes/protectedRoutes';
import ErrorPage from '@/pages/ErrorPage';
import {AuthContextType} from '@/providers/AuthProvider';
import {NotificationContextType} from '@/providers/NotificationProvider';

export const createAppRouter = (
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
            path={EnumRoutes.REGISTER_VERIFY}
            loader={loaderRegisterVerify(authContext, notificationContext)}
            element={<RegisterVerifyByEmailPage />}
          />
        </Route>

        <Route errorElement={<ErrorPage />}>
          <Route
            path={EnumRoutes.FORGOT_PASSWORD} // TODO: check if correct to keep this route
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

          <Route
            path={EnumRoutes.OPPORTUNITIES}
            element={<OpportunitiesPage />}
          />

          <Route
            path={EnumRoutes.OPPORTUNITIES_OPPORTUNITY}
            element={<OpportunityPage />}
          />

          <Route
            path={EnumRoutes.OPPORTUNITIES_OPPORTUNITY_APPLY}
            element={<OpportunityApplyPage />}
          />
        </Route>

        <Route
          loader={loaderProtected(authContext)}
          errorElement={<ErrorPage />}
        >
          <Route
            path={EnumRoutes.USER}
            element={<SidebarLayout sidebarNavItems={userSidebarItems} />}
            loader={loaderUser}
            id={LOADER_USER_ID}
          >
            <Route
              index
              element={<UserPage />}
              action={actionForgotPassword(notificationContext)} //as for now we have only forgot password action so we keep this here
            />

            <Route
              path={EnumRoutes.USER_DETAILS}
              action={actionAccountChangeDetails(notificationContext)}
              element={<UserDetailsPage />}
            />

            <Route
              path={EnumRoutes.USER_ADDRESSES}
              element={<UserSettingsPage />}
            />

            <Route
              path={EnumRoutes.USER_OPPORTUNITIES_SAVED}
              element={<UserOpportunitiesSavedPage />}
            />
          </Route>

          <Route
            path={EnumRoutes.APPLICATIONS}
            element={
              <SidebarLayout sidebarNavItems={applicationsSidebarItems} />
            }
          >
            <Route index element={<ApplicationsPage />} />

            <Route
              path={EnumRoutes.APPLICATIONS_HISTORY}
              element={<ApplicationsHistoryPage />}
            />

            <Route
              path={EnumRoutes.APPLICATIONS_SUBMITTED}
              element={<ApplicationsSubmittedPage />}
            />
          </Route>

          <Route element={<ProtectedLayout />}>
            <Route
              element={
                <SidebarLayout sidebarNavItems={dashboardSidebarItems} />
              }
            >
              <Route path={EnumRoutes.DASHBOARD} element={<DashboardPage />} />
            </Route>

            <Route
              path={EnumRoutes.FORMS}
              element={<SidebarLayout sidebarNavItems={formsSidebarItems} />}
            >
              <Route index element={<FormsPage />} />

              <Route
                path={EnumRoutes.FORMS_CREATE}
                element={<FormsCreatePage />}
              />
            </Route>

            <Route
              path={EnumRoutes.FORMS_FORM}
              element={<SidebarLayout sidebarNavItems={formIdSidebarItems} />}
            >
              <Route index element={<FormPage />} />

              <Route
                path={EnumRoutes.FORMS_FORM_SETTINGS}
                element={<FormSettingsPage />}
              />

              <Route
                path={EnumRoutes.FORMS_FORM_BUILDER}
                element={<FormBuilderPage />}
              />

              <Route
                path={EnumRoutes.FORMS_FORM_PREVIEW}
                element={<FormPreviewPage />}
              />
            </Route>
          </Route>

          <Route
            path={EnumRoutes.DOCUMENTS}
            element={<SidebarLayout sidebarNavItems={documentsSidebarItems} />}
          >
            <Route index element={<DocumentsPage />} />

            <Route
              path={EnumRoutes.DOCUMENTS_UPLOAD}
              element={<DocumentsUploadPage />}
            />
          </Route>

          <Route
            path={EnumRoutes.ANALYTICS}
            element={<SidebarLayout sidebarNavItems={analyticsSidebarItems} />}
          >
            <Route index element={<AnalyticsPage />} />

            <Route
              path={EnumRoutes.ANALYTICS_APPLICATIONS}
              element={<AnalyticsApplicationsPage />}
            />
            <Route
              path={EnumRoutes.ANALYTICS_FORMS}
              element={<AnalyticsFormsPage />}
            />
            <Route
              path={EnumRoutes.ANALYTICS_USER}
              element={<AnalyticsUsersPage />}
            />
          </Route>

          <Route
            path={EnumRoutes.SETTINGS}
            element={<SidebarLayout sidebarNavItems={settingsSidebarItems} />} //TODO fix
          >
            <Route index element={<SettingsPage />} />

            <Route
              path={EnumRoutes.SETTINGS_ACCOUNT}
              element={<SettingsAccountPage />}
            />
            <Route
              path={EnumRoutes.SETTINGS_COMMUNICATION}
              element={<SettingsCommunicationPage />}
            />
            <Route
              path={EnumRoutes.SETTINGS_BILLING}
              element={<SettingsBillingPage />}
            />
            <Route
              path={EnumRoutes.SETTINGS_PREFERENCES}
              element={<SettingsPreferencesPage />}
            />
            <Route
              path={EnumRoutes.SETTINGS_SECURITY}
              element={<SettingsSecurityPage />}
            />
          </Route>
        </Route>
      </>
    )
  );
    createBrowserRouter([
        ...authRoutes(authContext, notificationContext),
        ...publicRoutes(),
        {path: '*', element: <ErrorPage/>},
    ]);
