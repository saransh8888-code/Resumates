import React, { useState } from 'react';
import { 
  AnalysisResult, 
  SkillMatch, 
  BulletRewrite, 
  ImprovementItem,
  ResumeData
} from '../types';
import { 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  Sparkles, 
  Copy, 
  Check, 
  Edit3, 
  Printer, 
  GraduationCap, 
  ChevronRight, 
  ArrowUpRight, 
  ShieldCheck, 
  Layers, 
  Target, 
  Info,
  PlusCircle,
  FileText
} from 'lucide-react';
import { fireConfetti } from '../utils/confetti';

interface ResultsDashboardProps {
  analysis: AnalysisResult;
  onOpenBuilder: () => void;
  onApplySkillToResume?: (skillName: string) => void;
  onApplyBulletToResume?: (rewrite: BulletRewrite) => void;
  onPrintReport: () => void;
  onStartNewScan: () => void;
}

export const ResultsDashboard: React.FC<ResultsDashboardProps> = ({
  analysis,
  onOpenBuilder,
  onApplySkillToResume,
  onApplyBulletToResume,
  onPrintReport,
  onStartNewScan,
}) => {
  const [activeTab, setActiveTab] = useState<'skills' | 'gaps' | 'rewrites' | 'checklist' | 'faculty'>('skills');
  const [skillFilter, setSkillFilter] = useState<'all' | 'matching' | 'missing'>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [completedItems, setCompletedItems] = useState<Record<string, boolean>>({});

  const handleCopyBullet = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const toggleChecklist = (id: string) => {
    setCompletedItems(prev => ({ ...prev, [id]: !prev[id] }));
  };

  // Score styling
  const score = analysis.overallScore;
  const scoreColor = 
    score >= 80 ? 'text-emerald-600' :
    score >= 65 ? 'text-amber-500' : 'text-rose-500';
  
  const scoreBg = 
    score >= 80 ? 'bg-emerald-50 border-emerald-200' :
    score >= 65 ? 'bg-amber-50 border-amber-200' : 'bg-rose-50 border-rose-200';

  const displayedSkills = 
    skillFilter === 'matching' ? analysis.matchingSkills :
    skillFilter === 'missing' ? analysis.missingSkills :
    [...analysis.matchingSkills, ...analysis.missingSkills];

  return (
    <div className="space-y-6 pb-16 animate-in fade-in duration-300">
      {/* Top Banner / Match Percentage Section */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
          {/* Target Role & Grade Info */}
          <div className="space-y-3 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-semibold">
              <Target className="w-3.5 h-3.5" />
              <span>Target Role: {analysis.jobSummary.title}</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              ATS Compatibility & Gap Analysis
            </h1>
            <p className="text-sm text-slate-600 max-w-xl">
              Evaluated {analysis.jobSummary.keyRequirementsCount} required competencies against your resume profile. 
              {score >= 80 ? (
                <span className="text-emerald-700 font-semibold ml-1">
                  Strong candidate match — ready for technical interview loops!
                </span>
              ) : (
                <span className="text-amber-700 font-semibold ml-1">
                  Good baseline. Adding the missing keywords below will immediately raise your score.
                </span>
              )}
            </p>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 pt-1">
              <span className="text-xs text-slate-500">Scanned on: {analysis.analyzedAt}</span>
              <span className="text-xs text-slate-300">•</span>
              <button
                onClick={() => fireConfetti()}
                className="text-xs text-indigo-600 hover:text-indigo-700 font-semibold flex items-center gap-1 cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5" /> Celebrate Analysis
              </button>
            </div>
          </div>

          {/* Big Circular Match Score & ATS Grade */}
          <div className="flex items-center gap-5 sm:gap-8 bg-slate-50/70 p-5 rounded-2xl border border-slate-200">
            <div className="text-center">
              <div className="relative inline-flex items-center justify-center">
                <svg className="w-24 h-24 sm:w-28 sm:h-28 transform -rotate-90">
                  <circle
                    cx="56"
                    cy="56"
                    r="46"
                    stroke="currentColor"
                    strokeWidth="8"
                    className="text-slate-200"
                    fill="transparent"
                  />
                  <circle
                    cx="56"
                    cy="56"
                    r="46"
                    stroke="currentColor"
                    strokeWidth="8"
                    strokeDasharray={2 * Math.PI * 46}
                    strokeDashoffset={2 * Math.PI * 46 * (1 - score / 100)}
                    strokeLinecap="round"
                    className={`${scoreColor} transition-all duration-1000 ease-out`}
                    fill="transparent"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className={`text-2xl sm:text-3xl font-extrabold ${scoreColor}`}>
                    {score}%
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                    Match
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-1.5 border-l border-slate-200 pl-4 sm:pl-6">
              <div className="text-xs text-slate-500 font-medium">ATS Grade</div>
              <div className={`text-2xl sm:text-3xl font-extrabold ${scoreColor}`}>
                {analysis.atsGrade}
              </div>
              <div className="text-[11px] font-semibold text-slate-600">
                {score >= 80 ? 'Top 10% Applicant' : score >= 65 ? 'Competitive Profile' : 'Needs Optimization'}
              </div>
            </div>
          </div>
        </div>

        {/* Breakdown Sub-scores */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 mt-6 border-t border-slate-100">
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/60">
            <div className="flex items-center justify-between text-xs text-slate-600 mb-1">
              <span>Skills Overlap</span>
              <span className="font-bold text-slate-900">{analysis.breakdown.skillsMatch}%</span>
            </div>
            <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
              <div className="bg-indigo-600 h-full rounded-full" style={{ width: `${analysis.breakdown.skillsMatch}%` }} />
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/60">
            <div className="flex items-center justify-between text-xs text-slate-600 mb-1">
              <span>Experience Relevance</span>
              <span className="font-bold text-slate-900">{analysis.breakdown.experienceRelevance}%</span>
            </div>
            <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
              <div className="bg-blue-600 h-full rounded-full" style={{ width: `${analysis.breakdown.experienceRelevance}%` }} />
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/60">
            <div className="flex items-center justify-between text-xs text-slate-600 mb-1">
              <span>ATS Format Score</span>
              <span className="font-bold text-slate-900">{analysis.breakdown.atsReadiness}%</span>
            </div>
            <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
              <div className="bg-emerald-600 h-full rounded-full" style={{ width: `${analysis.breakdown.atsReadiness}%` }} />
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/60">
            <div className="flex items-center justify-between text-xs text-slate-600 mb-1">
              <span>Action Verbs & Impact</span>
              <span className="font-bold text-slate-900">{analysis.breakdown.impactAndVerbs}%</span>
            </div>
            <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
              <div className="bg-amber-600 h-full rounded-full" style={{ width: `${analysis.breakdown.impactAndVerbs}%` }} />
            </div>
          </div>
        </div>

        {/* Action Button Row */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-6 mt-6 border-t border-slate-100">
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={onOpenBuilder}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs shadow-md shadow-indigo-200 transition"
            >
              <Edit3 className="w-4 h-4" />
              <span>Apply Fixes in Resume Builder</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={onPrintReport}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white hover:bg-slate-50 text-slate-700 font-semibold text-xs border border-slate-200 transition"
            >
              <Printer className="w-4 h-4 text-slate-500" />
              <span>Print Evaluation Report</span>
            </button>
          </div>

          <button
            onClick={onStartNewScan}
            className="text-xs text-slate-500 hover:text-slate-800 font-medium transition"
          >
            ← Start New Scan
          </button>
        </div>
      </div>

      {/* Navigation Tabs for Results */}
      <div className="flex border-b border-slate-200 overflow-x-auto gap-2 text-xs font-semibold text-slate-600">
        <button
          onClick={() => setActiveTab('skills')}
          className={`flex items-center gap-1.5 py-3 px-4 border-b-2 transition-all whitespace-nowrap ${
            activeTab === 'skills'
              ? 'border-indigo-600 text-indigo-700 bg-indigo-50/40 rounded-t-lg'
              : 'border-transparent hover:text-slate-900 hover:border-slate-300'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Skills Match ({analysis.matchingSkills.length}/{analysis.matchingSkills.length + analysis.missingSkills.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('gaps')}
          className={`flex items-center gap-1.5 py-3 px-4 border-b-2 transition-all whitespace-nowrap ${
            activeTab === 'gaps'
              ? 'border-indigo-600 text-indigo-700 bg-indigo-50/40 rounded-t-lg'
              : 'border-transparent hover:text-slate-900 hover:border-slate-300'
          }`}
        >
          <AlertTriangle className="w-4 h-4 text-amber-500" />
          <span>Strengths & Experience Gaps ({analysis.experienceGaps.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('rewrites')}
          className={`flex items-center gap-1.5 py-3 px-4 border-b-2 transition-all whitespace-nowrap ${
            activeTab === 'rewrites'
              ? 'border-indigo-600 text-indigo-700 bg-indigo-50/40 rounded-t-lg'
              : 'border-transparent hover:text-slate-900 hover:border-slate-300'
          }`}
        >
          <Sparkles className="w-4 h-4 text-indigo-600" />
          <span>Rewritten Bullets Workshop ({analysis.bulletRewrites.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('checklist')}
          className={`flex items-center gap-1.5 py-3 px-4 border-b-2 transition-all whitespace-nowrap ${
            activeTab === 'checklist'
              ? 'border-indigo-600 text-indigo-700 bg-indigo-50/40 rounded-t-lg'
              : 'border-transparent hover:text-slate-900 hover:border-slate-300'
          }`}
        >
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Prioritized Action Plan ({analysis.improvements.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('faculty')}
          className={`flex items-center gap-1.5 py-3 px-4 border-b-2 transition-all whitespace-nowrap ${
            activeTab === 'faculty'
              ? 'border-amber-600 text-amber-800 bg-amber-50/40 rounded-t-lg'
              : 'border-transparent hover:text-slate-900 hover:border-slate-300'
          }`}
        >
          <GraduationCap className="w-4 h-4 text-amber-600" />
          <span>Faculty Advisory Rubric</span>
        </button>
      </div>

      {/* Tab 1: Skills & Keywords Breakdown */}
      {activeTab === 'skills' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200">
            <div>
              <h3 className="font-bold text-slate-900 text-sm">
                Target Competencies & Keyword Density
              </h3>
              <p className="text-xs text-slate-500">
                Skills required in the job description compared against your resume. Click any missing skill to add it directly.
              </p>
            </div>

            <div className="flex items-center bg-slate-100 p-1 rounded-xl text-xs font-medium self-start sm:self-auto">
              <button
                onClick={() => setSkillFilter('all')}
                className={`px-3 py-1 rounded-lg transition ${skillFilter === 'all' ? 'bg-white text-slate-900 shadow-xs font-semibold' : 'text-slate-600'}`}
              >
                All ({analysis.matchingSkills.length + analysis.missingSkills.length})
              </button>
              <button
                onClick={() => setSkillFilter('missing')}
                className={`px-3 py-1 rounded-lg transition ${skillFilter === 'missing' ? 'bg-rose-50 text-rose-700 shadow-xs font-semibold' : 'text-slate-600'}`}
              >
                Missing ({analysis.missingSkills.length})
              </button>
              <button
                onClick={() => setSkillFilter('matching')}
                className={`px-3 py-1 rounded-lg transition ${skillFilter === 'matching' ? 'bg-emerald-50 text-emerald-700 shadow-xs font-semibold' : 'text-slate-600'}`}
              >
                Matching ({analysis.matchingSkills.length})
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {displayedSkills.map((skill, index) => {
              const isMatch = skill.inResume;
              return (
                <div
                  key={index}
                  className={`p-3.5 rounded-xl border transition-all ${
                    isMatch
                      ? 'bg-emerald-50/40 border-emerald-200 hover:bg-emerald-50'
                      : 'bg-rose-50/40 border-rose-200 hover:bg-rose-50'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2">
                      {isMatch ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      ) : (
                        <XCircle className="w-4 h-4 text-rose-500 shrink-0" />
                      )}
                      <div>
                        <h4 className="font-bold text-slate-900 text-xs sm:text-sm">
                          {skill.name}
                        </h4>
                        <span className="text-[10px] text-slate-500 capitalize">
                          {skill.category}
                        </span>
                      </div>
                    </div>

                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                        skill.importance === 'critical'
                          ? 'bg-rose-100 text-rose-800'
                          : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {skill.importance}
                    </span>
                  </div>

                  <div className="mt-3 pt-2 border-t border-slate-200/60 flex items-center justify-between text-[11px]">
                    <span className="text-slate-500">
                      In Job: <strong>{skill.frequencyInJob}x</strong> • In Resume:{' '}
                      <strong className={isMatch ? 'text-emerald-700' : 'text-rose-600'}>
                        {skill.frequencyInResume}x
                      </strong>
                    </span>

                    {!isMatch && onApplySkillToResume && (
                      <button
                        onClick={() => onApplySkillToResume(skill.name)}
                        className="flex items-center gap-1 text-[11px] font-semibold text-indigo-600 hover:text-indigo-800"
                        title="Add this skill to your resume profile"
                      >
                        <PlusCircle className="w-3 h-3" /> Add
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Tab 2: Strengths & Experience Gaps */}
      {activeTab === 'gaps' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Strengths Column */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 border-b border-emerald-100 pb-3">
              <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                ✓
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-sm">Key Resume Strengths</h3>
                <p className="text-xs text-slate-500">What makes this candidate stand out positively</p>
              </div>
            </div>

            <div className="space-y-3">
              {analysis.strengths.map((str, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-emerald-50/40 border border-emerald-200 space-y-1.5"
                >
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <h4 className="font-bold text-emerald-950 text-xs sm:text-sm">
                      {str.title}
                    </h4>
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed pl-6">
                    {str.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Experience Gaps Column */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 border-b border-amber-100 pb-3">
              <div className="w-7 h-7 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
                !
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-sm">Experience Gaps & ATS Red Flags</h3>
                <p className="text-xs text-slate-500">Areas that could lead to automated ATS filtering</p>
              </div>
            </div>

            <div className="space-y-3">
              {analysis.experienceGaps.map((gap, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-amber-50/40 border border-amber-200 space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                      <h4 className="font-bold text-amber-950 text-xs sm:text-sm">
                        {gap.title}
                      </h4>
                    </div>
                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                        gap.severity === 'high'
                          ? 'bg-rose-100 text-rose-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {gap.severity} Priority
                    </span>
                  </div>

                  <p className="text-xs text-slate-700 leading-relaxed pl-6">
                    {gap.description}
                  </p>

                  <div className="mt-2 pt-2 border-t border-amber-200/60 pl-6 flex items-start gap-1.5 text-xs text-amber-900 font-medium">
                    <Sparkles className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                    <span><strong>Fix:</strong> {gap.recommendation}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Bullet Points Improvement Workshop */}
      {activeTab === 'rewrites' && (
        <div className="space-y-4">
          <div className="bg-indigo-50/50 p-4 rounded-2xl border border-indigo-100">
            <h3 className="font-bold text-indigo-950 text-sm flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-indigo-600" />
              Google XYZ / STAR Bullet Point Transformer
            </h3>
            <p className="text-xs text-indigo-800/80 mt-1">
              Formula: <em>Accomplished [X] as measured by [Y], by doing [Z]</em>. We replaced weak verbs with power action verbs and infused missing target job keywords.
            </p>
          </div>

          <div className="space-y-4">
            {analysis.bulletRewrites.map((rewrite, idx) => (
              <div
                key={rewrite.id || idx}
                className="bg-white rounded-2xl border border-slate-200 p-5 space-y-4 shadow-2xs hover:border-indigo-300 transition"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Bullet Point #{idx + 1}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold">
                      +{rewrite.scoreImprovement}% Score Boost
                    </span>
                    {rewrite.strongVerbUsed && (
                      <span className="px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-800 text-[11px] font-bold">
                        Power Verb: {rewrite.strongVerbUsed}
                      </span>
                    )}
                  </div>
                </div>

                {/* Before vs After Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Before */}
                  <div className="bg-rose-50/40 p-3.5 rounded-xl border border-rose-200 space-y-2">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-rose-800 flex items-center gap-1">
                      <XCircle className="w-3.5 h-3.5" /> Original (Before)
                    </div>
                    <p className="text-xs font-mono text-slate-800 leading-relaxed">
                      {rewrite.original}
                    </p>
                    {rewrite.weakVerbReplaced && (
                      <div className="text-[10px] text-rose-600 font-medium">
                        Passive phrasing flagged: "{rewrite.weakVerbReplaced}"
                      </div>
                    )}
                  </div>

                  {/* After */}
                  <div className="bg-emerald-50/40 p-3.5 rounded-xl border border-emerald-200 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> AI Rewritten (After)
                      </div>
                      <button
                        onClick={() => handleCopyBullet(rewrite.id, rewrite.rewritten)}
                        className="text-xs font-semibold text-emerald-700 hover:text-emerald-900 flex items-center gap-1 px-2 py-0.5 rounded bg-white border border-emerald-300 transition"
                      >
                        {copiedId === rewrite.id ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-600" /> Copied!
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" /> Copy
                          </>
                        )}
                      </button>
                    </div>
                    <p className="text-xs font-mono font-medium text-emerald-950 leading-relaxed">
                      {rewrite.rewritten}
                    </p>
                    {rewrite.keywordsAdded.length > 0 && (
                      <div className="flex flex-wrap items-center gap-1 text-[10px] text-emerald-700">
                        <span>Keywords infused:</span>
                        {rewrite.keywordsAdded.map((kw, k) => (
                          <span key={k} className="px-1.5 py-0.2 rounded bg-emerald-200/70 font-semibold">
                            {kw}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Reason Explanation */}
                <div className="text-xs text-slate-600 bg-slate-50 p-3 rounded-xl flex items-start gap-2">
                  <Info className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Why this is better:</strong> {rewrite.improvementReason}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 4: Prioritized Action Plan / Improvement Checklist */}
      {activeTab === 'checklist' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-5">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="font-bold text-slate-900 text-sm">
              Prioritized Optimization Checklist
            </h3>
            <p className="text-xs text-slate-500">
              Track your progress. Checking off these items will elevate candidate competitiveness to 90%+.
            </p>
          </div>

          <div className="space-y-3">
            {analysis.improvements.map((item) => {
              const isChecked = !!completedItems[item.id];
              return (
                <div
                  key={item.id}
                  onClick={() => toggleChecklist(item.id)}
                  className={`p-4 rounded-xl border cursor-pointer transition-all flex items-start gap-3 ${
                    isChecked
                      ? 'bg-slate-50 border-slate-200 opacity-60'
                      : 'bg-white border-slate-200 hover:border-indigo-300 shadow-2xs'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => {}} // handled by parent div
                    className="mt-1 h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                  />
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <h4
                        className={`text-xs sm:text-sm font-bold ${
                          isChecked ? 'line-through text-slate-500' : 'text-slate-900'
                        }`}
                      >
                        {item.title}
                      </h4>
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                            item.category === 'Critical'
                              ? 'bg-rose-100 text-rose-800'
                              : item.category === 'Recommended'
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-blue-100 text-blue-800'
                          }`}
                        >
                          {item.category}
                        </span>
                        <span className="text-xs font-bold text-emerald-600">
                          +{item.impactScore}%
                        </span>
                      </div>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Tab 5: Faculty Advisory Rubric */}
      {activeTab === 'faculty' && analysis.facultyNotes && (
        <div className="bg-amber-50/40 rounded-3xl border border-amber-200 p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-500 text-white flex items-center justify-center shadow-md shadow-amber-200">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-700">
                Academic Evaluation Rubric
              </span>
              <h3 className="text-xl font-bold text-slate-900">
                Faculty Member Review Notes & Grading Summary
              </h3>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-xl border border-amber-200 space-y-1">
              <span className="text-xs font-semibold text-slate-500">Evaluation Grade</span>
              <div className="text-2xl font-extrabold text-amber-600">
                Grade: {analysis.facultyNotes.recommendedGrade}
              </div>
              <p className="text-xs text-slate-600">
                Based on industry ATS benchmarks and technical keyword presence.
              </p>
            </div>

            <div className="bg-white p-4 rounded-xl border border-amber-200 space-y-1">
              <span className="text-xs font-semibold text-slate-500">Readiness Status</span>
              <div className="text-base font-bold text-slate-900">
                {analysis.facultyNotes.overallReadiness}
              </div>
              <p className="text-xs text-slate-600">
                Placement recommendations for university career center advisement.
              </p>
            </div>
          </div>

          {/* Mentorship Talking Points */}
          <div className="bg-white p-5 rounded-2xl border border-amber-200 space-y-3">
            <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-600" />
              Recommended 1-on-1 Mentorship Action Items for Faculty
            </h4>
            <ul className="space-y-2 text-xs text-slate-700">
              {analysis.facultyNotes.mentorshipAdvice.map((advice, i) => (
                <li key={i} className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{advice}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};
