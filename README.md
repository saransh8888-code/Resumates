# ResuMates — Smart AI Resume Builder & ATS Resume Analyzer

> **ResuMates** is a full-featured web application designed for students, job applicants, and academic faculty to build, check, score, and rewrite resumes to pass modern Applicant Tracking Systems (ATS).

---

## 🚀 Live Working Prototype

The application is running locally at:
**`http://localhost:3000/`**

---

## 🌟 The Five Core Sections

ResuMates is built around the five core user workflows:

| # | Section | Key Capabilities |
|---|---|---|
| **1** | **Home Page** | Introduces ResuMates, explains the ATS optimization methodology, and features **1-click preloaded demo scenarios** for immediate faculty testing. |
| **2** | **Resume Upload** | Ingests **PDF**, **DOCX**, and plain text files. Real-time client-side text extraction (zero server upload for privacy), structured section parsing, and sample resume selector. |
| **3** | **Job Description** | Rich input textarea with word/character counts, preloaded industry benchmark job postings, and instant live keyword requirement extraction. |
| **4** | **AI Analysis Engine** | Realistic multi-stage processing visualizer calculating ATS compliance, semantic skill overlap, experience depth, and weak verb detection. |
| **5** | **Results Dashboard** | Animated circular match percentage (0–100%), ATS letter grade (A+ to D), sub-score breakdown, matching vs. missing skills, resume strengths, experience gaps, and **Google XYZ rewritten bullets** with 1-click copy & sync to builder. |

---

## 🛠️ Integrated Resume Builder

ResuMates includes a live, interactive Resume Builder:
- **Instant Sync**: Directly import parsed resumes from Section 2 or analysis fixes from Section 5.
- **1-Click AI Fixes**: Add missing skills or replace weak experience bullets with one click.
- **4 Professional ATS Templates**:
  - **Modern Tech**: Indigo accents, clean badges, balanced dual column.
  - **Classic ATS**: Universal single-column black-and-white standard layout for legacy ATS crawlers.
  - **Academic / Faculty**: Traditional higher-ed styling focusing on research, grants, and coursework.
  - **Executive Minimalist**: Refined typography, tracked uppercase headers, and clean borders.
- **Print & PDF Export**: Flawless print stylesheet that hides UI controls and renders a clean A4 document.

---

## 🎓 Faculty Evaluator Workflow (Step-by-Step)

A faculty member or evaluator can run a complete assessment in under 30 seconds:
1. **Open ResuMates**: Navigate to `http://localhost:3000/`.
2. **Upload / Select Resume**: Choose one of the preloaded sample profiles (e.g., Alex Rivera, Priya Sharma, or Dr. Marcus Vance) or drop a student's PDF/DOCX.
3. **Paste Job Description**: Select a matching job preset (e.g., Stripe Full Stack, DeepMind AI Scientist, University Assistant Professor).
4. **Click "Analyze Resume"**: Watch the AI analysis modal progress through the 5 parsing stages.
5. **Review Match Percentage**: View the overall compatibility score (e.g., 84%) and ATS letter grade.
6. **Inspect Matching & Missing Skills**: Filter between green matching badges and red/amber missing keyword badges.
7. **Examine Strengths & Gaps**: Review identified strengths (metrics, strong verbs) and red flags (missing tech, passive verbs).
8. **Provide Mentorship via Rewritten Bullets**: Review the side-by-side Before/After bullet point enhancements following the Google XYZ formula (*Accomplished [X] as measured by [Y], by doing [Z]*).
9. **Apply Fixes**: Click "Apply Fixes in Resume Builder" to preview the updated resume live!

---

## 💻 Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS with custom responsive design & print media styles
- **File Parsing**:
  - `pdfjs-dist`: Client-side PDF text stream extraction
  - `mammoth`: Microsoft Word `.docx` document parsing
- **Icons**: Lucide React
- **Animations**: Custom Canvas Confetti & step-by-step progress visualizer
