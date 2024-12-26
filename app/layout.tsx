import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Providers } from '@/components/providers';
import { ClientBody } from '@/components/client-body';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Whispr - Anonymous Messaging Platform',
  description: 'Share your thoughts anonymously and securely',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <ClientBody className={inter.className}>
        <Providers>{children}</Providers>
      </ClientBody>
    </html>
  );
}