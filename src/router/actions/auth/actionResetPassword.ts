import NetworkClient from '@/api/v1/NetworkClient.ts';
import { AxiosResponse } from 'axios';
import { NotificationContextType } from '@/providers/NotificationProvider';
import { ApiRequestResetPasswordChangePassword } from '@/api/v1/requests/ApiRequestResetPasswordChangePassword';

const actionResetPassword =
  ({ toast }: NotificationContextType) =>
  async ({ request }: { request: Request }) => {
    const data = await request.formData();
    const resetPasswordData: Required<ApiRequestResetPasswordChangePassword> = {
      t: data.get('t') as string,
      e: data.get('e') as string,
      password: data.get('password') as string,
      confirm_password: data.get('confirm_password') as string,
    };
    try {
      const response: AxiosResponse =
        await NetworkClient.resetPasswordChangePassword({
          data: resetPasswordData,
        });

      return response;
    } catch (error) {
      console.error('error: ', error);
      toast({
        variant: 'destructive',
        title: 'Ops, something went wrong',
        description: 'We could not reset your password. Please try again.',
        duration: 2000,
      });

      return null;
    }
  };

export default actionResetPassword;
