import { RouteObject } from 'react-router-dom';
import LoginPage from '@/pages/auth/LoginPage';
import LoginBlurPage from '@/pages/auth/LoginBlurPage';
import RegisterPage from '@/pages/auth/RegisterPage';
import RegisterVerifyByEmailPage from '@/pages/auth/RegisterVerifyByEmailPage';
import ForgotPasswordPage from '@/pages/auth/ForgotPasswordPage';
import ResetPasswordPage from '@/pages/auth/ResetPasswordPage';
import ErrorPage from '@/pages/ErrorPage';
import { EnumRoutes } from '@/models/enums/EnumRoutes';
import loaderAuth from '@/router/loaders/auth/loaderAuth';
import loaderRegisterVerify from '@/router/loaders/auth/loaderRegisterVerify';
import loaderResetPassword from '@/router/loaders/auth/loaderResetPassword';
import actionLogin from '@/router/actions/auth/actionLogin';
import actionLogout from '@/router/actions/auth/actionLogout';
import actionRegister from '@/router/actions/auth/actionRegister';
import actionForgotPassword from '@/router/actions/auth/actionForgotPassword';
import actionResetPassword from '@/router/actions/auth/actionResetPassword';
import { AuthContextType } from '@/providers/AuthProvider';
import { NotificationContextType } from '@/providers/NotificationProvider';

export const authRoutes = (authContext: AuthContextType, notificationContext: NotificationContextType): RouteObject[] => [
    {
        loader: loaderAuth,
        errorElement: <ErrorPage />,
        children: [
            {
                path: EnumRoutes.LOGIN,
                element: <LoginPage />,
                action: actionLogin(authContext, notificationContext),
            },
            {
                path: EnumRoutes.LOGIN_BLUR,
                element: <LoginBlurPage />,
            },
            {
                path: EnumRoutes.LOGOUT,
                action: actionLogout(authContext, notificationContext),
            },
            {
                path: EnumRoutes.REGISTER,
                element: <RegisterPage />,
                action: actionRegister(authContext, notificationContext),
            },
            {
                path: EnumRoutes.REGISTER_VERIFY,
                element: <RegisterVerifyByEmailPage />,
                loader: loaderRegisterVerify(authContext, notificationContext),
            },
        ],
    },
    {
        errorElement: <ErrorPage />,
        children: [
            {
                path: EnumRoutes.FORGOT_PASSWORD,
                element: <ForgotPasswordPage />,
                action: actionForgotPassword(notificationContext),
            },
            {
                path: EnumRoutes.RESET_PASSWORD,
                element: <ResetPasswordPage />,
                loader: loaderResetPassword,
                action: actionResetPassword(authContext, notificationContext),
            },
        ],
    },
];
