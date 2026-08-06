import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Footer from "@/app/components/Footer";
import Nav from "@/app/components/Nav";
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
  return {
    title: project.name,
    description: project.summary,
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

          {project.cover && project.cover.kind !== "logo" && !isFeatured && (
            <ScrollReveal className={styles.cover}>
              <MediaBlock m={project.cover} priority />
            </ScrollReveal>
          )}

          {isFeatured ? (
            <FeaturedBody project={project} />
          ) : (
            <DefaultBody project={project} />
          )}

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

/* ============================================================
   Default (non-featured) project rendering
   ============================================================ */

function DefaultHeader({ project }: { project: Project }) {
  const hasLogo = project.cover?.kind === "logo";
  return (
    <header className={`${styles.header} ${hasLogo ? styles.headerWithLogo : ""}`}>
      <div className={styles.headerMain}>
        <p className={styles.crumbs}>
          <span className="text-muted">~/projects/</span>
          <span className="text-accent">{project.slug}</span>
        </p>
        <h1 className={styles.title}>{project.name}</h1>
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

      {hasLogo && project.cover && (
        <div className={styles.headerLogo}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={project.cover.src} alt={project.cover.alt} />
        </div>
      )}
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
            <span className="text-accent">$</span> highlights
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
  { value: "0%", label: "of your money handled" },
  { value: "Auto", label: "recurring detection" },
  { value: "iOS + Android", label: "in active development" },
];

const HOW_IT_WORKS = [
  {
    step: "01",
    title: "Connect your bank",
    body: "Plaid handles the link. Splits gets read-only access to the transactions you'd see in your banking app. Sandbox during the waitlist period, real banks once production Plaid access is granted.",
    chip: "Plaid · Chase **** 1284",
  },
  {
    step: "02",
    title: "Mark what you share",
    body: "Tell Splits which transactions belong to which person. Rent with Jamie. Spotify Family with Sam. Set the rule once and Splits handles every future charge.",
    chip: "Rule · Rent · 50/50 with Jamie",
  },
  {
    step: "03",
    title: "Settle when you want",
    body: "Balances update as new transactions land. When you're ready to settle, Splits hands you off to Venmo or Cash App with the amount pre-filled. We never hold your money.",
    chip: "Settle $42.18 · Venmo ↗",
  },
];

const FEATURES = [
  {
    glyph: "↻",
    title: "Recurring, on autopilot",
    body: "Set one rule for rent, or utilities, or the streaming bundle, and Splits keeps splitting it every month. No reminders, no spreadsheets.",
  },
  {
    glyph: "⚡",
    title: "Live balances",
    body: "Add a bill, your friend sees it. Mark something paid, the balance drops on their phone too. Powered by realtime over a single subscription per user.",
  },
  {
    glyph: "⌁",
    title: "We never touch money",
    body: "Splits is a ledger, not a wallet. Settling up hands off to Venmo or Cash App with the amount and recipient pre-filled, and the actual money never passes through us.",
  },
  {
    glyph: "▣",
    title: "Math that doesn't drift",
    body: "Every split is computed by one pure-TS engine, so the web app, the tests, and any future mobile client all agree on the balance.",
  },
  {
    glyph: "◇",
    title: "Idempotent by design",
    body: "Every imported transaction carries a deterministic fingerprint, so when Plaid sends the same charge twice, no one gets double-billed.",
  },
  {
    glyph: "✶",
    title: "Locked at the database",
    body: "Row-level security in Postgres means each user can only see their own data, even if a bug in the app tries otherwise.",
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

          {copy.featurePills.length > 0 && (
            <ul className={styles.featPills} aria-label="Key capabilities">
              {copy.featurePills.map((label, i) => (
                <li key={label}>
                  {i > 0 && (
                    <span className={styles.featPillSep} aria-hidden="true">·</span>
                  )}
                  <span>{label}</span>
                </li>
              ))}
            </ul>
          )}

          <div className={styles.featCtaRow}>
            {project.links.demo && (
              <a
                href={project.links.demo}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.featCtaPrimary}
              >
                <span className={styles.featCtaPrimaryLabel}>
                  Join the waitlist
                </span>
                <span className={styles.featCtaArrow} aria-hidden="true">↗</span>
              </a>
            )}
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

          <dl className={styles.featStats} aria-label="Product highlights">
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
            <span className="text-dim">·</span>
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
      <HowItWorks />
      <FeatureGrid />
      <WhyBuilt />
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
          Three steps. Then it runs itself.
        </h2>
        <p className={styles.sectionLede}>
          You set it up once. The rest is the app paying attention so you don&apos;t have to.
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

function FeatureGrid() {
  return (
    <section className={styles.featSec} aria-labelledby="feat-h">
      <ScrollReveal>
        <p className={styles.sectionKicker}>
          <span className="text-accent">$</span> under the hood
        </p>
        <h2 id="feat-h" className={styles.sectionTitle}>
          Boring fintech, on purpose.
        </h2>
        <p className={styles.sectionLede}>
          Money apps fail loudly. Splits is built so the dull, invariant stuff just keeps working.
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
            I have a roommate. We split rent, utilities, the streaming bundle.
            Every month I&apos;d open a spreadsheet, add up the receipts, send a
            Venmo request, follow up when she didn&apos;t pay yet, then forget
            half of it the next month and do it all again.
          </p>
          <p>
            Splits is what that spreadsheet wanted to be. Connect your bank,
            tell it who shares what, and stop thinking about it. The IOU
            updates itself. You settle when you want, the way you already pay
            people back.
          </p>
          <footer className={styles.whyFooter}>
            <span className={styles.whySig} aria-hidden="true">~</span>
            <span>built solo · April 2026 – present</span>
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
              Waitlist · early access
            </p>
            <h2 id="cta-h" className={styles.ctaTitle}>
              Join the waitlist.
            </h2>
            <p className={styles.ctaSub}>
              Head to splitshq.com to join the waitlist. I&apos;m onboarding
              users in batches while Plaid runs in sandbox mode, so early access
              is safe to explore with simulated banks. Native iOS and Android
              apps are in development alongside the web client.
            </p>
            <p className={styles.ctaSub}>
              <strong>Recruiters:</strong> if you&apos;d like to skip the
              waitlist and try the app, email{" "}
              <a
                className={styles.ctaInlineLink}
                href={`mailto:${profile.email}?subject=Splits%20early%20access`}
              >
                {profile.email}
              </a>{" "}
              and I&apos;ll send over an invite.
            </p>
            <ul className={styles.ctaRoadmap}>
              <li>
                <span className={styles.ctaCheck} aria-hidden="true">▸</span>
                <span><strong>Now:</strong> waitlist live · bank linking · auto-split · realtime balances · Venmo / Cash App handoff</span>
              </li>
              <li>
                <span className={styles.ctaCheck} aria-hidden="true">◇</span>
                <span><strong>In progress:</strong> native iOS app · native Android app · production Plaid · group bills</span>
              </li>
              <li>
                <span className={styles.ctaCheck} aria-hidden="true">◇</span>
                <span><strong>Later:</strong> shared subscriptions detector · smart settlement reminders</span>
              </li>
            </ul>
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
                  Join the waitlist
                </span>
                <span className={styles.featCtaArrow} aria-hidden="true">↗</span>
              </a>
            )}
            <a
              href={`mailto:${profile.email}?subject=Splits%20early%20access`}
              className={styles.featCtaSecondary}
            >
              <span aria-hidden="true">✉</span> Email for early access
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
