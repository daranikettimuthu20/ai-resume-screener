# ⭐ AI Resume Screener & Job Match Assistant

> Built with Next.js 14 · Claude AI · Tailwind CSS · Deployed on Vercel

**Live Demo**: _[your-vercel-url-here]_

---

## 🎯 What It Does

Upload your resume and paste a job description. Claude analyzes both and returns:

- ✅ **ATS Match Score** (0–100) — how well your resume matches the role
- 🧩 **Missing Technical Skills** — skills in the JD that aren't in your resume
- 💬 **Missing Soft Skills** — soft skills detected from the JD
- ✍️ **Improved Bullet Points** — 5 AI-rewritten resume bullets for this job
- 🔑 **ATS Keywords** — exact terms to paste into your resume
- 🔒 **Cybersecurity Warnings** — personal info exposure risks

---

## 🏗 Tech Stack

| Layer | Tech |
|-------|------|
| Frontend | Next.js 14 (App Router), React, Tailwind CSS |
| Backend | Next.js API Routes (serverless) |
| AI | Claude claude-haiku-4-5-20251001 via Anthropic API |
| PDF Parsing | `pdf-parse` |
| Deployment | Vercel |

---

## 📁 Project Structure

```
ai-resume-screener/
├── app/
│   ├── page.jsx              # Upload page (home)
│   ├── results/page.jsx      # Results page
│   ├── layout.jsx            # Root layout
│   ├── globals.css           # Global styles
│   └── api/
│       └── analyze/route.js  # API: PDF parse + Claude call
├── components/
│   ├── FileUpload.jsx         # Resume upload/paste component
│   ├── JobDescriptionInput.jsx
│   ├── ScoreCard.jsx          # Animated ATS score ring
│   ├── MissingSkills.jsx
│   ├── ImprovedBullets.jsx
│   ├── Keywords.jsx
│   ├── CybersecurityWarnings.jsx
│   └── Loader.jsx
├── lib/
│   └── prompts.js             # Claude prompt builder
├── .env.local.example
├── next.config.js
├── tailwind.config.js
└── package.json
```

---

## 🚀 Step-by-Step Setup (Local)

### Step 1 — Prerequisites

Make sure you have:
- Node.js 18+ installed (`node -v`)
- An [Anthropic API key](https://console.anthropic.com)

### Step 2 — Clone and Install

```bash
git clone https://github.com/YOUR_USERNAME/ai-resume-screener.git
cd ai-resume-screener
npm install
```

### Step 3 — Set Up Environment Variable

```bash
cp .env.local.example .env.local
```

Open `.env.local` and add your key:

```
ANTHROPIC_API_KEY=sk-ant-xxxxxxxxxxxxxxxxxxxx
```

### Step 4 — Run Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Step 5 — Test It

1. Upload a PDF resume (or paste resume text)
2. Paste a job description
3. Click **Analyze Resume**
4. View your results!

---

## 🌐 Deployment on Vercel

### Step 1 — Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit: AI Resume Screener"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/ai-resume-screener.git
git push -u origin main
```

### Step 2 — Import to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click **Add New Project**
3. Import your GitHub repo
4. Click **Deploy**

### Step 3 — Add Environment Variable

In Vercel dashboard:
- Go to your project → **Settings** → **Environment Variables**
- Add: `ANTHROPIC_API_KEY` = your API key
- Click Save, then **Redeploy**

### Step 4 — Done!

Your app is live. Share the URL.

---

## 🧠 How the AI Prompt Works

Located in `/lib/prompts.js`:

The prompt gives Claude:
1. The full resume text
2. The full job description
3. Instructions to output **only valid JSON** with 6 fields

Claude returns structured data that the frontend renders directly. No regex parsing — just clean `JSON.parse()`.

---

## 🎤 What to Say in Interviews

> "I built an AI-powered resume screening tool using Claude 3 that performs ATS scoring, skill gap detection, and cybersecurity checks. It uses Next.js serverless functions on the backend, pdf-parse for document processing, and Tailwind CSS on the frontend. The entire stack is deployed on Vercel."

---

## 📬 Future Enhancements

- [ ] Full ATS resume generator (download as PDF)
- [ ] LinkedIn headline + About section generator
- [ ] Save history with MongoDB Atlas
- [ ] User authentication with JWT
- [ ] Side-by-side resume diff view
- [ ] Multi-job comparison mode

---

## 🤝 Credits

Built by [Your Name] · Powered by [Claude AI](https://anthropic.com)
