import type { Metadata, Viewport } from 'next';
import { Analytics } from '@vercel/analytics/next';

import '@/styles/globals.css';
import { inter, jetbrainsMono } from './fonts';
import { SITE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Hrant Grishyan — Senior Frontend Engineer',
    template: '%s | Hrant Grishyan',
  },
  description:
    'Senior Frontend Engineer with 5 years of enterprise experience at EPAM Systems. ' +
    'Specialising in performance-critical React applications, Core Web Vitals, and accessibility.',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_URL,
    siteName: 'Hrant Grishyan',
    title: 'Hrant Grishyan — Senior Frontend Engineer',
    description:
      'Senior Frontend Engineer specialising in React, Next.js, Core Web Vitals, and accessibility.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hrant Grishyan — Senior Frontend Engineer',
    description:
      'Senior Frontend Engineer specialising in React, Next.js, Core Web Vitals, and accessibility.',
  },
  alternates: {
    canonical: SITE_URL,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#fafafa' },
    { media: '(prefers-color-scheme: dark)', color: '#09090b' },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable}`}
      // Browser extensions (e.g. LastPass, Grammarly) inject attributes on <html>.
      // suppressHydrationWarning prevents false-positive hydration errors from those.
      suppressHydrationWarning
    >
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
