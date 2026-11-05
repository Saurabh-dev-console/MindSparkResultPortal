'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Trophy, Menu, X, Sparkles, CheckCircle2 } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { name: 'Overview', href: '/' },
    { name: '18 Programmes Podiums', href: '/results/' },
    { name: 'Event Photo Gallery', href: '/gallery/' },
  ];

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-50 bg-slate-950/90 backdrop-blur-xl border-b border-slate-800/80 shadow-xl shadow-black/20 no-print transition-all">
      {/* Subtle bottom golden hairline reflection */}
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-amber-400/30 to-transparent pointer-events-none" />

      {/* Main Premium Navbar */}
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Identity (Left) */}
          <Link
            href="/"
            className="flex items-center space-x-3.5 group focus-visible:outline-2 focus-visible:outline-amber-400 rounded-xl p-1 transition-transform"
          >
            {/* Official School Crest Emblem */}
            <div className="relative w-12 h-12 rounded-full overflow-hidden border border-amber-400/40 bg-white ring-2 ring-slate-900 shadow-md group-hover:scale-105 transition-transform duration-300 shrink-0">
              <Image
                src="/images/meena-shah-mindspark-emblem.webp"
                alt="Meena Shah Public School - Mindspark 2026 Official Emblem"
                fill
                sizes="48px"
                className="object-cover p-0.5"
                priority
              />
            </div>

            <div className="flex flex-col">
              <div className="flex items-center space-x-2">
                <span className="font-black text-xl sm:text-2xl text-white tracking-tight leading-none group-hover:text-amber-300 transition-colors">
                  MINDSPARK
                </span>
                <span className="text-[10px] font-mono font-black uppercase tracking-wider bg-amber-400 text-slate-950 px-2 py-0.5 rounded-full shadow-xs">
                  2026
                </span>
              </div>
              <span className="text-[10px] font-mono font-bold text-slate-400 tracking-wider uppercase mt-1">
                MEENA SHAH PUBLIC SCHOOL
              </span>
            </div>
          </Link>

          {/* Center Navigation: Floating Segmented Pill Dock */}
          <div className="hidden md:flex items-center space-x-1 bg-slate-900/90 p-1.5 rounded-full border border-slate-800/90 shadow-inner">
            {navLinks.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all duration-200 cursor-pointer ${
                    active
                      ? 'bg-amber-400 text-slate-950 shadow-md shadow-amber-950/20 scale-[1.02]'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/70'
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </div>

          {/* Right Action Area */}
          <div className="hidden md:flex items-center space-x-3.5">
            {/* 100% Verified Status Badge */}
            <div className="hidden xl:inline-flex items-center space-x-1.5 text-emerald-400 font-mono text-[11px] bg-slate-900 px-3 py-1.5 rounded-full border border-slate-800">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Official Results Live</span>
            </div>

            {/* CTA Button */}
            <Link
              href="/results/"
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-xs px-5 py-2.5 rounded-full shadow-lg shadow-amber-950/20 transition-all transform hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
            >
              <Trophy className="w-3.5 h-3.5 text-slate-950" />
              <span>Explore Rankers</span>
            </Link>
          </div>

          {/* Mobile Menu Hamburger Toggle */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-900 border border-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-400"
              aria-label="Toggle navigation"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isOpen && (
          <div className="md:hidden border-t border-slate-800 py-4 px-2 space-y-2 bg-slate-950/98 backdrop-blur-xl rounded-b-2xl animate-in fade-in-50 duration-200">
            {navLinks.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`block px-4 py-3 rounded-xl text-sm font-bold transition-colors ${
                    active
                      ? 'bg-amber-400 text-slate-950 shadow-sm'
                      : 'text-slate-300 hover:text-white hover:bg-slate-900'
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}

            <div className="pt-3 border-t border-slate-800 px-2">
              <Link
                href="/results/"
                onClick={() => setIsOpen(false)}
                className="w-full inline-flex items-center justify-center space-x-2 bg-amber-400 text-slate-950 font-black text-sm py-3 rounded-xl shadow-md cursor-pointer"
              >
                <Trophy className="w-4 h-4 text-slate-950" />
                <span>Explore Rankers</span>
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
