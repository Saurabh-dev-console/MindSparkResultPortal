import React from 'react';
import { Camera, Sparkles, Trophy, Layers, Award } from 'lucide-react';
import GalleryView from '@/components/GalleryView';
import { galleryImages } from '@/data/gallery';

export const metadata = {
  title: 'Official Photo Gallery | MINDSPARK 2026',
  description: 'Documentary visual archive capturing the stage inaugurations, competitive science arenas, runner-up felicitations, and gold trophy honors from Mindspark 2026.',
};

export default function GalleryPage() {
  return (
    <div className="py-12 md:py-20 bg-slate-950 text-white min-h-screen relative overflow-hidden">
      {/* Architectural ambient lighting */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-500/10 via-slate-950 to-slate-950 pointer-events-none" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-400/30 to-transparent pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header (No center logo, authoritative typography) */}
        <div className="text-center max-w-4xl mx-auto mb-16 flex flex-col items-center">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full text-xs font-mono font-bold uppercase tracking-widest bg-amber-400/10 text-amber-400 border border-amber-400/25 mb-5 shadow-sm">
            <Camera className="w-3.5 h-3.5 text-amber-400" />
            <span>MINDSPARK 2026 • Official Documentary Visual Archive</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
            Moments of Innovation, Distinction &amp; Celebration
          </h1>

          <p className="mt-4 text-slate-400 text-sm sm:text-base md:text-lg max-w-2xl leading-relaxed">
            High-resolution visual chronicle capturing the judicial inauguration, competitive science arenas, creative workshops, and grand champion podium felicitations at Meena Shah Public School.
          </p>

          {/* Exhibition Census Bar */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 mt-6 text-xs font-mono text-slate-400">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              <span><strong>{galleryImages.length}</strong> Certified Event Photos</span>
            </div>
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300">
              <span className="w-2 h-2 rounded-full bg-blue-400" />
              <span><strong>4</strong> Curated Exhibition Streams</span>
            </div>
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>Ramnagar Campus Ceremonies</span>
            </div>
          </div>
        </div>

        {/* Client-Side Filterable Gallery View with Museum-Grade Lightbox */}
        <GalleryView images={galleryImages} />
      </div>
    </div>
  );
}
