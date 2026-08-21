import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import type { Metadata } from 'next';
import { Lato, Montserrat } from 'next/font/google';
import FloatingActions from '@/components/FloatingActions';
import { ThemeProvider } from '@/components/theme-provider';
import './globals.css';

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '700', '800'],
  variable: '--font-montserrat',
  display: 'swap',
  preload: true,
});

const lato = Lato({
  subsets: ['latin'],
  weight: ['300', '400', '700'],
  style: ['normal', 'italic'],
  variable: '--font-lato',
  display: 'swap',
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.xosnos.com'),
  title: 'Steven Nguyen | Software Engineer II',
  description:
    'Portfolio of Steven Nguyen, Software Engineer II and co-founder of Terraces. Previously SDE II at Workday. Full-stack web, mobile, and AI-native systems.',
  openGraph: {
    type: 'website',
    siteName: 'Steven Nguyen',
    url: 'https://www.xosnos.com',
    title: 'Steven Nguyen | Software Engineer II',
    description:
      'Software Engineer II and co-founder of Terraces. Previously SDE II at Workday. Based in the San Francisco Bay Area.',
    images: [
      {
        url: '/assets/img/profile.jpg',
        width: 1200,
        height: 1200,
        alt: 'Steven Nguyen',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Steven Nguyen | Software Engineer II',
    description:
      'Software Engineer II and co-founder of Terraces. Previously SDE II at Workday.',
    images: ['/assets/img/profile.jpg'],
  },
  icons: {
    apple: '/assets/img/icon/apple-touch-icon.png',
    icon: [
      { url: '/assets/img/icon/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/assets/img/icon/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      {
        url: '/assets/img/icon/android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        url: '/assets/img/icon/android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  },
  manifest: '/manifest.json',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <meta
          name="theme-color"
          content="#ffffff"
          media="(prefers-color-scheme: light)"
        />
        <meta name="theme-color" content="#0f172a" media="(prefers-color-scheme: dark)" />
        <link rel="preconnect" href="https://i.scdn.co" crossOrigin="anonymous" />
      </head>
      <body className={`${montserrat.variable} ${lato.variable} font-lato antialiased`}>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:font-montserrat focus:font-bold focus:text-accent-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          Skip to content
        </a>
        <ThemeProvider
          attribute="data-theme"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <FloatingActions />
          <Analytics />
          <SpeedInsights />
        </ThemeProvider>
      </body>
    </html>
  );
}
