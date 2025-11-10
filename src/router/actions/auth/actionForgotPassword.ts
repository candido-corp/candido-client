import NetworkClient from '@/api/v1/NetworkClient.ts';
import { ApiRequestResetPasswordSend } from '@/api/v1/requests/ApiRequestResetPasswordSend';
import { EnumRoutes } from '@/models/enums/EnumRoutes';
import { NotificationContextType } from '@/providers/NotificationProvider';
import { handleActionError } from '@/utils/errors';
import { redirect } from 'react-router-dom';

const actionForgotPassword =
  ({ toast }: NotificationContextType) =>
  async ({ request }: { request: Request }) => {
    const data = await request.formData();
    const forgotPasswordData: Required<ApiRequestResetPasswordSend> = {
      email: data.get('email') as string,
    };
    try {
      await NetworkClient.resetPasswordSend({
        data: forgotPasswordData,
      });

      toast({
        variant: 'default',
        title: 'Success!!',
        description: `We have sent you an email to ${forgotPasswordData.email} with instructions to reset your password.`,
        duration: 3000,
      });

      return redirect(EnumRoutes.LOGIN);
    } catch (error) {
      handleActionError(
        error,
        'We could not reset your password. Please try again.',
        toast
      );
      return null;
    }
  };

export default actionForgotPassword;
