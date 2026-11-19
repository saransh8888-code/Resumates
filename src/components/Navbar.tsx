import React from 'react';
import { FileCheck, Sparkles, Edit3, GraduationCap, ArrowRight, RotateCcw } from 'lucide-react';
import { AppView } from '../types';
import { SAMPLE_RESUMES } from '../data/sampleResumes';
import { SAMPLE_JOBS } from '../data/sampleJobs';

interface NavbarProps {
  currentView: AppView;
  setCurrentView: (view: AppView) => void;
  onQuickLoadSample: (resumeId: string, jobId: string) => void;
  onOpenFacultyGuide: () => void;
  onReset: () => void;
  hasAnalysis: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  setCurrentView,
  onQuickLoadSample,
  onOpenFacultyGuide,
  onReset,
  hasAnalysis,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div 
            onClick={() => setCurrentView('landing')}
            className="flex items-center gap-3 cursor-pointer group select-none"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-700 to-violet-600 flex items-center justify-center text-white shadow-md shadow-indigo-200 group-hover:scale-105 transition-transform">
              <FileCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-xl tracking-tight text-slate-900 group-hover:text-indigo-600 transition-colors">
                  Resu<span className="text-indigo-600">Mates</span>
                </span>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200/60">
                  <Sparkles className="w-2.5 h-2.5" /> ATS 2.0
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium hidden sm:block">AI Resume Builder & ATS Checker</p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="flex items-center gap-1 sm:gap-2">
            <button
              onClick={() => setCurrentView('landing')}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                currentView === 'landing'
                  ? 'bg-slate-100 text-slate-900 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setCurrentView('analyzer')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all ${
                currentView === 'analyzer'
                  ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-300 font-semibold'
                  : 'text-slate-700 hover:text-indigo-600 hover:bg-indigo-50'
              }`}
            >
              <FileCheck className="w-4 h-4" />
              <span>ATS Analyzer</span>
              {hasAnalysis && (
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              )}
            </button>
            <button
              onClick={() => setCurrentView('builder')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all ${
                currentView === 'builder'
                  ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-300 font-semibold'
                  : 'text-slate-700 hover:text-indigo-600 hover:bg-indigo-50'
              }`}
            >
              <Edit3 className="w-4 h-4" />
              <span>Resume Builder</span>
            </button>
          </nav>

          {/* Quick Actions & Faculty Guide */}
          <div className="flex items-center gap-2">
            {/* Quick Demo Preset selector */}
            <div className="hidden lg:flex items-center gap-1 bg-slate-100 p-1 rounded-lg border border-slate-200 text-xs">
              <span className="text-slate-500 px-2 font-medium">Demo:</span>
              <button
                onClick={() => onQuickLoadSample(SAMPLE_RESUMES[0].id, SAMPLE_JOBS[0].id)}
                className="px-2 py-1 rounded bg-white hover:bg-indigo-50 hover:text-indigo-700 text-slate-700 font-medium shadow-xs transition"
                title="Load SWE Engineer Resume + Stripe Job"
              >
                SWE Lead
              </button>
              <button
                onClick={() => onQuickLoadSample(SAMPLE_RESUMES[1].id, SAMPLE_JOBS[1].id)}
                className="px-2 py-1 rounded bg-white hover:bg-indigo-50 hover:text-indigo-700 text-slate-700 font-medium shadow-xs transition"
                title="Load AI Data Scientist + DeepMind Job"
              >
                AI Scientist
              </button>
              <button
                onClick={() => onQuickLoadSample(SAMPLE_RESUMES[2].id, SAMPLE_JOBS[2].id)}
                className="px-2 py-1 rounded bg-white hover:bg-indigo-50 hover:text-indigo-700 text-slate-700 font-medium shadow-xs transition"
                title="Load Academic Faculty Candidate + University Job"
              >
                Faculty
              </button>
            </div>

            <button
              onClick={onOpenFacultyGuide}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-amber-200 bg-amber-50/70 hover:bg-amber-100/80 text-amber-900 text-xs font-semibold transition"
              title="Faculty Evaluation & Grading Guide"
            >
              <GraduationCap className="w-4 h-4 text-amber-600" />
              <span className="hidden sm:inline">Faculty Guide</span>
            </button>

            {hasAnalysis && (
              <button
                onClick={onReset}
                className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition"
                title="Reset scan"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
