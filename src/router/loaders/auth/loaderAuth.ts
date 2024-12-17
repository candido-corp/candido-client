import { EnumRoutes } from '@/models/enums/EnumRoutes';
import { isAuthenticated } from '@/providers/AuthProvider';
import { LoaderFunction, redirect } from 'react-router-dom';

const loaderAuth: LoaderFunction = async () => {
  const redirectTo = `${EnumRoutes.HOME}`;

  // const authStatus = await isAuthenticated();
  // if (authStatus) {
  //   return redirect(redirectTo);
  // }

  return null;
};

export default loaderAuth;
