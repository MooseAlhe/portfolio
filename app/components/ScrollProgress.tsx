"use client";

import { useEffect, useState } from "react";

export default function ScrollProgress() {
  const [w, setW] = useState(0);

  useEffect(() => {
    const update = () => {
      const h = document.documentElement;
      const scrolled = h.scrollTop;
      const total = h.scrollHeight - h.clientHeight;
      setW(total > 0 ? (scrolled / total) * 100 : 0);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div
      className="scroll-progress"
      style={{ width: `${w}%` }}
      aria-hidden="true"
    />
  );
}
