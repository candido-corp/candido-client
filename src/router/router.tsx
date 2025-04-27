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
    createBrowserRouter([
        ...authRoutes(authContext, notificationContext),
        ...publicRoutes(),
        ...protectedRoutes(authContext, notificationContext),
        {path: '*', element: <ErrorPage/>},
    ]);
