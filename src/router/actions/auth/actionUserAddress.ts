import NetworkClient from '@/api/v1/NetworkClient';
import { ApiRequestAccountDetailsAddress } from '@/api/v1/requests/ApiRequestAccountDetailsAddress';
import { PRIMARY_ADDRESS_ACTION } from '@/components/user/Address/UserSetPrimaryAddressForm';
import { NotificationContextType } from '@/providers/NotificationProvider';
import { handleActionError } from '@/utils/errors';
import { LoaderFunctionArgs } from 'react-router-dom';

const actionUserAddress =
  ({ toast }: NotificationContextType) =>
  async ({ request }: LoaderFunctionArgs) => {
    const data = await request.formData();
    const method = request.method;

    const addressData: ApiRequestAccountDetailsAddress = {
      territory_id: Number(data.get('territory_id')),
      type_id: Number(data.get('type_id')),
      zip: data.get('zip') as string,
      street: data.get('street') as string,
      house_number: data.get('house_number') as string,
      is_primary: data.get('is_primary') === 'true',
      display_name: data.get('display_name') as string,
    };

    try {
      switch (method) {
        case 'POST':
          // Add new address
          await NetworkClient.addAccountDetailsAddress({
            data: addressData,
          });

          toast({
            variant: 'default',
            title: 'Success!',
            description: 'Your address has been added successfully.',
            duration: 3000,
          });
          break;

        case 'PUT':
          // Handle primary address toggle
          const actionType = data.get('actionType') as string;
          if (actionType === PRIMARY_ADDRESS_ACTION) {
            const addressIdForPrimary = data.get('addressId') as string;

            await NetworkClient.setPrimaryAccountDetailsAddress({
              pathParams: { addressId: addressIdForPrimary },
            });

            toast({
              variant: 'default',
              title: 'Success!',
              description: 'Primary address has been updated successfully.',
              duration: 3000,
            });
          } else {
            // Edit existing address
            const addressIdForUpdate = data.get('addressId') as string;

            if (!addressIdForUpdate) {
              throw new Error('Address ID is required for updating');
            }

            await NetworkClient.changeAccountDetailsAddress({
              pathParams: { addressId: addressIdForUpdate },
              data: addressData,
            });

            toast({
              variant: 'default',
              title: 'Success!',
              description: 'Your address has been updated successfully.',
              duration: 3000,
            });
          }
          break;

        case 'DELETE':
          // Delete existing address
          const addressIdForDelete = data.get('addressId') as string;

          if (!addressIdForDelete) {
            throw new Error('Address ID is required for deletion');
          }

          await NetworkClient.deleteAccountDetailsAddress({
            pathParams: { addressId: addressIdForDelete },
          });

          toast({
            variant: 'default',
            title: 'Success!',
            description: 'Your address has been deleted successfully.',
            duration: 3000,
          });
          break;

        default:
          throw new Error(`Unsupported method: ${method}`);
      }

      return true;
    } catch (error) {
      let errorMessage: string;

      switch (method) {
        case 'POST':
          errorMessage = 'We could not add your address. Please try again.';
          break;
        case 'PUT':
          errorMessage = 'We could not update your address. Please try again.';
          break;
        case 'DELETE':
          errorMessage = 'We could not delete your address. Please try again.';
          break;
        default:
          errorMessage = 'An error occurred. Please try again.';
      }

      handleActionError(error, errorMessage, toast);
      return null;
    }
  };

export default actionUserAddress;
