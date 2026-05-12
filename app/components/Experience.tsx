import { experience } from "../lib/data";
import ScrollReveal from "./ScrollReveal";
import SectionHeader from "./SectionHeader";
import styles from "./Experience.module.css";

export default function Experience() {
  return (
    <section id="experience" className="section" aria-labelledby="exp-h">
      <div className="container">
        <h2 id="exp-h" className="sr-only">
          Experience
        </h2>
        <SectionHeader
          num="02"
          title="Experience"
          command="git log --oneline"
        />

        <ol className={styles.timeline}>
          {experience.map((job, i) => (
            <ScrollReveal
              key={`${job.company}-${i}`}
              as="li"
              className={styles.item}
              delay={i * 80}
            >
              <div className={styles.marker} aria-hidden="true">
                <span className={styles.markerDot} />
              </div>

              <article className={styles.card}>
                <header className={styles.cardHeader}>
                  <div>
                    <h3 className={styles.role}>
                      {job.role}{" "}
                      <span className={styles.at}>@</span>{" "}
                      <span className={styles.company}>{job.company}</span>
                    </h3>
                    <p className={styles.meta}>
                      {job.start} — {job.end} · {job.location}
                    </p>
                  </div>
                  <span className={styles.commitHash} aria-hidden="true">
                    {makeFakeHash(job.company + job.start)}
                  </span>
                </header>

                <ul className={styles.bullets}>
                  {job.bullets.map((b, idx) => (
                    <li key={idx}>
                      <span className={styles.bulletArrow} aria-hidden="true">
                        ▸
                      </span>
                      {b}
                    </li>
                  ))}
                </ul>
              </article>
            </ScrollReveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

/** Deterministic short "commit hash" purely for visual flair. */
function makeFakeHash(seed: string): string {
  let h = 0;
  for (let i = 0; i < seed.length; i++) {
    h = (h << 5) - h + seed.charCodeAt(i);
    h |= 0;
  }
  return (Math.abs(h) >>> 0).toString(16).slice(0, 7).padStart(7, "0");
}
