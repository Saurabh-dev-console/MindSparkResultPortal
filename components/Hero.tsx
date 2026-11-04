import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Trophy, Award, School, Users, Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';
import StaticSearch from '@/components/StaticSearch';

export default function Hero() {
  const metrics = [
    {
      label: 'Competition Categories',
      value: '18',
      subtext: 'From AI & Robotics to Fine Arts',
      icon: Trophy,
      accent: 'from-amber-500 to-amber-600',
      badgeBg: 'bg-amber-50 text-amber-700 border-amber-200',
    },
    {
      label: 'Participating Schools',
      value: '50+',
      subtext: 'Leading institutions nationwide',
      icon: School,
      accent: 'from-blue-500 to-indigo-600',
      badgeBg: 'bg-blue-50 text-blue-700 border-blue-200',
    },
    {
      label: 'Medals & Trophies Awarded',
      value: '100+',
      subtext: 'Gold, Silver, Bronze & Merit',
      icon: Award,
      accent: 'from-emerald-500 to-teal-600',
      badgeBg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    },
    {
      label: 'Audited Static Records',
      value: '100%',
      subtext: 'Cryptographically pre-rendered',
      icon: CheckCircle2,
      accent: 'from-purple-500 to-indigo-600',
      badgeBg: 'bg-purple-50 text-purple-700 border-purple-200',
    },
  ];

  return (
    <section className="relative overflow-hidden pt-8 pb-16 md:pt-12 md:pb-24 bg-gradient-to-b from-blue-50/50 via-white to-slate-50 border-b border-slate-200">
      {/* Background ambient decorative shapes */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 pointer-events-none overflow-hidden opacity-40">
        <div className="absolute -top-24 left-1/4 w-96 h-96 bg-blue-300 rounded-full blur-3xl mix-blend-multiply filter"></div>
        <div className="absolute -top-20 right-1/4 w-96 h-96 bg-amber-200 rounded-full blur-3xl mix-blend-multiply filter"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Tag */}
        <div className="flex flex-col items-center text-center">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-blue-100/80 border border-blue-200 text-blue-900 text-xs sm:text-sm font-semibold mb-6 shadow-xs">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>Official Mindspark 2026 Rankers & Distinction Registry</span>
          </div>

          {/* Main Title */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 max-w-4xl leading-tight sm:leading-none">
            MINDSPARK 2026 — OFFICIAL RANKERS & PRIZE WINNERS
          </h1>

          {/* Subtitle */}
          <p className="mt-5 text-base sm:text-xl text-slate-600 max-w-2xl font-normal leading-relaxed">
            Honoring the Young Innovators and Champions of Meena Shah Public School
          </p>

          {/* Client-Side Quick Search Bar */}
          <div className="mt-8 w-full max-w-2xl">
            <StaticSearch />
            <div className="mt-2 text-xs text-slate-500 flex items-center justify-center space-x-2">
              <span>Quick search:</span>
              <span className="font-mono bg-white px-2 py-0.5 rounded border border-slate-200 text-slate-700">
                260101
              </span>
              <span>or</span>
              <span className="font-mono bg-white px-2 py-0.5 rounded border border-slate-200 text-slate-700">
                Aarav Sharma
              </span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3.5">
            <Link
              href="/results/"
              className="inline-flex items-center space-x-2 bg-slate-900 hover:bg-slate-800 text-white px-6 py-3 rounded-xl font-semibold text-sm shadow-md hover:shadow-lg transition-all"
            >
              <Trophy className="w-4 h-4 text-amber-400" />
              <span>Explore All Category Podiums</span>
              <ArrowRight className="w-4 h-4 text-slate-400" />
            </Link>

            <Link
              href="/verify/"
              className="inline-flex items-center space-x-2 bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 px-6 py-3 rounded-xl font-semibold text-sm shadow-xs hover:border-slate-400 transition-all"
            >
              <Award className="w-4 h-4 text-blue-600" />
              <span>Instant Certificate Verification</span>
            </Link>
          </div>
        </div>

        {/* Static Metrics Grid */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {metrics.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-white/90 backdrop-blur-xs rounded-2xl p-6 border border-slate-200/90 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden"
              >
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br ${item.accent} text-white shadow-sm`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${item.badgeBg}`}>
                    Verified
                  </span>
                </div>
                <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                  {item.value}
                </div>
                <div className="text-sm font-semibold text-slate-800 mt-1">{item.label}</div>
                <div className="text-xs text-slate-500 mt-0.5">{item.subtext}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

