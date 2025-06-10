import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import React from 'react';
import NeuralPathwaysSidebar from '../components/NeuralPathwaysSidebar';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FRANK Robotics - Mental Health AI Platform",
  description: "Advanced AI-powered mental health support platform. Friendly Robotic Anti-Nihilism Kompanion providing 24/7 crisis intervention and emotional support.",
  icons: {
    icon: [
      { url: '/frank-favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', type: 'image/x-icon' }
    ],
    apple: [
      { url: '/frank-favicon.svg', sizes: '180x180', type: 'image/svg+xml' }
    ],
  },
  openGraph: {
    title: "FRANK Robotics - Mental Health AI Revolution",
    description: "The AI crisis intervention system saving lives 24/7. Revolutionary technology for mental health support.",
    images: [{ url: '/frank-robotics-logo.svg' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "FRANK Robotics - Mental Health AI Revolution",
    description: "The AI crisis intervention system saving lives 24/7. Revolutionary technology for mental health support.",
    images: ['/frank-robotics-logo.svg'],
  },
};

// Create a viewport export to fix the metadata warning
export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <div>
          <NeuralPathwaysSidebar />
          {children}
        </div>
      </body>
    </html>
  );
}
