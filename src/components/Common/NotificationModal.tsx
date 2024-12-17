import {
  ErrorDialog,
  InfoDialog,
  FormDialog,
  ConfirmDialog,
} from '@/components/Common/Dialogs';
import { EnumNotificationType } from '@/models/enums/EnumNotification';
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux';
import {
  selectNotification,
  notificationActions,
} from '@/store/notification-slice';
import {
  ConfirmationNotification,
  FormNotification,
} from '@/models/interfaces/Notification';

export const NotificationModal = () => {
  const notification = useAppSelector(selectNotification);
  const dispatch = useAppDispatch();
  const { removeNotification } = notificationActions;

  if (!notification) return null;

  const handleClose = () => dispatch(removeNotification());

  switch (notification.type) {
    case EnumNotificationType.ERROR:
      return (
        <ErrorDialog
          dialogProps={notification.dialogProps}
          toggle={handleClose}
        />
      );
    case EnumNotificationType.INFO:
      return (
        <InfoDialog
          dialogProps={notification.dialogProps}
          toggle={handleClose}
        />
      );
    case EnumNotificationType.CONFIRM:
      const confirmationNotification = notification as ConfirmationNotification;
      return (
        <ConfirmDialog
          dialogProps={confirmationNotification.dialogProps}
          actionButtons={confirmationNotification.actionButtons}
          toggle={handleClose}
        />
      );
    case EnumNotificationType.FORM:
      const formNotification = notification as FormNotification;
      return (
        <FormDialog
          dialogProps={notification.dialogProps}
          DialogForm={formNotification.formData?.form}
          data={formNotification.formData?.data}
          toggle={handleClose}
          onSuccess={formNotification.onSuccess}
          onFailure={formNotification.onFailure}
        />
      );
    default:
      return null;
  }
};
