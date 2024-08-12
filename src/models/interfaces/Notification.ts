import { EnumNotificationType } from '../enums/EnumNotification';

export type NotificationType =
  | EnumNotificationType.CONFIRM
  | EnumNotificationType.ERROR
  | EnumNotificationType.INFO
  | EnumNotificationType.FORM;

export interface Notification {
  active?: boolean;
  type?: NotificationType;
  message?: string;
  title?: string;
}

export interface ConfirmationNotification extends Notification {
  type: EnumNotificationType.CONFIRM;
  cancelText?: string;
  confirmText?: string;
  callback?: () => void;
}

export interface FormNotification extends Notification {
  type: EnumNotificationType.FORM;
  formData: {
    form: React.ForwardRefExoticComponent<any>;
    data: Record<string, any> | null;
  };
  onSuccess?: () => void;
  onFailure?: () => void;
}

export interface NotificationDialogProps {
  title: string;
  message?: string;
  open: boolean;
  toggle: () => void;
}
