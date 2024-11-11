import NetworkClient from '@/api/v1/NetworkClient';
import { ApiRequestResetPasswordCheckValidity } from '@/api/v1/requests/ApiRequestResetPasswordCheckValidity';
import { handleLoaderError } from '@/utils/errors';
import { LoaderFunction, json } from 'react-router-dom';

const loaderResetPassword: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const resetPasswordCheckValidityData: ApiRequestResetPasswordCheckValidity = {
    t: url.searchParams.get('t') ?? undefined,
  };
  const e = url.searchParams.get('e');

  if (!resetPasswordCheckValidityData.t || !e) {
    throw new Response('Missing token', { status: 400 });
  }

  try {
    await NetworkClient.resetPasswordCheckValidity({
      params: resetPasswordCheckValidityData,
    });
    return json({ t: resetPasswordCheckValidityData.t, e });
  } catch (error) {
    handleLoaderError(error);
  }
};

export default loaderResetPassword;
