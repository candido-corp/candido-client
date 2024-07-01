import { useLoaderData } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import PageContent from '@/components/Common/PageContent';

const RegisterVerifyByEmailPage = () => {
  const { t } = useTranslation();
  const data = useLoaderData() as { message: string }; //TODO fix type message

  return (
    <PageContent title={t('register_verify_email.title')}>
      <div>
        <p>{data.message}</p>
      </div>
    </PageContent>
  );
};

export default RegisterVerifyByEmailPage;
