'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Trophy, Award, Image as ImageIcon, CheckCircle2, Menu, X, ArrowUpRight } from 'lucide-react';
import { AnimatedButton } from '@/components/ui/animated-button';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { name: 'Overview', href: '/' },
    { name: 'Winners & Podiums', href: '/results/' },
    { name: 'Event Gallery', href: '/gallery/' },
    { name: 'Verify Certificate', href: '/verify/' },
  ];

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 no-print">
      {/* Top Institutional Notification Bar */}
      <div className="bg-slate-950 text-slate-300 text-xs py-2 px-4 sm:px-8 border-b border-slate-900">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span className="font-semibold text-white">
              Meena Shah Public School
            </span>
            <span className="text-slate-600">•</span>
            <span className="text-slate-400 hidden sm:inline">
              MINDSPARK 2026 Official Digital Result & Distinction Portal
            </span>
            <span className="text-slate-400 sm:hidden">
              Mindspark 2026
            </span>
          </div>
          <div className="flex items-center space-x-4 text-slate-400 text-xs">
            <span className="hidden md:inline font-mono text-[11px] text-slate-400">
              Affiliated to CBSE, New Delhi
            </span>
            <span className="inline-flex items-center space-x-1.5 text-emerald-400 font-mono text-[11px] bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
              <span>100% SSG Verified</span>
            </span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Identity */}
          <Link
            href="/"
            className="flex items-center space-x-3.5 group focus-visible:outline-2 focus-visible:outline-slate-950 rounded-xl p-1"
          >
            {/* High-Res Circular Official Emblem */}
            <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-red-600/30 shadow-md group-hover:scale-105 transition-transform duration-200 bg-white shrink-0">
              <Image
                src="/images/meena-shah-mindspark-emblem.webp"
                alt="Meena Shah Public School - Mindspark 2026 Official Emblem"
                width={56}
                height={56}
                className="object-cover w-full h-full"
                priority
              />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center space-x-2">
                <span className="font-black text-xl sm:text-2xl text-slate-950 tracking-tight leading-none">
                  MINDSPARK
                </span>
                <span className="text-[11px] font-mono font-black uppercase tracking-wider bg-red-600 text-white px-2 py-0.5 rounded shadow-2xs">
                  2026
                </span>
              </div>
              <span className="text-xs font-bold text-slate-700 tracking-tight mt-1">
                MEENA SHAH PUBLIC SCHOOL
              </span>
            </div>
          </Link>

          {/* Desktop Nav Items */}
          <div className="hidden md:flex items-center space-x-1 bg-slate-100/80 p-1.5 rounded-xl border border-slate-200">
            {navLinks.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                    active
                      ? 'bg-white text-slate-950 shadow-xs border border-slate-200/80'
                      : 'text-slate-600 hover:text-slate-950 hover:bg-slate-200/50'
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </div>

          {/* Action Button */}
          <div className="hidden md:flex items-center space-x-3">
            <Link href="/verify/">
              <AnimatedButton variant="primary" size="md">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Verify Roll No</span>
              </AnimatedButton>
            </Link>
          </div>

          {/* Mobile hamburger */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="p-2 rounded-xl text-slate-700 hover:text-slate-950 hover:bg-slate-100 border border-slate-200"
              aria-label="Toggle navigation"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="md:hidden border-t border-slate-200 py-3 space-y-1">
            {navLinks.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`block px-4 py-2.5 rounded-xl text-sm font-bold ${
                    active ? 'bg-slate-100 text-slate-950' : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
            <div className="pt-2 px-1">
              <Link href="/verify/" onClick={() => setIsOpen(false)} className="block">
                <AnimatedButton variant="primary" size="md" className="w-full">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Verify Roll / Reg No</span>
                </AnimatedButton>
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
