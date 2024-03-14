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
import registerVerifyByEmailLoader from './loaders/loaderRegisterVerifyByEmail';
import { EnumRoutes } from './models/enums/EnumRoutes';
import RegisterVerifyByEmailPage from './pages/auth/RegisterVerifyByEmail';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    // errorElement: <ErrorPage />,
    id: 'root',
    // loader: tokenLoader,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: EnumRoutes.LOGIN,
        element: <LoginPage />,
        action: loginAction,
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
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
