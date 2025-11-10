import ConditionalComponent from '@/components/Common/ConditionalComponent';
import PageContent from '@/components/Common/PageContent';
import { Button } from '@/components/ui/button';
import { EnumRoutes } from '@/models/enums/EnumRoutes';
import { EnumUserPermissions, EnumUserRoles } from '@/models/enums/EnumUsers';
import { Link } from 'react-router-dom';

const DashboardPage = () => {
  return (
    <PageContent title="Welcome!">
      <p>Candido</p>
      <ConditionalComponent allowedRoles={[EnumUserRoles.ADMIN]}>
        <span>admin role</span>
      </ConditionalComponent>
      <ConditionalComponent
        allowedPermissions={[EnumUserPermissions.ADMIN_READ]}
      >
        <span>admin read permission</span>
      </ConditionalComponent>
      <ConditionalComponent
        allowedPermissions={[EnumUserPermissions.USER_READ]}
      >
        <span>User read permission</span>
      </ConditionalComponent>

      <div className="py-10">
        <Button asChild>
          <Link to={EnumRoutes.FORMS}>Forms</Link>
        </Button>
      </div>
    </PageContent>
  );
};

export default DashboardPage;
