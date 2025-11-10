import NetworkClient from '@/api/v1/NetworkClient.ts';
import { EnumRoutes } from '@/models/enums/EnumRoutes.ts';
import { AuthContextType } from '@/providers/AuthProvider.tsx';
import { NotificationContextType } from '@/providers/NotificationProvider';
import { handleActionError } from '@/utils/errors';
import { redirect } from 'react-router-dom';

const actionLogout =
  ({ logout }: AuthContextType, { toast }: NotificationContextType) =>
  async () => {
    try {
      await NetworkClient.logout();
      logout();
      return redirect(EnumRoutes.LOGIN);
    } catch (error) {
      handleActionError(error, 'Error while logging out user', toast);
      return null;
    }
  };

export default actionLogout;
