// Admin Pages Layout - wraps all admin routes

'use client';

import { usePathname } from 'next/navigation';
import AdminLayout from '@/admin/AdminLayout';

export default function AdminPagesLayout({ 
  children,
  login
}: { 
  children: React.ReactNode;
  login?: React.ReactNode;
}) {
  const pathname = usePathname();
  const isLoginPage = pathname === '/admin/login' || pathname === '/en/admin/login' || pathname === '/de/admin/login' || pathname === '/ru/admin/login';

  // Show only login page without AdminLayout
  if (login && isLoginPage) {
    return login;
  }

  // Show admin layout without header/footer
  return <AdminLayout>{children}</AdminLayout>;
}
