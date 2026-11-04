import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'MINDSPARK 2026 — Official Rankers & Prize Winners Portal | Meena Shah Public School',
  description: 'Official 100% Static Results, Medals Podium, and Certificate Verification Registry for the Mindspark Inter-School Competition.',
  icons: {
    icon: '/images/mindspark-logo.png',
    shortcut: '/images/mindspark-logo.png',
    apple: '/images/school-logo.png',
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

