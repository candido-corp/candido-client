import Account from '@/components/Account';
import PageContent from '@/components/Common/PageContent';
import { Button } from '@/components/ui/button';
import { EnumRoutes } from '@/models/enums/EnumRoutes';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const UserPage = () => {
  const { t } = useTranslation();

  return (
    <PageContent title={t('user.title')}>
      <Account />
      <div className="flex gap-4 py-10">
        <Button asChild>
          <Link to={EnumRoutes.USER_OPPORTUNITIES}>User opportunities</Link>
        </Button>
        <Button asChild>
          <Link to={EnumRoutes.USER_OPPORTUNITIES_STATS}>
            User opportunities stats
          </Link>
        </Button>
        <Button asChild>
          <Link to={EnumRoutes.USER_OPPORTUNITIES_HISTORY}>
            User opportunities history
          </Link>
        </Button>
        <Button asChild>
          <Link to={EnumRoutes.USER_OPPORTUNITIES_SAVED}>
            User opportunities saved
          </Link>
        </Button>
      </div>
    </PageContent>
  );
};

export default UserPage;
