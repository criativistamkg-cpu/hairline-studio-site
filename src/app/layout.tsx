import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { SeasonalWrapper } from '@/components/layout/SeasonalWrapper';
import { CustomCursor } from '@/components/CustomCursor';

export const metadata: Metadata = {
  title: 'Hairline Studio Online',
  description: 'Charme rústico, estilo moderno. Faça a sua marcação online.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Alegreya:ital,wght@0,400..900;1,400..900&family=Belleza&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        <SeasonalWrapper />
        <CustomCursor />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
