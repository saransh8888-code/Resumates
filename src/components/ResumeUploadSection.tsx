import React, { useState, useRef } from 'react';
import { 
  Upload, 
  FileText, 
  FileCheck2, 
  AlertCircle, 
  Loader2, 
  CheckCircle, 
  Sparkles, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Eye, 
  Trash2,
  FileSpreadsheet
} from 'lucide-react';
import { parsePdfFile } from '../utils/pdfParser';
import { parseDocxFile } from '../utils/docxParser';
import { parseRawResumeText } from '../utils/resumeParser';
import { ResumeData } from '../types';
import { SAMPLE_RESUMES, SampleResumePreset } from '../data/sampleResumes';

interface ResumeUploadSectionProps {
  resumeText: string;
  setResumeText: (text: string) => void;
  parsedResume: ResumeData | null;
  setParsedResume: (data: ResumeData | null) => void;
  onSelectSampleResume: (sample: SampleResumePreset) => void;
}

export const ResumeUploadSection: React.FC<ResumeUploadSectionProps> = ({
  resumeText,
  setResumeText,
  parsedResume,
  setParsedResume,
  onSelectSampleResume,
}) => {
  const [activeTab, setActiveTab] = useState<'upload' | 'paste'>('upload');
  const [fileName, setFileName] = useState<string | null>(null);
  const [fileSize, setFileSize] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (file: File) => {
    setIsLoading(true);
    setErrorMessage(null);

    const sizeInKb = (file.size / 1024).toFixed(1) + ' KB';
    setFileName(file.name);
    setFileSize(sizeInKb);

    try {
      let extractedText = '';
      const lowerName = file.name.toLowerCase();

      if (lowerName.endsWith('.pdf')) {
        extractedText = await parsePdfFile(file);
      } else if (lowerName.endsWith('.docx') || lowerName.endsWith('.doc')) {
        extractedText = await parseDocxFile(file);
      } else if (lowerName.endsWith('.txt')) {
        extractedText = await file.text();
      } else {
        throw new Error('Unsupported format. Please upload a .pdf, .docx, or .txt resume file.');
      }

      if (!extractedText || extractedText.trim().length < 50) {
        throw new Error('Could not extract readable text from this file. Please verify it is not an image-only scan.');
      }

      setResumeText(extractedText);
      const structured = parseRawResumeText(extractedText);
      setParsedResume(structured);
    } catch (err: any) {
      console.error(err);
      setErrorMessage(err.message || 'Failed to read file. Please try another format or paste the text directly.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  const handleManualTextChange = (text: string) => {
    setResumeText(text);
    if (text.trim().length > 50) {
      const structured = parseRawResumeText(text);
      setParsedResume(structured);
    } else {
      setParsedResume(null);
    }
  };

  const handleClear = () => {
    setResumeText('');
    setParsedResume(null);
    setFileName(null);
    setFileSize(null);
    setErrorMessage(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const wordCount = resumeText ? resumeText.trim().split(/\s+/).length : 0;
  const charCount = resumeText ? resumeText.length : 0;

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-5 sm:p-6 space-y-5">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-indigo-100 text-indigo-700 text-xs font-bold flex items-center justify-center">
              2
            </span>
            <h2 className="text-lg font-bold text-slate-900">Upload Resume</h2>
            <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full font-medium">
              PDF / DOCX
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Accepts official PDF, Word DOCX, or text files. Parsed locally on your device for absolute privacy.
          </p>
        </div>

        {/* Tab Toggle */}
        <div className="flex items-center bg-slate-100 p-1 rounded-xl text-xs font-medium self-start sm:self-auto">
          <button
            onClick={() => setActiveTab('upload')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeTab === 'upload'
                ? 'bg-white text-indigo-700 shadow-xs font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            File Upload
          </button>
          <button
            onClick={() => setActiveTab('paste')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeTab === 'paste'
                ? 'bg-white text-indigo-700 shadow-xs font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Paste Text
          </button>
        </div>
      </div>

      {/* Preset Sample Resumes - Faculty quick selection */}
      <div className="bg-slate-50/80 rounded-xl p-3 border border-slate-200/60 space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="font-semibold text-slate-700 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
            Quick Select Sample Resume (Ideal for Faculty & Demos):
          </span>
          <span className="text-[11px] text-slate-500">1-click to test</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          {SAMPLE_RESUMES.map((sample) => (
            <button
              key={sample.id}
              onClick={() => {
                onSelectSampleResume(sample);
                setFileName(`${sample.label.split('—')[0].trim()}_Resume.pdf`);
                setFileSize('48 KB');
              }}
              className="text-left p-2.5 rounded-lg bg-white border border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/50 transition group"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600">
                  {sample.badge}
                </span>
                <span className="text-[10px] text-slate-500 group-hover:text-indigo-600 font-medium">Load →</span>
              </div>
              <p className="text-xs font-bold text-slate-800 mt-1 truncate">
                {sample.label.split('—')[0].trim()}
              </p>
              <p className="text-[11px] text-slate-500 truncate mt-0.5">
                {sample.role}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Main Upload / Input Area */}
      {activeTab === 'upload' ? (
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-2xl p-6 sm:p-8 text-center cursor-pointer transition-all ${
            isDragging
              ? 'border-indigo-500 bg-indigo-50/60 scale-[1.01]'
              : resumeText
              ? 'border-emerald-300 bg-emerald-50/20'
              : 'border-slate-300 hover:border-indigo-400 bg-slate-50/50 hover:bg-indigo-50/20'
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.docx,.doc,.txt"
            onChange={(e) => {
              if (e.target.files && e.target.files.length > 0) {
                handleFileUpload(e.target.files[0]);
              }
            }}
            className="hidden"
          />

          {isLoading ? (
            <div className="py-6 flex flex-col items-center justify-center space-y-3">
              <Loader2 className="w-8 h-8 text-indigo-600 animate-spin" />
              <p className="text-sm font-semibold text-slate-700">Extracting text & parsing sections...</p>
              <p className="text-xs text-slate-500">Processing PDF/DOCX structure client-side</p>
            </div>
          ) : resumeText ? (
            <div className="py-3 space-y-3">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                <FileCheck2 className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-sm sm:text-base">
                  {fileName || 'Resume Loaded Successfully'}
                </h4>
                <p className="text-xs text-emerald-700 font-medium mt-0.5">
                  Extracted {wordCount} words • {charCount} characters {fileSize && `• ${fileSize}`}
                </p>
              </div>
              <p className="text-xs text-slate-500">
                Click or drop another file to replace, or inspect the parsed preview below.
              </p>
            </div>
          ) : (
            <div className="py-4 space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto shadow-2xs">
                <Upload className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-slate-800 text-sm sm:text-base">
                  Drag and drop your resume here, or <span className="text-indigo-600 underline">browse</span>
                </h4>
                <p className="text-xs text-slate-500 mt-1">
                  Supports PDF (.pdf), Microsoft Word (.docx), or plain text (.txt)
                </p>
              </div>
              <div className="flex items-center justify-center gap-3 pt-1 text-xs text-slate-400">
                <span>ATS Formatting Friendly</span>
                <span>•</span>
                <span>Zero Server Upload</span>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Direct Text Paste Area */
        <div className="space-y-2">
          <textarea
            value={resumeText}
            onChange={(e) => handleManualTextChange(e.target.value)}
            placeholder="Paste your raw resume text here (include Work Experience, Skills, Education, and Contact details)..."
            rows={10}
            className="w-full text-xs font-mono p-4 rounded-xl border border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none leading-relaxed transition resize-y"
          />
          <div className="flex items-center justify-between text-xs text-slate-500 px-1">
            <span>{wordCount} words • {charCount} characters</span>
            {resumeText && (
              <button
                onClick={handleClear}
                className="text-rose-600 hover:text-rose-700 flex items-center gap-1 font-medium"
              >
                <Trash2 className="w-3.5 h-3.5" /> Clear Text
              </button>
            )}
          </div>
        </div>
      )}

      {/* Error Message */}
      {errorMessage && (
        <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Parsed Resume Metadata Card */}
      {parsedResume && resumeText && (
        <div className="bg-indigo-50/40 rounded-xl p-4 border border-indigo-100 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold text-xs">
                {parsedResume.contact.name.charAt(0) || 'R'}
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900">
                  {parsedResume.contact.name}
                </h4>
                <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-500">
                  {parsedResume.contact.email && (
                    <span className="flex items-center gap-1">
                      <Mail className="w-3 h-3" /> {parsedResume.contact.email}
                    </span>
                  )}
                  {parsedResume.contact.location && (
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" /> {parsedResume.contact.location}
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowPreviewModal(!showPreviewModal)}
                className="text-xs font-medium px-2.5 py-1 rounded-md bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 flex items-center gap-1 transition"
              >
                <Eye className="w-3 h-3 text-indigo-600" />
                <span>{showPreviewModal ? 'Hide Extracted Text' : 'View Extracted Text'}</span>
              </button>
              <button
                onClick={handleClear}
                className="text-xs font-medium px-2.5 py-1 rounded-md bg-white border border-rose-200 hover:bg-rose-50 text-rose-600 flex items-center gap-1 transition"
              >
                <Trash2 className="w-3 h-3" />
                <span>Remove</span>
              </button>
            </div>
          </div>

          {/* Section Summary Badges */}
          <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px]">
            <span className="px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-700 font-medium">
              💼 {parsedResume.experience.length} Experience Records
            </span>
            <span className="px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-700 font-medium">
              🎓 {parsedResume.education.length} Education Credentials
            </span>
            <span className="px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-700 font-medium">
              ⚡ {parsedResume.skills.reduce((acc, cat) => acc + cat.items.length, 0)} Skills Detected
            </span>
            {parsedResume.projects.length > 0 && (
              <span className="px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-700 font-medium">
                🚀 {parsedResume.projects.length} Projects
              </span>
            )}
          </div>

          {/* Collapsible raw text inspector */}
          {showPreviewModal && (
            <div className="mt-2 pt-2 border-t border-indigo-100/80">
              <div className="text-[11px] font-semibold text-slate-600 mb-1">
                Extracted Resume Content (Used by AI Engine):
              </div>
              <pre className="text-[11px] font-mono bg-white p-3 rounded-lg border border-slate-200 max-h-48 overflow-y-auto whitespace-pre-wrap text-slate-700">
                {resumeText}
              </pre>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
