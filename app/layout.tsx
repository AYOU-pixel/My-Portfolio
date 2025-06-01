import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ayoub | Front-End Developer",
  description:
    "I'm Ayoub, a passionate Front-End Developer crafting next-gen web experiences with React, Next.js, and cutting-edge technologies.",
  openGraph: {
    title: "Ayoub | Front-End Developer",
    description:
      "Building fast, modern, and user-centric web applications. Let's create something amazing together!",
    url: "https://your-website.com",
    siteName: "Ayoub Portfolio",
    images: [
      {
        url: "/logos.webp",
        width: 1200,
        height: 630,
        alt: "Ayoub Portfolio Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ayoub | Front-End Developer",
    description:
      "Creative Front-End Developer from Morocco, crafting seamless and vibrant digital experiences.",
    site: "@your_twitter_handle",
    creator: "@your_twitter_handle",
    images: ["logos.webp"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/logos.webp" type="image/jpeg" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-slate-950 text-slate-100`}
      >
        {children}
      </body>
    </html>
  );
}
