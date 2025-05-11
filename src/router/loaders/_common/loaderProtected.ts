import NetworkClient from '@/api/v1/NetworkClient.ts';
import { EnumRoutes } from '@/models/enums/EnumRoutes.ts';
import {
  AuthContextType,
  isUserAuthenticated,
} from '@/providers/AuthProvider.tsx';
import { redirect } from 'react-router-dom';

const loaderProtected =
  ({ logout }: AuthContextType) =>
  async ({ request }: { request: Request }) => {
    NetworkClient.setLogoutFunction(logout);

    const url = new URL(request.url);
    const paramsRedirect =
      url.pathname === '/'
        ? ''
        : `?redirect=${encodeURIComponent(url.pathname + url.search)}`;
    const redirectTo = `${EnumRoutes.LOGIN}${paramsRedirect}`;

    const authStatus = await isUserAuthenticated();
    if (!authStatus) {
      return redirect(redirectTo);
    }

    return null;
  };

export default loaderProtected;
