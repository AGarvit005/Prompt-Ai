// File: apps/web/src/app/layout.tsx
import type { Metadata } from 'next';
import { Sora } from 'next/font/google'; // Changed from Inter to Sora
import './globals.css';
import Providers from './provider';

const sora = Sora({ subsets: ['latin'] }); // Initialized Sora

export const metadata: Metadata = {
  title: 'PromptCraft AI',
  description: 'Intelligent Query Optimizer & Architecture Generator',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={sora.className}> {/* Applied Sora font */}
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}