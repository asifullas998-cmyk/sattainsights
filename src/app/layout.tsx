import type { Metadata } from 'next';
import './globals.css';
import { SidebarProvider, Sidebar, SidebarInset } from '@/components/ui/sidebar';
import { MainNav } from '@/components/main-nav';
import { Toaster } from '@/components/ui/toaster';

export const metadata: Metadata = {
  title: 'Satta Insights',
  description: 'AI-powered Satta analysis and live results.',
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
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        <SidebarProvider>
          <Sidebar>
            <MainNav />
          </Sidebar>
          <SidebarInset>{children}</SidebarInset>
        </SidebarProvider>
        <Toaster />
      </body>
    </html>
  );
}
