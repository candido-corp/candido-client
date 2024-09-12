import { redirect } from 'react-router-dom';
import { RequestLoginData } from '@/models/requests/RequestLoginData';
import { EnumRoutes } from '@/models/enums/EnumRoutes';
import { AuthContextType } from '@/providers/AuthProvider.tsx';
import NetworkClient from '@/api/v1/NetworkClient.ts';
import { AxiosResponse } from 'axios';

const actionLogin =
  ({ login }: AuthContextType) =>
  async ({ request }: { request: Request }) => {
    const data = await request.formData();
    const loginData: RequestLoginData = {
      email: data.get('email') as string,
      password: data.get('password') as string,
    };

    console.log('loginData: ', loginData);

    const response: AxiosResponse = await NetworkClient.login({
      data: loginData,
    });
    login(response.data);

    const url = new URL(request.url);
    const redirectTo: string | null = url.searchParams.get('redirect');
    return redirect(redirectTo || EnumRoutes.DASHBOARD);
  };

export default actionLogin;
