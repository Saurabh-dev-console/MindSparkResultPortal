'use client';

import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { Play, Pause, Volume2, VolumeX, Maximize2, Sparkles, Film, CheckCircle2 } from 'lucide-react';
import { galleryImages } from '@/data/gallery';

export default function HeroVideoReel() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(79); // ~79 seconds
  const [useFallbackSlide, setUseFallbackSlide] = useState(false);
  const [slideIndex, setSlideIndex] = useState(0);

  // Auto-play attempt on mount
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.play().catch(() => {
        // Autoplay policy blocked audio/video, ensure muted and retry
        video.muted = true;
        setIsMuted(true);
        video.play().catch(() => {
          // If native video still blocked, switch to smooth animated slideshow mode
          setUseFallbackSlide(true);
        });
      });
    }
  }, []);

  // Update progress bar as video plays
  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (video && video.duration) {
      setCurrentTime(video.currentTime);
      setDuration(video.duration);
      setProgress((video.currentTime / video.duration) * 100);
    }
  };

  // Toggle Play / Pause
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

  // Toggle Mute / Unmute
  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = !video.muted;
    setIsMuted(video.muted);
  };

  // Toggle Fullscreen
  const toggleFullscreen = () => {
    const container = containerRef.current;
    if (!container) return;

    if (!document.fullscreenElement) {
      container.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  // Fallback Slideshow timer if native video is unsupported
  useEffect(() => {
    if (!useFallbackSlide) return;
    const interval = setInterval(() => {
      setSlideIndex((prev) => (prev + 1) % galleryImages.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [useFallbackSlide]);

  // Current Scene Title based on time
  const currentSceneTitle = () => {
    if (useFallbackSlide) {
      return galleryImages[slideIndex]?.title || 'MINDSPARK 2026 Event Showcase';
    }
    if (currentTime < 10) return 'Official Inauguration Ceremony by District & Sessions Judges';
    if (currentTime < 25) return 'Stage Keynotes, Lamp Lighting & Address';
    if (currentTime < 45) return 'Science Arenas, Working Models & Innovation Stalls';
    if (currentTime < 65) return 'Creative Arts, Fancy Dress & Quiz Terminals';
    return 'Podium Trophy Honors & Closing Celebrations';
  };

  return (
    <div className="w-full max-w-5xl mx-auto my-10 sm:my-14 px-2 sm:px-0">
      {/* Video Cinema Container */}
      <div
        ref={containerRef}
        className="relative group rounded-3xl overflow-hidden bg-slate-950 border-2 border-slate-800 shadow-2xl aspect-[16/9] w-full"
      >
        {!useFallbackSlide ? (
          /* Native High-Performance Looping MP4 Video */
          <video
            ref={videoRef}
            src="/videos/mindspark-hero-reel.mp4"
            poster="/images/inauguration-dignitaries.webp"
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            onTimeUpdate={handleTimeUpdate}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            onError={() => setUseFallbackSlide(true)}
            className="w-full h-full object-cover select-none"
          />
        ) : (
          /* Fallback 60fps Smooth Ken Burns Crossfade Reel */
          <div className="relative w-full h-full overflow-hidden">
            {galleryImages.map((img, i) => (
              <div
                key={img.id}
                className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                  i === slideIndex ? 'opacity-100 scale-102 transition-transform duration-3000' : 'opacity-0'
                }`}
              >
                <Image
                  src={img.imageUrl}
                  alt={img.title}
                  fill
                  priority={i === 0}
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        )}

        {/* Cinematic Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/40 pointer-events-none" />

        {/* Top Header Badge & Live Ticker */}
        <div className="absolute top-3 sm:top-5 left-3 sm:left-6 right-3 sm:right-6 flex items-center justify-between z-20 pointer-events-none">
          <div className="flex items-center space-x-2 bg-slate-900/85 backdrop-blur-md px-3 py-1.5 rounded-full border border-slate-700/80 shadow-md">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-600"></span>
            </span>
            <span className="text-[11px] font-mono font-black uppercase tracking-wider text-white">
              Official 4K Event Reel
            </span>
            <span className="text-slate-500">•</span>
            <span className="text-[11px] font-mono text-slate-300 hidden sm:inline">
              36 Highlights
            </span>
          </div>

          <div className="hidden sm:flex items-center space-x-2 bg-slate-900/85 backdrop-blur-md px-3 py-1.5 rounded-full border border-slate-700/80 text-[11px] font-mono text-slate-300">
            <Film className="w-3.5 h-3.5 text-amber-400" />
            <span>Meena Shah Public School</span>
          </div>
        </div>

        {/* Bottom HUD: Scene Title, Controls & Progress */}
        <div className="absolute bottom-0 inset-x-0 p-4 sm:p-6 z-20 flex flex-col justify-end">
          {/* Active Scene Title */}
          <div className="mb-3 flex items-center justify-between text-white">
            <div className="flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
              <span className="text-xs sm:text-sm font-bold tracking-tight text-white line-clamp-1 drop-shadow-sm">
                {currentSceneTitle()}
              </span>
            </div>

            <div className="font-mono text-[10px] sm:text-xs text-slate-300 bg-slate-900/80 px-2.5 py-1 rounded-md border border-slate-700/60 hidden xs:block">
              {Math.floor(currentTime)}s / {Math.floor(duration)}s
            </div>
          </div>

          {/* Interactive Progress Bar */}
          <div className="w-full bg-white/20 h-1.5 rounded-full overflow-hidden mb-3.5 backdrop-blur-xs">
            <div
              className="bg-red-600 h-full transition-all duration-200 rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Player Controls Bar */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 sm:space-x-3">
              {/* Play / Pause Toggle */}
              <button
                onClick={togglePlay}
                className="p-2 sm:p-2.5 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md text-white transition-all hover:scale-105 cursor-pointer"
                aria-label={isPlaying ? 'Pause video' : 'Play video'}
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-white" />}
              </button>

              {/* Mute / Unmute Toggle */}
              <button
                onClick={toggleMute}
                className="p-2 sm:p-2.5 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md text-white transition-all hover:scale-105 cursor-pointer"
                aria-label={isMuted ? 'Unmute video' : 'Mute video'}
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>

              <span className="text-[11px] font-mono text-slate-300 hidden sm:inline">
                {isPlaying ? 'Smooth Continuous Loop' : 'Paused'}
              </span>
            </div>

            <div className="flex items-center space-x-2">
              {/* Fullscreen Button */}
              <button
                onClick={toggleFullscreen}
                className="p-2 sm:p-2.5 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md text-white transition-all hover:scale-105 cursor-pointer"
                aria-label="Toggle Fullscreen"
              >
                <Maximize2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Under-Player Caption Pill */}
      <div className="mt-3.5 flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-xs font-mono text-slate-600">
        <span className="flex items-center space-x-1.5">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
          <span>All 36 Official Ceremonial Photographs Included</span>
        </span>
        <span className="hidden sm:inline text-slate-300">•</span>
        <span className="flex items-center space-x-1.5">
          <span className="w-2 h-2 rounded-full bg-red-600"></span>
          <span>Seamless 60FPS Hardware-Accelerated Playback</span>
        </span>
      </div>
    </div>
  );
}
