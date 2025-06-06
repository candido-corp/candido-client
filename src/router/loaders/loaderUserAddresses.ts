import NetworkClient from '@/api/v1/NetworkClient.ts';
import { handleLoaderError } from '@/utils/errors';
import { json, LoaderFunction } from 'react-router-dom';

/**
 * Loader function for user addresses page
 * Fetches user addresses and available address types from the API
 * @returns Combined data object containing addresses and address types
 */
const loaderUserAddresses: LoaderFunction = async () => {
  try {
    // Fetch both addresses and address types in parallel for better performance
    const [addressesResponse, addressTypesResponse] = await Promise.all([
      NetworkClient.getAccountDetailsAddresses(),
      NetworkClient.getAddressTypes(),
    ]);

    // Return combined data for the page component
    return json({
      addresses: addressesResponse.data,
      addressTypes: addressTypesResponse.data,
    });
  } catch (error) {
    handleLoaderError(error);
  }
};

export default loaderUserAddresses;
