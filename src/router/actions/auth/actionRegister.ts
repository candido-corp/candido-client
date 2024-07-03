import { LoaderFunctionArgs, json, redirect } from 'react-router-dom';
import { RequestRegisterData } from '@/models/requests/RequestRegisterData';
import AuthService from '@/services/auth/AuthService';
import { EnumRoutes } from '@/models/enums/EnumRoutes';

export default async function actionRegister({
  request,
}: LoaderFunctionArgs): Promise<Response> {
  const data = await request.formData();
  const registerData: RequestRegisterData = {
    first_name: data.get('first_name') as string,
    last_name: data.get('last_name') as string,
    email: data.get('email') as string,
    password: data.get('password') as string,
    confirm_password: data.get('confirm_password') as string,
  };

  try {
    const response = await new AuthService().registerEmailVerification(
      registerData
    );

    if (response.status === 422 || response.status === 401) {
      return response;
    }

    // const resData = await response.json();

    const redirectTo = data.get('redirectTo') as string | null;
    return redirect(redirectTo || EnumRoutes.HOME);
  } catch (error) {
    console.error('error: ', error);
    throw json({ message: 'Could not register user.' }, { status: 500 });
  }
}
