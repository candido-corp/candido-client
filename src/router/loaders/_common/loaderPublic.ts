import { EnumRoutes } from '@/models/enums/EnumRoutes.ts';
import { isUserAuthenticated } from '@/providers/AuthProvider.tsx';
import { LoaderFunction, redirect } from 'react-router-dom';

export const loaderPublic: LoaderFunction = async () => {
  const redirectTo = `${EnumRoutes.HOME}`;

  const authStatus = await isUserAuthenticated();
  if (authStatus) {
    return redirect(redirectTo);
  }

  return null;
};

export default loaderPublic;
