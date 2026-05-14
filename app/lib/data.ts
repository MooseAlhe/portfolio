// All site content lives here. Edit this file to update the site.

export const profile = {
  name: "Mustafa Alhelawe",
  handle: "mustafa",
  host: "portfolio",
  role: "Software Engineer",
  tagline: "Full-stack engineer. Distributed systems. Curious about everything.",
  location: "New Jersey, USA",
  email: "mustafa.alhelawe@gmail.com",
  phone: "(732) 337-8562",
  github: "https://github.com/MooseAlhe",
  githubHandle: "MooseAlhe",
  linkedin: "https://www.linkedin.com/in/mustafa-alhelawe-116391197",
  linkedinHandle: "mustafa-alhelawe",
  resumePath: "/resume.pdf",
} as const;

export const heroLines: string[] = [
  "init portfolio.exe",
  "loading profile…",
  "ready.",
];

export const aboutBio: string[] = [
  "Software engineer based in New Jersey. I work full-stack at Bank of America Merrill Lynch on a trade-confirmation platform that moves millions of daily institutional transactions.",
  "Off-hours I'm usually building something — a Plaid-backed finance app right now, plus a reinforcement-learning sandbox for training PPO agents in Unity.",
  "I'm also a hobbyist Unity dev — currently building Echobound, a multiplayer extraction roguelike with a voice-controlled AI companion, and running PPO experiments in a custom ML-Agents environment.",
  "Rutgers ECE '22. I'm into distributed systems, gameplay programming, taking things apart to see how they work, and shipping side projects until 2am.",
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
    items: ["PyTorch", "Scikit-learn", "Reinforcement Learning", "LLMs"],
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
  /** One short conversational paragraph: what the day-to-day actually looks like. */
  blurb: string;
  /** Scale/scope chips — quick numbers a recruiter scans for. */
  scope: string[];
  /** Tech stack used in this specific role (different from global skills). */
  stack: string[];
};

export const experience: Job[] = [
  {
    company: "Bank of America Merrill Lynch",
    role: "Software Engineer",
    location: "Jersey City, NJ",
    start: "Jan 2023",
    end: "Present",
    blurb:
      "I work full-stack on the trade-confirmation platform — the system that takes institutional orders and gets them matched, booked, and confirmed without anyone losing money. Scala services and ingestion pipelines on the backend, JavaScript/React on the operations UI, and zero-downtime rollouts across a distributed cluster in between. Most weeks are a mix of building new flows, getting ops out of release-cycle jail, and chasing down whatever is misbehaving in production.",
    scope: [
      "~M daily txns",
      "10+ trade flows",
      "15+ prod servers",
      "300+ client configs",
    ],
    stack: ["Scala", "JavaScript", "React", "AMPS", "Jenkins", "Splunk"],
  },
  {
    company: "Capri Holdings Limited",
    role: "Cybersecurity Analyst Intern",
    location: "East Rutherford, NJ",
    start: "Jun 2022",
    end: "Aug 2022",
    blurb:
      "A summer in corporate security. I sat with the SOC and triaged real Level 2/3 alerts — sometimes routine, sometimes someone's machine quietly phoning home to an IP nobody should be talking to. I also ran vendor risk reviews, which taught me that \"security\" is half tooling and half reading other companies' policies very carefully.",
    scope: ["L2/L3 alert triage", "vendor risk reviews", "IOC review"],
    stack: ["LogRhythm SIEM", "CrowdStrike", "Splunk-style workflows"],
  },
];

/**
 * Media item used in project covers and galleries.
 * `type` defaults to "image". For videos, point `src` at an mp4/webm in /public/projects/<slug>/.
 */
export type Media = {
  src: string;
  alt: string;
  type?: "image" | "video";
  poster?: string;
};

export type Project = {
  slug: string;
  name: string;
  tagline: string;
  summary: string;
  period: string;
  status: "active" | "completed" | "archived";
  featured?: boolean;
  stack: string[];
  overview: string[];
  highlights: string[];
  cover?: Media;
  gallery?: Media[];
  links: {
    github?: string;
    demo?: string;
  };
};

export const projects: Project[] = [
  {
    slug: "echobound",
    name: "Echobound",
    tagline: "Multiplayer Extraction Roguelike",
    summary:
      "Multiplayer extraction roguelike in Unity 6. You play alongside an AI pet you can talk to through your mic — speech is transcribed and routed through an LLM that figures out what you actually meant.",
    period: "Dec 2025 — Present",
    status: "active",
    featured: true,
    stack: [
      "Unity 6",
      "C#",
      "FishNet",
      "Steamworks",
      "whisper.unity",
      "LLM",
      "HDRP",
    ],
    overview: [
      "Echobound is a multiplayer extraction roguelike I'm building with a small team. The core hook is the companion system: instead of binding pet commands to a hotbar, you press-to-talk on your mic and tell the thing what to do — \"attack the big one,\" \"follow me,\" \"bolt the guy on the ridge\" — and it actually does it.",
      "Audio is captured locally and transcribed with whisper.unity, the transcript runs through an LLM that interprets intent against the companion's available abilities, and the resulting command is dispatched through FishNet so every player on the server sees the same companion behavior. Steamworks handles lobbies and identity.",
    ],
    highlights: [],
    links: {},
  },
  {
    slug: "finance-app",
    name: "Finance App",
    tagline: "Personal finance & shared bills",
    summary:
      "Full-stack personal finance app with bank linking, shared bills, and AI-assisted spending insights.",
    period: "Feb 2026 — Present",
    status: "active",
    featured: true,
    stack: ["Next.js", "TypeScript", "Supabase", "PostgreSQL", "Plaid"],
    overview: [
      "A personal finance app that does what bank apps refuse to — let people who share rent, utilities, and groceries actually settle up without a spreadsheet.",
      "Plaid handles the bank linking and transaction sync, Supabase backs auth and storage, and a layer of LLM tooling translates natural-language questions like \"how much did I spend on coffee in March?\" into structured queries against the user's own data.",
    ],
    highlights: [
      "Designed the full-stack architecture: auth, secure financial data access, transaction syncing.",
      "Plaid integration powering spending breakdowns, recurring-expense views, and contact-based shared bills.",
      "Server-side API routes for secure data retrieval and transaction reconciliation.",
      "Prototyped AI workflows for natural-language spend queries and automated categorization.",
    ],
    links: {},
  },
  {
    slug: "ai-simulation-platform",
    name: "AI Simulation Platform",
    tagline: "Reinforcement learning in Unity",
    summary:
      "Custom Unity ML-Agents environment for training autonomous agents with PPO + Python training pipelines.",
    period: "Jan 2025 — Present",
    status: "active",
    featured: true,
    stack: ["Unity", "C#", "Python", "ML-Agents", "PPO", "PyTorch"],
    overview: [
      "A modular Unity environment for training reinforcement-learning agents end-to-end — environment, reward shaping, training pipeline, and analysis.",
      "Wrote production-grade C# for the environment side and clean Python on the training side, with TensorBoard wired in for run comparison.",
    ],
    highlights: [
      "Built a modular Unity ML-Agents environment with configurable reward systems and state observations.",
      "Tuned PPO hyperparameters across experiments to improve learning stability.",
      "Production-style C# integrated cleanly with Python training pipelines.",
    ],
    links: {},
  },
];

export const education = {
  school: "Rutgers University — New Brunswick",
  degree: "B.S. Electrical and Computer Engineering",
  year: "Class of 2022",
};
