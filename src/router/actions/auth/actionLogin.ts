import { redirect } from 'react-router-dom';
import { RequestLoginData } from '@/models/requests/RequestLoginData';
import { EnumRoutes } from '@/models/enums/EnumRoutes';
import { AuthContextType } from '@/providers/AuthProvider.tsx';
import NetworkClient from '@/api/v1/NetworkClient.ts';
import { AxiosResponse } from 'axios';
import { NotificationContextType } from '@/providers/NotificationProvider';
import { EnumNotificationType } from '@/models/enums/EnumNotification';

const actionLogin =
  (
    { login }: AuthContextType,
    { askConfirmation, addNotification, toast }: NotificationContextType
  ) =>
  async ({ request }: { request: Request }) => {
    const data = await request.formData();
    const loginData: RequestLoginData = {
      email: data.get('email') as string,
      password: data.get('password') as string,
    };
    try {
      const response: AxiosResponse = await NetworkClient.login({
        data: loginData,
      });
      login(response.data);
      const redirectTo = data.get('redirectTo') as string | null;
      return redirect(redirectTo || EnumRoutes.HOME);
    } catch (error) {
      // addNotification({
      //   type: EnumNotificationType.ERROR,
      //   dialogProps: {
      //     title: 'Ops, something went wrong',
      //     message: '<Input placeholder={'aa'} id="email" autoComplete="email" />',
      //   },
      // });
      // askConfirmation({
      //   type: EnumNotificationType.CONFIRM,
      //   dialogProps: {
      //     title: 'Ops, something went wrong',
      //     message: 'We could not log you in. Please try again.',
      //   },
      //   actionButtons: [
      //     {
      //       name: 'Try again',
      //       action: () => alert('Try again'),
      //     },
      //     {
      //       name: 'Cancel',
      //       action: () => alert('Cancel'),
      //     },
      //   ],
      // });

      toast({
        variant: 'destructive',
        title: 'Ops, something went wrong',
        description: 'We could not log you in. Please try again.',
        duration: 2000,
      });
      return null;
    }
  };

export default actionLogin;
