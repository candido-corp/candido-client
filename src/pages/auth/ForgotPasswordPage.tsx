import { AuthContainer } from '@/components/auth/_common/AuthContainer';
import { ForgotPasswordForm } from '@/components/auth/ForgotPassword';
import { EnumRoutes } from '@/models/enums/EnumRoutes';
import { t } from 'i18next';

const ForgotPasswordPage = () => {
  return (
    <AuthContainer
      title={t('forgot_password.title')}
      description={t('forgot_password.description')}
      linkTo={EnumRoutes.REGISTER}
      linkText={t('login.register')}
      formComponent={<ForgotPasswordForm />}
    />
  );
};

export default ForgotPasswordPage;
