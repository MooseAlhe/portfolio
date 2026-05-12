"use client";

import { useEffect, useState } from "react";
import { profile } from "../lib/data";
import styles from "./Nav.module.css";

const links = [
  { href: "#about", label: "about", num: "01" },
  { href: "#experience", label: "experience", num: "02" },
  { href: "#projects", label: "projects", num: "03" },
  { href: "#terminal", label: "terminal", num: "04" },
  { href: "#contact", label: "contact", num: "05" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on link click
  const handleLinkClick = () => setOpen(false);

  // Lock body scroll while menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}
      role="banner"
    >
      <div className={styles.inner}>
        <a href="#top" className={styles.brand} aria-label="Home">
          <span className={styles.brandPrompt}>~/</span>
          <span className={styles.brandHandle}>{profile.handle}</span>
          <span className={styles.brandDot}>.</span>
          <span className={styles.brandTld}>dev</span>
        </a>

        <nav aria-label="Primary" className={styles.desktopNav}>
          <ul>
            {links.map((l) => (
              <li key={l.href}>
                <a href={l.href}>
                  <span className={styles.num}>{l.num}.</span> {l.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href={profile.resumePath}
            className={styles.cta}
            target="_blank"
            rel="noopener noreferrer"
          >
            resume.pdf
          </a>
        </nav>

        <button
          className={styles.menuBtn}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
        >
          <span
            className={`${styles.menuIcon} ${open ? styles.menuIconOpen : ""}`}
            aria-hidden="true"
          />
        </button>
      </div>

      <div
        id="mobile-nav"
        className={`${styles.mobileNav} ${open ? styles.mobileNavOpen : ""}`}
        aria-hidden={!open}
      >
        <ul>
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} onClick={handleLinkClick}>
                <span className={styles.num}>{l.num}.</span> {l.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href={profile.resumePath}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleLinkClick}
              className={styles.mobileCta}
            >
              resume.pdf
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}
