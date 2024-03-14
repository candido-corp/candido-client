import { LoaderFunctionArgs, json } from 'react-router-dom';
import AuthService from '../services/auth/AuthService';
import { RequestRegisterVerifyByEmailData } from '../models/requests/RequestRegisterVerifyByEmailData';

export default async function loader({
  params,
}: LoaderFunctionArgs): Promise<Response> {
  const { token }: RequestRegisterVerifyByEmailData = params;

  if (!token) {
    return json({ message: 'Token is required.' }, { status: 422 });
  }

  const response = await new AuthService().registerVerifyByEmail(
    token as RequestRegisterVerifyByEmailData
  );

  if (response.status === 401) {
    return json({ message: 'Could not authenticate user.' });
  }

  if (!response.ok) {
    return json({ message: 'Could not authenticate user.' });
  }

  return json({ message: 'Email Verified..' });
}
