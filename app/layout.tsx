import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: "Ayoub Rachidi — Frontend Engineer",
  description:
    "Portfolio of Ayoub Rachidi, a Frontend Engineer crafting high-performance web experiences with React, Next.js, and TypeScript.",
  keywords: [
    "Frontend Engineer",
    "React",
    "Next.js",
    "TypeScript",
    "Web Development",
    "Ayoub Rachidi",
  ],
  authors: [{ name: "Ayoub Rachidi" }],
  creator: "Ayoub Rachidi",
  // Canonical URL — update to your real domain
  metadataBase: new URL("https://ayoub-rachidi.dev"),
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Ayoub Rachidi — Frontend Engineer",
    description:
      "Portfolio of Ayoub Rachidi, a Frontend Engineer crafting high-performance web experiences with React, Next.js, and TypeScript.",
    siteName: "Ayoub Rachidi Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ayoub Rachidi — Frontend Engineer",
    description:
      "Portfolio of Ayoub Rachidi, a Frontend Engineer crafting high-performance web experiences with React, Next.js, and TypeScript.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#0B0F19",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <head>
        <link rel="icon" href="/logo.png" type="image/png" />
        {/* Preconnect to Vercel's image optimization CDN to reduce LCP latency */}
        <link rel="preconnect" href="https://vercel.com" />
        {/* dns-prefetch as fallback for browsers that don't support preconnect */}
        <link rel="dns-prefetch" href="//vercel.com" />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
