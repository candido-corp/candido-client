import { LoaderFunctionArgs } from 'react-router-dom';
import NetworkClient from '@/api/v1/NetworkClient.ts';
import { handleLoaderError } from '@/utils/errors';
import { AuthContextType } from '@/providers/AuthProvider';
import { ApiRequestRegisterEmailVerify } from '@/api/v1/requests/ApiRequestRegisterEmailVerify';
import { useToast } from '@/components/ui/use-toast';

const loaderRegisterVerifyByEmail =
  (
    { login, isAuthenticated }: AuthContextType,
    toast: ReturnType<typeof useToast>['toast']
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

export default loaderRegisterVerifyByEmail;
