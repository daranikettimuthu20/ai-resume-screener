"use client";

export default function CybersecurityWarnings({ warnings = [] }) {
  if (!warnings || warnings.length === 0) return null;

  return (
    <div className="bg-red-500/5 border border-red-500/20 rounded-2xl p-6 space-y-4">
      <div className="flex items-center gap-3">
        <span className="text-2xl">🔒</span>
        <div>
          <h3 className="font-bold text-red-400 text-lg">Cybersecurity Warnings</h3>
          <p className="text-white/30 text-xs font-mono">Privacy risks detected in your resume</p>
        </div>
      </div>

      <div className="space-y-3">
        {warnings.map((warning, i) => (
          <div
            key={i}
            className="flex items-start gap-3 bg-red-500/10 border border-red-500/20 rounded-xl p-4"
          >
            <span className="text-red-400 font-black font-mono text-sm flex-shrink-0 mt-0.5">⚠</span>
            <p className="text-red-300/80 text-sm leading-relaxed">{warning}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
