import NetworkClient from '@/api/v1/NetworkClient.ts';
import { ApiRequestLogin } from '@/api/v1/requests/ApiRequestLogin';
import { EnumRoutes } from '@/models/enums/EnumRoutes';
import { AuthContextType } from '@/providers/AuthProvider.tsx';
import { NotificationContextType } from '@/providers/NotificationProvider';
import { handleActionError } from '@/utils/errors';
import { redirect } from 'react-router-dom';

const actionLogin =
  ({ login }: AuthContextType, { toast }: NotificationContextType) =>
  async ({ request }: { request: Request }) => {
    const data = await request.formData();
    const loginData: Required<ApiRequestLogin> = {
      email: data.get('email') as string,
      password: data.get('password') as string,
    };
    try {
      await NetworkClient.login({
        data: loginData,
      });
      await login();

      const url = new URL(request.url);
      const redirectTo: string | null = url.searchParams.get('redirect');
      return redirect(redirectTo || EnumRoutes.HOME);
    } catch (error) {
      handleActionError(
        error,
        'We could not log you in. Please try again.',
        toast
      );
      return null;
    }
  };

export default actionLogin;
