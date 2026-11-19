import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HomeHero } from './components/HomeHero';
import { ResumeUploadSection } from './components/ResumeUploadSection';
import { JobDescriptionSection } from './components/JobDescriptionSection';
import { AIAnalysisModal } from './components/AIAnalysisModal';
import { ResultsDashboard } from './components/ResultsDashboard';
import { ResumeBuilderContainer } from './components/ResumeBuilder/ResumeBuilderContainer';
import { FacultyGuideModal } from './components/FacultyGuideModal';
import { AppView, ResumeData, AnalysisResult, BulletRewrite } from './types';
import { SAMPLE_RESUMES, SampleResumePreset } from './data/sampleResumes';
import { SAMPLE_JOBS, SampleJobPreset } from './data/sampleJobs';
import { analyzeResumeAgainstJob } from './utils/aiAnalyzer';
import { fireConfetti } from './utils/confetti';
import { 
  Sparkles, 
  ArrowRight, 
  FileCheck, 
  AlertCircle, 
  Cpu, 
  RotateCcw,
  GraduationCap
} from 'lucide-react';

export const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>('landing');
  const [resumeText, setResumeText] = useState<string>('');
  const [parsedResume, setParsedResume] = useState<ResumeData | null>(null);
  const [jobText, setJobText] = useState<string>('');
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [facultyGuideOpen, setFacultyGuideOpen] = useState<boolean>(false);
  
  // Data model for Resume Builder (defaults to sample SWE resume)
  const [builderData, setBuilderData] = useState<ResumeData>(SAMPLE_RESUMES[0].structured);

  // Quick load scenario
  const handleQuickLoadSample = (resumeId: string, jobId: string, autoAnalyze: boolean = false) => {
    const resumePreset = SAMPLE_RESUMES.find(r => r.id === resumeId) || SAMPLE_RESUMES[0];
    const jobPreset = SAMPLE_JOBS.find(j => j.id === jobId) || SAMPLE_JOBS[0];

    setResumeText(resumePreset.rawText);
    setParsedResume(resumePreset.structured);
    setBuilderData(resumePreset.structured);
    setJobText(jobPreset.jobText);
    setCurrentView('analyzer');

    if (autoAnalyze) {
      setTimeout(() => {
        handleTriggerAnalysis(resumePreset.rawText, jobPreset.jobText);
      }, 200);
    }
  };

  const handleSelectSampleResume = (sample: SampleResumePreset) => {
    setResumeText(sample.rawText);
    setParsedResume(sample.structured);
    setBuilderData(sample.structured);
  };

  const handleSelectSampleJob = (sample: SampleJobPreset) => {
    setJobText(sample.jobText);
  };

  const handleTriggerAnalysis = async (customResumeText?: string, customJobText?: string) => {
    const rText = customResumeText || resumeText;
    const jText = customJobText || jobText;

    if (!rText || rText.trim().length < 30) {
      alert('Please upload a resume or select a sample resume before running analysis.');
      return;
    }
    if (!jText || jText.trim().length < 30) {
      alert('Please paste a job description or choose a benchmark job posting.');
      return;
    }

    setIsAnalyzing(true);
  };

  // Called when AIAnalysisModal progress finishes
  const handleAnalysisCompleted = async () => {
    try {
      const result = await analyzeResumeAgainstJob(resumeText, jobText);
      setAnalysisResult(result);
      setIsAnalyzing(false);
      fireConfetti();
    } catch (err) {
      console.error(err);
      setIsAnalyzing(false);
      alert('Failed to analyze resume. Please verify text inputs.');
    }
  };

  const handleReset = () => {
    setResumeText('');
    setParsedResume(null);
    setJobText('');
    setAnalysisResult(null);
    setCurrentView('analyzer');
  };

  // 1-Click apply missing skill into Resume Builder
  const handleApplySkillToResume = (skillName: string) => {
    setBuilderData(prev => {
      const newSkills = [...prev.skills];
      if (newSkills.length === 0) {
        newSkills.push({ category: 'Key Technical Skills', items: [skillName] });
      } else {
        const cat = newSkills[0];
        if (!cat.items.includes(skillName)) {
          cat.items.push(skillName);
        }
      }
      return { ...prev, skills: newSkills };
    });
    alert(`Added "${skillName}" to your Resume Builder skills!`);
  };

  // 1-Click apply rewritten bullet point to Resume Builder
  const handleApplyBulletToResume = (rewrite: BulletRewrite) => {
    setBuilderData(prev => {
      const newExperience = [...prev.experience];
      if (newExperience.length > 0) {
        newExperience[0].bullets = [rewrite.rewritten, ...newExperience[0].bullets];
      }
      return { ...prev, experience: newExperience };
    });
    alert(`Applied rewritten bullet point to your Resume Builder experience!`);
  };

  const canAnalyze = resumeText.trim().length >= 30 && jobText.trim().length >= 30;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900">
      {/* Navigation */}
      <Navbar
        currentView={currentView}
        setCurrentView={setCurrentView}
        onQuickLoadSample={(rId, jId) => handleQuickLoadSample(rId, jId, true)}
        onOpenFacultyGuide={() => setFacultyGuideOpen(true)}
        onReset={handleReset}
        hasAnalysis={!!analysisResult}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-6">
        {/* VIEW 1: HOME PAGE (Section 1) */}
        {currentView === 'landing' && (
          <HomeHero
            onStartAnalysis={() => setCurrentView('analyzer')}
            onOpenBuilder={() => setCurrentView('builder')}
            onQuickDemo={(rId, jId) => handleQuickLoadSample(rId, jId, true)}
            onOpenFacultyGuide={() => setFacultyGuideOpen(true)}
          />
        )}

        {/* VIEW 2: ATS ANALYZER (Sections 2, 3, 4, 5) */}
        {currentView === 'analyzer' && (
          <div className="space-y-8">
            {/* If analysis result exists, show Results Dashboard (Section 5) */}
            {analysisResult ? (
              <ResultsDashboard
                analysis={analysisResult}
                onOpenBuilder={() => setCurrentView('builder')}
                onApplySkillToResume={handleApplySkillToResume}
                onApplyBulletToResume={handleApplyBulletToResume}
                onPrintReport={() => window.print()}
                onStartNewScan={() => setAnalysisResult(null)}
              />
            ) : (
              /* Input Workflow: Section 2 (Resume) and Section 3 (Job Description) */
              <div className="space-y-6 pb-20">
                {/* Workflow Stepper Header */}
                <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h1 className="text-xl font-bold text-slate-900 tracking-tight">
                        Resume & Job Description Analysis
                      </h1>
                      <p className="text-xs text-slate-500 mt-1">
                        Upload your candidate resume on the left, paste the target job posting on the right, and launch the AI engine.
                      </p>
                    </div>

                    {/* Pre-fill All Button for instant faculty trial */}
                    <button
                      onClick={() => handleQuickLoadSample(SAMPLE_RESUMES[0].id, SAMPLE_JOBS[0].id, false)}
                      className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-semibold border border-indigo-200/80 transition self-start sm:self-auto"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Pre-fill Sample Data (1-Click)</span>
                    </button>
                  </div>
                </div>

                {/* Two-column Input Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
                  {/* Section 2: Resume Upload */}
                  <ResumeUploadSection
                    resumeText={resumeText}
                    setResumeText={setResumeText}
                    parsedResume={parsedResume}
                    setParsedResume={(res) => {
                      setParsedResume(res);
                      if (res) setBuilderData(res);
                    }}
                    onSelectSampleResume={handleSelectSampleResume}
                  />

                  {/* Section 3: Job Description */}
                  <JobDescriptionSection
                    jobText={jobText}
                    setJobText={setJobText}
                    onSelectSampleJob={handleSelectSampleJob}
                  />
                </div>

                {/* Action Bar / Trigger AI Analysis Button */}
                <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${canAnalyze ? 'bg-emerald-500 animate-ping' : 'bg-slate-300'}`} />
                    <span className="text-xs text-slate-600 font-medium">
                      {canAnalyze ? (
                        <span className="text-emerald-700 font-semibold">
                          Both inputs ready! Click below to compute ATS match and generate bullet improvements.
                        </span>
                      ) : (
                        <span>
                          Please provide both a resume (PDF/DOCX/text) and a target job description.
                        </span>
                      )}
                    </span>
                  </div>

                  <button
                    onClick={() => handleTriggerAnalysis()}
                    disabled={!canAnalyze}
                    className={`flex items-center gap-2 px-8 py-3.5 rounded-xl font-bold text-sm transition-all shadow-md ${
                      canAnalyze
                        ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-300 hover:shadow-indigo-400 cursor-pointer transform hover:-translate-y-0.5'
                        : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                    }`}
                  >
                    <Cpu className="w-4 h-4" />
                    <span>Analyze Resume (AI Engine)</span>
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* VIEW 3: RESUME BUILDER */}
        {currentView === 'builder' && (
          <ResumeBuilderContainer
            resumeData={builderData}
            setResumeData={setBuilderData}
            onBackToAnalyzer={() => {
              // Sync current builder text to resumeText for re-analysis
              const updatedText = `${builderData.contact.name}\n${builderData.contact.location} • ${builderData.contact.email} • ${builderData.contact.phone}\n\nSUMMARY\n${builderData.summary}\n\nSKILLS\n${builderData.skills.map(s => s.items.join(', ')).join('\n')}\n\nEXPERIENCE\n${builderData.experience.map(e => `${e.role} at ${e.company}\n${e.bullets.join('\n')}`).join('\n\n')}\n\nEDUCATION\n${builderData.education.map(ed => `${ed.degree} in ${ed.fieldOfStudy}, ${ed.institution}`).join('\n')}`;
              setResumeText(updatedText);
              setParsedResume(builderData);
              setCurrentView('analyzer');
            }}
            missingSkillsToQuickAdd={analysisResult?.missingSkills.map(s => s.name) || []}
          />
        )}
      </main>

      {/* AI Processing Modal (Section 4) */}
      <AIAnalysisModal
        isOpen={isAnalyzing}
        onComplete={handleAnalysisCompleted}
      />

      {/* Faculty Guide Modal */}
      <FacultyGuideModal
        isOpen={facultyGuideOpen}
        onClose={() => setFacultyGuideOpen(false)}
        onLoadScenario={(rId, jId) => handleQuickLoadSample(rId, jId, true)}
      />

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-200 bg-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-900">ResuMates</span>
            <span>•</span>
            <span>Next-Generation AI Resume Builder & ATS Job Match Analyzer</span>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setFacultyGuideOpen(true)}
              className="hover:text-indigo-600 transition"
            >
              Faculty Evaluation Guide
            </button>
            <button
              onClick={() => setCurrentView('builder')}
              className="hover:text-indigo-600 transition"
            >
              Resume Builder
            </button>
            <button
              onClick={() => setCurrentView('analyzer')}
              className="hover:text-indigo-600 transition"
            >
              ATS Checker
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
