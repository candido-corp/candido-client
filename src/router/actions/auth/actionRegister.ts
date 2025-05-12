import NetworkClient from '@/api/v1/NetworkClient.ts';
import {
  ApiRequestRegister,
  RequestRegisterType,
} from '@/api/v1/requests/ApiRequestRegister.ts';
import { AuthContextType } from '@/providers/AuthProvider';
import { NotificationContextType } from '@/providers/NotificationProvider';
import { handleActionError } from '@/utils/errors';
import { LoaderFunctionArgs } from 'react-router-dom';

const actionRegister =
  ({ login }: AuthContextType, { toast }: NotificationContextType) =>
  async ({ request }: LoaderFunctionArgs) => {
    const data = await request.formData();
    const registerData: ApiRequestRegister = {
      first_name: (data.get('first_name') as string) || undefined,
      last_name: (data.get('last_name') as string) || undefined,
      email: (data.get('email') as string) || undefined,
      password: (data.get('password') as string) || undefined,
      confirm_password: (data.get('confirm_password') as string) || undefined,
      a: data.get('a') as RequestRegisterType,
    };

    try {
      await NetworkClient.register({
        data: registerData,
      });
      await login();

      toast({
        variant: 'default',
        title: 'Yeay!',
        description:
          'You have successfully registered, you will receive an email to verify your account.',
        duration: 3000,
      });

      return null;
    } catch (error) {
      handleActionError(
        error,
        'We could not register your account. Please try again.',
        toast
      );
      return null;
    }
  };

export default actionRegister;
