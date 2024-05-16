import { useTranslation } from 'react-i18next';
import Account from '../../components/Account';
import PageContent from '../../components/PageContent';

const AccountPage = () => {
  const { t } = useTranslation();

  return (
    <PageContent title={t('my_account.title')}>
      <Account />
    </PageContent>
  );
};

export default AccountPage;
