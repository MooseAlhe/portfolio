// All site content lives here. Edit this file to update the site.

export const profile = {
  name: "Mustafa Alhelawe",
  handle: "mustafa",
  host: "portfolio",
  role: "Software Engineer",
  tagline: "Backend systems. Distributed trades. Curious about everything.",
  location: "New Jersey, USA",
  email: "mustafa.alhelawe@gmail.com",
  phone: "(732) 337-8562",
  github: "https://github.com/MooseAlhe",
  githubHandle: "MooseAlhe",
  // Add your real LinkedIn URL by editing this string.
  linkedin: "",
  resumePath: "/resume.pdf",
} as const;

export const heroLines: string[] = [
  "init portfolio.exe",
  "loading profile…",
  "ready.",
];

export const aboutBio: string[] = [
  "I'm a software engineer based in New Jersey. I currently build backend services on the trade-confirmation and allocation platform at Bank of America Merrill Lynch, where my code handles millions of daily transactions across high-value institutional trades.",
  "I gravitate toward distributed systems — anything that has to be fast, correct, and survive failure. Lately I've been spending evenings on personal projects: a Plaid-backed personal-finance app with shared-bill tracking, and a reinforcement-learning sandbox where I train PPO agents in custom Unity environments.",
  "Outside the editor, I'm a Rutgers ECE grad who genuinely enjoys figuring out how things work — whether that's a trading protocol, a reward function, or a new framework I haven't tried yet.",
];

export type SkillGroup = {
  label: string;
  items: string[];
};

export const skills: SkillGroup[] = [
  {
    label: "Languages",
    items: [
      "Scala",
      "TypeScript",
      "JavaScript",
      "Python",
      "C#",
      "Java",
      "C/C++",
      "Bash",
    ],
  },
  {
    label: "Backend",
    items: [
      "Distributed Systems",
      "Microservices",
      "REST APIs",
      "JSON",
      "CI/CD",
    ],
  },
  {
    label: "Frontend",
    items: ["React", "Next.js", "Node.js"],
  },
  {
    label: "Database",
    items: ["PostgreSQL", "Supabase", "SQL"],
  },
  {
    label: "AI / ML",
    items: [
      "PyTorch",
      "Scikit-learn",
      "Reinforcement Learning",
      "LLMs",
    ],
  },
  {
    label: "Tools",
    items: [
      "Git",
      "Cursor",
      "Unity",
      "Cypress",
      "Gradle",
      "Jenkins",
      "Linux",
      "Splunk",
    ],
  },
];

export type Job = {
  company: string;
  role: string;
  location: string;
  start: string;
  end: string;
  bullets: string[];
};

export const experience: Job[] = [
  {
    company: "Bank of America Merrill Lynch",
    role: "Software Engineer",
    location: "Jersey City, NJ",
    start: "Jan 2023",
    end: "Present",
    bullets: [
      "Own backend services within a distributed trade confirmation and allocation system processing millions of daily transactions across high-value institutional trades.",
      "Built and maintained allocation workflows supporting 10+ distinct trade flows — matching, booking, confirmation, amendment, and cancellation across the full trade lifecycle.",
      "Built services to ingest and link orders from upstream systems including FIX-based messaging and file-based workflows, enabling real-time trade matching and confirmation.",
      "Led migration of 300+ client configurations to a new JSON schema in AMPS SOW, improving query performance and reducing ongoing manual support.",
      "Replaced biweekly release-dependent YAML/Ansible onboarding flows with a self-service platform, letting operations onboard clients independently — no engineering bottleneck.",
      "Designed approval and diff-review workflows for configuration changes, raising reliability and cutting production risk.",
      "Enhanced search and filtering for the operations UI used to navigate high-volume datasets.",
      "Led coordination of global teams to ensure zero-downtime rollout of next-generation architecture across 15+ production servers.",
    ],
  },
  {
    company: "Capri Holdings Limited",
    role: "Cybersecurity Analyst Intern",
    location: "East Rutherford, NJ",
    start: "Jun 2022",
    end: "Aug 2022",
    bullets: [
      "Performed vendor risk assessments on corporate partners; reviewed security policies to ensure best practices were in place when confidential information was at risk.",
      "Used SIEM platforms (LogRhythm) to assist Level 2 & 3 security event investigations — including detecting unauthorized communications with banned IPs in shut-down locations.",
      "Reviewed inbound suspicious emails for indicators of compromise using CrowdStrike's sandbox tooling.",
    ],
  },
];

export type Project = {
  name: string;
  tagline: string;
  description: string;
  stack: string[];
  highlights: string[];
  // Optional links — leave blank if you don't want to surface them yet.
  links: {
    github?: string;
    demo?: string;
  };
  period: string;
};

export const projects: Project[] = [
  {
    name: "Finance App",
    tagline: "Personal finance & shared bills",
    description:
      "Full-stack personal finance app with bank-account linking, expense tracking, shared bills, and automated repayment tracking across users.",
    stack: ["Next.js", "TypeScript", "Supabase", "PostgreSQL", "Plaid"],
    highlights: [
      "Designed the full-stack architecture for secure financial data access, user auth, and scalable workflows.",
      "Integrated Plaid for spending breakdowns, recurring-expense views, contact-based tracking, and reporting.",
      "Built server-side routes and API handlers for secure financial data retrieval and transaction syncing.",
      "Prototyped AI-assisted workflows for natural-language spending queries, categorization help, and automated insights.",
    ],
    links: {},
    period: "Feb 2026 — Present",
  },
  {
    name: "AI Simulation Platform",
    tagline: "Reinforcement learning in Unity",
    description:
      "Custom Unity ML-Agents environment for training autonomous agents with PPO, plus the surrounding training pipeline.",
    stack: ["Unity", "C#", "Python", "ML-Agents", "PPO", "PyTorch"],
    highlights: [
      "Built a modular simulation environment in Unity ML-Agents.",
      "Designed reward systems, state observations, and training pipelines for iterative agent improvement.",
      "Ran experiments, tuned hyperparameters, and analyzed performance metrics to improve learning stability.",
      "Wrote production-style modular C# environment logic integrated with Python training pipelines.",
    ],
    links: {},
    period: "Jan 2025 — Present",
  },
];

export const education = {
  school: "Rutgers University — New Brunswick",
  degree: "B.S. Electrical and Computer Engineering",
  year: "Class of 2022",
};
