import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/shared/ThemeProvider';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
const siteName = process.env.NEXT_PUBLIC_SITE_NAME || 'Naya Corp';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteName} · 企业科技官网`,
    template: `%s · ${siteName}`,
  },
  description: `${siteName} 官方网站`,
  icons: { icon: '/favicon.svg' },
  openGraph: {
    type: 'website',
    locale: 'zh_CN',
    siteName,
    title: `${siteName} · 企业科技官网`,
    description: `${siteName} 官方网站`,
    images: [{ url: '/og-image.svg', width: 1200, height: 630, alt: siteName }],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f8f7fc' },
    { media: '(prefers-color-scheme: dark)', color: '#080f26' },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN" suppressHydrationWarning className={inter.className}>
      <body className="min-h-screen bg-background font-sans text-foreground antialiased">
        <ThemeProvider>
          <a
            href="#main-content"
            className="fixed left-4 top-3 z-[100] -translate-y-24 rounded-full bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition focus:translate-y-0"
          >
            跳转至主要内容
          </a>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
