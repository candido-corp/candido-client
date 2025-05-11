import NetworkClient from '@/api/v1/NetworkClient.ts';
import { NotificationContextType } from '@/providers/NotificationProvider';

const actionRegisterEmailResend =
  ({ toast }: NotificationContextType) =>
  async () => {
    try {
      await NetworkClient.registerEmailResend();
      return false;
    } catch (error) {
      console.error('error: ', error);
      toast({
        variant: 'destructive',
        title: 'Ops, something went wrong',
        description: 'Error while resending email verification',
      });
      return false;
    }
  };

export default actionRegisterEmailResend;
