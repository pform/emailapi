'use client';

import React from "react";
import { motion } from "motion/react";
import Link from "next/link";
import { Send, CheckCircle2, ChevronRight, Mail, ShieldAlert, FileText, Info } from "lucide-react";
import MungedEmail from "@/components/MungedEmail";

export default function ContactClient() {
  const triggerEmailDraft = () => {
    const subjectValue = "🚨 DNS AUDIT REQUEST: Domain Check & Alignment";
    const bodyValue = `Hello Chester,\n\n` + 
                      `I am writing to request a direct technical DNS/deliverability audit.\n\n` +
                      `• Target Domain: (Include your domain, e.g. domain.com)\n` +
                      `• Mail Provider: (e.g. Google Workspace / Microsoft 365 / other)\n` +
                      `• Domain Registrar: (e.g. GoDaddy / Cloudflare / Squarespace)\n` +
                      `• Core Issues/Symptoms: (e.g. emails going to spam, validation fails, etc.)\n\n` +
                      `Please audit my parameters and let me know the recommended course of action.\n\n` +
                      `Regards,\n(Your Name)`;
    
    window.location.href = `mailto:info@emailapiguy.com?subject=${encodeURIComponent(subjectValue)}&body=${encodeURIComponent(bodyValue)}`;
  };

  return (
    <div className="relative min-h-screen bg-white text-zinc-900 font-sans" id="contact-page-root">
      
      {/* Decorative clean radial background */}
      <div className="absolute inset-0 bg-[radial-gradient(#f0ebe1_1px,transparent_1px)] [background-size:16px_16px] opacity-40 pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 py-16 sm:py-20 relative z-10">
        
        {/* Header Title with animations */}
        <motion.div 
          className="text-center max-w-2xl mx-auto space-y-4 mb-12"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-[10px] sm:text-xs font-mono font-bold text-amber-600 bg-amber-50 border border-amber-200 px-3 py-1 rounded-full uppercase tracking-wider">
            Direct Communications Portal
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 leading-tight">
            Contact Chester Carlson
          </h1>
          <p className="text-sm text-zinc-600 leading-relaxed max-w-xl mx-auto">
            I will personally audit your server records, check cryptographic SPF/DKIM details, and resolve your mailbox sender reputation issues without any automated bot intermediaries.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start mt-8">
          
          {/* Left Column: Direct Action & Email Details (7 cols) */}
          <motion.div 
            className="md:col-span-7 bg-white border border-zinc-200/80 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6"
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            id="contact-info-card"
          >
            <div className="space-y-2 border-b border-zinc-100 pb-5">
              <h2 className="text-lg font-bold text-zinc-900 font-sans flex items-center gap-2">
                <Mail className="w-5 h-5 text-amber-600" />
                Direct Email Connection
              </h2>
              <p className="text-xs text-zinc-500 leading-relaxed font-sans">
                To bypass fragile delivery APIs and firewalls entirely, click below or copy our address to send a direct message. Everything you need is laid out for your instant deliverability.
              </p>
            </div>

            {/* Prominent high-contrast Email Box */}
            <div className="bg-zinc-50/70 border border-zinc-200 rounded-xl p-5 text-center space-y-4" id="prominent-direct-email-ref">
              <span className="text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-widest block">
                SPECIALIST INBOX
              </span>
              <div className="flex justify-center items-center gap-2 flex-wrap">
                <MungedEmail 
                  textClassName="font-extrabold text-[#1d4ed8] hover:text-amber-600 font-mono text-base border-b border-[#1d4ed8]/30 pb-0.5" 
                  showIcon={true} 
                  showCopy={true} 
                />
              </div>
              <p className="text-[11px] text-zinc-400 font-sans leading-normal max-w-sm mx-auto">
                Clicking the address will automatically launch your preferred email client (Gmail, Outlook, Mac Mail) and copy the exact address to your clipboard.
              </p>
            </div>

            {/* 1-Click Pre-filled Draft Action */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold text-zinc-700 uppercase tracking-wider font-mono">
                ⚡ Send Pre-formatted Inquiry (1-Click)
              </h3>
              <p className="text-xs text-zinc-500 leading-normal">
                Want to save time? Launch a preconfigured draft instantly containing all key analysis details (target domain, registrar, and mail setup) so I can immediately diagnose your problems:
              </p>
              
              <button
                type="button"
                onClick={triggerEmailDraft}
                className="w-full inline-flex items-center justify-center gap-2 bg-amber-600 hover:bg-amber-500 text-white font-bold uppercase text-xs tracking-wider py-4 rounded-xl shadow-md border border-amber-700 transition-all cursor-pointer active:scale-[0.99]"
                id="prefilled-draft-btn"
              >
                <Send className="w-4 h-4 text-white" />
                <span>Open Pre-filled Email Draft ✉</span>
              </button>
            </div>

            {/* Back to Portal CTA */}
            <div className="pt-2 border-t border-zinc-100 flex justify-center">
              <Link
                href="/"
                className="text-center bg-zinc-100 hover:bg-zinc-200 border border-zinc-300 text-zinc-700 text-xs font-bold uppercase tracking-wider px-6 py-3 rounded-lg shadow-sm transition-all cursor-pointer"
              >
                Return to Portal
              </Link>
            </div>
          </motion.div>

          {/* Right Column: Helper / Instructions (5 cols) */}
          <motion.div 
            className="md:col-span-5 space-y-6"
            initial={{ opacity: 0, x: 15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {/* Advice Panel info card */}
            <div className="bg-amber-50/50 border border-amber-200/60 rounded-2xl p-6 space-y-4">
              <div className="flex items-center gap-2 text-amber-800">
                <Info className="w-5 h-5" />
                <h3 className="text-xs font-bold uppercase tracking-wider font-mono">
                  Suggested Information
                </h3>
              </div>
              <p className="text-xs text-zinc-650 leading-relaxed font-sans">
                To guarantee the fastest possible diagnostic response from Chester, try to include the following parameters in your email:
              </p>
              
              <ul className="space-y-3 pt-1">
                <li className="flex items-start gap-2.5 text-xs text-zinc-600 font-sans">
                  <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <span><strong>Target Domain:</strong> The website or email sending domain that is actively flagging or failing.</span>
                </li>
                <li className="flex items-start gap-2.5 text-xs text-zinc-600 font-sans">
                  <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <span><strong>Hosting / Registrar:</strong> Where your domain is registered (e.g. GoDaddy, Cloudflare, Squarespace).</span>
                </li>
                <li className="flex items-start gap-2.5 text-xs text-zinc-600 font-sans">
                  <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <span><strong>Current Provider:</strong> Your primary business mailbox provider (e.g. Workspace, M365, Zoho).</span>
                </li>
                <li className="flex items-start gap-2.5 text-xs text-zinc-600 font-sans">
                  <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <span><strong>Errors Experienced:</strong> (e.g. &apos;DKIM missing&apos;, &apos;SPF Fail&apos;, &apos;Blocked by Yahoo/Gmail&apos;).</span>
                </li>
              </ul>
            </div>

            {/* Secure Infrastructure Promise card */}
            <div className="bg-zinc-50 border border-zinc-200 rounded-2xl p-6 space-y-3">
              <div className="flex items-center gap-2 text-zinc-850">
                <FileText className="w-4 h-4 text-[#1d4ed8]" />
                <h4 className="text-xs font-bold uppercase tracking-wider font-mono text-zinc-805">
                  Chester&apos;s Auditing Promise
                </h4>
              </div>
              <p className="text-[11.5px] text-zinc-500 leading-relaxed font-sans">
                Every DNS record diagnostic check, SPF validation sequence, and key mapping is completed manually by Chester Carlson. No offshore agencies, outsourced support tiers, or automated bot relays. You will receive customized technical audit reports and step-by-step resolution records.
              </p>
            </div>

          </motion.div>

        </div>

      </div>
    </div>
  );
}
