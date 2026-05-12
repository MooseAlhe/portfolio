"use client";

import { useState } from "react";
import { profile } from "../lib/data";
import ScrollReveal from "./ScrollReveal";
import SectionHeader from "./SectionHeader";
import styles from "./Contact.module.css";

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard not available — silently ignore */
    }
  };

  return (
    <section id="contact" className="section" aria-labelledby="contact-h">
      <div className="container">
        <h2 id="contact-h" className="sr-only">
          Contact
        </h2>
        <SectionHeader num="05" title="Contact" command="echo $REACH_OUT" />

        <ScrollReveal className={styles.card}>
          <p className={styles.kicker}>
            <span className="text-accent">// </span>
            currently open to interesting conversations
          </p>
          <h3 className={styles.headline}>
            Let&apos;s build something.
          </h3>
          <p className={styles.body}>
            Whether it&apos;s a new role, a side project, or a half-formed idea
            that sounds fun — my inbox is the fastest way to reach me.
          </p>

          <div className={styles.actions}>
            <a href={`mailto:${profile.email}`} className={styles.primary}>
              <span aria-hidden="true">✉</span> {profile.email}
            </a>
            <button
              type="button"
              className={styles.copyBtn}
              onClick={copyEmail}
              aria-live="polite"
            >
              {copied ? "copied ✓" : "copy email"}
            </button>
          </div>

          <ul className={styles.links} aria-label="Other ways to reach me">
            <li>
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="text-muted">~/</span>github
              </a>
            </li>
            <li>
              <a
                href={profile.resumePath}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="text-muted">~/</span>resume.pdf
              </a>
            </li>
            {profile.linkedin && (
              <li>
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="text-muted">~/</span>linkedin
                </a>
              </li>
            )}
          </ul>
        </ScrollReveal>
      </div>
    </section>
  );
}
