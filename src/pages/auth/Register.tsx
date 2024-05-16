import { useTranslation } from 'react-i18next';
import PageContent from '../../components/PageContent';
import RegisterForm from '../../components/auth/RegisterForm';

const RegisterPage = () => {
  const { t } = useTranslation();

  return (
    <PageContent title={t('register.title')}>
      <RegisterForm />
    </PageContent>
  );
};

export default RegisterPage;
