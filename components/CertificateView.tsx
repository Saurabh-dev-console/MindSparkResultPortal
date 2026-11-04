'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Printer, Share2, Check, ArrowLeft, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { PrizeWinner } from '@/types';
import { AnimatedButton } from '@/components/ui/animated-button';
import { RankBadge } from '@/components/ui/badge';

interface CertificateViewProps {
  winner: PrizeWinner;
}

export default function CertificateView({ winner }: CertificateViewProps) {
  const [copied, setCopied] = useState(false);

  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  const handleCopyLink = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 md:py-10">
      {/* Action Toolbar (Hidden in Print) */}
      <div className="no-print mb-8 flex flex-wrap items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
        <Link
          href="/results/"
          className="inline-flex items-center space-x-2 text-xs sm:text-sm font-semibold text-slate-700 hover:text-slate-950 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Category Directory</span>
        </Link>

        <div className="flex items-center space-x-3">
          <AnimatedButton variant="secondary" size="sm" onClick={handleCopyLink}>
            {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4 text-slate-500" />}
            <span>{copied ? 'Link Copied!' : 'Copy Verification Link'}</span>
          </AnimatedButton>

          <AnimatedButton variant="primary" size="sm" onClick={handlePrint}>
            <Printer className="w-4 h-4" />
            <span>Print Certificate (A4)</span>
          </AnimatedButton>
        </div>
      </div>

      {/* Official Certificate Canvas Container */}
      <div className="certificate-container relative bg-white border-8 border-double border-amber-800/80 p-8 sm:p-14 rounded-2xl shadow-xl overflow-hidden">
        {/* Subtle Decorative Guilloche Border */}
        <div className="absolute inset-2 border border-amber-600/30 rounded-lg pointer-events-none"></div>
        <div className="absolute inset-4 border border-dashed border-amber-600/20 rounded-md pointer-events-none"></div>

        {/* Certificate Watermark in Center */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.035] pointer-events-none select-none w-96 h-96">
          <Image
            src="/images/school-logo.png"
            alt="Watermark"
            width={400}
            height={400}
            className="object-contain"
          />
        </div>

        {/* Certificate Header */}
        <div className="relative text-center pb-6 border-b border-amber-200">
          <div className="flex items-center justify-between gap-4 max-w-4xl mx-auto mb-4">
            {/* School Crest */}
            <div className="w-20 h-20 relative shrink-0">
              <Image
                src="/images/school-logo.png"
                alt="Meena Shah Public School Crest"
                width={80}
                height={80}
                className="object-contain"
                priority
              />
            </div>

            {/* School Titles */}
            <div className="flex-1 px-2 text-center">
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-slate-500 block mb-1">
                Founded on Academic Excellence & Moral Integrity
              </span>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-950 tracking-tight">
                MEENA SHAH PUBLIC SCHOOL
              </h1>
              <p className="text-xs sm:text-sm font-medium text-slate-600 mt-1">
                Affiliated with CBSE, New Delhi • Ramnagar Campus
              </p>
            </div>

            {/* Event Logo */}
            <div className="w-20 h-20 relative shrink-0">
              <Image
                src="/images/mindspark-logo.png"
                alt="Mindspark 2026 Logo"
                width={80}
                height={80}
                className="object-contain"
                priority
              />
            </div>
          </div>

          <div className="mt-3">
            <span className="inline-block px-4 py-1 rounded-md text-xs font-mono font-bold uppercase tracking-widest bg-amber-100 text-amber-950 border border-amber-300">
              MINDSPARK 2026 — ANNUAL INTER-SCHOOL SCHOLASTIC GALA
            </span>
          </div>

          <h2 className="text-xl sm:text-2xl md:text-3xl font-serif italic text-amber-900 mt-4">
            Certificate of Distinction & Excellence
          </h2>
        </div>

        {/* Certificate Body */}
        <div className="relative py-8 sm:py-12 text-center max-w-3xl mx-auto space-y-6">
          <p className="text-sm sm:text-base text-slate-600 font-serif italic">
            This is proudly presented and certified to recognize
          </p>

          {/* Candidate Name */}
          <div className="py-2">
            <h3 className="text-2xl sm:text-4xl md:text-5xl font-black text-slate-950 tracking-wide font-serif underline decoration-amber-500 decoration-2 underline-offset-8">
              {winner.name}
            </h3>
            <p className="text-sm font-medium text-slate-600 mt-3">
              representing <span className="font-bold text-slate-900">{winner.schoolName}</span> ({winner.className})
            </p>
          </div>

          {/* Achievement Description */}
          <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-normal">
            for exceptional aptitude, intellectual rigour, and exemplary performance in the competition arena:
          </p>

          {/* Category Highlight */}
          <div className="py-2">
            <div className="inline-block bg-slate-900 text-white font-bold text-base sm:text-lg px-6 py-2.5 rounded-xl shadow-xs tracking-wide">
              {winner.categoryName}
            </div>
          </div>

          {/* Rank Ribbon */}
          <div className="pt-2">
            <RankBadge rank={winner.rank} size="md" />
          </div>

          {/* Score & Prize summary */}
          <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl mx-auto text-left">
            <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500 block">
                Audited Final Score
              </span>
              <span className="font-mono text-base font-extrabold text-slate-950">
                {winner.score} / {winner.maxScore} pts
              </span>
            </div>
            <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500 block">
                Official Prize Awarded
              </span>
              <span className="text-xs font-bold text-slate-900 line-clamp-2 leading-snug">
                {winner.prizeAwarded}
              </span>
            </div>
          </div>
        </div>

        {/* Certificate Footer: Signatures and Verification Data */}
        <div className="relative pt-10 border-t border-amber-200 mt-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 items-end text-center">
            {/* Signature 1 */}
            <div className="space-y-2">
              <div className="font-serif italic text-slate-800 text-lg sm:text-xl font-bold border-b border-slate-400 pb-1 mx-6">
                Dr. A. K. Srivastava
              </div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-950">
                Principal
              </p>
              <p className="text-[11px] text-slate-500">Meena Shah Public School</p>
            </div>

            {/* Seal / Verification Stamp */}
            <div className="flex flex-col items-center justify-center">
              <div className="w-24 h-24 rounded-full border-4 border-double border-amber-700 bg-amber-50/60 p-2 flex flex-col items-center justify-center text-center shadow-inner">
                <ShieldCheck className="w-7 h-7 text-amber-800 mb-0.5" />
                <span className="text-[9px] font-black uppercase text-amber-950 tracking-tighter leading-tight">
                  OFFICIAL SEAL
                </span>
                <span className="text-[8px] font-bold text-amber-900">
                  MINDSPARK &apos;26
                </span>
              </div>
              <div className="mt-2 text-[10px] font-mono font-semibold text-slate-500">
                REG: {winner.regNo}
              </div>
            </div>

            {/* Signature 2 */}
            <div className="space-y-2">
              <div className="font-serif italic text-slate-800 text-lg sm:text-xl font-bold border-b border-slate-400 pb-1 mx-6">
                Prof. S. R. Mukherjee
              </div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-950">
                Head of Evaluation Jury
              </p>
              <p className="text-[11px] text-slate-500">Mindspark Academic Council</p>
            </div>
          </div>

          {/* Bottom Security Fingerprint */}
          <div className="mt-8 pt-4 border-t border-dashed border-slate-200 flex flex-col sm:flex-row items-center justify-between text-[10px] font-mono text-slate-400 gap-2">
            <span className="flex items-center space-x-1">
              <CheckCircle2 className="w-3 h-3 text-emerald-600" />
              <span>Cryptographic Static Pre-rendered Registry ID: MS26-VERIFIED-{winner.rollNo}</span>
            </span>
            <span>Date of Issue: November 2026</span>
          </div>
        </div>
      </div>
    </div>
  );
}
