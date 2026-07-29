'use client';

import { usePathname } from 'next/navigation';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import CallFAB from '@/components/fab';
import ReturnToTopButton from '@/components/return-to-top-button';

export default function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // The /admin section renders its own header/sidebar in its own layout,
  // so skip the public site's Navbar/Footer there to avoid double chrome.
  if (pathname?.startsWith('/admin')) {
    return <>{children}</>;
  }

  return (
    <>
      <Navbar />
      <main className="flex-grow">{children}</main>
      <Footer />
      <CallFAB />
      <ReturnToTopButton />
    </>
  );
}
