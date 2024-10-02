import { json, LoaderFunctionArgs } from 'react-router-dom';
import NetworkClient from '@/api/v1/NetworkClient.ts';
import { handleLoaderError } from '@/utils/errors';

export default async function loaderRegisterVerifyByEmail({
  request,
}: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const t = url.searchParams.get('t');
  const e = url.searchParams.get('e');

  if (!t || !e) {
    throw new Response('Missing token', { status: 400 });
  }

  try {
    await NetworkClient.registerEmailVerify({ data: { t, e } });
    return json({ t, e });
  } catch (error) {
    handleLoaderError(error);
  }
}
