import type { Metadata } from "next";
import { Montserrat, Lato } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { ThemeProvider } from "@/components/theme-provider";
import FloatingActions from "@/components/FloatingActions";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "700", "800"],
  variable: "--font-montserrat",
  display: "swap",
  preload: true,
});

const lato = Lato({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  style: ["normal", "italic"],
  variable: "--font-lato",
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: "Steven Nguyen | Software Engineer",
  description: "Portfolio of Steven Nguyen, a software engineer specializing in full-stack web and mobile development. Exploring the intersection of code, design, and AI.",
  openGraph: {
    type: "website",
    siteName: "Steven Nguyen",
    url: "https://www.xosnos.com",
    title: "Steven Nguyen | Software Engineer",
    description: "Full-stack Software Engineer & AI Enthusiast based in San Jose, CA.",
  },
  icons: {
    apple: "/assets/img/icon/apple-touch-icon.png",
    icon: [
      { url: "/assets/img/icon/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/assets/img/icon/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/assets/img/icon/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/assets/img/icon/android-chrome-512x512.png", sizes: "512x512", type: "image/png" },
    ],
  },
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://i.scdn.co" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://img.shields.io" crossOrigin="anonymous" />
      </head>
      <body
        className={`${montserrat.variable} ${lato.variable} font-lato antialiased`}
      >
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
