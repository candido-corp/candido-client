import React, { createContext, useState, ReactNode } from 'react';
import { EnumUserPermissions, EnumUserRoles } from '@/models/enums/EnumUsers.ts';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

export interface JwtPayload {
  sub: string;
  roles: EnumUserRoles;
  permissions: EnumUserPermissions;
}

export const getAccessToken = (): User | null => {
  const accessToken: string | undefined = Cookies.get('access_token');
  if (!accessToken) {
    return null;
  }

  let decoded: JwtPayload;
  try {
    decoded = jwtDecode<JwtPayload>(accessToken);
  } catch (error) {
    return null;
  }

  return {
    email: decoded.sub,
    roles: decoded.roles,
    permissions: decoded.permissions,
  };
};

export const isAuthenticated = () => {
  return !!getAccessToken();
}

export interface User {
  email: string;
  roles: EnumUserRoles;
  permissions: EnumUserPermissions;
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (userData: User) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(getAccessToken());
  const isAuthenticated = !!user;

  const login = () => {
    setUser(getAccessToken());
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};