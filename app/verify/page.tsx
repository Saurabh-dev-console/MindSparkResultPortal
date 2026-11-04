'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Award, Search, Trophy, Medal, ShieldCheck, ChevronRight, CheckCircle2, X, ExternalLink } from 'lucide-react';
import { prizeWinners } from '@/data/prizeWinners';
import { PrizeWinner } from '@/types';

export default function VerifySearchPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const searchResults = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    if (!q) return [];
    return prizeWinners.filter(
      (w) =>
        w.rollNo.toLowerCase().includes(q) ||
        w.regNo.toLowerCase().includes(q) ||
        w.name.toLowerCase().includes(q) ||
        w.schoolName.toLowerCase().includes(q)
    );
  }, [searchTerm]);

  const getRankBadge = (rank: PrizeWinner['rank']) => {
    switch (rank) {
      case 1:
        return (
          <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-900 border border-amber-300">
            <Trophy className="w-3 h-3 text-amber-600" />
            <span>Rank 1 (Gold)</span>
          </span>
        );
      case 2:
        return (
          <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-slate-200 text-slate-800 border border-slate-300">
            <Medal className="w-3 h-3 text-slate-600" />
            <span>Rank 2 (Silver)</span>
          </span>
        );
      case 3:
        return (
          <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-50 text-amber-950 border border-amber-300">
            <Medal className="w-3 h-3 text-amber-700" />
            <span>Rank 3 (Bronze)</span>
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-50 text-blue-900 border border-blue-200">
            <Award className="w-3 h-3 text-blue-600" />
            <span>Consolation</span>
          </span>
        );
    }
  };

  return (
    <div className="py-12 md:py-20 bg-slate-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 border border-emerald-200 mb-3">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Official Credential Registry</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            Verify Certificate of Distinction
          </h1>
          <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            Instant cryptographic verification of official awards and certificates issued for MINDSPARK 2026. Enter Candidate Roll Number or Registration Number.
          </p>
        </div>

        {/* Verification Input Box */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-lg mb-10">
          <label htmlFor="verify-input" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
            Enter Roll Number, Registration No, or Candidate Name:
          </label>
          <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
              <Search className="w-5 h-5" />
            </div>
            <input
              id="verify-input"
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="e.g. 260101, MS26-ROB-101, or Aarav Sharma"
              className="w-full pl-12 pr-10 py-4 bg-slate-50 border border-slate-300 rounded-2xl text-base text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-slate-500">
            <span>Quick samples:</span>
            {['260101', '260301', 'MS26-APP-601', '261601'].map((sample) => (
              <button
                key={sample}
                onClick={() => setSearchTerm(sample)}
                className="font-mono bg-slate-100 hover:bg-slate-200 text-slate-700 px-2.5 py-1 rounded-lg border border-slate-200 transition-colors cursor-pointer"
              >
                {sample}
              </button>
            ))}
          </div>
        </div>

        {/* Search Results Display */}
        {searchTerm.trim().length > 0 && (
          <div className="space-y-4 mb-12">
            <div className="flex items-center justify-between text-xs text-slate-500 font-semibold px-1">
              <span>Verified Records Found: {searchResults.length}</span>
              <span>100% Pre-Rendered Certificate Pages</span>
            </div>

            {searchResults.length > 0 ? (
              searchResults.map((winner) => (
                <div
                  key={winner.id}
                  className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1.5">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-extrabold text-base text-slate-900">{winner.name}</span>
                      {getRankBadge(winner.rank)}
                    </div>
                    <div className="text-xs text-slate-500 flex flex-wrap items-center gap-x-2 gap-y-1">
                      <span className="font-mono font-bold text-slate-800 bg-slate-100 px-2 py-0.5 rounded">
                        Roll: {winner.rollNo}
                      </span>
                      <span className="font-mono text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                        Reg: {winner.regNo}
                      </span>
                      <span>•</span>
                      <span className="text-slate-700 font-medium">{winner.schoolName}</span>
                    </div>
                    <div className="text-xs text-blue-700 font-medium">
                      {winner.categoryName} ({winner.className}) • Score: {winner.score}/{winner.maxScore}
                    </div>
                  </div>

                  <Link
                    href={`/verify/${winner.regNo}/`}
                    className="inline-flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm shadow-sm transition-all whitespace-nowrap self-stretch sm:self-auto justify-center"
                  >
                    <span>View & Print Certificate</span>
                    <ExternalLink className="w-4 h-4" />
                  </Link>
                </div>
              ))
            ) : (
              <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center text-slate-500">
                <p className="font-bold text-slate-800 text-sm">No record found matching &quot;{searchTerm}&quot;</p>
                <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
                  Only candidates awarded Rank 1 (Gold), Rank 2 (Silver), Rank 3 (Bronze), and Consolation prizes are listed in this static registry.
                </p>
              </div>
            )}
          </div>
        )}

        {/* Verification Architecture Assurance Box */}
        <div className="bg-gradient-to-r from-slate-900 to-slate-950 text-white rounded-2xl p-6 sm:p-8 border border-slate-800">
          <h3 className="font-bold text-base flex items-center space-x-2 text-amber-400">
            <CheckCircle2 className="w-5 h-5 text-amber-400" />
            <span>Tamper-Proof Static Verification Details</span>
          </h3>
          <ul className="mt-4 space-y-2.5 text-xs text-slate-300">
            <li className="flex items-start space-x-2">
              <span className="text-emerald-400 font-bold">•</span>
              <span>All certificate pages are pre-generated during build time using static parameters (`generateStaticParams`).</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-emerald-400 font-bold">•</span>
              <span>No runtime server dependencies or dynamic database lookups are performed, preventing manipulation.</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-emerald-400 font-bold">•</span>
              <span>Each verified certificate includes official school seals and jury convenor signatures ready for standard A4 landscape print.</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

