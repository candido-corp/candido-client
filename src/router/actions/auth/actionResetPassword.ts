import NetworkClient from '@/api/v1/NetworkClient.ts';
import { ApiRequestResetPasswordChangePassword } from '@/api/v1/requests/ApiRequestResetPasswordChangePassword';
import { redirect } from 'react-router-dom';
import { EnumRoutes } from '@/models/enums/EnumRoutes';
import { AuthContextType } from '@/providers/AuthProvider';
import { useToast } from '@/components/ui/use-toast';

const actionResetPassword =
  ({ login }: AuthContextType, toast: ReturnType<typeof useToast>['toast']) =>
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
      console.error('error: ', error);
      toast({
        variant: 'destructive',
        title: 'Ops, something went wrong',
        description: 'We could not reset your password. Please try again.',
        duration: 3000,
      });

      return null;
    }
  };

export default actionResetPassword;
