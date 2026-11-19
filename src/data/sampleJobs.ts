export interface SampleJobPreset {
  id: string;
  title: string;
  company: string;
  roleBadge: string;
  description: string;
  jobText: string;
}

export const SAMPLE_JOBS: SampleJobPreset[] = [
  {
    id: 'senior-fullstack-cloud',
    title: 'Senior Full Stack Software Engineer',
    company: 'Stripe / CloudTech',
    roleBadge: 'Engineering • Remote',
    description: 'Requires React, TypeScript, Node.js, AWS, Kubernetes, Docker, and Microservices.',
    jobText: `About the Role:
We are looking for an experienced Senior Full Stack Software Engineer to join our Core Platform Engineering team. In this role, you will architect, build, and maintain mission-critical web applications that handle millions of transactions each day.

Key Responsibilities:
• Architect, build, and operate resilient web applications using React, TypeScript, and Node.js.
• Design scalable REST APIs and microservices backed by PostgreSQL, Redis, and message queues.
• Deploy, monitor, and scale infrastructure on AWS utilizing Docker and Kubernetes (k8s).
• Champion engineering excellence through automated CI/CD pipelines, code reviews, and Test-Driven Development (TDD).
• Mentor junior and mid-level engineers, fostering an inclusive culture of technical growth and ownership.
• Partner closely with Product Managers, UX Designers, and Security teams to deliver reliable customer-facing features.

Qualifications & Requirements:
• 4+ years of professional software engineering experience building production-grade web applications.
• Mastery of modern frontend ecosystems: React, TypeScript, Next.js, and CSS frameworks (Tailwind CSS).
• Strong backend proficiency in Node.js, Express, or Go with robust understanding of relational databases (PostgreSQL, SQL).
• Proven production experience with AWS cloud services (EC2, S3, RDS, Lambda) and container orchestration with Docker and Kubernetes.
• Familiarity with CI/CD automation (GitHub Actions) and Agile/Scrum delivery cadences.
• Strong written and verbal communication skills with ability to articulate technical tradeoffs.
`
  },
  {
    id: 'ai-ml-scientist',
    title: 'Machine Learning Research Engineer',
    company: 'Anthropic / DeepMind Partner',
    roleBadge: 'AI & Data • Hybrid',
    description: 'Requires PyTorch, LLMs, NLP, Python, Vector Databases, and distributed training.',
    jobText: `Position: Machine Learning Research Engineer
Location: San Francisco, CA / Remote

About the Team:
Our team focuses on frontier Generative AI research and deployment. We build state-of-the-art Large Language Models (LLMs) and intelligent retrieval systems for enterprise applications.

What You Will Do:
• Research, design, and fine-tune Large Language Models (LLMs) and transformer architectures using PyTorch and Hugging Face.
• Develop Retrieval-Augmented Generation (RAG) architectures with Vector Databases (Pinecone, Milvus) and LangChain.
• Scale distributed model training and inference pipelines across GPU clusters on Google Cloud (GCP) or AWS.
• Conduct rigorous statistical evaluation, benchmark model accuracy, latency, and hallucination reduction.
• Collaborate with cross-functional teams and publish research findings at top-tier conferences (NeurIPS, ICML, ACL).

What We Expect:
• Master's or Ph.D. in Computer Science, Machine Learning, Data Science, or equivalent practical experience.
• 2+ years of hands-on experience with deep learning frameworks, specifically PyTorch and Scikit-Learn.
• Deep theoretical and applied knowledge of Natural Language Processing (NLP) and modern transformer models.
• Strong coding skills in Python, SQL, and familiarity with data manipulation using Pandas and NumPy.
• Experience containerizing ML pipelines with Docker and orchestrating runs via CI/CD.
`
  },
  {
    id: 'academic-faculty',
    title: 'Assistant Professor of Computer Science',
    company: 'University School of Computing',
    roleBadge: 'Faculty • Higher Ed',
    description: 'Focuses on university teaching, curriculum development, distributed systems, and academic research.',
    jobText: `Position Announcement: Assistant Professor of Computer Science (Tenure-Track)
Institution: State University College of Engineering

The Department of Computer Science invites applications for a tenure-track faculty position at the rank of Assistant Professor. We seek dedicated educators and scholars passionate about undergraduate and graduate education, innovative curriculum development, and cutting-edge academic research.

Responsibilities:
• Deliver high-quality instruction in undergraduate and graduate courses including Operating Systems, Distributed Systems, and Computer Networks.
• Engage in active curriculum development, modernizing computer science lab coursework with modern cloud and virtualization tools (Docker, Kubernetes, Linux).
• Establish and maintain an externally funded, peer-reviewed academic research program, publishing in premier IEEE/ACM venues.
• Provide academic advising and research mentorship to undergraduate and graduate thesis students.
• Participate in university service, diversity initiatives, and department committee meetings.

Qualifications:
• Ph.D. in Computer Science, Computer Engineering, or closely related field by appointment start date.
• Demonstrated commitment to teaching excellence and student mentorship.
• A clear research agenda with documented peer-reviewed publications and potential for securing federal research grants (NSF, NIH, DoD).
• Strong communication, leadership, and collaborative skills across diverse academic communities.
`
  }
];
