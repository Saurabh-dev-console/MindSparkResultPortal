'use client';

import React, { useState, useMemo } from 'react';
import { Trophy, Award, Sparkles, Filter, ChevronRight, Layers } from 'lucide-react';
import { categories } from '@/data/categories';
import { prizeWinners } from '@/data/prizeWinners';
import Podium from '@/components/Podium';
import PrizeTable from '@/components/PrizeTable';

export default function ResultsPage() {
  const [activeCategoryId, setActiveCategoryId] = useState<string>(categories[0].id);

  const activeCategory = useMemo(() => {
    return categories.find((c) => c.id === activeCategoryId) || categories[0];
  }, [activeCategoryId]);

  const activeCategoryWinners = useMemo(() => {
    return prizeWinners.filter((w) => w.categoryId === activeCategoryId);
  }, [activeCategoryId]);

  return (
    <div className="py-10 md:py-16 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-10 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-100 text-blue-800 border border-blue-200 mb-3">
            <Trophy className="w-3.5 h-3.5 text-amber-500" />
            <span>Official Mindspark 2026 Directory</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            Programme-Wise Prize Winners & Podium
          </h1>
          <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
            Instant client-side navigation across all 18 official competition categories. Browse top 3 podium medalists and certified prize winners.
          </p>
        </div>

        {/* 18 Category Tab Navigation Carousel / Grid */}
        <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-sm mb-10">
          <div className="flex items-center space-x-2 text-xs font-bold text-slate-500 uppercase tracking-wider pb-3 border-b border-slate-100 mb-3">
            <Layers className="w-4 h-4 text-blue-600" />
            <span>Select Competition Category (18 Arenas):</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
            {categories.map((cat) => {
              const isSelected = cat.id === activeCategoryId;
              const winnerCount = prizeWinners.filter((w) => w.categoryId === cat.id).length;

              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategoryId(cat.id)}
                  className={`p-3 rounded-xl text-left transition-all duration-150 flex flex-col justify-between border cursor-pointer ${
                    isSelected
                      ? 'bg-blue-600 text-white border-blue-600 shadow-md scale-[1.02]'
                      : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200/80'
                  }`}
                >
                  <div className="flex items-center justify-between w-full mb-1">
                    <span
                      className={`font-mono text-[10px] font-bold px-1.5 py-0.5 rounded ${
                        isSelected ? 'bg-blue-700 text-blue-100' : 'bg-slate-200 text-slate-600'
                      }`}
                    >
                      {cat.code}
                    </span>
                    <span
                      className={`text-[10px] font-semibold px-1.5 py-0.2 rounded-full ${
                        isSelected ? 'bg-amber-400 text-slate-950 font-bold' : 'text-slate-500'
                      }`}
                    >
                      {winnerCount} rankers
                    </span>
                  </div>

                  <span className="font-bold text-xs line-clamp-1 leading-snug">
                    {cat.name}
                  </span>

                  <span
                    className={`text-[10px] mt-1 block truncate ${
                      isSelected ? 'text-blue-100' : 'text-slate-400'
                    }`}
                  >
                    {cat.gradeGroup}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Category Header Card */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-mono text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                {activeCategory.code}
              </span>
              <span className="text-xs font-semibold text-slate-500">
                {activeCategory.gradeGroup}
              </span>
            </div>
            <h2 className="text-2xl font-black text-slate-900 mt-1">
              {activeCategory.name}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
              {activeCategory.description}
            </p>
          </div>

          <div className="shrink-0 flex items-center space-x-2 bg-amber-50 border border-amber-200 px-4 py-2.5 rounded-xl text-amber-900">
            <Trophy className="w-4 h-4 text-amber-600" />
            <div className="text-xs">
              <span className="font-bold block">Prize Allocations</span>
              <span className="text-slate-600">Top 3 Medals + Merit</span>
            </div>
          </div>
        </div>

        {/* 1. Active Category Visual Podium */}
        <Podium
          winners={activeCategoryWinners}
          categoryTitle={activeCategory.name}
        />

        {/* 2. Category Prize Winners Table (Strictly Awarded Rankers) */}
        <PrizeTable
          winners={activeCategoryWinners}
          categoryName={activeCategory.name}
        />
      </div>
    </div>
  );
}
