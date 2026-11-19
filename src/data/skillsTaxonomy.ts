export interface SkillDefinition {
  name: string;
  category: 'technical' | 'soft' | 'tool' | 'methodology' | 'domain';
  synonyms?: string[];
}

export const SKILLS_TAXONOMY: SkillDefinition[] = [
  // Programming Languages
  { name: 'JavaScript', category: 'technical', synonyms: ['js', 'es6', 'vanilla js'] },
  { name: 'TypeScript', category: 'technical', synonyms: ['ts'] },
  { name: 'Python', category: 'technical', synonyms: ['py'] },
  { name: 'Java', category: 'technical' },
  { name: 'C++', category: 'technical', synonyms: ['cpp', 'c plus plus'] },
  { name: 'C#', category: 'technical', synonyms: ['csharp', '.net'] },
  { name: 'Go', category: 'technical', synonyms: ['golang'] },
  { name: 'Rust', category: 'technical' },
  { name: 'PHP', category: 'technical' },
  { name: 'Ruby', category: 'technical' },
  { name: 'Swift', category: 'technical' },
  { name: 'Kotlin', category: 'technical' },
  { name: 'SQL', category: 'technical', synonyms: ['relational database', 'rdbms'] },
  { name: 'R', category: 'technical' },
  { name: 'Scala', category: 'technical' },

  // Web Frameworks & Libraries
  { name: 'React', category: 'technical', synonyms: ['reactjs', 'react.js'] },
  { name: 'Next.js', category: 'technical', synonyms: ['nextjs'] },
  { name: 'Node.js', category: 'technical', synonyms: ['nodejs'] },
  { name: 'Express', category: 'technical', synonyms: ['expressjs'] },
  { name: 'Vue.js', category: 'technical', synonyms: ['vue', 'vuejs'] },
  { name: 'Angular', category: 'technical', synonyms: ['angularjs'] },
  { name: 'Django', category: 'technical' },
  { name: 'FastAPI', category: 'technical' },
  { name: 'Flask', category: 'technical' },
  { name: 'Spring Boot', category: 'technical', synonyms: ['spring'] },
  { name: 'GraphQL', category: 'technical' },
  { name: 'REST APIs', category: 'technical', synonyms: ['restful', 'api design'] },
  { name: 'Tailwind CSS', category: 'technical', synonyms: ['tailwind'] },
  { name: 'HTML5/CSS3', category: 'technical', synonyms: ['html', 'css', 'html5', 'css3'] },

  // Cloud & DevOps
  { name: 'AWS', category: 'tool', synonyms: ['amazon web services', 'ec2', 's3', 'lambda'] },
  { name: 'Docker', category: 'tool', synonyms: ['containerization', 'containers'] },
  { name: 'Kubernetes', category: 'tool', synonyms: ['k8s'] },
  { name: 'Azure', category: 'tool', synonyms: ['microsoft azure'] },
  { name: 'Google Cloud (GCP)', category: 'tool', synonyms: ['gcp', 'google cloud platform'] },
  { name: 'CI/CD', category: 'methodology', synonyms: ['continuous integration', 'github actions', 'jenkins', 'gitlab ci'] },
  { name: 'Terraform', category: 'tool', synonyms: ['infrastructure as code', 'iac'] },
  { name: 'Linux', category: 'tool', synonyms: ['bash', 'shell scripting', 'unix'] },
  { name: 'Git', category: 'tool', synonyms: ['github', 'version control', 'gitlab'] },

  // Data & AI / Machine Learning
  { name: 'Machine Learning', category: 'technical', synonyms: ['ml', 'predictive modeling'] },
  { name: 'Deep Learning', category: 'technical', synonyms: ['neural networks', 'dl'] },
  { name: 'Artificial Intelligence', category: 'technical', synonyms: ['ai', 'genai', 'generative ai'] },
  { name: 'Large Language Models (LLMs)', category: 'technical', synonyms: ['llm', 'rag', 'langchain', 'openai', 'gemini'] },
  { name: 'PyTorch', category: 'technical' },
  { name: 'TensorFlow', category: 'technical', synonyms: ['keras'] },
  { name: 'Natural Language Processing (NLP)', category: 'technical', synonyms: ['nlp'] },
  { name: 'Computer Vision', category: 'technical', synonyms: ['opencv', 'cv'] },
  { name: 'Pandas', category: 'technical' },
  { name: 'NumPy', category: 'technical' },
  { name: 'Scikit-Learn', category: 'technical', synonyms: ['sklearn'] },
  { name: 'Data Visualization', category: 'technical', synonyms: ['tableau', 'power bi', 'matplotlib', 'seaborn'] },
  { name: 'BigQuery', category: 'tool', synonyms: ['snowflake', 'redshift', 'data warehouse'] },
  { name: 'Apache Spark', category: 'technical', synonyms: ['spark', 'pyspark'] },

  // Databases & Storage
  { name: 'PostgreSQL', category: 'technical', synonyms: ['postgres'] },
  { name: 'MongoDB', category: 'technical', synonyms: ['nosql', 'document db'] },
  { name: 'MySQL', category: 'technical' },
  { name: 'Redis', category: 'technical', synonyms: ['caching'] },
  { name: 'Elasticsearch', category: 'technical' },
  { name: 'Vector Databases', category: 'technical', synonyms: ['pinecone', 'milvus', 'chromadb', 'qdrant', 'pgvector'] },

  // Methodologies & Practices
  { name: 'Agile/Scrum', category: 'methodology', synonyms: ['agile', 'scrum', 'kanban', 'sprints'] },
  { name: 'Test-Driven Development (TDD)', category: 'methodology', synonyms: ['unit testing', 'jest', 'pytest', 'tdd'] },
  { name: 'System Design', category: 'methodology', synonyms: ['software architecture', 'scalability', 'microservices'] },
  { name: 'Code Review', category: 'methodology', synonyms: ['peer review', 'mentorship'] },
  { name: 'Performance Optimization', category: 'methodology', synonyms: ['profiling', 'load testing', 'caching'] },
  { name: 'Cybersecurity', category: 'domain', synonyms: ['owasp', 'information security', 'auth', 'oauth'] },

  // Soft Skills & Leadership
  { name: 'Cross-functional Collaboration', category: 'soft', synonyms: ['collaboration', 'teamwork', 'partnering'] },
  { name: 'Communication', category: 'soft', synonyms: ['written communication', 'verbal communication', 'presentation'] },
  { name: 'Leadership', category: 'soft', synonyms: ['team leadership', 'tech lead', 'leading teams'] },
  { name: 'Problem Solving', category: 'soft', synonyms: ['analytical skills', 'critical thinking', 'debugging'] },
  { name: 'Project Management', category: 'soft', synonyms: ['stakeholder management', 'delivery', 'jira'] },
  { name: 'Mentorship', category: 'soft', synonyms: ['coaching', 'mentoring junior engineers'] },
  { name: 'Adaptability', category: 'soft', synonyms: ['fast learner', 'fast-paced environment'] },
  { name: 'Curriculum Development', category: 'domain', synonyms: ['teaching', 'course design', 'syllabus'] },
  { name: 'Academic Research', category: 'domain', synonyms: ['peer-reviewed publications', 'grant writing', 'ieee', 'acm'] },
];

export const STRONG_ACTION_VERBS = [
  'Architected', 'Spearheaded', 'Engineered', 'Overhauled', 'Orchestrated',
  'Accelerated', 'Formulated', 'Streamlined', 'Delivered', 'Optimized',
  'Pioneered', 'Implemented', 'Designed', 'Synthesized', 'Automated',
  'Cultivated', 'Resolved', 'Negotiated', 'Maximized', 'Transformed'
];

export const WEAK_VERBS_TO_REPLACE = [
  { weak: 'worked on', better: 'Engineered', tip: 'Specify your exact contribution and impact' },
  { weak: 'helped with', better: 'Co-spearheaded', tip: 'Clarify your specific role rather than just helping' },
  { weak: 'responsible for', better: 'Orchestrated', tip: 'Focus on what you accomplished, not just your duty' },
  { weak: 'assisted in', better: 'Facilitated', tip: 'Use strong ownership terminology' },
  { weak: 'tried to', better: 'Iteratively refined', tip: 'Demonstrate persistence and outcome' },
  { weak: 'did', better: 'Executed', tip: 'Replace vague action with clear execution' },
  { weak: 'handled', better: 'Resolved', tip: 'Highlight the definitive resolution' },
  { weak: 'made', better: 'Developed', tip: 'Use precise engineering/creative verbs' },
];
