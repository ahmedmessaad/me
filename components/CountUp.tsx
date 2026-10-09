"use client";

import { useEffect, useRef, useState } from "react";

export default function CountUp({ value }: { value: string }) {
  const ref = useRef<HTMLElement>(null);
  const [text, setText] = useState(value);

  useEffect(() => {
    const m = value.match(/^(\D*)(\d+(?:\.\d+)?)(.*)$/);
    if (!m || /\d/.test(m[3]) || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const [, pre, num, post] = m;
    const dec = (num.split(".")[1] || "").length;
    const end = parseFloat(num);
    let raf = 0, done = false;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting || done) return;
      done = true;
      const t0 = performance.now();
      const tick = (t: number) => {
        const k = Math.min(1, (t - t0) / 1100);
        setText(pre + (end * (1 - Math.pow(1 - k, 3))).toFixed(dec) + post);
        if (k < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    }, { threshold: 0.6 });
    io.observe(ref.current!);
    return () => { io.disconnect(); cancelAnimationFrame(raf); };
  }, [value]);

  return <strong ref={ref}>{text}</strong>;
}
