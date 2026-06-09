'use client';

import React, { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "motion/react";
import { useCheckout } from "@/lib/checkout-context";
import { PRODUCTS } from "@/lib/products";
import { ShoppingBag } from "lucide-react";

function ServicesContent() {
  const searchParams = useSearchParams();
  const filterParam = searchParams.get("filter");
  
  const [selectedTabOverride, setSelectedTabOverride] = useState<string | null>(null);
  const { initiateCheckout } = useCheckout();

  const activeMenuTab = selectedTabOverride ?? (filterParam === "one-time" || filterParam === "monthly" ? filterParam : "all");

  return (
    <div className="relative min-h-screen bg-white text-zinc-900 font-sans" id="services-page-root">
      
      {/* Clean Physical Grid lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e4e4e7_1px,transparent_1px),linear-gradient(to_bottom,#e4e4e7_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-30 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 py-16 relative">
        
        {/* Header Block */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
          <span className="inline-block bg-zinc-100 border border-zinc-300 text-zinc-800 text-xs font-mono font-bold uppercase tracking-widest px-3 py-1 rounded">
            PRISTINE DESIGN FOR PROFESSIONALS
          </span>
          <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900 animate-fade-in">
            Official Technical Support Menu
          </h1>
          <p className="text-sm text-zinc-650 leading-relaxed">
            No hidden subscription traps or locked contracts. Select a concrete setup solution or continuous administrative retainer designed to keep your business records perfectly aligned.
          </p>
        </div>

        {/* Tab Filters */}
        <div className="flex justify-center space-x-2 mb-10">
          {(["all", "one-time", "monthly"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setSelectedTabOverride(tab)}
              className={`px-4 py-1.5 text-xs font-bold uppercase rounded-lg border transition-all cursor-pointer ${
                activeMenuTab === tab 
                  ? "bg-gradient-to-r from-orange-500 to-[#61b000] text-white border-transparent shadow-sm" 
                  : "bg-zinc-100 text-zinc-805 border-zinc-200 hover:bg-zinc-200"
              }`}
            >
              {tab === "all" ? "All Services" : `${tab} setup`}
            </button>
          ))}
        </div>

        {/* Active Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {PRODUCTS.filter(p => activeMenuTab === "all" || p.type === activeMenuTab).map((product, idx) => (
            <motion.div 
              key={product.id} 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              whileHover={{ y: -5, scale: 1.01 }}
              className={`bg-white border-2 ${
                product.type === "one-time" ? "border-t-orange-500" : "border-t-[#61b000]"
              } border-zinc-200 p-6 rounded-2xl transition-all flex flex-col justify-between hover:shadow-xl hover:border-zinc-300 relative overflow-hidden`}
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-zinc-50 to-transparent rounded-full pointer-events-none" />
              <div>
                <div className="flex justify-between items-start mb-4 relative z-10">
                  <span className={`text-[10px] px-2.5 py-1.5 rounded-full font-bold uppercase tracking-wider ${
                    product.type === "one-time" 
                      ? "bg-orange-50 border border-orange-200 text-orange-600" 
                      : "bg-lime-50 border border-lime-200 text-lime-700"
                  }`}>
                    {product.tag}
                  </span>
                  <span className="text-sm font-black text-[#61b000] font-mono bg-zinc-50 border border-zinc-200 px-3 py-1 rounded-lg">{product.price}</span>
                </div>
                <h3 className="text-base font-extrabold text-zinc-900 mb-2 font-sans relative z-10">{product.name}</h3>
                <p className="text-xs text-zinc-600 leading-relaxed font-sans mb-6 relative z-10">
                  {product.description}
                </p>
              </div>
              
              <div className="relative z-10">
                <div className="mt-4 pt-4 border-t border-zinc-200 flex flex-col sm:flex-row gap-4 justify-between sm:items-center">
                  <div className="text-[11px] text-zinc-500 font-mono space-y-1">
                    <div className="font-bold text-zinc-700 font-sans">✓ {product.guarantee}</div>
                    <div className="text-[#61b000] flex items-center gap-1 font-semibold">⚡ Direct human setup support</div>
                  </div>
                  <button
                    onClick={() => initiateCheckout(product)}
                    className="bg-zinc-900 hover:bg-gradient-to-r hover:from-orange-500 hover:to-[#61b000] hover:scale-105 active:scale-95 text-white text-xs font-bold uppercase px-5 py-3 rounded-xl transition-all tracking-wider cursor-pointer font-sans inline-flex items-center gap-1.5 shadow-md flex-shrink-0"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    Select Service Order
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Outer Disclaimer Block */}
        <div className="mt-16 bg-zinc-50 border border-zinc-200 p-6 rounded-2xl max-w-3xl mx-auto space-y-3">
          <h4 className="text-xs font-mono font-bold uppercase text-zinc-700">How our deliverability consulting works:</h4>
          <p className="text-xs text-zinc-600 leading-relaxed">
            All services are manually audited and configured by human experts. Following selection, your details will be transferred to our onboarding list. Full administrative documentation (including nameserver handshakes and text record parameters) will be supplied post-completion.
          </p>
        </div>

      </div>
    </div>
  );
}

export default function ServicesPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-white">
        <span className="text-xs font-mono text-zinc-550">Loading Support Menu...</span>
      </div>
    }>
      <ServicesContent />
    </Suspense>
  );
}
