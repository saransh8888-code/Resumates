import { ResumeData } from '../types';

export interface SampleResumePreset {
  id: string;
  label: string;
  role: string;
  badge: string;
  description: string;
  rawText: string;
  structured: ResumeData;
}

export const SAMPLE_RESUMES: SampleResumePreset[] = [
  {
    id: 'swe-lead',
    label: 'Alex Rivera — Full Stack Software Engineer',
    role: 'Full Stack Engineer (Mid-Senior)',
    badge: 'Tech & Engineering',
    description: 'Strong full-stack profile with React, Node, AWS, but lacks Kubernetes and has some passive bullet points.',
    rawText: `ALEX RIVERA
San Francisco, CA • (555) 234-5678 • alex.rivera@example.com • linkedin.com/in/alexrivera-dev • github.com/alexrivera

PROFESSIONAL SUMMARY
Full Stack Software Engineer with 4+ years of experience engineering high-throughput web applications using React, Node.js, and AWS. Proven track record of scaling backend services, mentoring junior engineers, and driving CI/CD adoption across distributed cross-functional teams.

CORE SKILLS
• Programming Languages: JavaScript, TypeScript, Python, SQL, HTML5/CSS3
• Frameworks & Libraries: React, Next.js, Node.js, Express, Tailwind CSS, Jest
• Cloud & Databases: AWS (S3, EC2, Lambda), PostgreSQL, MongoDB, Redis, Docker
• Tools & Practices: Git, GitHub Actions, CI/CD, Agile/Scrum, REST APIs, Microservices

WORK EXPERIENCE
Senior Software Engineer | CloudScale Systems, SF (2022 - Present)
• Architected a responsive customer analytics dashboard using React and TypeScript, accelerating page load speeds by 42%.
• Worked on the migration of legacy monolith to microservices using Node.js and Docker, handling 5M+ daily requests.
• Implemented automated CI/CD pipelines with GitHub Actions, reducing deployment cycle times from 4 hours to 18 minutes.
• Mentored 4 junior developers in code review best practices, modern TypeScript, and test-driven development.

Software Engineer | NexaCorp Solutions, San Jose (2020 - 2022)
• Responsible for building RESTful APIs using Express and PostgreSQL supporting real-time inventory tracking for 120 retail clients.
• Assisted in database query optimization, reducing p99 response latency by 35% across critical transactional endpoints.
• Developed reusable React UI component library adopted across 3 internal engineering teams.
• Participated in bi-weekly Agile sprint planning and customer feedback triage sessions.

EDUCATION
Bachelor of Science in Computer Science
University of California, Berkeley (2016 - 2020)
• Relevant Coursework: Data Structures & Algorithms, Distributed Systems, Database Management Systems
• GPA: 3.82 / 4.00 — Dean's Honors List

KEY PROJECTS
• ResuMates AI Platform: Open-source web application for analyzing resumes against ATS job descriptions using React and Node.js.
• Distributed Cache Layer: High-performance in-memory cache implemented in TypeScript and Redis supporting LRU eviction policies.
`,
    structured: {
      contact: {
        name: 'Alex Rivera',
        email: 'alex.rivera@example.com',
        phone: '(555) 234-5678',
        location: 'San Francisco, CA',
        linkedin: 'linkedin.com/in/alexrivera-dev',
        github: 'github.com/alexrivera',
        website: 'https://alexrivera.dev'
      },
      summary: 'Full Stack Software Engineer with 4+ years of experience engineering high-throughput web applications using React, Node.js, and AWS. Proven track record of scaling backend services, mentoring junior engineers, and driving CI/CD adoption across distributed cross-functional teams.',
      skills: [
        {
          category: 'Languages & Core',
          items: ['JavaScript', 'TypeScript', 'Python', 'SQL', 'HTML5/CSS3']
        },
        {
          category: 'Frameworks & Libraries',
          items: ['React', 'Next.js', 'Node.js', 'Express', 'Tailwind CSS', 'REST APIs']
        },
        {
          category: 'Cloud & Infrastructure',
          items: ['AWS', 'Docker', 'PostgreSQL', 'MongoDB', 'Redis', 'CI/CD', 'Git']
        },
        {
          category: 'Methodologies & Soft Skills',
          items: ['Agile/Scrum', 'Mentorship', 'Code Review', 'System Design']
        }
      ],
      experience: [
        {
          id: 'exp-1',
          company: 'CloudScale Systems',
          role: 'Senior Software Engineer',
          location: 'San Francisco, CA',
          startDate: '2022',
          endDate: 'Present',
          current: true,
          bullets: [
            'Architected a responsive customer analytics dashboard using React and TypeScript, accelerating page load speeds by 42%.',
            'Worked on the migration of legacy monolith to microservices using Node.js and Docker, handling 5M+ daily requests.',
            'Implemented automated CI/CD pipelines with GitHub Actions, reducing deployment cycle times from 4 hours to 18 minutes.',
            'Mentored 4 junior developers in code review best practices, modern TypeScript, and test-driven development.'
          ]
        },
        {
          id: 'exp-2',
          company: 'NexaCorp Solutions',
          role: 'Software Engineer',
          location: 'San Jose, CA',
          startDate: '2020',
          endDate: '2022',
          current: false,
          bullets: [
            'Responsible for building RESTful APIs using Express and PostgreSQL supporting real-time inventory tracking for 120 retail clients.',
            'Assisted in database query optimization, reducing p99 response latency by 35% across critical transactional endpoints.',
            'Developed reusable React UI component library adopted across 3 internal engineering teams.',
            'Participated in bi-weekly Agile sprint planning and customer feedback triage sessions.'
          ]
        }
      ],
      education: [
        {
          id: 'edu-1',
          institution: 'University of California, Berkeley',
          degree: 'Bachelor of Science',
          fieldOfStudy: 'Computer Science',
          startDate: '2016',
          endDate: '2020',
          gpa: '3.82 / 4.00',
          achievements: ["Dean's Honors List", 'Undergraduate Research Assistant']
        }
      ],
      projects: [
        {
          id: 'proj-1',
          title: 'ResuMates AI Platform',
          description: 'Open-source web application for analyzing resumes against ATS job descriptions using React and Node.js.',
          techStack: ['React', 'Node.js', 'TypeScript', 'Tailwind CSS'],
          bullets: [
            'Engineered dynamic ATS scoring algorithm matching candidate resumes with custom job requirements in under 1.2s.',
            'Integrated client-side PDF/DOCX parsing engine processing 100+ documents daily with zero server transmission.'
          ]
        },
        {
          id: 'proj-2',
          title: 'Distributed Cache Layer',
          description: 'High-performance in-memory cache implemented in TypeScript and Redis supporting LRU eviction policies.',
          techStack: ['TypeScript', 'Redis', 'Docker'],
          bullets: [
            'Simulated 10,000 concurrent client operations with sub-millisecond retrieval benchmarks.'
          ]
        }
      ]
    }
  },
  {
    id: 'ai-grad',
    label: 'Priya Sharma — AI / ML Data Scientist',
    role: 'AI / Machine Learning Engineer (New Grad / Mid)',
    badge: 'Data Science & AI',
    description: 'Strong machine learning and Python background, with research projects in LLMs, PyTorch, and NLP.',
    rawText: `PRIYA SHARMA
Austin, TX • (512) 987-6543 • priya.sharma@example.edu • github.com/priyasharma-ml

SUMMARY
Machine Learning Engineer and Researcher with expertise in Natural Language Processing, Large Language Models, PyTorch, and predictive modeling. Published author with demonstrated ability to deploy production-grade deep learning pipelines on Google Cloud (GCP) and AWS.

TECHNICAL PROFICIENCIES
• Machine Learning / AI: PyTorch, TensorFlow, Scikit-Learn, Hugging Face Transformers, LLMs, NLP, LangChain, RAG
• Languages: Python, SQL, C++, R, Bash
• Data & Cloud: Pandas, NumPy, BigQuery, PostgreSQL, AWS, Google Cloud (GCP), Docker, Git

EXPERIENCE
Machine Learning Intern | QuantAI Labs, Austin (May 2023 - Dec 2023)
• Engineered a Retrieval-Augmented Generation (RAG) pipeline utilizing LangChain, Pinecone, and LLMs to index 200,000+ domain research papers.
• Fine-tuned open-source transformer models on PyTorch, lifting factual question-answering accuracy from 71% to 89.4%.
• Collaborated with data engineering team to stream real-time feature pipelines using Apache Kafka and Pandas.
• Wrote unit tests and automated regression suites using PyTest, achieving 94% test coverage on core inference modules.

Graduate Research Assistant | Department of Artificial Intelligence, UT Austin (2022 - 2024)
• Conducted academic research on cross-lingual NLP models under Dr. Henderson, culminating in 2 first-author papers submitted to ACL.
• Optimized deep neural network training routines using PyTorch Distributed Data Parallel (DDP), slashing GPU cluster compute costs by 28%.
• Mentored 15 undergraduate students in deep learning and statistical modeling lab courses.

EDUCATION
Master of Science in Computer Science (Specialization: Machine Learning)
University of Texas at Austin (2022 - 2024) — GPA: 3.94 / 4.00

Bachelor of Technology in Computer Science
IIT Delhi (2018 - 2022) — GPA: 3.88 / 4.00
`,
    structured: {
      contact: {
        name: 'Priya Sharma',
        email: 'priya.sharma@example.edu',
        phone: '(512) 987-6543',
        location: 'Austin, TX',
        github: 'github.com/priyasharma-ml',
        linkedin: 'linkedin.com/in/priyasharma-ml'
      },
      summary: 'Machine Learning Engineer and Researcher with expertise in Natural Language Processing, Large Language Models, PyTorch, and predictive modeling. Published author with demonstrated ability to deploy production-grade deep learning pipelines on Google Cloud (GCP) and AWS.',
      skills: [
        {
          category: 'AI & Machine Learning',
          items: ['Machine Learning', 'Deep Learning', 'PyTorch', 'TensorFlow', 'Large Language Models (LLMs)', 'Natural Language Processing (NLP)', 'Scikit-Learn']
        },
        {
          category: 'Languages & Tools',
          items: ['Python', 'SQL', 'C++', 'Pandas', 'NumPy', 'Docker', 'Google Cloud (GCP)', 'AWS']
        },
        {
          category: 'Academic & Soft Skills',
          items: ['Academic Research', 'Mentorship', 'Problem Solving', 'Communication']
        }
      ],
      experience: [
        {
          id: 'exp-p1',
          company: 'QuantAI Labs',
          role: 'Machine Learning Intern',
          location: 'Austin, TX',
          startDate: 'May 2023',
          endDate: 'Dec 2023',
          current: false,
          bullets: [
            'Engineered a Retrieval-Augmented Generation (RAG) pipeline utilizing LangChain, Pinecone, and LLMs to index 200,000+ domain research papers.',
            'Fine-tuned open-source transformer models on PyTorch, lifting factual question-answering accuracy from 71% to 89.4%.',
            'Collaborated with data engineering team to stream real-time feature pipelines using Apache Kafka and Pandas.',
            'Wrote unit tests and automated regression suites using PyTest, achieving 94% test coverage on core inference modules.'
          ]
        },
        {
          id: 'exp-p2',
          company: 'UT Austin AI Department',
          role: 'Graduate Research Assistant',
          location: 'Austin, TX',
          startDate: '2022',
          endDate: '2024',
          current: false,
          bullets: [
            'Conducted academic research on cross-lingual NLP models under Dr. Henderson, culminating in 2 first-author papers submitted to ACL.',
            'Optimized deep neural network training routines using PyTorch Distributed Data Parallel (DDP), slashing GPU cluster compute costs by 28%.',
            'Mentored 15 undergraduate students in deep learning and statistical modeling lab courses.'
          ]
        }
      ],
      education: [
        {
          id: 'edu-p1',
          institution: 'University of Texas at Austin',
          degree: 'Master of Science',
          fieldOfStudy: 'Computer Science (Machine Learning)',
          startDate: '2022',
          endDate: '2024',
          gpa: '3.94 / 4.00'
        }
      ],
      projects: [
        {
          id: 'proj-p1',
          title: 'Semantic Document Query Engine',
          description: 'Vector-search pipeline leveraging sentence-transformers and FAISS for sub-50ms similarity search.',
          techStack: ['Python', 'PyTorch', 'Vector Databases', 'FastAPI'],
          bullets: [
            'Indexed 1.4M patent abstracts with 98.2% top-5 recall in evaluation benchmark.'
          ]
        }
      ]
    }
  },
  {
    id: 'faculty-candidate',
    label: 'Dr. Marcus Vance — Faculty / Academic Researcher',
    role: 'Assistant Professor / Academic Candidate',
    badge: 'Faculty & Academia',
    description: 'Designed specifically for academic hiring committees and faculty review boards.',
    rawText: `DR. MARCUS VANCE
Boston, MA • (617) 555-0192 • mvance@faculty.harvard.edu • orcid.org/0000-0002-1825-0097

ACADEMIC PROFILE
Computer Science Educator and Postdoctoral Researcher specializing in Distributed Systems, Cloud Architecture, and Curriculum Development. Over 6 years of university teaching experience across undergraduate and graduate levels, author of 14 peer-reviewed IEEE/ACM publications, and co-investigator on \$1.2M in NSF research grants.

EDUCATION
Ph.D. in Computer Science | Massachusetts Institute of Technology (2018 - 2023)
• Dissertation: "Fault-Tolerant Consensus in Asynchronous Byzantine Distributed Networks"
• Advisor: Prof. Eleanor Vance

B.S. in Computer Science & Mathematics | Columbia University (2014 - 2018)
• Summa Cum Laude, Phi Beta Kappa

TEACHING & UNIVERSITY EXPERIENCE
Postdoctoral Fellow & Lecturer | Harvard University (2023 - Present)
• Lead instructor for CS 161: Operating Systems and CS 262: Distributed Computing (240+ students annually).
• Modernized curriculum by incorporating Docker containers and Kubernetes cluster simulations into 6 core lab assignments.
• Received Excellence in Teaching Award with an average student evaluation rating of 4.88 / 5.00.
• Supervised 8 undergraduate senior capstone theses and 3 master's research projects.

Graduate Teaching Assistant | MIT (2019 - 2022)
• Co-designed course syllabus and grading rubrics for Introduction to Algorithms (6.006).
• Held weekly office hours, recitations, and exam review sessions for 350+ enrolled students.

SELECTED PEER-REVIEWED PUBLICATIONS
• Vance, M., et al. (2023). "Asynchronous Byzantine Agreement under Network Partitions." ACM TOCS.
• Vance, M. (2022). "Benchmarking Raft Consensus under High WAN Latency." IEEE Transactions on Cloud Computing.
• Vance, M., & Liu, K. (2021). "Pedagogical Approaches to Teaching Concurrency in Modern Systems." SIGCSE.

CORE COMPETENCIES
• Academic: Curriculum Development, Academic Research, Grant Writing, Peer Review, Mentorship
• Technical: Distributed Systems, C++, Python, Go, Docker, Kubernetes, Linux, System Design
`,
    structured: {
      contact: {
        name: 'Dr. Marcus Vance',
        email: 'mvance@faculty.harvard.edu',
        phone: '(617) 555-0192',
        location: 'Boston, MA',
        website: 'https://scholar.harvard.edu/marcusvance'
      },
      summary: 'Computer Science Educator and Postdoctoral Researcher specializing in Distributed Systems, Cloud Architecture, and Curriculum Development. Over 6 years of university teaching experience across undergraduate and graduate levels, author of 14 peer-reviewed IEEE/ACM publications, and co-investigator on $1.2M in NSF research grants.',
      skills: [
        {
          category: 'Academia & Pedagogy',
          items: ['Curriculum Development', 'Academic Research', 'Mentorship', 'Communication', 'Leadership']
        },
        {
          category: 'Technical & Systems',
          items: ['System Design', 'C++', 'Python', 'Go', 'Docker', 'Kubernetes', 'Linux']
        }
      ],
      experience: [
        {
          id: 'exp-fac1',
          company: 'Harvard University',
          role: 'Postdoctoral Fellow & Lecturer',
          location: 'Boston, MA',
          startDate: '2023',
          endDate: 'Present',
          current: true,
          bullets: [
            'Lead instructor for CS 161: Operating Systems and CS 262: Distributed Computing (240+ students annually).',
            'Modernized curriculum by incorporating Docker containers and Kubernetes cluster simulations into 6 core lab assignments.',
            'Received Excellence in Teaching Award with an average student evaluation rating of 4.88 / 5.00.',
            'Supervised 8 undergraduate senior capstone theses and 3 master\'s research projects.'
          ]
        }
      ],
      education: [
        {
          id: 'edu-fac1',
          institution: 'Massachusetts Institute of Technology',
          degree: 'Ph.D. in Computer Science',
          fieldOfStudy: 'Distributed Systems',
          startDate: '2018',
          endDate: '2023'
        }
      ],
      projects: []
    }
  }
];
