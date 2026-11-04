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
    { name: 'Verify Roll No', href: '/verify/' },
  ];

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 no-print">
      {/* Institutional Top Strip */}
      <div className="bg-slate-900 text-slate-300 text-xs py-2 px-4 sm:px-8 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="font-semibold text-slate-200">
              Meena Shah Public School
            </span>
            <span className="text-slate-500">•</span>
            <span className="text-slate-400">
              Mindspark 2026 Official Result Portal
            </span>
          </div>
          <div className="hidden sm:flex items-center space-x-3 text-slate-400 text-xs">
            <span className="inline-flex items-center space-x-1.5 text-emerald-400 font-mono text-[11px]">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              <span>100% SSG Verified Registry</span>
            </span>
          </div>
        </div>
      </div>

      {/* Main Bar */}
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Identity */}
          <Link href="/" className="flex items-center space-x-3.5 group focus-visible:outline-2 focus-visible:outline-slate-900 rounded-lg p-1">
            <div className="w-12 h-12 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-center overflow-hidden p-1 group-hover:border-slate-400 transition-colors">
              <Image
                src="/images/school-logo.png"
                alt="Meena Shah Public School Crest"
                width={44}
                height={44}
                className="object-contain"
                priority
              />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-black text-xl text-slate-950 tracking-tight">
                  MINDSPARK
                </span>
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider bg-amber-100 text-amber-900 px-2 py-0.5 rounded border border-amber-300">
                  2026
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium">
                Annual Inter-School Competition
              </p>
            </div>
          </Link>

          {/* Desktop Nav Items */}
          <div className="hidden md:flex items-center space-x-1 bg-slate-50/80 p-1.5 rounded-xl border border-slate-200">
            {navLinks.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                    active
                      ? 'bg-white text-slate-950 shadow-xs border border-slate-200/80'
                      : 'text-slate-600 hover:text-slate-950 hover:bg-slate-100/80'
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
                <span>Verify Certificate</span>
              </AnimatedButton>
            </Link>
          </div>

          {/* Mobile hamburger */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="p-2 rounded-xl text-slate-700 hover:text-slate-950 hover:bg-slate-100 border border-slate-200 focus-visible:outline-2"
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
                  className={`block px-4 py-2.5 rounded-xl text-sm font-semibold ${
                    active ? 'bg-slate-100 text-slate-950' : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
            <div className="pt-2">
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
