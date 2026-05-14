"use client";

import { ReactNode } from "react";
import styles from "./Term.module.css";

export default function Term({
  children,
  tip,
}: {
  children: ReactNode;
  tip?: string;
}) {
  return (
    <span className={styles.term} data-tip={tip} tabIndex={0}>
      <span className={styles.label}>{children}</span>
      {tip && (
        <span className={styles.tooltip} role="tooltip">
          {tip}
        </span>
      )}
    </span>
  );
}
