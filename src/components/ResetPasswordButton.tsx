import { Button } from './ui/button';
import { useFetcher } from 'react-router-dom';
import { SubmitTarget } from 'react-router-dom/dist/dom';
import { useAuth } from '@/hooks/useAuth';
import { useTranslation } from 'react-i18next';
import { notificationActions } from '@/store/notification-slice';
import { useAppDispatch } from '@/hooks/useRedux';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const ResetPasswordButton = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { askConfirmation } = notificationActions;
  const fetcher = useFetcher();
  const { user } = useAuth();

  const handleResetPassword = () => {
    dispatch(
      askConfirmation({
        dialogProps: {
          title: t('user.change_password.title'),
          message: t('user.change_password.message'),
        },
        actionButtons: [
          {
            name: t('notifications.confirm'),
            action: () => {
              if (user?.email) {
                dispatch(confirmAction({ email: user.email }));
              }
            },
          },
        ],
      })
    );
  };

  return (
    <Button onClick={() => handleResetPassword()}>
      {t('user.change_password.title')}
    </Button>
  );
};

// Thunk per la conferma
export const confirmAction = createAsyncThunk(
  'notification/confirmAction',
  (params: { email: string }, { dispatch }) => {
    const fetcher = useFetcher();
    const { email } = params;
    fetcher.submit({ email }, { method: 'post' });
    // dispatch(notificationActions.removeNotification());
  }
);
