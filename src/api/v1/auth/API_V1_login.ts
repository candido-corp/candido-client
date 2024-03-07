import { EnumMiddlewareRoutes } from '../../../models/enums/EnumMiddlewareRoutes';
import { RequestLoginData } from '../../../models/requests/RequestLoginData';

export async function API_V1_login(data: RequestLoginData): Promise<Response> {
  return await fetch(
    import.meta.env.VITE_MIDDLEWARE_BASE_URL + EnumMiddlewareRoutes.LOGIN,
    {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(data),
    }
  );
}
