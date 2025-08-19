import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: '2 Days Early - Investment Syndicate',
  description: 'Operator-led investments for the future of technology. Join our syndicate of experienced operators investing in early-stage companies.',
  keywords: ['investment', 'syndicate', 'operator-led', 'early-stage', 'venture capital'],
  authors: [{ name: '2 Days Early' }],
  openGraph: {
    title: '2 Days Early - Investment Syndicate',
    description: 'Operator-led investments for the future of technology.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: '2 Days Early - Investment Syndicate',
    description: 'Operator-led investments for the future of technology.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Alexandria:wght@100..900&family=Inter:wght@100..900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={inter.className} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}