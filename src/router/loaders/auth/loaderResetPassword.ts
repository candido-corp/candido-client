import NetworkClient from '@/api/v1/NetworkClient';
import { handleLoaderError } from '@/utils/errors';
import { LoaderFunction, json } from 'react-router-dom';

export const loaderResetPassword: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const t = url.searchParams.get('t');
  const e = url.searchParams.get('e');

  if (!t || !e) {
    throw new Response('Missing token', { status: 400 });
  }

  try {
    await NetworkClient.resetPasswordCheckValidity({
      params: { t },
    });
    return json({ t, e });
  } catch (error) {
    handleLoaderError(error);
  }
};

export default loaderResetPassword;
