'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Trophy,
  ArrowRight,
  Camera,
  ChevronDown,
  ShieldCheck,
} from 'lucide-react';
import { AnimatedButton } from '@/components/ui/animated-button';

const heroImages = [
  '/images/inauguration-dignitaries.webp',
  '/images/STARTING-IMAGE-01.webp',
  '/images/STARTING-IMAGE-02.webp',
  '/images/EVENT-IMAGES-01.webp',
  '/images/EVENT-IMAGES-02.webp',
  '/images/EVENT-IMAGES-03.webp',
  '/images/EVENT-IMAGES-04.webp',
  '/images/EVENT-IMAGES-06.webp',
  '/images/EVENT-IMAGES-07.webp',
  '/images/EVENT-IMAGES-09.webp',
  '/images/EVENT-IMAGES-10.webp',
  '/images/EVENT-IMAGES-11.webp',
  '/images/EVENT-IMAGES-12.webp',
  '/images/EVENT-IMAGES-13.webp',
  '/images/EVENT-IMAGES-14.webp',
  '/images/EVENT-IMAGES-15.webp',
  '/images/EVENT-IMAGES-16.webp',
  '/images/EVENT-IMAGES-17.webp',
  '/images/EVENT-IMAGES-18.webp',
  '/images/EVENT-IMAGES-19.webp',
  '/images/EVENT-IMAGES-20.webp',
  '/images/EVENT-IMAGES-21.webp',
  '/images/EVENT-IMAGES-22.webp',
  '/images/EVENT-IMAGES-23.webp',
  '/images/EVENT-IMAGES-24.webp',
  '/images/EVENT-IMAGES-25.webp',
  '/images/EVENT-IMAGES-26.webp',
  '/images/EVENT-IMAGES-27.webp',
  '/images/EVENT-IMAGES-28.webp',
  '/images/EVENT-IMAGES-29.webp',
  '/images/EVENT-IMAGES-30.webp',
  '/images/EVENT-IMAGES-31.webp',
  '/images/EVENT-IMAGES-32.webp',
  '/images/EVENT-IMAGES-33.webp',
];

export default function Hero() {
  const [currentIdx, setCurrentIdx] = useState(0);

  // Smooth cinematic cross-fade timer (transitions seamlessly every 5 seconds)
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative bg-slate-950 text-white overflow-hidden border-b border-slate-800 min-h-[calc(100vh-80px)] flex flex-col justify-between py-12 sm:py-16">
      {/* 1. Cinematic Seamless Cross-Fading Background Layer */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none select-none z-0">
        {heroImages.map((src, idx) => {
          const isCurrent = idx === currentIdx;
          const isPrev = idx === (currentIdx - 1 + heroImages.length) % heroImages.length;
          // Keep only active and previous frames mounted to ensure smooth 60fps performance
          if (!isCurrent && !isPrev) return null;

          return (
            <div
              key={src}
              className={`absolute inset-0 w-full h-full transition-opacity duration-[2000ms] ease-in-out ${
                isCurrent ? 'opacity-100 z-10' : 'opacity-0 z-0'
              }`}
            >
              <Image
                src={src}
                alt="Mindspark 2026 Competition Arena"
                fill
                priority={idx === 0}
                sizes="100vw"
                className={`object-cover transform transition-transform duration-[7000ms] ease-out ${
                  isCurrent ? 'scale-105' : 'scale-100'
                }`}
              />
            </div>
          );
        })}

        {/* High-Clarity Photographic Scrim: Clear vibrant images with protected text contrast */}
        <div className="absolute inset-0 z-20 bg-gradient-to-b from-slate-950/45 via-transparent to-slate-950/70 pointer-events-none" />
        <div className="absolute inset-0 z-20 bg-[radial-gradient(ellipse_at_center,_rgba(2,6,23,0.55)_0%,_rgba(2,6,23,0.15)_60%,_transparent_100%)] pointer-events-none" />
      </div>

      {/* Top Spacer for vertical balance */}
      <div className="relative z-30" />

      {/* 2. Hero Center Content — Clean, Majestic, 100% Uncluttered */}
      <div className="relative z-30 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center my-auto">
        {/* Organizer & Host Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 rounded-full bg-slate-900/90 border border-amber-400/40 text-amber-300 text-xs sm:text-sm font-mono font-bold tracking-wider uppercase mb-5 backdrop-blur-md shadow-xl">
          <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
          <span>Organized &amp; Hosted by Meena Shah Public School</span>
        </div>

        {/* Main Master Headline */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[1.08] max-w-4xl drop-shadow-[0_4px_24px_rgba(0,0,0,0.95)]">
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-100 to-white">
            MINDSPARK 2026
          </span>
          <span className="block text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl mt-2 sm:mt-3 tracking-tight font-extrabold">
            OFFICIAL RANKERS &amp; PRIZE WINNERS PORTAL
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mt-4 sm:mt-5 text-sm sm:text-base md:text-lg text-slate-200 max-w-2xl font-medium leading-relaxed drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">
          Organized and hosted by Meena Shah Public School • Honoring certified rankers, medal recipients, and distinction achievers across all 18 Class-Wise Competition Programmes.
        </p>

        {/* Primary Action Buttons */}
        <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4 w-full sm:w-auto">
          <Link href="/results/" className="w-full sm:w-auto">
            <AnimatedButton variant="gold" size="lg" className="w-full sm:w-auto shadow-xl font-bold">
              <Trophy className="w-4 h-4 text-slate-950" />
              <span>Explore 18 Programme Podiums</span>
              <ArrowRight className="w-4 h-4 text-slate-900" />
            </AnimatedButton>
          </Link>

          <Link href="/gallery/" className="w-full sm:w-auto">
            <AnimatedButton
              variant="outline"
              size="lg"
              className="w-full sm:w-auto border-slate-500 bg-slate-950/70 hover:bg-slate-900 text-white backdrop-blur-md shadow-xl"
            >
              <Camera className="w-4 h-4 text-amber-400" />
              <span>Event Photo Archive</span>
            </AnimatedButton>
          </Link>
        </div>
      </div>

      {/* 3. Subtle Scroll Down Indicator */}
      <div className="relative z-30 pt-6 flex flex-col items-center pointer-events-none opacity-85 hover:opacity-100 transition-opacity">
        <span className="text-[10px] sm:text-xs font-mono font-bold uppercase tracking-widest text-slate-300 mb-1.5 drop-shadow-md">
          Scroll down to explore metrics &amp; results
        </span>
        <ChevronDown className="w-4 h-4 text-amber-400 animate-bounce" />
      </div>
    </section>
  );
}