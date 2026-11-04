'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Trophy, Medal, Award, Sparkles, ExternalLink } from 'lucide-react';
import confetti from 'canvas-confetti';
import { PrizeWinner } from '@/types';

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
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });
    } catch {
      // safe fallback if canvas is restricted
    }
  };

  return (
    <div className="bg-gradient-to-b from-slate-900 to-slate-950 text-white rounded-3xl p-6 sm:p-10 shadow-xl border border-slate-800 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-amber-500/10 blur-3xl pointer-events-none"></div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-8 border-b border-slate-800/80">
        <div>
          <div className="flex items-center space-x-2 text-xs font-bold text-amber-400 uppercase tracking-widest">
            <Sparkles className="w-4 h-4" />
            <span>Championship Podium</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white mt-1">{categoryTitle}</h2>
        </div>

        <button
          onClick={handleCelebrate}
          className="inline-flex items-center space-x-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-bold px-4 py-2 rounded-xl text-xs sm:text-sm shadow-md transition-all active:scale-95 cursor-pointer"
        >
          <Sparkles className="w-4 h-4 text-slate-950" />
          <span>Celebrate Champions</span>
        </button>
      </div>

      {/* 3-Step Podium Architecture */}
      <div className="pt-10 pb-4 max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
          {/* Rank 2 - Silver (Left) */}
          <div className="order-2 md:order-1 flex flex-col items-center">
            {rank2 ? (
              <div className="w-full flex flex-col items-center group">
                {/* Avatar / Photo */}
                <div className="relative mb-3">
                  <div className="w-20 h-20 rounded-2xl overflow-hidden border-2 border-slate-300 shadow-lg bg-slate-800 flex items-center justify-center relative">
                    {rank2.photoUrl ? (
                      <Image
                        src={rank2.photoUrl}
                        alt={rank2.name}
                        width={80}
                        height={80}
                        className="object-cover w-full h-full"
                      />
                    ) : (
                      <span className="text-xl font-bold text-slate-300">
                        {rank2.name.charAt(0)}
                      </span>
                    )}
                  </div>
                  <div className="absolute -bottom-2 -right-2 bg-slate-200 text-slate-900 rounded-full p-1.5 shadow-md border border-slate-400">
                    <Medal className="w-4 h-4" />
                  </div>
                </div>

                {/* Candidate Info */}
                <div className="text-center mb-3">
                  <h3 className="font-bold text-base text-white group-hover:text-slate-300 transition-colors">
                    {rank2.name}
                  </h3>
                  <p className="text-xs text-slate-400 line-clamp-1 max-w-[200px]">{rank2.schoolName}</p>
                  <p className="text-xs font-mono text-slate-400 mt-0.5">
                    Score: <span className="text-slate-200 font-semibold">{rank2.score}/{rank2.maxScore}</span>
                  </p>
                </div>

                {/* Podium Stand Step */}
                <div className="w-full bg-gradient-to-t from-slate-800 to-slate-700/80 rounded-2xl p-5 border border-slate-600/50 shadow-inner flex flex-col items-center min-h-[140px] justify-between">
                  <div className="w-10 h-10 rounded-full bg-slate-300/20 text-slate-200 flex items-center justify-center font-black text-lg border border-slate-400/40">
                    2
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-300 mt-2">
                    Silver Medalist
                  </span>
                  <div className="text-[11px] text-slate-400 text-center mt-1 px-1 line-clamp-2">
                    {rank2.prizeAwarded}
                  </div>
                  <Link
                    href={`/verify/${rank2.regNo}/`}
                    className="mt-3 inline-flex items-center space-x-1.5 text-xs font-semibold text-slate-300 hover:text-white bg-slate-900/60 px-3 py-1.5 rounded-lg border border-slate-700"
                  >
                    <span>Certificate</span>
                    <ExternalLink className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            ) : (
              <div className="p-6 text-center text-xs text-slate-500">No Rank 2 Recorded</div>
            )}
          </div>

          {/* Rank 1 - Gold (Center, Tallest) */}
          <div className="order-1 md:order-2 flex flex-col items-center -mt-6">
            {rank1 ? (
              <div className="w-full flex flex-col items-center group">
                {/* Crown / Trophy icon on top */}
                <div className="text-amber-400 mb-2 animate-bounce">
                  <Trophy className="w-7 h-7" />
                </div>

                {/* Avatar / Photo */}
                <div className="relative mb-3">
                  <div className="w-24 h-24 rounded-2xl overflow-hidden border-4 border-amber-400 shadow-2xl bg-amber-950/40 flex items-center justify-center relative">
                    {rank1.photoUrl ? (
                      <Image
                        src={rank1.photoUrl}
                        alt={rank1.name}
                        width={96}
                        height={96}
                        className="object-cover w-full h-full"
                      />
                    ) : (
                      <span className="text-2xl font-bold text-amber-300">
                        {rank1.name.charAt(0)}
                      </span>
                    )}
                  </div>
                  <div className="absolute -bottom-2 -right-2 bg-gradient-to-tr from-amber-500 to-amber-300 text-slate-950 rounded-full p-2 shadow-lg border-2 border-white">
                    <Trophy className="w-4 h-4" />
                  </div>
                </div>

                {/* Candidate Info */}
                <div className="text-center mb-3">
                  <h3 className="font-extrabold text-lg text-white group-hover:text-amber-300 transition-colors">
                    {rank1.name}
                  </h3>
                  <p className="text-xs text-amber-200/80 font-medium line-clamp-1 max-w-[220px]">
                    {rank1.schoolName}
                  </p>
                  <p className="text-xs font-mono text-slate-300 mt-0.5">
                    Score: <span className="text-amber-300 font-bold">{rank1.score}/{rank1.maxScore}</span>
                  </p>
                </div>

                {/* Podium Stand Step */}
                <div className="w-full bg-gradient-to-t from-amber-950/90 via-amber-900/60 to-amber-800/50 rounded-2xl p-6 border-2 border-amber-500/70 shadow-2xl shadow-amber-500/10 flex flex-col items-center min-h-[180px] justify-between">
                  <div className="w-12 h-12 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center font-black text-xl shadow-md border-2 border-amber-200">
                    1
                  </div>
                  <span className="text-sm font-black uppercase tracking-wider text-amber-300 mt-2">
                    Grand Champion
                  </span>
                  <div className="text-xs font-medium text-amber-100 text-center mt-1 px-2 line-clamp-2">
                    {rank1.prizeAwarded}
                  </div>
                  <Link
                    href={`/verify/${rank1.regNo}/`}
                    className="mt-4 inline-flex items-center space-x-1.5 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 px-4 py-2 rounded-xl shadow-md transition-colors"
                  >
                    <span>View Gold Certificate</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ) : (
              <div className="p-6 text-center text-xs text-slate-500">No Rank 1 Recorded</div>
            )}
          </div>

          {/* Rank 3 - Bronze (Right) */}
          <div className="order-3 flex flex-col items-center">
            {rank3 ? (
              <div className="w-full flex flex-col items-center group">
                {/* Avatar / Photo */}
                <div className="relative mb-3">
                  <div className="w-20 h-20 rounded-2xl overflow-hidden border-2 border-amber-700 shadow-lg bg-slate-800 flex items-center justify-center relative">
                    {rank3.photoUrl ? (
                      <Image
                        src={rank3.photoUrl}
                        alt={rank3.name}
                        width={80}
                        height={80}
                        className="object-cover w-full h-full"
                      />
                    ) : (
                      <span className="text-xl font-bold text-amber-600">
                        {rank3.name.charAt(0)}
                      </span>
                    )}
                  </div>
                  <div className="absolute -bottom-2 -right-2 bg-amber-700 text-white rounded-full p-1.5 shadow-md border border-amber-500">
                    <Medal className="w-4 h-4" />
                  </div>
                </div>

                {/* Candidate Info */}
                <div className="text-center mb-3">
                  <h3 className="font-bold text-base text-white group-hover:text-amber-500 transition-colors">
                    {rank3.name}
                  </h3>
                  <p className="text-xs text-slate-400 line-clamp-1 max-w-[200px]">{rank3.schoolName}</p>
                  <p className="text-xs font-mono text-slate-400 mt-0.5">
                    Score: <span className="text-slate-200 font-semibold">{rank3.score}/{rank3.maxScore}</span>
                  </p>
                </div>

                {/* Podium Stand Step */}
                <div className="w-full bg-gradient-to-t from-slate-900 to-amber-950/40 rounded-2xl p-5 border border-amber-800/40 shadow-inner flex flex-col items-center min-h-[120px] justify-between">
                  <div className="w-10 h-10 rounded-full bg-amber-800/30 text-amber-400 flex items-center justify-center font-black text-lg border border-amber-700/50">
                    3
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-500 mt-2">
                    Bronze Medalist
                  </span>
                  <div className="text-[11px] text-slate-400 text-center mt-1 px-1 line-clamp-2">
                    {rank3.prizeAwarded}
                  </div>
                  <Link
                    href={`/verify/${rank3.regNo}/`}
                    className="mt-3 inline-flex items-center space-x-1.5 text-xs font-semibold text-slate-300 hover:text-white bg-slate-900/60 px-3 py-1.5 rounded-lg border border-slate-700"
                  >
                    <span>Certificate</span>
                    <ExternalLink className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            ) : (
              <div className="p-6 text-center text-xs text-slate-500">No Rank 3 Recorded</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

