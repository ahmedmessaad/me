"use client";
import { useLayoutEffect, useRef, type CSSProperties } from "react";

export default function FitWordmark({ word, cloud }: { word: string; cloud?: string }) {
  const art = useRef<HTMLDivElement>(null);
  const el = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const a = art.current, w = el.current;
    if (!a || !w) return;
    const fit = () => {
      const probe = 100;
      const prev = w.style.fontSize;
      w.style.fontSize = probe + "px";
      const natural = w.scrollWidth;
      w.style.fontSize = prev;
      if (!natural) return;
      const side = a.clientWidth * 0.025;
      const F = Math.max(40, ((a.clientWidth - side * 2) / natural) * probe);
      a.style.setProperty("--F", F + "px");
      a.style.setProperty("--H", F * 0.9 + "px");
    };
    fit();
    document.fonts?.ready.then(fit);
    const ro = new ResizeObserver(fit);
    ro.observe(a);
    return () => ro.disconnect();
  }, [word]);

  const style = cloud ? ({ "--cloud": `url(${cloud})` } as CSSProperties) : undefined;
  return (
    <div ref={art} className={cloud ? "art has-photo" : "art"} style={style} aria-hidden="true">
      <div ref={el} className="word">{word}</div>
    </div>
  );
}
