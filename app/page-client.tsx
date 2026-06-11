'use client';

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";
import { 
  CheckCircle2, 
  AlertTriangle, 
  ArrowRight, 
  ShieldAlert, 
  Sparkles, 
  Mail, 
  Server, 
  Database, 
  Zap, 
  UserCheck, 
  FileText, 
  Lock,
  MessageSquare,
  Inbox,
  FolderOpen,
  Sparkle,
  RefreshCw,
  Settings
} from "lucide-react";

import dnsHeroArtwork from "@/src/assets/images/dns_hero_artwork_1781000310238.png";
import dannyExpertAvatar from "@/src/assets/images/danny_expert_avatar_1781000326099.png";
import seattleOfficeImg from "@/src/assets/images/seattle_office_1781005389992.png";
import secureServersImg from "@/src/assets/images/secure_servers_1781005407035.png";

// Interface for interactive inbox simulation
interface SampleEmail {
  id: string;
  senderName: string;
  senderEmail: string;
  subject: string;
  time: string;
  bodyPreview: string;
  fullBody: string;
  failedRule?: string;
  remedyText?: string;
  isSpamOnlyIfUncalibrated: boolean;
}

const sampleEmails: SampleEmail[] = [
  {
    id: "e1",
    senderName: "Acme Corp Billing",
    senderEmail: "billing@yourdomain.com",
    subject: "Overdue Invoice #20492 for Q3 System Alignments",
    time: "10:41 AM",
    bodyPreview: "Please find attached the receipt for client domain transfers. Payment is due soon...",
    fullBody: "Hello Team,\n\nWe would like to remind you that Invoice #20492 for your technical system alignment remains outstanding. Please process payment via our encrypted gateway.\n\nBest regards,\nAccounting Team \n(Sent via unregistered Squarespace relay)",
    failedRule: "SPF (Sender Policy Framework) Fail: Outgoing mail server IP address is not specified in your authorized domain list. Major receiving servers (Gmail, Yahoo) automatically flagged this mail as unauthorized spoofing and routed it to Junk.",
    remedyText: "Chester's Solution: Hand-calibrated root SPF records to integrate all platform relays, securing lookups safely under the hard limit of ten.",
    isSpamOnlyIfUncalibrated: true
  },
  {
    id: "e2",
    senderName: "Identity Portal Security",
    senderEmail: "security@yourdomain.com",
    subject: "Action Required: Locked Out of Employee Portal",
    time: "9:15 AM",
    bodyPreview: "A login attempt was flagged from outside your regional DNS lookup scope...",
    fullBody: "Important Notice:\n\nA new device initiated login protocols for your corporate identity accounts. If this was not you, please immediately trigger our administration password reset from inside your domain validation panel.",
    failedRule: "DMARC Policy Rejection: The message lacks valid cryptographic alignment match. The recipient server automatically triggered a hard quarantine block.",
    remedyText: "Chester's Solution: Custom-keyed a secure quarantine policy (p=quarantine) with live report routing loops, guaranteeing genuine corporate authority checks.",
    isSpamOnlyIfUncalibrated: true
  },
  {
    id: "e3",
    senderName: "Founder Chester Carlson",
    senderEmail: "chester@emailapiguy.com",
    subject: "Domain Audit & DKIM Public Key Delivery Certificate",
    time: "8:02 AM",
    bodyPreview: "Your modern email packet is simply an electrostatic routed letter. I check...",
    fullBody: "Hello and welcome!\n\nFor over 15 years, our West Coast office has mapped, secured, and aligned domain keys manually. Since 2011, we verify every single raw TXT record for our consulting partners, bypassing automated robots.\n\nBest,\nChester Carlson\n(Seattle HQ)",
    failedRule: "DKIM Key Signature Missing: The outgoing mail header lacks a valid cryptographic selector signature. Unsigned messages are dropped by modern Spam filters.",
    remedyText: "Chester's Solution: Provisioned a high-security 2048-bit DKIM private key selector, publishing matching values directly to active nameserver zones.",
    isSpamOnlyIfUncalibrated: true
  },
  {
    id: "e4",
    senderName: "Seattle Coffee Guild",
    senderEmail: "news@pnwcoffeecraft.co",
    subject: "Weekly Newsletter: The Mechanics of Espresso Temperature",
    time: "Yesterday",
    bodyPreview: "Discover how mineral water chemistry and pressure values yield the sweetest amber crema...",
    fullBody: "Dear Guild Members,\n\nThis week in Seattle, our physical roasting lab analyzes pre-infusion biology. We review water mineral PPM, heat-exchange stability, and how physical laws yield beautiful crema.\n\nWarmly,\nPNW Coffee Craft",
    isSpamOnlyIfUncalibrated: false
  }
];

// Animation Variants for dynamic staggered entrances
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 100, damping: 15 }
  }
};

const pulseVariants = {
  animate: {
    scale: [1, 1.05, 1],
    opacity: [0.8, 1, 0.8],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut" as const
    }
  }
};

export default function HomePage() {
  const [scrollY, setScrollY] = useState(0);

  // Ref and transforms for the static Scroll-Bound 3D Flips
  const mailboxContainerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: mailboxContainerRef,
    offset: ["start end", "end start"]
  });
  
  // Smooth scroll translation over the middle region of the section
  const rotateY = useTransform(scrollYProgress, [0.35, 0.65], [0, 180]);

  // Derive explicit attributes to bulletproof cross-browser rendering & eliminate layer bleeding
  const frontOpacity = useTransform(rotateY, (r: number) => r >= 90 ? 0 : 1);
  const backOpacity = useTransform(rotateY, (r: number) => r < 90 ? 0 : 1);
  const frontPointerEvents = useTransform(rotateY, (r: number) => r >= 90 ? "none" : "auto");
  const backPointerEvents = useTransform(rotateY, (r: number) => r < 90 ? "none" : "auto");

  return (
    <div className="relative min-h-screen bg-white text-zinc-900 font-sans overflow-x-hidden" id="homepage-root">
      
      {/* Hand-drawn style decorative physics abstract lights */}
      <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-orange-400/10 blur-[120px] pointer-events-none" />
      <div className="absolute top-[40%] right-[-100px] w-96 h-96 rounded-full bg-emerald-400/15 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[10%] left-[-50px] w-80 h-80 rounded-full bg-lime-400/10 blur-[130px] pointer-events-none" />

      {/* Clean Grid backdrop for technical blueprint feel */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#f1f1f4_1px,transparent_1px),linear-gradient(to_bottom,#f1f1f4_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_80%,transparent_100%)] opacity-40 pointer-events-none" />

      {/* --- HERO SECTION (Cozy warm roasted espresso tone instead of solid black) --- */}
      <section className="relative overflow-hidden pt-20 pb-28 border-b border-[#3c312a] bg-[#221c19] text-white">
        
        {/* Absolute Background image of DNS Infrastructure acting as a gorgeous ambient canvas */}
        <div className="absolute inset-0 z-0 select-none overflow-hidden bg-[#221c19] pointer-events-none">
          <Image 
            src={dnsHeroArtwork}
            alt="Beautiful DNS Infrastructure Artwork Background"
            fill
            priority
            className="object-cover opacity-[0.14] scale-[1.01] pointer-events-none md:blur-[1px]"
            referrerPolicy="no-referrer"
          />
          {/* Elegant geometric and color overlays to ensure pristine, rich text contrast */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#221c19] via-[#221c19]/90 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#221c19] via-transparent to-[#221c19]/30" />
          
          {/* Scientific blueprint physics lines */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:3rem_3rem]" />
        </div>

        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          
          {/* Main Hero Copy - Left Column */}
          <motion.div 
            className="lg:col-span-12 xl:col-span-7 space-y-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Dynamic visual tag */}
            <motion.div variants={itemVariants} className="inline-flex items-center gap-1.5 bg-[#2d2521] border border-[#443831] text-orange-250 text-[11px] font-mono font-semibold uppercase tracking-widest px-3.5 py-1.5 rounded-full shadow-md">
              <Sparkle className="w-3 text-orange-400 fill-orange-400" />
              <span>Independent DNS & Deliverability Consultant</span>
            </motion.div>
            
            {/* High Impact Typography Header */}
            <motion.h1 variants={itemVariants} className="text-4xl sm:text-5xl lg:text-3xl xl:text-5xl font-extrabold tracking-tight text-[#fdfbf9] leading-tight font-sans">
              Keep your domains secure and your emails out of the <span className="text-amber-500 font-bold">spam folder</span>.
            </motion.h1>
            
            {/* Friendly Expert Intro Card - Clean premium presentation */}
            <motion.div 
              variants={itemVariants}
              className="group relative flex flex-col sm:flex-row items-center sm:items-start gap-4 p-5 bg-[#2a221f]/80 backdrop-blur-md border border-[#3e322d] rounded-2xl shadow-xl overflow-hidden hover:border-amber-500/20 transition-all duration-300"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-amber-500/5 to-transparent rounded-full pointer-events-none" />
              
              <div className="relative w-14 h-14 rounded-full border border-[#443831] p-0.5 shadow-md flex-shrink-0 bg-[#faf8f5] overflow-hidden">
                <Image 
                  src={dannyExpertAvatar}
                  alt="Chester Carlson Avatar"
                  fill
                  className="object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="space-y-1.5 text-center sm:text-left">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                  <h3 className="text-sm font-bold text-[#faf8f5] font-sans">Chester Carlson</h3>
                  <span className="self-center sm:self-auto text-[9px] font-mono font-bold bg-amber-500/10 border border-amber-500/30 text-amber-400 px-2.5 py-0.5 rounded-full">
                    Chief Deliverability Consultant
                  </span>
                </div>
                <p className="text-xs text-zinc-350 leading-relaxed font-sans">
                  I handcheck, calibrate, and secure custom registrar setups (GoDaddy, Squarespace, Cloudflare) and email infrastructures from my office on the West Coast (Seattle, WA) without relying on automated tools.
                </p>
              </div>
            </motion.div>
 
            {/* Core Pitch */}
            <motion.p variants={itemVariants} className="text-sm text-zinc-300 leading-relaxed max-w-xl font-sans">
              I align your TXT records, repair broken SPF configurations, declare cryptographically valid DKIM sign-tags, and secure your email domains to meet modern provider entry criteria. Straightforward implementation with clear, manual validation.
            </motion.p>
 
            {/* CTAs (Tactile organic warm button effects instead of futuristic neon gradients) */}
            <motion.div variants={itemVariants} className="pt-2 flex flex-col sm:flex-row gap-4">
              <Link 
                href="mailto:info@emailapiguy.com?subject=Domain%2520Alignment%2520Inquiry"
                className="group inline-flex items-center justify-center gap-2 bg-amber-600 hover:bg-amber-500 border-b-4 border-amber-800 active:border-b-0 active:translate-y-0.5 text-white text-xs font-bold uppercase tracking-widest px-8 py-4 rounded-xl shadow-md transition-all"
              >
                Inquire About Domain Alignment
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link 
                href="/services"
                className="bg-[#2d2521] border border-[#443831] hover:bg-[#342b26] text-zinc-200 text-xs font-semibold uppercase tracking-wider px-6 py-4 rounded-xl text-center transition-all shadow-sm flex items-center justify-center gap-1.5"
              >
                Browse Our Services
              </Link>
            </motion.div>
 
            {/* Status bar */}
            <motion.div variants={itemVariants} className="flex items-center gap-3 text-xs font-mono text-zinc-450">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-amber-500" />
                <span>Deliverability Checked</span>
              </span>
              <span>•</span>
              <span>Personal Support Channel</span>
            </motion.div>
          </motion.div>
 
          {/* Right Column: West Coast Domain Ledger (Visual warmth + Stamped Certificate representation) */}
          <motion.div 
            className="lg:col-span-12 xl:col-span-5 relative space-y-6"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            
            {/* Cozy Paper Board style ledger receipt */}
            <div className="bg-[#fcfaf7] border-2 border-[#dfdad0] p-6 rounded-2xl shadow-xl relative overflow-hidden text-[#3a322c]">
              <div className="absolute top-0 right-0 w-32 h-32 bg-orange-400/5 rounded-full pointer-events-none" />
              
              {/* Retro stamped mark */}
              <div className="absolute top-3 right-4 rotate-6 border-2 border-orange-600/30 text-orange-600/40 text-[9px] font-mono font-bold tracking-widest px-2 py-0.5 rounded uppercase">
                Seattle Active • Est 2011
              </div>

              <div className="space-y-4">
                <div className="border-b border-[#ebdcc8] pb-3 mb-2">
                  <span className="text-[10px] uppercase font-mono tracking-widest font-bold text-orange-600 block">Consulting Dispatch Log</span>
                  <h3 className="text-base font-extrabold text-[#2a2420] font-sans mt-0.5">
                    Chester&apos;s Sender Verification
                  </h3>
                </div>
                
                <ul className="space-y-4 text-xs font-sans">
                  <li className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-[#f3ecdf] border border-[#dfdad0] flex items-center justify-center text-[10px] font-mono font-bold text-[#b53d12] shrink-0 mt-0.5">01</span>
                    <div>
                      <strong className="text-[#2a2420] block font-semibold text-xs">SPF Roster Reconciliation</strong>
                      <span className="text-zinc-650 text-[11px] leading-relaxed block mt-0.5">Manual reconciliation of cloud mail providers to prevent SPF limits lookup failure on recipient servers.</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-[#f3ecdf] border border-[#dfdad0] flex items-center justify-center text-[10px] font-mono font-bold text-[#b53d12] shrink-0 mt-0.5">02</span>
                    <div>
                      <strong className="text-[#2a2420] block font-semibold text-xs">2048-Bit Cryptographic Keys</strong>
                      <span className="text-zinc-650 text-[11px] leading-relaxed block mt-0.5">Physical generation and key posting of strict DKIM selectors for Cloudflare, Squarespace, and GoDaddy zones.</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-[#f3ecdf] border border-[#dfdad0] flex items-center justify-center text-[10px] font-mono font-bold text-[#b53d12] shrink-0 mt-0.5">03</span>
                    <div>
                      <strong className="text-[#2a2420] block font-semibold text-xs">DMARC Guard Alignment</strong>
                      <span className="text-zinc-650 text-[11px] leading-relaxed block mt-0.5">Gradual monitoring deployment protecting human business signatures from bad copy or rogue spam triggers.</span>
                    </div>
                  </li>
                </ul>

                <div className="border-t border-[#ebdcc8] pt-3 flex items-center justify-between text-[11px] font-mono text-zinc-500">
                  <span>AUDIT STATE: ACTIVE</span>
                  <span>ZERO OUTAGE RECORD</span>
                </div>
              </div>
            </div>

            {/* Cozy Note */}
            <div className="bg-[#2d2521] border border-[#443831] p-4.5 rounded-2xl shadow-lg relative flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-500 shrink-0 mt-0.5">
                ✒️
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed font-sans">
                &ldquo;Email routing isn&apos;t a job for server automation bots. It is an art of mechanical coordination. For 15 years, we have hand-built every single path.&rdquo;
              </p>
            </div>

          </motion.div>

        </div>
      </section>

      {/* --- COZY HAND-BUILT MAILBOX ENGINE (Scroll Flip) --- */}
      <section 
        ref={mailboxContainerRef}
        className="py-28 bg-[#faf8f5] border-b border-[#dfdad0] relative overflow-hidden" 
        id="interactive-mailbox"
      >
        {/* Organic amber back glows */}
        <div className="absolute top-1/4 right-0 w-96 h-96 rounded-full bg-orange-400/5 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 left-10 w-96 h-96 rounded-full bg-amber-500/5 blur-[120px] pointer-events-none" />

        <div className="max-w-6xl mx-auto px-4 relative z-10">
          
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
            <span className="inline-flex items-center gap-1 bg-[#ede8e0] border border-[#d6cfc5] text-[#b53d12] text-[10px] font-mono font-bold uppercase tracking-widest px-3 py-1 rounded">
              The Architectural Story
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#2c2825] leading-tight font-sans">
              Step Inside the Deliverability Engine
            </h2>
            <p className="text-sm text-zinc-600 leading-relaxed font-sans">
              While automated platforms hide the plumbing behind black-box systems, Chester Carlson exposes the brass, copper, and cryptographic pathways. 
              <span className="block mt-2 font-medium text-[#b53d12]">Scroll down to watch the screen flip and reveal the physical deliverability architecture on the backplane.</span>
            </p>
          </div>

          {/* 3D Flip perspective container */}
          <div className="w-full max-w-5xl mx-auto" style={{ perspective: "2000px" }}>
            <motion.div
              className="relative w-full h-[740px] sm:h-[680px] lg:h-[620px]"
              style={{ 
                transformStyle: "preserve-3d",
                rotateY: rotateY
              }}
            >
              
              {/* === STATIC FRONT FACE: POLISHED COZY WEBMAIL WRAP === */}
              <motion.div
                className="absolute inset-0 w-full h-full rounded-2xl border border-[#dfdad0] bg-[#FAF9F6] shadow-xl flex flex-col overflow-hidden select-none"
                style={{ 
                  backfaceVisibility: "hidden",
                  WebkitBackfaceVisibility: "hidden",
                  transformStyle: "preserve-3d",
                  transform: "rotateY(0deg)",
                  opacity: frontOpacity,
                  pointerEvents: frontPointerEvents
                }}
              >
                {/* Mail Window Frame Header */}
                <div className="bg-[#f0ece4] border-b border-[#dfdad0] px-5 py-3.5 flex items-center justify-between shrink-0">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500/35 block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#f1be74]/35 block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#a3c393]/35 block" />
                    <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#815c32] ml-2">
                      INBOX VISUAL INSIGHTS
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded text-[8.5px] font-mono font-bold tracking-wider bg-orange-100 border border-orange-200 text-orange-700 uppercase">
                      ⚠️ CRYPTO ALIGNMENT MISSING
                    </span>
                  </div>
                </div>

                {/* Simulated Inbox Grid */}
                <div className="flex-1 grid grid-cols-12 min-h-0 overflow-hidden">
                  
                  {/* Left Side: Email List Mockup (5 columns) */}
                  <div className="col-span-12 lg:col-span-5 border-r border-[#dfdad0] flex flex-col bg-[#FAF9F6] h-full">
                    {/* Folder Label */}
                    <div className="p-3 bg-zinc-50 border-b border-[#dfdad0]/80 flex items-center justify-between">
                      <span className="text-[9.5px] font-mono font-bold uppercase text-zinc-400">
                        FOLDER: JUNK / SPAM BIN
                      </span>
                      <span className="text-[9.5px] font-mono text-orange-500 font-extrabold animate-pulse">
                        (3 TRAPPED MAILS)
                      </span>
                    </div>

                    {/* Left lists items */}
                    <div className="divide-y divide-[#dfdad0]/40 overflow-hidden flex-1">
                      
                      {/* Email Item 1 (Highlighted/Opened) */}
                      <div className="p-4 bg-white border-l-4 border-amber-500 space-y-1">
                        <div className="flex justify-between items-center">
                          <strong className="text-xs font-extrabold text-[#2a2420]">Acme Billing Partners</strong>
                          <span className="text-[9px] font-mono text-zinc-400">10:41 AM</span>
                        </div>
                        <h4 className="text-xs font-semibold text-zinc-800 line-clamp-1">Overdue Invoice #20492 for System Calibration</h4>
                        <p className="text-[10px] text-zinc-500 line-clamp-1 leading-relaxed">
                          Please find attached the payment invoice detail due immediately...
                        </p>
                        <span className="inline-block text-[8px] font-mono font-extrabold uppercase bg-red-50 text-red-650 px-1.5 py-0.5 rounded border border-red-200/50">
                          ✗ SPF SENDER REJECTED
                        </span>
                      </div>

                      {/* Email Item 2 */}
                      <div className="p-4 opacity-75 space-y-1">
                        <div className="flex justify-between items-center">
                          <strong className="text-xs font-extrabold text-zinc-650">Global Reset Authority</strong>
                          <span className="text-[9px] font-mono text-zinc-400">Yesterday</span>
                        </div>
                        <h4 className="text-xs font-medium text-zinc-700 line-clamp-1">Reset link: Verify admin credentials on domain port 02</h4>
                        <p className="text-[10px] text-zinc-400 line-clamp-1">
                          You requested a master token reset. Copy code validation...
                        </p>
                        <span className="inline-block text-[8px] font-mono font-extrabold uppercase bg-red-50 text-red-650 px-1.5 py-0.5 rounded border border-red-200/50">
                          ✗ DKIM SIGNATURE INVALID
                        </span>
                      </div>

                      {/* Email Item 3 */}
                      <div className="p-4 opacity-60 space-y-1">
                        <div className="flex justify-between items-center">
                          <strong className="text-xs font-extrabold text-zinc-650">Stripe Invoicing Hook</strong>
                          <span className="text-[9px] font-mono text-zinc-400">2 days ago</span>
                        </div>
                        <h4 className="text-xs font-medium text-zinc-700 line-clamp-1">Receipt for monthly domain workspace package</h4>
                        <p className="text-[10px] text-zinc-400 line-clamp-1">
                          Your premium plan automatic renewal notification is enclosed...
                        </p>
                        <span className="inline-block text-[8px] font-mono font-extrabold uppercase bg-red-50 text-red-650 px-1.5 py-0.5 rounded border border-red-200/50">
                          ✗ SPF OUT-OF-RANGE
                        </span>
                      </div>

                    </div>
                  </div>

                  {/* Right Side: Opened Email Detail Panel (7 columns) */}
                  <div className="hidden lg:col-span-7 bg-white flex-col h-full overflow-hidden lg:flex">
                    <div className="p-6 h-full flex flex-col justify-between">
                      
                      {/* Email detail headers */}
                      <div className="border-b border-[#dfdad0]/60 pb-4 space-y-3 shrink-0">
                        <div className="flex justify-between items-start">
                          <div>
                            <span className="text-[9px] font-mono text-[#815c32] block uppercase tracking-wider">From</span>
                            <strong className="text-xs font-extrabold text-[#2a2420]">
                              Acme Billing Partners <span className="font-normal text-zinc-500 block text-[10px]">&lt;billing@yourdomain.com&gt;</span>
                            </strong>
                          </div>
                          
                          {/* Antique style approval state indicating delivery status */}
                          <div className="w-14 h-14 border-2 border-dashed border-red-800/20 p-1 rotate-6 flex flex-col items-center justify-center text-[8px] text-red-600/30 font-mono font-bold uppercase select-none">
                            <span>BOUNCED</span>
                            <span className="text-[6px] tracking-wider mt-0.5">UNTRUSTED</span>
                          </div>
                        </div>

                        <div>
                          <span className="text-[9px] font-mono text-[#815c32] block uppercase tracking-wider">Subject</span>
                          <h3 className="text-xs sm:text-sm font-extrabold text-[#2a2420] font-sans leading-snug">
                            Overdue Invoice #20492 for System Calibration
                          </h3>
                        </div>
                      </div>

                      {/* Msg text */}
                      <div className="flex-1 text-xs text-zinc-650 leading-relaxed font-sans py-4 overflow-y-auto">
                        <p className="mb-2">Hello Team,</p>
                        <p className="mb-2">Please note that dynamic transfers for your main business accounts continue to fail background validation checks. We have attempted to relay this invoice through our remote mailservers multiple times.</p>
                        <p>Because your SPF record lacks authorized permission tags, major receivers like Gmail automatically junked this crucial letter.</p>
                      </div>

                      {/* Block diagnostic alert box inside invoice */}
                      <div className="mt-auto pt-3 border-t border-[#dfdad0]/80">
                        <div className="bg-orange-50/70 border border-orange-200/60 rounded-xl p-3.5 space-y-1.5 text-left">
                          <span className="text-[9.5px] font-mono font-bold uppercase text-orange-600 block">
                            DNS Grounding Diagnostic Box
                          </span>
                          <p className="text-[10.5px] text-orange-950 font-sans leading-relaxed">
                            This corporate invoice was routed directly into quarantine because your domain record is too generic. Recipient mail relays have strict security gates, immediately blocking alignment gaps.
                          </p>
                        </div>
                      </div>

                    </div>
                  </div>

                </div>

                {/* Front Footer */}
                <div className="bg-[#f0ece4] border-t border-[#dfdad0] p-4 flex items-center justify-between shrink-0">
                  <span className="text-[10px] font-mono text-[#815c32] uppercase tracking-wider">
                    RECIPIENT FILTERS ACTIVE
                  </span>
                  <span className="text-[11px] font-sans text-zinc-500 italic">
                    Scroll down to flip and inspect the server backplane...
                  </span>
                </div>

              </motion.div>

              {/* === STATIC BACK FACE: ELEGANT MECHANICAL RACK / SALES PITCH === */}
              <motion.div
                className="absolute inset-0 w-full h-full rounded-2xl border border-[#3e322d] bg-[#1c1613] text-[#fdfbf9] shadow-2xl flex flex-col justify-between overflow-hidden"
                style={{ 
                  backfaceVisibility: "hidden", 
                  WebkitBackfaceVisibility: "hidden",
                  transformStyle: "preserve-3d",
                  transform: "rotateY(180deg)",
                  opacity: backOpacity,
                  pointerEvents: backPointerEvents
                }}
              >
                {/* Backplane Header */}
                <div className="bg-[#241c18] border-b border-[#3e322d] px-5 py-4 flex items-center justify-between shrink-0">
                  <div className="flex items-center gap-2.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-orange-500 animate-pulse" />
                    <span className="text-xs font-mono font-bold uppercase text-[#ebdcc8] tracking-widest">
                      CHESTER&apos;S PHYSICAL BACKPLANE &amp; PLUMBING
                    </span>
                  </div>
                  <span className="text-[9px] font-mono bg-orange-950 border border-orange-850 text-orange-400 px-2 py-0.5 rounded">
                    COMPLIANCE GATEWAY
                  </span>
                </div>

                {/* Tactile Wire Board & Sales Pitch Pitch Content */}
                <div className="flex-1 p-6 grid grid-cols-1 md:grid-cols-12 gap-6 items-center overflow-y-auto">
                  
                  {/* Left: 3 Hand-Aligned Manual Pegs/Ropes (7 cols) */}
                  <div className="md:col-span-7 space-y-5">
                    <div>
                      <span className="text-[10px] font-mono font-bold text-orange-400 uppercase tracking-widest block mb-1">
                        THE DELIVERABILITY PLUMBING
                      </span>
                      <h3 className="text-lg font-bold font-sans text-[#fdfbf9] leading-snug">
                        How Chester Anchors Your Reputation Manually
                      </h3>
                    </div>

                    {/* Analog Wire Slots list */}
                    <div className="space-y-3.5 text-left">
                      
                      {/* Peg SPF */}
                      <div className="bg-zinc-900/65 border border-[#3e322d] p-3.5 rounded-xl flex items-start gap-4">
                        <div className="w-10 h-10 rounded-lg bg-orange-500/10 border border-orange-500/20 shrink-0 flex flex-col justify-center items-center font-mono text-[#b53d12] font-black text-xs">
                          SPF
                        </div>
                        <div className="space-y-1">
                          <strong className="text-xs font-mono font-extrabold text-[#ebdcc8] block">01. SPF Copper Grounding Relay</strong>
                          <p className="text-[11px] text-zinc-300 leading-relaxed font-sans">
                            While automated platform tools bloat your TXT records into lookup failures, I hand-weave secure nested ranges, integrating all payment and CRM systems down beneath the strict 10-query limit.
                          </p>
                        </div>
                      </div>

                      {/* Peg DKIM */}
                      <div className="bg-zinc-900/65 border border-[#3e322d] p-3.5 rounded-xl flex items-start gap-4">
                        <div className="w-10 h-10 rounded-lg bg-orange-500/10 border border-orange-500/20 shrink-0 flex flex-col justify-center items-center font-mono text-[#b53d12] font-black text-xs">
                          DKIM
                        </div>
                        <div className="space-y-1">
                          <strong className="text-xs font-mono font-extrabold text-[#ebdcc8] block">02. DKIM Cryptographic Welds</strong>
                          <p className="text-[11px] text-zinc-300 leading-relaxed font-sans">
                            I calculate and weld solid 2048-bit digital key signatures inside your zone servers, ensuring your outgoing mail displays a reliable identity signature to verify human recipient servers.
                          </p>
                        </div>
                      </div>

                      {/* Peg DMARC */}
                      <div className="bg-zinc-900/65 border border-[#3e322d] p-3.5 rounded-xl flex items-start gap-4">
                        <div className="w-10 h-10 rounded-lg bg-orange-500/10 border border-orange-500/20 shrink-0 flex flex-col justify-center items-center font-mono text-[#b53d12] font-black text-xs font-sans">
                          DMC
                        </div>
                        <div className="space-y-1">
                          <strong className="text-xs font-mono font-extrabold text-[#ebdcc8] block">03. DMARC Regulation Valving</strong>
                          <p className="text-[11px] text-zinc-300 leading-relaxed font-sans">
                            I calibrate secure quarantine rules to intercept and sink spoofers immediately, while building reliable reporter pathways so you get raw, structural telemetry logs of every delivery attempt.
                          </p>
                        </div>
                      </div>

                    </div>
                  </div>

                  {/* Right Column: Physical blueprint calibration screen & Sales call value (5 cols) */}
                  <div className="md:col-span-5 bg-[#231b17] border border-[#3e322d] rounded-xl p-5 flex flex-col justify-between h-full space-y-4 text-left">
                    
                    <div className="space-y-3">
                      <span className="text-[9px] font-mono font-extrabold text-orange-400 uppercase tracking-widest block border-b border-[#3e322d] pb-2">
                        COMPLIANCE CERTIFICATE
                      </span>
                      <strong className="text-xs font-sans text-[#fdfbf9] block">
                        Chester Carlson&apos;s Guarantee
                      </strong>
                      <p className="text-[11px] text-[#dac6ab]/80 leading-relaxed font-sans">
                        Stop guessing your deliverability path or letting automated help bots template your DNS lookups. 
                      </p>
                      <p className="text-[11px] text-zinc-350 leading-relaxed font-sans italic border-l-2 border-orange-500/50 pl-2.5">
                        &quot;I manually calibrate corporate reputation paths until your invoices, passwords, and team partner threads route flawlessly into client main boxes.&quot;
                      </p>
                    </div>

                    <div className="pt-4 border-t border-[#3e322d]">
                      <span className="text-[8.5px] font-mono text-zinc-400 block mb-2 uppercase text-left">REPUTATION RATING TARGET</span>
                      <div className="flex items-center gap-2">
                        <div className="w-2.5 h-2.5 rounded-full bg-[#549c00] animate-ping shrink-0" />
                        <span className="text-xs font-mono font-bold text-[#549c00]">✓ 100% SECURED REPUTATION PATHWAYS</span>
                      </div>
                    </div>

                  </div>

                </div>

                {/* Back Footer */}
                <div className="bg-[#241c18] border-t border-[#3e322d] p-4 flex items-center justify-between shrink-0">
                  <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest">
                    ZONE RESOLVED SPECIFICATION
                  </span>
                  <span className="text-[10.5px] text-[#ebdcc8]/90 font-sans italic">
                    Scroll up or down to continue Chester&apos;s story...
                  </span>
                </div>

              </motion.div>

            </motion.div>
          </div>

        </div>
      </section>

      {/* --- SCENARIOS / CASE CHANNELS SECTION --- */}
      <section className="py-20 bg-zinc-50 border-b border-zinc-200">
        <div className="max-w-6xl mx-auto px-4">
          
          <div className="max-w-3xl mb-12 space-y-3">
            <span className="text-xs text-blue-600 font-mono uppercase font-semibold tracking-widest block">
              Strategic Security Risks
            </span>
            <h2 className="text-3xl font-extrabold tracking-tight text-zinc-900 leading-tight">
              Why automated domain wizards frequently fail your deliverability
            </h2>
            <p className="text-sm text-zinc-600 leading-relaxed font-sans">
              Generic registrar wizards configure default templates, but they often ignore mandatory cryptographic alignments. This can leave your brand exposed to spoofing and route outgoing messages to recipient spam folder boxes. I solve three typical failure points:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Scenario 1 */}
            <motion.div 
              className="bg-white border-t-2 border-t-orange-500 border border-zinc-200 p-6 rounded-2xl shadow-sm space-y-4 hover:shadow-lg transition-all duration-300"
              whileHover={{ y: -4 }}
            >
              <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center">
                <ShieldAlert className="w-5 h-5 text-orange-500" />
              </div>
              <div>
                <span className="text-xs font-mono font-bold text-orange-500 uppercase tracking-wider block mb-1">Risk Area 01</span>
                <h3 className="text-base font-extrabold text-zinc-900 mb-2 font-sans">Registrar Lockouts</h3>
                <p className="text-xs text-zinc-600 leading-relaxed font-sans">
                  Altering essential zone properties can cause security holds on transfer logs, requiring phone verification. I coordinate alignments with your provider directly.
                </p>
              </div>
            </motion.div>

            {/* Scenario 2 */}
            <motion.div 
              className="bg-white border-t-2 border-t-sky-500 border border-zinc-200 p-6 rounded-2xl shadow-sm space-y-4 hover:shadow-lg transition-all duration-300"
              whileHover={{ y: -4 }}
            >
              <div className="w-10 h-10 rounded-xl bg-sky-50 flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-sky-500" />
              </div>
              <div>
                <span className="text-xs font-mono font-bold text-sky-500 uppercase tracking-wider block mb-1">Risk Area 02</span>
                <h3 className="text-base font-extrabold text-zinc-900 mb-2 font-sans">Silent Domain Expirations</h3>
                <p className="text-xs text-zinc-605 leading-relaxed font-sans">
                  Domain acquisitions or registry revisions often drop critical verification anchors, turning business routes offline. I set up secure backup setups.
                </p>
              </div>
            </motion.div>

            {/* Scenario 3 */}
            <motion.div 
              className="bg-white border-t-2 border-t-blue-600 border border-zinc-200 p-6 rounded-2xl shadow-sm space-y-4 hover:shadow-lg transition-all duration-300"
              whileHover={{ y: -4 }}
            >
              <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                <Mail className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <span className="text-xs font-mono font-bold text-blue-600 uppercase tracking-wider block mb-1">Risk Area 03</span>
                <h3 className="text-base font-extrabold text-zinc-900 mb-2 font-sans">Mailbox Spam Isolation</h3>
                <p className="text-xs text-zinc-650 leading-relaxed font-sans">
                  Missing key checks causes spam filters to capture normal corporate threads. I deploy signed DKIM records to verify authentication anchors.
                </p>
              </div>
            </motion.div>

          </div>

        </div>
      </section>

      {/* --- CLIENT REVIEWS & ESTABLISHED HISTORY SECTION --- */}
      <section className="py-24 bg-white border-b border-zinc-200 relative overflow-hidden">
        {/* Warm ambient background lights */}
        <div className="absolute top-1/2 left-0 w-80 h-80 rounded-full bg-orange-400/5 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-lime-400/5 blur-[125px] pointer-events-none" />

        <div className="max-w-6xl mx-auto px-4 relative z-10">
          
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
            <span className="inline-flex items-center gap-1.5 bg-orange-50 border border-orange-200 text-orange-750 text-xs font-mono font-bold uppercase tracking-widest px-3 py-1 rounded">
              Established 2011 • 15+ Years of Domain Deliverability
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 leading-tight">
              Trusted by enterprise founders and IT directors nationwide
            </h2>
            <p className="text-sm text-zinc-600 leading-relaxed font-sans">
              Since establishing our firm on the West Coast in 2011, we have manually aligned, audited, and restored delivery reputations for over 1,200 organizations. Discover direct feedback from our consulting partners:
            </p>
          </div>

          {/* Features and Testimonials Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Left Card: Seattle Office Warm Spotlight */}
            <div className="lg:col-span-4 bg-zinc-50 border border-zinc-200 p-6 rounded-2xl flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="relative h-48 w-full rounded-xl overflow-hidden border border-zinc-200">
                  <Image 
                    src={seattleOfficeImg}
                    alt="Our warm Seattle, WA consulting headquarters"
                    fill
                    className="object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div>
                  <span className="text-[10px] font-mono font-bold text-amber-600 uppercase tracking-wider block mb-1">
                    West Coast HQ
                  </span>
                  <h3 className="text-sm font-extrabold text-zinc-900 font-sans">
                    Seattle, WA Grid Location
                  </h3>
                  <p className="text-xs text-zinc-500 leading-relaxed font-sans mt-1">
                    Our workspace is anchored in the Pacific Northwest, where we manually monitor, debug, and secure server DNS layers for high-growth tech firms and corporate senders.
                  </p>
                </div>
              </div>
              <div className="pt-4 border-t border-zinc-200 flex items-center justify-between text-xs text-zinc-655 font-mono">
                <span>FOUNDED</span>
                <span>OCTOBER 2011</span>
              </div>
            </div>

            {/* Middle Card: Authentic Testimonials Scroll */}
            <div className="lg:col-span-5 space-y-6 flex flex-col justify-between">
              
              {/* Testimonial 1 */}
              <div className="bg-orange-50/20 border border-orange-200/50 p-6 rounded-2xl space-y-4">
                <div className="flex items-center gap-1 text-orange-600">
                  ★★★★★
                </div>
                <p className="text-xs text-zinc-705 leading-relaxed font-sans italic">
                  &ldquo;EMAIL API guy is our secret backline resource. When our Squarespace domains broke our entire corporate delivery queue, Chester resolved our SPF lookup loops in just 90 minutes. Absolute human precision.&rdquo;
                </p>
                <div>
                  <h4 className="text-xs font-bold text-zinc-900 font-sans">Sarah Jenkins</h4>
                  <span className="text-[10px] font-mono text-zinc-500">Director of Ops, CloudSpan Logistics (Seattle)</span>
                </div>
              </div>

              {/* Testimonial 2 */}
              <div className="bg-amber-50/20 border border-amber-200/40 p-6 rounded-2xl space-y-4">
                <div className="flex items-center gap-1 text-amber-500">
                  ★★★★★
                </div>
                <p className="text-xs text-zinc-705 leading-relaxed font-sans italic">
                  &ldquo;For over a decade, Chester has been our direct backline support. No ticket queues, no automated chatbot loops. Hand-keyed DKIM public signatures that authenticate beautifully on receiving gateways.&rdquo;
                </p>
                <div>
                  <h4 className="text-xs font-bold text-zinc-900 font-sans">Marcus Chen</h4>
                  <span className="text-[10px] font-mono text-zinc-500">CTO, Veloce Analytics (San Francisco)</span>
                </div>
              </div>

            </div>

            {/* Right Card: Secure Hardware Warm Spotlight */}
            <div className="lg:col-span-3 bg-zinc-900 text-white p-6 rounded-2xl flex flex-col justify-between space-y-6 border border-zinc-850">
              <div className="space-y-4">
                <div className="relative h-40 w-full rounded-xl overflow-hidden border border-zinc-800">
                  <Image 
                    src={secureServersImg}
                    alt="Warm server hardware diagnostics"
                    fill
                    className="object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div>
                  <span className="text-[10px] font-mono font-bold text-orange-400 uppercase tracking-wider block mb-1">
                    Verified Uptime
                  </span>
                  <h3 className="text-xs font-extrabold text-white font-sans">
                    15+ Years Domain Resilience
                  </h3>
                  <p className="text-[11px] text-zinc-400 leading-relaxed font-sans mt-1">
                    Applying manually calibrated electronic mail signature tags, ensuring global mail filters recognize your messages instantly.
                  </p>
                </div>
              </div>
              <div className="pt-4 border-t border-zinc-800 text-center">
                <span className="text-[10px] font-mono text-orange-400 font-bold uppercase tracking-widest block">
                  100% SENDER COMPLIANT
                </span>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* --- REASSURANCE COVENANTS / FEATURES PANEL --- */}
      <section className="py-20 bg-white border-b border-zinc-200">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-6 space-y-5">
            <span className="text-xs text-blue-600 font-mono font-bold uppercase tracking-wider block">
              Our Professional Standards
            </span>
            <h2 className="text-3xl font-extrabold tracking-tight text-zinc-900">
              Built with precision, supported by humans.
            </h2>
            <p className="text-sm text-zinc-655 leading-relaxed mb-6">
              I reject generic system defaults. Whether we are migrating nameservers or auditing cryptographic SPF policies, we apply a clear, multi-point verification protocol that leaves nothing to guess.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 bg-zinc-50 border border-zinc-200 rounded-xl">
                <h4 className="text-xs font-bold uppercase text-zinc-900 mb-1 font-mono">⚡ Clear Fixed Price</h4>
                <p className="text-[11px] text-zinc-500">Upfront billing based on project scope. No monthly subscription loops.</p>
              </div>
              <div className="p-4 bg-zinc-50 border border-zinc-200 rounded-xl">
                <h4 className="text-xs font-bold uppercase text-zinc-900 mb-1 font-mono">📞 Direct Desk Channel</h4>
                <p className="text-[11px] text-zinc-500">Connect with an expert consultant directly. No support ticket wait lines.</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 bg-gradient-to-br from-zinc-50 via-zinc-50 to-orange-50/10 border-2 border-zinc-250 rounded-2xl p-8 relative overflow-hidden shadow-md">
            <div className="absolute top-0 right-0 w-32 h-32 bg-orange-400/5 rounded-full pointer-events-none" />
            
            <h3 className="text-xs font-mono uppercase font-black text-zinc-500 border-b border-zinc-200 pb-3 mb-4 flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-amber-500" />
              CONSULTING ASSURANCE
            </h3>

            <div className="space-y-4">
              <div className="flex gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <span className="text-xs font-bold text-zinc-900 block font-sans">Active DKIM Key Auditing</span>
                  <p className="text-[11px] text-zinc-500">We verify headers against official criteria so recipient servers accept signals.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <span className="text-xs font-bold text-zinc-900 block font-sans">Shield from Loss of Administration</span>
                  <p className="text-[11px] text-zinc-500">We guard your credentials, consolidate registry locks, and configure nameservers securely.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <span className="text-xs font-bold text-zinc-900 block font-sans">100% Manual Execution Warranty</span>
                  <p className="text-[11px] text-zinc-500">Every record is hand-checked and custom entered. Zero cookie-cutter templates.</p>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-5 border-t border-zinc-200 flex items-center gap-3">
              <Link 
                href="/services"
                className="text-xs font-bold uppercase text-blue-600 hover:text-blue-800 transition-colors flex items-center gap-1 font-mono"
              >
                BROWSE OUR SERVICES <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* --- THE MASTER DISPATCH TERMINAL (Unified final CTA columns) --- */}
      <section className="py-24 bg-[#faf8f5] border-t border-[#dfdad0] relative overflow-hidden" id="dispatch-terminal">
        {/* Decorative warm PNW soft lights */}
        <div className="absolute top-1/2 left-0 w-80 h-80 rounded-full bg-orange-400/5 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-lime-400/5 blur-[120px] pointer-events-none" />

        <div className="max-w-6xl mx-auto px-4 relative z-10 space-y-16">
          
          {/* Main Terminal Header */}
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="inline-flex items-center gap-1.5 bg-[#ede8e0] border border-[#d6cfc5] text-[#b53d12] text-[10px] font-mono font-bold uppercase tracking-widest px-3 py-1 rounded">
              DECIDE YOUR NEXT STEP
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#2c2825] leading-tight font-sans">
              Take complete control of your domain deliverability
            </h2>
            <p className="text-sm text-zinc-655 leading-relaxed font-sans max-w-2xl mx-auto">
              Choose between estimating your infrastructure cost dynamics or scheduling a direct consulting alignment with Chester Carlson.
            </p>
          </div>

          {/* Balanced Two-Column Bento Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto items-stretch">
            
            {/* Card Left: The Dynamic Cost Estimator */}
            <div className="bg-[#2a221f] border border-[#3e322d] rounded-2xl p-8 text-white flex flex-col justify-between shadow-lg relative overflow-hidden group hover:border-[#ec6231]/40 transition-colors duration-300">
              <div className="absolute top-0 right-0 w-32 h-32 bg-orange-400/5 rounded-full pointer-events-none" />
              <div className="space-y-6">
                <span className="text-[10px] uppercase font-mono tracking-widest font-bold text-orange-400 block border-b border-[#3e322d] pb-3">
                  01 // OPERATIONAL COST ESTIMATION
                </span>
                <h3 className="text-xl sm:text-2xl font-extrabold text-[#fdfbf9] font-sans">
                  Operational Cost Estimator
                </h3>
                <p className="text-xs sm:text-sm text-zinc-350 leading-relaxed font-sans">
                  Slide or adjust your configuration metrics dynamically. Evaluate setting up a dedicated human deliverability retainer against the heavy technical friction of doing it yourself.
                </p>
                
                {/* Visual teaser metrics tag inside */}
                <div className="bg-[#201917] border border-[#302622] rounded-xl p-4 space-y-2">
                  <div className="flex justify-between items-center text-[11px] font-mono text-zinc-400">
                    <span>Active Domain Sliders</span>
                    <span className="text-[#61b000]">✓ Live Updates</span>
                  </div>
                  <div className="flex justify-between items-center text-[11px] font-mono text-zinc-400">
                    <span>DKIM 2048-bit weld estimates</span>
                    <span className="text-zinc-500">Included</span>
                  </div>
                </div>
              </div>
              
              <div className="pt-8">
                <Link 
                  href="/pricing"
                  className="w-full inline-flex items-center justify-center gap-2 bg-amber-600 hover:bg-amber-500 border-b-4 border-amber-800 active:border-b-0 active:translate-y-0.5 text-white text-xs font-bold uppercase tracking-widest py-4 rounded-xl shadow-md transition-all text-center"
                  id="estimator-button"
                >
                  Run Cost Calculator ⚡
                  <Lock className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Card Right: Direct Communication Channel */}
            <div className="bg-white border-2 border-[#dfdad0] rounded-2xl p-8 text-[#2c2825] flex flex-col justify-between shadow-md relative overflow-hidden group hover:border-blue-500/30 transition-colors duration-300">
              <div className="absolute top-0 right-0 w-32 h-32 bg-orange-50 rounded-full pointer-events-none opacity-50" />
              <div className="space-y-6">
                <span className="text-[10px] uppercase font-mono tracking-widest font-bold text-amber-600 block border-b border-[#dfdad0] pb-3">
                  02 // DIRECT HUMAN CHANNEL
                </span>
                <h3 className="text-xl sm:text-2xl font-extrabold text-[#2c2825] font-sans">
                  Direct Expert Consultation
                </h3>
                <p className="text-xs sm:text-sm text-zinc-650 leading-relaxed font-sans">
                  If you are already suffering from active spam folder blocks, registrar lockouts, or missing SPF records, skip the automated support queues and write directly to Chester.
                </p>

                {/* Direct info badge inside */}
                <div className="bg-[#FAF9F6] border border-[#dfdad0] rounded-xl p-4 space-y-2">
                  <div className="flex justify-between items-center text-[11px] font-mono text-[#815c32]">
                    <span>West Coast Dedicated Desk</span>
                    <span className="text-emerald-600 font-bold">● Active Online</span>
                  </div>
                  <div className="flex justify-between items-center text-[11px] font-mono text-zinc-500">
                    <span>Average Initial Analysis</span>
                    <span>&lt; 90 minutes</span>
                  </div>
                </div>
              </div>

              <div className="pt-8">
                <Link 
                  href="mailto:info@emailapiguy.com?subject=Consultation%2520with%2520Chester"
                  className="w-full inline-flex items-center justify-center gap-2 bg-amber-600 hover:bg-amber-500 border-b-4 border-amber-800 active:border-b-0 active:translate-y-0.5 text-white text-xs font-bold uppercase tracking-widest py-4 rounded-xl shadow-md transition-all text-center"
                  id="contact-button"
                >
                  Connect with Chester Carlson (Email) ✉️
                </Link>
              </div>
            </div>

          </div>

        </div>
      </section>

    </div>
  );
}
