import type { Metadata } from 'next';
import { Inter, Oswald } from 'next/font/google';
import { siteUrl } from '@/lib/site-url';
import './globals.css';

const inter = Inter({ variable: '--font-inter', subsets: ['latin'] });
const oswald = Oswald({ variable: '--font-oswald', subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: 'Atlantic Cold Trucking | Refrigerated & Frozen Transportation',
  description:
    'Family-owned refrigerated and frozen truckload and less-than-truckload transportation serving the greater New York area since 1979.',
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${oswald.variable}`}>{children}</body>
    </html>
  );
}
