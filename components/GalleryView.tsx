'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import {
  X,
  ChevronLeft,
  ChevronRight,
  Filter,
  Maximize2,
  Camera,
  Layers,
  Trophy,
  Mic,
  Atom,
  Smile,
} from 'lucide-react';
import { GalleryImage } from '@/types';

interface GalleryViewProps {
  images: GalleryImage[];
}

type CategoryFilter = 'all' | 'awards' | 'stage' | 'science' | 'candid';

interface FilterOption {
  label: string;
  value: CategoryFilter;
  icon: React.ComponentType<{ className?: string }>;
}

export default function GalleryView({ images }: GalleryViewProps) {
  const [activeFilter, setActiveFilter] = useState<CategoryFilter>('all');
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  const filters: FilterOption[] = [
    { label: 'All Curations', value: 'all', icon: Layers },
    { label: 'Award Ceremonies', value: 'awards', icon: Trophy },
    { label: 'Stage & Keynotes', value: 'stage', icon: Mic },
    { label: 'Science & STEM Demos', value: 'science', icon: Atom },
    { label: 'Candid & Arts', value: 'candid', icon: Smile },
  ];

  const filteredImages = images.filter((img) => {
    if (activeFilter === 'all') return true;
    return img.category === activeFilter;
  });

  const handleOpenLightbox = (index: number) => {
    setSelectedImageIndex(index);
  };

  const handleCloseLightbox = () => {
    setSelectedImageIndex(null);
  };

  const handlePrev = useCallback(() => {
    if (selectedImageIndex === null) return;
    setSelectedImageIndex((prev) => (prev! > 0 ? prev! - 1 : filteredImages.length - 1));
  }, [selectedImageIndex, filteredImages.length]);

  const handleNext = useCallback(() => {
    if (selectedImageIndex === null) return;
    setSelectedImageIndex((prev) => (prev! < filteredImages.length - 1 ? prev! + 1 : 0));
  }, [selectedImageIndex, filteredImages.length]);

  // Prevent background scroll when lightbox is open
  useEffect(() => {
    if (selectedImageIndex !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedImageIndex]);

  // Keyboard navigation
  useEffect(() => {
    if (selectedImageIndex === null) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleCloseLightbox();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [selectedImageIndex, handlePrev, handleNext]);

  return (
    <div>
      {/* 1. Exhibition Curation Segmented Control Dock */}
      <div className="bg-slate-900/90 rounded-2xl p-2 border border-slate-800 shadow-xl max-w-4xl mx-auto flex flex-wrap items-center justify-center gap-2 mb-12">
        <div className="flex items-center space-x-1.5 text-xs font-mono font-bold text-slate-400 uppercase tracking-wider px-3 hidden sm:flex">
          <Filter className="w-3.5 h-3.5 text-amber-400" />
          <span>Curations:</span>
        </div>

        {filters.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeFilter === tab.value;
          const count =
            tab.value === 'all'
              ? images.length
              : images.filter((img) => img.category === tab.value).length;

          return (
            <button
              key={tab.value}
              onClick={() => {
                setActiveFilter(tab.value);
                setSelectedImageIndex(null);
              }}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer flex items-center gap-2 ${
                isActive
                  ? 'bg-amber-400 text-slate-950 font-black shadow-md shadow-amber-950/20 scale-[1.02]'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-slate-950' : 'text-amber-400'}`} />
              <span>{tab.label}</span>
              <span
                className={`text-[10px] font-mono px-1.5 py-0.2 rounded-md ${
                  isActive ? 'bg-amber-950/20 text-slate-950 font-black' : 'bg-slate-950 text-slate-400'
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* 2. Responsive Photographic Exhibition Plates Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {filteredImages.map((image, index) => (
          <div
            key={image.id}
            onClick={() => handleOpenLightbox(index)}
            className="group cursor-pointer bg-slate-900/90 rounded-3xl border border-slate-800/90 hover:border-amber-400/50 hover:shadow-2xl hover:shadow-amber-950/20 transition-all duration-300 overflow-hidden flex flex-col justify-between relative"
          >
            {/* Top golden hairline accent on hover */}
            <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-amber-400/0 group-hover:via-amber-400/80 to-transparent transition-all duration-300 z-30 pointer-events-none" />

            {/* Image Stage Container with 3:2 Aspect Ratio */}
            <div className="relative aspect-[3/2] w-full overflow-hidden bg-slate-950 flex items-center justify-center">
              {/* Subtle ambient blur backdrop for portrait photos */}
              {image.orientation === 'portrait' && (
                <Image
                  src={image.thumbnailUrl || image.imageUrl}
                  alt=""
                  fill
                  aria-hidden="true"
                  className="object-cover blur-md opacity-30 scale-110 pointer-events-none"
                />
              )}

              {/* Main Image */}
              <Image
                src={image.thumbnailUrl || image.imageUrl}
                alt={image.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                loading="lazy"
                className={`transition-transform duration-500 ease-out group-hover:scale-105 ${
                  image.orientation === 'portrait'
                    ? 'object-contain relative z-10 p-2'
                    : 'object-cover'
                }`}
              />

              {/* Permanent Badges on Top */}
              <div className="absolute top-3 left-3 z-20 flex items-center gap-1.5">
                <span className="text-[10px] font-mono font-black uppercase tracking-wider bg-slate-950/85 backdrop-blur-md text-amber-300 border border-amber-500/30 px-2.5 py-1 rounded-md shadow-md">
                  {image.category}
                </span>
                {image.orientation === 'portrait' && (
                  <span className="text-[9px] font-mono font-bold text-slate-300 uppercase tracking-wider bg-slate-900/85 backdrop-blur-md px-2 py-1 rounded-md border border-slate-700">
                    Portrait
                  </span>
                )}
              </div>

              {/* Hover Overlay with 4K Lightbox Prompt */}
              <div className="absolute inset-0 z-20 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-end justify-between p-4">
                <span className="text-white text-xs font-mono font-bold flex items-center space-x-1.5 bg-slate-950/80 px-3 py-1.5 rounded-lg border border-slate-700 backdrop-blur-sm">
                  <Maximize2 className="w-3.5 h-3.5 text-amber-400" />
                  <span>Click to expand in 4K</span>
                </span>
                <span className="text-[10px] font-mono font-bold text-slate-300 bg-slate-900/90 px-2 py-1 rounded border border-slate-700">
                  Photo #{index + 1}
                </span>
              </div>
            </div>

            {/* Editorial Caption Plate */}
            <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-widest text-slate-500 mb-1.5">
                  <span>Ramnagar Campus Archive</span>
                  <span className="text-amber-400 font-semibold">Verified Plate</span>
                </div>
                <h3 className="font-black text-base sm:text-lg text-white group-hover:text-amber-300 transition-colors leading-snug">
                  {image.title}
                </h3>
                <p className="text-xs text-slate-400 mt-2 line-clamp-2 leading-relaxed">
                  {image.caption}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-400">
                <span className="text-slate-400">Meena Shah Public School</span>
                <span className="text-amber-400 group-hover:underline">Inspect &rarr;</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 3. Museum-Grade Full-Screen Lightbox Theater (100% Solid Opaque Black to prevent any background bleed) */}
      {selectedImageIndex !== null && (
        <div
          className="fixed inset-0 z-[100] bg-black flex flex-col justify-between p-4 sm:p-6 md:p-8 animate-in fade-in-50 duration-200 select-none overflow-hidden"
          onClick={handleCloseLightbox}
        >
          {/* Top Control Bar (Clean, solid high-contrast header) */}
          <div
            className="w-full max-w-6xl mx-auto flex items-center justify-between p-3.5 sm:p-4 bg-slate-900/95 border border-slate-800 rounded-2xl shadow-2xl z-20 shrink-0"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center space-x-3">
              <span className="text-xs font-mono font-black uppercase tracking-widest text-amber-400 bg-amber-400/15 px-3 py-1 rounded-lg border border-amber-400/30">
                {filteredImages[selectedImageIndex].category}
              </span>
              <span className="text-xs font-mono text-slate-300">
                Plate <strong className="text-white font-bold">{selectedImageIndex + 1}</strong> of <strong className="text-white font-bold">{filteredImages.length}</strong>
              </span>
            </div>

            <button
              onClick={handleCloseLightbox}
              className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-xl bg-slate-800 hover:bg-amber-400 hover:text-slate-950 text-white font-mono font-bold text-xs border border-slate-700 transition-colors cursor-pointer shadow-md"
              aria-label="Close modal"
              title="Close (Esc)"
            >
              <span>Close</span>
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Center Stage: Photo with Chevrons (Natural Aspect Ratio without Artificial Giant Boxes) */}
          <div
            className="relative flex-1 w-full max-w-6xl mx-auto flex items-center justify-center my-2 sm:my-3 min-h-0"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Left Chevron */}
            <button
              onClick={handlePrev}
              className="absolute left-2 sm:left-4 lg:-left-6 top-1/2 -translate-y-1/2 p-3 sm:p-3.5 rounded-full bg-slate-900 hover:bg-amber-400 hover:text-slate-950 text-white border border-slate-800 transition-all cursor-pointer z-30 shadow-2xl"
              aria-label="Previous image"
              title="Previous (Left Arrow)"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Right Chevron */}
            <button
              onClick={handleNext}
              className="absolute right-2 sm:right-4 lg:-right-6 top-1/2 -translate-y-1/2 p-3 sm:p-3.5 rounded-full bg-slate-900 hover:bg-amber-400 hover:text-slate-950 text-white border border-slate-800 transition-all cursor-pointer z-30 shadow-2xl"
              aria-label="Next image"
              title="Next (Right Arrow)"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Framed Natural Image Stage */}
            <div className="relative w-full h-[58vh] sm:h-[66vh] flex items-center justify-center">
              <Image
                src={filteredImages[selectedImageIndex].imageUrl}
                alt={filteredImages[selectedImageIndex].title}
                fill
                sizes="(max-width: 1280px) 100vw, 1200px"
                className="object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.9)] rounded-xl"
                priority
              />
            </div>
          </div>

          {/* Bottom Bar: Narrative & Caption Plaque */}
          <div
            className="w-full max-w-3xl mx-auto text-center shrink-0 p-4 sm:p-5 bg-slate-900/95 border border-slate-800 rounded-2xl shadow-2xl z-20"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-base sm:text-xl font-black text-white tracking-tight">
              {filteredImages[selectedImageIndex].title}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl mx-auto leading-relaxed line-clamp-2">
              {filteredImages[selectedImageIndex].caption}
            </p>
            <div className="mt-2 text-[10px] font-mono text-slate-400 flex items-center justify-center gap-3">
              <span>&larr; Previous</span>
              <span>•</span>
              <span>Next &rarr;</span>
              <span>•</span>
              <span className="text-amber-400 font-semibold">Press Esc to Close</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
