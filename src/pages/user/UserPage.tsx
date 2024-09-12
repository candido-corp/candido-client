import Account from '@/components/Account';
import PageContent from '@/components/Common/PageContent';
import { useTranslation } from 'react-i18next';

const UserPage = () => {
  const { t } = useTranslation();

  return (
    <PageContent title={t('my_account.title')}>
      <Account />
    </PageContent>
  );
};

export default UserPage;
