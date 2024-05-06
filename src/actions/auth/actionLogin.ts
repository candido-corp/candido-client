import { LoaderFunctionArgs, json, redirect } from 'react-router-dom';
import { RequestLoginData } from '../../models/requests/RequestLoginData';
import AuthService from '../../services/auth/AuthService';
import { authProvider } from '../../utils/Auth';
import { EnumRoutes } from '../../models/enums/EnumRoutes';

export default async function action({ request }: LoaderFunctionArgs) {
  const data = await request.formData();
  const loginData: RequestLoginData = {
    email: data.get('email') as string,
    password: data.get('password') as string,
  };

  try {
    const response = await new AuthService().login(loginData);

    if (response.status === 422 || response.status === 401) {
      return response;
    }

    authProvider.signin();
    // const resData = await response.json();

    const redirectTo = data.get('redirectTo') as string | null;
    return redirect(redirectTo || EnumRoutes.HOME);
  } catch (error) {
    console.error('error: ', error);
    throw json({ message: 'Could not authenticate user.' }, { status: 500 });
  }
}
