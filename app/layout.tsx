import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { MobileActionBar } from '@/components/layout/MobileActionBar';
import { business } from '@/data/business';
import { siteUrl } from '@/lib/seo/config';
import { LocalBusinessJsonLd } from '@/components/seo/LocalBusinessJsonLd';
import { GoogleAnalytics } from '@/components/analytics/GoogleAnalytics';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${business.name} | Auto Detailing in ${business.cityState}`,
    template: `%s | ${business.name}`,
  },
  description: business.shortDescription,
  applicationName: business.name,
  keywords: [
    'auto detailing',
    'car detailing',
    'interior detailing',
    'exterior detailing',
    'Jackson MI',
    'Jackson Michigan',
  ],
  openGraph: {
    title: `${business.name} | Auto Detailing in ${business.cityState}`,
    description: business.shortDescription,
    url: siteUrl,
    siteName: business.name,
    locale: 'en_US',
    type: 'website',
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: '#0a0b0c',
  colorScheme: 'dark',
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-wv-black text-wv-text">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-wv-red focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
        >
          Skip to content
        </a>
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
        <MobileActionBar />
        <LocalBusinessJsonLd />
        <GoogleAnalytics />
      </body>
    </html>
  );
}
