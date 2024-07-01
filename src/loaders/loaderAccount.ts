import { LoaderFunctionArgs, json, redirect } from 'react-router-dom';
import AuthService from '../services/auth/AuthService';
import { protectedLoaderRedirect } from '../utils/routesHelper';

export default async function loaderAccount(args: LoaderFunctionArgs) {
  const redirectRoute = protectedLoaderRedirect(args.request.url);
  if (redirectRoute) {
    return redirect(redirectRoute);
  }

  try {
    const response = await new AuthService().account();

    if (response.status === 401 || !response.ok) {
      return json({ message: 'Could not load account data.' });
    }

    return json({ message: 'Email Verified..' });
  } catch (error) {
    console.error('error: ', error);
    return json({ message: 'Could not load account data.' });
  }
}
