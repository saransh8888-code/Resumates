import React, { useState } from 'react';
import { ResumeData, WorkExperience, Education, Project } from '../../types';
import { 
  User, 
  Briefcase, 
  GraduationCap, 
  Tag, 
  Layers, 
  Plus, 
  Trash2, 
  Sparkles,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

interface ResumeEditorProps {
  resumeData: ResumeData;
  setResumeData: React.Dispatch<React.SetStateAction<ResumeData>>;
  missingSkillsToQuickAdd?: string[];
}

export const ResumeEditor: React.FC<ResumeEditorProps> = ({
  resumeData,
  setResumeData,
  missingSkillsToQuickAdd = [],
}) => {
  const [activeSection, setActiveSection] = useState<'contact' | 'summary' | 'experience' | 'education' | 'skills' | 'projects'>('contact');

  // Contact Info handlers
  const handleContactChange = (field: keyof ResumeData['contact'], value: string) => {
    setResumeData(prev => ({
      ...prev,
      contact: {
        ...prev.contact,
        [field]: value
      }
    }));
  };

  // Summary handler
  const handleSummaryChange = (val: string) => {
    setResumeData(prev => ({ ...prev, summary: val }));
  };

  // Work Experience handlers
  const handleAddExperience = () => {
    const newExp: WorkExperience = {
      id: `exp-${Date.now()}`,
      company: 'Company Name',
      role: 'Job Title',
      location: 'City, State',
      startDate: '2023',
      endDate: 'Present',
      current: true,
      bullets: [
        'Spearheaded key initiatives driving 30% performance boost across core workflows.'
      ]
    };
    setResumeData(prev => ({ ...prev, experience: [newExp, ...prev.experience] }));
  };

  const handleUpdateExperience = (id: string, field: keyof WorkExperience, val: any) => {
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.map(exp => exp.id === id ? { ...exp, [field]: val } : exp)
    }));
  };

  const handleDeleteExperience = (id: string) => {
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.filter(exp => exp.id !== id)
    }));
  };

  const handleBulletChange = (expId: string, index: number, text: string) => {
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.map(exp => {
        if (exp.id !== expId) return exp;
        const newBullets = [...exp.bullets];
        newBullets[index] = text;
        return { ...exp, bullets: newBullets };
      })
    }));
  };

  const handleAddBullet = (expId: string) => {
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.map(exp => {
        if (exp.id !== expId) return exp;
        return { ...exp, bullets: [...exp.bullets, 'Engineered high-impact solution improving delivery by 25%.'] };
      })
    }));
  };

  const handleDeleteBullet = (expId: string, index: number) => {
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.map(exp => {
        if (exp.id !== expId) return exp;
        return { ...exp, bullets: exp.bullets.filter((_, i) => i !== index) };
      })
    }));
  };

  // Skills handlers
  const handleAddSkillToCategory = (catIndex: number, skillName: string) => {
    if (!skillName.trim()) return;
    setResumeData(prev => {
      const newSkills = [...prev.skills];
      if (!newSkills[catIndex].items.includes(skillName.trim())) {
        newSkills[catIndex].items.push(skillName.trim());
      }
      return { ...prev, skills: newSkills };
    });
  };

  const handleRemoveSkill = (catIndex: number, skillIndex: number) => {
    setResumeData(prev => {
      const newSkills = [...prev.skills];
      newSkills[catIndex].items.splice(skillIndex, 1);
      return { ...prev, skills: newSkills };
    });
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-5 shadow-xs">
      {/* Editor Navigation */}
      <div className="flex flex-wrap gap-1.5 border-b border-slate-100 pb-3 text-xs font-semibold">
        {[
          { key: 'contact', label: 'Contact', icon: User },
          { key: 'summary', label: 'Summary', icon: Tag },
          { key: 'experience', label: 'Experience', icon: Briefcase },
          { key: 'education', label: 'Education', icon: GraduationCap },
          { key: 'skills', label: 'Skills', icon: Layers },
          { key: 'projects', label: 'Projects', icon: Sparkles },
        ].map((sec) => {
          const Icon = sec.icon;
          const isActive = activeSection === sec.key;
          return (
            <button
              key={sec.key}
              onClick={() => setActiveSection(sec.key as any)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                isActive
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{sec.label}</span>
            </button>
          );
        })}
      </div>

      {/* Section Content: Contact Info */}
      {activeSection === 'contact' && (
        <div className="space-y-4 animate-in fade-in">
          <h3 className="text-sm font-bold text-slate-900">Personal & Contact Information</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-slate-600">Full Name</label>
              <input
                type="text"
                value={resumeData.contact.name}
                onChange={(e) => handleContactChange('name', e.target.value)}
                className="w-full mt-1 px-3 py-2 text-xs border rounded-lg border-slate-300 focus:border-indigo-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-600">Email Address</label>
              <input
                type="email"
                value={resumeData.contact.email}
                onChange={(e) => handleContactChange('email', e.target.value)}
                className="w-full mt-1 px-3 py-2 text-xs border rounded-lg border-slate-300 focus:border-indigo-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-600">Phone Number</label>
              <input
                type="text"
                value={resumeData.contact.phone}
                onChange={(e) => handleContactChange('phone', e.target.value)}
                className="w-full mt-1 px-3 py-2 text-xs border rounded-lg border-slate-300 focus:border-indigo-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-600">Location (City, State)</label>
              <input
                type="text"
                value={resumeData.contact.location}
                onChange={(e) => handleContactChange('location', e.target.value)}
                className="w-full mt-1 px-3 py-2 text-xs border rounded-lg border-slate-300 focus:border-indigo-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-600">LinkedIn Profile</label>
              <input
                type="text"
                value={resumeData.contact.linkedin || ''}
                onChange={(e) => handleContactChange('linkedin', e.target.value)}
                placeholder="linkedin.com/in/username"
                className="w-full mt-1 px-3 py-2 text-xs border rounded-lg border-slate-300 focus:border-indigo-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-600">GitHub / Portfolio</label>
              <input
                type="text"
                value={resumeData.contact.github || ''}
                onChange={(e) => handleContactChange('github', e.target.value)}
                placeholder="github.com/username"
                className="w-full mt-1 px-3 py-2 text-xs border rounded-lg border-slate-300 focus:border-indigo-500 focus:outline-none"
              />
            </div>
          </div>
        </div>
      )}

      {/* Section Content: Summary */}
      {activeSection === 'summary' && (
        <div className="space-y-4 animate-in fade-in">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900">Professional Summary</h3>
            <span className="text-[11px] text-slate-500">2-4 sentences recommended</span>
          </div>
          <textarea
            value={resumeData.summary}
            onChange={(e) => handleSummaryChange(e.target.value)}
            rows={5}
            className="w-full text-xs font-sans p-3 rounded-lg border border-slate-300 focus:border-indigo-500 focus:outline-none leading-relaxed"
            placeholder="Write a concise executive or technical summary highlighting your core skills, years of experience, and quantifiable track record..."
          />
        </div>
      )}

      {/* Section Content: Experience */}
      {activeSection === 'experience' && (
        <div className="space-y-5 animate-in fade-in">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900">Work Experience</h3>
            <button
              onClick={handleAddExperience}
              className="flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-md bg-indigo-50 text-indigo-700 hover:bg-indigo-100 transition"
            >
              <Plus className="w-3.5 h-3.5" /> Add Role
            </button>
          </div>

          <div className="space-y-4">
            {resumeData.experience.map((exp, expIdx) => (
              <div key={exp.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-700 uppercase">
                    Role #{expIdx + 1}
                  </span>
                  <button
                    onClick={() => handleDeleteExperience(exp.id)}
                    className="text-xs text-rose-600 hover:text-rose-700 font-medium flex items-center gap-1"
                  >
                    <Trash2 className="w-3 h-3" /> Remove
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <div>
                    <label className="text-[11px] font-semibold text-slate-600">Job Title / Role</label>
                    <input
                      type="text"
                      value={exp.role}
                      onChange={(e) => handleUpdateExperience(exp.id, 'role', e.target.value)}
                      className="w-full mt-1 p-2 border rounded border-slate-300 bg-white"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-semibold text-slate-600">Company Name</label>
                    <input
                      type="text"
                      value={exp.company}
                      onChange={(e) => handleUpdateExperience(exp.id, 'company', e.target.value)}
                      className="w-full mt-1 p-2 border rounded border-slate-300 bg-white"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-semibold text-slate-600">Location</label>
                    <input
                      type="text"
                      value={exp.location || ''}
                      onChange={(e) => handleUpdateExperience(exp.id, 'location', e.target.value)}
                      className="w-full mt-1 p-2 border rounded border-slate-300 bg-white"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-semibold text-slate-600">Duration (e.g., 2022 - Present)</label>
                    <div className="flex items-center gap-2 mt-1">
                      <input
                        type="text"
                        value={exp.startDate}
                        onChange={(e) => handleUpdateExperience(exp.id, 'startDate', e.target.value)}
                        placeholder="Start"
                        className="w-1/2 p-2 border rounded border-slate-300 bg-white"
                      />
                      <input
                        type="text"
                        value={exp.endDate}
                        onChange={(e) => handleUpdateExperience(exp.id, 'endDate', e.target.value)}
                        placeholder="End / Present"
                        className="w-1/2 p-2 border rounded border-slate-300 bg-white"
                      />
                    </div>
                  </div>
                </div>

                {/* Bullets */}
                <div className="pt-2 border-t border-slate-200 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-700">Achievement Bullets</span>
                    <button
                      onClick={() => handleAddBullet(exp.id)}
                      className="text-indigo-600 hover:text-indigo-800 text-[11px] font-semibold flex items-center gap-1"
                    >
                      <Plus className="w-3 h-3" /> Add Bullet
                    </button>
                  </div>

                  {exp.bullets.map((bullet, bIdx) => (
                    <div key={bIdx} className="flex items-start gap-1.5">
                      <span className="text-slate-400 mt-2 text-xs">•</span>
                      <textarea
                        value={bullet}
                        onChange={(e) => handleBulletChange(exp.id, bIdx, e.target.value)}
                        rows={2}
                        className="flex-1 text-xs p-2 rounded border border-slate-200 bg-white focus:border-indigo-500 outline-none leading-relaxed"
                      />
                      <button
                        onClick={() => handleDeleteBullet(exp.id, bIdx)}
                        className="p-1.5 text-slate-400 hover:text-rose-600"
                        title="Remove bullet"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Section Content: Skills */}
      {activeSection === 'skills' && (
        <div className="space-y-4 animate-in fade-in">
          <h3 className="text-sm font-bold text-slate-900">Skills & Competencies</h3>
          
          {/* Quick-add missing skills detected by analysis */}
          {missingSkillsToQuickAdd.length > 0 && (
            <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 space-y-2">
              <span className="text-xs font-semibold text-amber-900 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-600" /> Click to add missing job skills:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {missingSkillsToQuickAdd.map((skill, i) => (
                  <button
                    key={i}
                    onClick={() => handleAddSkillToCategory(0, skill)}
                    className="text-xs font-medium px-2 py-0.5 rounded-md bg-white border border-amber-300 hover:bg-amber-100 text-amber-900 flex items-center gap-1 shadow-2xs"
                  >
                    <Plus className="w-3 h-3" /> {skill}
                  </button>
                ))}
              </div>
            </div>
          )}

          {resumeData.skills.map((cat, catIdx) => (
            <div key={catIdx} className="p-3.5 rounded-xl border border-slate-200 space-y-2">
              <div className="text-xs font-bold text-slate-700">{cat.category}</div>
              <div className="flex flex-wrap gap-1.5">
                {cat.items.map((item, itemIdx) => (
                  <span
                    key={itemIdx}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-100 text-slate-800 text-xs font-medium"
                  >
                    <span>{item}</span>
                    <button
                      onClick={() => handleRemoveSkill(catIdx, itemIdx)}
                      className="text-slate-400 hover:text-rose-600 ml-1"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Section Content: Education */}
      {activeSection === 'education' && (
        <div className="space-y-4 animate-in fade-in">
          <h3 className="text-sm font-bold text-slate-900">Education</h3>
          {resumeData.education.map((edu, idx) => (
            <div key={edu.id || idx} className="p-4 rounded-xl border border-slate-200 space-y-2 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <div>
                  <label className="text-[11px] font-semibold text-slate-600">Institution</label>
                  <input
                    type="text"
                    value={edu.institution}
                    onChange={(e) => {
                      const val = e.target.value;
                      setResumeData(prev => ({
                        ...prev,
                        education: prev.education.map((ed, i) => i === idx ? { ...ed, institution: val } : ed)
                      }));
                    }}
                    className="w-full mt-1 p-2 border rounded border-slate-300"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-slate-600">Degree & Major</label>
                  <input
                    type="text"
                    value={`${edu.degree} in ${edu.fieldOfStudy}`}
                    onChange={(e) => {
                      const val = e.target.value;
                      setResumeData(prev => ({
                        ...prev,
                        education: prev.education.map((ed, i) => i === idx ? { ...ed, degree: val } : ed)
                      }));
                    }}
                    className="w-full mt-1 p-2 border rounded border-slate-300"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Section Content: Projects */}
      {activeSection === 'projects' && (
        <div className="space-y-4 animate-in fade-in">
          <h3 className="text-sm font-bold text-slate-900">Key Projects</h3>
          {resumeData.projects.map((proj, idx) => (
            <div key={proj.id || idx} className="p-4 rounded-xl border border-slate-200 space-y-2 text-xs">
              <div>
                <label className="text-[11px] font-semibold text-slate-600">Project Title</label>
                <input
                  type="text"
                  value={proj.title}
                  onChange={(e) => {
                    const val = e.target.value;
                    setResumeData(prev => ({
                      ...prev,
                      projects: prev.projects.map((p, i) => i === idx ? { ...p, title: val } : p)
                    }));
                  }}
                  className="w-full mt-1 p-2 border rounded border-slate-300"
                />
              </div>
              <div>
                <label className="text-[11px] font-semibold text-slate-600">Description</label>
                <textarea
                  value={proj.description}
                  onChange={(e) => {
                    const val = e.target.value;
                    setResumeData(prev => ({
                      ...prev,
                      projects: prev.projects.map((p, i) => i === idx ? { ...p, description: val } : p)
                    }));
                  }}
                  rows={2}
                  className="w-full mt-1 p-2 border rounded border-slate-300"
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
