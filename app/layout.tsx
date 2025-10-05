import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/contexts/theme-context';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'ForesightFlow',
  description: 'AI-Powered Strategic Intelligence',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
