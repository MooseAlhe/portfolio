"use client";

import { useEffect, useState } from "react";

type Props = {
  lines: string[];
  /** Typing speed in ms per char */
  speed?: number;
  /** Pause between lines in ms */
  linePause?: number;
  /** Initial delay in ms */
  startDelay?: number;
  /** Show a blinking caret */
  caret?: boolean;
  /** Called once all lines have finished typing */
  onDone?: () => void;
  className?: string;
};

/**
 * Lightweight typewriter — types each line top-to-bottom, then settles.
 * Honors prefers-reduced-motion (renders all lines immediately).
 */
export default function Typewriter({
  lines,
  speed = 38,
  linePause = 360,
  startDelay = 200,
  caret = true,
  onDone,
  className = "",
}: Props) {
  const [printed, setPrinted] = useState<string[]>([]);
  const [activeIdx, setActiveIdx] = useState(0);
  const [activeText, setActiveText] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setPrinted(lines);
      setDone(true);
      onDone?.();
      return;
    }

    let cancelled = false;
    let charIdx = 0;
    let currentLineIdx = 0;
    let timer: number | null = null;

    const typeChar = () => {
      if (cancelled) return;
      const line = lines[currentLineIdx];
      if (line === undefined) {
        setDone(true);
        onDone?.();
        return;
      }
      if (charIdx <= line.length) {
        setActiveText(line.slice(0, charIdx));
        charIdx += 1;
        timer = window.setTimeout(typeChar, speed);
      } else {
        setPrinted((p) => [...p, line]);
        setActiveText("");
        currentLineIdx += 1;
        setActiveIdx(currentLineIdx);
        charIdx = 0;
        timer = window.setTimeout(typeChar, linePause);
      }
    };

    timer = window.setTimeout(typeChar, startDelay);
    return () => {
      cancelled = true;
      if (timer) window.clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={className}>
      {printed.map((line, i) => (
        <div key={`p-${i}`}>{line}</div>
      ))}
      {!done && (
        <div>
          {activeText}
          {caret && <span className="caret" aria-hidden="true" />}
        </div>
      )}
      {done && caret && activeIdx >= lines.length && (
        <div aria-hidden="true">
          <span className="caret" />
        </div>
      )}
    </div>
  );
}
