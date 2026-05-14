import { ReactNode } from "react";
import Term from "../components/Term";

/** Curated glossary — case-insensitive, longest match first. */
export const GLOSSARY: Record<string, string> = {
  "trade-confirmation platform":
    "System that matches & confirms institutional trades end-to-end",
  "distributed systems":
    "Software running across many machines, coordinating without a single point of failure",
  "reinforcement learning":
    "ML paradigm where an agent learns by trial-and-error against rewards",
  "reinforcement-learning":
    "ML paradigm where an agent learns by trial-and-error against rewards",
  "ML-Agents":
    "Unity's open-source toolkit for training RL agents inside game environments",
  PPO: "Proximal Policy Optimization — a stable, widely-used RL algorithm",
  Plaid: "API for connecting US bank accounts & syncing transactions",
  Supabase: "Open-source Firebase alternative — Postgres + auth + storage",
  FishNet: "High-performance networking framework for Unity multiplayer",
  Steamworks: "Steam's SDK for lobbies, friends, and identity",
  whisper: "OpenAI's speech-to-text model (running locally in Unity)",
  Scala: "JVM language used heavily at BofA for backend services",
  AMPS: "60East's high-throughput pub/sub messaging system",
  LLM: "Large Language Model — GPT-style transformer used here for intent parsing",
  Unity: "Cross-platform game engine I use for gameplay + RL experiments",
  SOC: "Security Operations Center — the team that watches for intrusions",
  SIEM: "Security Information & Event Management — central log + alert system",
  Rutgers: "Rutgers University — New Brunswick, ECE class of 2022",
};

const KEYS = Object.keys(GLOSSARY).sort((a, b) => b.length - a.length);
const PATTERN = new RegExp(
  `\\b(${KEYS.map((k) => k.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})\\b`,
  "gi"
);

/** Wrap any glossary terms inside `text` with hover-highlight <Term> spans. */
export function highlightTerms(text: string): ReactNode[] {
  const out: ReactNode[] = [];
  let last = 0;
  let m: RegExpExecArray | null;
  PATTERN.lastIndex = 0;
  const seen = new Set<string>();
  while ((m = PATTERN.exec(text))) {
    if (m.index > last) out.push(text.slice(last, m.index));
    const match = m[0];
    const key = KEYS.find((k) => k.toLowerCase() === match.toLowerCase())!;
    const tip = GLOSSARY[key];
    if (seen.has(key.toLowerCase())) {
      out.push(match);
    } else {
      seen.add(key.toLowerCase());
      out.push(
        <Term key={`${m.index}-${match}`} tip={tip}>
          {match}
        </Term>
      );
    }
    last = m.index + match.length;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}
