'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Trophy, Award, School, ShieldCheck, ArrowRight, Sparkles } from 'lucide-react';
import StaticSearch from '@/components/StaticSearch';
import { SpotlightCard } from '@/components/ui/spotlight-card';
import { StatsCounter } from '@/components/ui/stats-counter';
import { AnimatedButton } from '@/components/ui/animated-button';

export default function Hero() {
  const metrics = [
    {
      num: 18,
      suffix: '',
      label: 'Class-Wise Programmes',
      subtext: 'From Play Group to College Group',
      icon: Trophy,
    },
    {
      num: 50,
      suffix: '+',
      label: 'Participating Schools',
      subtext: 'Premier CBSE & State Institutions',
      icon: School,
    },
    {
      num: 100,
      suffix: '+',
      label: 'Medals & Distinction Honors',
      subtext: 'Gold, Silver, Bronze & Merit',
      icon: Award,
    },
    {
      num: 100,
      suffix: '%',
      label: 'Digital Verified Records',
      subtext: 'Tamper-proof pre-rendered certificates',
      icon: ShieldCheck,
    },
  ];

  return (
    <section className="relative pt-8 pb-16 md:pt-14 md:pb-24 bg-gradient-to-b from-slate-50 via-white to-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
          {/* Prominent Official Medallion Showcase */}
          <div className="relative mb-6 group">
            <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-full overflow-hidden border-4 border-red-600/40 shadow-xl bg-white p-0.5 group-hover:scale-105 transition-transform duration-300">
              <Image
                src="/images/meena-shah-mindspark-emblem.png"
                alt="Meena Shah Public School - MINDSPARK 2026 Official Crest"
                width={144}
                height={144}
                className="object-cover w-full h-full rounded-full"
                priority
              />
            </div>
            <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 bg-slate-900 text-white font-mono text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full border border-slate-700 shadow-sm whitespace-nowrap">
              ESTD. MEENA SHAH
            </div>
          </div>

          {/* Official Tagline Badge */}
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-300 text-slate-800 text-xs font-bold uppercase tracking-wider mb-4">
            <span className="w-2 h-2 rounded-full bg-red-600"></span>
            <span>MEENA SHAH PUBLIC SCHOOL • RAMNAGAR CAMPUS</span>
          </div>

          {/* Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-950 leading-tight">
            MINDSPARK 2026 — OFFICIAL RANKERS & PRIZE WINNERS
          </h1>

          {/* Subtitle */}
          <p className="mt-4 text-base sm:text-xl text-slate-600 max-w-2xl font-normal leading-relaxed">
            Honoring the young innovators, researchers, and distinction achievers across all 18 Class-Wise Competition Programmes.
          </p>

          {/* Client-Side Quick Search Bar */}
          <div className="mt-8 w-full max-w-2xl">
            <StaticSearch />
            <div className="mt-2.5 text-xs text-slate-500 flex items-center justify-center space-x-2">
              <span>Quick verify:</span>
              <span className="font-mono bg-white px-2 py-0.5 rounded border border-slate-200 text-slate-800 font-bold">
                260101
              </span>
              <span>or</span>
              <span className="font-mono bg-white px-2 py-0.5 rounded border border-slate-200 text-slate-800 font-bold">
                Aarav Sharma
              </span>
            </div>
          </div>

          {/* Primary Action Buttons */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link href="/results/">
              <AnimatedButton variant="primary" size="lg">
                <Trophy className="w-4 h-4 text-amber-400" />
                <span>Explore All 18 Category Podiums</span>
                <ArrowRight className="w-4 h-4 text-slate-400" />
              </AnimatedButton>
            </Link>

            <Link href="/verify/">
              <AnimatedButton variant="secondary" size="lg">
                <Award className="w-4 h-4 text-red-600" />
                <span>Verify & Download Certificate</span>
              </AnimatedButton>
            </Link>
          </div>
        </div>

        {/* 4 Spotlight Metric Cards (Vengeance UI pattern) */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {metrics.map((item, idx) => {
            const Icon = item.icon;
            return (
              <SpotlightCard
                key={idx}
                className="p-6 border-slate-200 hover:border-slate-300 transition-colors"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-900">
                    <Icon className="w-5 h-5 text-slate-800" />
                  </div>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-600 bg-slate-50 px-2.5 py-0.5 rounded border border-slate-200">
                    Official
                  </span>
                </div>
                <div className="text-3xl sm:text-4xl">
                  <StatsCounter value={item.num} suffix={item.suffix} />
                </div>
                <div className="text-sm font-bold text-slate-900 mt-1">{item.label}</div>
                <div className="text-xs text-slate-500 mt-0.5 leading-relaxed">{item.subtext}</div>
              </SpotlightCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
