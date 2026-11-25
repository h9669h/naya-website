import type { ReactNode } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ContentProvider } from '@/components/shared/ContentProvider';

export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <ContentProvider>
      <Header />
      <main id="main-content" className="min-h-[60vh]">
        {children}
      </main>
      <Footer />
    </ContentProvider>
  );
}
