import NetworkClient from '@/api/v1/NetworkClient.ts';
import { ApiRequestAccountChangeDetails } from '@/api/v1/requests/ApiRequestAccountChangeDetails';
import { NotificationContextType } from '@/providers/NotificationProvider';
import { handleActionError } from '@/utils/errors';

const actionAccountChangeDetails =
  ({ toast }: NotificationContextType) =>
  async ({ request }: { request: Request }) => {
    const data = await request.formData();
    const changeAccountDetailsData: ApiRequestAccountChangeDetails = {
      first_name: data.get('first_name') as string,
      last_name: data.get('last_name') as string,
      gender_id: Number(data.get('gender_id')) || undefined,
      birthdate: data.get('birthdate') as string | undefined,
      mobile_number: data.get('mobile_number') as string | undefined,
      phone_number: data.get('phone_number') as string | undefined,
    };
    try {
      await NetworkClient.changeAccountDetails({
        data: changeAccountDetailsData,
      });

      toast({
        variant: 'default',
        title: 'Success!!',
        description: `Your account details have been updated.`,
        duration: 3000,
      });

      return true;
    } catch (error) {
      handleActionError(
        error,
        'We could not change your account details. Please try again.',
        toast
      );
      return null;
    }
  };

export default actionAccountChangeDetails;
