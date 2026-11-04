'use client';

import React from 'react';
import Link from 'next/link';
import { Trophy, Award, School, ShieldCheck, ArrowRight } from 'lucide-react';
import StaticSearch from '@/components/StaticSearch';
import { SpotlightCard } from '@/components/ui/spotlight-card';
import { StatsCounter } from '@/components/ui/stats-counter';
import { AnimatedButton } from '@/components/ui/animated-button';

export default function Hero() {
  const metrics = [
    {
      num: 18,
      suffix: '',
      label: 'Competition Categories',
      subtext: 'From AI & Robotics to Fine Arts',
      icon: Trophy,
    },
    {
      num: 50,
      suffix: '+',
      label: 'Participating Schools',
      subtext: 'Premier educational institutions',
      icon: School,
    },
    {
      num: 100,
      suffix: '+',
      label: 'Medals & Honors Awarded',
      subtext: 'Gold, Silver, Bronze & Merit',
      icon: Award,
    },
    {
      num: 100,
      suffix: '%',
      label: 'Static Audited Records',
      subtext: 'Tamper-proof pre-rendered pages',
      icon: ShieldCheck,
    },
  ];

  return (
    <section className="relative pt-10 pb-16 md:pt-16 md:pb-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          {/* Official Tagline */}
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-md bg-slate-100 border border-slate-200 text-slate-700 text-xs font-semibold uppercase tracking-wider mb-6">
            <span>Meena Shah Public School</span>
            <span className="text-slate-400">•</span>
            <span>Annual Gala 2026</span>
          </div>

          {/* Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-950 leading-tight">
            MINDSPARK 2026 — OFFICIAL RANKERS & PRIZE WINNERS
          </h1>

          {/* Subtitle */}
          <p className="mt-5 text-base sm:text-xl text-slate-600 max-w-2xl mx-auto font-normal leading-relaxed">
            Honoring the Young Innovators and Champions of Meena Shah Public School
          </p>

          {/* Client-Side Quick Search Bar */}
          <div className="mt-8 max-w-2xl mx-auto">
            <StaticSearch />
            <div className="mt-2.5 text-xs text-slate-500 flex items-center justify-center space-x-2">
              <span>Quick verify:</span>
              <span className="font-mono bg-slate-100 px-2 py-0.5 rounded border border-slate-200 text-slate-800">
                260101
              </span>
              <span>or</span>
              <span className="font-mono bg-slate-100 px-2 py-0.5 rounded border border-slate-200 text-slate-800">
                Aarav Sharma
              </span>
            </div>
          </div>

          {/* Primary Action Buttons */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link href="/results/">
              <AnimatedButton variant="primary" size="lg">
                <Trophy className="w-4 h-4 text-amber-400" />
                <span>Explore All Category Podiums</span>
                <ArrowRight className="w-4 h-4 text-slate-400" />
              </AnimatedButton>
            </Link>

            <Link href="/verify/">
              <AnimatedButton variant="secondary" size="lg">
                <Award className="w-4 h-4 text-blue-700" />
                <span>Instant Certificate Verification</span>
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
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500 bg-slate-50 px-2 py-0.5 rounded border border-slate-200">
                    Verified
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
