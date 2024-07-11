import { LoaderFunctionArgs } from 'react-router-dom';
import { ApiRequestRegisterEmailVerify } from '@/api/v1/requests/ApiRequestRegisterEmailVerify.ts';
import NetworkClient from '@/api/v1/NetworkClient.ts';

export default async function loaderRegisterVerifyByEmail({ params }: LoaderFunctionArgs) {
  const { t, e }: ApiRequestRegisterEmailVerify = params;
  await NetworkClient.registerEmailVerify({ data: { t, e } });
}
