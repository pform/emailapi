'use client';

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, Cpu, Database, Key, Menu, X } from "lucide-react";
import MascotSvg from "./MascotSvg";

export default function Navbar() {
  const [megamenuOpen, setMegamenuOpen] = useState(false);
  const pathname = usePathname();
  const hoverTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    setMegamenuOpen(true);
  };

  const handleMouseLeave = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setMegamenuOpen(false);
    }, 200); // 200ms is standard smooth human buffer
  };

  React.useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    };
  }, []);

  return (
    <div 
      onMouseLeave={handleMouseLeave}
      className="sticky top-0 z-50 w-full"
    >
      <nav id="corporate-header" className="bg-white/95 backdrop-blur-sm border-b border-zinc-200 py-4 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 flex items-center justify-between">
          
          {/* Logo Match to Image 3 exactly */}
          <Link href="/" className="flex items-center space-x-2.5 cursor-pointer selection:bg-transparent">
            <div className="bg-zinc-100 rounded-lg p-1 border border-zinc-300 flex items-center justify-center">
              <MascotSvg className="w-10 h-10" />
            </div>
            <div className="flex flex-col select-none">
              <div className="flex items-baseline leading-none">
                <span className="font-extrabold text-xl tracking-tight text-[#61b000]">EMAIL</span>
                <span className="font-extrabold text-xl tracking-tight text-zinc-950">API</span>
              </div>
              <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest leading-none mt-0.5">guy</span>
            </div>
          </Link>

          {/* Nav Items */}
          <div className="hidden md:flex items-center space-x-8">
            <button 
              onMouseEnter={handleMouseEnter}
              onClick={() => setMegamenuOpen(!megamenuOpen)}
              className={`text-sm font-bold flex items-center gap-1 transition-colors font-sans ${
                megamenuOpen ? 'text-[#61b000]' : 'text-zinc-800 hover:text-[#61b000]'
              }`}
            >
              Services
              <ChevronDown className={`w-4 h-4 transition-transform ${megamenuOpen ? 'rotate-180 text-[#61b000]' : ''}`} />
            </button>
            <Link 
              href="/about" 
              className={`text-sm font-bold transition-colors ${pathname === "/about" ? "text-[#61b000]" : "text-zinc-800 hover:text-[#61b000]"}`}
            >
              About Chester
            </Link>
            <Link 
              href="/pricing"
              className={`text-sm font-bold transition-colors ${pathname === "/pricing" ? "text-[#61b000]" : "text-zinc-800 hover:text-[#61b000]"}`}
            >
              Cost Estimator
            </Link>
            <Link 
              href="/contact"
              className={`text-sm font-bold transition-colors ${pathname === "/contact" ? "text-rose-600" : "text-zinc-800 hover:text-rose-600"}`}
            >
              Contact Us
            </Link>
            <Link 
              href="/contact"
              className="bg-[#61b000] hover:bg-[#529400] text-white text-xs font-bold uppercase px-4 py-2.5 rounded border border-emerald-600 transition-all tracking-wider"
            >
              Get in Touch ✉️
            </Link>
          </div>

          {/* Mobile menu toggle */}
          <div className="md:hidden">
            <button 
              onClick={() => setMegamenuOpen(!megamenuOpen)}
              className="text-zinc-800 p-2 border border-zinc-200 rounded hover:bg-zinc-100 transition-colors"
            >
              {megamenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </nav>

      {/* --- PARALOCKED ALIEN-GODS MEGAMENU (LIGHT MODE) --- */}
      <AnimatePresence>
        {megamenuOpen && (
          <motion.div 
            id="megamenu-dropdown"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.15 }}
            onMouseEnter={handleMouseEnter}
            className="absolute left-0 right-0 z-40 bg-zinc-50 border-b border-zinc-200 shadow-xl"
          >
            <div className="max-w-6xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-3 gap-8">
              
              {/* Column 1 */}
              <div className="space-y-3">
                <div className="flex items-center space-x-2 text-zinc-900 border-b border-zinc-300 pb-1">
                  <Cpu className="w-4 h-4 text-[#61b000]" />
                  <span className="text-xs uppercase tracking-wider font-bold">One-Time Implementations</span>
                </div>
                <div className="space-y-2 text-sm">
                  <Link 
                    href="/services?filter=one-time" 
                    onClick={() => setMegamenuOpen(false)}
                    className="block p-2 rounded hover:bg-white border border-transparent hover:border-zinc-200 transition-all font-bold text-zinc-800"
                  >
                    Technical Onboarding Setup
                    <span className="block text-xs font-normal text-zinc-500 mt-0.5">Custom domain routing & GoDaddy background mapping.</span>
                  </Link>
                  <Link 
                    href="/services?filter=one-time" 
                    onClick={() => setMegamenuOpen(false)}
                    className="block p-2 rounded hover:bg-white border border-transparent hover:border-zinc-200 transition-all font-bold text-zinc-800"
                  >
                    Workspace Provisioning
                    <span className="block text-xs font-normal text-zinc-500 mt-0.5">Google Workspace materialization & MX record locks.</span>
                  </Link>
                </div>
              </div>

              {/* Column 2 */}
              <div className="space-y-3">
                <div className="flex items-center space-x-2 text-zinc-900 border-b border-zinc-300 pb-1">
                  <Database className="w-4 h-4 text-sky-600" />
                  <span className="text-xs uppercase tracking-wider font-bold">Ongoing Support Retainers</span>
                </div>
                <div className="space-y-2 text-sm">
                  <Link 
                    href="/services?filter=monthly" 
                    onClick={() => setMegamenuOpen(false)}
                    className="block p-2 rounded hover:bg-white border border-transparent hover:border-zinc-200 transition-all font-bold text-zinc-800"
                  >
                    Managed Infrastructure Retainer
                    <span className="block text-xs font-normal text-zinc-500 mt-0.5">DNS monitoring, renewals control, breaking/fixing host drama.</span>
                  </Link>
                  <Link 
                    href="/services?filter=monthly" 
                    onClick={() => setMegamenuOpen(false)}
                    className="block p-2 rounded hover:bg-white border border-transparent hover:border-zinc-200 transition-all font-bold text-zinc-800"
                  >
                    Workspace Administration 
                    <span className="block text-xs font-normal text-zinc-500 mt-0.5">Employee inbox changes, routing rules, custom configurations.</span>
                  </Link>
                </div>
              </div>

              {/* Column 3 */}
              <div className="space-y-3 bg-zinc-100 p-4 rounded-lg border border-zinc-200">
                <div className="flex items-center space-x-2 text-zinc-950">
                  <Key className="w-4 h-4 text-amber-500" />
                  <span className="text-xs uppercase tracking-wider font-bold">Consulting Rates</span>
                </div>
                <div className="space-y-2 text-xs text-zinc-650">
                  <p>
                    <strong className="text-zinc-900 block font-bold text-sm">One-Time Setup: $250 - $500 flat</strong>
                    Complete routing architecture & email deliverability provisioning from clean slates.
                  </p>
                  <p>
                    <strong className="text-zinc-900 block font-bold text-sm">IT Retainer: $50 - $150 / month</strong>
                    Ongoing fractional backup to protect you from reading GoDaddy manual files.
                  </p>
                </div>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
