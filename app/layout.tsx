import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  fallback: ["system-ui", "-apple-system", "Segoe UI", "sans-serif"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  fallback: ["ui-monospace", "SFMono-Regular", "monospace"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ayoubtec.vercel.app"),
  verification: {
    google: "vV6lRWvLdX8NYd9NYh9Fp3-d1FzlzhZLZGLFO5UUu0s",
  },

  title: {
    default: "Ayoub Rachidi Frontend Developer",
    template: "%s | Ayoub Rachidi",
  },

  description:
    "Frontend Developer specializing in React, Next.js and TypeScript. I build fast, responsive landing pages and modern web applications focused on performance and user experience.",

  keywords: [
    "Frontend Developer",
    "React Developer",
    "Next.js Developer",
    "TypeScript",
    "JavaScript",
    "Landing Page Developer",
    "Tailwind CSS",
    "Frontend Freelancer",
    "React",
    "Next.js",
    "Ayoub Rachidi",
  ],

  authors: [
    {
      name: "Ayoub Rachidi",
      url: "https://ayoubtec.vercel.app",
    },
  ],

  creator: "Ayoub Rachidi",

  publisher: "Ayoub Rachidi",

  alternates: {
    canonical: "https://ayoubtec.vercel.app",
  },

  robots: {
    index: true,
    follow: true,

    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  openGraph: {
    type: "website",
    locale: "en_US",

    url: "https://ayoubtec.vercel.app",

    title: "Ayoub Rachidi | React & Next.js Frontend Developer",

    description:
      "Frontend Developer specializing in React, Next.js and TypeScript. Building fast landing pages and modern web applications.",

    siteName: "Ayoub Rachidi Portfolio",

    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Ayoub Rachidi Portfolio",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title: "Ayoub Rachidi | React & Next.js Frontend Developer",

    description:
      "Frontend Developer specializing in React, Next.js and TypeScript.",

    images: ["/og-image.png"],

    creator: "@AYOU_pixel",
  },

  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },

  formatDetection: {
    telephone: false,
    email: false,
    address: false,
  },

  appleWebApp: {
    title: "Ayoub Rachidi",
    capable: true,
    statusBarStyle: "default",
  },

  category: "technology",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,

  themeColor: [
    {
      media: "(prefers-color-scheme: light)",
      color: "#ffffff",
    },
    {
      media: "(prefers-color-scheme: dark)",
      color: "#0B0F19",
    },
  ],
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
      <body className="antialiased">
        {children}

        <Analytics />
      </body>
    </html>
  );
}