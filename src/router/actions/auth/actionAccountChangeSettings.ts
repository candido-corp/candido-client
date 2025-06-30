import NetworkClient from '@/api/v1/NetworkClient.ts';
import { ApiRequestAccountChangeSettings } from '@/api/v1/requests/ApiRequestAccountChangeSettings';
import { EnumUserSettingsKey } from '@/models/enums/EnumUsers';
import { NotificationContextType } from '@/providers/NotificationProvider';
import { handleActionError } from '@/utils/errors';

/**
 * Action for updating user account settings
 * Handles form submission for changing user settings (key-value pairs)
 * @param toast - Notification context for displaying success/error messages
 * @returns Action function that processes the settings change request
 */
const actionAccountChangeSettings =
  ({ toast }: NotificationContextType) =>
  async ({ request }: { request: Request }) => {
    let changeAccountSettingsData: ApiRequestAccountChangeSettings;

    const data = await request.formData();
    changeAccountSettingsData = {
      key: data.get('key') as EnumUserSettingsKey,
      value: data.get('value') as string,
    };

    try {
      await NetworkClient.changeAccountSettings({
        data: changeAccountSettingsData,
      });

      toast({
        variant: 'default',
        title: 'Success!',
        description: 'Your settings have been updated successfully.',
        duration: 3000,
      });

      return true;
    } catch (error) {
      console.error('Error in NetworkClient call:', error);
      handleActionError(
        error,
        'We could not update your settings. Please try again.',
        toast
      );
      return null;
    }
  };

export default actionAccountChangeSettings;
