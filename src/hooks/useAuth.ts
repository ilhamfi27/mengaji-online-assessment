import { UserLogin } from '../@types/user';
import {
  login as userLogin,
  getProfile as userProfile,
  logout as userLogout,
} from '../services/auth';
import { useState } from 'react';

export const useAuth = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const login = ({ email, password }: UserLogin) => {
    setLoading(true);
    return userLogin({ email, password }).finally(() => setLoading(false));
  };

  const getProfile = () => {
    return userProfile();
  };

  const logout = () => {
    return userLogout();
  };

  return {
    loading,
    login,
    getProfile,
    logout,
  };
};
