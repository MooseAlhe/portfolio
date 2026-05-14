import { ReactNode } from "react";
import Term from "../components/Term";

/**
 * Keywords that should light up when a paragraph is hovered.
 * Order matters only when phrases overlap — longest match wins.
 */
const KEYWORDS: string[] = [
  // platforms / domains
  "trade-confirmation platform",
  "trade-confirmation",
  "distributed systems",
  "distributed cluster",
  "zero-downtime rollouts",
  "ingestion pipelines",
  "operations UI",
  "institutional orders",
  "institutional transactions",
  "millions of daily institutional transactions",
  "multiplayer extraction roguelike",
  "voice-controlled AI companion",
  "AI companion",
  "ML-Agents",
  "PPO experiments",
  "PPO agents",
  "PPO",
  "reinforcement-learning agents",
  "reinforcement-learning",
  "reinforcement learning",
  "AI-driven finance tools",
  "personal finance",
  "shared bills",
  "bank linking",
  "transaction sync",
  "gameplay programming",
  "gameplay systems",
  "multiplayer",
  "Echobound",
  // tech
  "full-stack",
  "Scala",
  "JavaScript",
  "React",
  "AMPS",
  "Splunk",
  "Jenkins",
  "Plaid",
  "Supabase",
  "Next.js",
  "TypeScript",
  "Unity 6",
  "Unity",
  "FishNet",
  "Steamworks",
  "whisper.unity",
  "LLM",
  "LLMs",
  "SOC",
  "SIEM",
  "LogRhythm",
  "CrowdStrike",
  // security
  "L2/L3 alert triage",
  "Level 2/3 alerts",
  "vendor risk reviews",
  "vendor risk",
  "IOC review",
];

const SORTED = [...KEYWORDS].sort((a, b) => b.length - a.length);
const PATTERN = new RegExp(
  `(${SORTED.map((k) => k.replace(/[.*+?^${}()|[\]\\/]/g, "\\$&")).join("|")})`,
  "gi"
);

/**
 * Wrap any glossary terms in `text` with <Term> spans. Returns a node list
 * suitable for placing inside a `<p className="highlight-scope">`.
 *
 * Highlights each unique keyword once per paragraph so the hover state isn't
 * a wall of green.
 */
export function highlightTerms(text: string): ReactNode[] {
  const out: ReactNode[] = [];
  const seen = new Set<string>();
  let last = 0;
  PATTERN.lastIndex = 0;
  let m: RegExpExecArray | null;
  while ((m = PATTERN.exec(text))) {
    if (m.index > last) out.push(text.slice(last, m.index));
    const match = m[0];
    const key = match.toLowerCase();
    if (seen.has(key)) {
      out.push(match);
    } else {
      seen.add(key);
      out.push(<Term key={`${m.index}-${match}`}>{match}</Term>);
    }
    last = m.index + match.length;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}
