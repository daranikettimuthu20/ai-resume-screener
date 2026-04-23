"use client";
import { useState } from "react";

export default function ImprovedBullets({ bullets = [] }) {
  const [copied, setCopied] = useState(null);

  const copyAll = () => {
    navigator.clipboard.writeText(bullets.join("\n"));
    setCopied("all");
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-white text-lg">Improved Bullet Points</h3>
        <button
          onClick={copyAll}
          className="text-xs font-mono text-white/40 hover:text-white border border-white/10 hover:border-white/30 px-3 py-1.5 rounded-lg transition-all"
        >
          {copied === "all" ? "✓ Copied!" : "Copy All"}
        </button>
      </div>

      <p className="text-white/30 text-xs font-mono">
        AI-rewritten bullets optimized for this specific job description.
      </p>

      <div className="space-y-3">
        {bullets.map((bullet, i) => (
          <div
            key={i}
            className="group flex items-start gap-4 bg-[#00aaff]/5 border border-[#00aaff]/10 rounded-xl p-4 hover:border-[#00aaff]/30 transition-all"
          >
            <span className="text-[#00aaff] font-black font-mono text-sm flex-shrink-0 mt-0.5">
              {String(i + 1).padStart(2, "0")}
            </span>
            <p className="text-white/80 text-sm leading-relaxed flex-1">{bullet}</p>
            <button
              onClick={() => {
                navigator.clipboard.writeText(bullet);
                setCopied(i);
                setTimeout(() => setCopied(null), 1500);
              }}
              className="opacity-0 group-hover:opacity-100 text-white/30 hover:text-white text-xs font-mono flex-shrink-0 transition-all"
            >
              {copied === i ? "✓" : "copy"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
