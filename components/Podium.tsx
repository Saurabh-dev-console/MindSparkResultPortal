'use client';

import React from 'react';
import Image from 'next/image';
import { Trophy, Medal, Award, Sparkles, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { PrizeWinner } from '@/types';
import { AnimatedButton } from '@/components/ui/animated-button';

interface PodiumProps {
  winners: PrizeWinner[];
  categoryTitle: string;
}

export default function Podium({ winners, categoryTitle }: PodiumProps) {
  const rank1 = winners.find((w) => w.rank === 1);
  const rank2 = winners.find((w) => w.rank === 2);
  const rank3 = winners.find((w) => w.rank === 3);

  const handleCelebrate = () => {
    try {
      confetti({
        particleCount: 90,
        spread: 75,
        origin: { y: 0.6 },
        colors: ['#f59e0b', '#d97706', '#3b82f6', '#ffffff', '#cbd5e1'],
      });
    } catch {
      // safe fallback
    }
  };

  return (
    <div className="bg-slate-950 text-white rounded-3xl p-6 sm:p-10 border border-slate-800 shadow-2xl relative overflow-hidden">
      {/* Subtle architectural ambient backdrop */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-500/10 via-slate-950 to-slate-950 pointer-events-none" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-400/40 to-transparent" />

      {/* Header Bar */}
      <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-8 border-b border-slate-800/90">
        <div>
          <div className="inline-flex items-center space-x-2 text-xs font-mono font-bold uppercase tracking-widest text-amber-400 bg-amber-400/10 px-3 py-1 rounded-md border border-amber-400/20 mb-2">
            <Trophy className="w-3.5 h-3.5 text-amber-400" />
            <span>Honors &amp; Medalists Podium</span>
          </div>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-white tracking-tight">
            {categoryTitle}
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Top three certified podium positions validated by the academic jury.
          </p>
        </div>

        <AnimatedButton variant="gold" size="sm" onClick={handleCelebrate} className="shrink-0">
          <Sparkles className="w-4 h-4 text-slate-950" />
          <span>Celebrate Champions</span>
        </AnimatedButton>
      </div>

      {/* Podium Display: Responsive layout */}
      {/* 1. Desktop & Tablet View (Stepped 2nd - 1st - 3rd) */}
      <div className="relative z-10 hidden md:grid md:grid-cols-3 gap-6 items-end pt-12 pb-6 max-w-5xl mx-auto">
        {/* Step 2 - Silver Medalist (Left) */}
        <div className="flex flex-col items-center">
          {rank2 ? (
            <div className="w-full flex flex-col items-center group">
              {/* Photo / Avatar */}
              <div className="relative mb-4">
                <div className="w-20 h-20 rounded-2xl overflow-hidden border-2 border-slate-300 bg-slate-900 flex items-center justify-center relative shadow-lg">
                  {rank2.photoUrl ? (
                    <Image
                      src={rank2.photoUrl}
                      alt={rank2.name}
                      width={80}
                      height={80}
                      loading="lazy"
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <span className="text-2xl font-black text-slate-200">
                      {rank2.name.charAt(0)}
                    </span>
                  )}
                </div>
                <div className="absolute -bottom-2.5 -right-2.5 bg-slate-200 text-slate-950 rounded-full p-1.5 shadow-md border-2 border-slate-900">
                  <Medal className="w-4 h-4 text-slate-800" />
                </div>
              </div>

              {/* Candidate Info */}
              <div className="text-center mb-4 px-2 w-full">
                <h3 className="font-extrabold text-base text-white truncate" title={rank2.name}>
                  {rank2.name}
                </h3>
                <p className="text-xs text-slate-400 truncate mt-0.5">
                  Class: {rank2.className}
                </p>
                <div className="mt-1.5 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-800/80 border border-slate-700 text-xs font-mono">
                  <span className="text-slate-400">Reg No:</span>
                  <span className="font-bold text-slate-200 tracking-wider">{rank2.regNo}</span>
                </div>
              </div>

              {/* Pedestal Stand */}
              <div className="w-full bg-gradient-to-b from-slate-900 via-slate-900/90 to-slate-950 rounded-2xl p-5 border border-slate-600/80 shadow-xl flex flex-col items-center min-h-[160px] justify-between relative overflow-hidden group-hover:border-slate-400 transition-colors">
                <div className="w-11 h-11 rounded-full bg-slate-800 text-slate-200 flex items-center justify-center font-mono font-black text-lg border-2 border-slate-400 shadow-md">
                  II
                </div>
                <div className="text-center my-2">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300 block">
                    Silver Medalist
                  </span>
                  <p className="text-[11px] text-slate-400 mt-1 line-clamp-2 px-1">
                    {rank2.prizeAwarded}
                  </p>
                </div>
                <div className="w-full pt-3 border-t border-slate-800 flex items-center justify-center gap-2 text-xs font-mono text-slate-300">
                  <span className="text-slate-400">Registration:</span>
                  <span className="font-bold text-white tracking-wider">{rank2.regNo}</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="w-full bg-slate-900/40 rounded-2xl p-8 border border-slate-800 text-center text-xs text-slate-500">
              No Silver Medalist Recorded
            </div>
          )}
        </div>

        {/* Step 1 - Gold Grand Champion (Center, Elevated) */}
        <div className="flex flex-col items-center -mt-8">
          {rank1 ? (
            <div className="w-full flex flex-col items-center group">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/15 border border-amber-400/40 text-amber-300 text-xs font-mono font-bold uppercase tracking-wider mb-2">
                <Trophy className="w-3.5 h-3.5 text-amber-400" />
                <span>Grand Champion</span>
              </div>

              {/* Photo / Avatar */}
              <div className="relative mb-4">
                <div className="w-24 h-24 rounded-2xl overflow-hidden border-3 border-amber-400 bg-amber-950/60 flex items-center justify-center relative shadow-[0_0_30px_rgba(245,158,11,0.25)]">
                  {rank1.photoUrl ? (
                    <Image
                      src={rank1.photoUrl}
                      alt={rank1.name}
                      width={96}
                      height={96}
                      loading="lazy"
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <span className="text-3xl font-black text-amber-300">
                      {rank1.name.charAt(0)}
                    </span>
                  )}
                </div>
                <div className="absolute -bottom-3 -right-3 bg-amber-400 text-slate-950 rounded-full p-2 shadow-lg border-2 border-slate-950">
                  <Trophy className="w-4 h-4 text-slate-950" />
                </div>
              </div>

              {/* Candidate Info */}
              <div className="text-center mb-4 px-2 w-full">
                <h3 className="font-black text-lg text-white truncate" title={rank1.name}>
                  {rank1.name}
                </h3>
                <p className="text-xs text-amber-200/90 truncate mt-0.5 font-medium">
                  Class: {rank1.className}
                </p>
                <div className="mt-2 inline-flex items-center gap-2 px-3.5 py-1 rounded-lg bg-amber-950/60 border border-amber-500/40 text-xs font-mono">
                  <span className="text-amber-400 font-semibold">Reg No:</span>
                  <span className="font-black text-amber-200 tracking-wider text-sm">{rank1.regNo}</span>
                </div>
              </div>

              {/* Pedestal Stand (Tallest) */}
              <div className="w-full bg-gradient-to-b from-amber-950/80 via-slate-900 to-slate-950 rounded-2xl p-6 border-2 border-amber-400/90 shadow-[0_10px_40px_rgba(245,158,11,0.18)] flex flex-col items-center min-h-[200px] justify-between relative overflow-hidden group-hover:border-amber-300 transition-colors">
                <div className="w-13 h-13 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center font-mono font-black text-2xl border-2 border-amber-200 shadow-md">
                  I
                </div>
                <div className="text-center my-2">
                  <span className="text-sm font-mono font-black uppercase tracking-wider text-amber-300 block">
                    Gold Champion
                  </span>
                  <p className="text-xs text-amber-100/90 font-medium mt-1 line-clamp-2 px-1">
                    {rank1.prizeAwarded}
                  </p>
                </div>
                <div className="w-full pt-3 border-t border-amber-500/30 flex items-center justify-center gap-2 text-xs font-mono">
                  <span className="text-amber-400/80">Registration:</span>
                  <span className="font-black text-amber-200 tracking-wider text-sm">{rank1.regNo}</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="w-full bg-slate-900/40 rounded-2xl p-8 border border-slate-800 text-center text-xs text-slate-500">
              No Gold Champion Recorded
            </div>
          )}
        </div>

        {/* Step 3 - Bronze Medalist (Right) */}
        <div className="flex flex-col items-center">
          {rank3 ? (
            <div className="w-full flex flex-col items-center group">
              {/* Photo / Avatar */}
              <div className="relative mb-4">
                <div className="w-20 h-20 rounded-2xl overflow-hidden border-2 border-amber-700 bg-slate-900 flex items-center justify-center relative shadow-lg">
                  {rank3.photoUrl ? (
                    <Image
                      src={rank3.photoUrl}
                      alt={rank3.name}
                      width={80}
                      height={80}
                      loading="lazy"
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <span className="text-2xl font-black text-amber-600">
                      {rank3.name.charAt(0)}
                    </span>
                  )}
                </div>
                <div className="absolute -bottom-2.5 -right-2.5 bg-amber-700 text-white rounded-full p-1.5 shadow-md border-2 border-slate-900">
                  <Medal className="w-4 h-4 text-amber-200" />
                </div>
              </div>

              {/* Candidate Info */}
              <div className="text-center mb-4 px-2 w-full">
                <h3 className="font-extrabold text-base text-white truncate" title={rank3.name}>
                  {rank3.name}
                </h3>
                <p className="text-xs text-slate-400 truncate mt-0.5">
                  Class: {rank3.className}
                </p>
                <div className="mt-1.5 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-800/80 border border-slate-700 text-xs font-mono">
                  <span className="text-slate-400">Reg No:</span>
                  <span className="font-bold text-amber-400 tracking-wider">{rank3.regNo}</span>
                </div>
              </div>

              {/* Pedestal Stand */}
              <div className="w-full bg-gradient-to-b from-slate-900 via-slate-900/90 to-slate-950 rounded-2xl p-5 border border-amber-800/80 shadow-xl flex flex-col items-center min-h-[140px] justify-between relative overflow-hidden group-hover:border-amber-600 transition-colors">
                <div className="w-11 h-11 rounded-full bg-slate-800 text-amber-500 flex items-center justify-center font-mono font-black text-lg border-2 border-amber-700 shadow-md">
                  III
                </div>
                <div className="text-center my-2">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400 block">
                    Bronze Medalist
                  </span>
                  <p className="text-[11px] text-slate-400 mt-1 line-clamp-2 px-1">
                    {rank3.prizeAwarded}
                  </p>
                </div>
                <div className="w-full pt-3 border-t border-slate-800 flex items-center justify-center gap-2 text-xs font-mono text-slate-300">
                  <span className="text-slate-400">Registration:</span>
                  <span className="font-bold text-white tracking-wider">{rank3.regNo}</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="w-full bg-slate-900/40 rounded-2xl p-8 border border-slate-800 text-center text-xs text-slate-500">
              No Bronze Medalist Recorded
            </div>
          )}
        </div>
      </div>

      {/* 2. Mobile View: Responsive Hierarchical Stack (Rank 1 Gold -> Rank 2 Silver -> Rank 3 Bronze) */}
      <div className="relative z-10 md:hidden flex flex-col gap-4 pt-6">
        {/* Rank 1 Gold Mobile Card */}
        {rank1 && (
          <div className="bg-gradient-to-b from-amber-950/70 to-slate-900 rounded-2xl p-5 border-2 border-amber-400/90 shadow-xl">
            <div className="flex items-center justify-between mb-3">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-400 text-slate-950 text-xs font-mono font-black uppercase">
                <Trophy className="w-3.5 h-3.5" />
                <span>Rank 1 (Gold)</span>
              </span>
              <span className="text-xs font-mono font-black text-amber-300 tracking-wider">
                {rank1.regNo}
              </span>
            </div>
            <h3 className="font-black text-lg text-white">{rank1.name}</h3>
            <p className="text-xs text-amber-200/90 font-medium mt-0.5">Class: {rank1.className}</p>
            <p className="text-xs text-slate-300 mt-2 line-clamp-2">{rank1.prizeAwarded}</p>
            <div className="mt-3 pt-3 border-t border-amber-500/30 flex items-center justify-between text-xs font-mono">
              <span className="text-slate-400">Registration: <span className="text-amber-200 font-bold">{rank1.regNo}</span></span>
            </div>
          </div>
        )}

        {/* Rank 2 Silver Mobile Card */}
        {rank2 && (
          <div className="bg-slate-900 rounded-2xl p-5 border border-slate-600 shadow-md">
            <div className="flex items-center justify-between mb-3">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-slate-200 text-slate-950 text-xs font-mono font-bold uppercase">
                <Medal className="w-3.5 h-3.5" />
                <span>Rank 2 (Silver)</span>
              </span>
              <span className="text-xs font-mono font-bold text-slate-200 tracking-wider">
                {rank2.regNo}
              </span>
            </div>
            <h3 className="font-bold text-base text-white">{rank2.name}</h3>
            <p className="text-xs text-slate-400 mt-0.5">Class: {rank2.className}</p>
            <p className="text-xs text-slate-300 mt-2 line-clamp-2">{rank2.prizeAwarded}</p>
            <div className="mt-3 pt-3 border-t border-slate-800 flex items-center justify-between text-xs font-mono">
              <span className="text-slate-400">Registration: <span className="text-slate-200 font-bold">{rank2.regNo}</span></span>
            </div>
          </div>
        )}

        {/* Rank 3 Bronze Mobile Card */}
        {rank3 && (
          <div className="bg-slate-900 rounded-2xl p-5 border border-amber-800 shadow-md">
            <div className="flex items-center justify-between mb-3">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-700 text-white text-xs font-mono font-bold uppercase">
                <Medal className="w-3.5 h-3.5" />
                <span>Rank 3 (Bronze)</span>
              </span>
              <span className="text-xs font-mono font-bold text-amber-400 tracking-wider">
                {rank3.regNo}
              </span>
            </div>
            <h3 className="font-bold text-base text-white">{rank3.name}</h3>
            <p className="text-xs text-slate-400 mt-0.5">Class: {rank3.className}</p>
            <p className="text-xs text-slate-300 mt-2 line-clamp-2">{rank3.prizeAwarded}</p>
            <div className="mt-3 pt-3 border-t border-slate-800 flex items-center justify-between text-xs font-mono">
              <span className="text-slate-400">Registration: <span className="text-slate-200 font-bold">{rank3.regNo}</span></span>
            </div>
          </div>
        )}
      </div>

      {/* Footer Audit Seal */}
      <div className="relative z-10 mt-8 pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-slate-400 font-mono">
        <div className="flex items-center space-x-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>Organized &amp; Certified by Meena Shah Public School • Ramnagar Campus Arena</span>
        </div>
        <div className="text-slate-400">
          Affiliated to CBSE, New Delhi • Official Rankers Ledger
        </div>
      </div>
    </div>
  );
}
