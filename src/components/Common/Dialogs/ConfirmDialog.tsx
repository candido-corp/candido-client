import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { NotificationDialogProps } from '@/models/interfaces/Notification';
import { useTranslation } from 'react-i18next';

type ConfirmDialogProps = NotificationDialogProps & {
  cancelText?: string;
  confirmText?: string;
  callback?: () => void;
};

export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  title,
  message,
  open,
  cancelText,
  confirmText,
  toggle,
  callback,
}) => {
  const { t } = useTranslation();

  const dismiss = () => {
    toggle();
  };
  const accept = () => {
    toggle();
    callback && callback();
  };

  return (
    <AlertDialog open={open}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          {message && (
            <AlertDialogDescription>{message}</AlertDialogDescription>
          )}
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel asChild className="flex-1">
            <span onClick={dismiss}>{cancelText || t('general.cancel')}</span>
          </AlertDialogCancel>
          <AlertDialogAction asChild className="flex-1">
            <span onClick={accept}>{confirmText || t('general.confirm')}</span>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
