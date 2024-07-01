import ConditionalComponent from '@/components/Common/ConditionalComponent';
import PageContent from '@/components/Common/PageContent';
import { EnumUserPermissions, EnumUserRoles } from '@/models/enums/EnumUsers';

const HomePage = () => {
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
    </PageContent>
  );
};

export default HomePage;
