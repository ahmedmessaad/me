"use client";

import { useEffect, useState, type MouseEvent } from "react";
import { flushSync } from "react-dom";

type Mode = "light" | "dark";

export default function ThemeToggle() {
  const [mode, setMode] = useState<Mode | null>(null);

  useEffect(() => {
    const t = document.documentElement.dataset.theme;
    setMode(t === "light" || t === "dark" ? t : matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
  }, []);

  const set = (m: Mode, e: MouseEvent<HTMLButtonElement>) => {
    if (m === mode) return;
    const apply = () => {
      document.documentElement.dataset.theme = m;
      try { localStorage.setItem("theme", m); } catch {}
      setMode(m);
    };
    const root = document.documentElement;
    const vt = (document as any).startViewTransition?.bind(document);
    if (!vt || matchMedia("(prefers-reduced-motion: reduce)").matches) return apply();
    const r = e.currentTarget.getBoundingClientRect();
    const x = r.left + r.width / 2, y = r.top + r.height / 2;
    const radius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
    root.classList.add("vt-run");
    const t = vt(() => flushSync(apply));
    t.ready.then(() => {
      root.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
        { duration: 900, easing: "cubic-bezier(.65,0,.25,1)", pseudoElement: "::view-transition-new(root)" }
      );
    });
    t.finished.finally(() => root.classList.remove("vt-run"));
  };

  return (
    <div className="tt" data-mode={mode ?? ""} role="group" aria-label="Color theme">
      <button type="button" aria-pressed={mode === "light"} onClick={(e) => set("light", e)}>
        <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></svg>
        Light
      </button>
      <button type="button" aria-pressed={mode === "dark"} onClick={(e) => set("dark", e)}>
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" /></svg>
        Dark
      </button>
    </div>
  );
}
