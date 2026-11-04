'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Trophy, Medal, Award, Search, ExternalLink, ChevronRight, X } from 'lucide-react';
import { PrizeWinner } from '@/types';

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

  const renderRankBadge = (rank: PrizeWinner['rank'], positionTitle: string) => {
    switch (rank) {
      case 1:
        return (
          <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-900 border border-amber-300 shadow-xs">
            <Trophy className="w-3.5 h-3.5 text-amber-600" />
            <span>1st (Gold)</span>
          </span>
        );
      case 2:
        return (
          <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-bold bg-slate-200 text-slate-800 border border-slate-300">
            <Medal className="w-3.5 h-3.5 text-slate-600" />
            <span>2nd (Silver)</span>
          </span>
        );
      case 3:
        return (
          <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-950 border border-amber-300">
            <Medal className="w-3.5 h-3.5 text-amber-700" />
            <span>3rd (Bronze)</span>
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-800 border border-blue-200">
            <Award className="w-3.5 h-3.5 text-blue-600" />
            <span>Consolation</span>
          </span>
        );
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden mt-8">
      {/* Table Top Toolbar */}
      <div className="p-5 sm:p-6 bg-slate-50/80 border-b border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h3 className="font-bold text-lg text-slate-900 flex items-center space-x-2">
            <span>Official Rankers Roll — {categoryName}</span>
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Exclusively verified rankers awarded honors and credentials ({filtered.length} total)
          </p>
        </div>

        {/* Real-time search inside current category */}
        <div className="relative w-full sm:w-72">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            value={filterQuery}
            onChange={(e) => setFilterQuery(e.target.value)}
            placeholder="Filter rankers in this category..."
            className="w-full pl-9 pr-8 py-2 bg-white text-xs sm:text-sm text-slate-900 border border-slate-300 rounded-lg placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          {filterQuery && (
            <button
              onClick={() => setFilterQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
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
            <tr className="bg-slate-100/75 border-b border-slate-200 text-xs font-bold text-slate-600 uppercase tracking-wider">
              <th scope="col" className="py-3.5 px-4 sm:px-6">Rank</th>
              <th scope="col" className="py-3.5 px-4 sm:px-6">Roll / Reg No</th>
              <th scope="col" className="py-3.5 px-4 sm:px-6">Winner Name</th>
              <th scope="col" className="py-3.5 px-4 sm:px-6">School Name</th>
              <th scope="col" className="py-3.5 px-4 sm:px-6">Class</th>
              <th scope="col" className="py-3.5 px-4 sm:px-6">Score</th>
              <th scope="col" className="py-3.5 px-4 sm:px-6">Prize Details</th>
              <th scope="col" className="py-3.5 px-4 sm:px-6 text-right">Certificate</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {filtered.length > 0 ? (
              filtered.map((winner) => (
                <tr
                  key={winner.id}
                  className="hover:bg-blue-50/40 transition-colors duration-100"
                >
                  {/* Rank */}
                  <td className="py-4 px-4 sm:px-6 whitespace-nowrap">
                    {renderRankBadge(winner.rank, winner.positionTitle)}
                  </td>

                  {/* Roll / Reg No */}
                  <td className="py-4 px-4 sm:px-6 whitespace-nowrap">
                    <div className="font-mono font-semibold text-slate-900 text-xs">
                      {winner.rollNo}
                    </div>
                    <div className="font-mono text-[11px] text-slate-500">
                      {winner.regNo}
                    </div>
                  </td>

                  {/* Winner Name */}
                  <td className="py-4 px-4 sm:px-6 whitespace-nowrap">
                    <div className="font-bold text-slate-900 text-sm">{winner.name}</div>
                    <div className="text-xs text-slate-500">{winner.positionTitle}</div>
                  </td>

                  {/* School Name */}
                  <td className="py-4 px-4 sm:px-6">
                    <span className="font-medium text-slate-800 text-xs block max-w-xs">
                      {winner.schoolName}
                    </span>
                  </td>

                  {/* Class */}
                  <td className="py-4 px-4 sm:px-6 whitespace-nowrap text-xs text-slate-600 font-medium">
                    {winner.className}
                  </td>

                  {/* Score */}
                  <td className="py-4 px-4 sm:px-6 whitespace-nowrap">
                    <span className="inline-block font-mono font-bold text-slate-900 text-xs bg-slate-100 px-2 py-1 rounded border border-slate-200">
                      {winner.score} / {winner.maxScore}
                    </span>
                  </td>

                  {/* Prize Details */}
                  <td className="py-4 px-4 sm:px-6">
                    <span className="text-xs text-slate-700 font-medium leading-relaxed block max-w-sm">
                      {winner.prizeAwarded}
                    </span>
                  </td>

                  {/* Certificate Link */}
                  <td className="py-4 px-4 sm:px-6 whitespace-nowrap text-right">
                    <Link
                      href={`/verify/${winner.regNo}/`}
                      className="inline-flex items-center space-x-1.5 text-xs font-semibold text-blue-600 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-lg border border-blue-200 transition-colors"
                    >
                      <span>Verify</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={8} className="py-12 text-center text-slate-500">
                  <p className="text-sm font-medium">No ranker matched your filter query &quot;{filterQuery}&quot;</p>
                  <p className="text-xs text-slate-400 mt-1">Try searching by candidate name, roll number, or school.</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
