import PageContent from '@/components/Common/PageContent';
import { Button } from '@/components/ui/button';
import { EnumRoutes } from '@/models/enums/EnumRoutes';
import { Link } from 'react-router-dom';

const SettingsPage = () => {
  return (
    <PageContent title={'Settings page'}>
      <div className="flex gap-4 py-10">
        <Button asChild>
          <Link to={EnumRoutes.SETTINGS_ACCOUNT}>account</Link>
        </Button>
        <Button asChild>
          <Link to={EnumRoutes.SETTINGS_COMMUNICATION}>communication</Link>
        </Button>
        <Button asChild>
          <Link to={EnumRoutes.SETTINGS_BILLING}>billing</Link>
        </Button>
        <Button asChild>
          <Link to={EnumRoutes.SETTINGS_PREFERENCES}>preferences</Link>
        </Button>
        <Button asChild>
          <Link to={EnumRoutes.SETTINGS_SECURITY}>security</Link>
        </Button>
      </div>
    </PageContent>
  );
};

export default SettingsPage;
