import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Root from './pages/Root';
import HomePage from './pages/Home';
import LoginPage from './pages/auth/Login';
import RegisterPage from './pages/auth/Register';
// import ErrorPage from './pages/Error';

import './index.css';
import logoutAction from './actions/auth/actionLogout';
import loginAction from './actions/auth/actionLogin';
import registerAction from './actions/auth/actionRegister';
import registerVerifyByEmailLoader from './loaders/auth/loaderRegisterVerifyByEmail';
import accountLoader from './loaders/loaderAccount';
import { EnumRoutes } from './models/enums/EnumRoutes';
import RegisterVerifyByEmailPage from './pages/auth/RegisterVerifyByEmail';
import Account from './pages/account/Account';
import { authProvider } from './utils/Auth';
import loginLoader from './loaders/auth/loaderLogin';

function App() {
  const router = createBrowserRouter([
    {
      path: EnumRoutes.HOME,
      element: <Root />,
      // errorElement: <ErrorPage />,
      loader() {
        return { user: authProvider.user };
      },
      id: 'root',
      children: [
        { index: true, element: <HomePage /> },
        {
          path: EnumRoutes.LOGIN,
          element: <LoginPage />,
          action: loginAction,
          loader: loginLoader,
        },
        {
          path: EnumRoutes.REGISTER,
          element: <RegisterPage />,
          action: registerAction,
        },
        {
          path: EnumRoutes.REGISTER_VERIFY_BY_EMAIL,
          element: <RegisterVerifyByEmailPage />,
          loader: registerVerifyByEmailLoader,
        },
        {
          path: EnumRoutes.LOGOUT,
          action: logoutAction,
        },
        {
          path: EnumRoutes.ACCOUNT,
          element: <Account />,
          loader: accountLoader,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
