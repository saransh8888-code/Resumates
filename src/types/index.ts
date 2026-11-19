export interface ContactInfo {
  name: string;
  email: string;
  phone: string;
  location: string;
  linkedin?: string;
  github?: string;
  website?: string;
}

export interface WorkExperience {
  id: string;
  company: string;
  role: string;
  location?: string;
  startDate: string;
  endDate: string;
  current: boolean;
  bullets: string[];
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  fieldOfStudy: string;
  startDate: string;
  endDate: string;
  gpa?: string;
  achievements?: string[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  link?: string;
  bullets: string[];
}

export interface ResumeData {
  contact: ContactInfo;
  summary: string;
  experience: WorkExperience[];
  education: Education[];
  skills: {
    category: string;
    items: string[];
  }[];
  projects: Project[];
  certifications?: string[];
}

export interface SkillMatch {
  name: string;
  category: 'technical' | 'soft' | 'tool' | 'methodology' | 'domain';
  inResume: boolean;
  inJob: boolean;
  frequencyInJob: number;
  frequencyInResume: number;
  importance: 'critical' | 'preferred' | 'bonus';
}

export interface BulletRewrite {
  id: string;
  original: string;
  rewritten: string;
  improvementReason: string;
  scoreImprovement: number;
  keywordsAdded: string[];
  weakVerbReplaced?: string;
  strongVerbUsed?: string;
  hasMetrics: boolean;
}

export interface ExperienceGap {
  title: string;
  description: string;
  severity: 'high' | 'medium' | 'low';
  recommendation: string;
}

export interface ResumeStrength {
  title: string;
  description: string;
  category: 'impact' | 'skills' | 'brevity' | 'formatting' | 'keywords';
}

export interface ImprovementItem {
  id: string;
  category: 'Critical' | 'Recommended' | 'Polish';
  title: string;
  description: string;
  impactScore: number;
  completed?: boolean;
}

export interface AnalysisResult {
  overallScore: number;
  atsGrade: 'A+' | 'A' | 'B+' | 'B' | 'C' | 'D';
  breakdown: {
    skillsMatch: number;
    experienceRelevance: number;
    atsReadiness: number;
    impactAndVerbs: number;
  };
  jobSummary: {
    title: string;
    level: string;
    keyRequirementsCount: number;
  };
  matchingSkills: SkillMatch[];
  missingSkills: SkillMatch[];
  strengths: ResumeStrength[];
  experienceGaps: ExperienceGap[];
  bulletRewrites: BulletRewrite[];
  improvements: ImprovementItem[];
  facultyNotes?: {
    overallReadiness: string;
    recommendedGrade: string;
    mentorshipAdvice: string[];
  };
  analyzedAt: string;
}

export type AppView = 'landing' | 'analyzer' | 'builder';
export type AnalyzerStep = 'upload' | 'job' | 'processing' | 'results';
export type ResumeTemplateId = 'modern' | 'classic' | 'academic' | 'executive';
