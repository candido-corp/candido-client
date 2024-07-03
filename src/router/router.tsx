import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';

import MainLayout from '@/layouts/Main';
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

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path={EnumRoutes.HOME} element={<MainLayout />}>
        <Route index element={<HomePage />} />

        <Route path={EnumRoutes.LOGIN} loader={loaderLogin} element={<LoginPage />} />
        <Route path={ 'login-blur' } element={<LoginBlur />} />

        <Route path={EnumRoutes.REGISTER} action={actionRegister} element={<RegisterPage />}>
          <Route path={EnumRoutes.REGISTER_VERIFY_BY_EMAIL} loader={loaderRegisterVerifyByEmail} element={<RegisterVerifyByEmailPage />} />
        </Route>

        <Route path={EnumRoutes.LOGOUT} action={actionLogout} />
        <Route path={EnumRoutes.ACCOUNT} loader={loaderAccount} element={<Account />} />
      </Route>
    </>
  )
);
