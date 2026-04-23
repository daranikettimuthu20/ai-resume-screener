"use client";

export default function MissingSkills({ technical = [], soft = [] }) {
  return (
    <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 space-y-5">
      <h3 className="font-bold text-white text-lg">Skill Gaps</h3>

      <div>
        <p className="text-xs font-mono text-white/30 uppercase tracking-widest mb-3">Technical Skills Missing</p>
        {technical.length === 0 ? (
          <p className="text-[#00ff88] text-sm font-mono">✓ No gaps detected</p>
        ) : (
          <div className="flex flex-wrap gap-2">
            {technical.map((skill, i) => (
              <span
                key={i}
                className="bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-mono px-3 py-1.5 rounded-lg"
              >
                − {skill}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="border-t border-white/5 pt-5">
        <p className="text-xs font-mono text-white/30 uppercase tracking-widest mb-3">Soft Skills Missing</p>
        {soft.length === 0 ? (
          <p className="text-[#00ff88] text-sm font-mono">✓ No gaps detected</p>
        ) : (
          <div className="flex flex-wrap gap-2">
            {soft.map((skill, i) => (
              <span
                key={i}
                className="bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-mono px-3 py-1.5 rounded-lg"
              >
                − {skill}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
