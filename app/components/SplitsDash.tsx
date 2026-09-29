import styles from "./SplitsDash.module.css";

/**
 * Decorative mock of the Splits dashboard. Shared by the home-page featured
 * card and the /projects/splits case study so the two never drift apart.
 */
export default function SplitsDash() {
  return (
    <div className={styles.dash} aria-hidden="true">
      <div className={styles.dashChrome}>
        <span className={styles.dashDot} style={{ background: "#ff6b6b" }} />
        <span className={styles.dashDot} style={{ background: "#ffb86c" }} />
        <span className={styles.dashDot} style={{ background: "#5eff84" }} />
        <span className={styles.dashChromeLabel}>splits.app / home</span>
        <span className={styles.dashChromeLive}>
          <span className={styles.dashChromeLiveDot} />
          mockup
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
                <linearGradient id="splitsDashFill" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#5eff84" stopOpacity="0.32" />
                  <stop offset="100%" stopColor="#5eff84" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path
                d="M0 26 L20 22 L40 24 L60 16 L80 20 L100 12 L120 14 L140 6 L160 8 L160 36 L0 36 Z"
                fill="url(#splitsDashFill)"
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
