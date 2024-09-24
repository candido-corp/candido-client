import PageContent from '@/components/Common/PageContent';
import { Button } from '@/components/ui/button';
import { EnumRoutes } from '@/models/enums/EnumRoutes';
import { Link } from 'react-router-dom';

const SettingsPage = () => {
  return (
    <PageContent title={'Settings page'}>
      <div className="flex gap-4 py-10">
        <Button asChild>
          <Link to={EnumRoutes.SETTINGS_GENERAL}>general</Link>
        </Button>
        <Button asChild>
          <Link to={EnumRoutes.SETTINGS_USER}>user</Link>
        </Button>
        <Button asChild>
          <Link to={EnumRoutes.SETTINGS_FORM}>form</Link>
        </Button>
      </div>
    </PageContent>
  );
};

export default SettingsPage;
