'use client';

import React from "react";
import { motion } from "motion/react";
import { 
  Send, 
  CheckCircle2, 
  Mail, 
  Info, 
  FileText,
  Clock,
  Briefcase,
  ExternalLink,
  ChevronRight
} from "lucide-react";
import MungedEmail from "@/components/MungedEmail";

export default function ContactClient() {
  // Direct mail mock trigger with prefilled template
  const triggerEmailDraft = () => {
    const subjectValue = "🚨 DNS AUDIT REQUEST: Domain Check & Alignment";
    const bodyValue = `Hello Chester,\n\n` + 
                      `I am writing to request a direct technical DNS/deliverability audit.\n\n` +
                      `• Target Domain: (Include your domain, e.g., domain.com)\n` +
                      `• Mail Provider: (e.g., Google Workspace / Microsoft 365 / other)\n` +
                      `• Domain Registrar: (e.g., GoDaddy / Cloudflare / Squarespace)\n` +
                      `• Core Issues/Symptoms: (e.g., emails going to spam, validation fails, etc.)\n\n` +
                      `Please audit my parameters and let me know the recommended course of action.\n\n` +
                      `Regards,\n(Your Name)`;
    
    window.location.href = `mailto:info@emailapiguy.com?subject=${encodeURIComponent(subjectValue)}&body=${encodeURIComponent(bodyValue)}`;
  };

  return (
    <div className="relative min-h-screen bg-white text-zinc-900 font-sans" id="contact-page-root">
      
      {/* Decorative subtle radial dots background */}
      <div className="absolute inset-0 bg-[radial-gradient(#f0ebe1_1px,transparent_1px)] [background-size:20px_20px] opacity-40 pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 py-16 sm:py-24 relative z-10">
        
        {/* Header Title Section */}
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-12">
          <span className="inline-flex items-center gap-1.5 text-[10px] sm:text-xs font-mono font-bold text-amber-700 bg-amber-50 border border-amber-250 px-3.5 py-1 rounded-full uppercase tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>
            Direct Communications Portal
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 leading-tight">
            Contact Chester Carlson
          </h1>
          <p className="text-sm sm:text-base text-zinc-650 leading-relaxed max-w-lg mx-auto">
            Get your deliverability fixed straight from the source. No automated ticketing delays—just reliable, secure, and direct technical consultations.
          </p>
        </div>

        {/* Content Box */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Connection Box (7 columns) */}
          <div className="md:col-span-7 flex flex-col">
            <motion.div 
              className="bg-white border border-zinc-200 rounded-2xl p-6 sm:p-8 shadow-sm flex flex-col justify-between h-full space-y-6"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              id="direct-fallback-card"
            >
              <div className="space-y-4">
                <div className="space-y-2">
                  <h2 className="text-lg font-bold text-zinc-900 flex items-center gap-2">
                    <Mail className="w-5 h-5 text-amber-600" />
                    Direct Email & Consulting
                  </h2>
                  <p className="text-xs sm:text-sm text-zinc-500 leading-relaxed">
                    Skip intermediate diagnostics. You can write directly to the specialist email address below or prepare a pre-filled technical template with a single click.
                  </p>
                </div>

                {/* High Contrast Copyable Email Box */}
                <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-5 text-center space-y-3" id="fallback-email-ref">
                  <span className="text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-widest block">
                    SPECIALIST INBOX
                  </span>
                  <div className="flex justify-center items-center">
                    <MungedEmail 
                      textClassName="font-extrabold text-[#1d4ed8] hover:text-amber-700 font-mono text-base sm:text-lg border-b border-[#1d4ed8]/20 pb-0.5 transition-colors" 
                      showIcon={true} 
                      showCopy={true} 
                    />
                  </div>
                </div>
              </div>

              {/* Prefilled Mail Draft Trigger Box */}
              <div className="space-y-4 pt-4 border-t border-zinc-150">
                <div className="space-y-1.5">
                  <h3 className="text-xs font-bold text-zinc-700 uppercase tracking-wider font-mono flex items-center gap-1.5">
                    ⚡ Instant Template Generator
                  </h3>
                  <p className="text-xs text-zinc-500 leading-relaxed">
                    Clicking below will structure a comprehensive diagnostic message draft pre-formatted with critical SPF, DKIM, and deliverability alignment parameter prompts:
                  </p>
                </div>
                
                <button
                  type="button"
                  onClick={triggerEmailDraft}
                  className="w-full inline-flex items-center justify-center gap-2.5 bg-amber-600 hover:bg-amber-500 text-white font-bold uppercase text-xs tracking-wider py-4 px-6 rounded-xl shadow-sm border border-amber-700 transition-all cursor-pointer active:scale-[0.99]"
                  id="fallback-draft-btn"
                >
                  <Send className="w-4 h-4 text-white" />
                  <span>Prepare Technical Email Draft</span>
                </button>
              </div>
            </motion.div>
          </div>

          {/* Right Reference Box (5 columns) */}
          <div className="md:col-span-5 flex flex-col space-y-6">
            
            {/* Recommendations segment */}
            <div className="bg-amber-50/50 border border-amber-200/60 rounded-2xl p-6 space-y-4 flex-1">
              <div className="flex items-center gap-2 text-amber-800">
                <Info className="w-5 h-5 shrink-0" />
                <h3 className="text-xs font-bold uppercase tracking-wider font-mono">
                  Suggested Audit Details
                </h3>
              </div>
              <p className="text-xs text-zinc-600 leading-relaxed">
                To guarantee bulletproof SMTP and SPF/DKIM validation trace results, please make sure your query includes:
              </p>
              
              <ul className="space-y-3.5 pt-1">
                <li className="flex items-start gap-2.5 text-xs text-zinc-650">
                  <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <span><strong>Affected Domain:</strong> The exact domain that is suffering from spambox filtering or bouncing errors.</span>
                </li>
                <li className="flex items-start gap-2.5 text-xs text-zinc-650">
                  <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <span><strong>Platform Provider:</strong> What serves your email services (e.g., G Suite/Workspace, Microsoft 365, cPanel).</span>
                </li>
                <li className="flex items-start gap-2.5 text-xs text-zinc-650">
                  <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <span><strong>DNS Registrar:</strong> Where your NS nameservers points (e.g., Cloudflare, GoDaddy, SquareSpace).</span>
                </li>
              </ul>
            </div>

            {/* Service Guarantee Card */}
            <div className="bg-zinc-50 border border-zinc-200 rounded-2xl p-6 space-y-3">
              <div className="flex items-center gap-2 text-zinc-850">
                <FileText className="w-4 h-4 text-[#1d4ed8]" />
                <h4 className="text-xs font-bold uppercase tracking-wider font-mono text-zinc-800">
                  Chester&apos;s Pledge
                </h4>
              </div>
              <p className="text-xs text-zinc-550 leading-relaxed">
                Every DNS alignment check, SPF optimization, and mail deliverability audit is performed by hand. No automated generic bots or template replies. Your setup is tuned specifically for your actual domain profile.
              </p>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
