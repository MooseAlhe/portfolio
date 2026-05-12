import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Footer from "@/app/components/Footer";
import Nav from "@/app/components/Nav";
import ScrollProgress from "@/app/components/ScrollProgress";
import ScrollReveal from "@/app/components/ScrollReveal";
import { projects } from "@/app/lib/data";
import styles from "./project.module.css";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return projects.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: Params }): Metadata {
  const project = projects.find((p) => p.slug === params.slug);
  if (!project) return { title: "Project not found" };
  return {
    title: project.name,
    description: project.summary,
  };
}

export default function ProjectPage({ params }: { params: Params }) {
  const project = projects.find((p) => p.slug === params.slug);
  if (!project) notFound();

  return (
    <>
      <ScrollProgress />
      <Nav />
      <main id="main" className={styles.page}>
        <article className="container">
          <Link href="/#projects" className={styles.back}>
            <span aria-hidden="true">←</span> back to projects
          </Link>

          <header className={styles.header}>
            <p className={styles.crumbs}>
              <span className="text-muted">~/projects/</span>
              <span className="text-accent">{project.slug}</span>
            </p>
            <h1 className={styles.title}>{project.name}</h1>
            <p className={styles.tagline}>{project.tagline}</p>

            <div className={styles.meta}>
              <span className={styles.period}>{project.period}</span>
              <span className="text-dim">·</span>
              <span className={`${styles.status} ${styles[`status_${project.status}`]}`}>
                <span className={styles.statusDot} aria-hidden="true" />
                {project.status}
              </span>
            </div>

            <div className={styles.stack}>
              {project.stack.map((s) => (
                <span key={s} className="tag">{s}</span>
              ))}
            </div>

            {(project.links.github || project.links.demo) && (
              <div className={styles.linkRow}>
                {project.links.github && (
                  <a
                    href={project.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.linkBtn}
                  >
                    <span aria-hidden="true">{"</>"}</span> code
                  </a>
                )}
                {project.links.demo && (
                  <a
                    href={project.links.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.linkBtn}
                  >
                    <span aria-hidden="true">↗</span> live demo
                  </a>
                )}
              </div>
            )}
          </header>

          {project.cover && (
            <ScrollReveal className={styles.cover}>
              <MediaBlock m={project.cover} priority />
            </ScrollReveal>
          )}

          <section className={styles.body}>
            {project.overview.length > 0 && (
              <ScrollReveal className={styles.section}>
                <h2 className={styles.h2}>
                  <span className="text-accent">$</span> overview
                </h2>
                <div className={styles.prose}>
                  {project.overview.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
              </ScrollReveal>
            )}

            {project.highlights.length > 0 && (
              <ScrollReveal className={styles.section} delay={80}>
                <h2 className={styles.h2}>
                  <span className="text-accent">$</span> highlights
                </h2>
                <ul className={styles.highlights}>
                  {project.highlights.map((h, i) => (
                    <li key={i}>
                      <span className={styles.bulletArrow} aria-hidden="true">▸</span>
                      {h}
                    </li>
                  ))}
                </ul>
              </ScrollReveal>
            )}

            {project.gallery && project.gallery.length > 0 && (
              <ScrollReveal className={styles.section} delay={120}>
                <h2 className={styles.h2}>
                  <span className="text-accent">$</span> gallery
                </h2>
                <div className={styles.gallery}>
                  {project.gallery.map((m, i) => (
                    <MediaBlock key={i} m={m} />
                  ))}
                </div>
              </ScrollReveal>
            )}
          </section>

          <nav className={styles.foot} aria-label="Project navigation">
            <Link href="/#projects" className={styles.back}>
              <span aria-hidden="true">←</span> back to projects
            </Link>
          </nav>
        </article>
      </main>
      <Footer />
    </>
  );
}

/** Renders an image or video uniformly inside the page layout. */
function MediaBlock({ m, priority = false }: { m: { src: string; alt: string; type?: "image" | "video"; poster?: string }; priority?: boolean }) {
  if (m.type === "video") {
    return (
      <video
        className={styles.media}
        src={m.src}
        poster={m.poster}
        controls
        playsInline
        preload={priority ? "metadata" : "none"}
        aria-label={m.alt}
      />
    );
  }
  // Use <img> intentionally — keeps the build dependency-free.
  // eslint-disable-next-line @next/next/no-img-element
  return <img className={styles.media} src={m.src} alt={m.alt} loading={priority ? "eager" : "lazy"} />;
}
