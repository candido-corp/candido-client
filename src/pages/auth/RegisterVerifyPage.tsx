import PageContent from '@/components/Common/PageContent';
import { useTranslation } from 'react-i18next';
import { useLoaderData } from 'react-router-dom';

const RegisterVerifyPage = () => {
  const { t } = useTranslation();
  const data = useLoaderData() as { message: string }; //TODO fix type message

  return (
    <PageContent title={t('register_verify.title')}>
      <div>
        <p>{data.message}</p>
      </div>
    </PageContent>
  );
};

export default RegisterVerifyPage;
