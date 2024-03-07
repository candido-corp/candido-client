import { json, redirect } from 'react-router-dom';
import { RequestLoginData } from '../../models/requests/RequestLoginData';
import { API_V1_login } from '../../api/v1/auth/API_V1_login';

export default async function action({
  request,
}: {
  request: Request;
}): Promise<Response> {
  const data = await request.formData();
  const loginData: RequestLoginData = {
    email: data.get('email') as string,
    password: data.get('password') as string,
  };

  const response = await API_V1_login(loginData);

  if (response.status === 422 || response.status === 401) {
    return response;
  }

  if (!response.ok) {
    throw json({ message: 'Could not authenticate user.' }, { status: 500 });
  }

  // const resData = await response.json();

  return redirect('/');
}
