import NetworkClient from '@/api/v1/NetworkClient.ts';
import {
  ApiRequestRegisterVerify,
  RequestRegisterVerifyType,
} from '@/api/v1/requests/ApiRequestRegisterVerify';
import { EnumRoutes } from '@/models/enums/EnumRoutes';
import { AuthContextType } from '@/providers/AuthProvider';
import { NotificationContextType } from '@/providers/NotificationProvider';
import { handleLoaderError } from '@/utils/errors';
import { LoaderFunctionArgs, redirect } from 'react-router-dom';

const loaderRegisterVerify =
  ({ login }: AuthContextType, { toast }: NotificationContextType) =>
  async ({ request }: LoaderFunctionArgs) => {
    const url = new URL(request.url);
    const registerVerifyData: ApiRequestRegisterVerify = {
      t: url.searchParams.get('t') ?? undefined,
      e: url.searchParams.get('e') ?? undefined,
      a: (url.searchParams.get('a') as RequestRegisterVerifyType) ?? undefined,
    };

    if (
      !registerVerifyData.t ||
      !registerVerifyData.e ||
      !registerVerifyData.a
    ) {
      throw new Response('Missing token', { status: 400 });
    }

    try {
      await NetworkClient.registerVerify({
        data: registerVerifyData,
      });

      //update user data with new access token
      await login();

      toast({
        variant: 'default',
        title: 'Yeay!',
        description: 'Your account has been verified.',
        duration: 3000,
      });

      return redirect(EnumRoutes.HOME);
    } catch (error) {
      handleLoaderError(error);
    }
  };

export default loaderRegisterVerify;
