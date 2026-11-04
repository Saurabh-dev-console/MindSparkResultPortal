'use client';

import React from 'react';

export interface DockItem {
  id: string;
  code: string;
  name: string;
  count?: number;
}

interface SegmentedDockProps {
  items: DockItem[];
  activeId: string;
  onSelect: (id: string) => void;
  className?: string;
}

export function SegmentedDock({
  items,
  activeId,
  onSelect,
  className = '',
}: SegmentedDockProps) {
  return (
    <div className={`relative flex items-center gap-1.5 p-1.5 bg-slate-100 rounded-2xl border border-slate-200 overflow-x-auto no-scrollbar ${className}`}>
      {items.map((item) => {
        const isActive = item.id === activeId;
        return (
          <button
            key={item.id}
            onClick={() => onSelect(item.id)}
            className={`relative px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-200 z-10 flex items-center gap-2 cursor-pointer focus-visible:outline-2 focus-visible:outline-blue-600 ${
              isActive
                ? 'text-slate-900 font-bold bg-white shadow-xs border border-slate-200/80 scale-[1.02]'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
            }`}
          >
            <span
              className={`font-mono text-[10px] px-1.5 py-0.5 rounded transition-colors ${
                isActive ? 'bg-slate-900 text-white' : 'bg-slate-200/80 text-slate-700'
              }`}
            >
              {item.code}
            </span>
            <span>{item.name}</span>
            {item.count !== undefined && (
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full transition-colors ${
                  isActive ? 'bg-amber-100 text-amber-900 font-bold' : 'text-slate-400'
                }`}
              >
                {item.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
