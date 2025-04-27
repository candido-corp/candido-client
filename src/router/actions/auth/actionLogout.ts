import { redirect } from 'react-router-dom';
import NetworkClient from '@/api/v1/NetworkClient.ts';
import { AuthContextType } from '@/providers/AuthProvider.tsx';
import { EnumRoutes } from '@/models/enums/EnumRoutes.ts';
import { NotificationContextType } from '@/providers/NotificationProvider';

const actionLogout =
  ({ logout }: AuthContextType, { toast }: NotificationContextType) =>
  async () => {
    try {
      await NetworkClient.logout();
      logout();
      return redirect(EnumRoutes.LOGIN);
    } catch (error) {
      console.error('error: ', error);
      toast({
        variant: 'destructive',
        title: 'Ops, something went wrong',
        description: 'Error while logging out user',
      });
      return null;
    }
  };

export default actionLogout;
