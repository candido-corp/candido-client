import { useTranslation } from 'react-i18next';
import LoginContainer from '@/components/auth/Login/LoginContainer';

const LoginPage = () => {
  const { t } = useTranslation();
  return (
    // <PageContent title={t('login.title')}>
    // </PageContent>
    <LoginContainer />
  );
};

export default LoginPage;
