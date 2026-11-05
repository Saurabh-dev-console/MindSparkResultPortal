import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShieldCheck } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800/80 no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-slate-800/80">
          {/* School Crest & Official Identity */}
          <div className="flex items-center space-x-3.5">
            <div className="relative w-11 h-11 rounded-full overflow-hidden border border-amber-400/40 bg-white ring-2 ring-slate-900 shadow-md shrink-0">
              <Image
                src="/images/meena-shah-mindspark-emblem.webp"
                alt="Meena Shah Public School Crest"
                fill
                sizes="44px"
                className="object-cover p-0.5"
                loading="lazy"
              />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-black text-lg text-white tracking-tight">MINDSPARK</span>
                <span className="text-[10px] font-mono font-black uppercase tracking-wider bg-amber-400 text-slate-950 px-2 py-0.5 rounded-full">
                  2026
                </span>
              </div>
              <span className="text-[11px] font-mono text-slate-400 font-semibold uppercase tracking-wider block mt-0.5">
                Meena Shah Public School • Circular Road, Gonda
              </span>
            </div>
          </div>

          {/* Simple & Clean Navigation Links */}
          <nav className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 text-xs sm:text-sm font-semibold">
            <Link href="/" className="text-slate-300 hover:text-amber-400 transition-colors">
              Overview
            </Link>
            <Link href="/results/" className="text-slate-300 hover:text-amber-400 transition-colors">
              18 Programmes Podiums
            </Link>
            <Link href="/gallery/" className="text-slate-300 hover:text-amber-400 transition-colors">
              Photo Gallery
            </Link>
          </nav>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono text-slate-400">
          <p>&copy; {new Date().getFullYear()} Meena Shah Public School. All rights reserved.</p>
          <div className="flex items-center space-x-2 text-slate-300">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Affiliated to CBSE, New Delhi • Official Rankers Registry</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
