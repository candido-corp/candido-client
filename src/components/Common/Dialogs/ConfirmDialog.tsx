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
import { Button } from '@/components/ui/button';
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
            <Button variant="secondary" onClick={dismiss}>
              {cancelText || t('notifications.cancel')}
            </Button>
          </AlertDialogCancel>

          {actionButtons ? (
            actionButtons.map(({ name, action }) => (
              <AlertDialogAction asChild key={name} className="flex-1">
                <Button onClick={() => executeAction(action)}>{name}</Button>
              </AlertDialogAction>
            ))
          ) : (
            <AlertDialogAction asChild className="flex-1">
              <Button onClick={toggle}>{t('notifications.confirm')}</Button>
            </AlertDialogAction>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
