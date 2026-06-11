'use client';

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import { 
  CheckCircle2, 
  ArrowRight, 
  Zap, 
  RefreshCw, 
  Send, 
  Sparkles, 
  Mail, 
  ShieldCheck, 
  User, 
  AlertTriangle 
} from "lucide-react";
import dannyExpertAvatar from "@/src/assets/images/danny_expert_avatar_1781000326099.png";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 120, damping: 14 }
  }
};

export default function ContactPage() {
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    domain: "",
    pains: "godaddy",
    notes: "",
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [testModeUsed, setTestModeUsed] = useState(false);
  const [submissions, setSubmissions] = useState<any[]>([]);
  const [submissionsLoading, setSubmissionsLoading] = useState(false);
  const [emailConfigured, setEmailConfigured] = useState(false);

  React.useEffect(() => {
    const fetchSubmissions = async () => {
      setSubmissionsLoading(true);
      try {
        const res = await fetch("/api/contact");
        if (res.ok) {
          const data = await res.json();
          setSubmissions(data.submissions || []);
          setEmailConfigured(data.emailConfigured);
        }
      } catch (err) {
        console.error("Error fetching submissions:", err);
      } finally {
        setSubmissionsLoading(false);
      }
    };
    fetchSubmissions();
  }, [formSubmitted]);

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormLoading(true);
    setFormError(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(contactForm),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to dispatch distress ticket.");
      }

      setFormSubmitted(true);
    } catch (err) {
      console.error("[Submit Error]:", err);
      setFormError(err instanceof Error ? err.message : "An unexpected server error occurred.");
    } finally {
      setFormLoading(false);
    }
  };

  // Pre-fill valid parameters to test live connection in one click!
  const loadTestValues = () => {
    setContactForm({
      name: "Chester Tester",
      email: "info@emailapiguy.com",
      domain: "diagnostic-test-sanity.com",
      pains: "spam",
      notes: "Testing connection. Please ensure that this telemetry is captured correctly in database logs.",
    });
    setTestModeUsed(true);
  };

  return (
    <div className="relative min-h-screen bg-white text-zinc-900 font-sans" id="contact-page-root">
      
      {/* Clean Physical Grid style background line details */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e4e4e7_1px,transparent_1px),linear-gradient(to_bottom,#e4e4e7_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-35 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 py-16 relative z-10">
        
        {/* Header Title with animations */}
        <motion.div 
          className="text-center max-w-2xl mx-auto space-y-4 mb-16"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-flex items-center gap-1.5 bg-zinc-50 border border-zinc-200 text-zinc-700 text-xs font-mono font-bold uppercase tracking-widest px-3.5 py-1.5 rounded-full shadow-sm">
            DIRECT CONSULTING CHANNEL
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 leading-tight">
            Submit Your Technical Support Inquiry
          </h1>
          <p className="text-sm text-zinc-650 leading-relaxed max-w-xl mx-auto">
            I will personally audit your server records, check cryptographic SPF/DKIM key definitions, and resolve your mailbox sender reputation issues without relying on automated support bots.
          </p>

          {/* Test Trigger Helper block to test connection form sending */}
          <div className="pt-2">
            <button
              type="button"
              onClick={loadTestValues}
              className="inline-flex items-center gap-2 bg-zinc-100 hover:bg-zinc-200 text-zinc-700 transition-colors text-[11px] font-mono font-bold px-3 py-1.5 border border-zinc-300 rounded-md shadow-sm"
              title="Populates form with complete test dataset to verify connection parameters"
            >
              <RefreshCw className={`w-3 h-3 text-[#61b000] ${testModeUsed ? 'animate-spin' : ''}`} />
              Auto-Fill Diagnostic Parameters
            </button>
          </div>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-12 gap-10 max-w-5xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          
          {/* Main Form column: spanned for 7 columns */}
          <motion.div 
            className="lg:col-span-7 bg-white border border-zinc-250 p-6 sm:p-8 rounded-2xl shadow-xl relative overflow-hidden"
            variants={itemVariants}
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/5 rounded-full pointer-events-none" />
            
            {!formSubmitted ? (
              <form onSubmit={handleContactSubmit} className="space-y-6 relative z-10">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5 align-middle">
                    <label className="block text-xs uppercase font-mono font-bold text-zinc-700">
                      Your First Name <span className="text-orange-500">*</span>
                    </label>
                    <input 
                      type="text" 
                      required
                      placeholder="e.g. Chester"
                      value={contactForm.name}
                      onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                      className="w-full bg-zinc-50/50 hover:bg-white focus:bg-white border border-zinc-300 focus:border-[#61b000] focus:ring-1 focus:ring-[#61b000] focus:outline-none rounded-xl p-3 text-sm text-zinc-900 transition-all font-sans"
                    />
                  </div>
                  
                  <div className="space-y-1.5">
                    <label className="block text-xs uppercase font-mono font-bold text-zinc-700">
                      Corporate Email <span className="text-orange-500">*</span>
                    </label>
                    <input 
                      type="email" 
                      required
                      placeholder="e.g. you@yourbusiness.com"
                      value={contactForm.email}
                      onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                      className="w-full bg-zinc-50/50 hover:bg-white focus:bg-white border border-zinc-300 focus:border-[#61b000] focus:ring-1 focus:ring-[#61b000] focus:outline-none rounded-xl p-3 text-sm text-zinc-900 transition-all font-sans"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs uppercase font-mono font-bold text-zinc-700">
                    Broken Domain Name
                  </label>
                  <input 
                    type="text" 
                    placeholder="e.g. MyBrokenInbox.com"
                    value={contactForm.domain}
                    onChange={(e) => setContactForm({ ...contactForm, domain: e.target.value })}
                    className="w-full bg-zinc-50/50 hover:bg-white focus:bg-white border border-zinc-300 focus:border-[#61b000] focus:ring-1 focus:ring-[#61b000] focus:outline-none rounded-xl p-3 text-sm font-mono text-zinc-900 transition-all"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs uppercase font-mono font-bold text-zinc-700">
                    Describe Your Primary Technical Issue
                  </label>
                  <select 
                    value={contactForm.pains}
                    onChange={(e) => setContactForm({ ...contactForm, pains: e.target.value })}
                    className="w-full bg-zinc-50/50 hover:bg-white border border-zinc-300 focus:border-[#61b000] focus:ring-1 focus:ring-[#61b000] focus:outline-none rounded-xl p-3.5 text-xs text-zinc-900 transition-all cursor-pointer font-bold uppercase tracking-wider"
                  >
                    <option value="godaddy">My GoDaddy DNS records got reset or locked</option>
                    <option value="namecheap">Namecheap support is locked in a generic routing loop</option>
                    <option value="squarespace">Squarespace / Google Domains layout broke my MX servers</option>
                    <option value="spam">My corporate emails go straight to receiver junk folders</option>
                    <option value="lost">I don&apos;t know which domain registrar owns my records</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs uppercase font-mono font-bold text-zinc-700">
                    Any specific messages or errors you received?
                  </label>
                  <textarea 
                    rows={4}
                    placeholder="E.g. Outlook says I lack SPF records or DKIM headers..."
                    value={contactForm.notes}
                    onChange={(e) => setContactForm({ ...contactForm, notes: e.target.value })}
                    className="w-full bg-zinc-50/50 hover:bg-white focus:bg-white border border-zinc-300 focus:border-[#61b000] focus:ring-1 focus:ring-[#61b000] focus:outline-none rounded-xl p-3.5 text-sm text-zinc-900 transition-all font-sans"
                  />
                </div>

                {formError && (
                  <motion.div 
                    className="p-3 bg-rose-50 border border-rose-200 text-rose-600 rounded-xl text-xs leading-relaxed font-semibold flex items-center gap-2"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                  >
                    <AlertTriangle className="w-4 h-4 flex-shrink-0 text-rose-500" />
                    <span>Error response: {formError}</span>
                  </motion.div>
                )}

                <div>
                  <button 
                    type="submit"
                    disabled={formLoading}
                    className="group relative w-full overflow-hidden bg-gradient-to-r from-orange-500 via-[#61b000] to-emerald-600 hover:from-orange-600 hover:to-emerald-700 text-white font-extrabold uppercase tracking-widest text-xs py-4.5 rounded-xl shadow-lg hover:shadow-xl transition-all cursor-pointer disabled:opacity-75"
                  >
                    <span className="flex items-center justify-center gap-2">
                      {formLoading ? (
                        <>
                          <RefreshCw className="w-4 h-4 animate-spin text-white" />
                          SUBMITTING REQUEST...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4 text-white group-hover:translate-x-0.5 transition-transform" />
                          Send Inquiry to Chester Carlson✉️
                        </>
                      )}
                    </span>
                  </button>
                </div>

              </form>
            ) : (
              <motion.div 
                className="text-center py-10 space-y-5 animate-fade-in"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center mx-auto shadow">
                  <CheckCircle2 className="w-8 h-8 text-[#61b000]" />
                </div>
                <h3 className="text-xl font-extrabold text-zinc-900 font-sans">Request Successfully Received!</h3>
                <p className="text-xs text-zinc-650 max-w-sm mx-auto leading-relaxed">
                  I have received your setup scope. I will personally analyze your domain <strong className="font-mono text-orange-600 bg-orange-50 px-1 py-0.5 rounded">{contactForm.domain || "configuration"}</strong> and respond directly.
                </p>
                
                <div className="pt-4 flex flex-col items-center gap-3">
                  <Link
                    href="/"
                    className="inline-flex items-center gap-1.5 bg-zinc-950 hover:bg-zinc-850 text-white text-xs font-bold uppercase tracking-wider px-8 py-3.5 rounded-xl shadow transition-transform hover:-translate-y-0.5"
                  >
                    Return to Portal Homepage
                  </Link>
                  <button 
                    onClick={() => setFormSubmitted(false)}
                    className="text-[10px] font-mono font-bold text-zinc-400 hover:text-zinc-600 transition-colors border-b border-zinc-200"
                  >
                    {"// Submit another support inquiry"}
                  </button>
                </div>
              </motion.div>
            )}

          </motion.div>

          {/* Sidebar column: spanned for 5 columns - The Professional Expert Card */}
          <motion.div 
            className="lg:col-span-5 space-y-6"
            variants={itemVariants}
          >
            
            {/* The Danny Expert Human Guarantee Card */}
            <div className="bg-gradient-to-br from-zinc-50 via-zinc-50 to-orange-50/10 border-2 border-zinc-250 rounded-2xl p-6 shadow-md relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#61b000]/5 rounded-full pointer-events-none" />
              
              <div className="flex items-start gap-4 pb-5 border-b border-zinc-200 mb-5">
                <div className="relative w-16 h-16 rounded-full border-2 border-[#61b000] overflow-hidden bg-zinc-100 flex-shrink-0">
                  <Image 
                    src={dannyExpertAvatar}
                    alt="Chester Expert email deliverability officer portrait"
                    fill
                    className="object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="space-y-0.5 pointer-events-none">
                  <span className="text-[10px] font-mono font-bold text-[#61b000] uppercase tracking-wider block">
                    CHIEF DELIVERABILITY CONSULTANT
                  </span>
                  <h3 className="text-base font-extrabold text-zinc-900 font-sans">
                    Chester Carlson
                  </h3>
                  <div className="flex items-center gap-1.5 text-xs text-zinc-500 font-mono">
                    <Mail className="w-3.5 h-3.5 text-zinc-400" />
                    <span>info@emailapiguy.com</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex gap-3">
                  <ShieldCheck className="w-5 h-5 text-[#61b000] mt-0.5 flex-shrink-0" />
                  <div className="space-y-0.5 pointer-events-none">
                    <h4 className="text-xs font-bold text-zinc-900">Zero Automated Robo-Chats</h4>
                    <p className="text-[11px] text-zinc-500">I handle every record line myself. No copy-pasted ticket templates.</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Zap className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" />
                  <div className="space-y-0.5 pointer-events-none">
                    <h4 className="text-xs font-bold text-zinc-900">Meticulous Turnaround</h4>
                    <p className="text-[11px] text-zinc-500">Most DNS deliverability issues diagnosed and addressed within hours.</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Sparkles className="w-5 h-5 text-lime-600 mt-0.5 flex-shrink-0" />
                  <div className="space-y-0.5 pointer-events-none">
                    <h4 className="text-xs font-bold text-zinc-900">Expert Manual Audits</h4>
                    <p className="text-[11px] text-zinc-500">I check actual headers and server parameters to secure mail deliverability.</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-5 border-t border-zinc-200 pointer-events-none">
                <div className="bg-white/80 border border-zinc-200 rounded-lg p-3 text-[10px] font-mono text-zinc-500 leading-relaxed">
                  <span className="font-bold text-zinc-700 block mb-1">📋 SECURITY PROTOCOLS ENFORCED</span>
                  Your metadata and logs are transferred via TLS and saved inside encrypted system states. No credit card required.
                </div>
              </div>

            </div>

            {/* Sub-card: Core Rescue Areas */}
            <div className="bg-zinc-50 border border-zinc-200 p-5 rounded-xl space-y-3 pointer-events-none">
              <span className="text-[10px] font-mono font-black text-zinc-200 uppercase tracking-widest block">
                CORE SYSTEM CAPABILITIES
              </span>
              <ul className="text-xs text-zinc-650 space-y-2 font-mono">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#61b000]" />
                  Google Workspace Alignment
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-400" />
                  SPF/DKIM/DMARC Handshakes
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
                  Custom Mail Registrar Auditing
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#61b000]" />
                  100% Manual Configuration Audit
                </li>
              </ul>
            </div>

          </motion.div>

        </motion.div>

        {/* Developer Diagnostics Console */}
        <motion.div 
          className="mt-16 max-w-5xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="bg-zinc-950 text-zinc-350 border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl font-mono">
            
            {/* Header tab/rail bar */}
            <div className="bg-zinc-900 border-b border-zinc-800 px-6 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="flex gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 block" />
                </span>
                <span className="text-xs font-bold uppercase tracking-widest text-[#faf8f5]">
                  🛠️ Developer Diagnostics Panel
                </span>
              </div>
              
              <div className="flex items-center gap-2">
                <button 
                  type="button" 
                  onClick={() => {
                    const refetch = async () => {
                      setSubmissionsLoading(true);
                      try {
                        const res = await fetch("/api/contact");
                        if (res.ok) {
                          const data = await res.json();
                          setSubmissions(data.submissions || []);
                          setEmailConfigured(data.emailConfigured);
                        }
                      } catch (err) {
                        console.error(err);
                      } finally {
                        setSubmissionsLoading(false);
                      }
                    };
                    refetch();
                  }}
                  disabled={submissionsLoading}
                  className="flex items-center gap-1.5 text-[10px] bg-zinc-800 hover:bg-zinc-700 active:scale-95 text-zinc-300 font-bold px-3 py-1.5 rounded-lg transition-all border border-zinc-700 cursor-pointer disabled:opacity-50"
                >
                  <RefreshCw className={`w-3 h-3 ${submissionsLoading ? "animate-spin" : ""}`} />
                  REFETCH LOGS
                </button>
              </div>
            </div>

            {/* Diagnostic Alert Box */}
            <div className="p-6 border-b border-zinc-800 bg-zinc-900/50 space-y-4 font-sans">
              <div className="flex flex-col sm:flex-row items-start gap-4 p-4.5 rounded-xl border bg-zinc-950/80 border-amber-500/30 text-amber-200">
                <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-500 shrink-0">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <div className="space-y-1.5 min-w-0 flex-1">
                  <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider font-mono">
                    Why am I not receiving form emails in my inbox?
                  </h4>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    By default, email dispatch is <span className="text-amber-400 font-semibold decoration-wavy underline decoration-amber-500/50">simulated locally</span> because no active <code className="bg-zinc-900 px-1 py-0.5 rounded border border-zinc-800 text-amber-300 text-[11px] font-mono font-bold">RESEND_API_KEY</code> is defined in your environment variables.
                  </p>
                  <div className="text-[11px] font-mono text-zinc-500 space-y-1 pt-1">
                    <p className="text-zinc-400 font-bold mb-1">💡 How to hook up real-time email delivery:</p>
                    <ol className="list-decimal pl-4 space-y-1 text-zinc-400 font-sans">
                      <li>Obtain an API credential at <a href="https://resend.com" target="_blank" rel="noopener noreferrer" className="text-amber-500 hover:underline">resend.com</a></li>
                      <li>Open the <span className="font-bold text-zinc-300">Settings/Secrets panel in the Google AI Studio top-right menu</span></li>
                      <li>Add the environment secret: <code className="text-amber-400 bg-zinc-900 px-1 py-0.5 border border-zinc-800 rounded font-mono">RESEND_API_KEY</code> with your real token</li>
                      <li>Once registered, the form will dispatch real messages to <strong className="text-zinc-300">dannyglix@gmail.com</strong> and <strong className="text-zinc-300">info@emailapiguy.com</strong> immediately!</li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>

            {/* Submissions List */}
            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <span className="text-xs font-bold uppercase tracking-widest text-zinc-400">
                  📁 Captured Local Database Records ({submissions.length})
                </span>
                
                <div className="flex items-center gap-1.5 text-[10px] text-zinc-500 font-sans">
                  <span className={`w-2 h-2 rounded-full ${emailConfigured ? "bg-emerald-500 animate-pulse" : "bg-amber-500 animate-pulse"}`} />
                  <span>{emailConfigured ? "Live Mail Active" : "Local Sandbox/Simulation Mode"}</span>
                </div>
              </div>

              {submissions.length === 0 ? (
                <div className="border border-dashed border-zinc-800 rounded-xl p-8 text-center space-y-3 bg-zinc-900/10 font-sans">
                  <span className="text-2xl block">⚙️</span>
                  <p className="text-xs text-zinc-500 max-w-sm mx-auto">
                    No local contact submissions recorded yet in <code className="text-zinc-400 font-mono bg-zinc-900 px-1 py-0.5 border border-zinc-800 rounded">submissions.json</code>. Try submitting a form above or clicking the automatic tester helper!
                  </p>
                </div>
              ) : (
                <div className="space-y-4 max-h-96 overflow-y-auto pr-1">
                  {submissions.slice().reverse().map((sub, idx) => (
                    <div 
                      key={sub.id || idx}
                      className="border border-zinc-800/80 bg-zinc-900/30 rounded-xl p-4 space-y-3 hover:bg-zinc-900/50 transition-colors pointer-events-auto"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-800 pb-2">
                        <div className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
                          <strong className="text-xs text-zinc-200 font-sans">{sub.name}</strong>
                          <span className="text-zinc-500 bg-zinc-900 border border-zinc-805 text-[9px] px-1.5 py-0.5 rounded font-bold font-mono">CONTACT_TICKET</span>
                        </div>
                        <span className="text-[10px] text-zinc-500">{new Date(sub.timestamp).toLocaleString()}</span>
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                        <div className="space-y-1">
                          <span className="text-[9px] uppercase font-bold text-zinc-500 block">📬 Corporate Email</span>
                          <a href={`mailto:${sub.email}`} className="text-amber-500 hover:underline font-mono">{sub.email}</a>
                        </div>
                        <div className="space-y-1">
                          <span className="text-[9px] uppercase font-bold text-zinc-500 block">🌐 Target Domain</span>
                          <span className="text-zinc-300 bg-zinc-950 px-1.5 py-0.5 border border-zinc-800/60 rounded inline-block font-mono text-[11px]">{sub.domain || "No domain specified"}</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 gap-3 text-xs">
                        <div className="space-y-1 bg-zinc-950 p-2.5 rounded-lg border border-zinc-800/40">
                          <span className="text-[9px] uppercase font-bold text-amber-500 block">⚠️ Client Issue Category</span>
                          <span className="text-zinc-300 font-sans block pt-0.5 text-xs">{sub.pains || "Undergoing diagnosis"}</span>
                        </div>
                        
                        {sub.notes && (
                          <div className="space-y-1 bg-zinc-950 p-2.5 rounded-lg border border-zinc-800/40">
                            <span className="text-[9px] uppercase font-bold text-zinc-500 block">✏️ Core Feedback Notes</span>
                            <p className="text-zinc-400 font-sans whitespace-pre-wrap leading-relaxed pt-0.5 text-[11.5px]">{sub.notes}</p>
                          </div>
                        )}

                        {sub.emailStatus && (
                          <div className="space-y-1.5 bg-zinc-950 p-3 rounded-lg border border-zinc-800/40 font-mono text-[10.5px]">
                            <span className="text-[9px] uppercase font-bold text-[#faf8f5] block tracking-wider">📬 RESEND DISPATCH DIAGNOSTICS</span>
                            <div className="flex items-center gap-2 pt-1 font-sans">
                              <span className={`w-2 h-2 rounded-full ${sub.emailStatus.success ? "bg-emerald-500 animate-pulse" : "bg-rose-500 animate-pulse"}`} />
                              <span className="font-bold text-zinc-200">{sub.emailStatus.success ? "DELIVERED / ACCEPTED" : "FLAGGED / BLOCKED"}</span>
                              <span className="text-zinc-500 text-[9px] bg-zinc-900 border border-zinc-800 px-1.5 py-0.5 rounded">
                                {sub.emailStatus.simulated ? "SANDBOX SIMULATION" : "LIVE RESEND NODE"}
                              </span>
                            </div>
                            <p className="text-zinc-400 font-sans leading-relaxed text-[11px] pt-1">{sub.emailStatus.message}</p>
                            
                            {sub.emailStatus.errorDetails && (
                              <div className="mt-2 pt-2 border-t border-zinc-900">
                                <span className="text-[8.5px] uppercase font-bold text-rose-400 block tracking-wider">RAW RESEND ERROR PAYLOAD</span>
                                <pre className="text-[10px] text-rose-300/80 bg-zinc-950 border border-zinc-900 p-2.5 rounded-lg mt-1 overflow-x-auto whitespace-pre-wrap leading-normal font-mono select-all max-h-48">
                                  {JSON.stringify(sub.emailStatus.errorDetails, null, 2)}
                                </pre>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>
        </motion.div>

      </div>
    </div>
  );
}
