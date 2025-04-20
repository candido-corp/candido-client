import { useAuth } from '@/hooks/useAuth';
import { useNotification } from '@/hooks/useNotification';
import { BaseFC } from '@/models/interfaces/BaseFC';
import { useTranslation } from 'react-i18next';
import { useFetcher } from 'react-router-dom';
import { SubmitTarget } from 'react-router-dom/dist/dom';
import { Button } from './ui/button';

export const ResetPasswordButton: React.FC<BaseFC> = ({ className }) => {
  const { t } = useTranslation();
  const { askConfirmation } = useNotification();
  const fetcher = useFetcher();
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
            fetcher.submit({ email: user?.email } as SubmitTarget, {
              method: 'post',
            }),
        },
      ],
    });
  };

  return (
    <Button className={className} onClick={() => handleResetPassword()}>
      {t('user.change_password.title')}
    </Button>
  );
};
