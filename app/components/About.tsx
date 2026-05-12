import { aboutBio, skills, education } from "../lib/data";
import ScrollReveal from "./ScrollReveal";
import SectionHeader from "./SectionHeader";
import styles from "./About.module.css";

export default function About() {
  return (
    <section id="about" className="section" aria-labelledby="about-h">
      <div className="container">
        <h2 id="about-h" className="sr-only">
          About
        </h2>
        <SectionHeader num="01" title="About" command="cat about.md" />

        <div className={styles.grid}>
          <ScrollReveal className={styles.bio}>
            {aboutBio.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
            <p className={styles.edu}>
              <span className="text-muted">// education</span>
              <br />
              <strong>{education.school}</strong>
              <br />
              {education.degree} · {education.year}
            </p>
          </ScrollReveal>

          <ScrollReveal className={styles.skills} delay={120}>
            <div className={styles.skillsHeader}>
              <span className="text-amber">~/skills</span>
              <span className="text-dim">/</span>
            </div>
            <ul className={styles.skillList}>
              {skills.map((g) => (
                <li key={g.label} className={styles.skillGroup}>
                  <div className={styles.skillLabel}>
                    <span className="text-accent">▸</span> {g.label}
                  </div>
                  <div className={styles.skillItems}>
                    {g.items.map((s) => (
                      <span key={s} className="tag">
                        {s}
                      </span>
                    ))}
                  </div>
                </li>
              ))}
            </ul>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
