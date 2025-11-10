import NetworkClient from '@/api/v1/NetworkClient.ts';
import { ApiRequestResetPasswordChangePassword } from '@/api/v1/requests/ApiRequestResetPasswordChangePassword';
import { EnumRoutes } from '@/models/enums/EnumRoutes';
import { AuthContextType } from '@/providers/AuthProvider';
import { NotificationContextType } from '@/providers/NotificationProvider';
import { handleActionError } from '@/utils/errors';
import { redirect } from 'react-router-dom';

const actionResetPassword =
  ({ login }: AuthContextType, { toast }: NotificationContextType) =>
  async ({ request }: { request: Request }) => {
    const data = await request.formData();
    const resetPasswordData: Required<ApiRequestResetPasswordChangePassword> = {
      t: data.get('t') as string,
      e: data.get('e') as string,
      password: data.get('password') as string,
      confirm_password: data.get('confirm_password') as string,
    };
    try {
      await NetworkClient.resetPasswordChangePassword({
        data: resetPasswordData,
      });
      await login();

      toast({
        variant: 'default',
        title: 'Yeay!',
        description: 'Your password has been reset successfully.',
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

export default actionResetPassword;
