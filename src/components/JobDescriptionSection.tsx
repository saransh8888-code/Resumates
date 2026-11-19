import React, { useMemo } from 'react';
import { 
  Briefcase, 
  Sparkles, 
  Trash2, 
  Tag, 
  Layers, 
  FileCheck, 
  AlertCircle 
} from 'lucide-react';
import { SAMPLE_JOBS, SampleJobPreset } from '../data/sampleJobs';
import { SKILLS_TAXONOMY } from '../data/skillsTaxonomy';

interface JobDescriptionSectionProps {
  jobText: string;
  setJobText: (text: string) => void;
  onSelectSampleJob: (sample: SampleJobPreset) => void;
}

export const JobDescriptionSection: React.FC<JobDescriptionSectionProps> = ({
  jobText,
  setJobText,
  onSelectSampleJob,
}) => {
  const wordCount = jobText ? jobText.trim().split(/\s+/).length : 0;
  const charCount = jobText ? jobText.length : 0;

  // Extract detected keywords from job description in real-time
  const detectedKeywords = useMemo(() => {
    if (!jobText || jobText.length < 30) return [];
    const lowerJob = jobText.toLowerCase();
    const found: string[] = [];

    for (const skill of SKILLS_TAXONOMY) {
      const terms = [skill.name.toLowerCase(), ...(skill.synonyms?.map(s => s.toLowerCase()) || [])];
      for (const term of terms) {
        const regex = new RegExp(`\\b${term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i');
        if (regex.test(lowerJob)) {
          found.push(skill.name);
          break;
        }
      }
    }
    return Array.from(new Set(found)).slice(0, 10);
  }, [jobText]);

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-5 sm:p-6 space-y-5">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-violet-100 text-violet-700 text-xs font-bold flex items-center justify-center">
              3
            </span>
            <h2 className="text-lg font-bold text-slate-900">Job Description</h2>
            <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full font-medium">
              Target Role
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Paste the requirements, qualifications, and responsibilities from the hiring organization.
          </p>
        </div>

        {jobText && (
          <button
            onClick={() => setJobText('')}
            className="text-xs text-rose-600 hover:text-rose-700 flex items-center gap-1 font-medium self-start sm:self-auto px-2.5 py-1 rounded-lg hover:bg-rose-50 transition"
          >
            <Trash2 className="w-3.5 h-3.5" /> Clear Job Description
          </button>
        )}
      </div>

      {/* Preset Sample Jobs */}
      <div className="bg-slate-50/80 rounded-xl p-3 border border-slate-200/60 space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="font-semibold text-slate-700 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-violet-600" />
            Quick Select Benchmark Job (Instant Test Case):
          </span>
          <span className="text-[11px] text-slate-500">1-click to test</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          {SAMPLE_JOBS.map((sample) => (
            <button
              key={sample.id}
              onClick={() => onSelectSampleJob(sample)}
              className="text-left p-2.5 rounded-lg bg-white border border-slate-200 hover:border-violet-300 hover:bg-violet-50/40 transition group"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-violet-600">
                  {sample.roleBadge.split('•')[0].trim()}
                </span>
                <span className="text-[10px] text-slate-500 group-hover:text-violet-600 font-medium">Load →</span>
              </div>
              <p className="text-xs font-bold text-slate-800 mt-1 truncate">
                {sample.title}
              </p>
              <p className="text-[11px] text-slate-500 truncate mt-0.5">
                {sample.company}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Textarea Area */}
      <div className="space-y-2">
        <textarea
          value={jobText}
          onChange={(e) => setJobText(e.target.value)}
          placeholder="Paste the full job description here (e.g., Responsibilities, Required Qualifications, Nice-to-haves, Tech Stack)..."
          rows={9}
          className="w-full text-xs font-mono p-4 rounded-xl border border-slate-300 focus:border-violet-500 focus:ring-2 focus:ring-violet-100 outline-none leading-relaxed transition resize-y"
        />

        <div className="flex items-center justify-between text-xs text-slate-500 px-1">
          <span>{wordCount} words • {charCount} characters</span>
          {wordCount < 40 && jobText.length > 0 && (
            <span className="text-amber-600 flex items-center gap-1 text-[11px]">
              <AlertCircle className="w-3 h-3" /> Tip: Include requirements section for accurate ATS score
            </span>
          )}
        </div>
      </div>

      {/* Detected Job Keywords Preview */}
      {detectedKeywords.length > 0 && (
        <div className="bg-violet-50/40 rounded-xl p-3 border border-violet-100 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-violet-900 flex items-center gap-1.5">
              <Tag className="w-3.5 h-3.5 text-violet-600" />
              Detected Key Requirements in Posting:
            </span>
            <span className="text-[11px] text-violet-600 font-medium">
              {detectedKeywords.length} primary skills extracted
            </span>
          </div>

          <div className="flex flex-wrap gap-1.5 pt-1">
            {detectedKeywords.map((kw, i) => (
              <span
                key={i}
                className="px-2 py-0.5 rounded-md bg-white border border-violet-200 text-violet-800 text-[11px] font-medium shadow-2xs"
              >
                {kw}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
