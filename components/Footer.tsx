'use client';

import React from "react";
import Link from "next/link";
import MascotSvg from "./MascotSvg";

export default function Footer() {
  return (
    <footer className="border-t border-zinc-200 bg-zinc-50 py-12 w-full mt-auto">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
        
        <div className="flex items-center space-x-2.5">
          <MascotSvg className="w-8 h-8" />
          <span className="text-sm font-bold text-zinc-900 font-sans tracking-wide">
            EMAIL API guy &copy; 2011-2026. Custom Domain &amp; Deliverability Consulting.
          </span>
        </div>

        <div className="flex space-x-6 text-xs text-zinc-500 font-sans">
          <Link href="/" className="hover:text-[#1d4ed8] transition-colors">Home</Link>
          <Link href="/about" className="hover:text-[#1d4ed8] transition-colors">About Chester</Link>
          <Link href="/services" className="hover:text-[#1d4ed8] transition-colors">Services</Link>
          <Link href="/pricing" className="hover:text-[#1d4ed8] transition-colors">Cost Estimator</Link>
          <Link href="/contact" className="hover:text-amber-600 transition-colors">Contact</Link>
        </div>

      </div>
    </footer>
  );
}
