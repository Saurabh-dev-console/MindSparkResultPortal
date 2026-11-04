'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Trophy, Award, Image as ImageIcon, CheckCircle2, Menu, X, Sparkles, Search } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { name: 'Home', href: '/', icon: Sparkles },
    { name: 'Results & Podium', href: '/results/', icon: Trophy },
    { name: 'Photo Gallery', href: '/gallery/', icon: ImageIcon },
    { name: 'Verify Certificate', href: '/verify/', icon: CheckCircle2 },
  ];

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm no-print">
      {/* Top Banner */}
      <div className="bg-slate-900 text-slate-200 text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="font-medium text-slate-300">
              Meena Shah Public School — Mindspark 2026 Official Result Portal
            </span>
          </div>
          <div className="hidden sm:flex items-center space-x-4 text-slate-400 text-xs">
            <span>100% Static Verified Registry</span>
            <span>•</span>
            <span>Annual Science & Tech Gala</span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Branding */}
          <Link href="/" className="flex items-center space-x-3.5 group">
            <div className="relative w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center overflow-hidden shadow-sm group-hover:scale-105 transition-transform duration-200">
              <Image
                src="/images/school-logo.png"
                alt="Meena Shah Public School Logo"
                width={48}
                height={48}
                className="object-contain p-1"
                priority
              />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center space-x-1.5">
                <span className="font-extrabold text-xl tracking-tight text-slate-900">
                  MINDSPARK
                </span>
                <span className="text-xs font-bold uppercase tracking-wider bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded border border-amber-300">
                  2026
                </span>
              </div>
              <span className="text-xs font-medium text-slate-500 tracking-tight">
                Meena Shah Public School
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navLinks.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center space-x-2 px-3.5 py-2 rounded-lg text-sm font-semibold transition-colors duration-150 ${
                    active
                      ? 'bg-blue-50 text-blue-700 shadow-sm'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${active ? 'text-blue-600' : 'text-slate-400'}`} />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </div>

          {/* Action Button */}
          <div className="hidden md:flex items-center space-x-3">
            <Link
              href="/verify/"
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-semibold shadow-sm hover:shadow transition-all duration-200"
            >
              <Award className="w-4 h-4" />
              <span>Verify Candidate</span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              aria-expanded="false"
              aria-label="Toggle navigation menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        {isOpen && (
          <div className="md:hidden border-t border-slate-200 py-3 space-y-1">
            {navLinks.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg text-base font-medium ${
                    active
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <Icon className={`w-5 h-5 ${active ? 'text-blue-600' : 'text-slate-500'}`} />
                  <span>{item.name}</span>
                </Link>
              );
            })}
            <div className="pt-2 px-1">
              <Link
                href="/verify/"
                onClick={() => setIsOpen(false)}
                className="w-full flex items-center justify-center space-x-2 bg-blue-600 text-white px-4 py-2.5 rounded-lg text-sm font-semibold shadow-sm"
              >
                <Award className="w-4 h-4" />
                <span>Verify Roll / Reg No</span>
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}

