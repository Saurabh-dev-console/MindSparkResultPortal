import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'MINDSPARK 2026 — Official Results & Certificate Portal | Meena Shah Public School',
  description: 'Official 100% Static Results, Medals Podium, and Certificate Verification Registry for the Mindspark Inter-School Competition at Meena Shah Public School.',
  icons: {
    icon: '/images/meena-shah-mindspark-emblem.png',
    shortcut: '/images/meena-shah-mindspark-emblem.png',
    apple: '/images/meena-shah-mindspark-emblem.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="flex flex-col min-h-screen text-slate-900 bg-slate-50 antialiased">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
