import NetworkClient from '@/api/v1/NetworkClient.ts';
import { handleLoaderError } from '@/utils/errors';
import { json, LoaderFunction } from 'react-router-dom';

const loaderUserAddresses: LoaderFunction = async () => {
  try {
    const [addressesResponse, addressTypesResponse] = await Promise.all([
      NetworkClient.getAccountDetailsAddresses(),
      NetworkClient.getAddressTypes(),
    ]);

    return json({
      addresses: addressesResponse.data,
      addressTypes: addressTypesResponse.data,
    });
  } catch (error) {
    handleLoaderError(error);
  }
};

export default loaderUserAddresses;
