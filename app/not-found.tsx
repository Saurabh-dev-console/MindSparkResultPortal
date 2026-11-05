import React from 'react';
import Link from 'next/link';
import { ShieldAlert, ArrowLeft, Home, Trophy } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16 bg-slate-50">
      <div className="max-w-md w-full bg-white rounded-3xl border border-slate-200 p-8 text-center shadow-lg">
        <div className="w-16 h-16 rounded-2xl bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center mx-auto mb-4">
          <ShieldAlert className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-black text-slate-900 tracking-tight">Record Not Found</h2>
        <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
          The requested certificate or page could not be located in the static MINDSPARK 2026 distinction directory.
        </p>
        <p className="text-[11px] text-slate-400 mt-2 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
          Note: General non-prize participants are excluded from the public directory. Only awarded rankers possess static certificates.
        </p>

        <div className="mt-6 flex flex-col sm:flex-row gap-2.5">
          <Link
            href="/results/"
            className="flex-1 inline-flex items-center justify-center space-x-1.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs py-3 px-4 rounded-xl shadow-xs transition-colors"
          >
            <Trophy className="w-4 h-4 text-amber-400" />
            <span>View All Rankers</span>
          </Link>
          <Link
            href="/"
            className="flex-1 inline-flex items-center justify-center space-x-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs py-3 px-4 rounded-xl transition-colors"
          >
            <Home className="w-4 h-4" />
            <span>Home Portal</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

