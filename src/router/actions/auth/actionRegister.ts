import NetworkClient from '@/api/v1/NetworkClient.ts';
import {
  ApiRequestRegister,
  RequestRegisterType,
} from '@/api/v1/requests/ApiRequestRegister.ts';
import { AuthContextType } from '@/providers/AuthProvider';
import { NotificationContextType } from '@/providers/NotificationProvider';
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
      console.error('error: ', error);
      toast({
        variant: 'destructive',
        title: 'Ops, something went wrong',
        description: 'We could not register your account. Please try again.',
        duration: 3000,
      });
      return null;
    }
  };

export default actionRegister;
