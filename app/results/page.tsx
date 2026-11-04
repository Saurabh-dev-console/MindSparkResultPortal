'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import { Trophy, Layers, ShieldCheck, Award } from 'lucide-react';
import { categories } from '@/data/categories';
import { prizeWinners } from '@/data/prizeWinners';
import Podium from '@/components/Podium';
import PrizeTable from '@/components/PrizeTable';
import { SegmentedDock, DockItem } from '@/components/ui/segmented-dock';

export default function ResultsPage() {
  const [activeCategoryId, setActiveCategoryId] = useState<string>(categories[0].id);

  const activeCategory = useMemo(() => {
    return categories.find((c) => c.id === activeCategoryId) || categories[0];
  }, [activeCategoryId]);

  const activeCategoryWinners = useMemo(() => {
    return prizeWinners.filter((w) => w.categoryId === activeCategoryId);
  }, [activeCategoryId]);

  const podiumWinners = useMemo(() => {
    return activeCategoryWinners.filter((w) => w.rank === 1 || w.rank === 2 || w.rank === 3);
  }, [activeCategoryWinners]);

  const dockItems: DockItem[] = useMemo(() => {
    return categories.map((c) => ({
      id: c.id,
      code: c.code,
      name: `${c.name} (${c.classGroup})`,
      count: prizeWinners.filter((w) => w.categoryId === c.id && w.status === 'Ranker').length,
    }));
  }, []);

  return (
    <div className="py-10 md:py-16 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-10 text-center max-w-3xl mx-auto flex flex-col items-center">
          <div className="relative w-20 h-20 mb-4 rounded-full overflow-hidden shadow-md ring-2 ring-red-600/30 bg-white">
            <Image
              src="/images/meena-shah-mindspark-emblem.webp"
              alt="Meena Shah Public School Mindspark 2026"
              fill
              className="object-contain"
              priority
            />
          </div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-md text-xs font-mono font-bold uppercase tracking-wider bg-slate-100 text-slate-800 border border-slate-300 mb-3">
            <Trophy className="w-3.5 h-3.5 text-amber-600" />
            <span>MIND SPARK 2026 — 18 Programmes Directory</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-950 tracking-tight">
            Programme-Wise Results & Podium
          </h1>
          <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
            Official class-wise showcase covering Play Group to College / Graduation groups. Browse top podium rankers and verified merit achievers.
          </p>
        </div>

        {/* Skiper UI: Segmented Dock Tab Switcher */}
        <div className="mb-10">
          <div className="flex items-center space-x-2 text-xs font-bold text-slate-600 uppercase tracking-wider pb-2 mb-2">
            <Layers className="w-4 h-4 text-slate-900" />
            <span>Select Competition Programme (18 Class-Wise Categories):</span>
          </div>
          <SegmentedDock
            items={dockItems}
            activeId={activeCategoryId}
            onSelect={(id) => setActiveCategoryId(id)}
          />
        </div>

        {/* Active Category Header Card */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-mono text-xs font-bold text-slate-900 bg-slate-100 px-2.5 py-0.5 rounded border border-slate-200">
                {activeCategory.code}
              </span>
              <span className="text-xs font-bold text-blue-900 bg-blue-50 px-2.5 py-0.5 rounded border border-blue-200">
                {activeCategory.classGroup}
              </span>
              <span className="text-xs font-semibold text-slate-500 font-mono">
                {activeCategory.activityType}
              </span>
            </div>
            <h2 className="text-2xl font-black text-slate-950 mt-2">
              {activeCategory.name}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">
              {activeCategory.description}
            </p>
          </div>

          <div className="shrink-0 flex items-center space-x-3 bg-slate-50 border border-slate-200 px-4 py-3 rounded-xl text-slate-800">
            <Award className="w-5 h-5 text-amber-600" />
            <div className="text-xs">
              <span className="font-bold block text-slate-950">Medals & Honors</span>
              <span className="text-slate-500 font-medium">Rank 1 Gold, Rank 2 Silver, Rank 3 Bronze</span>
            </div>
          </div>
        </div>

        {/* 1. Active Category Visual Stepped Podium */}
        <Podium
          winners={podiumWinners}
          categoryTitle={`${activeCategory.name} (${activeCategory.classGroup})`}
        />

        {/* 2. Category Prize Winners Table */}
        <PrizeTable
          winners={activeCategoryWinners}
          categoryName={`${activeCategory.name} — ${activeCategory.classGroup}`}
        />
      </div>
    </div>
  );
}
