'use client';

import { FC, ReactNode, useContext, useEffect } from 'react';
import AdminLayout from './AdminLayout';
import { getProfile } from '@/src/services/auth';
import { AuthContext } from '@/src/context/Auth';

type MainLayoutProps = {
  children?: ReactNode;
};

const MainLayout: FC<MainLayoutProps> = ({ children }) => {
  const { user, setUser } = useContext(AuthContext);
  useEffect(() => {
    getProfile()
      .then((res) => {
        setUser(res.data);
      })
      .catch(() => {
        setUser(null);
      });
  }, []);

  if (!user) {
    return <>{children}</>;
  }
  return <AdminLayout>{children}</AdminLayout>;
};

export default MainLayout;
