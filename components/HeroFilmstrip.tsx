'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { galleryImages } from '@/data/gallery';

export default function HeroFilmstrip() {
  // Duplicate array so it loops seamlessly
  const doubledImages = [...galleryImages, ...galleryImages];

  return (
    <div className="w-full overflow-hidden py-4 sm:py-6 relative mask-linear">
      {/* Subtle fade edges on left & right for cinematic transition */}
      <div className="absolute left-0 inset-y-0 w-12 sm:w-28 bg-gradient-to-r from-slate-950 to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 inset-y-0 w-12 sm:w-28 bg-gradient-to-l from-slate-950 to-transparent z-10 pointer-events-none" />

      {/* Infinite Scrolling Track */}
      <div className="animate-marquee flex items-center space-x-4 sm:space-x-5">
        {doubledImages.map((img, idx) => (
          <Link
            key={`${img.id}-${idx}`}
            href="/gallery/"
            className="group relative shrink-0 w-44 sm:w-60 aspect-[3/2] rounded-2xl overflow-hidden border border-slate-300/80 bg-slate-900 shadow-sm hover:shadow-lg hover:border-slate-500 transition-all duration-300"
          >
            <Image
              src={img.thumbnailUrl || img.imageUrl}
              alt={img.title}
              fill
              sizes="(max-width: 640px) 176px, 240px"
              loading="lazy"
              className="object-cover group-hover:scale-106 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col justify-end p-2.5 sm:p-3">
              <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-amber-400">
                {img.category}
              </span>
              <p className="text-white text-xs font-bold line-clamp-1 leading-snug">
                {img.title}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

