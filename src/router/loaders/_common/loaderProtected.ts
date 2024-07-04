import { LoaderFunction, redirect } from 'react-router-dom';
import { EnumRoutes } from '@/models/enums/EnumRoutes.ts';
import { isAuthenticated } from '@/providers/AuthProvider.tsx';

export const loaderProtected: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const redirectTo = `${EnumRoutes.LOGIN}?redirect=${encodeURIComponent(url.pathname + url.search)}`;

  if (!isAuthenticated()) {
    return redirect(redirectTo);
  }

  return null;
}

export default loaderProtected;