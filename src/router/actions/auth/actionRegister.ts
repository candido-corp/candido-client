import { LoaderFunctionArgs } from 'react-router-dom';
import NetworkClient from '@/api/v1/NetworkClient.ts';
import { ApiRequestRegister } from '@/api/v1/requests/ApiRequestRegister.ts';

export default async function actionRegister({
  request,
}: LoaderFunctionArgs) {
  const data = await request.formData();
  const registerData: ApiRequestRegister = {
    first_name: data.get('first_name') as string,
    last_name: data.get('last_name') as string,
    email: data.get('email') as string,
    password: data.get('password') as string,
    confirm_password: data.get('confirm_password') as string,
  };

  await NetworkClient.registerEmail({ data: registerData });
}
