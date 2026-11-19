import React from 'react';
import { ResumeData, ResumeTemplateId } from '../../types';
import { Mail, Phone, MapPin, Globe, Link2 } from 'lucide-react';

interface ResumePreviewProps {
  resumeData: ResumeData;
  templateId: ResumeTemplateId;
}

export const ResumePreview: React.FC<ResumePreviewProps> = ({
  resumeData,
  templateId,
}) => {
  const { contact, summary, experience, education, skills, projects } = resumeData;

  // Modern Template
  if (templateId === 'modern') {
    return (
      <div 
        id="resume-print-area"
        className="w-full bg-white text-slate-800 p-8 sm:p-10 shadow-lg rounded-xl border border-slate-200 min-h-[840px] font-sans text-xs space-y-6"
      >
        {/* Header */}
        <div className="border-b-2 border-indigo-600 pb-5 space-y-2">
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
            {contact.name}
          </h1>
          <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-600">
            {contact.email && (
              <span className="flex items-center gap-1">
                <Mail className="w-3 h-3 text-indigo-600" /> {contact.email}
              </span>
            )}
            {contact.phone && (
              <span className="flex items-center gap-1">
                <Phone className="w-3 h-3 text-indigo-600" /> {contact.phone}
              </span>
            )}
            {contact.location && (
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3 text-indigo-600" /> {contact.location}
              </span>
            )}
            {contact.linkedin && (
              <span className="flex items-center gap-1">
                <Link2 className="w-3 h-3 text-indigo-600" /> {contact.linkedin}
              </span>
            )}
            {contact.github && (
              <span className="flex items-center gap-1">
                <Globe className="w-3 h-3 text-indigo-600" /> {contact.github}
              </span>
            )}
          </div>
        </div>

        {/* Summary */}
        {summary && (
          <div className="space-y-1.5">
            <h2 className="text-xs font-bold uppercase tracking-wider text-indigo-700">
              Professional Summary
            </h2>
            <p className="text-slate-700 leading-relaxed text-[11.5px]">
              {summary}
            </p>
          </div>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <div className="space-y-2">
            <h2 className="text-xs font-bold uppercase tracking-wider text-indigo-700">
              Core Technical Skills
            </h2>
            <div className="space-y-1 text-[11.5px]">
              {skills.map((cat, i) => (
                <div key={i} className="flex flex-wrap items-baseline gap-1.5">
                  <span className="font-bold text-slate-900">{cat.category}:</span>
                  <span className="text-slate-700">{cat.items.join(' • ')}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Work Experience */}
        {experience.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-xs font-bold uppercase tracking-wider text-indigo-700">
              Work Experience
            </h2>
            <div className="space-y-3.5">
              {experience.map((exp) => (
                <div key={exp.id} className="space-y-1.5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between font-bold text-slate-900 text-[12px]">
                    <div>
                      <span>{exp.role}</span>
                      <span className="text-indigo-600 font-semibold"> — {exp.company}</span>
                    </div>
                    <span className="text-slate-500 font-medium text-[11px]">
                      {exp.startDate} – {exp.endDate}
                    </span>
                  </div>
                  {exp.location && (
                    <div className="text-[10.5px] text-slate-500">{exp.location}</div>
                  )}
                  <ul className="list-disc list-outside ml-4 space-y-1 text-slate-700 leading-relaxed text-[11.5px]">
                    {exp.bullets.map((b, bIdx) => (
                      <li key={bIdx}>{b}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {education.length > 0 && (
          <div className="space-y-2">
            <h2 className="text-xs font-bold uppercase tracking-wider text-indigo-700">
              Education
            </h2>
            <div className="space-y-2">
              {education.map((edu) => (
                <div key={edu.id} className="flex justify-between items-baseline text-[11.5px]">
                  <div>
                    <span className="font-bold text-slate-900">{edu.institution}</span>
                    <span className="text-slate-600"> — {edu.degree} in {edu.fieldOfStudy}</span>
                    {edu.gpa && <span className="text-slate-500 text-[11px]"> (GPA: {edu.gpa})</span>}
                  </div>
                  <span className="text-slate-500 text-[11px] font-medium">
                    {edu.startDate} – {edu.endDate}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <div className="space-y-2">
            <h2 className="text-xs font-bold uppercase tracking-wider text-indigo-700">
              Key Projects
            </h2>
            <div className="space-y-2">
              {projects.map((proj) => (
                <div key={proj.id} className="text-[11.5px] space-y-1">
                  <div className="font-bold text-slate-900">
                    {proj.title}
                    {proj.techStack.length > 0 && (
                      <span className="font-normal text-slate-500 text-[11px]"> ({proj.techStack.join(', ')})</span>
                    )}
                  </div>
                  <p className="text-slate-700">{proj.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  // Classic ATS Template (Standard, High ATS parseability, monochrome)
  if (templateId === 'classic') {
    return (
      <div 
        id="resume-print-area"
        className="w-full bg-white text-black p-8 sm:p-10 shadow-lg rounded-xl border border-slate-200 min-h-[840px] font-serif text-xs space-y-5"
      >
        {/* Header */}
        <div className="text-center border-b border-black pb-3 space-y-1">
          <h1 className="text-2xl font-bold tracking-wide uppercase">
            {contact.name}
          </h1>
          <div className="text-[11px] space-x-2">
            {contact.location && <span>{contact.location}</span>}
            {contact.phone && <span>• {contact.phone}</span>}
            {contact.email && <span>• {contact.email}</span>}
            {contact.linkedin && <span>• {contact.linkedin}</span>}
          </div>
        </div>

        {summary && (
          <div className="space-y-1">
            <h2 className="font-bold uppercase text-[11px] border-b border-black">
              Professional Summary
            </h2>
            <p className="text-[11px] leading-relaxed pt-0.5">{summary}</p>
          </div>
        )}

        {skills.length > 0 && (
          <div className="space-y-1">
            <h2 className="font-bold uppercase text-[11px] border-b border-black">
              Technical Proficiencies
            </h2>
            <div className="space-y-0.5 text-[11px] pt-0.5">
              {skills.map((cat, i) => (
                <div key={i}>
                  <strong>{cat.category}: </strong>
                  <span>{cat.items.join(', ')}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {experience.length > 0 && (
          <div className="space-y-2">
            <h2 className="font-bold uppercase text-[11px] border-b border-black">
              Professional Experience
            </h2>
            <div className="space-y-3 pt-0.5">
              {experience.map((exp) => (
                <div key={exp.id} className="space-y-1">
                  <div className="flex justify-between font-bold text-[11.5px]">
                    <span>{exp.company} — {exp.role}</span>
                    <span>{exp.startDate} – {exp.endDate}</span>
                  </div>
                  <ul className="list-disc list-outside ml-4 space-y-0.5 text-[11px] leading-relaxed">
                    {exp.bullets.map((b, idx) => (
                      <li key={idx}>{b}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}

        {education.length > 0 && (
          <div className="space-y-1">
            <h2 className="font-bold uppercase text-[11px] border-b border-black">
              Education
            </h2>
            <div className="space-y-1 pt-0.5 text-[11px]">
              {education.map((edu) => (
                <div key={edu.id} className="flex justify-between">
                  <span><strong>{edu.institution}</strong> — {edu.degree} in {edu.fieldOfStudy}</span>
                  <span>{edu.startDate} – {edu.endDate}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  // Academic / Faculty Template
  if (templateId === 'academic') {
    return (
      <div 
        id="resume-print-area"
        className="w-full bg-white text-slate-900 p-8 sm:p-10 shadow-lg rounded-xl border border-slate-200 min-h-[840px] font-serif text-xs space-y-5"
      >
        <div className="border-b-2 border-slate-800 pb-3 text-center space-y-1">
          <h1 className="text-2xl font-bold tracking-tight">
            {contact.name}
          </h1>
          <p className="text-[11px] text-slate-600">
            {contact.location} • {contact.email} • {contact.phone}
          </p>
        </div>

        <div className="space-y-1">
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-800 border-b border-slate-300 pb-0.5">
            Academic Background & Education
          </h2>
          {education.map(edu => (
            <div key={edu.id} className="flex justify-between text-[11.5px] pt-1">
              <span><strong>{edu.institution}</strong>, {edu.degree} in {edu.fieldOfStudy}</span>
              <span className="font-sans text-[11px] text-slate-600">{edu.startDate} – {edu.endDate}</span>
            </div>
          ))}
        </div>

        {summary && (
          <div className="space-y-1">
            <h2 className="text-xs font-bold uppercase tracking-widest text-slate-800 border-b border-slate-300 pb-0.5">
              Scholarly & Pedagogical Focus
            </h2>
            <p className="text-[11.5px] leading-relaxed pt-1">{summary}</p>
          </div>
        )}

        <div className="space-y-2">
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-800 border-b border-slate-300 pb-0.5">
            Teaching & University Experience
          </h2>
          {experience.map(exp => (
            <div key={exp.id} className="space-y-1 pt-1">
              <div className="flex justify-between font-bold text-[11.5px]">
                <span>{exp.role}, {exp.company}</span>
                <span className="font-sans text-[11px] font-normal text-slate-600">{exp.startDate} – {exp.endDate}</span>
              </div>
              <ul className="list-disc list-outside ml-4 space-y-1 text-[11px] leading-relaxed">
                {exp.bullets.map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {skills.length > 0 && (
          <div className="space-y-1">
            <h2 className="text-xs font-bold uppercase tracking-widest text-slate-800 border-b border-slate-300 pb-0.5">
              Core Competencies & Research Methodologies
            </h2>
            <div className="space-y-1 text-[11px] pt-1">
              {skills.map((c, i) => (
                <div key={i}>
                  <strong>{c.category}: </strong>
                  <span>{c.items.join(' • ')}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  // Executive Minimalist Template
  return (
    <div 
      id="resume-print-area"
      className="w-full bg-white text-slate-800 p-8 sm:p-10 shadow-lg rounded-xl border border-slate-200 min-h-[840px] font-sans text-xs space-y-6"
    >
      <div className="flex justify-between items-baseline border-b border-slate-300 pb-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 uppercase">
            {contact.name}
          </h1>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            {contact.location}
          </p>
        </div>
        <div className="text-right text-[11px] text-slate-600 space-y-0.5">
          <div>{contact.email}</div>
          <div>{contact.phone}</div>
        </div>
      </div>

      {summary && (
        <div className="space-y-1">
          <h2 className="text-[11px] font-bold tracking-widest uppercase text-slate-500">
            Executive Summary
          </h2>
          <p className="text-[11.5px] leading-relaxed text-slate-700">{summary}</p>
        </div>
      )}

      {experience.length > 0 && (
        <div className="space-y-3">
          <h2 className="text-[11px] font-bold tracking-widest uppercase text-slate-500">
            Leadership & Experience
          </h2>
          <div className="space-y-3">
            {experience.map(exp => (
              <div key={exp.id} className="space-y-1">
                <div className="flex justify-between font-bold text-[12px] text-slate-900">
                  <span>{exp.role} • {exp.company}</span>
                  <span className="font-normal text-slate-500 text-[11px]">{exp.startDate} – {exp.endDate}</span>
                </div>
                <ul className="list-disc list-outside ml-4 space-y-1 text-[11.5px] text-slate-700 leading-relaxed">
                  {exp.bullets.map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}

      {skills.length > 0 && (
        <div className="space-y-1">
          <h2 className="text-[11px] font-bold tracking-widest uppercase text-slate-500">
            Core Competencies
          </h2>
          <div className="text-[11.5px] text-slate-700 space-y-0.5">
            {skills.map((c, i) => (
              <div key={i}><strong>{c.category}:</strong> {c.items.join(', ')}</div>
            ))}
          </div>
        </div>
      )}

      {education.length > 0 && (
        <div className="space-y-1">
          <h2 className="text-[11px] font-bold tracking-widest uppercase text-slate-500">
            Education
          </h2>
          {education.map(edu => (
            <div key={edu.id} className="flex justify-between text-[11.5px]">
              <span><strong>{edu.institution}</strong> — {edu.degree} in {edu.fieldOfStudy}</span>
              <span className="text-slate-500 text-[11px]">{edu.startDate} – {edu.endDate}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
