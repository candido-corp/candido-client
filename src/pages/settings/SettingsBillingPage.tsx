import PageContent from '@/components/Common/PageContent';
import { Button } from '@/components/ui/button';
import { EnumRoutes } from '@/models/enums/EnumRoutes';
import { Link } from 'react-router-dom';

const SettingsBillingPage = () => {
  return (
    <PageContent title={'Settings billing page'}>
      <div className="flex gap-4 py-10">
        <Button asChild>
          <Link to={EnumRoutes.SETTINGS}>settings</Link>
        </Button>
      </div>
    </PageContent>
  );
};

export default SettingsBillingPage;
