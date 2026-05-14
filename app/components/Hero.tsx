"use client";

import { useEffect, useState } from "react";
import { profile } from "../lib/data";
import Typewriter from "./Typewriter";
import Term from "./Term";
import styles from "./Hero.module.css";

export default function Hero() {
  const [bootDone, setBootDone] = useState(false);
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
              lines={[
                "> init portfolio.exe",
                "> fetching profile…",
                "> ready.",
              ]}
              speed={28}
              linePause={220}
              startDelay={150}
              caret={false}
              onDone={() => setBootDone(true)}
            />
          </div>

          <p
            className={`${styles.greeting} ${bootDone ? styles.greetingIn : ""}`}
          >
            <span className="text-accent">~</span>{" "}
            <span className="text-muted">$ whoami</span>
          </p>

          <h1 className={`${styles.name} ${bootDone ? styles.nameIn : ""}`}>
            <span className={styles.nameMain}>Mustafa</span>{" "}
            <span className={styles.nameAccent}>Alhelawe</span>
            <span className={styles.nameDot}>.</span>
          </h1>

          <div className={`${styles.role} ${bootDone ? styles.roleIn : ""}`}>
            <p className={styles.roleLine}>
              <span className="text-muted">&gt; </span>
              <span>{profile.role}</span>
              <span className="text-dim"> — full-stack, building distributed systems.</span>
            </p>
            <p className={styles.roleLine}>
              <span className="text-muted">&gt; </span>
              <span>Hobbyist Unity Developer</span>
              <span className="text-dim"> — gameplay systems, multiplayer, ML-Agents.</span>
            </p>
            <p className={styles.roleLine}>
              <span className="text-muted">&gt; </span>
              <span>Tinkerer &amp; Lifelong Learner</span>
              <span className="text-dim"> — RL agents, finance tools, side-quests at 2am.</span>
            </p>
          </div>

          <p
            className={`${styles.tagline} ${bootDone ? styles.taglineIn : ""}`}
          >
            Currently at <strong>Bank of America Merrill Lynch</strong>, working
            across the stack on a{" "}
            <Term tip="System that matches & confirms institutional trades">
              trade-confirmation platform
            </Term>{" "}
            that processes millions of daily institutional transactions. On the
            side, I prototype{" "}
            <Term tip="Plaid-backed personal finance app w/ LLM tooling">
              AI-driven finance tools
            </Term>{" "}
            and{" "}
            <Term tip="PPO agents trained in a custom Unity ML-Agents env">
              reinforcement-learning agents
            </Term>
            .
          </p>

          <div className={`${styles.ctas} ${bootDone ? styles.ctasIn : ""}`}>
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

        <aside
          className={`${styles.statusCard} ${bootDone ? styles.statusIn : ""}`}
          aria-label="System status"
        >
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
  `}<span className="text-amber">"status"</span>{`:    `}<span className="text-accent">"online"</span>{`,
  `}<span className="text-amber">"role"</span>{`:      `}<span className="text-accent">"{profile.role}"</span>{`,
  `}<span className="text-amber">"location"</span>{`:  `}<span className="text-accent">"{profile.location}"</span>{`,
  `}<span className="text-amber">"timezone"</span>{`:  `}<span className="text-accent">"America/New_York"</span>{`,
  `}<span className="text-amber">"localTime"</span>{`: `}<span className="text-accent">"{now}"</span>{`,
  `}<span className="text-amber">"focus"</span>{`:     `}<span className="text-accent">"distributed systems"</span>{`,
  `}<span className="text-amber">"openTo"</span>{`:    [`}<span className="text-accent">"collaboration"</span>{`, `}<span className="text-accent">"new roles"</span>{`]
}`}
            </pre>
          </div>
        </aside>
      </div>
    </section>
  );
}
