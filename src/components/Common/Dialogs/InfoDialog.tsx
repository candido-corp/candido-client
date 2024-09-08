import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { NotificationDialogProps } from '@/models/interfaces/Notification';
import { useTranslation } from 'react-i18next';

export const InfoDialog: React.FC<NotificationDialogProps> = ({
  dialogProps: { title, message },
  toggle,
}) => {
  const { t } = useTranslation();

  const dismiss = () => {
    toggle();
  };

  return (
    <AlertDialog open={true}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          {message && (
            <AlertDialogDescription>{message}</AlertDialogDescription>
          )}
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction asChild>
            <button onClick={dismiss}>
              {t('notifications.error_dialog.ok')}
            </button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
