'use client';

import React, { useState, useMemo, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Search, ArrowUpRight, X } from 'lucide-react';
import { prizeWinners } from '@/data/prizeWinners';
import { RankBadge } from '@/components/ui/badge';

interface StaticSearchProps {
  placeholder?: string;
  className?: string;
  limit?: number;
}

export default function StaticSearch({
  placeholder = 'Search by Candidate Name, Roll No, or Class...',
  className = '',
  limit = 6,
}: StaticSearchProps) {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  // Shortcut key '/' to focus
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '/' && document.activeElement !== inputRef.current) {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const filteredWinners = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];

    return prizeWinners
      .filter((winner) => {
        return (
          winner.name.toLowerCase().includes(q) ||
          winner.regNo.toLowerCase().includes(q) ||
          winner.rollNo.toLowerCase().includes(q) ||
          (winner.schoolName && winner.schoolName.toLowerCase().includes(q)) ||
          winner.categoryName.toLowerCase().includes(q) ||
          winner.className.toLowerCase().includes(q)
        );
      })
      .slice(0, limit);
  }, [query, limit]);

  return (
    <div className={`relative w-full ${className}`}>
      {/* Search Input Box */}
      <div className="relative flex items-center">
        <div className="absolute left-4 pointer-events-none text-slate-400">
          <Search className="w-5 h-5" />
        </div>
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className="w-full pl-12 pr-16 py-3.5 bg-white border border-slate-300 rounded-2xl shadow-xs text-sm sm:text-base text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-slate-900 transition-all"
        />
        <div className="absolute right-3.5 flex items-center space-x-1.5">
          {query ? (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100"
              aria-label="Clear search query"
            >
              <X className="w-4 h-4" />
            </button>
          ) : (
            <kbd className="hidden sm:inline-block font-mono text-[11px] font-bold text-slate-400 bg-slate-100 border border-slate-200 px-1.5 py-0.5 rounded">
              /
            </kbd>
          )}
        </div>
      </div>

      {/* Flyout Results */}
      {query.trim().length > 0 && (
        <div className="absolute left-0 right-0 top-full mt-2 bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden z-40 max-h-[420px] overflow-y-auto">
          <div className="p-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between text-xs text-slate-600 font-semibold">
            <span>
              Verified Rankers Found: <strong className="text-slate-900">{filteredWinners.length}</strong>
            </span>
            <span className="text-[11px] font-mono text-slate-400">Exclusively Award Winners</span>
          </div>

          {filteredWinners.length > 0 ? (
            <div className="divide-y divide-slate-100">
              {filteredWinners.map((winner) => (
                <Link
                  key={winner.id}
                  href={`/results/?category=${winner.categoryId}`}
                  className="p-4 hover:bg-slate-50 transition-colors flex items-center justify-between group"
                >
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="font-extrabold text-slate-900 group-hover:text-blue-800">
                        {winner.name}
                      </span>
                      <RankBadge rank={winner.rank} />
                    </div>
                    <div className="text-xs text-slate-500 flex flex-wrap items-center gap-x-2 gap-y-0.5">
                      <span className="font-mono font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                        Reg: {winner.regNo}
                      </span>
                      {winner.schoolName && (
                        <>
                          <span>•</span>
                          <span className="text-slate-700 font-medium">{winner.schoolName}</span>
                        </>
                      )}
                    </div>
                    <div className="text-xs text-slate-700 font-medium">
                      {winner.categoryName} ({winner.className})
                    </div>
                  </div>

                  <div className="flex items-center space-x-1 text-slate-400 group-hover:text-slate-900 pl-3">
                    <span className="text-xs font-bold hidden sm:inline">View Podium</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center text-slate-500">
              <p className="text-sm font-bold text-slate-800">No prize winner matches &quot;{query}&quot;</p>
              <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                This official portal strictly indexes certified rankers and medal recipients. General participants are excluded.
              </p>
            </div>
          )}

          {filteredWinners.length > 0 && (
            <div className="p-3 bg-slate-50 border-t border-slate-200 text-center">
              <Link
                href="/results/"
                className="text-xs font-bold text-slate-900 hover:text-blue-700 inline-flex items-center space-x-1"
              >
                <span>Browse All 18 Category Podiums</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
