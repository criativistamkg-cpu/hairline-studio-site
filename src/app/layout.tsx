import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { SeasonalWrapper } from '@/components/layout/SeasonalWrapper';
import { CustomCursor } from '@/components/CustomCursor';
import { SpeedInsights } from "@vercel/speed-insights/next"

export const metadata: Metadata = {
  title: 'Hairline Studio Online',
  description: 'Rustic Charm, Modern Style. Book your appointment online.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
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
        <SpeedInsights />
      </body>
    </html>
  );
}
