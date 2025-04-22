import NetworkClient from '@/api/v1/NetworkClient';
import { EnumUserPermissions, EnumUserRoles } from '@/models/enums/EnumUsers';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import React, { createContext, ReactNode, useEffect, useState } from 'react';

export interface JwtPayload {
  sub: string;
  roles: EnumUserRoles;
  permissions: EnumUserPermissions;
}

export const dataFromToken = (token: string | undefined): User | null => {
  if (!token) return null;

  let decoded: JwtPayload;
  try {
    decoded = jwtDecode<JwtPayload>(token);
  } catch (error) {
    return null;
  }

  return {
    email: decoded.sub,
    roles: Array.isArray(decoded.roles) ? decoded.roles : [decoded.roles],
    permissions: Array.isArray(decoded.permissions)
      ? decoded.permissions
      : [decoded.permissions],
  };
};

export const getAccessToken = async (): Promise<User | null> => {
  let accessToken: string | undefined = Cookies.get('access_token');
  const refreshToken: string | undefined = Cookies.get('refresh_token');

  if (!accessToken) {
    if (refreshToken) {
      try {
        await NetworkClient.refreshToken();
        accessToken = Cookies.get('access_token');
        return dataFromToken(accessToken);
      } catch (error) {
        console.error('Error refreshing token', error);
      }
    }
    return null;
  }

  return dataFromToken(accessToken);
};

export const isUserAuthenticated = async (): Promise<boolean> => {
  return !!(await getAccessToken());
};

export interface User {
  email: string;
  roles: EnumUserRoles[];
  permissions: EnumUserPermissions[];
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isUserVerified: boolean;
  isUserVerifyStripeActive: boolean;
  login: () => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const userData = await getAccessToken();
      setUser(userData);
      setLoading(false);
    };

    fetchUser();
  }, []);

  const login = async () => {
    const userData = await getAccessToken();
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  const isAuthenticated = !!user;

  const isUserVerified =
    isAuthenticated && user.roles.includes(EnumUserRoles.USER_VERIFIED);

  const isUserVerifyStripeActive = !isUserVerified;

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isUserVerified,
        isUserVerifyStripeActive,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
