'use client';

import React, { useState } from "react";
import { motion } from "motion/react";
import Link from "next/link";
import { 
  Send, 
  CheckCircle2, 
  XCircle, 
  Loader2, 
  ShieldCheck, 
  Settings, 
  Terminal, 
  Mail, 
  Server, 
  Eye, 
  EyeOff 
} from "lucide-react";

export default function TestClient() {
  // Testing details config
  const [host, setHost] = useState("smtp.hostinger.com");
  const [port, setPort] = useState("465");
  const [secure, setSecure] = useState(true);
  const [authEmail, setAuthEmail] = useState("info@emailapiguy.com");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Form input details
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [clientDomain, setClientDomain] = useState("");
  const [clientMessage, setClientMessage] = useState("");

  // UI state
  const [loading, setLoading] = useState(false);
  const [apiResult, setApiResult] = useState<any>(null);
  const [success, setSuccess] = useState<boolean | null>(null);

  const handleSmtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setApiResult(null);
    setSuccess(null);

    try {
      const response = await fetch("/api/test-smtp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          host,
          port: Number(port),
          secure,
          authEmail,
          password,
          clientName,
          clientEmail,
          clientDomain,
          clientMessage,
        }),
      });

      const data = await response.json();
      setApiResult(data);
      setSuccess(data.success);
    } catch (err: any) {
      console.error(err);
      setSuccess(false);
      setApiResult({
        success: false,
        error: err.message || "Unknown error occurred",
        message: "Failed to dispatch network request to local server proxy.",
      });
    } finally {
      setLoading(false);
    }
  };

  const autoFillSampleData = () => {
    setClientName("John Doe Testing");
    setClientEmail("tester@gmail.com");
    setClientDomain("testdomain.com");
    setClientMessage("Hello, this is a real-time diagnostic test to verify Hostinger SMTP sending on the server side!\n\nAll SPF, DKIM and MX checks clear.");
  };

  return (
    <div className="relative min-h-screen bg-slate-50 text-zinc-900 font-sans" id="test-page-root">
      
      {/* Visual background lines */}
      <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1.5px,transparent_1.5px)] [background-size:20px_20px] opacity-60 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 py-12 sm:py-16 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-10">
          <span className="text-[10px] font-mono font-bold text-amber-700 bg-amber-100 border border-amber-200 px-3 py-1 rounded-full uppercase tracking-wider">
            Diagnostic sandbox
          </span>
          <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900 leading-tight">
            Hostinger SMTP Live Test
          </h1>
          <p className="text-sm text-zinc-500 leading-relaxed font-sans">
            Securely verify mail transmission by supplying your mail password temporarily to test a direct SMTP connection. No credentials are saved on server disks.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Input Contact Form + Mail Credentials (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            <form onSubmit={handleSmtpSubmit} className="bg-white border border-zinc-200 rounded-2xl shadow-sm overflow-hidden" id="smtp-setup-form">
              
              {/* Box Header */}
              <div className="bg-zinc-950 text-white p-5 border-b border-zinc-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Settings className="w-5 h-5 text-amber-500" />
                  <span className="text-sm font-mono font-bold uppercase tracking-wider">Hostinger Server Configuration</span>
                </div>
                <button
                  type="button"
                  onClick={autoFillSampleData}
                  className="bg-zinc-800 hover:bg-zinc-700 text-amber-400 text-[10px] uppercase font-mono font-bold px-2.5 py-1.5 rounded transition-colors"
                >
                  ⚡ Auto-fill Sample Content
                </button>
              </div>

              {/* Hostinger SMTP Parameters */}
              <div className="p-6 border-b border-zinc-100 bg-zinc-50/50 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase font-bold text-zinc-550 block font-mono">Incoming IMAP Server (Info Only)</label>
                    <input 
                      type="text" 
                      value="imap.hostinger.com" 
                      disabled
                      className="w-full bg-zinc-150 border border-zinc-250 text-zinc-500 text-xs px-3 py-2 rounded font-mono"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase font-bold text-zinc-550 block font-mono">Outgoing SMTP Server</label>
                    <input 
                      type="text" 
                      value={host} 
                      onChange={(e) => setHost(e.target.value)}
                      placeholder="smtp.hostinger.com"
                      className="w-full bg-white border border-zinc-300 text-zinc-800 text-xs px-3 py-2 rounded focus:outline-none focus:border-amber-500 font-mono"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase font-bold text-zinc-550 block font-mono">SMTP Port</label>
                    <input 
                      type="text" 
                      value={port} 
                      onChange={(e) => {
                        const val = e.target.value;
                        setPort(val);
                        if (val === "465") setSecure(true);
                        else if (val === "587") setSecure(false);
                      }}
                      placeholder="465"
                      className="w-full bg-white border border-zinc-300 text-zinc-800 text-xs px-3 py-2 rounded focus:outline-none focus:border-amber-500 font-mono"
                      required
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase font-bold text-zinc-550 block font-mono">SSL/TLS Security</label>
                    <div className="flex items-center h-9">
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          checked={secure} 
                          onChange={(e) => {
                            const val = e.target.checked;
                            setSecure(val);
                            setPort(val ? "465" : "587");
                          }}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-zinc-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-zinc-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-600"></div>
                        <span className="ml-2 text-xs font-mono font-bold text-zinc-650">{secure ? "SSL (465)" : "STARTTLS (587)"}</span>
                      </label>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase font-bold text-zinc-550 block font-mono">Authorized Account</label>
                    <input 
                      type="email" 
                      value={authEmail} 
                      disabled
                      className="w-full bg-zinc-150 border border-zinc-250 text-zinc-500 text-xs px-3 py-2 rounded font-mono"
                    />
                  </div>
                </div>

                {/* Password input as requested explicitly by the user */}
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center">
                    <label className="text-[10px] uppercase font-bold text-zinc-900 block font-mono">
                      🔑 Hostinger Account Password <span className="text-red-500 font-sans">*</span>
                    </label>
                    <span className="text-[10px] text-zinc-400 font-sans">Required to authenticate SMTP session</span>
                  </div>
                  <div className="relative">
                    <input 
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter info@emailapiguy.com Hostinger mail password"
                      className="w-full bg-white border border-zinc-300 text-zinc-800 text-xs px-3 py-2.5 pr-10 rounded focus:outline-none focus:border-[#1d4ed8]"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3 text-zinc-400 hover:text-zinc-600 cursor-pointer"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

              </div>

              {/* Contact Form Fields */}
              <div className="p-6 space-y-4">
                <h3 className="text-xs font-bold text-zinc-555 uppercase tracking-wider font-mono border-b border-zinc-100 pb-2">
                  📬 Contact Page Simulation Form Fields
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-zinc-700 block">Your Name</label>
                    <input 
                      type="text" 
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      placeholder="e.g. Danny Glix"
                      className="w-full bg-white border border-zinc-300 text-zinc-800 text-xs px-3 py-2 rounded focus:outline-none focus:border-[#1d4ed8]"
                      required
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-zinc-700 block">Your Corporate Email Address</label>
                    <input 
                      type="email" 
                      value={clientEmail}
                      onChange={(e) => setClientEmail(e.target.value)}
                      placeholder="e.g. client@domain.com"
                      className="w-full bg-white border border-zinc-300 text-zinc-800 text-xs px-3 py-2 rounded focus:outline-none focus:border-[#1d4ed8]"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-zinc-700 block">Target Domain To Check</label>
                  <input 
                    type="text" 
                    value={clientDomain}
                    onChange={(e) => setClientDomain(e.target.value)}
                    placeholder="e.g. brokenalignment.com"
                    className="w-full bg-white border border-zinc-300 text-zinc-800 text-xs px-3 py-2 rounded focus:outline-none focus:border-[#1d4ed8] font-mono"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-zinc-700 block">Description of Email API / Deliverability Issues</label>
                  <textarea 
                    value={clientMessage}
                    onChange={(e) => setClientMessage(e.target.value)}
                    placeholder="Provide details about SPF failure, spam folder destination or DNS issues..."
                    rows={4}
                    className="w-full bg-white border border-zinc-300 text-zinc-800 text-xs p-3 rounded focus:outline-none focus:border-[#1d4ed8]"
                    required
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full inline-flex items-center justify-center gap-2 bg-[#1d4ed8] hover:bg-[#1e40af] text-white font-bold uppercase text-xs tracking-widest py-4 rounded-xl shadow-md border-b-4 border-blue-900 active:border-b-0 active:translate-y-0.5 transition-all text-center cursor-pointer disabled:opacity-50"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 text-white animate-spin" />
                        <span>Sending Mail via SMTP...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 text-white" />
                        <span>Dispatch SMTP Transmission 🚀</span>
                      </>
                    )}
                  </button>
                </div>

              </div>

            </form>

            {/* General Return Navigation */}
            <div className="flex justify-center">
              <Link 
                href="/" 
                className="text-center font-mono font-bold text-xs uppercase text-zinc-500 hover:text-zinc-800 hover:underline cursor-pointer"
              >
                ← Return to Official Landing Page
              </Link>
            </div>

          </div>

          {/* Right: Server Feedback Console & Steps log (5 cols) */}
          <div className="lg:col-span-12 xl:col-span-5 space-y-6">
            
            {/* Connection Guide panel */}
            <div className="bg-white border border-zinc-200 rounded-2xl p-6 shadow-sm space-y-4">
              <div className="flex items-center gap-2 text-zinc-850 pb-2 border-b border-zinc-100">
                <Server className="w-5 h-5 text-amber-600" />
                <h3 className="text-xs font-black uppercase tracking-wider font-mono">
                  Hostinger Credentials Reference
                </h3>
              </div>
              
              <div className="space-y-3.5 text-xs text-zinc-650 font-sans leading-relaxed">
                <p>
                  Hostinger SMTP operations require secure authentication. Follow these verification configurations:
                </p>

                <div className="bg-amber-50/50 border border-amber-250 p-4 rounded-xl space-y-2">
                  <div className="flex justify-between border-b border-amber-200 pb-1.5">
                    <strong className="text-[10px] uppercase text-amber-800 font-mono">Incoming IMAP Check</strong>
                    <span className="text-[10px] bg-amber-100 border border-amber-250 text-amber-900 font-bold font-mono px-1.5 rounded">PORT 993 SSL</span>
                  </div>
                  <p className="text-[11px] text-amber-950 font-mono leading-normal select-all">
                    Server: imap.hostinger.com
                  </p>
                </div>

                <div className="bg-zinc-50 border border-zinc-200 p-4 rounded-xl space-y-2">
                  <div className="flex justify-between border-b border-zinc-200 pb-1.5">
                    <strong className="text-[10px] uppercase text-zinc-600 font-mono">Outgoing SMTP Session</strong>
                    <span className="text-[10px] bg-emerald-50 border border-emerald-250 text-emerald-800 font-bold font-mono px-1.5 rounded">PORT 465 SSL</span>
                  </div>
                  <p className="text-[11px] text-zinc-800 font-mono leading-normal select-all">
                    Server: smtp.hostinger.com
                  </p>
                </div>

                <p className="text-[11px] text-zinc-400">
                  🛡️ <strong>Encryption Guarantee:</strong> All fields are processed purely server-side. Your input password is not stored temporarily or persistently in our file registers or remote stores.
                </p>
              </div>
            </div>

            {/* Live Terminal Log Feedback */}
            <div className="bg-zinc-950 text-zinc-300 border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl font-mono">
              <div className="bg-zinc-900 border-b border-zinc-800 px-5 py-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Terminal className="text-emerald-500 w-4 h-4" />
                  <span className="text-xs uppercase font-bold tracking-wider text-zinc-200">SMTP Diagnostics Console</span>
                </div>
                <div className="flex gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 block" />
                </div>
              </div>

              <div className="p-5 space-y-4">
                
                {/* Connection Status Flag */}
                <div className="flex items-center justify-between text-xs pb-3 border-b border-zinc-900">
                  <span>TRANS-TRANSMISSION RESULT:</span>
                  {success === null && (
                    <span className="text-zinc-500 font-bold animate-pulse">● IDLE / AWAITING PAYLOAD</span>
                  )}
                  {success === true && (
                    <span className="text-emerald-500 font-bold inline-flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      ● TRANSMITTED SECURELY
                    </span>
                  )}
                  {success === false && (
                    <span className="text-red-500 font-bold inline-flex items-center gap-1">
                      <XCircle className="w-3.5 h-3.5" />
                      ● SOCKET SESSION FAILED
                    </span>
                  )}
                </div>

                {success === true && (
                  <div className="p-3 bg-emerald-950/40 border border-emerald-900/50 rounded-lg text-xs leading-normal space-y-1 text-emerald-400">
                    <p className="font-bold">✓ HANDSHAKE ACCEPTED</p>
                    <p className="text-[11px] text-zinc-400">
                      Nodemailer successfully established SSL secure tunnel with Hostinger server and dispatched standard test receipt headers. An email is arriving at <strong>info@emailapiguy.com</strong>.
                    </p>
                  </div>
                )}

                {success === false && (
                  <div className="p-3 bg-rose-950/40 border border-rose-900/50 rounded-lg text-xs leading-normal space-y-1 text-rose-400">
                    <p className="font-bold">❌ CONNECTION / AUTHENTICATION REJECTED</p>
                    <p className="text-[11px] text-zinc-400">
                      Check that Hostinger account password is exact. Verify if SMTP access is fully authorized on your host manager panel.
                    </p>
                  </div>
                )}

                {/* Raw JSON Code output */}
                <div>
                  <span className="text-[10px] text-zinc-500 block mb-1">RAW EXECUTOR PAYLOAD FEEDBACK:</span>
                  <pre className="text-xs bg-zinc-900 border border-zinc-800 p-4 rounded-xl text-zinc-400 overflow-x-auto whitespace-pre-wrap select-all leading-normal max-h-80 font-mono">
                    {apiResult ? JSON.stringify(apiResult, null, 2) : `{\n  "status": "awaiting_transaction",\n  "system_logs": "Waiting for SMTP execution launch..."\n}`}
                  </pre>
                </div>

              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
