import { AuthContainer } from '@/components/auth/_common/AuthContainer';
import { RegisterForm } from '@/components/auth/Register';
import { EnumRoutes } from '@/models/enums/EnumRoutes';
import { t } from 'i18next';

const RegisterPage = () => {
  return (
    <AuthContainer
      title={t('register.sign_up')}
      description={t('register.description')}
      linkTo={EnumRoutes.LOGIN}
      linkText={t('login.sign_in')}
      formComponent={<RegisterForm />}
    />
  );
};

export default RegisterPage;
