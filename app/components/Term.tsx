import { ReactNode } from "react";

/**
 * Inline keyword. Invisible by default; lights up when an ancestor
 * with `.highlight-scope` is hovered.
 */
export default function Term({ children }: { children: ReactNode }) {
  return <span className="keyword">{children}</span>;
}
