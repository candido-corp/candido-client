import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';

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
import AccountPage from '@/pages/account/AccountPage.tsx';
import ErrorPage from '@/pages/ErrorPage.tsx';
import RegisterPage from '@/pages/auth/RegisterPage.tsx';

export const router = (authContext: AuthContextType) => createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path={EnumRoutes.HOME} loader={loaderProtected(authContext)} element={<ProtectedLayout />}>
        <Route index element={<HomePage />} />
        <Route path={EnumRoutes.ACCOUNT} loader={loaderAccount} element={<AccountPage />} errorElement={<ErrorPage />}/>
      </Route>

      <Route path={EnumRoutes.HOME} loader={loaderPublic} element={<PublicLayout />}>
        <Route path={EnumRoutes.LOGIN} loader={loaderLogin} action={actionLogin(authContext)} element={<LoginPage />} errorElement={<ErrorPage />}></Route>
        <Route path={EnumRoutes.LOGIN_BLUR} element={<LoginBlurPage />} />

        <Route path={EnumRoutes.LOGOUT} action={actionLogout(authContext)} />

        <Route path={EnumRoutes.REGISTER} action={actionRegister} element={<RegisterPage />} errorElement={<ErrorPage />}>
          <Route path={EnumRoutes.REGISTER_VERIFY_BY_EMAIL} loader={loaderRegisterVerifyByEmail} element={<RegisterVerifyByEmailPage />} />
        </Route>
      </Route>
    </>
  )
);
