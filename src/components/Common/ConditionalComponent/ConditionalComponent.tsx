import { EnumUserPermissions, EnumUserRoles } from '@/models/enums/EnumUsers';
import { authProvider } from '@/utils/Auth';
import React from 'react';

interface Props {
  allowedRoles?: EnumUserRoles[];
  allowedPermissions?: EnumUserPermissions[];
  children: React.ReactNode;
}

const ConditionalComponent: React.FC<Props> = ({
  allowedRoles,
  allowedPermissions,
  children,
}) => {
  const { user } = authProvider;

  if (!user) {
    return null;
  }

  const hasRole = allowedRoles
    ? allowedRoles.some((role) => user.roles?.includes(role))
    : true;

  const hasPermission = allowedPermissions
    ? allowedPermissions.some((permission) =>
        user.permissions?.includes(permission)
      )
    : true;

  return hasRole && hasPermission ? children : null;
};

export default ConditionalComponent;
