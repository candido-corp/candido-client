import { json, LoaderFunction } from 'react-router-dom';
import NetworkClient from '@/api/v1/NetworkClient.ts';
import { handleLoaderError } from '@/utils/errors';

const loaderUser: LoaderFunction = async () => {
  try {
    const response = await NetworkClient.getAccount();
    return json(response.data);
  } catch (error) {
    handleLoaderError(error);
  }
};

export default loaderUser;
