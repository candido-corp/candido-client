// import { createContext, useMemo, useState } from 'react';
import { EnumUserPermissions, EnumUserRoles } from '@/models/enums/EnumUsers';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

interface User {
  email: string | null;
  roles: EnumUserRoles | null;
  permissions: EnumUserPermissions | null;
}

interface AuthProvider {
  isAuthenticated: boolean;
  user: User | null;
  signin: () => void;
  signout: () => void;
}

const getAccessToken = (): User | null => {
  const accessToken: string | undefined = Cookies.get('access_token');
  if (!accessToken) {
    return null;
  }
  const decoded = jwtDecode<any>(accessToken);
  return {
    email: decoded.sub,
    roles: decoded.roles,
    permissions: decoded.permissions,
  };
};

export const authProvider: AuthProvider = {
  isAuthenticated: false,
  user: null,
  signin() {
    authProvider.isAuthenticated = true;
    authProvider.user = getAccessToken();
  },
  signout() {
    authProvider.isAuthenticated = false;
    authProvider.user = null;
  },
};
