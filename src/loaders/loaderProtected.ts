import { LoaderFunctionArgs, redirect } from 'react-router-dom';
import { authProvider } from '../components/Auth';
import { EnumRoutes } from '../models/enums/EnumRoutes';

//TODO redirect is not working
export function loaderProtected({ request }: LoaderFunctionArgs) {
  if (!authProvider.isAuthenticated) {
    let params = new URLSearchParams();
    params.set('from', new URL(request.url).pathname);
    return redirect(`${EnumRoutes.LOGIN}?${params.toString()}`);
  }
  return null;
}
