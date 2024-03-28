'use client';

import { FC, ReactNode } from 'react';
import AdminLayout from './AdminLayout';

type MainLayoutProps = {
  children?: ReactNode;
};

const MainLayout: FC<MainLayoutProps> = ({ children }) => {
  return <AdminLayout>{children}</AdminLayout>;
};

export default MainLayout;
