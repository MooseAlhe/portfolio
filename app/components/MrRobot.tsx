"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./MrRobot.module.css";

const TITLE = `   __                _      _
  / _|___  ___   ___(_) ___| |_ _   _
 | |_/ __|/ _ \\ / __| |/ _ \\ __| | | |
 |  _\\__ \\ (_) | (__| |  __/ |_| |_| |
 |_| |___/\\___/ \\___|_|\\___|\\__|\\__, |
                                |___/`;

const PHRASES = [
  "HELLO, FRIEND.",
  "OUR DEMOCRACY HAS BEEN HACKED.",
  "CONTROL IS AN ILLUSION.",
  "WE ARE FSOCIETY.",
  "GOODBYE, FRIEND.",
];

type LogKind = "cmd" | "out" | "ok" | "warn";

const LOG_SCRIPT: { kind: LogKind; text: string }[] = [
  { kind: "cmd", text: "$ ssh elliot@allsafe-sec.com" },
  { kind: "out", text: "host known. session established → 0x4f7a2" },
  { kind: "cmd", text: "$ tunnel --target e-corp --port 1337" },
  { kind: "ok", text: "tunnel up. routed via 7 hops, last node: Tehran." },
  { kind: "cmd", text: "$ exploit cve-2014-6271 --bash --silent" },
  { kind: "out", text: "shellshock confirmed. spawning reverse shell..." },
  { kind: "ok", text: "shell acquired. uid=0(root)" },
  { kind: "cmd", text: "$ cat /etc/shadow | base64 > /tmp/.cache" },
  { kind: "out", text: "73,432 hashes serialized." },
  { kind: "cmd", text: "$ python dump_creds.py --target e-corp" },
  { kind: "out", text: "[####################] 100%  done." },
  { kind: "cmd", text: "$ rotate 2fa-tokens --bypass" },
  { kind: "warn", text: "TPM challenge detected. injecting forged response..." },
  { kind: "ok", text: "bypassed. session persistence: 48h." },
  { kind: "cmd", text: "$ scrub_logs --recursive --depth 7" },
  { kind: "out", text: "wiping access trail... 412 entries purged." },
  { kind: "cmd", text: "$ tail -f /var/log/auth.log" },
  { kind: "out", text: "[REDACTED]" },
  { kind: "cmd", text: "$ rm -rf /var/log/* ; history -c" },
  { kind: "ok", text: "trace cleaned. you were never here." },
  { kind: "cmd", text: "$ echo \"hello, friend.\" | nc 127.0.0.1 31337" },
  { kind: "out", text: "loopback response: i've been waiting for you." },
];

const LINE_INTERVAL = 130;
const MAX_LOG_LINES = 26;
const TYPE_INTERVAL = 60;
const PHRASE_HOLD_MS = 3000;

export default function MrRobot({ onExit }: { onExit: () => void }) {
  const [logs, setLogs] = useState<{ kind: LogKind; text: string; id: number }[]>(
    []
  );
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [typed, setTyped] = useState("");
  const [glitching, setGlitching] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);

  // Stream fake log lines into the background.
  useEffect(() => {
    let i = 0;
    let counter = 0;
    const id = window.setInterval(() => {
      const entry = LOG_SCRIPT[i % LOG_SCRIPT.length];
      counter++;
      setLogs((prev) => {
        const next = [...prev, { ...entry, id: counter }];
        return next.length > MAX_LOG_LINES
          ? next.slice(next.length - MAX_LOG_LINES)
          : next;
      });
      i++;
    }, LINE_INTERVAL);
    return () => window.clearInterval(id);
  }, []);

  // Type out the rotating phrase.
  useEffect(() => {
    const phrase = PHRASES[phraseIdx];
    let i = 0;
    setTyped("");
    const typer = window.setInterval(() => {
      i++;
      setTyped(phrase.slice(0, i));
      if (i >= phrase.length) window.clearInterval(typer);
    }, TYPE_INTERVAL);
    const next = window.setTimeout(() => {
      setPhraseIdx((idx) => (idx + 1) % PHRASES.length);
    }, PHRASE_HOLD_MS);
    return () => {
      window.clearInterval(typer);
      window.clearTimeout(next);
    };
  }, [phraseIdx]);

  // Occasional glitch pulse on the title.
  useEffect(() => {
    let timer: number;
    const schedule = () => {
      timer = window.setTimeout(() => {
        setGlitching(true);
        window.setTimeout(() => setGlitching(false), 180);
        schedule();
      }, 1800 + Math.random() * 2400);
    };
    schedule();
    return () => window.clearTimeout(timer);
  }, []);

  // Wheel events that land on the overlay would otherwise be swallowed by the
  // terminal frame; forward them to the document so the page still scrolls.
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      window.scrollBy({ top: e.deltaY, left: e.deltaX });
    };
    let lastTouchY = 0;
    let lastTouchX = 0;
    const onTouchStart = (e: TouchEvent) => {
      const t = e.touches[0];
      lastTouchY = t.clientY;
      lastTouchX = t.clientX;
    };
    const onTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      const t = e.touches[0];
      window.scrollBy({ top: lastTouchY - t.clientY, left: lastTouchX - t.clientX });
      lastTouchY = t.clientY;
      lastTouchX = t.clientX;
    };
    root.addEventListener("wheel", onWheel, { passive: false });
    root.addEventListener("touchstart", onTouchStart, { passive: true });
    root.addEventListener("touchmove", onTouchMove, { passive: false });
    return () => {
      root.removeEventListener("wheel", onWheel);
      root.removeEventListener("touchstart", onTouchStart);
      root.removeEventListener("touchmove", onTouchMove);
    };
  }, []);

  // Dismiss on Escape / Enter / click — leaves arrow keys, PageUp/Down, and
  // spacebar free for page scrolling while the overlay is up.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape" && e.key !== "Enter") return;
      e.preventDefault();
      e.stopPropagation();
      onExit();
    };
    const onPointer = (e: Event) => {
      e.preventDefault();
      e.stopPropagation();
      onExit();
    };
    window.addEventListener("keydown", onKey, true);
    window.addEventListener("pointerdown", onPointer, true);
    return () => {
      window.removeEventListener("keydown", onKey, true);
      window.removeEventListener("pointerdown", onPointer, true);
    };
  }, [onExit]);

  return (
    <div ref={rootRef} className={styles.root} role="presentation">
      <div className={styles.logWrap} aria-hidden="true">
        <div className={styles.log}>
          {logs.map((l) => (
            <div key={l.id} className={`${styles.logLine} ${styles[l.kind]}`}>
              {l.text}
            </div>
          ))}
        </div>
      </div>

      <div className={styles.scanlines} aria-hidden="true" />
      <div className={styles.vignette} aria-hidden="true" />
      <div className={styles.noise} aria-hidden="true" />

      <div className={styles.center}>
        <pre
          className={`${styles.title} ${glitching ? styles.titleGlitch : ""}`}
          data-text={TITLE}
        >
          {TITLE}
        </pre>
        <p className={styles.phrase}>
          <span className={styles.phraseText}>{typed}</span>
          <span className={styles.phraseCaret} aria-hidden="true" />
        </p>
        <p className={styles.hint}>esc or click to exit</p>
      </div>
    </div>
  );
}
