"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  COMMAND_LIST,
  SUGGESTED,
  TerminalLine,
  completeCommand,
  findCommand,
} from "../lib/commands";
import { profile } from "../lib/data";
import MrRobot from "./MrRobot";
import styles from "./Terminal.module.css";

const PROMPT = `${profile.handle}@${profile.host}:~$ `;

const WELCOME: TerminalLine[] = [
  { kind: "system", text: "Mustafa @ portfolio.dev — interactive shell (v1.0)" },
  { kind: "system", text: "Type `help` to see what's available." },
  { kind: "output", text: "" },
];

export default function Terminal() {
  const [lines, setLines] = useState<TerminalLine[]>(WELCOME);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState<number | null>(null);
  const [focused, setFocused] = useState(false);
  const [mrrobotActive, setMrrobotActive] = useState(false);

  const scrollRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const print = useCallback(
    (incoming: TerminalLine[] | TerminalLine) => {
      const arr = Array.isArray(incoming) ? incoming : [incoming];
      setLines((prev) => [...prev, ...arr]);
    },
    []
  );
  const clear = useCallback(() => setLines([]), []);

  const run = useCallback(
    (raw: string) => {
      const text = raw.trim();
      const echo: TerminalLine = { kind: "input", text: PROMPT + raw };
      setLines((prev) => [...prev, echo]);

      if (!text) return;

      const [name, ...args] = text.split(/\s+/);
      const cmd = findCommand(name);
      if (!cmd) {
        setLines((prev) => [
          ...prev,
          {
            kind: "error",
            text: `${name}: command not found. Type \`help\` for a list.`,
          },
        ]);
        return;
      }
      const ctx = { print, clear, run };
      try {
        const maybe = cmd.run(args, ctx);
        if (maybe && typeof (maybe as Promise<void>).then === "function") {
          (maybe as Promise<void>).catch((e) => {
            setLines((prev) => [
              ...prev,
              { kind: "error", text: `error: ${(e as Error).message}` },
            ]);
          });
        }
      } catch (e) {
        setLines((prev) => [
          ...prev,
          { kind: "error", text: `error: ${(e as Error).message}` },
        ]);
      }
    },
    [print, clear]
  );

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, [lines]);

  useEffect(() => {
    const onMrRobot = () => setMrrobotActive(true);
    window.addEventListener("portfolio:mrrobot", onMrRobot as EventListener);
    return () =>
      window.removeEventListener(
        "portfolio:mrrobot",
        onMrRobot as EventListener
      );
  }, []);

  useEffect(() => {
    const node = scrollRef.current?.parentElement;
    if (!node) return;

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (
            entry.isIntersecting &&
            entry.intersectionRatio > 0.4 &&
            window.matchMedia("(min-width: 720px)").matches
          ) {
            inputRef.current?.focus();
          }
        });
      },
      { threshold: [0, 0.4, 1] }
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, []);

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "l") {
        e.preventDefault();
        clear();
        return;
      }

      if (e.key === "Enter") {
        e.preventDefault();
        const value = input;
        setInput("");
        setHistoryIdx(null);
        if (value.trim().length > 0) {
          setHistory((h) => [...h, value]);
        }
        run(value);
        return;
      }

      if (e.key === "ArrowUp") {
        e.preventDefault();
        if (history.length === 0) return;
        setHistoryIdx((idx) => {
          const next = idx === null ? history.length - 1 : Math.max(0, idx - 1);
          setInput(history[next] ?? "");
          return next;
        });
        return;
      }

      if (e.key === "ArrowDown") {
        e.preventDefault();
        if (historyIdx === null) return;
        const next = historyIdx + 1;
        if (next >= history.length) {
          setHistoryIdx(null);
          setInput("");
        } else {
          setHistoryIdx(next);
          setInput(history[next] ?? "");
        }
        return;
      }

      if (e.key === "Tab") {
        e.preventDefault();
        const parts = input.split(/\s+/);
        if (parts.length === 1) {
          const matches = completeCommand(parts[0]);
          if (matches.length === 1) {
            setInput(matches[0] + " ");
          } else if (matches.length > 1) {
            print([
              { kind: "input", text: PROMPT + input },
              { kind: "output", text: matches.join("    ") },
            ]);
          }
        }
      }
    },
    [clear, input, history, historyIdx, print, run]
  );

  const focusInput = () => inputRef.current?.focus();

  const suggestedChips = useMemo(
    () =>
      SUGGESTED.map((s) => (
        <button
          key={s}
          type="button"
          className={styles.chip}
          onClick={() => {
            run(s);
            inputRef.current?.focus();
          }}
        >
          {s}
        </button>
      )),
    [run]
  );

  const totalCommands = COMMAND_LIST.length;
  const showHint = !input && lines.length <= WELCOME.length;

  return (
    <section id="terminal" className="section" aria-label="Interactive terminal">
      <div className="container">
        <div className="section-header">
          <span className="h-num">04.</span>
          <span className="h-title">Terminal</span>
          <span className="text-muted">// try it — it actually works</span>
          <span className="h-rule" aria-hidden="true" />
        </div>

        <p className={styles.intro}>
          Below is a real interactive shell with {totalCommands} commands.
          Type <span className="kbd">help</span> to start, use{" "}
          <span className="kbd">↑</span>/<span className="kbd">↓</span> to
          recall history, and <span className="kbd">Tab</span> to autocomplete.
        </p>

        <div
          className={`${styles.frame} ${focused ? styles.frameFocused : ""}`}
          onClick={focusInput}
          role="presentation"
        >
          <header className={styles.titlebar}>
            <span className={styles.dot} data-c="r" />
            <span className={styles.dot} data-c="y" />
            <span className={styles.dot} data-c="g" />
            <span className={styles.title}>
              — {profile.handle}@{profile.host}: ~/portfolio —
            </span>
          </header>

          <div
            ref={scrollRef}
            className={styles.scroll}
            aria-live="polite"
            aria-label="Terminal output"
          >
            {lines.map((l, i) => (
              <div key={i} className={`${styles.line} ${styles[l.kind]}`}>
                {l.kind === "ascii" ? (
                  <pre className={styles.ascii}>{l.text}</pre>
                ) : (
                  l.text || " "
                )}
              </div>
            ))}

            <div className={styles.inputRow}>
              <span className={styles.prompt}>{PROMPT}</span>
              <span className={styles.typed} aria-hidden="true">
                {input}
              </span>
              <span className="caret" aria-hidden="true" />
              {showHint && (
                <span className={styles.hint} aria-hidden="true">
                  type &apos;help&apos;
                </span>
              )}
              <input
                ref={inputRef}
                className={styles.hiddenInput}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={onKeyDown}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                spellCheck={false}
                autoComplete="off"
                autoCapitalize="none"
                autoCorrect="off"
                aria-label="Terminal input — type a command"
              />
            </div>
          </div>

          {mrrobotActive && (
            <MrRobot onExit={() => setMrrobotActive(false)} />
          )}
        </div>

        <div className={styles.suggestRow} aria-label="Suggested commands">
          <span className="text-muted">try:</span>
          {suggestedChips}
        </div>
      </div>
    </section>
  );
}
