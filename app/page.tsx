'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Trophy, Award, ArrowRight, ArrowUpRight, ShieldCheck, CheckCircle2, Star } from 'lucide-react';
import Hero from '@/components/Hero';
import { prizeWinners } from '@/data/prizeWinners';
import { galleryImages } from '@/data/gallery';
import { SpotlightCard } from '@/components/ui/spotlight-card';
import { AnimatedButton } from '@/components/ui/animated-button';
import { RankBadge } from '@/components/ui/badge';

export default function HomePage() {
  const champions = prizeWinners.filter((w) => w.rank === 1).slice(0, 6);
  const previewGallery = galleryImages.slice(0, 6);

  return (
    <div>
      {/* 1. Hero & Metrics Section */}
      <Hero />

      {/* 2. Championship Showcase (Grand Gold Medalists) */}
      <section className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4 pb-6 border-b border-slate-200">
          <div>
            <div className="inline-flex items-center space-x-2 text-xs font-bold text-amber-900 bg-amber-100/70 border border-amber-300 px-3 py-1 rounded-md uppercase tracking-wider mb-2">
              <Trophy className="w-3.5 h-3.5 text-amber-600" />
              <span>Champions Roll of Honor</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-950 tracking-tight">
              Grand Championship Showcase
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-2 max-w-xl leading-relaxed">
              Celebrating the certified Rank 1 Gold Medal champions who achieved the highest scores across premier competition arenas.
            </p>
          </div>

          <Link href="/results/">
            <AnimatedButton variant="outline" size="sm">
              <span>View All 18 Podiums</span>
              <ArrowRight className="w-4 h-4 text-slate-700" />
            </AnimatedButton>
          </Link>
        </div>

        {/* Bento Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {champions.map((champion) => (
            <SpotlightCard
              key={champion.id}
              className="p-6 flex flex-col justify-between group hover:border-slate-400 transition-colors"
            >
              <div>
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="relative">
                    <div className="w-16 h-16 rounded-xl overflow-hidden border-2 border-slate-300 bg-slate-100 relative">
                      {champion.photoUrl ? (
                        <Image
                          src={champion.photoUrl}
                          alt={champion.name}
                          width={64}
                          height={64}
                          className="object-cover w-full h-full"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center font-bold text-slate-700 text-xl font-mono">
                          {champion.name.charAt(0)}
                        </div>
                      )}
                    </div>
                    <div className="absolute -bottom-2 -right-2 bg-amber-500 text-slate-950 rounded-full p-1 border border-white shadow-xs">
                      <Trophy className="w-3.5 h-3.5" />
                    </div>
                  </div>

                  <RankBadge rank={1} />
                </div>

                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-500 block mb-1">
                  {champion.categoryName}
                </span>

                <h3 className="text-xl font-black text-slate-950 group-hover:text-blue-900 transition-colors">
                  {champion.name}
                </h3>

                <p className="text-xs text-slate-600 font-medium mt-1">
                  {champion.schoolName} ({champion.className})
                </p>

                <div className="mt-4 p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs">
                  <span className="font-bold text-slate-700 block text-[10px] uppercase tracking-wider mb-0.5">
                    Official Award:
                  </span>
                  <span className="text-slate-900 font-medium line-clamp-2 leading-relaxed">
                    {champion.prizeAwarded}
                  </span>
                </div>
              </div>

              {/* Card Footer */}
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-mono">Final Score</span>
                  <span className="font-mono font-black text-slate-950 text-sm">
                    {champion.score} / {champion.maxScore}
                  </span>
                </div>

                <Link
                  href={`/verify/${champion.regNo}/`}
                  className="inline-flex items-center space-x-1 text-xs font-bold text-slate-900 hover:text-blue-700 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-lg border border-slate-200 transition-colors"
                >
                  <span>Certificate</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </SpotlightCard>
          ))}
        </div>
      </section>

      {/* 3. Institutional Integrity & Static Verification Architecture */}
      <section className="py-14 bg-slate-900 text-white border-y border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-start space-x-4">
              <div className="p-3 bg-slate-800 rounded-xl border border-slate-700 text-slate-200 shrink-0">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-base font-bold text-white">100% Tamper-Proof SSG</h4>
                <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                  Compiled directly into static HTML without runtime server dependencies or dynamic database lookups.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="p-3 bg-slate-800 rounded-xl border border-slate-700 text-slate-200 shrink-0">
                <Trophy className="w-6 h-6 text-amber-400" />
              </div>
              <div>
                <h4 className="text-base font-bold text-white">Exclusively Award Winners</h4>
                <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                  The public directory indexes only certified Rank 1, 2, 3 and Consolation distinction achievers across all 18 arenas.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="p-3 bg-slate-800 rounded-xl border border-slate-700 text-slate-200 shrink-0">
                <CheckCircle2 className="w-6 h-6 text-emerald-400" />
              </div>
              <div>
                <h4 className="text-base font-bold text-white">Pre-Rendered Credentials</h4>
                <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                  Every awardee certificate is static-param generated and printable in crisp standard A4 landscape format.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Event Media Gallery Preview */}
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
              className="group block relative rounded-2xl overflow-hidden border border-slate-200 bg-slate-900 aspect-[4/3] shadow-xs hover:border-slate-400 transition-colors"
            >
              <Image
                src={img.imageUrl}
                alt={img.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover group-hover:scale-103 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/25 to-transparent p-5 flex flex-col justify-end">
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

      {/* 5. Institutional CTA Banner */}
      <section className="pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-950 text-white rounded-3xl p-8 sm:p-12 border border-slate-800 shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-2xl text-center md:text-left">
            <span className="inline-block px-3 py-1 rounded-md text-xs font-mono font-bold uppercase tracking-widest bg-slate-800 text-slate-300 border border-slate-700 mb-3">
              Institutional Credential Access
            </span>
            <h3 className="text-2xl sm:text-3xl font-black tracking-tight">
              Looking for your Official Mindspark Certificate?
            </h3>
            <p className="mt-2 text-slate-400 text-sm sm:text-base leading-relaxed">
              Every prize winner and ranker has an immutable static certificate with verification seal ready for immediate A4 printing.
            </p>
          </div>

          <div className="shrink-0 flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <Link href="/verify/">
              <AnimatedButton variant="gold" size="lg" className="w-full sm:w-auto">
                <Award className="w-4 h-4 text-slate-950" />
                <span>Verify by Roll Number</span>
              </AnimatedButton>
            </Link>
            <Link href="/results/">
              <AnimatedButton variant="secondary" size="lg" className="w-full sm:w-auto">
                <Trophy className="w-4 h-4 text-slate-900" />
                <span>All 18 Categories</span>
              </AnimatedButton>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
