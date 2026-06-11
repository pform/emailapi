'use client';

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Send, 
  CheckCircle2, 
  Mail, 
  Settings, 
  Loader2, 
  ExternalLink, 
  Info, 
  ShieldCheck, 
  AlertCircle,
  FileText,
  UserCheck,
  ChevronRight,
  RefreshCw,
  LogOut,
  HelpCircle
} from "lucide-react";
import Link from "next/link";
import { signInWithPopup, signOut, onAuthStateChanged, User } from "firebase/auth";
import { auth, googleProvider } from "@/lib/firebase";
import MungedEmail from "@/components/MungedEmail";

interface FormConfig {
  configured: boolean;
  formId?: string;
  responderUri?: string;
  creatorEmail?: string;
  updatedAt?: string;
}

export default function ContactClient() {
  // Config state
  const [formConfig, setFormConfig] = useState<FormConfig>({ configured: false });
  const [loadingConfig, setLoadingConfig] = useState(true);

  // Auth & Admin panel state
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  // Form provisioning state
  const [isProvisioning, setIsProvisioning] = useState(false);
  const [provisionResult, setProvisionResult] = useState<{ success: boolean; error?: string } | null>(null);
  const [activeStep, setActiveStep] = useState<string>("");

  const fetchConfig = async () => {
    try {
      const res = await fetch("/api/contact-config");
      if (res.ok) {
        const data = await res.json();
        setFormConfig(data);
      }
    } catch (err) {
      console.error("Failed to fetch contact form configuration:", err);
    } finally {
      setLoadingConfig(false);
    }
  };

  // Load config on startup
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchConfig();
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  // Sync auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
    return () => unsubscribe();
  }, []);

  const handleGoogleSignIn = async () => {
    setIsSigningIn(true);
    setAuthError(null);
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err: any) {
      console.error("Auth failed:", err);
      setAuthError(err.message || "Failed to sign in with Google.");
    } finally {
      setIsSigningIn(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error("Sign out failed:", err);
    }
  };

  const provisionGoogleForm = async () => {
    if (!currentUser) return;
    setIsProvisioning(true);
    setProvisionResult(null);
    setActiveStep("Step 1 of 3: Authenticating session credentials...");

    try {
      // Get OAuth access token
      const idTokenResult = await currentUser.getIdTokenResult(true);
      // Wait, standard user.getIdToken() is for Firebase, we need the Google Access Token!
      // To get the google Access Token from Firebase signInWithPopup, it is usually returned in the initial credential.
      // But we can also retrieve it or use the token. To bypass client storage restrictions:
      // The sign-in object contains credential.accessToken. Let's make sure we pass the credentials.
      // In Firebase SDK, the access token is from the credential result. Let's trigger signInWithPopup directly if token is lost,
      // or we can request it. Let's make sure if we have the access token. 
      // If the user already logged in, we can perform a signInWithPopup to get a fresh credential, which is extremely safe!
      setActiveStep("Step 2 of 3: Preparing Workspace request...");
      const result = await signInWithPopup(auth, googleProvider);
      // @ts-ignore
      const credential = googleProvider.constructor.credentialFromResult(result);
      const accessToken = credential?.accessToken;

      if (!accessToken) {
        throw new Error("Could not extract Google Workspace access token. Try signing out and signing in again.");
      }

      setActiveStep("Step 3 of 3: Programmatically creating Google Form & questions...");
      const createRes = await fetch("/api/forms/create", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });

      const createData = await createRes.json();
      if (!createRes.ok || !createData.success) {
        throw new Error(createData.error || "Failed during Google Forms workspace generation phase.");
      }

      // Save form details on server
      setActiveStep("Persisting configured parameters locally...");
      const saveRes = await fetch("/api/contact-config", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          formId: createData.formId,
          responderUri: createData.responderUri,
          creatorEmail: currentUser.email,
        }),
      });

      if (saveRes.ok) {
        const savedData = await saveRes.json();
        setFormConfig(savedData.config);
        setProvisionResult({ success: true });
      } else {
        throw new Error("Successfully created Google Form, but failed to save settings to the server metadata store.");
      }

    } catch (err: any) {
      console.error("Failed to provision Google Form:", err);
      setProvisionResult({ success: false, error: err.message || "Unknown programmatic generation error." });
    } finally {
      setIsProvisioning(false);
      setActiveStep("");
    }
  };

  const handleResetConfig = async () => {
    if (!window.confirm("Are you sure you want to revert to direct email fallback? This will remove the embedded Google Form.")) return;
    try {
      const res = await fetch("/api/contact-config", { method: "DELETE" });
      if (res.ok) {
        setFormConfig({ configured: false });
        setProvisionResult(null);
      }
    } catch (err) {
      console.error("Failed to reset config:", err);
    }
  };

  // Fallback direct email mailto action
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

  const embedUrl = formConfig.formId 
    ? `https://docs.google.com/forms/d/${formConfig.formId}/viewform?embedded=true` 
    : "";

  return (
    <div className="relative min-h-screen bg-white text-zinc-900 font-sans" id="contact-page-root">
      
      {/* Decorative radial dots background matching other landing pages */}
      <div className="absolute inset-0 bg-[radial-gradient(#f0ebe1_1px,transparent_1px)] [background-size:16px_16px] opacity-40 pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 py-16 sm:py-20 relative z-10">
        
        {/* Header Title section */}
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-10">
          <span className="text-[10px] sm:text-xs font-mono font-bold text-amber-600 bg-amber-50 border border-amber-200 px-3 py-1 rounded-full uppercase tracking-wider">
            Secure Communications Portal
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 leading-tight">
            Contact Chester Carlson
          </h1>
          <p className="text-sm text-zinc-650 leading-relaxed max-w-xl mx-auto">
            Providing reliable, direct email configurations. This portal operates with official Google integration to completely bypass delivery issues and keep you directly aligned.
          </p>
        </div>

        {/* Loading configuration status indicator */}
        {loadingConfig ? (
          <div className="flex flex-col items-center justify-center p-16 space-y-4 border border-zinc-150 rounded-2xl bg-zinc-50/50">
            <Loader2 className="w-8 h-8 text-amber-600 animate-spin" />
            <span className="text-xs font-mono text-zinc-500">Retrieving secure forms credentials...</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Main column (Form iframe or direct mail fallback) (7/12 cols) */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* IFRAME EMBED VIEW */}
              {formConfig.configured && formConfig.formId ? (
                <div className="bg-white border border-zinc-200 rounded-2xl overflow-hidden shadow-sm flex flex-col" id="google-form-iframe-outer">
                  <div className="bg-zinc-950 text-white p-4 flex items-center justify-between border-b border-zinc-805">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-[#61b000]" />
                      <span className="text-xs font-mono font-bold uppercase tracking-wider">Official Google Forms Integration</span>
                    </div>
                    <span className="text-[10px] text-zinc-400 bg-zinc-850 px-2 py-0.5 rounded font-mono">100% Secure SSL</span>
                  </div>
                  
                  {/* Google Form Embed Frame */}
                  <div className="relative w-full h-[640px] bg-zinc-50">
                    <iframe 
                      src={embedUrl}
                      className="w-full h-full border-0 rounded-b-2xl"
                      title="Google Form Troubleshooting Support Form"
                      id="google-form-embed-iframe"
                    >
                      Loading…
                    </iframe>
                  </div>

                  <div className="bg-zinc-50 p-4 border-t border-zinc-150 text-center">
                    <p className="text-[11px] text-zinc-400 leading-relaxed max-w-md mx-auto">
                      Form is secured and managed inside Google Workspace. When you hit submit above, your troubleshooting payload is delivered instantly to Chester.
                    </p>
                  </div>
                </div>
              ) : (
                /* Fallback Email Launcher Page when no Google Form configure yet */
                <motion.div 
                  className="bg-white border border-zinc-200 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  id="direct-fallback-card"
                >
                  <div className="space-y-2 border-b border-zinc-100 pb-5">
                    <h2 className="text-lg font-bold text-zinc-900 flex items-center gap-2">
                      <Mail className="w-5 h-5 text-amber-600" />
                      Direct Email Connection
                    </h2>
                    <p className="text-xs text-zinc-500 leading-relaxed font-sans">
                      Our interactive contact form is undergoing diagnostic maintenance. To prevent any automated dropouts, click the button below to instantly draft or send a secure diagnostic inquiry directly.
                    </p>
                  </div>

                  {/* High contrast Email Copy Box */}
                  <div className="bg-zinc-50/70 border border-zinc-200 rounded-xl p-5 text-center space-y-4" id="fallback-email-ref">
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
                  </div>

                  {/* 1-Click prefilled draft launcher */}
                  <div className="space-y-3">
                    <h3 className="text-xs font-bold text-zinc-700 uppercase tracking-wider font-mono">
                      ⚡ Open Pre-filled Email Draft (1-Click)
                    </h3>
                    <p className="text-xs text-zinc-500 leading-normal">
                      Launch a preconfigured message immediately containing DNS attributes (target domain, host, mail platform) so Chester can immediately trace your problems:
                    </p>
                    
                    <button
                      type="button"
                      onClick={triggerEmailDraft}
                      className="w-full inline-flex items-center justify-center gap-2 bg-amber-600 hover:bg-amber-500 text-white font-bold uppercase text-xs tracking-wider py-4 rounded-xl shadow-md border border-amber-700 transition-all cursor-pointer"
                      id="fallback-draft-btn"
                    >
                      <Send className="w-4 h-4 text-white" />
                      <span>Prepare Pre-filled Email Draft ✉</span>
                    </button>
                  </div>
                </motion.div>
              )}

            </div>

            {/* Right Instructions / Suggested Info card (5/12 cols) */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* Suggestion block */}
              <div className="bg-amber-50/50 border border-amber-200/60 rounded-2xl p-6 space-y-4">
                <div className="flex items-center gap-2 text-amber-800">
                  <Info className="w-5 h-5" />
                  <h3 className="text-xs font-bold uppercase tracking-wider font-mono">
                    Audit Recommendations
                  </h3>
                </div>
                <p className="text-xs text-zinc-650 leading-relaxed font-sans">
                  To trace SMTP failures and SPF/DKIM misalignments with maximum accuracy, make sure to state:
                </p>
                
                <ul className="space-y-3 pt-1">
                  <li className="flex items-start gap-2.5 text-xs text-zinc-600 font-sans">
                    <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <span><strong>Broken Domain:</strong> The website sending emails that are bouncing or triggering spam triggers.</span>
                  </li>
                  <li className="flex items-start gap-2.5 text-xs text-zinc-600 font-sans">
                    <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <span><strong>Mail Provider:</strong> Which company hosts your mailbox (e.g. Google Workspace, Office 365, Hostinger).</span>
                  </li>
                  <li className="flex items-start gap-2.5 text-xs text-zinc-600 font-sans">
                    <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <span><strong>DNS Registrar:</strong> Where your domain is purchased (e.g. Cloudflare, Squarespace, GoDaddy).</span>
                  </li>
                </ul>
              </div>

              {/* Integrity guarantee block */}
              <div className="bg-zinc-50 border border-zinc-200 rounded-2xl p-6 space-y-3">
                <div className="flex items-center gap-2 text-zinc-850">
                  <FileText className="w-4 h-4 text-[#1d4ed8]" />
                  <h4 className="text-xs font-bold uppercase tracking-wider font-mono text-zinc-805">
                    Chester&apos;s Service Pledge
                  </h4>
                </div>
                <p className="text-[11.5px] text-zinc-500 leading-relaxed font-sans">
                  No automated triage responders or layered support tickets. Chester Carlson resolves and reviews all DNS and mail records manually, providing customized solutions tailored purely to your unique deliverability.
                </p>
              </div>

              {/* Admin configuration portal toggle button */}
              <div className="flex justify-center pt-2">
                <button
                  type="button"
                  onClick={() => setIsAdminMode(!isAdminMode)}
                  className="inline-flex items-center gap-1.5 text-[11px] font-mono font-bold text-zinc-400 hover:text-zinc-700 transition-colors uppercase border border-dashed border-zinc-200 hover:border-zinc-400 px-3 py-1.5 rounded-lg cursor-pointer"
                  id="admin-session-toggle"
                >
                  <Settings className="w-3.5 h-3.5" />
                  <span>{isAdminMode ? "Collapse Setup Panel" : "⚙️ Administrator: Configure Google Forms"}</span>
                </button>
              </div>

            </div>

          </div>
        )}

        {/* ADMIN CONFIGURATION BOARD */}
        <AnimatePresence>
          {isAdminMode && (
            <motion.div
              className="mt-12 bg-slate-50 border border-zinc-200 rounded-2xl overflow-hidden shadow-lg"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4 }}
              id="admin-form-designer-panel"
            >
              {/* Header */}
              <div className="bg-zinc-950 text-white p-5 flex items-center justify-between border-b border-zinc-800">
                <div className="flex items-center gap-2">
                  <Settings className="w-5 h-5 text-amber-500" />
                  <span className="text-xs font-mono font-bold uppercase tracking-wider">Google Forms Setup Module</span>
                </div>
                <span className="text-[10px] uppercase font-mono font-bold px-2 py-1 bg-zinc-800 text-zinc-300 rounded border border-zinc-700">
                  Secure Admin Mode
                </span>
              </div>

              <div className="p-6 space-y-6">
                
                {/* Auth segment */}
                {!currentUser ? (
                  <div className="p-8 text-center space-y-4 max-w-md mx-auto">
                    <UserCheck className="w-10 h-10 text-amber-600 mx-auto" />
                    <div className="space-y-1">
                      <h3 className="text-sm font-bold text-zinc-900">Sign in with Google</h3>
                      <p className="text-xs text-zinc-500 leading-normal">
                        To programmatically create a secure troubleshooting form inside your own Google Drive and embed it, please verify your Google workspace authority below.
                      </p>
                    </div>

                    <button
                      type="button"
                      disabled={isSigningIn}
                      onClick={handleGoogleSignIn}
                      className="gsi-material-button w-full shadow-sm"
                      style={{ cursor: "pointer" }}
                    >
                      <div className="gsi-material-button-state"></div>
                      <div className="gsi-material-button-content-wrapper">
                        <div className="gsi-material-button-icon">
                          <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" style={{ display: "block" }}>
                            <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
                            <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
                            <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
                            <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
                            <path fill="none" d="M0 0h48v48H0z"></path>
                          </svg>
                        </div>
                        <span className="gsi-material-button-contents font-sans text-xs">Sign in with Google</span>
                      </div>
                    </button>

                    {authError && (
                      <p className="text-[11px] text-red-500 font-mono bg-red-50 border border-red-200 p-2 rounded">
                        Error: {authError}
                      </p>
                    )}
                  </div>
                ) : (
                  <div className="space-y-6">
                    {/* Logged in header */}
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 bg-white border border-zinc-200 rounded-xl gap-4">
                      <div className="flex items-center gap-3">
                        {currentUser.photoURL ? (
                          <img 
                            src={currentUser.photoURL} 
                            alt="Google User" 
                            className="w-10 h-10 rounded-full border border-zinc-200 referrer-check"
                            referrerPolicy="no-referrer"
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-zinc-200 flex items-center justify-center font-bold text-zinc-700">
                            {currentUser.email?.charAt(0).toUpperCase()}
                          </div>
                        )}
                        <div>
                          <p className="text-xs font-bold text-zinc-900 leading-none">{currentUser.displayName || "Google Operator"}</p>
                          <p className="text-[10px] font-mono text-zinc-500 mt-1">{currentUser.email}</p>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={handleSignOut}
                        className="inline-flex items-center gap-1.5 text-[10px] text-zinc-500 hover:text-red-650 font-mono border border-zinc-200 hover:border-red-200 px-2.5 py-1.5 rounded bg-white hover:bg-red-50 transition-colors"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        <span>Disconnect Google SSO</span>
                      </button>
                    </div>

                    {/* Form integration status & controls */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      
                      {/* Provision control box */}
                      <div className="bg-white border border-zinc-200 rounded-xl p-5 space-y-4">
                        <h4 className="text-xs font-bold uppercase tracking-wider font-mono text-zinc-750">Form Management Control</h4>
                        <p className="text-xs text-zinc-500 leading-relaxed">
                          Click below to make a brand new questionnaire inside Google Forms. Once clicked, we will instantly inject the 4 troubleshooting questions and load it onto the contact page!
                        </p>

                        <div className="space-y-2 pt-2">
                          <button
                            type="button"
                            disabled={isProvisioning}
                            onClick={provisionGoogleForm}
                            className="w-full inline-flex items-center justify-center gap-2 bg-[#1d4ed8] hover:bg-[#1e40af] text-white font-bold uppercase text-xs tracking-wider py-4 rounded-xl shadow-md border-b-4 border-blue-900 active:border-b-0 active:translate-y-0.5 transition-all text-center cursor-pointer disabled:opacity-50"
                          >
                            {isProvisioning ? (
                              <>
                                <Loader2 className="w-4.5 h-4.5 text-white animate-spin" />
                                <span>Generating Google Form...</span>
                              </>
                            ) : (
                              <>
                                <RefreshCw className="w-4 h-4 text-white" />
                                <span>{formConfig.configured ? "Re-Create Google Form" : "Create My Google Form"}</span>
                              </>
                            )}
                          </button>

                          {formConfig.configured && (
                            <button
                              type="button"
                              onClick={handleResetConfig}
                              className="w-full text-center bg-zinc-100 hover:bg-rose-50 border border-zinc-300 hover:border-rose-300 text-zinc-600 hover:text-rose-700 text-[10px] uppercase font-mono tracking-wider py-2.5 rounded-lg active:scale-[0.99] transition-all"
                            >
                              Disconnect & Reset to Fallback Email
                            </button>
                          )}
                        </div>

                        {activeStep && (
                          <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg animate-pulse flex items-center gap-2">
                            <Loader2 className="w-4 h-4 text-[#1d4ed8] animate-spin shrink-0" />
                            <span className="text-[11px] font-mono text-blue-800">{activeStep}</span>
                          </div>
                        )}

                        {provisionResult?.success && (
                          <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                            <span className="text-[11px] font-mono text-emerald-850">✓ Google Form successfully generated! See editor tasks to activate email forwarding.</span>
                          </div>
                        )}

                        {provisionResult?.success === false && (
                          <div className="p-3 bg-rose-50 border border-rose-250 rounded-lg flex items-center gap-2">
                            <AlertCircle className="w-4 h-4 text-rose-500 shrink-0" />
                            <span className="text-[11px] font-mono text-rose-800">Error: {provisionResult.error}</span>
                          </div>
                        )}
                        
                      </div>

                      {/* Onboarding step instruction box */}
                      <div className="bg-amber-50/40 border border-amber-250 rounded-xl p-5 space-y-3.5">
                        <div className="flex items-center gap-1.5 text-amber-800">
                          <HelpCircle className="w-4 h-4" />
                          <h4 className="text-xs font-bold uppercase tracking-wider font-mono">
                            Mandatory setup task: Turn on Email Forwards
                          </h4>
                        </div>
                        <p className="text-xs text-zinc-600 leading-normal">
                          For Google to automatically deliver completed submissions to your inbox (<strong>info@emailapiguy.com</strong>), you must confirm this native configuration inside Google:
                        </p>

                        {formConfig.configured && formConfig.formId ? (
                          <div className="space-y-3 pt-1">
                            {/* Step 1 */}
                            <div className="bg-white border border-amber-150 p-3 rounded-lg flex items-start gap-3">
                              <span className="bg-amber-100 text-amber-900 border border-amber-200 text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center shrink-0">1</span>
                              <div className="space-y-1">
                                <span className="text-xs text-zinc-900 font-sans block">Open your form editor workspace:</span>
                                <a 
                                  href={`https://docs.google.com/forms/d/${formConfig.formId}/edit`}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="inline-flex items-center gap-1 text-[11px] font-bold text-[#1d4ed8] hover:underline"
                                >
                                  Open Google Form Editor <ExternalLink className="w-3 h-3" />
                                </a>
                              </div>
                            </div>
                            {/* Step 2 */}
                            <div className="bg-white border border-amber-150 p-3 rounded-lg flex items-start gap-3">
                              <span className="bg-amber-100 text-amber-900 border border-amber-200 text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center shrink-0">2</span>
                              <div className="space-y-1">
                                <span className="text-xs text-zinc-900 font-sans block">Configure direct emails:</span>
                                <p className="text-[11px] text-zinc-500 leading-normal">
                                  1. At the top of your Google Forms screen, click on the **Responses** tab.<br/>
                                  2. Click the three dots menu **(⋮)** on the right.<br/>
                                  3. Check **&apos;Get email notifications for new responses&apos;**.<br/>
                                  4. All set! Every submission is now forwarded straight to your inbox safely.
                                </p>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="p-4 bg-zinc-100 border border-zinc-200 text-center rounded-xl text-xs text-zinc-400 font-mono">
                            [Awaiting Google Form Generation]
                          </div>
                        )}
                        
                      </div>

                    </div>
                  </div>
                )}

              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
