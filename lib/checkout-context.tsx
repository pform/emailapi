'use client';

import React, { createContext, useContext, useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Lock, CheckCircle2 } from "lucide-react";
import MascotSvg from "@/components/MascotSvg";
import { Product } from "./products";

interface CheckoutContextType {
  initiateCheckout: (product: Product) => void;
  selectedProduct: Product | null;
  closeCheckout: () => void;
}

const CheckoutContext = createContext<CheckoutContextType | undefined>(undefined);

export function useCheckout() {
  const context = useContext(CheckoutContext);
  if (!context) {
    throw new Error("useCheckout must be used within a CheckoutProvider");
  }
  return context;
}

export function CheckoutProvider({ children }: { children: React.ReactNode }) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [checkoutStep, setCheckoutStep] = useState<"form" | "success">("form");
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);
  const [billingForm, setBillingForm] = useState({
    name: "",
    email: "",
    domain: "",
  });

  const initiateCheckout = (product: Product) => {
    setSelectedProduct(product);
    setCheckoutStep("form");
    setCheckoutError(null);
    setBillingForm({
      name: "",
      email: "",
      domain: "",
    });
  };

  const closeCheckout = () => {
    setSelectedProduct(null);
  };

  const handleCheckoutSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProduct) return;
    setCheckoutLoading(true);
    setCheckoutError(null);

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...billingForm,
          productId: selectedProduct.id,
          productName: selectedProduct.name,
          productPrice: selectedProduct.price,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to submit service integration order.");
      }

      setCheckoutStep("success");
    } catch (err) {
      console.error("[Checkout Error]:", err);
      setCheckoutError(err instanceof Error ? err.message : "An unexpected server exception occurred.");
    } finally {
      setCheckoutLoading(false);
    }
  };

  return (
    <CheckoutContext.Provider value={{ initiateCheckout, selectedProduct, closeCheckout }}>
      {children}
      
      <AnimatePresence>
        {selectedProduct && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-zinc-900/60 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white border border-zinc-300 rounded-lg max-w-lg w-full shadow-2xl relative overflow-hidden font-sans text-zinc-900 text-left"
            >
              {/* Header */}
              <div className="bg-zinc-50 border-b border-zinc-200 p-4 flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <Lock className="w-4 h-4 text-amber-600" />
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-550">
                    Secure Checkout Exchange
                  </span>
                </div>
                <button
                  onClick={closeCheckout}
                  className="text-zinc-400 hover:text-zinc-800 p-1 text-xs font-bold uppercase border border-transparent rounded hover:border-zinc-200"
                >
                  [Dismiss]
                </button>
              </div>

              {checkoutStep === "form" ? (
                <form onSubmit={handleCheckoutSubmit} className="p-6 space-y-4">
                  {/* Selected Product info */}
                  <div className="bg-zinc-50 border border-zinc-200 p-4 rounded-lg">
                    <span className="text-[10px] text-zinc-500 font-mono block uppercase">Order Item</span>
                    <span className="text-sm font-bold text-zinc-900 block">{selectedProduct.name}</span>
                    <span className="text-xs text-zinc-600 block mt-1 leading-relaxed">
                      {selectedProduct.description}
                    </span>
                    <div className="mt-2 text-sm font-extrabold font-mono text-amber-600">
                      Price: {selectedProduct.price}
                    </div>
                  </div>

                  {/* Customer Information */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold uppercase tracking-wide text-zinc-700">Client Info & Domain Details</h4>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[10px] uppercase font-mono text-zinc-500 mb-1">
                          Full Name
                        </label>
                        <input
                          type="text"
                          required
                          value={billingForm.name}
                          onChange={(e) => setBillingForm({ ...billingForm, name: e.target.value })}
                          className="w-full bg-white border border-zinc-300 rounded p-2 text-xs text-zinc-900 focus:outline-none focus:border-[#1d4ed8]"
                          placeholder="e.g. Danny Glix"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] uppercase font-mono text-zinc-500 mb-1">
                          Domain to Repair
                        </label>
                        <input
                          type="text"
                          required
                          value={billingForm.domain}
                          onChange={(e) => setBillingForm({ ...billingForm, domain: e.target.value })}
                          className="w-full bg-white border border-zinc-300 rounded p-2 text-xs text-zinc-900 font-mono focus:outline-none focus:border-[#1d4ed8]"
                          placeholder="e.g. mycorp.com"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase font-mono text-zinc-500 mb-1">
                        Corporate Email Address
                      </label>
                      <input
                        type="email"
                        required
                        value={billingForm.email}
                        onChange={(e) => setBillingForm({ ...billingForm, email: e.target.value })}
                        className="w-full bg-white border border-zinc-300 rounded p-2 text-xs text-zinc-900 focus:outline-none focus:border-[#1d4ed8]"
                        placeholder="e.g. you@mycorp.com"
                      />
                    </div>
                  </div>

                  {checkoutError && (
                    <div className="p-3 bg-rose-50 border border-rose-200 text-rose-600 rounded text-xs font-semibold">
                      ⚠️ Error: {checkoutError}
                    </div>
                  )}

                  {/* Proceed / Complete order trigger */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={checkoutLoading}
                      className="w-full bg-[#1d4ed8] hover:bg-[#1e40af] text-white font-bold uppercase tracking-wider text-xs py-3.5 rounded border border-blue-700 transition-colors cursor-pointer"
                    >
                      {checkoutLoading ? "SUBMITTING TELEMETRY ORDER..." : "REQUEST THIS SERVICE SETUP ⚡"}
                    </button>
                    <span className="text-[10px] text-zinc-400 text-center block mt-2 font-medium">
                      🔒 Direct Human Booking • No Credit Card Required Today
                    </span>
                  </div>

                </form>
              ) : (
                <div className="p-6 text-center space-y-5">
                  <div className="w-12 h-12 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center mx-auto shadow">
                    <CheckCircle2 className="w-6 h-6 text-emerald-600 animate-pulse" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-base font-extrabold text-zinc-900 font-sans">Service Request Logged Successfully!</h3>
                    <p className="text-xs text-zinc-500">
                      Telemetry order saved in Chester&apos;s central registry files.
                    </p>
                  </div>

                  <div className="bg-zinc-50 border border-zinc-200 p-4 rounded text-left text-xs space-y-1.5 max-w-sm mx-auto font-mono text-zinc-700">
                    <p className="font-bold border-b border-zinc-200 pb-1 text-zinc-900 uppercase font-sans">
                      OFFICIAL DNS SERVICE ORDER
                    </p>
                    <p><strong>Item:</strong> {selectedProduct.name}</p>
                    <p><strong>Pricing:</strong> {selectedProduct.price}</p>
                    <p><strong>Target Domain:</strong> {billingForm.domain}</p>
                    <p><strong>Client:</strong> {billingForm.name} ({billingForm.email})</p>
                  </div>

                  {/* Guaranteed outbound mail hanchand-off */}
                  <div className="bg-amber-50/70 border border-amber-200 rounded-xl p-4 text-left space-y-3">
                    <div className="space-y-0.5">
                      <span className="text-[9px] font-mono font-bold text-amber-800 uppercase bg-amber-100 px-1.5 py-0.5 rounded border border-amber-200">
                        📬 GUARANTEED INBOX DISPATCH (1-CLICK)
                      </span>
                      <p className="text-[11px] text-zinc-650 leading-normal pt-1">
                        Ensure instant deliverability without API lag. Click below to launch your pre-formatted order draft directly in your preferred email application!
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        const subjectValue = `🚨 SERVICE PURCHASE REQUEST: ${selectedProduct.name} by ${billingForm.name}`;
                        const bodyValue = `Official DNS Service Order Request Details:\n\n` + 
                                          `• Selected Service: ${selectedProduct.name}\n` +
                                          `• Price Rate: ${selectedProduct.price}\n` +
                                          `• Customer Name: ${billingForm.name}\n` +
                                          `• Corporate Email: ${billingForm.email}\n` +
                                          `• Target Domain to Repair: ${billingForm.domain}\n\n` +
                                          `Chester, please initiate this service setup and send over custom handshake details and an invoice.`;
                        window.location.href = `mailto:info@emailapiguy.com?subject=${encodeURIComponent(subjectValue)}&body=${encodeURIComponent(bodyValue)}`;
                      }}
                      className="w-full inline-flex items-center justify-center gap-1.5 bg-amber-600 hover:bg-amber-700 text-white text-[11px] font-bold uppercase py-2.5 rounded-lg shadow cursor-pointer transition-all active:scale-[0.99]"
                    >
                      <span>Launch Prefilled Order Draft ✉️</span>
                    </button>
                  </div>

                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                    <button
                      onClick={closeCheckout}
                      className="bg-zinc-900 hover:bg-zinc-850 text-white font-bold uppercase px-6 py-3 rounded-lg text-[10px] tracking-wider w-full cursor-pointer"
                    >
                      Return to Portal
                    </button>
                  </div>
                </div>
              )}

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </CheckoutContext.Provider>
  );
}
