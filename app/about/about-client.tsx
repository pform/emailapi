'use client';

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import { 
  History, 
  BookOpen, 
  Cpu, 
  Zap, 
  CheckCircle2, 
  Sparkles, 
  Mail, 
  ShieldCheck, 
  ArrowRight,
  Printer, 
  Network,
  Users
} from "lucide-react";
import dannyExpertAvatar from "@/src/assets/images/danny_expert_avatar_1781000326099.png";
import seattleOfficeImg from "@/src/assets/images/seattle_office_1781005389992.png";
import secureServersImg from "@/src/assets/images/secure_servers_1781005407035.png";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 100, damping: 15 }
  }
};

export default function AboutPage() {
  return (
    <div className="relative min-h-screen bg-white text-zinc-900 font-sans" id="about-page-root">
      
      {/* Decorative Grid Mesh overlay identical to the home page for visual consistency */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e4e4e7_1px,transparent_1px),linear-gradient(to_bottom,#e4e4e7_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-35 pointer-events-none" />

      {/* Ambient background glow points representing electrostatic potentials */}
      <div className="absolute top-24 left-10 w-64 h-64 rounded-full bg-orange-450/10 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-50px] w-80 h-80 rounded-full bg-lime-400/10 blur-[120px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 py-16 relative z-10">
        
        {/* Header Hero Section */}
        <motion.div 
          className="text-center max-w-2xl mx-auto space-y-4 mb-20"
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-flex items-center gap-1.5 bg-amber-500/10 border border-amber-500/30 text-amber-500 text-xs font-mono font-black uppercase tracking-widest px-3.5 py-1.5 rounded-full shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-spin" />
            THE ORIGINAL RECORD ALIGNMENT GUILD
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-zinc-900 leading-tight">
            The Story of Chester Carlson
          </h1>
          <p className="text-sm text-zinc-600 leading-relaxed font-sans max-w-lg mx-auto">
            Operating from the West Coast (Seattle, WA), applying electrostatic calibration principles to manually rebuild broken corporate email infrastructures under the <strong>EMAIL API guy</strong> mantle.
          </p>
        </motion.div>

        {/* Core Layout Grid */}
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          
          {/* Left Column: Portrait & Stats (4 columns) */}
          <motion.div className="lg:col-span-4 space-y-6" variants={itemVariants}>
            <div className="bg-gradient-to-br from-zinc-50 via-white to-orange-50/10 border-2 border-zinc-250 p-6 rounded-2xl shadow-lg relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 rounded-full pointer-events-none" />
              
              <div className="text-center space-y-4">
                <div className="relative w-36 h-36 rounded-full border-4 border-amber-500 p-1 shadow-lg mx-auto overflow-hidden bg-white">
                  <Image 
                    src={dannyExpertAvatar}
                    alt="Chester Carlson - Chief Deliverability Officer portrait"
                    fill
                    className="object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                
                <div>
                  <h3 className="text-lg font-black text-zinc-900 font-sans">Chester Carlson</h3>
                  <span className="text-[10px] font-mono font-extrabold text-amber-500 bg-amber-500/10 border border-amber-500/30 px-3 py-1 rounded-full uppercase tracking-wider inline-block mt-1">
                    Chief DNS Rescue Officer
                  </span>
                </div>

                <div className="border-t border-zinc-250 pt-4 text-left space-y-3">
                  <div className="flex justify-between text-xs">
                    <span className="text-zinc-500 font-mono">HQ LOCATION</span>
                    <strong className="text-zinc-800 font-bold">Seattle Digital Grid, WA</strong>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-zinc-500 font-mono">PRIMARY FOCUS</span>
                    <strong className="text-zinc-800 font-bold">SMTP / DNS Archaeology</strong>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-zinc-500 font-mono">TECH PHILOSOPHY</span>
                    <strong className="text-zinc-800 font-bold">100% Hand-Keyed Code</strong>
                  </div>
                </div>
              </div>
            </div>

            {/* Quote Box Card */}
            <div className="bg-zinc-900 text-zinc-100 p-6 rounded-2xl border border-zinc-800 relative overflow-hidden pointer-events-none">
              <span className="text-7xl font-serif text-orange-500/20 absolute -top-4 -left-2 pointer-events-none">“</span>
              <p className="text-xs italic text-zinc-350 relative z-10 leading-relaxed font-sans mb-3">
                &ldquo;Email deliverability isn&apos;t a game of automatic wizards. An email is just a digital piece of paper. If you don&apos;t align the nameserver charge correctly, the paper falls off the drum.&rdquo;
              </p>
              <span className="text-[10px] font-mono uppercase tracking-widest text-amber-500 font-black block">
                — CHESTER&apos;S COGNITIVE PROTOCOL
              </span>
            </div>

            {/* Seattle Office Image Card (Warmth + Established representation) */}
            <div className="border border-zinc-200 rounded-2xl p-5 bg-white shadow-sm space-y-3">
              <div className="relative h-44 w-full rounded-xl overflow-hidden border border-zinc-150">
                <Image 
                  src={seattleOfficeImg}
                  alt="Our warm Seattle Consulting Office"
                  fill
                  className="object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="text-xs text-zinc-600 leading-relaxed font-sans">
                <span className="font-bold text-zinc-900 block text-sm">West Coast Office — Seattle, WA</span>
                Established in 2011 to replace automated support tools with dedicated, human deliverability experts.
              </div>
            </div>
          </motion.div>

          {/* Right Column: Bio Backstory, Timeline & Three Laws (8 columns) */}
          <motion.div className="lg:col-span-8 space-y-12" variants={itemVariants}>
            
            {/* Detailed Backstory Narrative */}
            <div className="prose prose-zinc space-y-6">
              <h2 className="text-2xl font-black text-zinc-900 font-sans flex items-center gap-2">
                <BookOpen className="w-6 h-6 text-orange-500" />
                The Electrostatic Heritage
              </h2>
              <div className="text-sm text-zinc-650 leading-relaxed space-y-4 font-sans">
                <p>
                  In 1938, in a drafty makeshift lab, a patent attorney named <strong>Chester Carlson</strong> invented electrostatic photography. Over fifteen years ago in 2011, Chester relocated his technical operations to Seattle, WA, bringing that meticulous engineering spirit to the digital landscape.
                </p>
                <p>
                  That core discovery—how electrostatic forces align physical elements—remains the blueprint for modern enterprise IT deliverability. Today, we treat IP packets exactly like physical paper routing.
                </p>
                <p>
                  For the past 15 years, global enterprise structures, venture startups, and logistics companies have relied on <strong>EMAIL API guy</strong> to avoid automated support queues and resolve broken GoDaddy, Cloudflare, or Squarespace configurations.
                </p>
                <p>
                  Operating entirely from Seattle, Washington, we leverage absolute manual precision. We align TXT files, SPF constraints, and DKIM public flags with the singular focus of an established West Coast engineering firm.
                </p>
              </div>
            </div>

            {/* The Career Timeline */}
            <div className="space-y-6">
              <h2 className="text-2xl font-black text-zinc-900 font-sans flex items-center gap-2">
                <History className="w-6 h-6 text-[#61b000]" />
                Chronological Calibration
              </h2>

              <div className="relative border-l border-zinc-200 pl-6 space-y-8 ml-3 py-2">
                
                {/* Event 1 */}
                <div className="relative">
                  <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-white border-2 border-orange-500 flex items-center justify-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                  </div>
                  <div className="space-y-1">
                    <span className="text-[11px] font-mono font-bold text-orange-600 uppercase">1938 // THE ELECTROSTATIC INCEPTION</span>
                    <h4 className="text-sm font-bold text-zinc-900">First Successful Copy in Astoria</h4>
                    <p className="text-xs text-zinc-500 leading-relaxed font-sans">
                      Chester invents dry electrostatic photography (Xerography), laying the groundwork for high-precision charge distribution.
                    </p>
                  </div>
                </div>

                {/* Event 2 */}
                <div className="relative">
                  <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-white border-2 border-[#61b000] flex items-center justify-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#61b000]" />
                  </div>
                  <div className="space-y-1">
                    <span className="text-[11px] font-mono font-bold text-[#61b000] uppercase">1982 // THE SMTP RE-ARCHAEOLOGY</span>
                    <h4 className="text-sm font-bold text-zinc-900">Direct Electron Packaging Integration</h4>
                    <p className="text-xs text-zinc-500 leading-relaxed font-sans">
                      Recognizing that IP packet switching is simply physical paper copier principles scaled at the speed of light, Chester&apos;s descendants align the first corporate mail gateways.
                    </p>
                  </div>
                                 {/* Event 3 */}
                <div className="relative">
                  <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-white border-2 border-[#61b000] flex items-center justify-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#61b000]" />
                  </div>
                  <div className="space-y-1">
                    <span className="text-[11px] font-mono font-bold text-[#61b000] uppercase">2011 // WEST COAST INCEPTION</span>
                    <h4 className="text-sm font-bold text-zinc-900">Established in Seattle, WA</h4>
                    <p className="text-xs text-zinc-500 leading-relaxed font-sans">
                      Chester consolidates high-precision manual calibration techniques on the West Coast, protecting multi-million dollar corporate mail setups with 100% manual DNS rescue.
                    </p>
                  </div>
                </div>

                {/* Event 4 */}
                <div className="relative">
                  <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-[#61b000] border-2 border-white flex items-center justify-center shadow">
                    <Zap className="w-2 h-2 text-white" />
                  </div>
                  <div className="space-y-1">
                    <span className="text-[11px] font-mono font-bold text-[#61b000] uppercase font-black">2026 // 15 YEARS OF SENDER SANITY</span>
                    <h4 className="text-sm font-bold text-zinc-900">Over 1,200 Corporate Mail Domains Secured</h4>
                    <p className="text-xs text-zinc-500 leading-relaxed font-sans">
                      We repair SPF loops and lock-in DKIM signatures manually for major enterprises nationwide, maintaining our flawless 15-year record of zero DNS outages.
                    </p>
                  </div>
                </div>  </div>

              </div>
            </div>

            {/* Chester's Three Laws of Deliverability */}
            <div className="bg-zinc-50 border border-zinc-200 p-6 rounded-2xl space-y-6">
              <h3 className="text-base font-mono uppercase font-black text-zinc-800 border-b border-zinc-200 pb-3 flex items-center gap-1.5">
                <Network className="w-5 h-5 text-orange-500" />
                Chester&apos;s Three Laws of Electrostatic Deliverability
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                <div className="space-y-2">
                  <span className="text-xs font-mono font-black text-white bg-zinc-900 px-2 py-0.5 rounded">LAW 01</span>
                  <h4 className="text-xs font-bold text-zinc-900 uppercase">Charge Alignment Limit</h4>
                  <p className="text-[11px] text-zinc-650 leading-relaxed font-sans">
                    Keep your active DNS lookups below 10. If the charge of too many redirects is too heavy, the recipient mailserver repels your emails.
                  </p>
                </div>

                <div className="space-y-2">
                  <span className="text-xs font-mono font-black text-white bg-orange-600 px-2 py-0.5 rounded">LAW 02</span>
                  <h4 className="text-xs font-bold text-zinc-900 uppercase">Cryptographic Stamp Symmetrical</h4>
                  <p className="text-[11px] text-zinc-650 leading-relaxed font-sans">
                    Your DKIM keys must be printed on active nameservers with absolute fidelity. Distortion or typos in public key chains instantly trigger receiver quarantine alerts.
                  </p>
                </div>

                <div className="space-y-2">
                  <span className="text-xs font-mono font-black text-white bg-[#61b000] px-2 py-0.5 rounded">LAW 03</span>
                  <h4 className="text-xs font-bold text-zinc-900 uppercase">Prohibit Robo-chats</h4>
                  <p className="text-[11px] text-zinc-650 leading-relaxed font-sans">
                    Machines cannot negotiate with other locked systems. Real, physical problems require a real, physical human expert holding DNS access keys.
                  </p>
                </div>

              </div>
            </div>

             {/* Server Infrastructure Warm Visual Banner */}
            <div className="border border-zinc-250 rounded-2xl p-6 bg-amber-50/20 flex flex-col md:flex-row gap-6 items-center">
              <div className="relative w-full md:w-1/3 h-40 rounded-xl overflow-hidden border border-zinc-200 shrink-0">
                <Image 
                  src={secureServersImg}
                  alt="Secure enterprise server architecture with amber indicator lights"
                  fill
                  className="object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="space-y-2">
                <span className="text-[10px] font-mono font-bold text-orange-600 uppercase tracking-widest bg-orange-50 border border-orange-200 px-2.5 py-1 rounded">ESTABLISHED 2011</span>
                <h3 className="text-base font-black text-zinc-900 font-sans">Corporate Domain Security Re-engineered</h3>
                <p className="text-xs text-zinc-600 leading-relaxed font-sans">
                  For over 15 years, our technical calibration suite has integrated secure cryptographic handshakes directly into global Nameservers, defending reputation integrity.
                </p>
              </div>
            </div>

            {/* Interactive Dispatch Block */}
            <div className="bg-gradient-to-r from-orange-500 via-[#61b000] to-emerald-600 rounded-2xl p-6 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
              <div className="space-y-1.5 text-center md:text-left">
                <h4 className="text-sm font-mono font-bold uppercase tracking-wider">SECURE YOUR STATIC CHARGE VALUES</h4>
                <p className="text-xs text-white/90 font-sans max-w-md">
                  Stop running broken diagnostic tools that auto-generate spam flags. Connect directly with Chester Carlson and deploy correct DNS routing.
                </p>
              </div>
              <Link 
                href="mailto:info@emailapiguy.com?subject=Deploy%2520Correct%252520DNS%2520Routing"
                className="group bg-white text-zinc-950 hover:bg-zinc-100 px-6 py-3.5 rounded-xl text-xs font-black uppercase tracking-widest flex items-center gap-1.5 transition-transform hover:-translate-y-0.5 active:translate-y-0 text-center flex-shrink-0 shadow-md"
              >
                RECLAIM SANITY <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>

          </motion.div>

        </motion.div>

      </div>
    </div>
  );
}
