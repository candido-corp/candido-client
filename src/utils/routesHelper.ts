import { authProvider } from './Auth';
import { EnumRoutes } from '../models/enums/EnumRoutes';

export function protectedLoaderRedirect(url: string): string | null {
  if (!authProvider.isAuthenticated) {
    let params = new URLSearchParams();
    params.set('from', new URL(url).pathname);
    return `${EnumRoutes.LOGIN}?${params.toString()}`;
  }
  return null;
}
