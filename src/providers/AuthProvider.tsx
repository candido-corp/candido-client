import { createContext, useContext, useState } from 'react';
import { EnumUserPermissions, EnumUserRoles } from '@/models/enums/EnumUsers.ts';

const AuthContext = createContext({});

interface User {
  email: string | null;
  roles: EnumUserRoles | null;
  permissions: EnumUserPermissions | null;
}

export const AuthProvider = ({ children }: { children: never }) => {
  const [user, setUser] = useState<User>();

  const login = (userData: User) => {
    setUser(userData);
  };

  const logout = () => {
    setUser({ email: null, roles: null, permissions: null });
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
