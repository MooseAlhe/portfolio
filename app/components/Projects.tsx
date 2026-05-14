"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { projects } from "../lib/data";
import SectionHeader from "./SectionHeader";
import styles from "./Projects.module.css";

export default function Projects() {
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const updateArrows = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const maxScroll = el.scrollWidth - el.clientWidth;
    setCanPrev(el.scrollLeft > 4);
    setCanNext(el.scrollLeft < maxScroll - 4);
  }, []);

  useEffect(() => {
    updateArrows();
    const el = scrollerRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateArrows, { passive: true });
    window.addEventListener("resize", updateArrows);
    return () => {
      el.removeEventListener("scroll", updateArrows);
      window.removeEventListener("resize", updateArrows);
    };
  }, [updateArrows]);

  const scrollBy = (dir: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>(`.${styles.card}`);
    const step = card ? card.offsetWidth + 22 : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  return (
    <section id="projects" className="section" aria-labelledby="projects-h">
      <div className="container">
        <h2 id="projects-h" className="sr-only">
          Projects
        </h2>
        <SectionHeader num="03" title="Projects" command="ls ~/projects" />

        <div className={styles.carousel}>
          <button
            type="button"
            className={`${styles.arrow} ${styles.arrowLeft}`}
            onClick={() => scrollBy(-1)}
            disabled={!canPrev}
            aria-label="Scroll to previous projects"
          >
            ←
          </button>

          <div className={styles.scroller} ref={scrollerRef}>
            {projects.map((p) => (
              <Link
                key={p.slug}
                href={`/projects/${p.slug}`}
                className={styles.card}
                aria-label={`Open ${p.name} project details`}
              >
                <header className={styles.cardHeader}>
                  <span className={styles.folder} aria-hidden="true">▢</span>
                  <div className={styles.titles}>
                    <h3 className={styles.name}>{p.name}</h3>
                    <p className={styles.tagline}>{p.tagline}</p>
                  </div>
                  <span className={styles.period}>{p.period}</span>
                </header>


                <p className={styles.summary}>{p.summary}</p>

                <footer className={styles.cardFooter}>
                  <div className={styles.tags}>
                    {p.stack.slice(0, 5).map((s) => (
                      <span key={s} className="tag">{s}</span>
                    ))}
                    {p.stack.length > 5 && (
                      <span className="tag">+{p.stack.length - 5}</span>
                    )}
                  </div>
                  <span className={styles.openArrow} aria-hidden="true">
                    open &nbsp;→
                  </span>
                </footer>
              </Link>
            ))}
          </div>

          <button
            type="button"
            className={`${styles.arrow} ${styles.arrowRight}`}
            onClick={() => scrollBy(1)}
            disabled={!canNext}
            aria-label="Scroll to next projects"
          >
            →
          </button>
        </div>
      </div>
    </section>
  );
}
