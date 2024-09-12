import { LoaderFunction, redirect } from 'react-router-dom';
import { EnumRoutes } from '@/models/enums/EnumRoutes.ts';
import { isAuthenticated } from '@/providers/AuthProvider.tsx';

export const loaderPublic: LoaderFunction = async () => {
  const redirectTo = `${EnumRoutes.DASHBOARD}`;

  const authStatus = await isAuthenticated();
  if (authStatus) {
    return redirect(redirectTo);
  }

  return null;
};

export default loaderPublic;
