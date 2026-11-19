import React, { useState } from 'react';
import { ResumeData, ResumeTemplateId, BulletRewrite } from '../../types';
import { ResumeEditor } from './ResumeEditor';
import { ResumePreview } from './ResumePreview';
import { 
  Printer, 
  Download, 
  Sparkles, 
  FileCheck, 
  Layout, 
  Eye, 
  RotateCcw,
  Plus
} from 'lucide-react';
import { SAMPLE_RESUMES } from '../../data/sampleResumes';

interface ResumeBuilderContainerProps {
  resumeData: ResumeData;
  setResumeData: React.Dispatch<React.SetStateAction<ResumeData>>;
  onBackToAnalyzer: () => void;
  missingSkillsToQuickAdd?: string[];
}

export const ResumeBuilderContainer: React.FC<ResumeBuilderContainerProps> = ({
  resumeData,
  setResumeData,
  onBackToAnalyzer,
  missingSkillsToQuickAdd = [],
}) => {
  const [templateId, setTemplateId] = useState<ResumeTemplateId>('modern');
  const [activeTabMobile, setActiveTabMobile] = useState<'editor' | 'preview'>('editor');

  const handlePrint = () => {
    window.print();
  };

  const handleResetToSample = () => {
    if (confirm('Load sample Software Engineer resume into editor? (Your current changes will be overwritten)')) {
      setResumeData(SAMPLE_RESUMES[0].structured);
    }
  };

  return (
    <div className="space-y-6 pb-20">
      {/* Top Controls Toolbar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-slate-900">
              Interactive Resume Builder
            </h1>
            <span className="text-[11px] font-semibold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
              Live Preview & ATS Ready
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Craft your ATS-optimized resume. Apply AI-rewritten bullets and missing skills with 1-click.
          </p>
        </div>

        {/* Template Selector & Action Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Template Selector */}
          <div className="flex items-center bg-slate-100 p-1 rounded-xl text-xs font-medium">
            {[
              { id: 'modern', label: 'Modern' },
              { id: 'classic', label: 'Classic ATS' },
              { id: 'academic', label: 'Academic' },
              { id: 'executive', label: 'Executive' },
            ].map((tmpl) => (
              <button
                key={tmpl.id}
                onClick={() => setTemplateId(tmpl.id as ResumeTemplateId)}
                className={`px-2.5 py-1 rounded-lg transition-all ${
                  templateId === tmpl.id
                    ? 'bg-white text-indigo-700 shadow-xs font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {tmpl.label}
              </button>
            ))}
          </div>

          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs shadow-xs transition"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print / PDF</span>
          </button>

          <button
            onClick={onBackToAnalyzer}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold text-xs transition"
          >
            <FileCheck className="w-3.5 h-3.5 text-indigo-600" />
            <span>Check in ATS Analyzer</span>
          </button>
        </div>
      </div>

      {/* Mobile Toggle: Editor vs Preview */}
      <div className="flex lg:hidden bg-slate-200 p-1 rounded-xl text-xs font-semibold">
        <button
          onClick={() => setActiveTabMobile('editor')}
          className={`flex-1 py-2 text-center rounded-lg transition ${
            activeTabMobile === 'editor' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
          }`}
        >
          Form Editor
        </button>
        <button
          onClick={() => setActiveTabMobile('preview')}
          className={`flex-1 py-2 text-center rounded-lg transition ${
            activeTabMobile === 'preview' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
          }`}
        >
          Live A4 Preview
        </button>
      </div>

      {/* Dual Column Layout: Editor & Live Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Form Editor (5 cols) */}
        <div className={`lg:col-span-6 space-y-4 ${activeTabMobile === 'editor' ? 'block' : 'hidden lg:block'}`}>
          <div className="flex items-center justify-between text-xs font-semibold text-slate-600 px-1">
            <span>Edit Resume Content</span>
            <button
              onClick={handleResetToSample}
              className="text-indigo-600 hover:text-indigo-800 flex items-center gap-1 font-medium"
            >
              <RotateCcw className="w-3 h-3" /> Reset to Sample
            </button>
          </div>

          <ResumeEditor
            resumeData={resumeData}
            setResumeData={setResumeData}
            missingSkillsToQuickAdd={missingSkillsToQuickAdd}
          />
        </div>

        {/* Right Column: Live A4 Preview (6 cols) */}
        <div className={`lg:col-span-6 space-y-4 ${activeTabMobile === 'preview' ? 'block' : 'hidden lg:block'}`}>
          <div className="flex items-center justify-between text-xs font-semibold text-slate-600 px-1">
            <span>Real-time A4 Print Preview ({templateId.toUpperCase()})</span>
            <span className="text-[11px] text-slate-400">Updates instantly on typing</span>
          </div>

          <div className="sticky top-20">
            <ResumePreview
              resumeData={resumeData}
              templateId={templateId}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
