"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import FileUpload from "@/components/FileUpload";
import JobDescriptionInput from "@/components/JobDescriptionInput";
import Loader from "@/components/Loader";

export default function Home() {
  const [resumeFile, setResumeFile] = useState(null);
  const [resumeText, setResumeText] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async () => {
    if (!jobDescription.trim()) {
      setError("Please paste a job description.");
      return;
    }
    if (!resumeFile && !resumeText.trim()) {
      setError("Please upload a resume or paste resume text.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const formData = new FormData();
      if (resumeFile) {
        formData.append("resume", resumeFile);
      } else {
        formData.append("resumeText", resumeText);
      }
      formData.append("jobDescription", jobDescription);

      const res = await fetch("/api/analyze", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Analysis failed.");
      }

      const data = await res.json();
      sessionStorage.setItem("analysisResult", JSON.stringify(data));
      router.push("/results");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader />;

  return (
    <main className="min-h-screen bg-[#0a0a0f] text-white font-sans">
      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0d0d1a] via-[#0a0a0f] to-[#0a0f0d] z-0" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#00ff88]/5 rounded-full blur-3xl" />
        <div className="absolute top-20 right-1/4 w-64 h-64 bg-[#00aaff]/5 rounded-full blur-3xl" />

        <div className="relative z-10 max-w-5xl mx-auto px-6 pt-16 pb-8">
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 mb-8 text-xs text-[#00ff88] font-mono tracking-widest uppercase">
            <span className="w-1.5 h-1.5 bg-[#00ff88] rounded-full animate-pulse" />
            AI-Powered · ATS Optimized · Claude 3
          </div>

          <h1 className="text-5xl md:text-7xl font-black leading-none mb-4 tracking-tight">
            <span className="text-white">Resume</span>
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ff88] to-[#00aaff]">
              Screener
            </span>
          </h1>

          <p className="text-white/50 text-lg max-w-xl mt-4 leading-relaxed font-light">
            Upload your resume. Paste a job description. Get your ATS score, missing skills, improved bullet points, and cybersecurity warnings — instantly.
          </p>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-5xl mx-auto px-6 pb-20">
        <div className="grid md:grid-cols-2 gap-6">
          <FileUpload
            resumeFile={resumeFile}
            setResumeFile={setResumeFile}
            resumeText={resumeText}
            setResumeText={setResumeText}
          />
          <JobDescriptionInput
            jobDescription={jobDescription}
            setJobDescription={setJobDescription}
          />
        </div>

        {error && (
          <div className="mt-6 bg-red-500/10 border border-red-500/30 text-red-400 rounded-xl px-5 py-4 text-sm font-mono">
            ⚠ {error}
          </div>
        )}

        <div className="mt-8 flex justify-center">
          <button
            onClick={handleSubmit}
            className="group relative px-10 py-4 bg-[#00ff88] text-black font-black text-lg rounded-2xl hover:bg-[#00ffaa] transition-all duration-200 hover:scale-105 active:scale-95 shadow-[0_0_40px_rgba(0,255,136,0.3)]"
          >
            <span className="relative z-10">Analyze Resume →</span>
          </button>
        </div>

        {/* Feature pills */}
        <div className="mt-12 flex flex-wrap justify-center gap-3">
          {[
            "🎯 ATS Score",
            "🧩 Missing Skills",
            "✍️ Better Bullets",
            "🔑 Keywords",
            "🔒 Security Check",
          ].map((f) => (
            <span
              key={f}
              className="bg-white/5 border border-white/10 text-white/60 text-sm px-4 py-2 rounded-full font-mono"
            >
              {f}
            </span>
          ))}
        </div>
      </div>
    </main>
  );
}
