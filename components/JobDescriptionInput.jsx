"use client";

export default function JobDescriptionInput({ jobDescription, setJobDescription }) {
  return (
    <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="font-bold text-white text-lg">Job Description</h2>
        {jobDescription && (
          <span className="text-xs font-mono text-white/30">
            {jobDescription.length} chars
          </span>
        )}
      </div>

      <textarea
        value={jobDescription}
        onChange={(e) => setJobDescription(e.target.value)}
        placeholder="Paste the full job description here — including responsibilities, required skills, and qualifications..."
        rows={16}
        className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white/80 text-sm font-mono placeholder-white/20 resize-none focus:outline-none focus:border-[#00aaff]/50 transition-colors leading-relaxed flex-1"
      />

      {!jobDescription && (
        <p className="text-white/20 text-xs font-mono">
          💡 Tip: Include the full posting — more detail = better analysis
        </p>
      )}
    </div>
  );
}
