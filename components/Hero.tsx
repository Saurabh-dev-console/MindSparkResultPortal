'use client';

import React, { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Trophy,
  Award,
  School,
  ShieldCheck,
  ArrowRight,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Sparkles,
} from 'lucide-react';
import StaticSearch from '@/components/StaticSearch';
import { SpotlightCard } from '@/components/ui/spotlight-card';
import { StatsCounter } from '@/components/ui/stats-counter';
import { AnimatedButton } from '@/components/ui/animated-button';
import HeroFilmstrip from '@/components/HeroFilmstrip';

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  // Auto-play attempt on mount
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.muted = true;
      video.play().catch(() => {
        // Fallback if browser requires user gesture
        setIsPlaying(false);
      });
    }
  }, []);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = !video.muted;
    setIsMuted(video.muted);
  };

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
    <section className="relative overflow-hidden bg-slate-950 text-white border-b border-slate-800">
      {/* 1. Full-Screen Cinematic Background Video Layer */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none select-none z-0">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted={isMuted}
          playsInline
          preload="auto"
          poster="/images/inauguration-dignitaries.webp"
          className="w-full h-full object-cover opacity-50 scale-105 transition-opacity duration-700"
        >
          <source src="/videos/mindspark-hero-reel.mp4" type="video/mp4" />
        </video>

        {/* Multi-Stop Cinematic Scrim for 100% WCAG Contrast & Depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/85 via-slate-950/70 to-slate-950/95" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(2,6,23,0.75)_100%)]" />
      </div>

      {/* 2. Main Foreground Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-16 md:pt-16 md:pb-20">
        <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
          {/* Prominent Official Medallion Showcase */}
          <div className="relative mb-6 group">
            <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-full overflow-hidden border-4 border-red-500/50 shadow-2xl bg-white p-0.5 group-hover:scale-105 transition-transform duration-300">
              <Image
                src="/images/meena-shah-mindspark-emblem.webp"
                alt="Meena Shah Public School - MINDSPARK 2026 Official Crest"
                width={144}
                height={144}
                className="object-cover w-full h-full rounded-full"
                priority
              />
            </div>
            <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 bg-slate-900 text-white font-mono text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full border border-slate-700 shadow-lg whitespace-nowrap">
              ESTD. MEENA SHAH
            </div>
          </div>

          {/* Official Tagline Badge */}
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-slate-700/80 text-slate-200 text-xs font-bold uppercase tracking-wider backdrop-blur-md mb-4 shadow-md">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
            <span>MEENA SHAH PUBLIC SCHOOL • RAMNAGAR CAMPUS</span>
          </div>

          {/* Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight drop-shadow-md">
            MINDSPARK 2026 — OFFICIAL RANKERS & PRIZE WINNERS
          </h1>

          {/* Subtitle */}
          <p className="mt-4 text-base sm:text-xl text-slate-300 max-w-2xl font-normal leading-relaxed drop-shadow-xs">
            Honoring the young innovators, researchers, and distinction achievers across all 18 Class-Wise Competition Programmes.
          </p>

          {/* Client-Side Quick Search Bar with Frost Accent */}
          <div className="mt-8 w-full max-w-2xl">
            <div className="rounded-2xl shadow-2xl ring-1 ring-white/15 backdrop-blur-md">
              <StaticSearch />
            </div>
            <div className="mt-3 text-xs text-slate-300 flex items-center justify-center space-x-2">
              <span className="text-slate-400">Quick verify:</span>
              <span className="font-mono bg-slate-900/90 px-2 py-0.5 rounded border border-slate-700 text-slate-200 font-bold shadow-2xs">
                260101
              </span>
              <span className="text-slate-400">or</span>
              <span className="font-mono bg-slate-900/90 px-2 py-0.5 rounded border border-slate-700 text-slate-200 font-bold shadow-2xs">
                Aarav Sharma
              </span>
            </div>
          </div>

          {/* Primary Action Buttons */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link href="/results/">
              <AnimatedButton variant="gold" size="lg">
                <Trophy className="w-4 h-4 text-slate-950" />
                <span>Explore All 18 Category Podiums</span>
                <ArrowRight className="w-4 h-4 text-slate-900" />
              </AnimatedButton>
            </Link>

            <Link href="/verify/">
              <AnimatedButton variant="outline" size="lg" className="border-slate-600 bg-slate-900/70 hover:bg-slate-800 text-white backdrop-blur-md">
                <Award className="w-4 h-4 text-red-500" />
                <span>Verify & Download Certificate</span>
              </AnimatedButton>
            </Link>
          </div>

          {/* Floating Live Video Controller Pill */}
          <div className="mt-7 inline-flex items-center space-x-3 bg-slate-900/80 backdrop-blur-md border border-slate-700/80 px-4 py-2 rounded-full shadow-lg text-xs font-mono text-slate-300">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
            </span>
            <span className="font-bold text-white">Live Ceremony Video</span>
            <span className="text-slate-600">|</span>
            <button
              onClick={togglePlay}
              className="hover:text-white transition-colors cursor-pointer flex items-center space-x-1"
              aria-label={isPlaying ? 'Pause background video' : 'Play background video'}
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-white" />}
              <span>{isPlaying ? 'Pause' : 'Play'}</span>
            </button>
            <span className="text-slate-600">|</span>
            <button
              onClick={toggleMute}
              className="hover:text-white transition-colors cursor-pointer flex items-center space-x-1"
              aria-label={isMuted ? 'Unmute video audio' : 'Mute video audio'}
            >
              {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
              <span>{isMuted ? 'Unmute' : 'Muted'}</span>
            </button>
          </div>
        </div>

        {/* 3. 4 Spotlight Metric Cards (Dark Cinema Theme) */}
        <div className="mt-14 sm:mt-18 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {metrics.map((item, idx) => {
            const Icon = item.icon;
            return (
              <SpotlightCard
                key={idx}
                className="p-6 bg-slate-900/70 border-slate-800/80 backdrop-blur-md hover:border-slate-700 transition-colors text-white"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-slate-800/90 border border-slate-700 flex items-center justify-center text-slate-200">
                    <Icon className="w-5 h-5 text-amber-400" />
                  </div>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-300 bg-slate-800/80 px-2.5 py-0.5 rounded border border-slate-700">
                    Official
                  </span>
                </div>
                <div className="text-3xl sm:text-4xl text-white font-black">
                  <StatsCounter value={item.num} suffix={item.suffix} />
                </div>
                <div className="text-sm font-bold text-white mt-1">{item.label}</div>
                <div className="text-xs text-slate-400 mt-0.5 leading-relaxed">{item.subtext}</div>
              </SpotlightCard>
            );
          })}
        </div>
      </div>

      {/* 4. Infinite Continuous Filmstrip Ribbon Stream at Bottom of Hero */}
      <div className="relative z-10 border-t border-slate-800/80 bg-slate-950/80 backdrop-blur-md">
        <HeroFilmstrip />
      </div>
    </section>
  );
}
