import React from 'react';
import { 
  FileCheck, 
  Sparkles, 
  Upload, 
  Briefcase, 
  Cpu, 
  BarChart3, 
  Edit3, 
  ArrowRight, 
  CheckCircle2, 
  AlertTriangle, 
  Layers, 
  TrendingUp, 
  ShieldCheck, 
  GraduationCap,
  Play
} from 'lucide-react';
import { SAMPLE_RESUMES } from '../data/sampleResumes';
import { SAMPLE_JOBS } from '../data/sampleJobs';

interface HomeHeroProps {
  onStartAnalysis: () => void;
  onOpenBuilder: () => void;
  onQuickDemo: (resumeId: string, jobId: string) => void;
  onOpenFacultyGuide: () => void;
}

export const HomeHero: React.FC<HomeHeroProps> = ({
  onStartAnalysis,
  onOpenBuilder,
  onQuickDemo,
  onOpenFacultyGuide,
}) => {
  return (
    <div className="space-y-16 pb-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-8 pb-12 sm:pt-14 sm:pb-16 bg-gradient-to-b from-indigo-50/70 via-white to-white rounded-3xl border border-indigo-100/70 p-6 sm:p-12 shadow-sm">
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-indigo-200/30 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -mb-12 -ml-12 w-96 h-96 bg-violet-200/30 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-4xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-100/80 text-indigo-800 text-xs font-semibold tracking-wide border border-indigo-200/80 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
            <span>Next-Gen AI Resume Builder & ATS Job Match Analyzer</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
            Build Resumes That Beat the ATS & Win{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-indigo-700 to-violet-600">
              Dream Offers
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-600 font-normal max-w-2xl mx-auto leading-relaxed">
            Welcome to <strong className="text-slate-800 font-semibold">ResuMates</strong> — the intelligent career assistant designed for candidates and academic faculty. Upload your resume, paste a target job description, uncover missing keywords, and get Google XYZ-formula rewritten bullets in seconds.
          </p>

          {/* Primary CTA Buttons */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <button
              onClick={onStartAnalysis}
              className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-base shadow-lg shadow-indigo-300/60 hover:shadow-indigo-400/80 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <FileCheck className="w-5 h-5" />
              <span>Check Resume Against Job</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </button>

            <button
              onClick={onOpenBuilder}
              className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-slate-800 font-semibold text-base border border-slate-300 shadow-xs hover:border-slate-400 transition-all"
            >
              <Edit3 className="w-5 h-5 text-indigo-600" />
              <span>Open Resume Builder</span>
            </button>

            <button
              onClick={onOpenFacultyGuide}
              className="flex items-center gap-2 px-5 py-3.5 rounded-xl bg-amber-50 hover:bg-amber-100/90 text-amber-900 font-semibold text-base border border-amber-200/80 transition-all"
            >
              <GraduationCap className="w-5 h-5 text-amber-600" />
              <span>Faculty Review Rubric</span>
            </button>
          </div>

          {/* Instant 1-Click Interactive Demos for Faculty Testing */}
          <div className="pt-6 border-t border-slate-200/80 mt-8">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-3">
              ⚡ Instant 1-Click Demo Scenarios (Zero typing required):
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
              {SAMPLE_RESUMES.map((sample, idx) => (
                <button
                  key={sample.id}
                  onClick={() => onQuickDemo(sample.id, SAMPLE_JOBS[idx]?.id || SAMPLE_JOBS[0].id)}
                  className="group flex items-center gap-2 px-3.5 py-2 rounded-lg bg-white/90 hover:bg-indigo-50 border border-slate-200 hover:border-indigo-300 text-xs font-medium text-slate-700 hover:text-indigo-700 shadow-2xs transition"
                >
                  <Play className="w-3.5 h-3.5 text-indigo-500 group-hover:scale-110 transition-transform" />
                  <span>{sample.badge}: <strong>{sample.label.split('—')[0].trim()}</strong></span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* The 5 Key Application Sections Breakdown */}
      <section className="space-y-6">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold">
            <Layers className="w-3.5 h-3.5 text-indigo-600" />
            <span>Architecture & Core Workflow</span>
          </div>
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight">
            The Five Core Sections of ResuMates
          </h2>
          <p className="text-slate-600 text-sm">
            Everything you need from raw resume parsing to intelligent ATS optimization and export.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {/* Section 1 */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200 hover:border-indigo-300 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-sm group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                01
              </div>
              <h3 className="font-bold text-slate-900 text-base">Home Page</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Introduces ResuMates, outlines the interactive evaluation workflow, and provides one-click sample presets.
              </p>
            </div>
            <div className="pt-4 mt-2 border-t border-slate-100 text-[11px] font-semibold text-indigo-600 flex items-center gap-1">
              <span>Overview & Tour</span>
            </div>
          </div>

          {/* Section 2 */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200 hover:border-indigo-300 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-sm group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <Upload className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-base">Resume Upload</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Accepts PDF, DOCX, and text formats. Extracts contact info, work bullets, education, and skills client-side.
              </p>
            </div>
            <div className="pt-4 mt-2 border-t border-slate-100 text-[11px] font-semibold text-blue-600 flex items-center gap-1">
              <span>PDF & DOCX Support</span>
            </div>
          </div>

          {/* Section 3 */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200 hover:border-indigo-300 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-violet-50 text-violet-600 flex items-center justify-center font-bold text-sm group-hover:bg-violet-600 group-hover:text-white transition-colors">
                <Briefcase className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-base">Job Description</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Paste any job vacancy or load role presets (SWE, AI/ML, Faculty). Analyzes role prerequisites in real time.
              </p>
            </div>
            <div className="pt-4 mt-2 border-t border-slate-100 text-[11px] font-semibold text-violet-600 flex items-center gap-1">
              <span>Keyword Detection</span>
            </div>
          </div>

          {/* Section 4 */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200 hover:border-indigo-300 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-sm group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                <Cpu className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-base">AI Analysis</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Multi-stage processing engine cross-references tech stack, calculates ATS readiness, and detects experience gaps.
              </p>
            </div>
            <div className="pt-4 mt-2 border-t border-slate-100 text-[11px] font-semibold text-emerald-600 flex items-center gap-1">
              <span>Smart NLP Engine</span>
            </div>
          </div>

          {/* Section 5 */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200 hover:border-indigo-300 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold text-sm group-hover:bg-amber-600 group-hover:text-white transition-colors">
                <BarChart3 className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-base">Results Dashboard</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Displays match score, missing skills chips, experience gaps, rewritten bullet points, and faculty evaluation rubric.
              </p>
            </div>
            <div className="pt-4 mt-2 border-t border-slate-100 text-[11px] font-semibold text-amber-600 flex items-center gap-1">
              <span>Score & Rewrites</span>
            </div>
          </div>
        </div>
      </section>

      {/* Target Audiences: For Faculty & For Candidates */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Faculty & Evaluator Box */}
        <div className="bg-gradient-to-br from-amber-500/10 via-amber-50/50 to-white rounded-3xl p-6 sm:p-8 border border-amber-200/80 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-500 text-white flex items-center justify-center shadow-md shadow-amber-200">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-700">Educator Focus</span>
              <h3 className="text-xl font-bold text-slate-900">For Faculty & Career Mentors</h3>
            </div>
          </div>
          <p className="text-sm text-slate-600 leading-relaxed">
            Faculty members can test student resumes against authentic industry job postings, benchmark readiness using objective ATS rubrics, and deliver actionable feedback with concrete bullet-point revisions.
          </p>
          <ul className="space-y-2 text-xs text-slate-700">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Standardized ATS scoring breakdown (Skills, Experience, Format, Metrics)</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Mentorship talking points tailored for career advising hours</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Preloaded academic sample resumes to test right in your browser</span>
            </li>
          </ul>
          <button
            onClick={onOpenFacultyGuide}
            className="text-xs font-bold text-amber-800 hover:text-amber-900 underline underline-offset-4 flex items-center gap-1 pt-2"
          >
            <span>View Faculty Evaluation Guide</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Candidate & Student Box */}
        <div className="bg-gradient-to-br from-indigo-500/10 via-indigo-50/50 to-white rounded-3xl p-6 sm:p-8 border border-indigo-200/80 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-md shadow-indigo-200">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-700">Candidate Focus</span>
              <h3 className="text-xl font-bold text-slate-900">For Students & Job Seekers</h3>
            </div>
          </div>
          <p className="text-sm text-slate-600 leading-relaxed">
            Never guess why your application got rejected again. ResuMates audits your resume through real recruiter filters, rewrites passive bullet points into strong accomplishments, and syncs directly into the resume builder.
          </p>
          <ul className="space-y-2 text-xs text-slate-700">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Instant detection of missing technical & soft skills keywords</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Google XYZ formula bullet point rewrites with 1-click copy</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Integrated Resume Builder with multiple ATS-optimized templates</span>
            </li>
          </ul>
          <button
            onClick={onStartAnalysis}
            className="text-xs font-bold text-indigo-800 hover:text-indigo-900 underline underline-offset-4 flex items-center gap-1 pt-2"
          >
            <span>Start Resume Scan</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </section>
    </div>
  );
};
