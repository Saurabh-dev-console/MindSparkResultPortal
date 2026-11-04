'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Search, ArrowUpRight, X } from 'lucide-react';
import { PrizeWinner } from '@/types';
import { RankBadge } from '@/components/ui/badge';

interface PrizeTableProps {
  winners: PrizeWinner[];
  categoryName: string;
}

export default function PrizeTable({ winners, categoryName }: PrizeTableProps) {
  const [filterQuery, setFilterQuery] = useState('');

  const filtered = useMemo(() => {
    const q = filterQuery.trim().toLowerCase();
    if (!q) return winners;
    return winners.filter(
      (w) =>
        w.name.toLowerCase().includes(q) ||
        w.schoolName.toLowerCase().includes(q) ||
        w.rollNo.toLowerCase().includes(q) ||
        w.regNo.toLowerCase().includes(q) ||
        w.className.toLowerCase().includes(q)
    );
  }, [winners, filterQuery]);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden mt-8">
      {/* Table Toolbar */}
      <div className="p-5 sm:p-6 bg-slate-50 border-b border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h3 className="font-extrabold text-lg text-slate-950">
            Certified Rankers Roll — {categoryName}
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Strict directory of awarded candidates ({filtered.length} total)
          </p>
        </div>

        {/* In-category search */}
        <div className="relative w-full sm:w-72">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            value={filterQuery}
            onChange={(e) => setFilterQuery(e.target.value)}
            placeholder="Filter rankers in this category..."
            className="w-full pl-9 pr-8 py-2 bg-white text-xs sm:text-sm text-slate-900 border border-slate-300 rounded-xl placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-slate-900 transition-all"
          />
          {filterQuery && (
            <button
              onClick={() => setFilterQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              aria-label="Clear filter"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Table Content */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-sm">
          <thead>
            <tr className="bg-slate-100/80 border-b border-slate-200 text-xs font-bold text-slate-700 uppercase tracking-wider">
              <th scope="col" className="py-3.5 px-4 sm:px-6">Standing</th>
              <th scope="col" className="py-3.5 px-4 sm:px-6">Roll / Reg No</th>
              <th scope="col" className="py-3.5 px-4 sm:px-6">Candidate</th>
              <th scope="col" className="py-3.5 px-4 sm:px-6">Institution</th>
              <th scope="col" className="py-3.5 px-4 sm:px-6">Class</th>
              <th scope="col" className="py-3.5 px-4 sm:px-6">Score</th>
              <th scope="col" className="py-3.5 px-4 sm:px-6">Honors Awarded</th>
              <th scope="col" className="py-3.5 px-4 sm:px-6 text-right">Certificate</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {filtered.length > 0 ? (
              filtered.map((winner) => (
                <tr
                  key={winner.id}
                  className="hover:bg-slate-50 transition-colors"
                >
                  <td className="py-4 px-4 sm:px-6 whitespace-nowrap">
                    <RankBadge rank={winner.rank} />
                  </td>

                  <td className="py-4 px-4 sm:px-6 whitespace-nowrap">
                    <div className="font-mono font-bold text-slate-950 text-xs">
                      {winner.rollNo}
                    </div>
                    <div className="font-mono text-[11px] text-slate-500">
                      {winner.regNo}
                    </div>
                  </td>

                  <td className="py-4 px-4 sm:px-6 whitespace-nowrap">
                    <div className="font-bold text-slate-950 text-sm">{winner.name}</div>
                    <div className="text-xs text-slate-500 font-medium">{winner.positionTitle}</div>
                  </td>

                  <td className="py-4 px-4 sm:px-6">
                    <span className="font-medium text-slate-800 text-xs block max-w-xs leading-normal">
                      {winner.schoolName}
                    </span>
                  </td>

                  <td className="py-4 px-4 sm:px-6 whitespace-nowrap text-xs text-slate-700 font-semibold font-mono">
                    {winner.className}
                  </td>

                  <td className="py-4 px-4 sm:px-6 whitespace-nowrap">
                    <span className="font-mono font-extrabold text-slate-900 text-xs bg-slate-100 px-2 py-1 rounded border border-slate-200">
                      {winner.score} / {winner.maxScore}
                    </span>
                  </td>

                  <td className="py-4 px-4 sm:px-6">
                    <span className="text-xs text-slate-700 font-medium block max-w-sm leading-relaxed">
                      {winner.prizeAwarded}
                    </span>
                  </td>

                  <td className="py-4 px-4 sm:px-6 whitespace-nowrap text-right">
                    <Link
                      href={`/verify/${winner.regNo}/`}
                      className="inline-flex items-center space-x-1 text-xs font-bold text-slate-900 hover:text-blue-700 bg-white hover:bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-300 shadow-2xs transition-colors"
                    >
                      <span>Verify</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={8} className="py-12 text-center text-slate-500">
                  <p className="text-sm font-semibold text-slate-800">
                    No ranker matched &quot;{filterQuery}&quot;
                  </p>
                  <p className="text-xs text-slate-400 mt-1">
                    Please check the candidate name or roll number.
                  </p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
