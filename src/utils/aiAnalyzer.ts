import { AnalysisResult, SkillMatch, BulletRewrite, ResumeStrength, ExperienceGap, ImprovementItem } from '../types';
import { SKILLS_TAXONOMY, STRONG_ACTION_VERBS, WEAK_VERBS_TO_REPLACE } from '../data/skillsTaxonomy';

export async function analyzeResumeAgainstJob(
  resumeText: string,
  jobText: string,
  apiKey?: string
): Promise<AnalysisResult> {
  // If user provided a Gemini API Key, try live LLM analysis, else use our smart built-in NLP engine
  if (apiKey && apiKey.trim().length > 10) {
    try {
      return await analyzeWithGemini(resumeText, jobText, apiKey);
    } catch (err) {
      console.warn('Gemini API call failed, falling back to smart built-in analyzer:', err);
    }
  }

  // Built-in Deterministic AI / NLP Engine
  return runBuiltInAnalysis(resumeText, jobText);
}

function runBuiltInAnalysis(resumeText: string, jobText: string): AnalysisResult {
  const lowerResume = resumeText.toLowerCase();
  const lowerJob = jobText.toLowerCase();

  // 1. Skill Extraction & Matching
  const matchingSkills: SkillMatch[] = [];
  const missingSkills: SkillMatch[] = [];

  for (const skill of SKILLS_TAXONOMY) {
    const searchTerms = [skill.name.toLowerCase(), ...(skill.synonyms?.map(s => s.toLowerCase()) || [])];
    
    // Check frequency in job
    let jobCount = 0;
    for (const term of searchTerms) {
      const regex = new RegExp(`\\b${escapeRegExp(term)}\\b`, 'gi');
      const matches = lowerJob.match(regex);
      if (matches) jobCount += matches.length;
    }

    // Check frequency in resume
    let resumeCount = 0;
    for (const term of searchTerms) {
      const regex = new RegExp(`\\b${escapeRegExp(term)}\\b`, 'gi');
      const matches = lowerResume.match(regex);
      if (matches) resumeCount += matches.length;
    }

    if (jobCount > 0) {
      const isCritical = jobCount >= 2 || lowerJob.includes(`required: ${skill.name.toLowerCase()}`) || lowerJob.includes(`mastery of ${skill.name.toLowerCase()}`);
      const importance: 'critical' | 'preferred' | 'bonus' = isCritical ? 'critical' : jobCount >= 1 ? 'preferred' : 'bonus';

      const matchItem: SkillMatch = {
        name: skill.name,
        category: skill.category,
        inResume: resumeCount > 0,
        inJob: true,
        frequencyInJob: jobCount,
        frequencyInResume: resumeCount,
        importance,
      };

      if (resumeCount > 0) {
        matchingSkills.push(matchItem);
      } else {
        missingSkills.push(matchItem);
      }
    }
  }

  // 2. Metrics & Action Verb Analysis
  const metricsRegex = /\b(\d+(?:\.\d+)?%|\$\d+(?:,\d{3})*(?:\.\d+)?|\b\d+x\b|\b\d+\+?\s*(?:million|billion|k|users|clients|requests|ms|seconds|minutes|hours|days|engineers|developers|students|papers))\b/gi;
  const metricsFound = resumeText.match(metricsRegex) || [];
  const hasStrongMetrics = metricsFound.length >= 3;

  // Weak verbs check
  const weakVerbsFound: { weak: string; better: string; tip: string }[] = [];
  for (const item of WEAK_VERBS_TO_REPLACE) {
    const regex = new RegExp(`\\b${escapeRegExp(item.weak)}\\b`, 'gi');
    if (regex.test(lowerResume)) {
      weakVerbsFound.push(item);
    }
  }

  // Strong verbs check
  let strongVerbsCount = 0;
  for (const verb of STRONG_ACTION_VERBS) {
    const regex = new RegExp(`\\b${escapeRegExp(verb)}\\b`, 'gi');
    const matches = resumeText.match(regex);
    if (matches) strongVerbsCount += matches.length;
  }

  // 3. Section & ATS Formatting Checks
  const hasContactInfo = lowerResume.includes('@') && /\d{3}/.test(resumeText);
  const hasSummary = /summary|profile|about/i.test(resumeText);
  const hasExperience = /experience|employment|work history/i.test(resumeText);
  const hasEducation = /education|university|college|degree/i.test(resumeText);
  const hasSkillsSection = /skills|proficiencies|technologies/i.test(resumeText);

  // 4. Sub-scores computation
  const totalJobSkillsCount = matchingSkills.length + missingSkills.length;
  const criticalMissing = missingSkills.filter(s => s.importance === 'critical').length;
  
  // Skills Match (0-100)
  const skillsRatio = totalJobSkillsCount > 0 ? (matchingSkills.length / totalJobSkillsCount) : 0.75;
  const skillsMatchScore = Math.min(100, Math.round(skillsRatio * 100 - criticalMissing * 4));

  // Experience Relevance (0-100)
  let expScore = 75;
  if (lowerJob.includes('senior') && (lowerResume.includes('senior') || lowerResume.includes('lead') || lowerResume.includes('architected'))) {
    expScore += 15;
  }
  if (lowerJob.includes('ph.d') && (lowerResume.includes('ph.d') || lowerResume.includes('doctorate'))) {
    expScore += 15;
  }
  if (criticalMissing > 3) expScore -= 15;
  expScore = Math.max(45, Math.min(98, expScore));

  // ATS Readiness (0-100)
  let atsScore = 60;
  if (hasContactInfo) atsScore += 10;
  if (hasSummary) atsScore += 5;
  if (hasExperience) atsScore += 10;
  if (hasEducation) atsScore += 10;
  if (hasSkillsSection) atsScore += 5;

  // Impact and Verbs (0-100)
  let impactScore = 55;
  if (hasStrongMetrics) impactScore += 20;
  if (strongVerbsCount >= 4) impactScore += 15;
  if (weakVerbsFound.length > 2) impactScore -= 10;
  impactScore = Math.max(40, Math.min(96, impactScore));

  // Composite overall score
  const overallScore = Math.round(
    skillsMatchScore * 0.40 +
    expScore * 0.25 +
    atsScore * 0.20 +
    impactScore * 0.15
  );

  // Grade calculation
  let atsGrade: 'A+' | 'A' | 'B+' | 'B' | 'C' | 'D' = 'B';
  if (overallScore >= 90) atsGrade = 'A+';
  else if (overallScore >= 82) atsGrade = 'A';
  else if (overallScore >= 74) atsGrade = 'B+';
  else if (overallScore >= 65) atsGrade = 'B';
  else if (overallScore >= 55) atsGrade = 'C';
  else atsGrade = 'D';

  // 5. Strengths
  const strengths: ResumeStrength[] = [];
  if (matchingSkills.length > 0) {
    const topMatches = matchingSkills.slice(0, 4).map(s => s.name).join(', ');
    strengths.push({
      title: 'High Core Technical Overlap',
      description: `Resume explicitly highlights critical job requirements including ${topMatches}.`,
      category: 'skills',
    });
  }
  if (metricsFound.length >= 2) {
    strengths.push({
      title: 'Quantifiable Business & Performance Impact',
      description: `Discovered ${metricsFound.length} quantitative metrics (e.g., "${metricsFound[0]}", "${metricsFound[1]}"), satisfying recruiter preference for measurable achievements.`,
      category: 'impact',
    });
  }
  if (strongVerbsCount >= 3) {
    strengths.push({
      title: 'Action-Oriented Leadership Verbs',
      description: `Utilizes assertive action verbs including ${STRONG_ACTION_VERBS.slice(0, 3).join(', ')} to demonstrate direct ownership.`,
      category: 'brevity',
    });
  }
  if (hasContactInfo && hasSkillsSection && hasExperience) {
    strengths.push({
      title: 'Clean ATS-Parseable Structure',
      description: 'Standard resume sections (Contact, Experience, Education, Skills) are clearly demarcated for applicant tracking robots.',
      category: 'formatting',
    });
  }

  // 6. Experience Gaps
  const experienceGaps: ExperienceGap[] = [];
  if (missingSkills.length > 0) {
    const criticalMissingNames = missingSkills
      .filter(s => s.importance === 'critical' || s.importance === 'preferred')
      .slice(0, 4)
      .map(s => s.name);
    
    if (criticalMissingNames.length > 0) {
      experienceGaps.push({
        title: `Missing High-Priority Keywords (${criticalMissingNames.join(', ')})`,
        description: `The job description repeatedly mentions ${criticalMissingNames.join(', ')}, but these keywords are absent or unindexed in your resume text.`,
        severity: 'high',
        recommendation: `Incorporate ${criticalMissingNames.slice(0, 2).join(' and ')} directly into your skills section and bullet points where you have relevant experience.`,
      });
    }
  }

  if (weakVerbsFound.length > 0) {
    experienceGaps.push({
      title: `Passive or Duty-Oriented Language Detected`,
      description: `Found ${weakVerbsFound.length} passive phrases like "${weakVerbsFound[0].weak}" which signal passive participation rather than pro-active execution.`,
      severity: 'medium',
      recommendation: `Upgrade phrases like "${weakVerbsFound[0].weak}" to strong verbs such as "${weakVerbsFound[0].better}".`,
    });
  }

  if (metricsFound.length < 3) {
    experienceGaps.push({
      title: 'Limited Quantifiable Metrics in Experience Bullets',
      description: 'Recruiters and ATS scoring algorithms award higher marks to bullets featuring concrete metrics (%, time saved, revenue, users).',
      severity: 'medium',
      recommendation: 'Use the Google XYZ Formula: Accomplished [X], as measured by [Y], by doing [Z]. Add exact metrics to 2+ bullets.',
    });
  }

  // 7. Bullet Rewrites (Before vs. After)
  const bulletRewrites = generateBulletRewrites(resumeText, missingSkills, weakVerbsFound);

  // 8. Actionable Improvements Checklist
  const improvements: ImprovementItem[] = [];
  if (missingSkills.length > 0) {
    const topMissing = missingSkills.slice(0, 3).map(s => s.name).join(', ');
    improvements.push({
      id: 'imp-1',
      category: 'Critical',
      title: `Add missing target keywords: ${topMissing}`,
      description: `ATS filters will automatically downgrade candidate score if these top terms are absent.`,
      impactScore: 12,
    });
  }

  if (weakVerbsFound.length > 0) {
    improvements.push({
      id: 'imp-2',
      category: 'Recommended',
      title: `Replace ${weakVerbsFound.length} passive verbs with action-driven power verbs`,
      description: `Switch "${weakVerbsFound[0].weak}" to "${weakVerbsFound[0].better}" to communicate decisive ownership.`,
      impactScore: 8,
    });
  }

  improvements.push({
    id: 'imp-3',
    category: 'Recommended',
    title: 'Infuse quantifiable scale metrics into work bullets',
    description: 'Provide exact numbers (e.g. latency reduced by 30%, 500k+ monthly active users, 10x throughput boost).',
    impactScore: 9,
  });

  improvements.push({
    id: 'imp-4',
    category: 'Polish',
    title: 'Align summary title with exact target job posting title',
    description: 'Mirror the job posting title directly in your resume header or professional summary for instant 100% keyword title match.',
    impactScore: 5,
  });

  // 9. Faculty Evaluation Notes
  const facultyNotes = {
    overallReadiness: overallScore >= 80 ? 'Competitive Applicant Ready for On-Campus & Industry Recruitment' : 'Promising Foundation Needing Keyword & Impact Refinements',
    recommendedGrade: atsGrade,
    mentorshipAdvice: [
      `Encourage candidate to incorporate high-demand keywords (${missingSkills.slice(0, 2).map(s => s.name).join(', ') || 'cloud orchestration'}) into capstone or internship descriptions.`,
      'Guide student to apply the XYZ achievement formula (Action + Context + Quantifiable Metric) on all bullets.',
      'Recommend conducting mock technical interviews targeting the key required frameworks highlighted above.'
    ]
  };

  // Job title detection
  const firstJobLines = jobText.split('\n').slice(0, 4).join(' ');
  const detectedTitle = firstJobLines.match(/(?:title|position|role):\s*([^\n,]+)/i)?.[1]?.trim()
    || firstJobLines.match(/(?:senior|staff|lead|junior)?\s*(?:full stack|software|data|machine learning|cloud|frontend|backend|devops|systems)?\s*(?:engineer|developer|scientist|analyst|professor|lecturer)/i)?.[0]
    || 'Target Professional Role';

  return {
    overallScore,
    atsGrade,
    breakdown: {
      skillsMatch: skillsMatchScore,
      experienceRelevance: expScore,
      atsReadiness: atsScore,
      impactAndVerbs: impactScore,
    },
    jobSummary: {
      title: detectedTitle,
      level: overallScore > 80 ? 'High Compatibility' : 'Moderate Alignment',
      keyRequirementsCount: totalJobSkillsCount,
    },
    matchingSkills,
    missingSkills,
    strengths,
    experienceGaps,
    bulletRewrites,
    improvements,
    facultyNotes,
    analyzedAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
  };
}

function generateBulletRewrites(
  resumeText: string,
  missingSkills: SkillMatch[],
  weakVerbs: { weak: string; better: string; tip: string }[]
): BulletRewrite[] {
  const lines = resumeText.split('\n').map(l => l.trim());
  const rawBullets = lines
    .filter(l => /^[•\-\*▪]/.test(l) && l.length > 25)
    .map(l => l.replace(/^[•\-\*▪\d\.]\s*/, '').trim());

  const rewrites: BulletRewrite[] = [];
  const topMissing = missingSkills.slice(0, 2).map(s => s.name);

  // If we found bullets in resume, look for ones that have weak verbs or could be improved
  for (let i = 0; i < rawBullets.length && rewrites.length < 3; i++) {
    const bullet = rawBullets[i];
    const weakMatch = weakVerbs.find(w => new RegExp(`\\b${escapeRegExp(w.weak)}\\b`, 'i').test(bullet));

    if (weakMatch) {
      const verbToUse = weakMatch.better;
      // Synthesize a high-impact rewritten bullet
      let rewritten = bullet.replace(new RegExp(`\\b${escapeRegExp(weakMatch.weak)}\\b`, 'i'), verbToUse);
      
      // Inject missing keyword and metric if not present
      if (topMissing.length > 0 && !rewritten.toLowerCase().includes(topMissing[0].toLowerCase())) {
        rewritten += `, orchestrating workflows with ${topMissing[0]} to boost operational reliability by 34%`;
      } else if (!/\d+%|\$\d+|\d+x/i.test(rewritten)) {
        rewritten += `, elevating delivery speed and reducing cycle latency by 38%`;
      }

      rewrites.push({
        id: `rewrite-${rewrites.length + 1}`,
        original: bullet,
        rewritten,
        improvementReason: `Replaced weak verb "${weakMatch.weak}" with action verb "${verbToUse}", infused target keyword "${topMissing[0] || 'high-availability'}", and anchored with a measurable 34%+ impact metric.`,
        scoreImprovement: 8,
        keywordsAdded: topMissing.slice(0, 1),
        weakVerbReplaced: weakMatch.weak,
        strongVerbUsed: verbToUse,
        hasMetrics: true,
      });
    } else if (!/\d+%|\$\d+|\d+x/i.test(bullet) && rewrites.length < 2) {
      // Bullet lacks numbers
      const strongVerb = STRONG_ACTION_VERBS[rewrites.length % STRONG_ACTION_VERBS.length];
      const rewritten = `${strongVerb} ${bullet.charAt(0).toLowerCase() + bullet.slice(1)}, driving a 45% increase in throughput and reducing error rates across 100K+ daily transactions`;

      rewrites.push({
        id: `rewrite-${rewrites.length + 1}`,
        original: bullet,
        rewritten,
        improvementReason: 'Infused concrete quantifiable scale (45% increase, 100K+ daily transactions) following the Google XYZ formula.',
        scoreImprovement: 7,
        keywordsAdded: ['Throughput', 'Error Reduction'],
        strongVerbUsed: strongVerb,
        hasMetrics: true,
      });
    }
  }

  // If no bullets were candidate, provide realistic illustrative examples
  if (rewrites.length === 0) {
    rewrites.push({
      id: 'rewrite-default-1',
      original: 'Worked on migrating services to Docker containers and cloud infrastructure.',
      rewritten: `Architected seamless migration of legacy microservices into Docker and ${topMissing[0] || 'Kubernetes'}, slashing infrastructure deployment time by 65% across 4 production environments.`,
      improvementReason: 'Eliminates passive "worked on", adds specific container orchestration keywords, and quantifies 65% deployment acceleration.',
      scoreImprovement: 9,
      keywordsAdded: [topMissing[0] || 'Kubernetes', 'Docker'],
      weakVerbReplaced: 'worked on',
      strongVerbUsed: 'Architected',
      hasMetrics: true,
    });
    rewrites.push({
      id: 'rewrite-default-2',
      original: 'Responsible for writing unit tests and fixing bugs in the frontend.',
      rewritten: 'Spearheaded frontend automated testing framework adopting Jest and TypeScript, lifting code coverage from 52% to 94% and eliminating 40+ monthly bug escapes.',
      improvementReason: 'Transforms general duty statement into high-ownership leadership achievement with exact test coverage metrics.',
      scoreImprovement: 8,
      keywordsAdded: ['Jest', 'TypeScript', 'Automated Testing'],
      weakVerbReplaced: 'responsible for',
      strongVerbUsed: 'Spearheaded',
      hasMetrics: true,
    });
  }

  return rewrites;
}

function escapeRegExp(string: string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// Optional Gemini LLM Integration
async function analyzeWithGemini(resumeText: string, jobText: string, apiKey: string): Promise<AnalysisResult> {
  const prompt = `You are ResuMates, an elite Applicant Tracking System (ATS) and AI Resume Reviewer used by university faculty and Fortune 500 recruiters.
Analyze this resume against the target job description. Output ONLY valid JSON matching this schema:
{
  "overallScore": number (0-100),
  "atsGrade": "A+" | "A" | "B+" | "B" | "C" | "D",
  "breakdown": {
    "skillsMatch": number,
    "experienceRelevance": number,
    "atsReadiness": number,
    "impactAndVerbs": number
  },
  "jobSummary": { "title": string, "level": string, "keyRequirementsCount": number },
  "matchingSkills": [{"name": string, "category": "technical"|"soft"|"tool"|"methodology", "inResume": true, "inJob": true, "frequencyInJob": 1, "frequencyInResume": 1, "importance": "critical"|"preferred"}],
  "missingSkills": [{"name": string, "category": "technical"|"soft"|"tool"|"methodology", "inResume": false, "inJob": true, "frequencyInJob": 1, "frequencyInResume": 0, "importance": "critical"|"preferred"}],
  "strengths": [{"title": string, "description": string, "category": "impact"|"skills"|"brevity"|"formatting"}],
  "experienceGaps": [{"title": string, "description": string, "severity": "high"|"medium"|"low", "recommendation": string}],
  "bulletRewrites": [
    {
      "id": string,
      "original": string,
      "rewritten": string,
      "improvementReason": string,
      "scoreImprovement": number,
      "keywordsAdded": string[],
      "strongVerbUsed": string,
      "hasMetrics": true
    }
  ],
  "improvements": [{"id": string, "category": "Critical"|"Recommended"|"Polish", "title": string, "description": string, "impactScore": number}],
  "facultyNotes": {
    "overallReadiness": string,
    "recommendedGrade": string,
    "mentorshipAdvice": string[]
  }
}

Resume Text:
${resumeText.slice(0, 4000)}

Job Description:
${jobText.slice(0, 3000)}
`;

  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: { responseMimeType: 'application/json', temperature: 0.2 },
    }),
  });

  if (!response.ok) {
    throw new Error(`Gemini API responded with status ${response.status}`);
  }

  const data = await response.json();
  const rawJson = data.candidates?.[0]?.content?.parts?.[0]?.text;
  const parsed = JSON.parse(rawJson);
  parsed.analyzedAt = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' });
  return parsed as AnalysisResult;
}
