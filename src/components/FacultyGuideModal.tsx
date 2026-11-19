import React from 'react';
import { 
  GraduationCap, 
  X, 
  CheckCircle2, 
  BookOpen, 
  Award, 
  Users, 
  Sparkles, 
  FileCheck 
} from 'lucide-react';
import { SAMPLE_RESUMES } from '../data/sampleResumes';
import { SAMPLE_JOBS } from '../data/sampleJobs';

interface FacultyGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoadScenario: (resumeId: string, jobId: string) => void;
}

export const FacultyGuideModal: React.FC<FacultyGuideModalProps> = ({
  isOpen,
  onClose,
  onLoadScenario,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-in fade-in">
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden max-h-[90vh] flex flex-col">
        {/* Modal Header */}
        <div className="bg-amber-500 p-6 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-bold">Faculty Evaluator Guide</h3>
              <p className="text-xs text-amber-100">
                Instructional walkthrough for faculty mentors, professors & career centers
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-slate-700 text-xs sm:text-sm">
          {/* Target Working Prototype Workflow */}
          <div className="space-y-3 bg-amber-50/50 p-4 rounded-2xl border border-amber-200/80">
            <h4 className="font-bold text-amber-950 text-sm flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-600" />
              Standard Faculty Evaluation Workflow (Target Prototype)
            </h4>
            <ol className="space-y-2 list-decimal list-inside text-xs text-slate-800">
              <li><strong>Open ResuMates:</strong> Launch the application in your browser.</li>
              <li><strong>Upload Student Resume:</strong> Drag and drop any PDF/DOCX or select an authentic preloaded sample.</li>
              <li><strong>Paste Job Description:</strong> Insert a real job vacancy from industry or choose an industry benchmark preset.</li>
              <li><strong>Click "Analyze Resume":</strong> Watch the AI analysis engine process technical keywords, action verbs, and ATS compliance.</li>
              <li><strong>Review Match Percentage & Rubric:</strong> View the overall ATS score (0-100%) and letter grade (A+ through D).</li>
              <li><strong>Inspect Missing Skills:</strong> Point out critical keywords that the candidate failed to mention.</li>
              <li><strong>Provide Mentorship:</strong> Use the Google XYZ / STAR rewritten bullets to guide the student's revisions.</li>
            </ol>
          </div>

          {/* Quick 1-Click Faculty Demo Scenarios */}
          <div className="space-y-3">
            <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-indigo-600" />
              1-Click Demo Scenarios to Test Right Now
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <button
                onClick={() => {
                  onLoadScenario(SAMPLE_RESUMES[0].id, SAMPLE_JOBS[0].id);
                  onClose();
                }}
                className="p-3 text-left rounded-xl border border-slate-200 hover:border-indigo-400 bg-slate-50 hover:bg-indigo-50/50 transition group"
              >
                <div className="text-[10px] font-bold text-indigo-600 uppercase">Scenario A</div>
                <div className="font-bold text-slate-900 text-xs mt-1">SWE Lead vs Stripe</div>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Tests microservices, CI/CD, React, and passive verb detection.
                </p>
              </button>

              <button
                onClick={() => {
                  onLoadScenario(SAMPLE_RESUMES[1].id, SAMPLE_JOBS[1].id);
                  onClose();
                }}
                className="p-3 text-left rounded-xl border border-slate-200 hover:border-indigo-400 bg-slate-50 hover:bg-indigo-50/50 transition group"
              >
                <div className="text-[10px] font-bold text-indigo-600 uppercase">Scenario B</div>
                <div className="font-bold text-slate-900 text-xs mt-1">AI/ML vs DeepMind</div>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Tests PyTorch, LLMs, Vector DBs, and research paper citations.
                </p>
              </button>

              <button
                onClick={() => {
                  onLoadScenario(SAMPLE_RESUMES[2].id, SAMPLE_JOBS[2].id);
                  onClose();
                }}
                className="p-3 text-left rounded-xl border border-slate-200 hover:border-indigo-400 bg-slate-50 hover:bg-indigo-50/50 transition group"
              >
                <div className="text-[10px] font-bold text-indigo-600 uppercase">Scenario C</div>
                <div className="font-bold text-slate-900 text-xs mt-1">Faculty vs University</div>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Tests pedagogical experience, grants, and course development.
                </p>
              </button>
            </div>
          </div>

          {/* Grading Rubric Weights */}
          <div className="space-y-2 border-t border-slate-100 pt-4">
            <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider">
              Scoring Weights in ResuMates Algorithm
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs">
              <div className="p-2.5 rounded-lg bg-indigo-50 text-indigo-900 border border-indigo-100">
                <div className="font-extrabold text-base">40%</div>
                <div className="text-[11px]">Skills Overlap</div>
              </div>
              <div className="p-2.5 rounded-lg bg-blue-50 text-blue-900 border border-blue-100">
                <div className="font-extrabold text-base">25%</div>
                <div className="text-[11px]">Experience Depth</div>
              </div>
              <div className="p-2.5 rounded-lg bg-emerald-50 text-emerald-900 border border-emerald-100">
                <div className="font-extrabold text-base">20%</div>
                <div className="text-[11px]">ATS Readiness</div>
              </div>
              <div className="p-2.5 rounded-lg bg-amber-50 text-amber-900 border border-amber-100">
                <div className="font-extrabold text-base">15%</div>
                <div className="text-[11px]">Impact & Verbs</div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-900 text-white font-semibold text-xs transition"
          >
            Close Guide
          </button>
        </div>
      </div>
    </div>
  );
};
