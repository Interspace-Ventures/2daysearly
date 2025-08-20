import type { Metadata } from 'next';
import { Inter, Alexandria } from 'next/font/google';
import './globals.css';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const alexandria = Alexandria({ 
  subsets: ['latin'],
  variable: '--font-alexandria',
  display: 'swap',
});

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
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${alexandria.variable}`}>
      <body className={`${inter.className} antialiased`} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}