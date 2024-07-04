import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';

import HomePage from '@/pages/Home.tsx';
import RegisterVerifyByEmailPage from '@/pages/auth/RegisterVerifyByEmail.tsx';
import loaderRegisterVerifyByEmail from '@/router/loaders/auth/loaderRegisterVerifyByEmail.ts';
import { EnumRoutes } from '@/models/enums/EnumRoutes.ts';
import actionLogout from '@/router/actions/auth/actionLogout.ts';
import Account from '@/components/Account.tsx';
import loaderAccount from '@/router/loaders/loaderAccount.ts';
import LoginPage from '@/pages/auth/Login.tsx';
import loaderLogin from '@/router/loaders/auth/loaderLogin.ts';
import actionRegister from '@/router/actions/auth/actionRegister.ts';
import RegisterPage from '@/pages/auth/Register';
import LoginBlur from '@/pages/auth/LoginBlur.tsx';
import ProtectedLayout from '@/layouts/ProtectedLayout.tsx';
import PublicLayout from '@/layouts/PublicLayout.tsx';
import loaderProtected from '@/router/loaders/_common/loaderProtected.ts';
import { AuthContextType } from '@/providers/AuthProvider.tsx';
import actionLogin from '@/router/actions/auth/actionLogin.ts';

export const router = (authContext: AuthContextType) => createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path={EnumRoutes.HOME} loader={loaderProtected} element={<ProtectedLayout />}>
        <Route index element={<HomePage />} />
        <Route path={EnumRoutes.ACCOUNT} loader={loaderAccount} element={<Account />} />
      </Route>

      <Route path={EnumRoutes.HOME} element={<PublicLayout />}>
        <Route path={EnumRoutes.LOGIN} loader={loaderLogin} action={actionLogin(authContext)} element={<LoginPage />}></Route>
        <Route path={EnumRoutes.LOGIN_BLUR} element={<LoginBlur />} />

        <Route path={EnumRoutes.LOGOUT} action={actionLogout} />

        <Route path={EnumRoutes.REGISTER} action={actionRegister} element={<RegisterPage />}>
          <Route path={EnumRoutes.REGISTER_VERIFY_BY_EMAIL} loader={loaderRegisterVerifyByEmail} element={<RegisterVerifyByEmailPage />} />
        </Route>
      </Route>
    </>
  )
);
