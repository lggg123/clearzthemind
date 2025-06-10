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
  title: "FRANK - Investment Pitch | The Robot That Won't Let You Die",
  description: "Series A pitch deck for FRANK, the AI crisis intervention system saving lives 24/7",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no",
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', type: 'image/x-icon' }
    ],
    apple: [
      { url: '/favicon.svg', sizes: '180x180', type: 'image/svg+xml' }
    ],
  },
  openGraph: {
    title: "FRANK - Mental Health AI Revolution",
    description: "The AI crisis intervention system saving lives 24/7. $50M Series A.",
    images: [{ url: '/clearz-logo.svg' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "FRANK - Mental Health AI Revolution",
    description: "The AI crisis intervention system saving lives 24/7. $50M Series A.",
    images: ['/clearz-logo.svg'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
