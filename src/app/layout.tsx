import React from 'react';
import { Metadata } from 'next';

import { AdminBar } from './_components/AdminBar';
import { Footer } from './_components/Footer';
import Header from './_components/Header'; // Correct import for client component
import { Providers } from './_providers';
import { InitTheme } from './_providers/Theme/InitTheme';
import { mergeOpenGraph } from './_utilities/mergeOpenGraph';
import Sidebar from './_components/Sidebar';

import './_css/app.scss';
import './globals.css';
import './styles/dashboard.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <InitTheme />
        <link rel="icon" href="/images/favicon.jpg" sizes="32x32" />
      </head>
      <body>
        <Providers>
          {/* <AdminBar /> */}
          <Header />
          <div className="flex rsp-sidebar-children-wrap-container">
            <Sidebar />
            <div className="flex-1">
              {children}
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SERVER_URL || 'https://payloadcms.com'),
  twitter: {
    card: 'summary_large_image',
    creator: '@payloadcms',
  },
  openGraph: mergeOpenGraph(),
};
