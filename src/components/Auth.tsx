// import { createContext, useMemo, useState } from 'react';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

interface User {
  email?: string | null;
  userType?: string | null;
}

interface AuthProvider {
  isAuthenticated: boolean;
  user: User | null;
  signin: () => void;
  signout: () => void;
}

const getAccessToken = () => {
  const accessToken: string | undefined = Cookies.get('access_token');
  if (!accessToken) {
    return null;
  }
  const decoded = jwtDecode<any>(accessToken);
  return { email: decoded.sub, userType: decoded.roles[0].authority };
};

export const authProvider: AuthProvider = {
  isAuthenticated: false,
  user: null,
  signin() {
    authProvider.isAuthenticated = true;
    authProvider.user = getAccessToken();
    console.log('signin', authProvider.user, authProvider.isAuthenticated);
  },
  signout() {
    authProvider.isAuthenticated = false;
    authProvider.user = null;
    console.log('signout', authProvider.user, authProvider.isAuthenticated);
  },
};
