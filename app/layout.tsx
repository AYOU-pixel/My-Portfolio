import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
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
  metadataBase: new URL("https://ayoub-rachidi.dev"),

  alternates: {
    canonical: "/",
  },

  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://ayoub-rachidi.dev",
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

  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },

  appleWebApp: {
    title: "Ayoub Rachidi",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0B0F19" },
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      dir="ltr"
      className={`${geistSans.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <body className="antialiased">{children}</body>
    </html>
  );
}