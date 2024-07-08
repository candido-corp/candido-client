import { EnumUserPermissions, EnumUserRoles } from '@/models/enums/EnumUsers';
import { useAuth } from '@/hooks/useAuth.ts';

const withAuthorization = (
  allowedRoles: EnumUserRoles[],
  allowedPermissions: EnumUserPermissions[]
) => (WrappedComponent: React.FC) => {
  const AuthorizedComponent: React.FC = (props) => {
    const { user } = useAuth();

    // Aggiungi la tua logica di autorizzazione qui
    const hasRequiredRole = allowedRoles.some(role => user?.roles.includes(role));
    const hasRequiredPermission = allowedPermissions.every(permission => user?.permissions.includes(permission));

    if (!hasRequiredRole || !hasRequiredPermission) {
      return <div>Unauthorized</div>;
    }

    return <WrappedComponent {...props} />;
  };

  return AuthorizedComponent;
};

export default withAuthorization;
