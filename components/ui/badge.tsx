import React from 'react';
import { Trophy, Medal, Award, CheckCircle2 } from 'lucide-react';
import { PrizeWinner } from '@/types';

interface RankBadgeProps {
  rank: PrizeWinner['rank'];
  size?: 'sm' | 'md';
}

export function RankBadge({ rank, size = 'sm' }: RankBadgeProps) {
  const sizeClasses = size === 'sm' ? 'px-2.5 py-0.5 text-xs' : 'px-3 py-1 text-sm';
  const iconSize = size === 'sm' ? 'w-3 h-3' : 'w-4 h-4';

  switch (rank) {
    case 1:
      return (
        <span
          className={`inline-flex items-center gap-1.5 rounded-md font-bold bg-amber-50 text-amber-900 border border-amber-300 shadow-2xs ${sizeClasses}`}
        >
          <Trophy className={`${iconSize} text-amber-600 shrink-0`} />
          <span>Rank 1 (Gold)</span>
        </span>
      );
    case 2:
      return (
        <span
          className={`inline-flex items-center gap-1.5 rounded-md font-bold bg-slate-100 text-slate-800 border border-slate-300 shadow-2xs ${sizeClasses}`}
        >
          <Medal className={`${iconSize} text-slate-600 shrink-0`} />
          <span>Rank 2 (Silver)</span>
        </span>
      );
    case 3:
      return (
        <span
          className={`inline-flex items-center gap-1.5 rounded-md font-bold bg-amber-100/50 text-amber-950 border border-amber-400/80 shadow-2xs ${sizeClasses}`}
        >
          <Medal className={`${iconSize} text-amber-800 shrink-0`} />
          <span>Rank 3 (Bronze)</span>
        </span>
      );
    case 4:
      return (
        <span
          className={`inline-flex items-center gap-1.5 rounded-md font-bold bg-blue-50 text-blue-900 border border-blue-200 shadow-2xs ${sizeClasses}`}
        >
          <Award className={`${iconSize} text-blue-700 shrink-0`} />
          <span>Consolation Prize</span>
        </span>
      );
    default:
      return (
        <span
          className={`inline-flex items-center gap-1.5 rounded-md font-bold bg-emerald-50 text-emerald-900 border border-emerald-300 shadow-2xs ${sizeClasses}`}
        >
          <CheckCircle2 className={`${iconSize} text-emerald-600 shrink-0`} />
          <span>Appeared & Passed</span>
        </span>
      );
  }
}
