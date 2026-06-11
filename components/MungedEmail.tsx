'use client';

import React, { useState } from "react";
import { Mail, Copy, Check } from "lucide-react";

interface MungedEmailProps {
  className?: string;
  iconClassName?: string;
  textClassName?: string;
  showIcon?: boolean;
  showCopy?: boolean;
}

export default function MungedEmail({
  className = "",
  iconClassName = "w-4 h-4",
  textClassName = "",
  showIcon = true,
  showCopy = true,
}: MungedEmailProps) {
  const [copied, setCopied] = useState(false);

  const emailUser = "info";
  const emailDomain = "emailapiguy";
  const emailTld = "com";
  const fullEmail = `${emailUser}@${emailDomain}.${emailTld}`;

  const handleAction = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    // Trigger mailto link
    window.location.href = `mailto:${fullEmail}`;

    // Force copy to clipboard
    if (navigator.clipboard) {
      navigator.clipboard.writeText(fullEmail)
        .then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        })
        .catch((err) => {
          console.error("Could not copy email address: ", err);
        });
    }
  };

  return (
    <div className={`inline-flex items-center gap-2 font-sans ${className}`} id="munged-email-container">
      <button
        onClick={handleAction}
        className="inline-flex items-center gap-2 group text-left cursor-pointer transition-all duration-200"
        title="Click to open email client & copy email address"
        type="button"
        id="munged-email-btn"
      >
        {showIcon && (
          <span className={`p-1.5 rounded-lg bg-zinc-100 group-hover:bg-amber-100 text-zinc-500 group-hover:text-amber-600 transition-colors ${iconClassName}`}>
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600 animate-scale" /> : <Mail className="w-3.5 h-3.5" />}
          </span>
        )}
        <span className={`text-zinc-700 hover:text-amber-600 border-b border-dashed border-zinc-300 hover:border-amber-400 group-hover:underline font-mono ${textClassName}`}>
          info <span className="text-zinc-400 font-sans">[at]</span> {emailDomain} <span className="text-zinc-400 font-sans">[dot]</span> {emailTld}
        </span>
      </button>

      {showCopy && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            if (navigator.clipboard) {
              navigator.clipboard.writeText(fullEmail);
              setCopied(true);
              setTimeout(() => setCopied(false), 2000);
            }
          }}
          className="p-1 rounded text-zinc-400 hover:text-zinc-650 hover:bg-zinc-100 transition-colors cursor-pointer"
          title="Copy exact email to clipboard"
          type="button"
          id="munged-email-copy-btn"
        >
          {copied ? (
            <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-1 py-0.5 rounded border border-emerald-250 animate-pulse">
              COPIED!
            </span>
          ) : (
            <Copy className="w-3 h-3" />
          )}
        </button>
      )}
    </div>
  );
}
