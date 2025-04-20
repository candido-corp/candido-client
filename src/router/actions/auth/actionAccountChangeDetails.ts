import NetworkClient from '@/api/v1/NetworkClient.ts';
import { ApiRequestAccountChangeDetails } from '@/api/v1/requests/ApiRequestAccountChangeDetails';
import { NotificationContextType } from '@/providers/NotificationProvider';

const actionAccountChangeDetails =
  ({ toast }: NotificationContextType) =>
  async ({ request }: { request: Request }) => {
    const data = await request.formData();
    const changeAccountDetailsData: ApiRequestAccountChangeDetails = {
      first_name: data.get('first_name') as string,
      last_name: data.get('last_name') as string,
      gender_id: Number(data.get('gender_id')),
      birthdate: data.get('birthdate') as unknown as Date,
      mobile_number: data.get('mobile_number') as string,
      phone_number: data.get('phone_number') as string,
      // address: null, // TODO fix
      // created_at: '2024-01-18 19:38:13',
      // deleted_at: null,
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
      console.error('error: ', error);
      toast({
        variant: 'destructive',
        title: 'Ops, something went wrong',
        description:
          'We could not change your account details. Please try again.',
        duration: 3000,
      });

      return null;
    }
  };

export default actionAccountChangeDetails;
