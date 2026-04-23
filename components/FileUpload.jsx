"use client";
import { useState } from "react";

export default function FileUpload({ resumeFile, setResumeFile, resumeText, setResumeText }) {
  const [mode, setMode] = useState("upload"); // "upload" | "paste"
  const [dragOver, setDragOver] = useState(false);

  const handleFile = (file) => {
    if (file && file.type === "application/pdf") {
      setResumeFile(file);
      setResumeText("");
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    handleFile(file);
  };

  return (
    <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="font-bold text-white text-lg">Your Resume</h2>
        <div className="flex bg-white/5 rounded-lg p-0.5 text-xs font-mono">
          {["upload", "paste"].map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={`px-3 py-1.5 rounded-md transition-all capitalize ${
                mode === m
                  ? "bg-[#00ff88] text-black font-bold"
                  : "text-white/40 hover:text-white"
              }`}
            >
              {m}
            </button>
          ))}
        </div>
      </div>

      {mode === "upload" ? (
        <div
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          onClick={() => document.getElementById("resumeInput").click()}
          className={`relative border-2 border-dashed rounded-xl p-10 text-center cursor-pointer transition-all ${
            dragOver
              ? "border-[#00ff88] bg-[#00ff88]/5"
              : resumeFile
              ? "border-[#00ff88]/50 bg-[#00ff88]/5"
              : "border-white/10 hover:border-white/30"
          }`}
        >
          <input
            id="resumeInput"
            type="file"
            accept=".pdf"
            className="hidden"
            onChange={(e) => handleFile(e.target.files[0])}
          />
          {resumeFile ? (
            <div className="space-y-2">
              <div className="text-3xl">📄</div>
              <p className="text-[#00ff88] font-bold font-mono text-sm">{resumeFile.name}</p>
              <p className="text-white/30 text-xs">{(resumeFile.size / 1024).toFixed(1)} KB · PDF</p>
              <button
                onClick={(e) => { e.stopPropagation(); setResumeFile(null); }}
                className="text-red-400/60 hover:text-red-400 text-xs font-mono mt-2 block"
              >
                Remove
              </button>
            </div>
          ) : (
            <div className="space-y-2">
              <div className="text-4xl opacity-30">⬆</div>
              <p className="text-white/50 text-sm">Drop your PDF resume here</p>
              <p className="text-white/20 text-xs font-mono">or click to browse</p>
            </div>
          )}
        </div>
      ) : (
        <textarea
          value={resumeText}
          onChange={(e) => { setResumeText(e.target.value); setResumeFile(null); }}
          placeholder="Paste your resume text here..."
          rows={12}
          className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white/80 text-sm font-mono placeholder-white/20 resize-none focus:outline-none focus:border-[#00ff88]/50 transition-colors leading-relaxed"
        />
      )}
    </div>
  );
}
