'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { Image as ImageIcon, X, ChevronLeft, ChevronRight, Sparkles, Filter, Maximize2 } from 'lucide-react';
import { GalleryImage } from '@/types';

interface GalleryViewProps {
  images: GalleryImage[];
}

type CategoryFilter = 'all' | 'awards' | 'stage' | 'science' | 'candid';

export default function GalleryView({ images }: GalleryViewProps) {
  const [activeFilter, setActiveFilter] = useState<CategoryFilter>('all');
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  const filters: { label: string; value: CategoryFilter }[] = [
    { label: 'All Photos', value: 'all' },
    { label: 'Award Ceremonies', value: 'awards' },
    { label: 'Stage & Keynotes', value: 'stage' },
    { label: 'Science & Tech Demos', value: 'science' },
    { label: 'Candid Moments', value: 'candid' },
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
      {/* Category Filter Pills */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
        <div className="flex items-center space-x-1.5 text-xs font-bold text-slate-500 uppercase tracking-wider mr-2">
          <Filter className="w-3.5 h-3.5" />
          <span>Filter:</span>
        </div>
        {filters.map((tab) => (
          <button
            key={tab.value}
            onClick={() => {
              setActiveFilter(tab.value);
              setSelectedImageIndex(null);
            }}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
              activeFilter === tab.value
                ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Responsive Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {filteredImages.map((image, index) => (
          <div
            key={image.id}
            onClick={() => handleOpenLightbox(index)}
            className="group relative bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col"
          >
            {/* Image Container */}
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-900">
              <Image
                src={image.imageUrl}
                alt={image.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-4">
                <span className="text-white text-xs font-semibold flex items-center space-x-1">
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span>Click to expand</span>
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-white/20 text-white px-2 py-0.5 rounded backdrop-blur-xs">
                  {image.category}
                </span>
              </div>
            </div>

            {/* Caption & Info */}
            <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-blue-600 mb-1 block">
                  {image.category}
                </span>
                <h3 className="font-bold text-slate-900 text-base leading-snug group-hover:text-blue-600 transition-colors">
                  {image.title}
                </h3>
              </div>
              <p className="text-xs text-slate-500 mt-2 line-clamp-2 leading-relaxed">
                {image.caption}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedImageIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
          onClick={handleCloseLightbox}
        >
          {/* Close button */}
          <button
            onClick={handleCloseLightbox}
            className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer z-50"
            aria-label="Close modal"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Left Arrow */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handlePrev();
            }}
            className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/25 text-white transition-colors cursor-pointer z-50"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Right Arrow */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
            }}
            className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/25 text-white transition-colors cursor-pointer z-50"
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Image Canvas */}
          <div
            className="relative max-w-5xl w-full max-h-[85vh] flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full h-[60vh] sm:h-[70vh]">
              <Image
                src={filteredImages[selectedImageIndex].imageUrl}
                alt={filteredImages[selectedImageIndex].title}
                fill
                className="object-contain"
                priority
              />
            </div>

            {/* Captions below image */}
            <div className="mt-4 text-center max-w-2xl px-4">
              <span className="text-[11px] font-bold uppercase tracking-widest text-amber-400">
                {filteredImages[selectedImageIndex].category} • {selectedImageIndex + 1} of {filteredImages.length}
              </span>
              <h3 className="text-lg sm:text-xl font-bold text-white mt-1">
                {filteredImages[selectedImageIndex].title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">
                {filteredImages[selectedImageIndex].caption}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
