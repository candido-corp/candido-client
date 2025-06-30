import NetworkClient from '@/api/v1/NetworkClient';
import { useApplyUserSettings } from '@/hooks/useApplyUserSettings';
import { EnumUserPermissions, EnumUserRoles } from '@/models/enums/EnumUsers';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import React, {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from 'react';

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
  login: () => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<AuthContextType['user']>(null);
  const [isAuthenticated, setIsAuthenticated] =
    useState<AuthContextType['isAuthenticated']>(false);
  const [isUserVerified, setIsUserVerified] =
    useState<AuthContextType['isUserVerified']>(false);
  const [loading, setLoading] = useState(true);

  const { applySettings } = useApplyUserSettings();

  // Helper function to update all auth states based on user data
  const updateAuthStates = (userData: AuthContextType['user']) => {
    setUser(userData);
    setIsAuthenticated(!!userData);
    setIsUserVerified(
      !!userData && userData.roles.includes(EnumUserRoles.USER_VERIFIED)
    );
  };

  // Helper function to fetch and apply user settings
  const fetchAndApplySettings = useCallback(async () => {
    try {
      const response = await NetworkClient.getAccountSettings();
      if (response.data) {
        applySettings(response.data);
      }
    } catch (error) {
      console.error('Error fetching user settings:', error);
    }
  }, [applySettings]);

  useEffect(() => {
    const fetchUser = async () => {
      const userData = await getAccessToken();
      updateAuthStates(userData);

      // If user is authenticated, fetch and apply their settings
      if (userData) {
        await fetchAndApplySettings();
      }

      setLoading(false);
    };

    fetchUser();
  }, [fetchAndApplySettings]);

  const login = async () => {
    const userData = await getAccessToken();
    updateAuthStates(userData);

    // If login is successful, fetch and apply user settings
    if (userData) {
      await fetchAndApplySettings();
    }
  };

  const logout = () => {
    updateAuthStates(null);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isUserVerified,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
