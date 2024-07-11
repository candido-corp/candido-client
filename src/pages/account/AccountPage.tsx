import Account from '@/components/Account';
import PageContent from '@/components/Common/PageContent';
import { useTranslation } from 'react-i18next';
import ErrorBoundary from '@/components/Common/ErrorBoundary.tsx';

const AccountPage = () => {
  const { t } = useTranslation();

  return (
    <PageContent title={t('my_account.title')}>
      <ErrorBoundary>
        <Account />
      </ErrorBoundary>
    </PageContent>
  );
};

export default AccountPage;
