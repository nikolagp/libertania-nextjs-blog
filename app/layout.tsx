import type { Metadata } from 'next';
import { Cormorant_Garamond, Roboto } from 'next/font/google';
import { ThemeProvider } from 'next-themes';
import Navbar from '@/components/Navbar';
import './globals.css';

const cormorantGaramond = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-cormorant-garamond',
  weight: ['400'],
});

const poppins = Roboto({
  subsets: ['latin'],
  variable: '--font-poppins',
  weight: ['400'],
});

export const metadata: Metadata = {
  title: 'Libertania Blog',
  description: 'A blog about liberty and freedom',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${cormorantGaramond.variable} ${poppins.variable} bg-white dark:bg-gray-900`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Navbar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
