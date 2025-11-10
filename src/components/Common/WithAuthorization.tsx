import { useAuth } from '@/hooks/useAuth';
import { EnumUserPermissions, EnumUserRoles } from '@/models/enums/EnumUsers';
import React from 'react';

type WithAuthorizationOptions = {
  allowedRoles: EnumUserRoles[];
  allowedPermissions: EnumUserPermissions[];
  showUnauthorizedMessage?: boolean;
};

function withAuthorization<P extends object>({
  allowedRoles,
  allowedPermissions,
  showUnauthorizedMessage = false,
}: WithAuthorizationOptions) {
  return (WrappedComponent: React.ComponentType<P>) => {
    const AuthorizedComponent = (props: P) => {
      const { user } = useAuth();

      const hasRequiredRole = allowedRoles.some((role) =>
        user?.roles.includes(role)
      );
      const hasRequiredPermission = allowedPermissions.every((permission) =>
        user?.permissions.includes(permission)
      );

      if (!hasRequiredRole || !hasRequiredPermission) {
        return showUnauthorizedMessage ? <div>Unauthorized</div> : null;
      }

      return <WrappedComponent {...props} />;
    };

    return AuthorizedComponent;
  };
}

export default withAuthorization;
