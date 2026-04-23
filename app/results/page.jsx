"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ScoreCard from "@/components/ScoreCard";
import MissingSkills from "@/components/MissingSkills";
import ImprovedBullets from "@/components/ImprovedBullets";
import Keywords from "@/components/Keywords";
import CybersecurityWarnings from "@/components/CybersecurityWarnings";

export default function ResultsPage() {
  const [result, setResult] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const stored = sessionStorage.getItem("analysisResult");
    if (!stored) {
      router.push("/");
      return;
    }
    setResult(JSON.parse(stored));
  }, []);

  if (!result) return null;

  return (
    <main className="min-h-screen bg-[#0a0a0f] text-white font-sans pb-20">
      {/* Header */}
      <div className="border-b border-white/10 bg-[#0a0a0f]/80 backdrop-blur sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <button
            onClick={() => router.push("/")}
            className="text-white/40 hover:text-white text-sm font-mono transition-colors flex items-center gap-2"
          >
            ← Back
          </button>
          <span className="text-xs font-mono text-[#00ff88] tracking-widest uppercase">
            Analysis Complete
          </span>
          <button
            onClick={() => {
              const text = JSON.stringify(result, null, 2);
              const blob = new Blob([text], { type: "application/json" });
              const url = URL.createObjectURL(blob);
              const a = document.createElement("a");
              a.href = url;
              a.download = "resume-analysis.json";
              a.click();
            }}
            className="text-xs font-mono text-white/40 hover:text-white border border-white/10 hover:border-white/30 px-3 py-1.5 rounded-lg transition-all"
          >
            Export JSON
          </button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 pt-10 space-y-6">
        <ScoreCard score={result.score} />

        <div className="grid md:grid-cols-2 gap-6">
          <MissingSkills
            technical={result.missingSkills}
            soft={result.missingSoftSkills}
          />
          <Keywords keywords={result.keywords} />
        </div>

        <ImprovedBullets bullets={result.improvedBullets} />

        {result.cybersecurityWarnings?.length > 0 && (
          <CybersecurityWarnings warnings={result.cybersecurityWarnings} />
        )}
      </div>
    </main>
  );
}
