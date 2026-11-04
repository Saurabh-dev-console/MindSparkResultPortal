import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Trophy, Medal, Award, ArrowRight, Sparkles, ShieldCheck, ChevronRight, CheckCircle2, Star } from 'lucide-react';
import Hero from '@/components/Hero';
import { prizeWinners } from '@/data/prizeWinners';
import { galleryImages } from '@/data/gallery';

export default function HomePage() {
  // Select top premier Gold Champions across premier categories
  const champions = prizeWinners.filter((w) => w.rank === 1).slice(0, 6);
  const previewGallery = galleryImages.slice(0, 6);

  return (
    <div>
      {/* 1. Hero & Metrics Section */}
      <Hero />

      {/* 2. Championship Showcase (Gold Medalists) */}
      <section className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 text-xs font-bold text-amber-600 bg-amber-50 border border-amber-200 px-3 py-1 rounded-full uppercase tracking-wider mb-2">
              <Trophy className="w-3.5 h-3.5 text-amber-500" />
              <span>Pinnacle of Excellence</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Grand Championship Showcase
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-2 max-w-xl">
              Celebrating the Rank 1 Gold Medal champions who attained the highest scores in premier academic and innovation categories.
            </p>
          </div>

          <Link
            href="/results/"
            className="inline-flex items-center space-x-2 text-sm font-bold text-blue-600 hover:text-blue-800 group"
          >
            <span>View All Category Podiums</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Champion Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {champions.map((champion) => (
            <div
              key={champion.id}
              className="bg-white rounded-3xl border-2 border-amber-300/80 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between group hover:-translate-y-1"
            >
              {/* Card Header & Avatar */}
              <div className="p-6">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="relative">
                    <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-amber-400 bg-amber-50 shadow-md relative">
                      {champion.photoUrl ? (
                        <Image
                          src={champion.photoUrl}
                          alt={champion.name}
                          width={64}
                          height={64}
                          className="object-cover w-full h-full"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center font-bold text-amber-700 text-xl">
                          {champion.name.charAt(0)}
                        </div>
                      )}
                    </div>
                    <div className="absolute -bottom-2 -right-2 bg-amber-500 text-slate-950 rounded-full p-1 shadow-sm border border-white">
                      <Trophy className="w-3.5 h-3.5" />
                    </div>
                  </div>

                  <span className="inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-amber-100 text-amber-900 border border-amber-300">
                    <Star className="w-3 h-3 text-amber-600 fill-amber-500" />
                    <span>Gold Champion</span>
                  </span>
                </div>

                <span className="text-xs font-bold uppercase tracking-wider text-blue-600 block mb-1">
                  {champion.categoryName}
                </span>

                <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                  {champion.name}
                </h3>

                <p className="text-xs text-slate-600 font-medium mt-1">
                  {champion.schoolName} ({champion.className})
                </p>

                <div className="mt-4 p-3 bg-amber-50/60 rounded-xl border border-amber-200/60 text-xs">
                  <span className="font-semibold text-slate-700 block text-[11px] uppercase tracking-wider mb-0.5">
                    Award & Honors:
                  </span>
                  <span className="text-amber-950 font-medium line-clamp-2">
                    {champion.prizeAwarded}
                  </span>
                </div>
              </div>

              {/* Card Footer */}
              <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                <div className="text-xs">
                  <span className="text-slate-400 block text-[10px] uppercase font-mono">Audited Score</span>
                  <span className="font-mono font-bold text-slate-800 text-sm">
                    {champion.score} / {champion.maxScore} pts
                  </span>
                </div>

                <Link
                  href={`/verify/${champion.regNo}/`}
                  className="inline-flex items-center space-x-1.5 text-xs font-bold text-slate-900 hover:text-blue-600 bg-white px-3.5 py-2 rounded-xl border border-slate-300 shadow-2xs hover:border-blue-400 transition-colors"
                >
                  <span>Certificate</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Event Integrity & Static Architecture Banner */}
      <section className="py-14 bg-slate-900 text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-start space-x-4">
              <div className="p-3 bg-blue-500/20 rounded-2xl border border-blue-400/30 text-blue-400 shrink-0">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-base font-bold text-white">100% Tamper-Proof SSG</h4>
                <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                  Compiled directly into static HTML without runtime server dependencies or database modifications.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="p-3 bg-amber-500/20 rounded-2xl border border-amber-400/30 text-amber-400 shrink-0">
                <Trophy className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-base font-bold text-white">Exclusively Award Winners</h4>
                <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                  Directory indexes only certified Rank 1, 2, 3 and Consolation distinction achievers across all 18 arenas.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="p-3 bg-emerald-500/20 rounded-2xl border border-emerald-400/30 text-emerald-400 shrink-0">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-base font-bold text-white">Pre-Rendered Credentials</h4>
                <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                  Every awardee certificate is static-param generated and printable in crisp A4 format.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Photo Gallery Highlights Preview */}
      <section className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 text-xs font-bold text-blue-600 bg-blue-50 border border-blue-200 px-3 py-1 rounded-full uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5 text-blue-500" />
              <span>Event Memories</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Photo Gallery Highlights
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-2 max-w-lg">
              Moments of triumph, intellectual battles, and stage celebrations captured at Meena Shah Public School.
            </p>
          </div>

          <Link
            href="/gallery/"
            className="inline-flex items-center space-x-2 bg-slate-900 hover:bg-slate-800 text-white px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold shadow-sm transition-all"
          >
            <span>View Complete Photo Gallery</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* 6-Photo Preview Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {previewGallery.map((img) => (
            <Link
              key={img.id}
              href="/gallery/"
              className="group block relative rounded-2xl overflow-hidden border border-slate-200 bg-slate-900 aspect-[4/3] shadow-sm hover:shadow-xl transition-all duration-300"
            >
              <Image
                src={img.imageUrl}
                alt={img.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent p-5 flex flex-col justify-end">
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 mb-1">
                  {img.category}
                </span>
                <h3 className="text-white font-bold text-sm leading-snug line-clamp-1 group-hover:text-blue-300 transition-colors">
                  {img.title}
                </h3>
                <p className="text-[11px] text-slate-300 line-clamp-1 mt-0.5">{img.caption}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 5. Bottom Verification Callout */}
      <section className="pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 text-white rounded-3xl p-8 sm:p-12 shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-2xl text-center md:text-left">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest bg-white/20 text-white border border-white/30 mb-3">
              Official Candidate Verification
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Looking for your Official Mindspark Certificate?
            </h3>
            <p className="mt-2 text-blue-100 text-sm sm:text-base leading-relaxed">
              Every prize winner and ranker has an immutable static certificate with verification stamp ready for download and print.
            </p>
          </div>

          <div className="shrink-0 flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <Link
              href="/verify/"
              className="inline-flex items-center justify-center space-x-2 bg-white text-slate-900 hover:bg-slate-100 px-6 py-3.5 rounded-xl font-bold text-sm shadow-md transition-all"
            >
              <Award className="w-4 h-4 text-blue-600" />
              <span>Verify by Roll Number</span>
            </Link>
            <Link
              href="/results/"
              className="inline-flex items-center justify-center space-x-2 bg-blue-800/80 hover:bg-blue-800 text-white px-6 py-3.5 rounded-xl font-semibold text-sm border border-blue-400/30 transition-all"
            >
              <Trophy className="w-4 h-4 text-amber-300" />
              <span>All 18 Categories</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
