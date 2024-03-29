'use client';

import { usePathname, useRouter } from 'next/navigation';
import {
  Dispatch,
  FC,
  PropsWithChildren,
  SetStateAction,
  createContext,
  useEffect,
  useState,
} from 'react';
import { User } from '../@types/user';
import { getProfile } from '../services/auth';

type ContextType = {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
};

export const AuthContext = createContext<ContextType>({
  user: null,
  setUser: () => null,
});

export const AuthContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const router = useRouter();
  const pathname = usePathname();

  const ALLOWED_ANON_PATH = ['/', '/login', '/register'];

  useEffect(() => {
    getProfile()
      .then((res) => {
        setUser(res.data);
      })
      .catch(() => {
        setUser(null);
        router.push('/login');
      });
  }, []);

  // simple guard using useEffect
  useEffect(() => {}, [user]);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
