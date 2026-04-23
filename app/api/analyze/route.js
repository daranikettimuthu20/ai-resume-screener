import { NextResponse } from "next/server";
import pdfParse from "pdf-parse/lib/pdf-parse.js";
import { buildPrompt } from "@/lib/prompts";

export const runtime = "nodejs";

export async function POST(req) {
  try {
    const formData = await req.formData();
    const jobDescription = formData.get("jobDescription");
    const resumeFile = formData.get("resume");
    const resumeTextRaw = formData.get("resumeText");

    if (!jobDescription) {
      return NextResponse.json({ error: "Job description is required." }, { status: 400 });
    }

    let resumeText = "";

    if (resumeFile && resumeFile.size > 0) {
      const buffer = Buffer.from(await resumeFile.arrayBuffer());
      const parsed = await pdfParse(buffer);
      resumeText = parsed.text;
    } else if (resumeTextRaw) {
      resumeText = resumeTextRaw;
    } else {
      return NextResponse.json({ error: "Resume is required." }, { status: 400 });
    }

    if (!resumeText.trim()) {
      return NextResponse.json({ error: "Could not extract text from resume." }, { status: 400 });
    }

    const prompt = buildPrompt(resumeText, jobDescription);

    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "API key not configured." }, { status: 500 });
    }

    const claudeRes = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 2000,
        messages: [{ role: "user", content: prompt }],
      }),
    });

    if (!claudeRes.ok) {
      const err = await claudeRes.json();
      return NextResponse.json(
        { error: err?.error?.message || "Claude API error." },
        { status: 500 }
      );
    }

    const claudeData = await claudeRes.json();
    const rawText = claudeData.content?.[0]?.text || "";

    // Strip markdown fences if present
    const jsonMatch = rawText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      return NextResponse.json({ error: "Failed to parse AI response." }, { status: 500 });
    }

    const result = JSON.parse(jsonMatch[0]);
    return NextResponse.json(result);
  } catch (err) {
    console.error("Analyze error:", err);
    return NextResponse.json({ error: err.message || "Unexpected error." }, { status: 500 });
  }
}
