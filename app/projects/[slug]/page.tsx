import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import FeaturePills from "@/app/components/FeaturePills";
import Footer from "@/app/components/Footer";
import Nav from "@/app/components/Nav";
import ProjectMedia from "@/app/components/ProjectMedia";
import ScrollProgress from "@/app/components/ScrollProgress";
import ScrollReveal from "@/app/components/ScrollReveal";
import SplitsDash from "@/app/components/SplitsDash";
import { profile, projects, type Project } from "@/app/lib/data";
import { highlightTerms } from "@/app/lib/terms";
import styles from "./project.module.css";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return projects.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: Params }): Metadata {
  const project = projects.find((p) => p.slug === params.slug);
  if (!project) return { title: "Project not found" };
  const description = project.metaDescription ?? project.summary;
  return {
    title: project.name,
    description,
    ...(project.slug === "splits" ? {
      openGraph: { title: "Splits · Mustafa Alhelawe", description },
      twitter: { title: "Splits · Mustafa Alhelawe", description },
    } : {}),
  };
}

export default function ProjectPage({ params }: { params: Params }) {
  const project = projects.find((p) => p.slug === params.slug);
  if (!project) notFound();

  const isFeatured = Boolean(project.featuredCopy);

  return (
    <>
      <ScrollProgress />
      <Nav />
      <main id="main" className={styles.page}>
        <article className="container">
          <Link href="/#projects" className={styles.back}>
            <span aria-hidden="true">←</span> back to projects
          </Link>

          {isFeatured ? (
            <FeaturedHero project={project} />
          ) : (
            <DefaultHeader project={project} />
          )}

          {isFeatured ? (
            <FeaturedBody project={project} />
          ) : (
            <DefaultBody project={project} />
          )}

          {/* Splits already links back from its closing card. */}
          {!isFeatured && (
            <nav className={styles.foot} aria-label="Project navigation">
              <Link href="/#projects" className={styles.back}>
                <span aria-hidden="true">←</span> back to projects
              </Link>
            </nav>
          )}
        </article>
      </main>
      <Footer />
    </>
  );
}

/* ============================================================
   Default (non-featured) project rendering
   ============================================================ */

function DefaultHeader({ project }: { project: Project }) {
  const { media } = project;
  return (
    <header className={styles.featHero}>
      <p className={styles.featCrumbs}>
        <span className="text-muted">~/projects/</span>
        <span className="text-accent">{project.slug}</span>
      </p>

      <div className={`${styles.featGrid} ${media ? "" : styles.featGridSolo}`}>
        <div className={styles.featLeft}>
          <h1 className={styles.featTitle}>{project.name}</h1>
          <p className={`${styles.tagline} highlight-scope`}>
            {highlightTerms(project.tagline)}
          </p>

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
        </div>

        {media && (
          <div className={styles.featRight}>
            <ProjectMedia media={media} />
          </div>
        )}
      </div>
    </header>
  );
}

function DefaultBody({ project }: { project: Project }) {
  return (
    <section className={styles.body}>
      {project.overview.length > 0 && (
        <ScrollReveal className={styles.section}>
          <h2 className={styles.h2}>
            <span className="text-accent">$</span> overview
          </h2>
          <div className={styles.prose}>
            {project.overview.map((p, i) => (
              <p key={i} className="highlight-scope">
                {highlightTerms(p)}
              </p>
            ))}
          </div>
        </ScrollReveal>
      )}

      {project.highlights.length > 0 && (
        <ScrollReveal className={styles.section} delay={80}>
          <h2 className={styles.h2}>
            <span className="text-accent">$</span> implementation notes
          </h2>
          <ul className={styles.highlights}>
            {project.highlights.map((h, i) => (
              <li key={i} className="highlight-scope">
                <span className={styles.bulletArrow} aria-hidden="true">▸</span>
                <span>{highlightTerms(h)}</span>
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
  );
}

/* ============================================================
   Featured project rendering (Splits)
   ============================================================ */

const HERO_STATS = [
  { value: "Web", label: "Next.js client" },
  { value: "Mobile", label: "React Native / Expo" },
  { value: "Demo", label: "sandbox data" },
];

const HOW_IT_WORKS = [
  {
    step: "01",
    title: "Import sandbox transactions",
    body: "The Plaid integration imports simulated bank transactions. That gives the recurring-bill logic transaction histories to work with without using real financial data.",
    chip: "Plaid · sandbox transactions",
  },
  {
    step: "02",
    title: "Set a split rule",
    body: "A rule says who shares a bill and how to divide it—for example, splitting rent equally with a roommate. Splits suggests rules for recurring bills and applies the rules you’ve set up when matching transactions arrive.",
    chip: "Example · Rent · 50/50",
  },
  {
    step: "03",
    title: "Track the balance",
    body: "Each shared expense adds entries to the ledger and updates who owes what. Splits tracks those balances; it does not hold or transfer money.",
    chip: "Example · $42.18 owed",
  },
];

const FEATURES = [
  {
    glyph: "↻",
    title: "Recognizing recurring bills",
    body: "Merchant names and amounts aren't always identical from month to month. I normalize the names, group amounts within a 15% tolerance, and look for recurrence across at least two months before suggesting a split rule.",
  },
  {
    glyph: "⚡",
    title: "Sharing the calculations",
    body: "The expense math had grown into three implementations. I brought it into one TypeScript package and added tests for splits, rounding, balances, and debt simplification.",
  },
  {
    glyph: "⌁",
    title: "Coordinating sync jobs",
    body: "I added a lock for each bank connection so two sync jobs do not process it at the same time. Each sync retrieves changes since the last saved position.",
  },
  {
    glyph: "▣",
    title: "When transactions change mid-sync",
    body: "Plaid returns transactions a page at a time. Sometimes the data changes before all the pages have been fetched. I added recovery that restarts retrieval when that happens.",
  },
  {
    glyph: "◇",
    title: "Handling retries",
    body: "A sync can fail after it has already added bills. Retrying it shouldn’t add them again. I write the bill entries before saving the sync’s progress, and use database-enforced idempotency keys to prevent duplicate entries on a retry.",
  },
  {
    glyph: "✶",
    title: "Using one backend",
    body: "I moved the mobile backend into Next.js API routes. Web and mobile now share Supabase authentication and PostgreSQL storage, removing a separate backend deployment.",
  },
];

function FeaturedHero({ project }: { project: Project }) {
  const copy = project.featuredCopy!;
  const stackMax = 5;
  return (
    <section className={styles.featHero} aria-labelledby="feat-hero-title">
      <p className={styles.featCrumbs}>
        <span className="text-muted">~/projects/</span>
        <span className="text-accent">{project.slug}</span>
      </p>

      <div className={styles.featGrid}>
        <ScrollReveal className={styles.featLeft}>
          <p className={styles.featEyebrow}>
            <span className={styles.featEyebrowDot} aria-hidden="true" />
            {copy.eyebrow}
          </p>

          <div className={styles.featTitleRow}>
            {project.cover?.kind === "logo" && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                className={styles.featTitleLogo}
                src={project.cover.src}
                alt=""
                aria-hidden="true"
              />
            )}
            <h1 id="feat-hero-title" className={styles.featTitle}>
              {project.name}
            </h1>
          </div>

          <p className={styles.featHeadline}>{copy.headline}</p>

          <p className={styles.featSummary}>{project.summary}</p>

          <FeaturePills items={copy.featurePills} />

          <div className={styles.featCtaRow}>
            {project.links.demo && (
              <a
                href={project.links.demo}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.featCtaPrimary}
              >
                <span className={styles.featCtaPrimaryLabel}>
                  Try the demo
                </span>
                <span className={styles.featCtaArrow} aria-hidden="true">↗</span>
              </a>
            )}
            <a href="#feat-h" className={styles.featCtaSecondary}>
              Explore the implementation <span aria-hidden="true">↓</span>
            </a>
            {project.links.github && (
              <a
                href={project.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.featCtaSecondary}
              >
                <span aria-hidden="true">{"</>"}</span> view code
              </a>
            )}
          </div>

          <dl className={styles.featStats} aria-label="Project highlights">
            {HERO_STATS.map((s) => (
              <div key={s.label} className={styles.featStat}>
                <dt className={styles.featStatLabel}>{s.label}</dt>
                <dd className={styles.featStatValue}>{s.value}</dd>
              </div>
            ))}
          </dl>

          <div className={styles.featMetaRow}>
            <span className={styles.period}>{project.period}</span>
            <span className="text-dim">·</span>
            <span className={`${styles.status} ${styles[`status_${project.status}`]}`}>
              <span className={styles.statusDot} aria-hidden="true" />
              {project.status}
            </span>
            <span className={styles.featStackInline}>
              {project.stack.slice(0, stackMax).join(" · ")}
              {project.stack.length > stackMax && ` · +${project.stack.length - stackMax}`}
            </span>
          </div>
        </ScrollReveal>

        <ScrollReveal className={styles.featRight} delay={120}>
          <SplitsDash />
        </ScrollReveal>
      </div>
    </section>
  );
}

function FeaturedBody({ project }: { project: Project }) {
  return (
    <>
      <WhyBuilt />
      <HowItWorks />
      <DemoExperience demoUrl={project.links.demo} />
      <FeatureGrid />
      <FinalCta demoUrl={project.links.demo} />
    </>
  );
}

function HowItWorks() {
  return (
    <section className={styles.howSec} aria-labelledby="how-h">
      <ScrollReveal>
        <p className={styles.sectionKicker}>
          <span className="text-accent">$</span> how it works
        </p>
        <h2 id="how-h" className={styles.sectionTitle}>
          From transactions to shared bills.
        </h2>
        <p className={styles.sectionLede}>
          I built web and mobile clients around three connected pieces:
          importing transactions, applying split rules, and keeping a running balance.
        </p>
      </ScrollReveal>

      <ol className={styles.howGrid}>
        {HOW_IT_WORKS.map((step, i) => (
          <ScrollReveal key={step.step} as="li" delay={i * 80}>
            <article className={styles.howCard}>
              <header className={styles.howCardHead}>
                <span className={styles.howStep}>{step.step}</span>
                <h3 className={styles.howTitle}>{step.title}</h3>
              </header>
              <p className={styles.howBody}>{step.body}</p>
              <span className={styles.howChip} aria-hidden="true">
                <span className={styles.howChipDot} />
                <span className={styles.howChipText}>{step.chip}</span>
              </span>
            </article>
          </ScrollReveal>
        ))}
      </ol>
    </section>
  );
}

function DemoExperience({ demoUrl }: { demoUrl?: string }) {
  return (
    <section className={styles.howSec} aria-labelledby="demo-h">
      <ScrollReveal>
        <p className={styles.sectionKicker}>
          <span className="text-accent">$</span> try it
        </p>
        <h2 id="demo-h" className={styles.sectionTitle}>
          Explore the web demo.
        </h2>
        <p className={styles.sectionLede}>
          Try shared expenses, split rules, and balance tracking in the web app
          using demo data. Bank-data examples use Plaid&apos;s sandbox; no real
          money moves through Splits. The demo is for exploring the project,
          not managing real finances.
        </p>
        <p className={styles.sectionLede}>
          The React Native/Expo app is part of the same implementation.
          You can explore the web version directly here.
        </p>
        {demoUrl && (
          <a href={demoUrl} target="_blank" rel="noopener noreferrer" className={styles.featCtaPrimary}>
            Try the demo <span aria-hidden="true">↗</span>
          </a>
        )}
      </ScrollReveal>
    </section>
  );
}

function FeatureGrid() {
  return (
    <section className={styles.featSec} aria-labelledby="feat-h">
      <ScrollReveal>
        <p className={styles.sectionKicker}>
          <span className="text-accent">$</span> under the hood
        </p>
        <h2 id="feat-h" className={styles.sectionTitle}>
          The parts that took more thought.
        </h2>
        <p className={styles.sectionLede}>
          The basic idea was simple. Building it meant dealing with changing transaction data, syncs that needed to run again, and three versions of the expense math.
        </p>
      </ScrollReveal>

      <ul className={styles.featGridList}>
        {FEATURES.map((f, i) => (
          <ScrollReveal key={f.title} as="li" delay={i * 60}>
            <article className={styles.featCardItem}>
              <span className={styles.featCardGlyph} aria-hidden="true">
                {f.glyph}
              </span>
              <h3 className={styles.featCardTitle}>{f.title}</h3>
              <p className={styles.featCardBody}>{f.body}</p>
            </article>
          </ScrollReveal>
        ))}
      </ul>
    </section>
  );
}

function WhyBuilt() {
  return (
    <ScrollReveal>
      <section className={styles.whySec} aria-labelledby="why-h">
        <p className={styles.sectionKicker}>
          <span className="text-accent">$</span> why I built this
        </p>
        <h2 id="why-h" className={styles.sectionTitle}>
          The spreadsheet that wanted to be an app.
        </h2>
        <blockquote className={styles.whyQuote}>
          <p>
            Rent and utilities come around every month, but keeping track of
            who paid what can still turn into the same round of receipts and
            messages. I wanted a way to keep those shared bills together and
            reuse the split rules.
          </p>
          <p>
            The idea was simple enough: recognize a recurring bill, apply the
            agreed split, and keep a running balance. Building it meant dealing
            with the less obvious parts too, like rounding and what happens
            when a transaction sync runs twice.
          </p>
          <footer className={styles.whyFooter}>
            <span className={styles.whySig} aria-hidden="true">~</span>
            <span>independent project · 2026</span>
          </footer>
        </blockquote>
      </section>
    </ScrollReveal>
  );
}

function FinalCta({ demoUrl }: { demoUrl?: string }) {
  return (
    <ScrollReveal>
      <section className={styles.ctaSec} aria-labelledby="cta-h">
        <div className={styles.ctaCard}>
          <div className={styles.ctaCopy}>
            <p className={styles.ctaEyebrow}>
              <span className={styles.featEyebrowDot} aria-hidden="true" />
              Lessons from building Splits
            </p>
            <h2 id="cta-h" className={styles.ctaTitle}>
              What I learned.
            </h2>
            <p className={styles.ctaSub}>
              Getting the expense math right was only part of the work.
              It also had to stay consistent across clients and across syncs
              that overlap, change halfway through, or need to run again.
            </p>
            <p className={styles.ctaSub}>
              Once those workflows were complete, I stopped expanding the
              feature set. Keeping the web and mobile apps on a shared backend
              gave me fewer services to run and maintain, and room to move on
              to other work.
            </p>
          </div>

          <div className={styles.ctaActions}>
            {demoUrl && (
              <a
                href={demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.featCtaPrimary}
              >
                <span className={styles.featCtaPrimaryLabel}>
                  Try the demo
                </span>
                <span className={styles.featCtaArrow} aria-hidden="true">↗</span>
              </a>
            )}
            <a
              href={`mailto:${profile.email}?subject=About%20Splits`}
              className={styles.featCtaSecondary}
            >
              <span aria-hidden="true">✉</span> Ask about the project
            </a>
            <Link href="/#projects" className={styles.featCtaSecondary}>
              <span aria-hidden="true">←</span> back to projects
            </Link>
          </div>
        </div>
      </section>
    </ScrollReveal>
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
