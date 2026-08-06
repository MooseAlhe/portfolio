"use client";

import { useEffect, useState } from "react";
import { heroLines, profile } from "../lib/data";
import Typewriter from "./Typewriter";
import { highlightTerms } from "../lib/terms";
import styles from "./Hero.module.css";

export default function Hero() {
  const [now, setNow] = useState<string>("");

  useEffect(() => {
    const fmt = () => {
      const d = new Date();
      const time = d.toLocaleTimeString("en-US", {
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
      setNow(time);
    };
    fmt();
    const id = window.setInterval(fmt, 1000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <section id="top" className={styles.hero} aria-label="Introduction">
      <div className={`container ${styles.grid}`}>
        <div className={styles.copy}>
          <div className={styles.boot}>
            <Typewriter
              lines={heroLines.map((l) => `> ${l}`)}
              speed={28}
              linePause={220}
              startDelay={150}
              caret={false}
            />
          </div>

          <p className={styles.greeting}>
            <span className="text-accent">~</span>{" "}
            <span className="text-muted">$ whoami</span>
          </p>

          <h1 className={styles.name}>
            <span className={styles.nameMain}>Mustafa</span>{" "}
            <span className={styles.nameAccent}>Alhelawe</span>
            <span className={styles.nameDot}>.</span>
          </h1>

          <div className={styles.role}>
            <p className={styles.roleLine}>
              <span className="text-muted">&gt; </span>
              <span>{profile.role}</span>
              <span className="text-dim"> // full-stack, from Scala pipelines to React UIs.</span>
            </p>
            <p className={styles.roleLine}>
              <span className="text-muted">&gt; </span>
              <span>Hobbyist Unity Developer</span>
              <span className="text-dim"> // gameplay systems, multiplayer, ML-Agents.</span>
            </p>
            <p className={styles.roleLine}>
              <span className="text-muted">&gt; </span>
              <span>Tinkerer &amp; Lifelong Learner</span>
              <span className="text-dim"> // RL agents, finance tools, side-quests at 2am.</span>
            </p>
          </div>

          <p className={`${styles.tagline} highlight-scope`}>
            Currently at <strong>Bank of America Merrill Lynch</strong>,{" "}
            {highlightTerms(
              "working across the stack on a trade-confirmation platform that processes millions of daily institutional transactions. On the side, I prototype AI-driven finance tools and reinforcement-learning agents."
            )}
          </p>

          <div className={styles.ctas}>
            <a href="#projects" className={styles.ctaPrimary}>
              <span className="text-accent">$</span> view projects
            </a>
            <a href="#terminal" className={styles.ctaGhost}>
              try the terminal →
            </a>
          </div>

          <p className={styles.scrollHint} aria-hidden="true">
            <span className={styles.scrollLine} /> scroll
          </p>
        </div>

        <aside className={styles.statusCard} aria-label="System status">
          <header className={styles.statusHead}>
            <span className={styles.dot} data-c="r" />
            <span className={styles.dot} data-c="y" />
            <span className={styles.dot} data-c="g" />
            <span className={styles.statusTitle}>
              ~/{profile.handle}/status.json
            </span>
          </header>
          <div className={styles.statusBody}>
            <pre>
{`{
  `}<span className="text-amber">&quot;status&quot;</span>{`:    `}<span className="text-accent">&quot;online&quot;</span>{`,
  `}<span className="text-amber">&quot;role&quot;</span>{`:      `}<span className="text-accent">&quot;{profile.role}&quot;</span>{`,
  `}<span className="text-amber">&quot;location&quot;</span>{`:  `}<span className="text-accent">&quot;{profile.location}&quot;</span>{`,
  `}<span className="text-amber">&quot;timezone&quot;</span>{`:  `}<span className="text-accent">&quot;America/New_York&quot;</span>{`,
  `}<span className="text-amber">&quot;localTime&quot;</span>{`: `}<span className="text-accent">&quot;{now}&quot;</span>{`,
  `}<span className="text-amber">&quot;focus&quot;</span>{`:     `}<span className="text-accent">&quot;distributed systems&quot;</span>{`,
  `}<span className="text-amber">&quot;openTo&quot;</span>{`:    [`}<span className="text-accent">&quot;collaboration&quot;</span>{`, `}<span className="text-accent">&quot;new roles&quot;</span>{`]
}`}
            </pre>
          </div>
        </aside>
      </div>
    </section>
  );
}
