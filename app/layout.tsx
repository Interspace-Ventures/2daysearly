import type { Metadata } from 'next';
import { Inter, Archivo, Space_Mono } from 'next/font/google';
import './globals.css';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const archivo = Archivo({ 
  subsets: ['latin'],
  variable: '--font-archivo',
  display: 'swap',
});

const spaceMono = Space_Mono({ 
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-space-mono',
  display: 'swap',
});

const SITE_URL = 'https://daysearly.com';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: '2 Days Early - Investment Syndicate',
  description: 'Operator-led investments for the future of technology. Join our syndicate of experienced operators investing in early-stage companies.',
  keywords: ['investment', 'syndicate', 'operator-led', 'early-stage', 'venture capital'],
  authors: [{ name: '2 Days Early' }],
  openGraph: {
    title: '2 Days Early - Investment Syndicate',
    description: 'By operators. For operators. Operator-led investments for the future of technology.',
    url: SITE_URL,
    siteName: '2 Days Early',
    type: 'website',
    locale: 'en_US',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: '2 Days Early — By operators. For operators.',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '2 Days Early - Investment Syndicate',
    description: 'By operators. For operators. Operator-led investments for the future of technology.',
    images: ['/og-image.png'],
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
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${archivo.variable} ${spaceMono.variable}`}>
      <body className={`${inter.className} antialiased`} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}