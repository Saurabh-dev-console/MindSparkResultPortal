import React from 'react';
import { Image as ImageIcon, Sparkles } from 'lucide-react';
import GalleryView from '@/components/GalleryView';
import { galleryImages } from '@/data/gallery';

export const metadata = {
  title: 'Official Photo Gallery | MINDSPARK 2026',
  description: 'Moments of innovation, award distributions, stage speeches, and celebrations from Mindspark 2026.',
};

export default function GalleryPage() {
  return (
    <div className="py-10 md:py-16 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-100 text-blue-800 border border-blue-200 mb-3">
            <ImageIcon className="w-3.5 h-3.5 text-blue-600" />
            <span>Event Archive & Media</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            MINDSPARK 2026 Photo Gallery
          </h1>
          <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
            High-resolution visual memories capturing stage inaugurations, competitive science arenas, runner-up felicitations, and gold trophy honors.
          </p>
        </div>

        {/* Client-Side Filterable Gallery View with Lightbox */}
        <GalleryView images={galleryImages} />
      </div>
    </div>
  );
}
