"use client";
import { useEffect, useState } from "react";

function getScoreColor(score) {
  if (score >= 75) return { stroke: "#00ff88", text: "text-[#00ff88]", label: "Strong Match", bg: "bg-[#00ff88]/10" };
  if (score >= 50) return { stroke: "#f59e0b", text: "text-amber-400", label: "Moderate Match", bg: "bg-amber-400/10" };
  return { stroke: "#ef4444", text: "text-red-400", label: "Weak Match", bg: "bg-red-400/10" };
}

export default function ScoreCard({ score }) {
  const [animated, setAnimated] = useState(0);
  const numScore = parseInt(score) || 0;
  const { stroke, text, label, bg } = getScoreColor(numScore);

  const r = 54;
  const circ = 2 * Math.PI * r;
  const progress = (animated / 100) * circ;

  useEffect(() => {
    const timeout = setTimeout(() => {
      let current = 0;
      const step = numScore / 60;
      const interval = setInterval(() => {
        current = Math.min(current + step, numScore);
        setAnimated(Math.round(current));
        if (current >= numScore) clearInterval(interval);
      }, 16);
    }, 200);
    return () => clearTimeout(timeout);
  }, [numScore]);

  return (
    <div className={`${bg} border border-white/10 rounded-2xl p-8 flex items-center gap-8`}>
      {/* Ring */}
      <div className="relative flex-shrink-0">
        <svg width="140" height="140" viewBox="0 0 140 140">
          <circle cx="70" cy="70" r={r} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="10" />
          <circle
            cx="70"
            cy="70"
            r={r}
            fill="none"
            stroke={stroke}
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={`${progress} ${circ}`}
            transform="rotate(-90 70 70)"
            style={{ transition: "stroke-dasharray 0.05s linear", filter: `drop-shadow(0 0 8px ${stroke})` }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={`text-3xl font-black ${text}`}>{animated}</span>
          <span className="text-white/30 text-xs font-mono">/100</span>
        </div>
      </div>

      {/* Text */}
      <div>
        <p className="text-white/40 text-xs font-mono uppercase tracking-widest mb-2">ATS Match Score</p>
        <h2 className={`text-3xl font-black ${text}`}>{label}</h2>
        <p className="text-white/50 text-sm mt-3 max-w-sm">
          {numScore >= 75
            ? "Your resume is well-aligned with this role. Apply with confidence."
            : numScore >= 50
            ? "You're partway there. Adding the missing skills and keywords should push you over 75."
            : "Significant gaps detected. Use the suggestions below to rebuild your resume for this role."}
        </p>
      </div>
    </div>
  );
}
