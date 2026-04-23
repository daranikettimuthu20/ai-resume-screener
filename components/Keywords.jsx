"use client";
import { useState } from "react";

export default function Keywords({ keywords = [] }) {
  const [copied, setCopied] = useState(false);

  return (
    <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-white text-lg">ATS Keywords to Add</h3>
        <button
          onClick={() => {
            navigator.clipboard.writeText(keywords.join(", "));
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
          }}
          className="text-xs font-mono text-white/40 hover:text-white border border-white/10 hover:border-white/30 px-3 py-1.5 rounded-lg transition-all"
        >
          {copied ? "✓ Copied!" : "Copy All"}
        </button>
      </div>

      <p className="text-white/30 text-xs font-mono">
        Add these exact terms to your resume to pass ATS filters.
      </p>

      <div className="flex flex-wrap gap-2">
        {keywords.map((kw, i) => (
          <span
            key={i}
            className="bg-[#00ff88]/10 border border-[#00ff88]/20 text-[#00ff88] text-xs font-mono px-3 py-1.5 rounded-lg cursor-pointer hover:bg-[#00ff88]/20 transition-colors"
            onClick={() => navigator.clipboard.writeText(kw)}
            title="Click to copy"
          >
            + {kw}
          </span>
        ))}
      </div>
    </div>
  );
}
