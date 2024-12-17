import { redirect } from 'react-router-dom';
import { EnumRoutes } from '@/models/enums/EnumRoutes';
import { AuthContextType } from '@/providers/AuthProvider.tsx';
import NetworkClient from '@/api/v1/NetworkClient.ts';
import { ApiRequestLogin } from '@/api/v1/requests/ApiRequestLogin';
import { useToast } from '@/components/ui/use-toast';

const actionLogin =
  ({ login }: AuthContextType, toast: ReturnType<typeof useToast>['toast']) =>
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
      return redirect(redirectTo || EnumRoutes.DASHBOARD);
    } catch (error) {
      console.error('error: ', error);
      toast({
        variant: 'destructive',
        title: 'Ops, something went wrong',
        description: 'We could not log you in. Please try again.',
        duration: 3000,
      });

      return null;
    }
  };

export default actionLogin;
