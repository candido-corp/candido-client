import NetworkClient from '@/api/v1/NetworkClient';
import { LoaderFunction, json } from 'react-router-dom';

export const loaderResetPassword: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const t = url.searchParams.get('t');
  const e = url.searchParams.get('e');

  if (!t || !e) {
    throw new Response('Invalid token', { status: 400 }); // TODO fix this
  }

  try {
    await NetworkClient.resetPasswordCheckValidity({
      params: { t },
    });
    return json({ t, e });
  } catch (error) {
    console.error('error: ', error);
    throw new Response('Invalid token', { status: 400 }); // TODO fix this
  }
};

export default loaderResetPassword;
