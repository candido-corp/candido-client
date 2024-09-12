import { json, redirect } from 'react-router-dom';
import NetworkClient from '@/api/v1/NetworkClient.ts';
import { AuthContextType } from '@/providers/AuthProvider.tsx';
import { EnumRoutes } from '@/models/enums/EnumRoutes.ts';

const actionLogout =
  ({ logout }: AuthContextType) =>
  async () => {
    try {
      await NetworkClient.logout();
      logout();
      return redirect(EnumRoutes.HOME);
    } catch (error) {
      console.error('error: ', error);
      throw json({ message: 'error while logging out user' }, { status: 500 });
    }
  };

export default actionLogout;
