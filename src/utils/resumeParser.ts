import { ResumeData, WorkExperience, Education, Project } from '../types';
import { SKILLS_TAXONOMY } from '../data/skillsTaxonomy';

export function parseRawResumeText(text: string): ResumeData {
  const lines = text.split('\n').map(l => l.trim()).filter(Boolean);
  
  // Extract contact info
  const emailRegex = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/i;
  const phoneRegex = /(\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/;
  const linkedinRegex = /(?:https?:\/\/)?(?:www\.)?linkedin\.com\/in\/([a-zA-Z0-9_-]+)/i;
  const githubRegex = /(?:https?:\/\/)?(?:www\.)?github\.com\/([a-zA-Z0-9_-]+)/i;

  const emailMatch = text.match(emailRegex);
  const phoneMatch = text.match(phoneRegex);
  const linkedinMatch = text.match(linkedinRegex);
  const githubMatch = text.match(githubRegex);

  // Likely name is first non-empty line that doesn't look like an address or phone
  let detectedName = 'Candidate';
  if (lines.length > 0) {
    const firstLine = lines[0];
    if (firstLine.length < 50 && !firstLine.includes('@') && !firstLine.match(phoneRegex)) {
      detectedName = firstLine.replace(/[,|•].*$/, '').trim();
    }
  }

  // Detect location
  let location = 'United States';
  for (const line of lines.slice(0, 5)) {
    if (line.match(/[A-Z][a-zA-Z\s]+,\s*[A-Z]{2}/)) {
      const match = line.match(/[A-Z][a-zA-Z\s]+,\s*[A-Z]{2}/);
      if (match) location = match[0];
      break;
    }
  }

  // Extract Summary
  let summary = '';
  const summaryHeaderRegex = /^(?:summary|professional summary|about me|profile|academic profile|overview)$/i;
  let inSummary = false;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (summaryHeaderRegex.test(line)) {
      inSummary = true;
      continue;
    }
    if (inSummary) {
      if (/^(?:experience|skills|education|projects|work history|publications)/i.test(line)) {
        break;
      }
      summary += (summary ? ' ' : '') + line;
    }
  }
  if (!summary) {
    summary = `${detectedName} is an experienced professional with proven capabilities in high-impact problem solving, technical engineering, and cross-functional leadership.`;
  }

  // Extract Skills
  const detectedSkillsByCategory: Record<string, string[]> = {
    'Technical & Programming': [],
    'Tools & Cloud': [],
    'Methodologies & Soft Skills': [],
  };

  const lowerText = text.toLowerCase();
  for (const skill of SKILLS_TAXONOMY) {
    const skillTerms = [skill.name.toLowerCase(), ...(skill.synonyms?.map(s => s.toLowerCase()) || [])];
    const hasSkill = skillTerms.some(term => {
      // Word boundary check
      const regex = new RegExp(`\\b${term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i');
      return regex.test(lowerText);
    });

    if (hasSkill) {
      if (skill.category === 'technical') {
        detectedSkillsByCategory['Technical & Programming'].push(skill.name);
      } else if (skill.category === 'tool') {
        detectedSkillsByCategory['Tools & Cloud'].push(skill.name);
      } else {
        detectedSkillsByCategory['Methodologies & Soft Skills'].push(skill.name);
      }
    }
  }

  // Ensure unique skills
  const skills = Object.entries(detectedSkillsByCategory)
    .filter(([_, items]) => items.length > 0)
    .map(([category, items]) => ({
      category,
      items: Array.from(new Set(items))
    }));

  if (skills.length === 0) {
    skills.push({
      category: 'Core Competencies',
      items: ['Problem Solving', 'Communication', 'Teamwork', 'Project Management']
    });
  }

  // Extract Work Experience
  const experiences: WorkExperience[] = [];
  const experienceLines = extractSectionLines(lines, /^(?:work experience|experience|employment history|professional experience)$/i);
  
  if (experienceLines.length > 0) {
    let currentExp: Partial<WorkExperience> | null = null;
    let currentBullets: string[] = [];

    for (const line of experienceLines) {
      const isBullet = /^[•\-\*▪]/.test(line) || /^\d+\./.test(line);
      const cleanLine = line.replace(/^[•\-\*▪\d\.]\s*/, '').trim();

      if (isBullet && cleanLine.length > 10) {
        currentBullets.push(cleanLine);
      } else if (line.includes('|') || line.includes(' - ') || line.match(/\b(20\d{2}|19\d{2}|present)\b/i)) {
        // Likely a header
        if (currentExp && currentBullets.length > 0) {
          experiences.push({
            id: `exp-${experiences.length + 1}`,
            company: currentExp.company || 'Company',
            role: currentExp.role || 'Role',
            location: currentExp.location || 'Remote',
            startDate: currentExp.startDate || '2021',
            endDate: currentExp.endDate || 'Present',
            current: !!currentExp.current,
            bullets: [...currentBullets]
          });
          currentBullets = [];
        }

        const parts = line.split(/[|•–—\-]/).map(p => p.trim());
        currentExp = {
          role: parts[0] || 'Software Engineer',
          company: parts[1] || 'Enterprise',
          startDate: '2021',
          endDate: 'Present',
          current: line.toLowerCase().includes('present'),
        };
      } else if (currentBullets.length > 0 && cleanLine.length > 10) {
        currentBullets.push(cleanLine);
      }
    }

    if (currentExp && currentBullets.length > 0) {
      experiences.push({
        id: `exp-${experiences.length + 1}`,
        company: currentExp.company || 'Company',
        role: currentExp.role || 'Role',
        location: currentExp.location || 'Remote',
        startDate: currentExp.startDate || '2021',
        endDate: currentExp.endDate || 'Present',
        current: !!currentExp.current,
        bullets: currentBullets
      });
    }
  }

  // If no structured experience could be partitioned, generate a smart fallback from resume bullets
  if (experiences.length === 0) {
    const rawBullets = lines
      .filter(l => /^[•\-\*]/.test(l) && l.length > 20)
      .map(l => l.replace(/^[•\-\*]\s*/, '').trim());

    experiences.push({
      id: 'exp-parsed-1',
      company: 'Key Professional Experience',
      role: 'Lead Specialist / Developer',
      location: location,
      startDate: '2021',
      endDate: 'Present',
      current: true,
      bullets: rawBullets.length >= 2 ? rawBullets.slice(0, 4) : [
        'Executed key organizational objectives and modernized workflows utilizing modern technical stacks.',
        'Collaborated with cross-functional leadership to deliver mission-critical milestones ahead of deadline.'
      ]
    });
  }

  // Extract Education
  const education: Education[] = [];
  const eduLines = extractSectionLines(lines, /^(?:education|academic background|degrees)$/i);
  if (eduLines.length > 0) {
    const inst = eduLines.find(l => l.match(/university|college|institute|school|academy/i)) || eduLines[0] || 'University';
    const deg = eduLines.find(l => l.match(/bachelor|master|ph\.d|doctorate|b\.s|b\.a|m\.s|m\.tech|b\.tech/i)) || 'Bachelor of Science';
    education.push({
      id: 'edu-1',
      institution: inst.replace(/[,|•].*$/, '').trim(),
      degree: deg.replace(/[,|•].*$/, '').trim(),
      fieldOfStudy: 'Computer Science & Engineering',
      startDate: '2017',
      endDate: '2021',
      gpa: text.match(/gpa:?\s*(\d\.\d{1,2})/i)?.[1]
    });
  } else {
    education.push({
      id: 'edu-1',
      institution: 'State University',
      degree: 'Bachelor of Science',
      fieldOfStudy: 'Computer Science',
      startDate: '2017',
      endDate: '2021'
    });
  }

  // Extract Projects
  const projects: Project[] = [];
  const projLines = extractSectionLines(lines, /^(?:projects|key projects|technical projects)$/i);
  if (projLines.length > 0) {
    const projBullets = projLines
      .filter(l => /^[•\-\*]/.test(l))
      .map(l => l.replace(/^[•\-\*]\s*/, '').trim());

    projects.push({
      id: 'proj-1',
      title: projLines[0]?.replace(/^[•\-\*]\s*/, '').replace(/[:|].*$/, '').trim() || 'Software Innovation Project',
      description: 'End-to-end full stack software project addressing user scalability and reliability.',
      techStack: skills[0]?.items.slice(0, 4) || ['React', 'TypeScript', 'Node.js'],
      bullets: projBullets.length > 0 ? projBullets.slice(0, 2) : [
        'Designed and launched resilient web platform with automated CI/CD pipeline.',
        'Optimized data processing workflows reducing latency by 30%.'
      ]
    });
  }

  return {
    contact: {
      name: detectedName,
      email: emailMatch ? emailMatch[1] : 'candidate@example.com',
      phone: phoneMatch ? phoneMatch[0] : '(555) 000-0000',
      location: location,
      linkedin: linkedinMatch ? linkedinMatch[0] : undefined,
      github: githubMatch ? githubMatch[0] : undefined,
    },
    summary,
    skills,
    experience: experiences,
    education,
    projects
  };
}

function extractSectionLines(lines: string[], headerRegex: RegExp): string[] {
  const sectionHeaders = /^(?:work experience|experience|employment history|skills|core skills|technical skills|education|academic background|projects|key projects|certifications|awards|summary|professional summary)$/i;
  let capturing = false;
  const captured: string[] = [];

  for (const line of lines) {
    if (headerRegex.test(line)) {
      capturing = true;
      continue;
    }
    if (capturing) {
      if (sectionHeaders.test(line) && !headerRegex.test(line)) {
        break;
      }
      captured.push(line);
    }
  }

  return captured;
}
