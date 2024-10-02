import { LoaderFunctionArgs } from 'react-router-dom';
import { ApiRequestRegisterEmailVerify } from '@/api/v1/requests/ApiRequestRegisterEmailVerify.ts';
import NetworkClient from '@/api/v1/NetworkClient.ts';

  try {
    await NetworkClient.registerEmailVerify({ data: { t, e } });
    return json({ t, e });
  } catch (error) {
    handleLoaderError(error);
  }
}
