import { EnumMiddlewareRoutes } from '../../../models/enums/EnumMiddlewareRoutes';
import { RequestRegisterVerifyByEmailData } from '../../../models/requests/RequestRegisterVerifyByEmailData';

export async function API_V1_register_verify_by_email(
  token: RequestRegisterVerifyByEmailData
): Promise<Response> {
  return await fetch(
    import.meta.env.VITE_MIDDLEWARE_BASE_URL +
      EnumMiddlewareRoutes.REGISTER_VERIFY_BY_EMAIL +
      '/' +
      token,
    {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
      },
    }
  );
}
