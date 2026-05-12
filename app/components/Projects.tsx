import Link from "next/link";
import { projects } from "../lib/data";
import ScrollReveal from "./ScrollReveal";
import SectionHeader from "./SectionHeader";
import styles from "./Projects.module.css";

export default function Projects() {
  return (
    <section id="projects" className="section" aria-labelledby="projects-h">
      <div className="container">
        <h2 id="projects-h" className="sr-only">
          Projects
        </h2>
        <SectionHeader num="03" title="Projects" command="ls ~/projects" />

        <div className={styles.grid}>
          {projects.map((p, i) => (
            <ScrollReveal key={p.slug} delay={i * 80}>
              <Link
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
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
