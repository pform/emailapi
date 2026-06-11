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
import MungedEmail from "@/components/MungedEmail";

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

      // Immediately execute native email delivery fallback to guarantee Chester Carlson receives it!
      const subjectValue = `🚨 DNS DISTRESS TICKET: ${contactForm.domain || "Unknown Domain"} from ${contactForm.name || "Customer"}`;
      const bodyValue = `Support Request Details:\n\n` + 
                        `• Name: ${contactForm.name || "(Not entered)"}\n` +
                        `• Contact Email: ${contactForm.email || "(Not entered)"}\n` +
                        `• Broken Domain: ${contactForm.domain || "(Not entered)"}\n` +
                        `• Core Pain Category: ${contactForm.pains || "(Not entered)"}\n` +
                        `• Specific Messages / Notes:\n${contactForm.notes || "(None entered)"}\n\n` +
                        `Please help me audit my server reputation and align MX/SPF parameters.`;
      
      window.location.href = `mailto:info@emailapiguy.com?subject=${encodeURIComponent(subjectValue)}&body=${encodeURIComponent(bodyValue)}`;
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
          className="text-center max-w-2xl mx-auto space-y-4 mb-12"
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
          <p className="text-sm text-zinc-600 leading-relaxed max-w-xl mx-auto">
            I will personally audit your server records, check cryptographic SPF/DKIM details, and resolve your mailbox sender reputation issues.
          </p>
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
              <div className="space-y-6 relative z-10 animate-fade-in" id="contact-form-wrapper-block">
                {/* Prominent high-visibility Munged direct email helper info */}
                <div className="text-center pb-4 border-b border-dashed border-zinc-200 mb-6" id="prominent-direct-email-ref">
                  <span className="text-[11px] font-mono font-bold text-zinc-400 uppercase tracking-widest block mb-1">
                    DIRECT EMAIL CHANNEL
                  </span>
                  <div className="flex justify-center items-center gap-1.5 flex-wrap text-sm text-zinc-650">
                    <span>Reach Chester directly at:</span>
                    <MungedEmail textClassName="font-extrabold text-[#61b000] hover:text-amber-600 font-mono text-sm border-b border-[#61b000]/30" showIcon={false} showCopy={true} />
                  </div>
                </div>

                <form onSubmit={handleContactSubmit} className="space-y-6">
                
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
              </div>
            ) : (
              <motion.div 
                className="py-10 space-y-6 animate-fade-in text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center mx-auto shadow-md">
                  <CheckCircle2 className="w-8 h-8 text-[#61b000]" />
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-xl font-extrabold text-zinc-900 font-sans">Support Ticket Recorded!</h3>
                  <p className="text-sm text-zinc-650 max-w-md mx-auto leading-relaxed">
                    Hello <strong className="text-zinc-900">{contactForm.name}</strong>, your support request has been logged successfully for domain <strong className="font-mono text-[#61b000] bg-zinc-50 border border-zinc-200 px-1.5 py-0.5 rounded">{contactForm.domain || "configuration"}</strong>.
                  </p>
                </div>

                <div className="bg-zinc-50 border border-zinc-200 p-5 rounded-2xl max-w-sm mx-auto text-left space-y-3 shadow-sm">
                  <p className="text-xs text-zinc-500 font-sans leading-relaxed">
                    🚨 <strong>Inbox Deliverability Guarantee:</strong> To bypass firewalls and filters, we pre-formatted your native mail client (Gmail/Outlook/Apple Mail) to send this ticket directly to <strong className="text-zinc-900 font-mono">info@emailapiguy.com</strong>.
                  </p>
                  <p className="text-xs text-zinc-500 font-sans leading-relaxed">
                    Please review and click <strong>Send</strong> in your mail application. If your agent did not trigger automatically, click below to try again:
                  </p>
                  
                  <button
                    type="button"
                    onClick={() => {
                      const subjectValue = `🚨 DNS DISTRESS TICKET: ${contactForm.domain || "Unknown Domain"} from ${contactForm.name || "Customer"}`;
                      const bodyValue = `Support Request Details:\n\n` + 
                                        `• Name: ${contactForm.name || "(Not entered)"}\n` +
                                        `• Contact Email: ${contactForm.email || "(Not entered)"}\n` +
                                        `• Broken Domain: ${contactForm.domain || "(Not entered)"}\n` +
                                        `• Core Pain Category: ${contactForm.pains || "(Not entered)"}\n` +
                                        `• Specific Messages / Notes:\n${contactForm.notes || "(None entered)"}\n\n` +
                                        `Please help me audit my server reputation and align MX/SPF parameters.`;
                      window.location.href = `mailto:info@emailapiguy.com?subject=${encodeURIComponent(subjectValue)}&body=${encodeURIComponent(bodyValue)}`;
                    }}
                    className="w-full inline-flex items-center justify-center gap-2 text-xs font-sans font-bold uppercase text-white bg-zinc-950 hover:bg-zinc-850 py-3 rounded-xl cursor-pointer shadow transition-all duration-200"
                  >
                    <Send className="w-3.5 h-3.5 text-[#61b000]" />
                    <span>Launch Pre-Filled Email ✉</span>
                  </button>
                </div>

                <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <Link
                    href="/"
                    className="text-center bg-zinc-100 hover:bg-zinc-200 border border-zinc-200 text-zinc-700 text-xs font-bold uppercase tracking-wider px-6 py-3 rounded-xl shadow-sm transition-transform hover:-translate-y-0.5 cursor-pointer"
                  >
                    Return to Home
                  </Link>
                  <button 
                    onClick={() => {
                      setFormSubmitted(false);
                      setContactForm({
                        name: "",
                        email: "",
                        domain: "",
                        pains: "godaddy",
                        notes: ""
                      });
                    }}
                    className="text-[11px] font-sans font-medium text-zinc-500 hover:text-zinc-800 transition-colors border-b border-zinc-200 pb-0.5 cursor-pointer"
                  >
                    Submit Another Inquiry
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
                <div className="space-y-0.5">
                  <span className="text-[10px] font-mono font-bold text-[#61b000] uppercase tracking-wider block">
                    CHIEF DELIVERABILITY CONSULTANT
                  </span>
                  <h3 className="text-base font-extrabold text-zinc-900 font-sans">
                    Chester Carlson
                  </h3>
                  <div className="flex items-center gap-1.5 text-xs text-zinc-500 font-mono mt-1">
                    <MungedEmail textClassName="text-xs text-zinc-700 font-bold" iconClassName="w-3.5 h-3.5" showCopy={true} />
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

      </div>
    </div>
  );
}
