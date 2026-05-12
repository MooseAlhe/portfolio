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
            <ScrollReveal key={p.name} className={styles.card} delay={i * 100}>
              <header className={styles.cardHeader}>
                <span className={styles.folder} aria-hidden="true">
                  ▢
                </span>
                <div className={styles.titles}>
                  <h3 className={styles.name}>{p.name}</h3>
                  <p className={styles.tagline}>{p.tagline}</p>
                </div>
                <span className={styles.period}>{p.period}</span>
              </header>

              <p className={styles.desc}>{p.description}</p>

              <ul className={styles.highlights}>
                {p.highlights.slice(0, 3).map((h, idx) => (
                  <li key={idx}>
                    <span aria-hidden="true">›</span> {h}
                  </li>
                ))}
              </ul>

              <footer className={styles.cardFooter}>
                <div className={styles.tags}>
                  {p.stack.map((s) => (
                    <span key={s} className="tag">
                      {s}
                    </span>
                  ))}
                </div>
                <div className={styles.links}>
                  {p.links.github && (
                    <a
                      href={p.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${p.name} on GitHub`}
                    >
                      code →
                    </a>
                  )}
                  {p.links.demo && (
                    <a
                      href={p.links.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${p.name} live demo`}
                    >
                      live →
                    </a>
                  )}
                </div>
              </footer>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
