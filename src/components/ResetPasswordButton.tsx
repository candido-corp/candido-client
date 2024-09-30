import { useNotification } from '@/hooks/useNotification';
import { Button } from './ui/button';
import { useSubmit } from 'react-router-dom';
import { SubmitTarget } from 'react-router-dom/dist/dom';
import { useAuth } from '@/hooks/useAuth';
import { useTranslation } from 'react-i18next';

export const ResetPasswordButton = () => {
  const { t } = useTranslation();
  const { askConfirmation } = useNotification();
  const submit = useSubmit();
  const { user } = useAuth();

  const handleResetPassword = () => {
    askConfirmation({
      dialogProps: {
        title: t('user.change_password.title'),
        message: t('user.change_password.message'),
      },
      actionButtons: [
        {
          name: t('notifications.confirm'),
          action: () =>
            submit({ email: user?.email } as SubmitTarget, { method: 'post' }),
        },
      ],
    });
  };

  return (
    <Button onClick={() => handleResetPassword()}>
      {t('user.change_password.title')}
    </Button>
  );
};
