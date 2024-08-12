import { LoaderFunctionArgs } from 'react-router-dom';
import NetworkClient from '@/api/v1/NetworkClient.ts';
import { ApiRequestRegister } from '@/api/v1/requests/ApiRequestRegister.ts';
import { NotificationContextType } from '@/providers/NotificationProvider';

const actionRegister =
  ({ toast }: NotificationContextType) =>
  async ({ request }: LoaderFunctionArgs) => {
    const data = await request.formData();
    const registerData: ApiRequestRegister = {
      first_name: data.get('first_name') as string,
      last_name: data.get('last_name') as string,
      email: data.get('email') as string,
      password: data.get('password') as string,
      confirm_password: data.get('confirm_password') as string,
    };

    try {
      await NetworkClient.registerEmail({ data: registerData });
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Ops, something went wrong',
        description: 'We could not register your account. Please try again.',
        duration: 2000,
      });
      return null;
    }
  };

export default actionRegister;
