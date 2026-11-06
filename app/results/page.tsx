'use client';

import React, { useState, useMemo, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  Trophy,
  Layers,
  Award,
  Sparkles,
  ArrowRight,
  School,
  GraduationCap,
  BookOpen,
  Palette,
  Search,
  CheckCircle2,
  Medal,
  SlidersHorizontal,
  ChevronDown,
} from 'lucide-react';
import { categories } from '@/data/categories';
import { prizeWinners } from '@/data/prizeWinners';
import Podium from '@/components/Podium';
import PrizeTable from '@/components/PrizeTable';

interface ScholasticWing {
  id: string;
  name: string;
  shortLabel: string;
  classRange: string;
  icon: React.ComponentType<{ className?: string }>;
  categoryIds: string[];
}

const SCHOLASTIC_WINGS: ScholasticWing[] = [
  {
    id: 'all',
    name: 'All 18 Programmes',
    shortLabel: 'All 18 Programmes',
    classRange: 'Play Group to College',
    icon: Layers,
    categoryIds: categories.map((c) => c.id),
  },
  {
    id: 'pre-primary',
    name: 'Pre-Primary Wing',
    shortLabel: 'Pre-Primary',
    classRange: 'Play Group, Nursery, LKG, UKG',
    icon: Palette,
    categoryIds: ['cat-01', 'cat-02', 'cat-03', 'cat-04'],
  },
  {
    id: 'primary',
    name: 'Primary Wing',
    shortLabel: 'Classes 1 – 3',
    classRange: 'Classes 1, 2 & 3',
    icon: BookOpen,
    categoryIds: ['cat-05', 'cat-06', 'cat-07', 'cat-08'],
  },
  {
    id: 'middle',
    name: 'Middle Wing',
    shortLabel: 'Classes 4 – 8',
    classRange: 'Classes 4, 5, 6, 7 & 8',
    icon: School,
    categoryIds: ['cat-09', 'cat-10', 'cat-11', 'cat-12'],
  },
  {
    id: 'secondary',
    name: 'Secondary & Sr. Secondary',
    shortLabel: 'Classes 9 – 12',
    classRange: 'Classes 9, 10, 11 & 12',
    icon: Trophy,
    categoryIds: ['cat-13', 'cat-14', 'cat-16', 'cat-17'],
  },
  {
    id: 'college',
    name: 'Collegiate & Graduation',
    shortLabel: 'College Group',
    classRange: 'Undergraduate / Degree',
    icon: GraduationCap,
    categoryIds: ['cat-15', 'cat-18'],
  },
];

function ResultsContent() {
  const searchParams = useSearchParams();
  const catParam = searchParams.get('category');

  const [activeCategoryId, setActiveCategoryId] = useState<string>(categories[0].id);
  const [activeWingId, setActiveWingId] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Handle URL param synchronization
  useEffect(() => {
    if (catParam && categories.some((c) => c.id === catParam)) {
      setActiveCategoryId(catParam);
      // Auto-set the parent wing
      const parentWing = SCHOLASTIC_WINGS.find(
        (w) => w.id !== 'all' && w.categoryIds.includes(catParam)
      );
      if (parentWing) {
        setActiveWingId(parentWing.id);
      }
    }
  }, [catParam]);

  const activeCategory = useMemo(() => {
    return categories.find((c) => c.id === activeCategoryId) || categories[0];
  }, [activeCategoryId]);

  const activeCategoryWinners = useMemo(() => {
    return prizeWinners.filter((w) => w.categoryId === activeCategoryId);
  }, [activeCategoryId]);

  const podiumWinners = useMemo(() => {
    return activeCategoryWinners.filter((w) => w.rank === 1 || w.rank === 2 || w.rank === 3);
  }, [activeCategoryWinners]);

  const goldChampion = useMemo(() => {
    return activeCategoryWinners.find((w) => w.rank === 1);
  }, [activeCategoryWinners]);

  // Categories filtered by active wing and search query
  const visibleCategories = useMemo(() => {
    const currentWing = SCHOLASTIC_WINGS.find((w) => w.id === activeWingId) || SCHOLASTIC_WINGS[0];
    let list = categories.filter((c) => currentWing.categoryIds.includes(c.id));

    if (searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase();
      list = list.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.classGroup.toLowerCase().includes(q) ||
          c.code.toLowerCase().includes(q) ||
          c.activityType.toLowerCase().includes(q)
      );
    }
    return list;
  }, [activeWingId, searchQuery]);

  const handleSelectCategory = (id: string) => {
    setActiveCategoryId(id);
    const element = document.getElementById('active-dossier');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="py-12 md:py-20 bg-slate-950 text-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* 1. Header Banner (NO center logo as requested; clean authoritative typography) */}
        <div className="text-center max-w-4xl mx-auto flex flex-col items-center mb-16">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full text-xs font-mono font-bold uppercase tracking-widest bg-amber-400/10 text-amber-400 border border-amber-400/25 mb-5 shadow-sm">
            <Trophy className="w-3.5 h-3.5 text-amber-400" />
            <span>Organized &amp; Certified by Meena Shah Public School • 18 Programmes</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
            Programme-Wise Results &amp; Certified Podium
          </h1>

          <p className="mt-4 text-slate-400 text-sm sm:text-base md:text-lg max-w-2xl leading-relaxed">
            Official inter-school results organized and hosted by Meena Shah Public School. Certified rankers, podium medalists, and merit distinction achievers across all 18 Class-Wise Competition Programmes.
          </p>
        </div>

        {/* 2. Top-Level Competition Category Navigator */}
        <section className="bg-slate-900/95 rounded-3xl p-6 sm:p-8 md:p-10 border border-slate-800 shadow-2xl mb-14 relative overflow-hidden">
          {/* Architectural ambient sheen */}
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-400/30 to-transparent pointer-events-none" />

          {/* Section Heading & Search Filter Bar */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 pb-8 border-b border-slate-800/90">
            <div>
              <div className="flex items-center space-x-2 text-xs font-mono font-bold uppercase tracking-wider text-amber-400 mb-1.5">
                <SlidersHorizontal className="w-4 h-4 text-amber-400" />
                <span>Competition Programme Directory</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                Select Competition Category ({categories.length} Programmes)
              </h2>
            </div>

            {/* In-Directory Search */}
            <div className="relative w-full lg:w-80">
              <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                <Search className="w-4 h-4" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search category, class, or topic..."
                className="w-full pl-10 pr-4 py-2.5 bg-slate-950 text-xs sm:text-sm text-white border border-slate-700 rounded-xl placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-400 font-mono transition-all"
              />
            </div>
          </div>

          {/* Level 1: Scholastic Division Wing Filter Tabs */}
          <div className="pt-6 pb-6">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 block mb-3">
              Filter By Scholastic Division:
            </span>
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2">
              {SCHOLASTIC_WINGS.map((wing) => {
                const Icon = wing.icon;
                const isActive = activeWingId === wing.id;
                return (
                  <button
                    key={wing.id}
                    onClick={() => setActiveWingId(wing.id)}
                    className={`px-4 py-2.5 rounded-xl border text-xs font-bold whitespace-nowrap transition-all duration-200 cursor-pointer flex items-center gap-2 shrink-0 ${
                      isActive
                        ? 'bg-amber-400 text-slate-950 border-amber-300 shadow-md shadow-amber-950/20 scale-[1.02]'
                        : 'bg-slate-950/90 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-800/80'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? 'text-slate-950' : 'text-amber-400'}`} />
                    <span>{wing.shortLabel}</span>
                    <span
                      className={`text-[10px] font-mono px-1.5 py-0.2 rounded-md ${
                        isActive ? 'bg-amber-950/25 text-slate-950 font-black' : 'bg-slate-900 text-slate-400'
                      }`}
                    >
                      {wing.categoryIds.length}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Level 2: Executive Programme Cards Grid */}
          <div className="pt-4 border-t border-slate-800/80">
            <div className="flex items-center justify-between mb-5">
              <span className="text-xs font-mono font-semibold text-slate-400">
                Displaying <strong className="text-white">{visibleCategories.length}</strong> competition programmes
              </span>
              <span className="text-xs font-mono text-amber-400 hidden sm:inline">
                Click any card to inspect podium &amp; results
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {visibleCategories.map((cat) => {
                const isCurrent = cat.id === activeCategoryId;
                const winnerCount = prizeWinners.filter(
                  (w) => w.categoryId === cat.id && w.status === 'Ranker'
                ).length;
                const catGold = prizeWinners.find((w) => w.categoryId === cat.id && w.rank === 1);

                return (
                  <button
                    key={cat.id}
                    onClick={() => handleSelectCategory(cat.id)}
                    className={`p-5 rounded-2xl border text-left transition-all duration-200 cursor-pointer flex flex-col justify-between group relative overflow-hidden ${
                      isCurrent
                        ? 'bg-gradient-to-br from-amber-950/80 via-slate-900 to-slate-950 border-2 border-amber-400 shadow-xl shadow-amber-950/30 ring-1 ring-amber-400/50 scale-[1.02]'
                        : 'bg-slate-950/90 border-slate-800 hover:border-slate-700 hover:bg-slate-900/90 shadow-md'
                    }`}
                  >
                    {isCurrent && (
                      <div className="absolute top-0 right-0 left-0 h-[2px] bg-gradient-to-r from-amber-400 via-amber-200 to-amber-400" />
                    )}

                    <div>
                      {/* Top Badges */}
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span
                          className={`font-mono text-xs font-bold px-2.5 py-1 rounded-md ${
                            isCurrent
                              ? 'bg-amber-400 text-slate-950 font-black'
                              : 'bg-slate-900 text-amber-400 border border-slate-800'
                          }`}
                        >
                          {cat.code}
                        </span>

                        <span
                          className={`text-xs font-mono font-bold px-2.5 py-0.5 rounded-md ${
                            isCurrent
                              ? 'bg-amber-400/20 text-amber-200 border border-amber-400/30'
                              : 'bg-slate-900 text-blue-300 border border-slate-800'
                          }`}
                        >
                          {cat.classGroup}
                        </span>
                      </div>

                      {/* Title */}
                      <h3
                        className={`text-base font-black tracking-tight leading-snug ${
                          isCurrent ? 'text-amber-200' : 'text-white group-hover:text-amber-300 transition-colors'
                        }`}
                      >
                        {cat.name}
                      </h3>

                      {/* Activity format */}
                      <p className="text-xs text-slate-400 mt-1 line-clamp-1 font-medium">
                        {cat.activityType}
                      </p>

                      {/* Brief description */}
                      <p className="text-xs text-slate-500 mt-2 line-clamp-2 leading-relaxed">
                        {cat.description}
                      </p>
                    </div>

                    {/* Bottom Status Row */}
                    <div className="mt-5 pt-3.5 border-t border-slate-800/80 flex items-center justify-between">
                      <div className="flex items-center space-x-1.5 text-xs font-mono">
                        <Medal className={`w-3.5 h-3.5 ${isCurrent ? 'text-amber-400' : 'text-slate-500'}`} />
                        <span className={isCurrent ? 'text-amber-300 font-bold' : 'text-slate-400'}>
                          {winnerCount} Rankers
                        </span>
                        {catGold && (
                          <span className="text-[11px] text-slate-500 hidden xl:inline">
                            • Top: {catGold.name}
                          </span>
                        )}
                      </div>

                      <div
                        className={`text-xs font-mono font-semibold flex items-center gap-1 ${
                          isCurrent ? 'text-amber-400' : 'text-slate-400 group-hover:text-white'
                        }`}
                      >
                        <span>{isCurrent ? 'Viewing' : 'Select'}</span>
                        <ArrowRight
                          className={`w-3.5 h-3.5 transition-transform ${
                            isCurrent ? 'translate-x-0.5 text-amber-400' : 'group-hover:translate-x-0.5'
                          }`}
                        />
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* 3. Active Programme Dossier (Feature Charter Banner) */}
        <section
          id="active-dossier"
          className="bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 rounded-3xl p-6 sm:p-10 border-2 border-amber-500/40 shadow-2xl mb-12 relative overflow-hidden"
        >
          {/* Ambient golden aura */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-amber-400 to-transparent" />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8 pb-8 border-b border-slate-800">
            <div className="max-w-3xl">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="font-mono text-xs font-black text-slate-950 bg-amber-400 px-3 py-1 rounded-md shadow-xs">
                  {activeCategory.code}
                </span>
                <span className="text-xs font-bold text-amber-200 bg-amber-950/60 px-3 py-1 rounded-md border border-amber-500/30 font-mono">
                  {activeCategory.classGroup}
                </span>
                <span className="text-xs font-medium text-slate-300 font-mono bg-slate-900 px-3 py-1 rounded-md border border-slate-800">
                  {activeCategory.activityType}
                </span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight leading-tight">
                {activeCategory.name}
              </h2>

              <p className="text-xs sm:text-sm text-slate-300 mt-2.5 leading-relaxed">
                {activeCategory.description}
              </p>
            </div>

            {/* KPI Summary Metric Plates */}
            <div className="shrink-0 grid grid-cols-2 sm:grid-cols-3 gap-3 bg-slate-950/95 p-4 sm:p-5 rounded-2xl border border-slate-800 text-xs font-mono shadow-inner">
              <div className="pr-4 border-r border-slate-800">
                <span className="text-slate-500 block uppercase tracking-wider text-[10px]">Certified Rankers</span>
                <span className="text-white font-black text-base">{activeCategoryWinners.length} Candidates</span>
              </div>
              <div className="pr-4 sm:border-r border-slate-800">
                <span className="text-slate-500 block uppercase tracking-wider text-[10px]">Gold Champion</span>
                <span className="text-amber-400 font-black text-base truncate block max-w-[130px]">
                  {goldChampion ? goldChampion.name : 'Certified'}
                </span>
              </div>
              <div className="col-span-2 sm:col-span-1 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-800">
                <span className="text-slate-500 block uppercase tracking-wider text-[10px]">Jury Standard</span>
                <span className="text-emerald-400 font-black text-base">100 Pts Rubric</span>
              </div>
            </div>
          </div>

          <div className="relative z-10 pt-5 flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
            <div className="flex items-center space-x-2 text-slate-400">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Certified under standardized academic jury rubrics at Ramnagar Campus</span>
            </div>

            <div className="flex items-center space-x-5">
              <a
                href="#podium-section"
                className="text-amber-400 hover:text-amber-300 font-bold underline underline-offset-4 flex items-center gap-1"
              >
                <span>View Podium Medals</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </a>
              <a
                href="#table-section"
                className="text-slate-300 hover:text-white font-bold underline underline-offset-4 flex items-center gap-1"
              >
                <span>View Examination Roll</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </section>

        {/* 4. Active Category Visual Stepped Podium */}
        <section id="podium-section" className="mb-14">
          <Podium
            winners={podiumWinners}
            categoryTitle={`${activeCategory.name} — ${activeCategory.classGroup}`}
          />
        </section>

        {/* 5. Category Certified Rankers Roll Ledger Table */}
        <section id="table-section">
          <PrizeTable
            winners={activeCategoryWinners}
            categoryName={`${activeCategory.name} (${activeCategory.classGroup})`}
          />
        </section>
      </div>
    </div>
  );
}

export default function ResultsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-slate-950 flex items-center justify-center text-slate-400 font-mono text-xs">
          Loading Official Directory...
        </div>
      }
    >
      <ResultsContent />
    </Suspense>
  );
}
