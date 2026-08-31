import type { Metadata } from 'next';
import { Inter, Oswald } from 'next/font/google';
import './globals.css';

const inter = Inter({ variable: '--font-inter', subsets: ['latin'] });
const oswald = Oswald({ variable: '--font-oswald', subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'AtlanticCold Trucking | Temperature-Controlled Freight',
  description: 'Temperature-controlled transportation built for the miles, the moments, and everything in between.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body className={`${inter.variable} ${oswald.variable}`}>{children}</body></html>;
}
