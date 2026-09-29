"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  src: string;
  poster: string;
  label: string;
  width: number;
  height: number;
  className?: string;
};

/**
 * Muted, looping video that only fetches its source once it nears the
 * viewport. With reduced motion it doesn't autoplay; controls are shown instead.
 */
export default function LazyVideo({ src, poster, label, width, height, className }: Props) {
  const ref = useRef<HTMLVideoElement | null>(null);
  const [active, setActive] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setReducedMotion(reduce);

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setActive(true);
        obs.disconnect();
      },
      { rootMargin: "200px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el || !active || reducedMotion) return;
    // play() rejects if autoplay is blocked; the poster stays visible.
    el.play().catch(() => {});
  }, [active, reducedMotion]);

  return (
    <video
      ref={ref}
      className={className}
      src={active ? src : undefined}
      poster={poster}
      width={width}
      height={height}
      muted
      loop
      playsInline
      preload="none"
      controls={reducedMotion}
      aria-label={label}
    />
  );
}
