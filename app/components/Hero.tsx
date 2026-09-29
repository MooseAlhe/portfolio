"use client";

import { useEffect, useState } from "react";
import { heroLines, profile, statusCard } from "../lib/data";
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

  const statusEntries: [string, string | string[]][] = [
    ["status", statusCard.status],
    ["current", statusCard.current],
    ["experience", statusCard.experience],
    ["location", statusCard.location],
    ["localTime", now],
    ["stack", statusCard.stack],
    ["openTo", statusCard.openTo],
  ];
  const keyWidth = Math.max(...statusEntries.map(([k]) => k.length));

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
            </p>
          </div>

          <p className={`${styles.tagline} highlight-scope`}>
            {highlightTerms(profile.tagline)}
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
              <span className={styles.statusLine}>{"{"}</span>
              {statusEntries.map(([key, value], i) => (
                <span
                  key={key}
                  className={styles.statusEntry}
                  style={{ "--indent": `${keyWidth + 6}ch` } as React.CSSProperties}
                >
                  {"  "}
                  <span className="text-amber">&quot;{key}&quot;</span>
                  {":".padEnd(keyWidth - key.length + 2)}
                  {Array.isArray(value) ? (
                    <>
                      [
                      {value.map((v, j) => (
                        <span key={v}>
                          {j > 0 && ", "}
                          <span className="text-accent">&quot;{v}&quot;</span>
                        </span>
                      ))}
                      ]
                    </>
                  ) : (
                    <span
                      className="text-accent"
                      suppressHydrationWarning={key === "experience"}
                    >
                      &quot;{value}&quot;
                    </span>
                  )}
                  {i < statusEntries.length - 1 && ","}
                </span>
              ))}
              <span className={styles.statusLine}>{"}"}</span>
            </pre>
          </div>
        </aside>
      </div>
    </section>
  );
}
