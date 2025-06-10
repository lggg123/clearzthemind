import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import React from 'react';
import NeuralPathwaysSidebar from '../components/NeuralPathwaysSidebar';
import type { NeuralPathway } from '@/types';

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
  viewport: "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no",
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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let pathways: NeuralPathway[] = [];
  
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || (process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : '');
    const res = await fetch(`${baseUrl}/api/neural-pathways`, {
      cache: 'no-store',
    });
    
    if (!res.ok) {
      console.error('Failed to fetch pathways:', res.status, res.statusText);
      // Use fallback data if API fails
      pathways = [];
    } else {
      const data = await res.json();
      pathways = Array.isArray(data) ? data : [];
    }
  } catch (error) {
    console.error('Error fetching pathways:', error);
    // Use fallback data if fetch fails
    pathways = [];
  }

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <div>
          <NeuralPathwaysSidebar pathways={pathways} />
          {children}
        </div>
      </body>
    </html>
  );
}
