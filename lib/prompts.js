export function buildPrompt(resumeText, jobDescription) {
  return `You are an expert ATS resume analyzer, career coach, and cybersecurity reviewer.

INPUT:
Resume:
${resumeText}

Job Description:
${jobDescription}

TASKS:
1. Give an ATS match score from 0 to 100 based on keyword overlap and relevance.
2. Extract up to 8 missing technical skills from the job description not in the resume.
3. Extract up to 5 missing soft skills from the job description not in the resume.
4. Rewrite 5 resume bullet points to better match the job description. Make them strong and quantified where possible.
5. Suggest up to 10 ATS keywords from the job description to add to the resume.
6. Check for cybersecurity risks: does the resume expose a home address, personal phone, personal email, or other sensitive info that should be omitted on a public resume? List specific warnings.

CRITICAL: Respond ONLY with valid JSON. No explanation, no markdown, no backticks. Exactly this format:

{
  "score": 72,
  "missingSkills": ["Kubernetes", "Terraform", "CI/CD pipelines"],
  "missingSoftSkills": ["Cross-functional collaboration", "Agile mindset"],
  "improvedBullets": [
    "Led migration of 3 microservices to AWS Lambda, reducing latency by 40%",
    "Built Python automation scripts that eliminated 8 hours of manual reporting per week"
  ],
  "keywords": ["cloud-native", "REST APIs", "DevSecOps", "Python", "Docker"],
  "cybersecurityWarnings": [
    "Home address detected — remove from public resume to protect personal privacy.",
    "Personal phone number exposed — consider using a Google Voice number instead."
  ]
}`;
}
