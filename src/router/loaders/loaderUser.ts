import { json } from 'react-router-dom';
import NetworkClient from '@/api/v1/NetworkClient.ts';
import { handleLoaderError } from '@/utils/errors';

export default async function loaderUser() {
  try {
    const response = await NetworkClient.getAccount();
    return json(response.data);
  } catch (error) {
    handleLoaderError(error);
  }
}
