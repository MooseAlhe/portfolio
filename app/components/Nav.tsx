"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
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
  const pathname = usePathname();
  const headerRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const sectionHref = (hash: string) => pathname === "/" ? hash : `/${hash}`;

  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;
    const updateHeight = () => document.documentElement.style.setProperty(
      "--nav-height", `${header.getBoundingClientRect().height}px`
    );
    updateHeight();
    const observer = new ResizeObserver(updateHeight);
    observer.observe(header);
    return () => {
      observer.disconnect();
      document.documentElement.style.removeProperty("--nav-height");
    };
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on link click
  const handleLinkClick = () => {
    setOpen(false);
    buttonRef.current?.focus();
  };

  // Lock body scroll while menu is open
  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    menuRef.current?.querySelector<HTMLAnchorElement>("a")?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setOpen(false);
        buttonRef.current?.focus();
      }
      if (event.key !== "Tab") return;
      const targets = [buttonRef.current, ...Array.from(
        menuRef.current?.querySelectorAll<HTMLAnchorElement>("a") ?? []
      )].filter((el): el is HTMLButtonElement | HTMLAnchorElement => el !== null);
      const first = targets[0];
      const last = targets[targets.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 60rem)");
    const onResize = () => {
      if (!desktop.matches) return;
      if (menuRef.current?.contains(document.activeElement) || document.activeElement === buttonRef.current) {
        headerRef.current?.querySelector<HTMLAnchorElement>("a")?.focus();
      }
      setOpen(false);
    };
    desktop.addEventListener("change", onResize);
    return () => desktop.removeEventListener("change", onResize);
  }, []);

  return (
    <header
      ref={headerRef}
      className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}
      role="banner"
    >
      <div className={styles.inner}>
        <a href={sectionHref("#top")} className={styles.brand} aria-label="Home">
          <span className={styles.brandPrompt}>~/</span>
          <span className={styles.brandHandle}>{profile.handle}</span>
          <span className={styles.brandDot}>.</span>
          <span className={styles.brandTld}>dev</span>
        </a>

        <nav aria-label="Primary" className={styles.desktopNav}>
          <ul>
            {links.map((l) => (
              <li key={l.href}>
                <a href={sectionHref(l.href)}>
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
          ref={buttonRef}
          type="button"
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
        ref={menuRef}
        id="mobile-nav"
        hidden={!open}
        className={`${styles.mobileNav} ${open ? styles.mobileNavOpen : ""}`}
        aria-hidden={!open}
      >
        <ul>
          {links.map((l) => (
            <li key={l.href}>
              <a href={sectionHref(l.href)} onClick={handleLinkClick}>
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
