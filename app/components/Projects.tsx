"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { projects, type Project } from "../lib/data";
import ScrollReveal from "./ScrollReveal";
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

          <div
            className={`${styles.scroller} ${canPrev ? styles.fadeLeft : ""} ${canNext ? styles.fadeRight : ""}`}
            ref={scrollerRef}
          >
            {projects.map((p) =>
              p.cardVariant === "featured" ? (
                <FeaturedCard key={p.slug} p={p} />
              ) : (
                <DefaultCard key={p.slug} p={p} />
              )
            )}
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

function DefaultCard({ p }: { p: Project }) {
  const useFinanceMock = p.slug === "finance-app";
  const cardHighlights = p.highlights.slice(0, 3);

  return (
    <Link
      href={`/projects/${p.slug}`}
      className={styles.card}
      aria-label={`Open ${p.name} project details`}
    >
      <header className={styles.cardHeader}>
        {p.cover?.kind === "logo" ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            className={styles.cardLogo}
            src={p.cover.src}
            alt=""
            aria-hidden="true"
          />
        ) : (
          <span className={styles.folder} aria-hidden="true">▢</span>
        )}
        <div className={styles.titles}>
          <h3 className={styles.name}>{p.name}</h3>
          <p className={styles.tagline}>{p.tagline}</p>
        </div>
        <span className={styles.period}>{p.period}</span>
      </header>

      <p className={styles.summary}>{p.summary}</p>

      <div className={styles.cardExtras} aria-hidden={useFinanceMock}>
        {useFinanceMock ? (
          <FinanceMock />
        ) : cardHighlights.length > 0 ? (
          <ul className={styles.cardHighlights}>
            {cardHighlights.map((h, i) => (
              <li key={i}>
                <span className={styles.cardHighlightArrow} aria-hidden="true">
                  ▸
                </span>
                <span>{h}</span>
              </li>
            ))}
          </ul>
        ) : null}
      </div>

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
  );
}

function FinanceMock() {
  return (
    <div className={styles.finance} aria-hidden="true">
      <div className={styles.financePrompt}>
        <span className={styles.financePromptCaret}>$</span>
        <span className={styles.financePromptText}>
          how much did I spend on coffee in March?
        </span>
      </div>

      <ul className={styles.financeRows}>
        <li className={styles.financeRow}>
          <span className={styles.financeRowLabel}>Coffee</span>
          <span className={styles.financeBar} aria-hidden="true">
            <span
              className={styles.financeBarFill}
              style={{ width: "42%" }}
            />
          </span>
          <span className={styles.financeRowAmount}>$84.50</span>
        </li>
        <li className={styles.financeRow}>
          <span className={styles.financeRowLabel}>Groceries</span>
          <span className={styles.financeBar} aria-hidden="true">
            <span
              className={styles.financeBarFill}
              style={{ width: "92%" }}
            />
          </span>
          <span className={styles.financeRowAmount}>$312.00</span>
        </li>
        <li className={styles.financeRow}>
          <span className={styles.financeRowLabel}>Transit</span>
          <span className={styles.financeBar} aria-hidden="true">
            <span
              className={styles.financeBarFill}
              style={{ width: "28%" }}
            />
          </span>
          <span className={styles.financeRowAmount}>$67.20</span>
        </li>
      </ul>

      <div className={styles.financeTotal}>
        <span className={styles.financeTotalLabel}>March · total</span>
        <span className={styles.financeTotalAmount}>$1,847.32</span>
      </div>
    </div>
  );
}

function FeaturedCard({ p }: { p: Project }) {
  const copy = p.featuredCopy;
  const stackMax = 4;
  return (
    <article
      className={`${styles.card} ${styles.featuredCard}`}
      aria-labelledby={`feat-${p.slug}-title`}
    >
      <div className={styles.featuredInner}>
        <div className={styles.featuredLeft}>
          {copy?.eyebrow && (
            <p className={styles.featuredEyebrow}>
              <span className={styles.featuredEyebrowDot} aria-hidden="true" />
              {copy.eyebrow}
            </p>
          )}

          <h3 className={styles.featuredTitle}>
            {p.cover?.kind === "logo" && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                className={styles.featuredTitleLogo}
                src={p.cover.src}
                alt=""
                aria-hidden="true"
              />
            )}
            <Link
              id={`feat-${p.slug}-title`}
              href={`/projects/${p.slug}`}
              className={styles.featuredTitleLink}
              aria-label={`Open ${p.name} case study`}
            >
              {p.name}
            </Link>
          </h3>

          {copy?.headline && (
            <p className={styles.featuredHeadline}>{copy.headline}</p>
          )}

          <p className={styles.featuredSummary}>{p.summary}</p>

          {copy?.featurePills && copy.featurePills.length > 0 && (
            <ul className={styles.featuredPills} aria-label="Key capabilities">
              {copy.featurePills.map((label, i) => (
                <li key={label}>
                  {i > 0 && (
                    <span className={styles.featuredPillSep} aria-hidden="true">
                      ·
                    </span>
                  )}
                  <span>{label}</span>
                </li>
              ))}
            </ul>
          )}

          <div className={styles.featuredCtaRow}>
            <span className={styles.featuredCtaPrimary} aria-hidden="true">
              Open case study <span className={styles.featuredCtaArrow}>→</span>
            </span>
            {p.links.demo && (
              <a
                href={p.links.demo}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.featuredCtaSecondary}
                aria-label={`Launch ${p.name} app in a new tab`}
              >
                Join waitlist
                <span className={styles.featuredCtaArrow} aria-hidden="true">
                  ↗
                </span>
              </a>
            )}
          </div>

          <div className={styles.featuredStack}>
            {p.stack.slice(0, stackMax).map((s) => (
              <span key={s} className={styles.featuredStackChip}>
                {s}
              </span>
            ))}
            {p.stack.length > stackMax && (
              <span className={styles.featuredStackChip}>
                +{p.stack.length - stackMax}
              </span>
            )}
          </div>
        </div>

        <div className={styles.featuredRight} aria-hidden="true">
          <MockDashboard />
        </div>
      </div>
    </article>
  );
}

function MockDashboard() {
  return (
    <div className={styles.dash}>
      <div className={styles.dashChrome}>
        <span className={styles.dashDot} style={{ background: "#ff6b6b" }} />
        <span className={styles.dashDot} style={{ background: "#ffb86c" }} />
        <span className={styles.dashDot} style={{ background: "#5eff84" }} />
        <span className={styles.dashChromeLabel}>splits · home</span>
      </div>

      <ScrollReveal className={styles.dashBalance}>
        <span className={styles.dashBalanceLabel}>you&apos;re owed</span>
        <div className={styles.dashBalanceRow}>
          <span className={styles.dashBalanceAmount}>+$427.50</span>
          <span className={styles.dashBalanceTrend}>
            <span aria-hidden="true">▲</span> 12%
          </span>
        </div>
      </ScrollReveal>

      <ScrollReveal className={styles.dashSpark} delay={60}>
        <svg
          viewBox="0 0 160 40"
          width="100%"
          height="40"
          preserveAspectRatio="none"
          role="presentation"
        >
          <defs>
            <linearGradient id="dashFill" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#5eff84" stopOpacity="0.22" />
              <stop offset="100%" stopColor="#5eff84" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            d="M0 28 L20 24 L40 26 L60 18 L80 22 L100 14 L120 16 L140 8 L160 10 L160 40 L0 40 Z"
            fill="url(#dashFill)"
          />
          <polyline
            className={styles.dashSparkLine}
            points="0,28 20,24 40,26 60,18 80,22 100,14 120,16 140,8 160,10"
            fill="none"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle
            className={styles.dashSparkDot}
            cx="160"
            cy="10"
            r="2.5"
          />
        </svg>
      </ScrollReveal>

      <div className={styles.dashList}>
        <ScrollReveal className={styles.dashRow} delay={120}>
          <span className={`${styles.dashAvatar} ${styles.dashAvatarA}`}>J</span>
          <span className={styles.dashRowMain}>
            <span className={styles.dashRowTitle}>Rent · April</span>
            <span className={styles.dashRowMeta}>Jamie · split 50/50</span>
          </span>
          <span className={`${styles.dashRowAmount} ${styles.dashRowPos}`}>
            +$1,275.00
          </span>
        </ScrollReveal>
        <ScrollReveal className={styles.dashRow} delay={180}>
          <span className={`${styles.dashAvatar} ${styles.dashAvatarB}`}>S</span>
          <span className={styles.dashRowMain}>
            <span className={styles.dashRowTitle}>Spotify Family</span>
            <span className={styles.dashRowMeta}>Sam · auto-detected</span>
          </span>
          <span className={`${styles.dashRowAmount} ${styles.dashRowPos}`}>
            +$5.99
          </span>
        </ScrollReveal>
        <ScrollReveal className={styles.dashRow} delay={240}>
          <span className={`${styles.dashAvatar} ${styles.dashAvatarC}`}>R</span>
          <span className={styles.dashRowMain}>
            <span className={styles.dashRowTitle}>Costco run</span>
            <span className={styles.dashRowMeta}>Riley · paid you back</span>
          </span>
          <span className={`${styles.dashRowAmount} ${styles.dashRowNeg}`}>
            −$42.18
          </span>
        </ScrollReveal>
      </div>
    </div>
  );
}
