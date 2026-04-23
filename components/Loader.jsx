"use client";
import { useEffect, useState } from "react";

const steps = [
  "Parsing your resume...",
  "Reading job description...",
  "Running ATS keyword match...",
  "Detecting skill gaps...",
  "Rewriting bullet points...",
  "Checking cybersecurity risks...",
  "Generating insights...",
];

export default function Loader() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStep((s) => (s + 1) % steps.length);
    }, 1800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0f] flex flex-col items-center justify-center gap-8">
      {/* Spinner */}
      <div className="relative w-20 h-20">
        <div className="absolute inset-0 rounded-full border-2 border-white/5" />
        <div
          className="absolute inset-0 rounded-full border-2 border-transparent border-t-[#00ff88]"
          style={{ animation: "spin 1s linear infinite" }}
        />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        <div className="absolute inset-3 rounded-full bg-[#00ff88]/10 flex items-center justify-center">
          <span className="text-xl">⚡</span>
        </div>
      </div>

      <div className="text-center space-y-2">
        <p className="text-white font-bold text-xl">Analyzing your resume</p>
        <p className="text-[#00ff88] text-sm font-mono animate-pulse">{steps[step]}</p>
      </div>

      {/* Progress dots */}
      <div className="flex gap-2">
        {steps.map((_, i) => (
          <div
            key={i}
            className={`w-1.5 h-1.5 rounded-full transition-all duration-500 ${
              i <= step ? "bg-[#00ff88]" : "bg-white/10"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
