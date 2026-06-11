'use client';

import React from "react";
import Link from "next/link";
import MascotSvg from "./MascotSvg";
import MungedEmail from "./MungedEmail";

export default function Footer() {
  return (
    <footer className="border-t border-zinc-200 bg-zinc-50 py-12 w-full mt-auto" id="main-footer-elem">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-8">
        
        {/* Left Column: Brand & Logo */}
        <div className="flex flex-col items-center md:items-start gap-2 text-center md:text-left">
          <div className="flex items-center space-x-2.5">
            <MascotSvg className="w-7 h-7" />
            <span className="text-sm font-bold text-zinc-900 font-sans tracking-tight">
              EMAIL API guy
            </span>
            <span className="text-xs text-zinc-400 font-mono">© 2011-2026</span>
          </div>
          <p className="text-xs text-zinc-500 font-sans leading-relaxed max-w-sm">
            Manual registrar calibrations & domain deliverability audits. No automated algorithms.
          </p>
        </div>

        {/* Right Column: Links & Direct Inbox */}
        <div className="flex flex-col items-center md:items-end gap-3 px-1">
          <div className="flex flex-wrap items-center justify-center md:justify-end gap-x-5 gap-y-2 text-xs text-zinc-650 font-medium font-sans">
            <Link href="/" className="hover:text-amber-600 transition-colors">Home</Link>
            <Link href="/about" className="hover:text-amber-600 transition-colors">About Chester</Link>
            <Link href="/services" className="hover:text-amber-600 transition-colors">Services</Link>
            <Link href="/pricing" className="hover:text-amber-600 transition-colors">Cost Estimator</Link>
            <Link href="/contact" className="hover:text-amber-600 font-bold border-b border-amber-300 transition-colors pb-0.5">Contact</Link>
          </div>
          
          <div className="inline-flex items-center gap-2 bg-white px-3 py-1.5 rounded-xl border border-zinc-200 shadow-sm text-xs mt-1">
            <span className="text-zinc-500 font-sans text-[11px]">Direct Inbox:</span>
            <MungedEmail textClassName="text-xs font-bold text-zinc-800 hover:text-amber-600" showIcon={false} showCopy={true} />
          </div>
        </div>

      </div>
    </footer>
  );
}
