import NetworkClient from '@/api/v1/NetworkClient.ts';
import { NotificationContextType } from '@/providers/NotificationProvider';
import { handleActionError } from '@/utils/errors';

const actionRegisterEmailResend =
  ({ toast }: NotificationContextType) =>
  async () => {
    try {
      await NetworkClient.registerEmailResend();
      return false;
    } catch (error) {
      handleActionError(
        error,
        'Error while resending email verification',
        toast
      );
      return null;
    }
  };

export default actionRegisterEmailResend;
