import { json, redirect } from 'react-router-dom';
import { RequestRegisterData } from '../../models/requests/RequestRegisterData';
import { API_V1_register_email_verification } from '../../api/v1/auth/API_V1_register_email_verification';

export default async function action({
  request,
}: {
  request: Request;
}): Promise<Response> {
  const data = await request.formData();
  const registerData: RequestRegisterData = {
    first_name: data.get('first-name') as string,
    last_name: data.get('last-name') as string,
    email: data.get('email') as string,
    password: data.get('password') as string,
    confirm_password: data.get('confirm-password') as string,
  };

  const response = await API_V1_register_email_verification(registerData);

  if (response.status === 422 || response.status === 401) {
    return response;
  }

  if (!response.ok) {
    throw json({ message: 'Could not authenticate user.' }, { status: 500 });
  }

  // const resData = await response.json();

  return redirect('/');
}
