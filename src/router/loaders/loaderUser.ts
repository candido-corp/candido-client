import NetworkClient from '@/api/v1/NetworkClient.ts';
import { handleLoaderError } from '@/utils/errors';
import { json, LoaderFunction } from 'react-router-dom';

export const LOADER_USER_ID = 'user-root';

const loaderUser: LoaderFunction = async () => {
  try {
    const response = await NetworkClient.getAccountDetails();
    return json(response.data);
  } catch (error) {
    handleLoaderError(error);
  }
};

export default loaderUser;
