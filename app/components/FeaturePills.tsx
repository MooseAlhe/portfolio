import styles from "./FeaturePills.module.css";

/** "▸"-prefixed capability list; wraps cleanly with no orphan separators. */
export default function FeaturePills({ items }: { items: string[] }) {
  if (items.length === 0) return null;
  return (
    <ul className={styles.pills} aria-label="Key capabilities">
      {items.map((label) => (
        <li key={label}>{label}</li>
      ))}
    </ul>
  );
}
