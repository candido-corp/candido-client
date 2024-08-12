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
  notification: Notification | ConfirmationNotification;
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
    Notification | ConfirmationNotification | FormNotification
  >({
    active: false,
  });
  const { toast } = useToast();

  const addNotification = (notification: Notification) => {
    const { type, message, title } = notification;
    setNotification({
      type,
      title,
      message,
      active: true,
    });
  };

  const addFormNotification = (notification: FormNotification) => {
    const { type, message, title, formData, onSuccess, onFailure } =
      notification;
    setNotification({
      type,
      title,
      message,
      active: true,
      formData,
      onSuccess,
      onFailure,
    });
  };

  const askConfirmation = (notification: ConfirmationNotification) => {
    const { type, message, callback, title, cancelText, confirmText } =
      notification;
    setNotification({
      type,
      title,
      message,
      cancelText,
      confirmText,
      active: true,
      callback,
    });
  };

  const removeNotification = () => {
    setNotification({ active: false });
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
        {notification.active && <NotificationModal />}
        <Toaster />
        {children}
      </NotificationContext.Provider>
    </>
  );
};

const NotificationModal = () => {
  const { notification, removeNotification } = useNotification();

  if (!notification.active) return null;

  switch (notification.type) {
    case EnumNotificationType.ERROR:
      return (
        <ErrorDialog
          title={notification.title || 'Error'}
          message={notification.message}
          open={notification.active}
          toggle={removeNotification}
        />
      );
    case EnumNotificationType.INFO:
      return (
        <InfoDialog
          title={notification.title || 'Info'}
          message={notification.message}
          open={notification.active}
          toggle={removeNotification}
        />
      );
    case EnumNotificationType.CONFIRM:
      const confirmationNotification = notification as ConfirmationNotification;
      return (
        <ConfirmDialog
          title={confirmationNotification.title || 'Question'}
          message={confirmationNotification.message || ''}
          cancelText={confirmationNotification.cancelText}
          confirmText={confirmationNotification.confirmText}
          open={confirmationNotification.active || false}
          toggle={removeNotification}
          callback={confirmationNotification.callback}
        />
      );
    case EnumNotificationType.FORM:
      const formNotification = notification as FormNotification;
      return (
        <FormDialog
          title={formNotification.title || 'Form'}
          message={formNotification.message}
          open={formNotification.active || false}
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
