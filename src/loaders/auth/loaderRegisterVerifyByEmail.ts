import { LoaderFunctionArgs, json } from 'react-router-dom';
import AuthService from '../../services/auth/AuthService';
import { RequestRegisterVerifyByEmailData } from '../../models/requests/RequestRegisterVerifyByEmailData';

export default async function loader({ params }: LoaderFunctionArgs) {
  const { token }: RequestRegisterVerifyByEmailData = params;

  if (!token) {
    return json({ message: 'Token is required.' }, { status: 422 });
  }

  try {
    const response = await new AuthService().registerVerifyByEmail(
      token as RequestRegisterVerifyByEmailData
    );

    if (response.status === 401 || !response.ok) {
      return json({ message: 'Could not authenticate user.' });
    }

    return json({ message: 'Email Verified..' });
  } catch (error) {
    console.error('error: ', error);
    return json({ message: 'Could not authenticate user.' });
  }
}
