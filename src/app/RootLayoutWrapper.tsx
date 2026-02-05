'use client';

import { usePathname } from 'next/navigation';
import Header from '@/components/header';
import Footer from '@/components/Footer';
import MobileMenu from '@/components/MobileMenu';

export default function RootLayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith('/admin');

  if (isAdmin) {
    return children;
  }

  return (
    <>
      <Header />
      <MobileMenu />
      {children}
      <Footer />
    </>
  );
}
