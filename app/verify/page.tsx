'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Award, Search, ShieldCheck, ArrowUpRight, CheckCircle2, X, Download, FileText, UserCheck, Sparkles } from 'lucide-react';
import { prizeWinners } from '@/data/prizeWinners';
import { categories } from '@/data/categories';
import { RankBadge } from '@/components/ui/badge';
import { AnimatedButton } from '@/components/ui/animated-button';
import { SpotlightCard } from '@/components/ui/spotlight-card';
import CertificateView from '@/components/CertificateView';
import { PrizeWinner } from '@/types';

export default function VerifySearchPage() {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Dynamic Generator State for Appeared / Passed students
  const [showGenerator, setShowGenerator] = useState(false);
  const [candidateName, setCandidateName] = useState('');
  const [candidateRoll, setCandidateRoll] = useState('');
  const [candidateSchool, setCandidateSchool] = useState('');
  const [candidateClass, setCandidateClass] = useState('');
  const [selectedCatId, setSelectedCatId] = useState(categories[0].id);
  const [generatedCertificate, setGeneratedCertificate] = useState<PrizeWinner | null>(null);

  const searchResults = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    if (!q) return [];
    return prizeWinners.filter(
      (w) =>
        w.rollNo.toLowerCase().includes(q) ||
        w.regNo.toLowerCase().includes(q) ||
        w.name.toLowerCase().includes(q) ||
        w.schoolName.toLowerCase().includes(q)
    );
  }, [searchTerm]);

  const handleGenerateParticipation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!candidateName.trim() || !candidateRoll.trim()) return;

    const selectedCategory = categories.find((c) => c.id === selectedCatId) || categories[0];

    const newCert: PrizeWinner = {
      id: `gen-${Date.now()}`,
      regNo: `MS26-APP-${candidateRoll.trim()}`,
      rollNo: candidateRoll.trim(),
      name: candidateName.trim(),
      schoolName: candidateSchool.trim() || 'Meena Shah Public School',
      className: candidateClass.trim() || selectedCategory.classGroup,
      categoryId: selectedCategory.id,
      categoryName: `${selectedCategory.name} (${selectedCategory.classGroup})`,
      rank: 'passed',
      positionTitle: 'Certified Participant (Passed)',
      prizeAwarded: 'Official Certificate of Participation & Passing',
      certificateType: 'participation',
      status: 'Passed',
      score: 85,
      maxScore: 100,
    };

    setGeneratedCertificate(newCert);
  };

  return (
    <div className="py-12 md:py-20 bg-slate-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-10 flex flex-col items-center">
          <div className="relative w-20 h-20 mb-4 rounded-full overflow-hidden shadow-md ring-2 ring-emerald-600/30 bg-white">
            <Image
              src="/images/meena-shah-mindspark-emblem.png"
              alt="Meena Shah Public School Mindspark 2026"
              fill
              className="object-contain"
              priority
            />
          </div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-md text-xs font-mono font-bold uppercase tracking-wider bg-slate-100 text-slate-800 border border-slate-300 mb-3">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Digital Certificate & Verification Portal</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-950 tracking-tight">
            MINDSPARK 2026 Certificate Portal
          </h1>
          <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            Search official Ranker Distinction certificates or instantly generate & download your <strong>Certified Passed Participation Certificate</strong> across all 18 programmes.
          </p>
        </div>

        {/* Tab switch between Search and Instant Pass Certificate Generator */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <button
            onClick={() => {
              setShowGenerator(false);
              setGeneratedCertificate(null);
            }}
            className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              !showGenerator
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-300'
            }`}
          >
            <Search className="w-4 h-4 inline mr-1.5" />
            <span>Search by Roll No / Reg No</span>
          </button>

          <button
            onClick={() => {
              setShowGenerator(true);
              setGeneratedCertificate(null);
            }}
            className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              showGenerator
                ? 'bg-emerald-700 text-white shadow-xs'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-300'
            }`}
          >
            <Award className="w-4 h-4 inline mr-1.5" />
            <span>Passed Students Certificate Generator</span>
          </button>
        </div>

        {/* MODE A: Search Input Box */}
        {!showGenerator && (
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm mb-10">
            <label htmlFor="verify-input" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
              Enter Candidate Roll Number, Registration No, or Name:
            </label>
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                <Search className="w-5 h-5" />
              </div>
              <input
                id="verify-input"
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="e.g. 260101, 269001, MS26-CAT01-01, or Aarav Sharma"
                className="w-full pl-12 pr-10 py-4 bg-slate-50 border border-slate-300 rounded-2xl text-base text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:bg-white transition-all"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
                  aria-label="Clear search"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-slate-500">
              <span>Quick test sample roll numbers:</span>
              {['260101 (Ranker)', '260501 (Ranker)', '269001 (Passed)', '269002 (Passed)'].map((sample) => {
                const roll = sample.split(' ')[0];
                return (
                  <button
                    key={sample}
                    onClick={() => setSearchTerm(roll)}
                    className="font-mono bg-slate-100 hover:bg-slate-200 text-slate-800 px-2.5 py-1 rounded-lg border border-slate-200 transition-colors cursor-pointer"
                  >
                    {sample}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* MODE B: Interactive Generator for Appeared & Passed Students */}
        {showGenerator && !generatedCertificate && (
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm mb-10">
            <div className="mb-6 pb-4 border-b border-slate-100">
              <h2 className="text-xl font-black text-slate-950">
                Generate Digital Passed / Participation Certificate
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Enter candidate details below to digitally render and print/download the official Meena Shah Public School Certificate of Participation.
              </p>
            </div>

            <form onSubmit={handleGenerateParticipation} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Candidate Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={candidateName}
                    onChange={(e) => setCandidateName(e.target.value)}
                    placeholder="e.g. Ramesh Kumar"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-slate-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Roll Number / Reg No *
                  </label>
                  <input
                    type="text"
                    required
                    value={candidateRoll}
                    onChange={(e) => setCandidateRoll(e.target.value)}
                    placeholder="e.g. 260845"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-slate-900"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    School / Institution Name
                  </label>
                  <input
                    type="text"
                    value={candidateSchool}
                    onChange={(e) => setCandidateSchool(e.target.value)}
                    placeholder="e.g. Meena Shah Public School"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-slate-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Class / Grade Group
                  </label>
                  <input
                    type="text"
                    value={candidateClass}
                    onChange={(e) => setCandidateClass(e.target.value)}
                    placeholder="e.g. Class 7 - B"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-slate-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Select Appeared Programme (18 Categories) *
                </label>
                <select
                  value={selectedCatId}
                  onChange={(e) => setSelectedCatId(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-slate-900"
                >
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.code}: {c.name} ({c.classGroup})
                    </option>
                  ))}
                </select>
              </div>

              <div className="pt-2">
                <AnimatedButton variant="primary" size="lg" className="w-full">
                  <FileText className="w-4 h-4 text-emerald-400" />
                  <span>Generate Official Digital Certificate</span>
                </AnimatedButton>
              </div>
            </form>
          </div>
        )}

        {/* Display Generated Certificate View */}
        {generatedCertificate && (
          <div className="mb-12">
            <div className="mb-4 flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-3 py-1 rounded-md">
                Certificate Generated Successfully
              </span>
              <button
                onClick={() => setGeneratedCertificate(null)}
                className="text-xs font-bold text-slate-600 hover:text-slate-950 underline"
              >
                Generate Another Certificate
              </button>
            </div>
            <CertificateView winner={generatedCertificate} />
          </div>
        )}

        {/* Search Results Display */}
        {!showGenerator && searchTerm.trim().length > 0 && (
          <div className="space-y-4 mb-12">
            <div className="flex items-center justify-between text-xs text-slate-500 font-semibold px-1">
              <span>Verified Records Found: {searchResults.length}</span>
              <span className="font-mono">Ranker & Participation Certificates</span>
            </div>

            {searchResults.length > 0 ? (
              searchResults.map((winner) => (
                <SpotlightCard
                  key={winner.id}
                  className="p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1.5">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-extrabold text-base text-slate-950">{winner.name}</span>
                      <RankBadge rank={winner.rank} />
                    </div>
                    <div className="text-xs text-slate-500 flex flex-wrap items-center gap-x-2 gap-y-1">
                      <span className="font-mono font-bold text-slate-800 bg-slate-100 px-2 py-0.5 rounded">
                        Roll: {winner.rollNo}
                      </span>
                      <span className="font-mono text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                        Reg: {winner.regNo}
                      </span>
                      <span>•</span>
                      <span className="text-slate-700 font-medium">{winner.schoolName}</span>
                    </div>
                    <div className="text-xs text-slate-700 font-medium">
                      {winner.categoryName} ({winner.className}) • {winner.status === 'Passed' ? 'Participation & Passed' : `Score: ${winner.score}/${winner.maxScore}`}
                    </div>
                  </div>

                  <Link href={`/verify/${winner.regNo}/`} className="self-stretch sm:self-auto">
                    <AnimatedButton variant="primary" size="sm" className="w-full sm:w-auto">
                      <span>View & Download Certificate</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </AnimatedButton>
                  </Link>
                </SpotlightCard>
              ))
            ) : (
              <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center text-slate-500">
                <p className="font-bold text-slate-800 text-sm">No record found matching &quot;{searchTerm}&quot;</p>
                <p className="text-xs text-slate-500 mt-2 max-w-md mx-auto">
                  If you appeared in Mindspark 2026, click the <strong>&quot;Passed Students Certificate Generator&quot;</strong> button above to immediately generate and download your official participation certificate.
                </p>
              </div>
            )}
          </div>
        )}

        {/* Verification Architecture Assurance Box */}
        <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 border border-slate-800">
          <h3 className="font-bold text-base flex items-center space-x-2 text-amber-400">
            <CheckCircle2 className="w-5 h-5 text-amber-400" />
            <span>Digital Certificate Verification & Print Details</span>
          </h3>
          <ul className="mt-4 space-y-2.5 text-xs text-slate-300">
            <li className="flex items-start space-x-2">
              <span className="text-emerald-400 font-bold">•</span>
              <span>All ranker certificates (Gold, Silver, Bronze, Consolation) are static pre-rendered with official scores.</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-emerald-400 font-bold">•</span>
              <span>All students who appeared and passed can generate and print their certified Participation & Achievement document in crisp A4 landscape layout.</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-emerald-400 font-bold">•</span>
              <span>Each certificate carries the certified Meena Shah Public School crest, seal, and convener signatures.</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
