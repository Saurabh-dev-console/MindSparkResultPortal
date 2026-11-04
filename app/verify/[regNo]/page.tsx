import React from 'react';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { prizeWinners } from '@/data/prizeWinners';
import CertificateView from '@/components/CertificateView';

interface PageProps {
  params: {
    regNo: string;
  };
}

export async function generateStaticParams() {
  return prizeWinners.map((winner) => ({
    regNo: winner.regNo,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const winner = prizeWinners.find(
    (w) => w.regNo.toLowerCase() === decodeURIComponent(params.regNo).toLowerCase()
  );

  if (!winner) {
    return {
      title: 'Certificate Not Found | MINDSPARK 2026',
    };
  }

  return {
    title: `Certificate of Distinction: ${winner.name} (${winner.positionTitle}) | MINDSPARK 2026`,
    description: `Official Mindspark 2026 Award Certificate for ${winner.name}, ${winner.positionTitle} in ${winner.categoryName} representing ${winner.schoolName}.`,
  };
}

export default function CertificatePage({ params }: PageProps) {
  const winner = prizeWinners.find(
    (w) => w.regNo.toLowerCase() === decodeURIComponent(params.regNo).toLowerCase()
  );

  if (!winner) {
    notFound();
  }

  return (
    <div className="py-8 bg-slate-100/70 min-h-screen">
      <CertificateView winner={winner} />
    </div>
  );
}

