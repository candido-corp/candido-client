import NetworkClient from '@/api/v1/NetworkClient.ts';
import { ApiRequestRegisterEmailVerify } from '@/api/v1/requests/ApiRequestRegisterEmailVerify';
import { AuthContextType } from '@/providers/AuthProvider';
import { NotificationContextType } from '@/providers/NotificationProvider';
import { handleLoaderError } from '@/utils/errors';
import { LoaderFunctionArgs } from 'react-router-dom';

const loaderRegisterVerify =
  (
    { login, isAuthenticated }: AuthContextType,
    { toast }: NotificationContextType
  ) =>
  async ({ request }: LoaderFunctionArgs) => {
    const url = new URL(request.url);
    const registerEmailVerifyData: ApiRequestRegisterEmailVerify = {
      e: url.searchParams.get('e') ?? undefined,
      t: url.searchParams.get('t') ?? undefined,
    };

    if (!registerEmailVerifyData.t || !registerEmailVerifyData.e) {
      throw new Response('Missing token', { status: 400 });
    }

    try {
      await NetworkClient.registerEmailVerify({
        data: registerEmailVerifyData,
      });
      !isAuthenticated && (await login());

      toast({
        variant: 'default',
        title: 'Yeay!',
        description: 'Your email has been verified.',
        duration: 3000,
      });

      return null;
    } catch (error) {
      handleLoaderError(error);
    }
  };

export default loaderRegisterVerify;
