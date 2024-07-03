import { json, redirect } from 'react-router-dom';
import { EnumRoutes } from '@/models/enums/EnumRoutes';
import { authProvider } from '@/utils/Auth';
import AuthService from '@/services/auth/AuthService.ts';

export default async function actionLogout() {
  try {
    const response = await new AuthService().logout();

    if (response.status === 422 || response.status === 401) {
      return response;
    }

    if (!response.ok) {
      throw json({ message: 'Could not authenticate user.' }, { status: 500 });
    }

    authProvider.signout();
    // const resData = await response.json();

    return redirect(EnumRoutes.HOME);
  } catch (error) {
    console.error('error: ', error);
    throw json({ message: 'error while logging out user' }, { status: 500 });
  }
}
