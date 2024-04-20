import { redirect } from 'react-router-dom';
import { authProvider } from '../../components/Auth';
import { EnumRoutes } from '../../models/enums/EnumRoutes';

export default async function loader() {
  if (authProvider.isAuthenticated) {
    return redirect(EnumRoutes.HOME);
  }
  return null;
}
