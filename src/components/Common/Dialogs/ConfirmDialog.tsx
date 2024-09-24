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
import {
  ConfirmationNotification,
  NotificationDialogProps,
} from '@/models/interfaces/Notification';
import { useTranslation } from 'react-i18next';

type ConfirmDialogProps = ConfirmationNotification & NotificationDialogProps;

export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  dialogProps: { title, message },
  cancelText,
  toggle,
  actionButtons,
}) => {
  const { t } = useTranslation();

  const dismiss = () => {
    toggle();
  };
  const executeAction = (action: () => void) => {
    toggle();
    action();
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
          <AlertDialogCancel asChild className="flex-1">
            <span onClick={dismiss}>
              {cancelText || t('notifications.cancel')}
            </span>
          </AlertDialogCancel>

          {actionButtons ? (
            actionButtons.map(({ name, action }) => (
              <AlertDialogAction asChild key={name} className="flex-1">
                <span onClick={() => executeAction(action)}>{name}</span>
              </AlertDialogAction>
            ))
          ) : (
            <AlertDialogAction asChild className="flex-1">
              <span onClick={toggle}>{t('notifications.confirm')}</span>
            </AlertDialogAction>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
