import { createBrowserRouter } from 'react-router-dom';
import { EnumRoutes } from '@/models/enums/EnumRoutes';
import { authProvider } from '@/utils/Auth';
import HomePage from '@/pages/Home';
import LoginPage from '@/pages/auth/Login';
import RegisterPage from '@/pages/auth/Register';
import RegisterVerifyByEmailPage from '@/pages/auth/RegisterVerifyByEmail';
import Account from '@/components/Account';
import LoginBlur from '@/pages/auth/LoginBlur';
import actionLogin from '@/actions/auth/actionLogin';
import loaderLogin from '@/loaders/auth/loaderLogin';
import actionRegister from '@/actions/auth/actionRegister';
import loaderRegisterVerifyByEmail from '@/loaders/auth/loaderRegisterVerifyByEmail';
import actionLogout from '@/actions/auth/actionLogout';
import loaderAccount from '@/loaders/loaderAccount';
import Main from '@/layouts/Main';

export const router = createBrowserRouter([
  {
    path: EnumRoutes.HOME,
    element: <Main />,
    // errorElement: <ErrorPage />,
    loader() {
      return { user: authProvider.user };
    },
    id: 'root',
    children: [
      { index: true, element: <HomePage /> },
      {
        path: EnumRoutes.REGISTER_VERIFY_BY_EMAIL,
        element: <RegisterVerifyByEmailPage />,
        loader: loaderRegisterVerifyByEmail,
      },
      {
        path: EnumRoutes.LOGOUT,
        action: actionLogout,
      },
      {
        path: EnumRoutes.ACCOUNT,
        element: <Account />,
        loader: loaderAccount,
      },
    ],
  },
  {
    element: <Main showNavigation={false} />,
    loader() {
      return { user: authProvider.user };
    },
    children: [
      {
        path: EnumRoutes.LOGIN,
        element: <LoginPage />,
        action: actionLogin,
        loader: loaderLogin,
      },
      {
        path: EnumRoutes.REGISTER,
        element: <RegisterPage />,
        action: actionRegister,
      },
      {
        path: 'login-blur',
        element: <LoginBlur />,
      },
    ],
  },
]);
