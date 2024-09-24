import { ReactElement } from 'react';
import { EnumNotificationType } from '../enums/EnumNotification';

export type NotificationType =
  | EnumNotificationType.CONFIRM
  | EnumNotificationType.ERROR
  | EnumNotificationType.INFO
  | EnumNotificationType.FORM;

export interface Notification {
  dialogProps: DialogProps;
  type?: NotificationType;
  active?: boolean;
}

export interface ConfirmationNotification extends Notification {
  cancelText?: string;
  actionButtons?: ActionButtons[];
}

export interface FormNotification extends Notification {
  formData: {
    form: React.ForwardRefExoticComponent<any>;
    data: Record<string, any> | null;
  };
  onSuccess?: () => void;
  onFailure?: () => void;
}

export interface NotificationDialogProps {
  dialogProps: DialogProps;
  toggle: () => void;
}

interface DialogProps {
  title: string;
  message?: string | ReactElement;
}

interface ActionButtons {
  name: string;
  action: () => void;
}
