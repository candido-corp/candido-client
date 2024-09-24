import { redirect } from 'react-router-dom';
import { EnumRoutes } from '@/models/enums/EnumRoutes.ts';
import { AuthContextType, isAuthenticated } from '@/providers/AuthProvider.tsx';
import NetworkClient from '@/api/v1/NetworkClient.ts';

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

    const authStatus = await isAuthenticated();
    if (!authStatus) {
      return redirect(redirectTo);
    }

    return null;
  };

export default loaderProtected;
