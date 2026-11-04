'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Search, Trophy, Medal, Award, ChevronRight, X, ExternalLink } from 'lucide-react';
import { prizeWinners } from '@/data/prizeWinners';
import { PrizeWinner } from '@/types';

interface StaticSearchProps {
  placeholder?: string;
  className?: string;
  limit?: number;
}

export default function StaticSearch({
  placeholder = 'Search winner by Name, Roll No (e.g. 260101), Reg No, or School...',
  className = '',
  limit = 6,
}: StaticSearchProps) {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const filteredWinners = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];

    return prizeWinners
      .filter((winner) => {
        return (
          winner.name.toLowerCase().includes(q) ||
          winner.regNo.toLowerCase().includes(q) ||
          winner.rollNo.toLowerCase().includes(q) ||
          winner.schoolName.toLowerCase().includes(q) ||
          winner.categoryName.toLowerCase().includes(q)
        );
      })
      .slice(0, limit);
  }, [query, limit]);

  const getRankBadge = (rank: PrizeWinner['rank']) => {
    switch (rank) {
      case 1:
        return (
          <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded text-xs font-bold bg-amber-100 text-amber-800 border border-amber-300">
            <Trophy className="w-3 h-3 text-amber-600" />
            <span>Rank 1 (Gold)</span>
          </span>
        );
      case 2:
        return (
          <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded text-xs font-bold bg-slate-200 text-slate-800 border border-slate-300">
            <Medal className="w-3 h-3 text-slate-600" />
            <span>Rank 2 (Silver)</span>
          </span>
        );
      case 3:
        return (
          <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded text-xs font-bold bg-amber-50 text-amber-900 border border-amber-400">
            <Medal className="w-3 h-3 text-amber-700" />
            <span>Rank 3 (Bronze)</span>
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded text-xs font-bold bg-blue-50 text-blue-800 border border-blue-200">
            <Award className="w-3 h-3 text-blue-600" />
            <span>Consolation</span>
          </span>
        );
    }
  };

  return (
    <div className={`relative w-full ${className}`}>
      {/* Search Input Box */}
      <div className="relative flex items-center">
        <div className="absolute left-4 pointer-events-none text-slate-400">
          <Search className="w-5 h-5" />
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          placeholder={placeholder}
          className="w-full pl-12 pr-10 py-3.5 bg-white border border-slate-300 rounded-xl shadow-sm text-sm sm:text-base text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
        />
        {query && (
          <button
            onClick={() => setQuery('')}
            className="absolute right-3.5 p-1 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100"
            aria-label="Clear search query"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Live Dropdown Results */}
      {query.trim().length > 0 && (
        <div className="absolute left-0 right-0 top-full mt-2 bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden z-40 max-h-[420px] overflow-y-auto">
          <div className="p-2.5 bg-slate-50 border-b border-slate-100 flex items-center justify-between text-xs text-slate-500 font-medium">
            <span>
              Matches found: <strong className="text-slate-800">{filteredWinners.length}</strong>
            </span>
            <span>Award Winners Only</span>
          </div>

          {filteredWinners.length > 0 ? (
            <div className="divide-y divide-slate-100">
              {filteredWinners.map((winner) => (
                <Link
                  key={winner.id}
                  href={`/verify/${winner.regNo}/`}
                  className="p-3.5 hover:bg-blue-50/60 transition-colors flex items-center justify-between group"
                >
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="font-semibold text-slate-900 group-hover:text-blue-700">
                        {winner.name}
                      </span>
                      {getRankBadge(winner.rank)}
                    </div>
                    <div className="text-xs text-slate-500 flex flex-wrap items-center gap-x-2 gap-y-0.5">
                      <span className="font-mono text-slate-700 bg-slate-100 px-1.5 py-0.5 rounded">
                        Roll: {winner.rollNo}
                      </span>
                      <span className="font-mono text-slate-700 bg-slate-100 px-1.5 py-0.5 rounded">
                        Reg: {winner.regNo}
                      </span>
                      <span>•</span>
                      <span className="text-slate-600">{winner.schoolName}</span>
                    </div>
                    <div className="text-xs text-blue-600 font-medium">
                      {winner.categoryName} ({winner.className})
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 text-slate-400 group-hover:text-blue-600 pl-3">
                    <span className="text-xs font-semibold hidden sm:inline">View Certificate</span>
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center text-slate-500">
              <p className="text-sm font-medium text-slate-700">No prize winner matches &quot;{query}&quot;</p>
              <p className="text-xs text-slate-400 mt-1">
                Note: This portal strictly indexes official rankers and medal winners. Please check the Roll No or Registration No.
              </p>
            </div>
          )}

          {filteredWinners.length > 0 && (
            <div className="p-2.5 bg-slate-50 border-t border-slate-100 text-center">
              <Link
                href="/results/"
                className="text-xs font-semibold text-blue-600 hover:text-blue-800 inline-flex items-center space-x-1"
              >
                <span>Browse All 18 Categories in Results Directory</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
