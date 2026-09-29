// All site content lives here. Edit this file to update the site.

export const profile = {
  name: "Mustafa Alhelawe",
  handle: "mustafa",
  host: "portfolio",
  role: "Full-stack Software Engineer",
  tagline:
    "I build institutional trading systems at Bank of America Merrill Lynch, and ship side projects across web, mobile, games, and ML.",
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
  "fetching profile…",
  "ready.",
];

export const aboutBio: string[] = [
  "I'm a full-stack engineer based in New Jersey. At Bank of America Merrill Lynch, I work on institutional trading systems, with responsibility across backend services, user workflows, and production releases.",
  "I like to tinker and experiment with different technologies, from web and mobile development to games and machine learning. My own projects give me room to try ideas, learn unfamiliar tools, and work through problems outside my day job."
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
      "JavaScript",
      "TypeScript",
      "Python",
      "C#",
      "Java",
      "Bash",
      "SQL"
    ]
  },
  {
    label: "Backend",
    items: [
      "Scala",
      "Node.js",
      "REST APIs"
    ]
  },
  {
    label: "Frontend",
    items: [
      "React",
      "Next.js"
    ]
  },
  {
    label: "Mobile",
    items: [
      "React Native",
      "Expo"
    ]
  },
  {
    label: "Database",
    items: [
      "PostgreSQL",
      "Supabase",
      "Supabase Auth",
      "AMPS"
    ]
  },
  {
    label: "AI / ML",
    items: [
      "PyTorch",
      "Scikit-learn",
      "Reinforcement Learning",
      "LLMs"
    ]
  },
  {
    label: "Tools",
    items: [
      "Git",
      "Docker",
      "Linux",
      "Jenkins",
      "Gradle",
      "Cypress",
      "Splunk",
      "Unity",
      "Claude",
      "Codex"
    ]
  }
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
      "I'm one of two U.S.-based engineers responsible for a global institutional trading platform that processes millions of trades a day. I own full-stack workflows across the trade lifecycle, from bringing in orders to matching, booking, and confirming trades, and carry that work through production releases.",
    scope: [
      "Millions of trades/day",
      "10+ trade flows",
      "15+ production servers",
      "300+ client configurations"
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
      "I investigated security alerts, reviewed suspicious emails, and assessed how vendors protected confidential information. One investigation involved unauthorized traffic to banned IP addresses. I used LogRhythm for alert triage and CrowdStrike's sandbox to examine suspicious emails.",
    scope: [
      "Alert triage",
      "Vendor risk reviews",
      "Email investigations"
    ],
    stack: [
      "LogRhythm",
      "CrowdStrike"
    ],
  },
];

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/** Whole years elapsed since a "Mon YYYY" date string (e.g. "Jan 2023"). */
export function yearsSince(start: string, now: Date = new Date()): number {
  const [mon, year] = start.split(" ");
  const months =
    (now.getFullYear() - Number(year)) * 12 + (now.getMonth() - MONTHS.indexOf(mon));
  return Math.max(0, Math.floor(months / 12));
}

/** Fields shown in the hero's status.json card. localTime is added live by the Hero. */
export const statusCard = {
  status: "online",
  current: "Software Engineer @ BofA Merrill Lynch",
  experience: `${yearsSince(experience[0].start)}+ years`,
  location: profile.location,
  stack: ["Scala", "TypeScript", "React", "Next.js"],
  openTo: ["new roles"],
};

/**
 * Media item used in project covers and galleries.
 * `type` defaults to "image". For videos, point `src` at an mp4/webm in /public/projects/<slug>/.
 */
export type Media = {
  src: string;
  alt: string;
  type?: "image" | "video";
  poster?: string;
  /** "logo" centers the asset and constrains its size — for marks/icons rather than screenshots. */
  kind?: "screenshot" | "logo";
};

export type Project = {
  slug: string;
  name: string;
  tagline: string;
  summary: string;
  metaDescription?: string;
  period: string;
  status: "active" | "completed" | "archived";
  featured?: boolean;
  /** Card layout variant on the home page. "featured" gets the expanded product-showcase treatment. */
  cardVariant?: "default" | "featured";
  /** Extra copy used only by the "featured" card variant. */
  featuredCopy?: {
    eyebrow: string;
    headline: string;
    featurePills: string[];
  };
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
    slug: "splits",
    name: "Splits",
    tagline: "Tracking shared expenses and recurring bills",
    summary:
      "I built Splits to handle the bills that come around every month: recognize recurring expenses, apply agreed split rules, and keep track of who owes what. The Next.js web app and React Native/Expo mobile app share the same calculation logic and backend.",
    metaDescription:
      "Splits tracks recurring shared expenses and balances across web and mobile. Explore the sandbox web demo and the engineering behind it.",
    period: "2026",
    status: "completed",
    featured: true,
    cardVariant: "featured",
    featuredCopy: {
      eyebrow: "Web + mobile project",
      headline: "Keeping track of the bills we share.",
      featurePills: [
        "Recurring bills",
        "Shared calculations",
        "Web & mobile"
      ],
    },
    stack: [
      "Next.js",
      "TypeScript",
      "React Native",
      "Expo",
      "Supabase",
      "PostgreSQL",
      "Plaid"
    ],
    cover: {
      src: "/projects/splits/logo.png",
      alt: "Splits logo: a stylized yellow banana split down the middle",
      kind: "logo",
    },
    overview: [
      "I wanted to keep track of shared expenses without working out the same recurring bills from scratch each month. Splits brings those bills, split rules, and balances together in a web app and React Native/Expo mobile clients.",
      "The calculation logic had grown into three implementations. I consolidated it into one TypeScript package and added fixture-based tests for splits, rounding, balances, and debt simplification. I also moved the mobile backend into Next.js API routes so both clients use the same authentication and storage.",
      "Transaction syncing needed to handle interrupted runs and repeated data. The sync writes generated bill entries before saving its progress, with database-enforced keys to prevent duplicate entries on retries. The web demo lets you explore shared expenses, split rules, and balances with sandbox financial data. Splits does not hold or transfer money."
    ],
    highlights: [
      "Recurring-bill detection groups normalized merchant names and similar amounts across at least two months. It suggests split rules that can generate shared-bill entries.",
      "I consolidated three versions of the calculation logic into one shared TypeScript package, with tests for splits, rounding, balances, and debt simplification.",
      "Each bank connection has a concurrency lock to keep sync jobs from overlapping. If transactions change during pagination, the sync restarts retrieval.",
      "Generated bill entries are written before the sync cursor advances. Database-enforced idempotency keys prevent a retry from creating a second copy of the same ledger entry.",
      "I moved the mobile backend into Next.js API routes, so web and mobile share Supabase authentication and PostgreSQL storage without a separate backend deployment."
    ],
    links: {
      demo: "https://splitshq.com",
    },
  },
  {
    slug: "echobound",
    name: "Echobound",
    tagline: "A multiplayer game with a voice-controlled companion",
    summary:
      "Echobound is an extraction roguelike I'm building with a small team. The idea is to let players speak to a companion during a run. The interesting part is turning a spoken request into an ability the game can execute and share with the other players.",
    period: "Dec 2025 – Present",
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
      "I wanted to explore what it would feel like to talk to a game companion rather than choose every command from a menu. Echobound is a multiplayer extraction roguelike in development with a small team, with that interaction at the center of the companion system.",
      "The pipeline captures push-to-talk audio, transcribes it with whisper.unity, and asks an LLM to interpret the request against the companion's available abilities. The resulting command goes through FishNet's server-authoritative networking. The challenge is connecting a loosely worded request like 'follow me' to a specific game action and keeping that action consistent for the other players."
    ],
    highlights: [
      "Spoken requests are interpreted against the companion's available abilities before being dispatched as game commands.",
      "Companion actions run through server-authoritative networking so their execution can be coordinated across players.",
      "Steamworks supplies lobbies and player identity for multiplayer sessions."
    ],
    links: {},
  },
  {
    slug: "finance-app",
    name: "Finance App",
    tagline: "Exploring questions about personal spending",
    summary:
      "I started this prototype to ask questions like 'how much did I spend on coffee in March?' It combines transaction syncing with experiments in translating those questions into data queries. Some of the ideas behind Splits started here.",
    period: "Feb 2026 – Present",
    status: "active",
    featured: true,
    stack: ["Next.js", "TypeScript", "Supabase", "PostgreSQL", "Plaid"],
    overview: [
      "I wanted to ask questions about spending without manually filtering a transaction list each time. This prototype explores questions such as 'how much did I spend on coffee in March?' It's also where I first tried ideas that later became Splits.",
      "I built bank linking and transaction syncing with Plaid, authentication and storage with Supabase, and server-side routes for retrieving the data. On top of that, I experimented with translating natural-language questions into structured queries. The challenge is translating a question about a merchant and a time period into a query over the user's transactions."
    ],
    highlights: [
      "Bank linking and transaction syncing provide the records used for spending breakdowns and recurring-expense views.",
      "Server-side routes handle transaction retrieval and reconciliation, with authentication and storage backed by Supabase.",
      "I prototyped spending queries and transaction categorization to explore how people could work with their financial data in plain language."
    ],
    links: {},
  },
  {
    slug: "ai-simulation-platform",
    name: "Reinforcement Learning Simulations",
    tagline: "Learning through observations and rewards",
    summary:
      "I started with agents learning to find food, then added obstacles and visual observations. I built the simulations in Unity and training pipelines in Python, changing what agents could observe and how they were rewarded as the tasks became more complex.",
    period: "Jan 2025 – Present",
    status: "active",
    featured: true,
    stack: ["Unity", "C#", "Python", "ML-Agents", "PPO", "PyTorch"],
    overview: [
      "I wanted to understand how much an agent's behavior depends on what it can observe and what it gets rewarded for. I started with food-seeking agents without vision, then added static and moving obstacles, followed by visual observations.",
      "I built the environments in Unity ML-Agents, with modular C# logic and Python pipelines for PPO training. Each new task gave me a reason to revisit the observations, reward functions, and training settings. I later extended the experiments to a six-axis robotic arm, which introduced a more complex action space and control problem."
    ],
    highlights: [
      "Progressed from food-seeking without vision to navigation around static and moving obstacles, then experiments with visual observations.",
      "Reworked observations and reward functions through successive training runs, using C# environment logic and Python training pipelines.",
      "Extended the simulations to a six-axis robotic arm to explore a more complex set of observations, actions, and rewards."
    ],
    links: {},
  },
];

export const education = {
  school: "Rutgers University–New Brunswick",
  degree: "B.S. Electrical and Computer Engineering",
  year: "Class of 2022",
};
