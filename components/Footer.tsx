import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Award, ShieldCheck, Mail, Phone, MapPin, BookOpen } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800 no-print mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Institutional Info */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center p-1.5 border border-slate-800">
                <Image
                  src="/images/school-logo.png"
                  alt="School Crest"
                  width={36}
                  height={36}
                  className="object-contain"
                />
              </div>
              <div>
                <span className="font-black text-lg text-white tracking-tight block">MINDSPARK 2026</span>
                <span className="text-xs text-slate-400 font-medium block">Meena Shah Public School</span>
              </div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Official Static Results & Distinction Showcase Portal honoring high-achieving student innovators, researchers, and creators.
            </p>
            <div className="inline-flex items-center space-x-2 text-xs bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-md text-slate-300">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>100% Pre-rendered SSG Static</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider mb-4 flex items-center space-x-2">
              <BookOpen className="w-4 h-4 text-slate-400" />
              <span>Navigation</span>
            </h3>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Overview & Champions
                </Link>
              </li>
              <li>
                <Link href="/results/" className="hover:text-white transition-colors">
                  Programme-Wise Winners & Podiums
                </Link>
              </li>
              <li>
                <Link href="/gallery/" className="hover:text-white transition-colors">
                  Event Photo Documentation
                </Link>
              </li>
              <li>
                <Link href="/verify/" className="hover:text-white transition-colors">
                  Candidate Roll No Verification
                </Link>
              </li>
            </ul>
          </div>

          {/* Featured Arenas */}
          <div>
            <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider mb-4 flex items-center space-x-2">
              <Award className="w-4 h-4 text-amber-500" />
              <span>Key Competition Arenas</span>
            </h3>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>Robotics & AI Challenge</li>
              <li>Senior Mathematics Olympiad</li>
              <li>Junior Science Innovators</li>
              <li>Cyber Security & Cryptography</li>
              <li>Space Science & Astronomy</li>
            </ul>
          </div>

          {/* Institutional Secretariat */}
          <div>
            <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider mb-4 flex items-center space-x-2">
              <span>Secretariat & Administration</span>
            </h3>
            <ul className="space-y-3 text-xs text-slate-400">
              <li className="flex items-start space-x-2.5">
                <MapPin className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                <span>Meena Shah Public School Campus, Ramnagar, India</span>
              </li>
              <li className="flex items-center space-x-2.5">
                <Phone className="w-4 h-4 text-slate-500 shrink-0" />
                <span>+91 (0) 522 234 5678</span>
              </li>
              <li className="flex items-center space-x-2.5">
                <Mail className="w-4 h-4 text-slate-500 shrink-0" />
                <span>mindspark@meenashahpublicschool.edu.in</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-900 mt-10 pt-6 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© 2026 Meena Shah Public School. All Rights Reserved. Mindspark is a certified annual scholastic gala.</p>
          <p className="flex items-center space-x-1.5 font-mono text-[11px]">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
            <span>Exclusively lists awarded rankers</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
