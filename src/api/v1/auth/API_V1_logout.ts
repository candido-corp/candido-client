import { EnumMiddlewareRoutes } from '../../../models/enums/EnumMiddlewareRoutes';

export async function API_V1_logout(): Promise<Response> {
  return await fetch(
    import.meta.env.VITE_MIDDLEWARE_BASE_URL + EnumMiddlewareRoutes.LOGOUT,
    {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
      },
      credentials: 'include',
    }
  );
}
