import { profile } from "../lib/data";
import styles from "./Footer.module.css";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className={styles.footer} role="contentinfo">
      <div className={`container ${styles.inner}`}>
        <div className={styles.left}>
          <span className="text-dim">$</span>{" "}
          <span className="text-muted">echo</span>{" "}
          <span className="text-accent">
            &quot;built &amp; designed by {profile.name}&quot;
          </span>
        </div>
        <div className={styles.right}>
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
          >
            github
          </a>
          <span className="text-dim">·</span>
          <a href={`mailto:${profile.email}`} aria-label="Email">
            email
          </a>
          <span className="text-dim">·</span>
          <span className="text-muted">© {year}</span>
        </div>
      </div>
    </footer>
  );
}
