import { useTranslation } from 'react-i18next';
import LoginForm from '../../components/auth/LoginForm';
import PageContent from '../../components/PageContent';

const LoginPage = () => {
  const { t } = useTranslation();
  return (
    <PageContent title={t('login.title')}>
      <LoginForm />
    </PageContent>
  );
};

export default LoginPage;
