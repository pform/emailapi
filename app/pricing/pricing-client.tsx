'use client';

import React, { useState } from "react";
import { motion } from "motion/react";
import { useCheckout } from "@/lib/checkout-context";
import { PRODUCTS } from "@/lib/products";
import { Calculator, Sparkles, Sliders, Shield } from "lucide-react";

export default function PricingPage() {
  const [customDomains, setCustomDomains] = useState(2);
  const [employeeInboxes, setEmployeeInboxes] = useState(5);
  const [soulDrainFactor, setSoulDrainFactor] = useState(3); // 1-5 scale of Godaddy stress value

  const { initiateCheckout } = useCheckout();

  // Handle locking calculation into a checkout item
  const handleLockIn = () => {
    // Dynamically find or construct a product representing their calculation
    const isMonthly = soulDrainFactor > 2;
    const baseProduct = PRODUCTS.find(p => p.type === (isMonthly ? "monthly" : "one-time")) || PRODUCTS[0];
    initiateCheckout({
      ...baseProduct,
      name: `Custom Sanity Plan (${customDomains} Domains, ${employeeInboxes} Inboxes)`,
      price: `$${customDomains * 125} Setup + $${50 + (employeeInboxes * 2.5)}/mo`,
    });
  };

  return (
    <div className="relative min-h-screen bg-white text-zinc-900 font-sans" id="pricing-page-root">
      
      {/* Clean Physical Grid lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e4e4e7_1px,transparent_1px),linear-gradient(to_bottom,#e4e4e7_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-30 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 py-16 relative">
        
        {/* Banner */}
        <div className="max-w-2xl mb-12 space-y-3">
          <span className="inline-block bg-gradient-to-r from-orange-500 to-[#61b000] text-white text-xs font-mono font-bold uppercase tracking-widest px-3 py-1 rounded">
            ESTIMATE YOUR CONFIGURATION COSTS
          </span>
          <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900 animate-fade-in">
            Operational Domain Cost Estimator
          </h1>
          <p className="text-sm text-zinc-650 leading-relaxed">
            Slide the metrics below to estimate setup and ongoing alignment costs. Evaluate how dedicated human experts compare to the administrative overhead of managing GoDaddy, Namecheap, or Squarespace domains yourself.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Sliders Control Panel */}
          <motion.div 
            initial={{ opacity: 0, x: -25 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="lg:col-span-7 bg-white p-6 border border-zinc-200 rounded-2xl space-y-8 shadow-sm relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-zinc-50 rounded-full pointer-events-none" />
            
            {/* Metric 1 */}
            <div className="relative z-10">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-bold text-zinc-900 font-sans flex items-center gap-1.5">
                  <Sliders className="w-4 h-4 text-[#61b000]" />
                  Total Custom Domains
                </span>
                <span className="text-xs font-mono bg-zinc-100 border border-zinc-200 px-3 py-1 rounded-lg text-zinc-800 font-bold">{customDomains} Domains</span>
              </div>
              <input 
                type="range"
                min="1"
                max="12"
                value={customDomains}
                onChange={(e) => setCustomDomains(parseInt(e.target.value))}
                className="w-full h-1.5 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-[#61b000] outline-none"
              />
              <span className="text-[10.5px] text-zinc-400 block mt-1.5 font-mono">
                {"// Manual setup of custom records to ensure reliable lookup delivery"}
              </span>
            </div>

            {/* Metric 2 */}
            <div className="relative z-10">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-bold text-zinc-900 font-sans flex items-center gap-1.5">
                  <Shield className="w-4 h-4 text-orange-500" />
                  Employee Inboxes Needed
                </span>
                <span className="text-xs font-mono bg-zinc-100 border border-zinc-200 px-3 py-1 rounded-lg text-zinc-800 font-bold">{employeeInboxes} Senders</span>
              </div>
              <input 
                type="range"
                min="1"
                max="45"
                value={employeeInboxes}
                onChange={(e) => setEmployeeInboxes(parseInt(e.target.value))}
                className="w-full h-1.5 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-[#61b000] outline-none"
              />
              <span className="text-[10.5px] text-zinc-400 block mt-1.5 font-mono">
                {"// MX, TXT, SPF, and DMARC alignment records mapped cleanly"}
              </span>
            </div>

            {/* Metric 3 */}
            <div className="relative z-10">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-bold text-zinc-900 font-sans flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-orange-550" />
                  Current Registry Configuration Friction
                </span>
                <span className="text-xs font-mono bg-orange-50 border border-orange-100 px-3 py-1 rounded-lg text-orange-600 font-bold">Level {soulDrainFactor} / 5</span>
              </div>
              <input 
                type="range"
                min="1"
                max="5"
                value={soulDrainFactor}
                onChange={(e) => setSoulDrainFactor(parseInt(e.target.value))}
                className="w-full h-1.5 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-orange-500 outline-none"
              />
              <div className="flex justify-between text-[10px] text-zinc-400 mt-1.5 font-mono">
                <span>1. Fully functional</span>
                <span>3. Missing custom headers</span>
                <span>5. DNS lockouts or total failure</span>
              </div>
            </div>

          </motion.div>

          {/* Printed Invoice Block */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.96, x: 25 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            whileHover={{ y: -4 }}
            className="lg:col-span-5 bg-white border border-zinc-200 p-8 rounded-2xl text-sm space-y-6 shadow-sm relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-orange-50/50 border-b border-l border-orange-100 flex items-center justify-center -mr-2 -mt-2 rotate-12 opacity-60 pointer-events-none">
              <span className="text-[10px] uppercase font-mono font-bold text-orange-500 tracking-wider">OFFICIAL ESTIMATE</span>
            </div>

            <h3 className="text-xs uppercase font-mono tracking-wider font-bold text-zinc-500 border-b border-zinc-200 pb-2 flex items-center gap-1.5">
              <Calculator className="w-4 h-4 text-orange-500" />
              Estimated Support Summary
            </h3>

            <div className="space-y-4 text-zinc-700">
              <div className="flex justify-between items-center text-xs">
                <span className="font-sans font-medium text-zinc-600">Setup & Onboarding Mappings:</span>
                <span className="font-mono font-bold text-zinc-900 bg-zinc-50 border border-zinc-200 px-2 py-1 rounded">${customDomains * 125} Setup</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="font-sans font-medium text-zinc-650">Monthly Deliverability Retainer:</span>
                <span className="font-mono font-bold text-zinc-900 bg-zinc-50 border border-zinc-200 px-2 py-1 rounded">${50 + (employeeInboxes * 2.5)} / mo</span>
              </div>
              <div className="flex justify-between items-center border-b border-zinc-200 pb-4 text-xs text-orange-600">
                <span className="font-sans font-medium text-orange-600">Est. Internal Support Time Saved:</span>
                <span className="font-mono font-bold bg-orange-50 border border-orange-100 px-2 py-1 rounded">-{soulDrainFactor * 8} Hours / mo</span>
              </div>
              
              <div className="flex justify-between text-base font-bold text-[#61b000] pt-1">
                <span className="font-sans text-zinc-950 font-extrabold">Value Proposition:</span>
                <span className="font-sans font-bold text-[#61b000]">Guaranteed Security</span>
              </div>
            </div>

            <div className="bg-zinc-50 p-4 rounded-xl text-xs text-zinc-600 border border-zinc-200 leading-relaxed font-sans space-y-1 relative">
              <p>
                <strong>🧑‍💼 Dedicated Support Guarantee:</strong> Includes direct, non-robotic contact with Chester whenever custom record entries change. No waiting in ticketing queues.
              </p>
            </div>

            <button 
              onClick={handleLockIn}
              className="w-full text-center bg-gradient-to-r from-orange-500 via-[#61b000] to-emerald-600 hover:from-orange-600 hover:to-emerald-700 hover:scale-[1.01] text-white text-xs font-bold uppercase py-4 rounded-xl shadow-md transition-all active:scale-[0.98] tracking-wider cursor-pointer font-sans"
            >
              Secure This Estimate & Proceed ⚡
            </button>
            <span className="block text-center text-[10px] text-zinc-400 font-mono">
              {"// Simulated payment sandbox environment"}
            </span>
          </motion.div>

        </div>

      </div>
    </div>
  );
}
