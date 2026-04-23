import "./globals.css";

export const metadata = {
  title: "AI Resume Screener",
  description: "ATS score, skill gap analysis, and cybersecurity checks powered by Claude AI",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
