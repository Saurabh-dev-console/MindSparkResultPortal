'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Trophy,
  Award,
  School,
  ArrowRight,
  ArrowUpRight,
  ShieldCheck,
  CheckCircle2,
  Camera,
  Layers,
  Sparkles,
  BookOpen,
  Search,
} from 'lucide-react';
import Hero from '@/components/Hero';
import StaticSearch from '@/components/StaticSearch';
import { prizeWinners } from '@/data/prizeWinners';
import { galleryImages } from '@/data/gallery';
import { categories } from '@/data/categories';
import { SpotlightCard } from '@/components/ui/spotlight-card';
import { AnimatedButton } from '@/components/ui/animated-button';
import { RankBadge } from '@/components/ui/badge';
import { StatsCounter } from '@/components/ui/stats-counter';

// Scholastic tier helper for 18 categories
function getTierInfo(classGroup: string) {
  if (classGroup.includes('Play') || classGroup.includes('Nursery') || classGroup.includes('LKG') || classGroup.includes('UKG')) {
    return { name: 'Pre-Primary', color: 'bg-emerald-50 text-emerald-900 border-emerald-200' };
  }
  if (classGroup.includes('Class 1') || classGroup.includes('Class 2') || classGroup.includes('Class 4')) {
    return { name: 'Primary Division', color: 'bg-blue-50 text-blue-900 border-blue-200' };
  }
  if (classGroup.includes('Class 6')) {
    return { name: 'Middle Division', color: 'bg-purple-50 text-purple-900 border-purple-200' };
  }
  if (classGroup.includes('Class 9') || classGroup.includes('Class 11')) {
    return { name: 'Secondary & Senior', color: 'bg-amber-50 text-amber-900 border-amber-200' };
  }
  return { name: 'College / Graduation', color: 'bg-indigo-50 text-indigo-900 border-indigo-200' };
}

export default function HomePage() {
  const [selectedHomeWing, setSelectedHomeWing] = useState('all');
  const [homeCategorySearch, setHomeCategorySearch] = useState('');

  const champions = prizeWinners.filter((w) => w.rank === 1).slice(0, 6);
  const previewGallery = galleryImages.slice(0, 6);

  const HOME_WINGS = [
    { id: 'all', label: 'All 18 Programmes', count: 18, range: 'All Divisions' },
    { id: 'pre-primary', label: 'Pre-Primary Wing', count: 4, range: 'Play Group – UKG', ids: ['cat-01', 'cat-02', 'cat-03', 'cat-04'] },
    { id: 'primary', label: 'Primary Wing', count: 4, range: 'Classes 1 – 3', ids: ['cat-05', 'cat-06', 'cat-07', 'cat-08'] },
    { id: 'middle', label: 'Middle Wing', count: 4, range: 'Classes 4 – 8', ids: ['cat-09', 'cat-10', 'cat-11', 'cat-12'] },
    { id: 'secondary', label: 'Secondary & Sr.', count: 4, range: 'Classes 9 – 12', ids: ['cat-13', 'cat-14', 'cat-16', 'cat-17'] },
    { id: 'college', label: 'Collegiate Division', count: 2, range: 'College Group', ids: ['cat-15', 'cat-18'] },
  ];

  const filteredHomeCategories = categories.filter((cat) => {
    const currentWing = HOME_WINGS.find((w) => w.id === selectedHomeWing) || HOME_WINGS[0];
    const matchesWing = selectedHomeWing === 'all' || (currentWing.ids && currentWing.ids.includes(cat.id));
    if (!matchesWing) return false;

    if (homeCategorySearch.trim()) {
      const q = homeCategorySearch.trim().toLowerCase();
      return (
        cat.name.toLowerCase().includes(q) ||
        cat.classGroup.toLowerCase().includes(q) ||
        cat.code.toLowerCase().includes(q) ||
        cat.activityType.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const metrics = [
    {
      code: 'INDEX-01',
      num: 18,
      suffix: '',
      label: 'Class-Wise Programmes',
      subtext: 'From Play Group to College / Graduation',
      scope: '18 Distinct Divisions',
      icon: Trophy,
    },
    {
      code: 'INDEX-02',
      num: 50,
      suffix: '+',
      label: 'Participating Schools',
      subtext: 'Premier CBSE & State Institutions',
      scope: 'Regional Academic Cohort',
      icon: School,
    },
    {
      code: 'INDEX-03',
      num: 100,
      suffix: '+',
      label: 'Medals & Distinction Honors',
      subtext: 'Gold, Silver, Bronze & Merit Trophies',
      scope: 'Standardized Jury Rubrics',
      icon: Award,
    },
    {
      code: 'INDEX-04',
      num: 100,
      suffix: '%',
      label: 'Certified Rankers Directory',
      subtext: 'Verified Official Registration Directory',
      scope: 'Tamper-Proof Static Audit',
      icon: ShieldCheck,
    },
  ];

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* 1. Full-Viewport Hero with 34-Photo Smooth Cross-Fade Transition */}
      <Hero />

      {/* 2. Official Competition Metrics Showcase (Revealed cleanly on scroll) */}
      <section className="py-16 md:py-20 bg-slate-950 text-white border-b border-slate-800/80 relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 pb-6 border-b border-slate-800/80">
            <div>
              <div className="inline-flex items-center space-x-2 text-xs font-mono font-bold uppercase tracking-widest text-amber-400 bg-amber-400/10 px-3.5 py-1.5 rounded-lg border border-amber-400/25 mb-3">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Verified Competition Census &amp; Merit Index</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                MINDSPARK 2026 at a Glance
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 max-w-lg leading-relaxed">
              Official institutional scope and distinction honors certified by the Meena Shah Public School academic jury. Strictly showcasing verified rankers and medal recipients.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
            {metrics.map((item, idx) => {
              const Icon = item.icon;
              return (
                <SpotlightCard
                  key={idx}
                  className="p-6 bg-slate-900/95 border border-slate-800 rounded-2xl hover:border-amber-400/40 transition-all duration-300 text-white shadow-2xl flex flex-col justify-between group relative overflow-hidden before:absolute before:inset-x-0 before:top-0 before:h-[2px] before:bg-gradient-to-r before:from-transparent before:via-amber-400/40 before:to-transparent"
                  spotlightColor="rgba(245, 158, 11, 0.14)"
                >
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-11 h-11 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center text-amber-400 group-hover:border-amber-400/40 group-hover:text-amber-300 transition-colors shadow-inner">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-400/90 bg-amber-950/40 px-2.5 py-1 rounded-md border border-amber-500/20">
                        {item.code}
                      </span>
                    </div>

                    <div className="text-4xl sm:text-5xl font-mono font-black text-amber-400 tracking-tight tabular-nums">
                      <StatsCounter value={item.num} suffix={item.suffix} />
                    </div>
                    <div className="text-base font-bold text-white mt-2 leading-snug tracking-tight">
                      {item.label}
                    </div>
                    <div className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                      {item.subtext}
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-400">
                    <span className="text-slate-500 uppercase tracking-wider font-semibold">Scope</span>
                    <span className="text-slate-300 font-medium">{item.scope}</span>
                  </div>
                </SpotlightCard>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. Class-Wise 18 Competition Programmes Directory (Interactive Grid + Integrated Search) */}
      <section className="py-20 md:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-10 gap-6 pb-6 border-b border-slate-200">
          <div>
            <div className="inline-flex items-center space-x-2 text-xs font-mono font-bold text-slate-800 bg-slate-100 border border-slate-300 px-3.5 py-1 rounded-md uppercase tracking-wider mb-3">
              <Layers className="w-3.5 h-3.5 text-amber-600" />
              <span>Official Academic Directory</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-slate-950 tracking-tight leading-tight">
              Class-Wise 18 Competition Programmes
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-2 max-w-2xl leading-relaxed">
              Explore officially certified results, participant podiums, and merit standings across all 18 scholastic divisions from Play Group to College.
            </p>
          </div>

          <Link href="/results/" className="shrink-0">
            <AnimatedButton variant="primary" size="md">
              <Trophy className="w-4 h-4 text-amber-400" />
              <span>Open Podiums Hub</span>
              <ArrowRight className="w-4 h-4 text-slate-300" />
            </AnimatedButton>
          </Link>
        </div>

        {/* Division Filter Pills & Integrated Search Bar */}
        <div className="bg-slate-100/80 p-3 sm:p-4 rounded-3xl border border-slate-200 mb-8 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          {/* Wing Selector Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
            {HOME_WINGS.map((wing) => {
              const isActive = selectedHomeWing === wing.id;
              return (
                <button
                  key={wing.id}
                  onClick={() => setSelectedHomeWing(wing.id)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-slate-950 text-white shadow-sm font-black'
                      : 'text-slate-600 hover:text-slate-950 hover:bg-white/80'
                  }`}
                >
                  <span>{wing.label}</span>
                  <span
                    className={`text-[10px] font-mono px-1.5 py-0.2 rounded-md ${
                      isActive ? 'bg-amber-400 text-slate-950 font-black' : 'bg-slate-200 text-slate-600'
                    }`}
                  >
                    {wing.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Quick Filter Search */}
          <div className="relative w-full md:w-64 shrink-0">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
              <Search className="w-3.5 h-3.5" />
            </div>
            <input
              type="text"
              value={homeCategorySearch}
              onChange={(e) => setHomeCategorySearch(e.target.value)}
              placeholder="Search programme, class..."
              className="w-full pl-8 pr-3 py-2 bg-white text-xs text-slate-900 border border-slate-300 rounded-xl placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 font-mono"
            />
          </div>
        </div>

        {/* Architectural 18 Programmes Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {filteredHomeCategories.map((cat) => {
            const tier = getTierInfo(cat.classGroup);
            const winnerCount = prizeWinners.filter(
              (w) => w.categoryId === cat.id && w.status === 'Ranker'
            ).length;

            return (
              <Link
                key={cat.id}
                href={`/results/?category=${cat.id}`}
                className="group bg-white p-6 rounded-3xl border border-slate-200 hover:border-amber-400/80 shadow-xs hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300 flex flex-col justify-between relative overflow-hidden"
              >
                {/* Golden top hairline on hover */}
                <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-amber-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-xs font-black text-slate-950 bg-slate-100 group-hover:bg-amber-400 group-hover:text-slate-950 transition-colors px-2.5 py-1 rounded-md border border-slate-200">
                      {cat.code}
                    </span>
                    <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-md border ${tier.color}`}>
                      {cat.classGroup}
                    </span>
                  </div>

                  <h3 className="font-black text-slate-950 text-base sm:text-lg group-hover:text-amber-600 transition-colors leading-snug">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-slate-500 font-medium mt-1">
                    {cat.activityType}
                  </p>
                  <p className="text-xs text-slate-400 mt-2 line-clamp-2 leading-relaxed">
                    {cat.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-700">
                  <span className="font-mono text-[11px] text-slate-500 font-semibold">
                    {winnerCount} Certified Rankers
                  </span>
                  <span className="text-slate-900 group-hover:text-amber-600 flex items-center gap-1 transition-colors">
                    <span>View Podium</span>
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* 5. Championship Showcase (Grand Gold Medalists) */}
      <section className="py-20 md:py-28 bg-slate-950 text-white border-y border-slate-800/90 relative overflow-hidden">
        {/* Ambient golden lighting */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-500/10 via-slate-950 to-slate-950 pointer-events-none" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-400/40 to-transparent" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-14 gap-6 pb-6 border-b border-slate-800">
            <div>
              <div className="inline-flex items-center space-x-2 text-xs font-mono font-bold uppercase tracking-widest text-amber-400 bg-amber-400/10 px-3.5 py-1.5 rounded-lg border border-amber-400/25 mb-3">
                <Trophy className="w-3.5 h-3.5 text-amber-400" />
                <span>Champions Roll of Honor</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
                Grand Championship Showcase
              </h2>
              <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-2xl leading-relaxed">
                Celebrating certified Rank 1 Gold Medal champions across all premier competition arenas.
              </p>
            </div>

            <Link href="/results/" className="shrink-0">
              <AnimatedButton variant="gold" size="md">
                <span>View All 18 Podiums</span>
                <ArrowRight className="w-4 h-4 text-slate-950" />
              </AnimatedButton>
            </Link>
          </div>

          {/* Architectural Hall of Fame Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {champions.map((champion) => (
              <div
                key={champion.id}
                className="p-6 sm:p-7 rounded-3xl bg-slate-900/90 border border-slate-800 hover:border-amber-400/70 hover:shadow-2xl hover:shadow-amber-950/30 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden"
              >
                {/* Golden hairline top border on hover */}
                <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-amber-400/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div>
                  {/* Top Badge & Registration Row */}
                  <div className="flex items-center justify-between gap-3 mb-5">
                    <span className="inline-flex items-center gap-1.5 bg-amber-400 text-slate-950 font-mono font-black text-[10px] uppercase px-3 py-1 rounded-full shadow-xs">
                      <Trophy className="w-3 h-3 text-slate-950" />
                      <span>Rank 1 (Gold)</span>
                    </span>

                    <span className="font-mono text-xs font-black text-amber-300 bg-amber-950/60 px-3 py-1 rounded-md border border-amber-500/30">
                      {champion.regNo}
                    </span>
                  </div>

                  {/* Candidate Identity Block */}
                  <div className="flex items-start space-x-4 mb-4">
                    <div className="relative shrink-0">
                      <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-amber-400/80 bg-amber-950/50 shadow-md relative flex items-center justify-center">
                        {champion.photoUrl ? (
                          <Image
                            src={champion.photoUrl}
                            alt={champion.name}
                            width={64}
                            height={64}
                            className="object-cover w-full h-full"
                          />
                        ) : (
                          <span className="font-black text-amber-300 text-2xl font-mono">
                            {champion.name.charAt(0)}
                          </span>
                        )}
                      </div>
                      <div className="absolute -bottom-1.5 -right-1.5 bg-amber-400 text-slate-950 rounded-full p-1 shadow-sm border border-slate-950">
                        <Trophy className="w-3 h-3 text-slate-950" />
                      </div>
                    </div>

                    <div className="min-w-0">
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-300/80 block truncate">
                        {champion.categoryName}
                      </span>
                      <h3 className="text-lg sm:text-xl font-black text-white group-hover:text-amber-300 transition-colors truncate">
                        {champion.name}
                      </h3>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className="font-mono text-[11px] font-black text-slate-300 bg-slate-800 px-2.5 py-0.5 rounded border border-slate-700">
                          Reg: {champion.regNo}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Class Group */}
                  <p className="text-xs text-slate-300 font-medium">
                    Class Group: <span className="text-amber-300 font-semibold">{champion.className}</span>
                  </p>

                  {/* Official Award Plaque */}
                  <div className="mt-4 p-3.5 bg-slate-950/80 rounded-2xl border border-slate-800 text-xs">
                    <span className="font-mono font-bold text-slate-400 block text-[10px] uppercase tracking-wider mb-0.5">
                      Official Award Distinction:
                    </span>
                    <span className="text-amber-100 font-medium line-clamp-2 leading-relaxed">
                      {champion.prizeAwarded}
                    </span>
                  </div>
                </div>

                {/* Card Footer */}
                <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between">
                  <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Jury Certified</span>
                  </span>

                  <Link
                    href={`/results/?category=${champion.categoryId}`}
                    className="inline-flex items-center space-x-1.5 text-xs font-mono font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 px-3.5 py-1.5 rounded-xl shadow-sm transition-colors cursor-pointer"
                  >
                    <span>View Podium</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-slate-950" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Event Media Gallery Preview */}
      <section className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-10 gap-4 pb-6 border-b border-slate-200">
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 block mb-1">
              Event Documentation
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-950 tracking-tight">
              Photo Gallery Highlights
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-2 max-w-lg leading-relaxed">
              Moments of intellectual contest, robotics arenas, and stage felicitations captured at Meena Shah Public School.
            </p>
          </div>

          <Link href="/gallery/">
            <AnimatedButton variant="outline" size="sm">
              <Camera className="w-4 h-4 text-slate-700" />
              <span>View Full Photo Archive</span>
              <ArrowRight className="w-4 h-4 text-slate-700" />
            </AnimatedButton>
          </Link>
        </div>

        {/* 6-Photo Preview Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {previewGallery.map((img) => (
            <Link
              key={img.id}
              href="/gallery/"
              className="group block relative rounded-2xl overflow-hidden border border-slate-200 bg-slate-950 aspect-[3/2] shadow-xs hover:border-slate-400 transition-colors"
            >
              {/* Soft ambient blur backdrop for portrait images */}
              {img.orientation === 'portrait' && (
                <Image
                  src={img.thumbnailUrl || img.imageUrl}
                  alt=""
                  fill
                  aria-hidden="true"
                  className="object-cover blur-md opacity-35 scale-110 pointer-events-none"
                />
              )}

              <Image
                src={img.thumbnailUrl || img.imageUrl}
                alt={img.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                loading="lazy"
                className={`transition-transform duration-300 group-hover:scale-103 ${
                  img.orientation === 'portrait'
                    ? 'object-contain relative z-10 p-1'
                    : 'object-cover'
                }`}
              />
              <div className="absolute inset-0 z-20 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent p-5 flex flex-col justify-end">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-400 mb-1">
                  {img.category}
                </span>
                <h3 className="text-white font-bold text-sm leading-snug line-clamp-1">
                  {img.title}
                </h3>
                <p className="text-[11px] text-slate-300 line-clamp-1 mt-0.5">{img.caption}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 7. Comprehensive Results & Podiums Call-to-Action */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-slate-900 to-slate-950 text-white border-t border-slate-800 relative overflow-hidden">
        {/* Subtle architectural ambient light */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-500/10 via-transparent to-transparent pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="bg-slate-950/90 rounded-3xl p-8 sm:p-12 md:p-14 border border-slate-800 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-400/40 to-transparent" />

            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-10">
              <div className="max-w-2xl">
                <div className="inline-flex items-center space-x-2 text-xs font-mono font-bold uppercase tracking-widest text-amber-400 bg-amber-400/10 px-3.5 py-1.5 rounded-lg border border-amber-400/20 mb-4">
                  <Trophy className="w-3.5 h-3.5 text-amber-400" />
                  <span>Official Competition Directory &amp; Podiums</span>
                </div>

                <h3 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
                  Explore Certified Rankers Across All 18 Programmes
                </h3>

                <p className="mt-4 text-slate-400 text-sm sm:text-base leading-relaxed">
                  Browse Gold, Silver, and Bronze medalists along with distinction achievers and official registration numbers verified by the competition committee.
                </p>

                {/* 3 Value Pillars */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 pt-6 border-t border-slate-800/80">
                  <div className="flex items-center space-x-2.5 text-xs font-mono text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>18 Class Programmes</span>
                  </div>
                  <div className="flex items-center space-x-2.5 text-xs font-mono text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>Jury-Certified Rankers</span>
                  </div>
                  <div className="flex items-center space-x-2.5 text-xs font-mono text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                    <span>Official Roll Registry</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="shrink-0 flex flex-col sm:flex-row lg:flex-col gap-3.5 w-full lg:w-auto">
                <Link
                  href="/results/"
                  className="inline-flex items-center justify-center space-x-2.5 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-sm px-7 py-4 rounded-2xl shadow-xl shadow-amber-950/30 transition-all transform hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                >
                  <Trophy className="w-4 h-4 text-slate-950" />
                  <span>Explore All 18 Podiums</span>
                </Link>
                <Link
                  href="/gallery/"
                  className="inline-flex items-center justify-center space-x-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm px-7 py-4 rounded-2xl border border-slate-700 hover:border-slate-600 transition-all cursor-pointer"
                >
                  <Camera className="w-4 h-4 text-amber-400" />
                  <span>Event Photo Gallery</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}