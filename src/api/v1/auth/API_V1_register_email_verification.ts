import { EnumMiddlewareRoutes } from '../../../models/enums/EnumMiddlewareRoutes';
import { RequestRegisterData } from '../../../models/requests/RequestRegisterData';

export async function API_V1_register_email_verification(
  data: RequestRegisterData
): Promise<Response> {
  return await fetch(
    import.meta.env.VITE_MIDDLEWARE_BASE_URL +
      EnumMiddlewareRoutes.REGISTER_EMAIL_VERIFICATION,
    {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(data),
    }
  );
}
