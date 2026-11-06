'use client';

import React, { useState, useMemo } from 'react';
import { Search, X, Award, CheckCircle2, ShieldCheck, Filter } from 'lucide-react';
import { PrizeWinner } from '@/types';
import { RankBadge } from '@/components/ui/badge';

interface PrizeTableProps {
  winners: PrizeWinner[];
  categoryName: string;
}

type RankFilter = 'all' | '1' | '2' | '3' | '4';

export default function PrizeTable({ winners, categoryName }: PrizeTableProps) {
  const [filterQuery, setFilterQuery] = useState('');
  const [rankFilter, setRankFilter] = useState<RankFilter>('all');

  const filtered = useMemo(() => {
    let result = winners;

    if (rankFilter !== 'all') {
      const targetRank = parseInt(rankFilter, 10);
      result = result.filter((w) => w.rank === targetRank);
    }

    const q = filterQuery.trim().toLowerCase();
    if (q) {
      result = result.filter(
        (w) =>
          w.name.toLowerCase().includes(q) ||
          (w.schoolName && w.schoolName.toLowerCase().includes(q)) ||
          w.rollNo.toLowerCase().includes(q) ||
          w.regNo.toLowerCase().includes(q) ||
          w.className.toLowerCase().includes(q)
      );
    }

    return result;
  }, [winners, filterQuery, rankFilter]);

  const countByRank = useMemo(() => {
    return {
      all: winners.length,
      gold: winners.filter((w) => w.rank === 1).length,
      silver: winners.filter((w) => w.rank === 2).length,
      bronze: winners.filter((w) => w.rank === 3).length,
      consolation: winners.filter((w) => w.rank === 4).length,
    };
  }, [winners]);

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-md overflow-hidden mt-10">
      {/* Header Toolbar */}
      <div className="p-6 sm:p-8 bg-slate-900 text-white border-b border-slate-800">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center space-x-2 text-xs font-mono font-bold uppercase tracking-wider text-amber-400 bg-amber-400/10 px-3 py-1 rounded-md border border-amber-400/20 mb-2.5">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
              <span>Official Academic Ledger</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Certified Examination Roll &amp; Distinction Register
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Tabulated record of certified rankers for <strong className="text-slate-200 font-semibold">{categoryName}</strong>.
            </p>
          </div>

          {/* Search Box */}
          <div className="relative w-full lg:w-80">
            <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={filterQuery}
              onChange={(e) => setFilterQuery(e.target.value)}
              placeholder="Search Candidate, Roll No (e.g. 260101)..."
              className="w-full pl-10 pr-9 py-2.5 bg-slate-950 text-xs sm:text-sm text-white border border-slate-700 rounded-xl placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-all font-mono"
            />
            {filterQuery && (
              <button
                onClick={() => setFilterQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                aria-label="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 mt-6 pt-6 border-t border-slate-800/80 overflow-x-auto no-scrollbar">
          <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5 shrink-0 mr-1">
            <Filter className="w-3.5 h-3.5 text-amber-400" />
            <span>Filter Standing:</span>
          </span>
          <button
            onClick={() => setRankFilter('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 cursor-pointer ${
              rankFilter === 'all'
                ? 'bg-amber-400 text-slate-950 font-bold shadow-sm'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <span>All Rankers</span>
            <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${rankFilter === 'all' ? 'bg-amber-950/20 text-slate-950' : 'bg-slate-900 text-slate-400'}`}>
              {countByRank.all}
            </span>
          </button>
          <button
            onClick={() => setRankFilter('1')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 cursor-pointer ${
              rankFilter === '1'
                ? 'bg-amber-400 text-slate-950 font-bold shadow-sm'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <span>Rank 1 (Gold)</span>
            <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${rankFilter === '1' ? 'bg-amber-950/20 text-slate-950' : 'bg-slate-900 text-slate-400'}`}>
              {countByRank.gold}
            </span>
          </button>
          <button
            onClick={() => setRankFilter('2')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 cursor-pointer ${
              rankFilter === '2'
                ? 'bg-amber-400 text-slate-950 font-bold shadow-sm'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <span>Rank 2 (Silver)</span>
            <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${rankFilter === '2' ? 'bg-amber-950/20 text-slate-950' : 'bg-slate-900 text-slate-400'}`}>
              {countByRank.silver}
            </span>
          </button>
          <button
            onClick={() => setRankFilter('3')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 cursor-pointer ${
              rankFilter === '3'
                ? 'bg-amber-400 text-slate-950 font-bold shadow-sm'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <span>Rank 3 (Bronze)</span>
            <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${rankFilter === '3' ? 'bg-amber-950/20 text-slate-950' : 'bg-slate-900 text-slate-400'}`}>
              {countByRank.bronze}
            </span>
          </button>
          {countByRank.consolation > 0 && (
            <button
              onClick={() => setRankFilter('4')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 cursor-pointer ${
                rankFilter === '4'
                  ? 'bg-amber-400 text-slate-950 font-bold shadow-sm'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              <span>Consolation</span>
              <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${rankFilter === '4' ? 'bg-amber-950/20 text-slate-950' : 'bg-slate-900 text-slate-400'}`}>
                {countByRank.consolation}
              </span>
            </button>
          )}
        </div>
      </div>

      {/* 1. Desktop & Tablet Table (md and up) */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-left border-collapse text-sm">
          <thead>
            <tr className="bg-slate-100/90 border-b border-slate-200 text-xs font-mono font-bold text-slate-700 uppercase tracking-wider">
              <th scope="col" className="py-4 px-6">Official Standing</th>
              <th scope="col" className="py-4 px-6">Registration No</th>
              <th scope="col" className="py-4 px-6">Candidate Details</th>
              <th scope="col" className="py-4 px-6">Class Group</th>
              <th scope="col" className="py-4 px-6">Honors &amp; Citation</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 bg-white">
            {filtered.length > 0 ? (
              filtered.map((winner) => (
                <tr
                  key={winner.id}
                  className="hover:bg-amber-50/30 transition-colors group"
                >
                  {/* Standing */}
                  <td className="py-4 px-6 whitespace-nowrap">
                    <RankBadge rank={winner.rank} />
                  </td>

                  {/* Registration No (Authentic MS2611... from Excel) */}
                  <td className="py-4 px-6 whitespace-nowrap">
                    <div className="font-mono font-black text-slate-950 text-sm tracking-wide bg-slate-100 px-3 py-1.5 rounded-lg inline-block border border-slate-300">
                      {winner.regNo}
                    </div>
                  </td>

                  {/* Candidate Name */}
                  <td className="py-4 px-6 whitespace-nowrap">
                    <div className="font-extrabold text-slate-950 text-base">{winner.name}</div>
                    <div className="text-xs text-slate-500 font-medium">{winner.positionTitle}</div>
                  </td>

                  {/* Class */}
                  <td className="py-4 px-6 whitespace-nowrap text-xs text-slate-700 font-bold font-mono">
                    <span className="px-2.5 py-1 rounded bg-slate-100 text-slate-800 border border-slate-200">
                      {winner.className}
                    </span>
                  </td>

                  {/* Honors Awarded */}
                  <td className="py-4 px-6">
                    <span className="text-xs text-slate-800 font-medium block max-w-sm leading-relaxed">
                      {winner.prizeAwarded}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="py-14 text-center text-slate-500">
                  <div className="max-w-md mx-auto">
                    <p className="text-base font-bold text-slate-900">
                      No rankers found matching your criteria
                    </p>
                    <p className="text-xs text-slate-500 mt-1">
                      Please check the candidate name or registration number, or switch the standing filter.
                    </p>
                    <button
                      onClick={() => {
                        setFilterQuery('');
                        setRankFilter('all');
                      }}
                      className="mt-4 px-4 py-1.5 rounded-lg bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800"
                    >
                      Reset Filters
                    </button>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* 2. Mobile View: Responsive Candidate Ledger Cards (sm and below) */}
      <div className="md:hidden divide-y divide-slate-200 bg-slate-50/50">
        {filtered.length > 0 ? (
          filtered.map((winner) => (
            <div key={winner.id} className="p-5 bg-white">
              <div className="flex items-center justify-between gap-2 mb-3">
                <RankBadge rank={winner.rank} size="sm" />
                <div className="font-mono font-black text-xs text-slate-950 bg-slate-100 px-2.5 py-1 rounded-md border border-slate-300">
                  Reg: {winner.regNo}
                </div>
              </div>

              <h4 className="font-black text-base text-slate-950">{winner.name}</h4>
              {winner.schoolName && <p className="text-xs text-slate-600 font-medium mt-0.5">{winner.schoolName}</p>}

              <div className="mt-3 flex items-center justify-between text-xs font-mono pt-3 border-t border-slate-100">
                <span className="text-slate-500">Class: <strong className="text-slate-800">{winner.className}</strong></span>
                <span className="font-mono text-xs font-bold text-slate-700">
                  {winner.positionTitle}
                </span>
              </div>

              <div className="mt-2.5 text-xs text-slate-700 bg-amber-50/60 p-2.5 rounded-xl border border-amber-200/60">
                <span className="font-bold text-slate-900 block text-[11px] uppercase tracking-wider mb-0.5">Awarded Honors:</span>
                <span>{winner.prizeAwarded}</span>
              </div>
            </div>
          ))
        ) : (
          <div className="p-8 text-center text-slate-500">
            <p className="text-sm font-bold text-slate-900">No rankers found</p>
            <p className="text-xs text-slate-500 mt-1">Try another search or filter.</p>
          </div>
        )}
      </div>

      {/* Table Footer */}
      <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500 font-mono">
        <div className="flex items-center space-x-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Showing {filtered.length} of {winners.length} certified rankers</span>
        </div>
        <div className="text-slate-600 font-semibold">
          Organized, Managed &amp; Certified by Meena Shah Public School
        </div>
      </div>
    </div>
  );
}
