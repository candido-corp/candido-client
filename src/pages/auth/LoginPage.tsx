import { AuthContainer } from '@/components/auth/_common/AuthContainer';
import { LoginForm } from '@/components/auth/Login';
import { EnumRoutes } from '@/models/enums/EnumRoutes';
import { t } from 'i18next';

const LoginPage = () => {
  return (
    <AuthContainer
      title={t('login.title')}
      description={t('login.description')}
      linkTo={EnumRoutes.REGISTER}
      linkText={t('login.register')}
      formComponent={<LoginForm />}
    />
  );
};

export default LoginPage;
