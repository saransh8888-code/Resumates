import React, { useEffect, useState } from 'react';
import { 
  Cpu, 
  Sparkles, 
  CheckCircle2, 
  Loader2, 
  ShieldCheck, 
  Bot, 
  Layers, 
  Search 
} from 'lucide-react';

interface AIAnalysisModalProps {
  isOpen: boolean;
  onComplete: () => void;
}

const STAGES = [
  {
    title: 'Parsing Resume Structure',
    description: 'Deconstructing typography, contact metadata, and work experience entries...',
    icon: Search,
  },
  {
    title: 'Extracting Job Keywords',
    description: 'Isolating hard skills, required years, frameworks, and domain expectations...',
    icon: Layers,
  },
  {
    title: 'Computing ATS Match Score',
    description: 'Cross-referencing candidate profile against hiring requirements taxonomy...',
    icon: Cpu,
  },
  {
    title: 'Auditing Impact & Action Verbs',
    description: 'Benchmarking quantifiable metrics and flagging passive phrasing...',
    icon: ShieldCheck,
  },
  {
    title: 'Generating Tailored Bullet Improvements',
    description: 'Applying Google XYZ formula to synthesize high-impact rewritten bullets...',
    icon: Sparkles,
  },
];

export const AIAnalysisModal: React.FC<AIAnalysisModalProps> = ({
  isOpen,
  onComplete,
}) => {
  const [currentStageIndex, setCurrentStageIndex] = useState(0);

  useEffect(() => {
    if (!isOpen) {
      setCurrentStageIndex(0);
      return;
    }

    // Step through the processing stages smoothly
    const interval = setInterval(() => {
      setCurrentStageIndex((prev) => {
        if (prev < STAGES.length - 1) {
          return prev + 1;
        } else {
          clearInterval(interval);
          setTimeout(() => {
            onComplete();
          }, 400);
          return prev;
        }
      });
    }, 450);

    return () => clearInterval(interval);
  }, [isOpen, onComplete]);

  if (!isOpen) return null;

  const currentStage = STAGES[currentStageIndex];
  const progressPercent = Math.round(((currentStageIndex + 1) / STAGES.length) * 100);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden">
        {/* Header with animated gradient */}
        <div className="bg-gradient-to-r from-indigo-600 via-indigo-700 to-violet-600 p-6 text-white text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-xl pointer-events-none" />
          <div className="w-12 h-12 rounded-2xl bg-white/15 border border-white/20 backdrop-blur-md flex items-center justify-center mx-auto mb-3 shadow-inner">
            <Bot className="w-6 h-6 text-white animate-pulse" />
          </div>
          <h3 className="text-xl font-bold tracking-tight">
            ResuMates AI Analysis Engine
          </h3>
          <p className="text-xs text-indigo-100 mt-1">
            Processing candidate profile against target job criteria
          </p>

          {/* Progress Bar */}
          <div className="mt-5 w-full bg-indigo-950/40 rounded-full h-2 overflow-hidden p-0.5 border border-white/10">
            <div
              className="bg-white h-full rounded-full transition-all duration-300 ease-out shadow-xs"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <div className="flex justify-between items-center text-[11px] text-indigo-200 mt-1.5 font-medium px-1">
            <span>Stage {currentStageIndex + 1} of {STAGES.length}</span>
            <span>{progressPercent}% Complete</span>
          </div>
        </div>

        {/* Stages Checklist */}
        <div className="p-6 space-y-3 bg-slate-50/50">
          {STAGES.map((stage, idx) => {
            const Icon = stage.icon;
            const isDone = idx < currentStageIndex;
            const isCurrent = idx === currentStageIndex;

            return (
              <div
                key={idx}
                className={`flex items-start gap-3 p-3 rounded-xl transition-all ${
                  isCurrent
                    ? 'bg-white border border-indigo-200 shadow-xs scale-[1.01]'
                    : isDone
                    ? 'bg-emerald-50/50 border border-emerald-100 opacity-90'
                    : 'opacity-40'
                }`}
              >
                <div className="pt-0.5 shrink-0">
                  {isDone ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  ) : isCurrent ? (
                    <Loader2 className="w-5 h-5 text-indigo-600 animate-spin" />
                  ) : (
                    <Icon className="w-5 h-5 text-slate-400" />
                  )}
                </div>
                <div>
                  <h4
                    className={`text-xs font-bold ${
                      isCurrent
                        ? 'text-indigo-900'
                        : isDone
                        ? 'text-emerald-900'
                        : 'text-slate-600'
                    }`}
                  >
                    {stage.title}
                  </h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    {stage.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
