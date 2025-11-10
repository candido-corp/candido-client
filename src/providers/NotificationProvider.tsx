import {
  ErrorDialog,
  FormDialog,
  InfoDialog,
} from '@/components/Common/Dialogs';
import { ConfirmDialog } from '@/components/Common/Dialogs/ConfirmDialog';
import { Toaster } from '@/components/ui/toaster';
import { useToast } from '@/components/ui/use-toast';
import { useNotification } from '@/hooks/useNotification';
import { EnumNotificationType } from '@/models/enums/EnumNotification';
import {
  ConfirmationNotification,
  FormNotification,
  Notification,
} from '@/models/interfaces/Notification';
import { createContext, ReactNode, useState } from 'react';
import { useTranslation } from 'react-i18next';

export interface NotificationContextType {
  notification:
    | Notification
    | ConfirmationNotification
    | FormNotification
    | null;
  addNotification: (notification: Notification) => void;
  addFormNotification: (notification: FormNotification) => void;
  askConfirmation: (notification: ConfirmationNotification) => void;
  removeNotification: () => void;
  toast: ReturnType<typeof useToast>['toast'];
  translation: ReturnType<typeof useTranslation>['t'];
}

export const NotificationContext = createContext<
  NotificationContextType | undefined
>(undefined);

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const { t } = useTranslation();
  const [notification, setNotification] = useState<
    Notification | ConfirmationNotification | FormNotification | null
  >(null);
  const { toast } = useToast();

  const addNotification = (notification: Notification) => {
    const { type, dialogProps } = notification;
    setNotification({
      type,
      dialogProps,
    });
  };

  const addFormNotification = (notification: FormNotification) => {
    const { dialogProps, formData, onSuccess, onFailure } = notification;
    const type = EnumNotificationType.FORM;
    setNotification({
      type,
      dialogProps,
      formData,
      onSuccess,
      onFailure,
    });
  };

  const askConfirmation = (notification: ConfirmationNotification) => {
    const { dialogProps, cancelText, actionButtons } = notification;
    const type = EnumNotificationType.CONFIRM;
    setNotification({
      type,
      dialogProps,
      cancelText,
      actionButtons,
    });
  };

  const removeNotification = () => {
    setNotification(null);
  };

  return (
    <>
      <NotificationContext.Provider
        value={{
          notification,
          addNotification,
          addFormNotification,
          askConfirmation,
          removeNotification,
          toast,
          translation: t,
        }}
      >
        {notification && <NotificationModal />}
        <Toaster />
        {children}
      </NotificationContext.Provider>
    </>
  );
};

const NotificationModal = () => {
  const { notification, removeNotification } = useNotification();

  if (!notification) return null;

  switch (notification.type) {
    case EnumNotificationType.ERROR:
      return (
        <ErrorDialog
          dialogProps={notification.dialogProps}
          toggle={removeNotification}
        />
      );
    case EnumNotificationType.INFO:
      return (
        <InfoDialog
          dialogProps={notification.dialogProps}
          toggle={removeNotification}
        />
      );
    case EnumNotificationType.CONFIRM:
      const confirmationNotification = notification as ConfirmationNotification;
      return (
        <ConfirmDialog
          dialogProps={confirmationNotification.dialogProps}
          actionButtons={confirmationNotification.actionButtons}
          toggle={removeNotification}
        />
      );
    case EnumNotificationType.FORM:
      const formNotification = notification as FormNotification;
      return (
        <FormDialog
          dialogProps={formNotification.dialogProps}
          DialogForm={formNotification.formData?.form}
          data={formNotification.formData?.data}
          toggle={removeNotification}
          onSuccess={formNotification.onSuccess}
          onFailure={formNotification.onFailure}
        />
      );
    default:
      return null;
  }
};
