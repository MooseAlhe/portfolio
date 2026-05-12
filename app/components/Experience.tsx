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

        <p className={styles.subhead}>
          A snapshot of where I&apos;ve worked and what the day-to-day actually
          looked like.{" "}
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.resumeLink}
          >
            full résumé →
          </a>
        </p>

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

                <p className={styles.blurb}>{job.blurb}</p>

                {job.scope.length > 0 && (
                  <div
                    className={styles.chipRow}
                    aria-label={`Scope at ${job.company}`}
                  >
                    <span className={styles.chipLabel}>scope</span>
                    <div className={styles.chips}>
                      {job.scope.map((s) => (
                        <span key={s} className={styles.scopeChip}>
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {job.stack.length > 0 && (
                  <div
                    className={styles.chipRow}
                    aria-label={`Stack at ${job.company}`}
                  >
                    <span className={styles.chipLabel}>stack</span>
                    <div className={styles.chips}>
                      {job.stack.map((s) => (
                        <span key={s} className="tag">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
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
