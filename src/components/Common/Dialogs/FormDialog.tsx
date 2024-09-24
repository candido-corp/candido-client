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
import { useRef } from 'react';
import { useTranslation } from 'react-i18next';

export type SubmitFormHandle = {
  submitForm: () => void;
};

type FormDialogProps = NotificationDialogProps & {
  DialogForm: React.ForwardRefExoticComponent<any>;
  data: Record<string, any> | null;
  onSuccess?: () => void;
  onFailure?: () => void;
};

export const FormDialog: React.FC<FormDialogProps> = ({
  dialogProps: { title, message },
  DialogForm,
  data,
  toggle,
  onSuccess,
  onFailure,
}) => {
  const { t } = useTranslation();
  const formRef = useRef<SubmitFormHandle>(null);

  const handleDismiss = () => {
    toggle();
  };

  const handleAccept = () => {
    formRef.current && formRef.current.submitForm();
  };

  const handleOnSuccess = () => {
    onSuccess && onSuccess();
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
        <DialogForm
          ref={formRef}
          data={data}
          onSuccess={() => handleOnSuccess()}
          onFailure={onFailure}
        />
        <AlertDialogFooter className="mt-7">
          <AlertDialogCancel asChild className="flex-1">
            <span onClick={handleDismiss}>{t('general.cancel')}</span>
          </AlertDialogCancel>
          <AlertDialogAction asChild className="flex-1">
            <span onClick={handleAccept}>{t('general.confirm')}</span>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
