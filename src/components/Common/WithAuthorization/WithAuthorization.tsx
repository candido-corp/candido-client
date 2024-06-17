import { EnumUserPermissions, EnumUserRoles } from '@/models/enums/EnumUsers';
import { authProvider } from '@/utils/Auth';

const WithAuthorization =
  (allowedRoles: EnumUserRoles[], allowedPermissions: EnumUserPermissions[]) =>
  (WrappedComponent: React.FC) => {
    return (props: any) => {
      const { user } = authProvider;

      if (!user) {
        return <div>Access Denied</div>;
      }

      const hasRole = allowedRoles
        ? allowedRoles.some((role) => user.roles?.includes(role))
        : true;

      const hasPermission = allowedPermissions
        ? allowedPermissions.some((permission) =>
            user.permissions?.includes(permission)
          )
        : true;

      if (hasRole && hasPermission) {
        return <WrappedComponent {...props} />;
      }

      return <div>Access Denied</div>;
    };
  };

export default WithAuthorization;
