'use client';

import React, { useEffect, useState } from 'react';

interface StatsCounterProps {
  value: number;
  suffix?: string;
  duration?: number;
}

export function StatsCounter({ value, suffix = '', duration = 1200 }: StatsCounterProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number | null = null;
    let animationFrameId: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      // Ease out cubic
      const easeOut = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(easeOut * value));

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      } else {
        setCount(value);
      }
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [value, duration]);

  return (
    <span className="font-mono tracking-tight font-extrabold text-slate-900">
      {count}
      {suffix}
    </span>
  );
}
