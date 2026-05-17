import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Footer from "@/app/components/Footer";
import Nav from "@/app/components/Nav";
import ScrollProgress from "@/app/components/ScrollProgress";
import ScrollReveal from "@/app/components/ScrollReveal";
import { projects, type Project } from "@/app/lib/data";
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
  { value: "Real-time", label: "shared balances" },
];

const HOW_IT_WORKS = [
  {
    step: "01",
    title: "Connect your bank",
    body: "Plaid handles the link — Splits gets read-only access to the transactions you'd see in your banking app. Sandbox in beta, real banks soon.",
    chip: "Plaid · Chase **** 1284",
  },
  {
    step: "02",
    title: "Mark what you share",
    body: "Tell Splits which transactions belong to which person. Rent with Jamie. Spotify Family with Sam. Set the rule once and Splits handles every future charge.",
    chip: "Rule · Rent · split 50/50 with Jamie",
  },
  {
    step: "03",
    title: "Settle when you want",
    body: "Balances update as new transactions land. When you're ready to settle, Splits hands you off to Venmo or Cash App with the amount pre-filled — we never hold your money.",
    chip: "Settle $42.18 · Venmo ↗",
  },
];

const FEATURES = [
  {
    glyph: "↻",
    title: "Recurring, on autopilot",
    body: "Rent, utilities, the streaming bundle — set one rule and Splits keeps splitting them every month. No reminders, no spreadsheets.",
  },
  {
    glyph: "⚡",
    title: "Live balances",
    body: "Add a bill, your friend sees it. Mark something paid, the balance drops on their phone too. Powered by realtime over a single subscription per user.",
  },
  {
    glyph: "⌁",
    title: "We never touch money",
    body: "Splits is a ledger, not a wallet. Settle-up hands off to Venmo or Cash App with the amount and recipient pre-filled. Your money stays your money.",
  },
  {
    glyph: "▣",
    title: "Math that doesn't drift",
    body: "Every split is computed by the same pure-TS engine — same balance on the web, in tests, in future jobs. No surface ever disagrees with another.",
  },
  {
    glyph: "◇",
    title: "Idempotent by design",
    body: "Every imported transaction carries a deterministic fingerprint. If Plaid sends the same charge twice (it does), no one gets double-billed.",
  },
  {
    glyph: "✶",
    title: "Locked at the database",
    body: "Row-level security in Postgres means each user can only see their own data — even if a bug in the app tried otherwise. Defense in depth, not a single firewall.",
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
                  View live app
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
          <MockDashboard />
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
                {step.chip}
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
            <span>built solo · April 2026 — present</span>
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
              Beta · open access
            </p>
            <h2 id="cta-h" className={styles.ctaTitle}>
              It&apos;s live. Try it.
            </h2>
            <p className={styles.ctaSub}>
              Sign up at splitshq.com — Plaid is in sandbox mode for the beta, so
              you can poke around with simulated banks without exposing any real
              financial data.
            </p>
            <ul className={styles.ctaRoadmap}>
              <li>
                <span className={styles.ctaCheck} aria-hidden="true">▸</span>
                <span><strong>Now:</strong> bank linking · auto-split · realtime balances · Venmo / Cash App handoff</span>
              </li>
              <li>
                <span className={styles.ctaCheck} aria-hidden="true">◇</span>
                <span><strong>Next:</strong> production Plaid · group bills · mobile-first iOS shell</span>
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
                  Launch splitshq.com
                </span>
                <span className={styles.featCtaArrow} aria-hidden="true">↗</span>
              </a>
            )}
            <Link href="/#projects" className={styles.featCtaSecondary}>
              <span aria-hidden="true">←</span> back to projects
            </Link>
          </div>
        </div>
      </section>
    </ScrollReveal>
  );
}

/* ============================================================
   Mock dashboard preview
   ============================================================ */

function MockDashboard() {
  return (
    <div className={styles.dash} aria-hidden="true">
      <div className={styles.dashChrome}>
        <span className={styles.dashDot} style={{ background: "#ff6b6b" }} />
        <span className={styles.dashDot} style={{ background: "#ffb86c" }} />
        <span className={styles.dashDot} style={{ background: "#5eff84" }} />
        <span className={styles.dashChromeLabel}>splits.app / home</span>
        <span className={styles.dashChromeLive}>
          <span className={styles.dashChromeLiveDot} />
          live
        </span>
      </div>

      <div className={styles.dashGrid}>
        <div className={`${styles.dashCard} ${styles.dashCardOwed}`}>
          <span className={styles.dashCardLabel}>you&apos;re owed</span>
          <div className={styles.dashCardRow}>
            <span className={styles.dashCardAmountPos}>+$427.50</span>
            <span className={styles.dashCardTrend}>
              <span aria-hidden="true">▲</span> 12%
            </span>
          </div>
          <div className={styles.dashSpark}>
            <svg
              viewBox="0 0 160 36"
              width="100%"
              height="36"
              preserveAspectRatio="none"
              role="presentation"
            >
              <defs>
                <linearGradient id="dashFill" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#5eff84" stopOpacity="0.32" />
                  <stop offset="100%" stopColor="#5eff84" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path
                d="M0 26 L20 22 L40 24 L60 16 L80 20 L100 12 L120 14 L140 6 L160 8 L160 36 L0 36 Z"
                fill="url(#dashFill)"
              />
              <polyline
                className={styles.dashSparkLine}
                points="0,26 20,22 40,24 60,16 80,20 100,12 120,14 140,6 160,8"
                fill="none"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle
                className={styles.dashSparkDot}
                cx="160"
                cy="8"
                r="2.8"
              />
            </svg>
          </div>
        </div>

        <div className={`${styles.dashCard} ${styles.dashCardOwe}`}>
          <span className={styles.dashCardLabel}>you owe</span>
          <div className={styles.dashCardRow}>
            <span className={styles.dashCardAmountNeg}>−$84.20</span>
            <span className={styles.dashCardSub}>2 people</span>
          </div>
          <div className={styles.dashBars} aria-hidden="true">
            <span className={styles.dashBar} style={{ height: "55%" }} />
            <span className={styles.dashBar} style={{ height: "30%" }} />
            <span className={styles.dashBar} style={{ height: "70%" }} />
            <span className={styles.dashBar} style={{ height: "40%" }} />
            <span className={styles.dashBar} style={{ height: "60%" }} />
            <span className={styles.dashBar} style={{ height: "25%" }} />
            <span className={styles.dashBar} style={{ height: "80%" }} />
          </div>
        </div>
      </div>

      <div className={styles.dashToast} role="presentation">
        <span className={styles.dashToastIcon} aria-hidden="true">↻</span>
        <span className={styles.dashToastBody}>
          <span className={styles.dashToastTitle}>
            Recurring detected · Rent
          </span>
          <span className={styles.dashToastSub}>
            Plaid · $1,275/mo · Split 50/50 with Jamie
          </span>
        </span>
        <span className={styles.dashToastAction}>Auto-split</span>
      </div>

      <div className={styles.dashList}>
        <div className={styles.dashListHead}>
          <span>Recent splits</span>
          <span className={styles.dashListHeadMeta}>April</span>
        </div>
        <div className={styles.dashRow}>
          <span className={`${styles.dashAvatar} ${styles.dashAvatarA}`}>J</span>
          <span className={styles.dashRowMain}>
            <span className={styles.dashRowTitle}>Rent · April</span>
            <span className={styles.dashRowMeta}>Jamie · split 50/50</span>
          </span>
          <span className={`${styles.dashRowAmount} ${styles.dashRowPos}`}>
            +$1,275.00
          </span>
        </div>
        <div className={styles.dashRow}>
          <span className={`${styles.dashAvatar} ${styles.dashAvatarB}`}>S</span>
          <span className={styles.dashRowMain}>
            <span className={styles.dashRowTitle}>Spotify Family</span>
            <span className={styles.dashRowMeta}>Sam · auto-detected</span>
          </span>
          <span className={`${styles.dashRowAmount} ${styles.dashRowPos}`}>
            +$5.99
          </span>
        </div>
        <div className={styles.dashRow}>
          <span className={`${styles.dashAvatar} ${styles.dashAvatarC}`}>R</span>
          <span className={styles.dashRowMain}>
            <span className={styles.dashRowTitle}>Costco run</span>
            <span className={styles.dashRowMeta}>Riley · paid you back</span>
          </span>
          <span className={`${styles.dashRowAmount} ${styles.dashRowNeg}`}>
            −$42.18
          </span>
        </div>
      </div>
    </div>
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
