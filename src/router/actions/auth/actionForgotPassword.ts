import NetworkClient from '@/api/v1/NetworkClient.ts';
import { AxiosResponse } from 'axios';
import { NotificationContextType } from '@/providers/NotificationProvider';
import { ApiRequestResetPasswordSend } from '@/api/v1/requests/ApiRequestResetPasswordSend';

const actionForgotPassword =
  ({ toast }: NotificationContextType) =>
  async ({ request }: { request: Request }) => {
    const data = await request.formData();
    const forgotPasswordData: Required<ApiRequestResetPasswordSend> = {
      email: data.get('email') as string,
    };
    try {
      const response: AxiosResponse = await NetworkClient.resetPasswordSend({
        data: forgotPasswordData,
      });

      toast({
        variant: 'default',
        title: 'Success!!',
        description:
          'We have sent you an email with instructions to reset your password.',
        duration: 2000,
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

export default actionForgotPassword;
