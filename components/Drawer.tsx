"use client";

import { useEffect, useState } from "react";

type Group = { name: string; items: { name: string; href: string }[] };
const SHADES = ["#e2ded3", "#e9e5db", "#f0ede5", "#f6f3ec"];

export default function Drawer({ name, groups, home = "" }: { name: string; groups: Group[]; home?: string }) {
  const [open, setOpen] = useState(false);
  const [stack, setStack] = useState<string[]>(["menu"]);
  const [leaving, setLeaving] = useState(false);

  const close = () => {
    setOpen(false);
    setTimeout(() => setStack(["menu"]), 520);
  };
  const push = (k: string) => setStack((s) => [...s, k]);
  const pop = () => {
    if (leaving) return;
    setLeaving(true);
    setTimeout(() => { setStack((s) => s.slice(0, -1)); setLeaving(false); }, 340);
  };

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (stack.length > 1) pop(); else close();
    };
    addEventListener("keydown", onKey);
    return () => removeEventListener("keydown", onKey);
  });

  const titleOf = (k: string) => (k === "menu" ? "Menu" : k === "work" ? "Work" : groups[Number(k.slice(2))]?.name ?? "");

  return (
    <>
      <header className="bar">
        <a href="/"><b>{name}</b></a>
        <button className="pill" onClick={() => setOpen(true)} aria-expanded={open}>Menu</button>
      </header>
      <div className={`scrim${open ? " on" : ""}`} onClick={close} />
      <aside className={`dr${open ? " on" : ""}`} aria-label="Menu" aria-hidden={!open}>
        {stack.map((k, i) => {
          const top = i === stack.length - 1;
          const g = k.startsWith("g:") ? groups[Number(k.slice(2))] : null;
          return (
            <section
              key={k}
              className={`pn${top ? "" : " under"}${top && leaving ? " leave" : ""}`}
              style={{ width: `calc(100% - ${i * 30}px)`, zIndex: i + 1, background: SHADES[Math.min(i, 3)] }}
              inert={!top}
            >
              <div className="ph">
                {i > 0 ? <button onClick={pop} aria-label={`Back to ${titleOf(stack[i - 1])}`}>&larr; {titleOf(stack[i - 1])}</button> : <span />}
                <button onClick={close}>Close</button>
              </div>
              <h5>{titleOf(k)}</h5>
              {k === "menu" && (
                <>
                  <button className="it" onClick={() => push("work")}>Work<span>&rsaquo;</span></button>
                  <a href={`${home}#publications`} onClick={close}>Publications</a>
                  <a href={`${home}#about`} onClick={close}>About</a>
                  <a href="#contact" onClick={close}>Contact</a>
                </>
              )}
              {k === "work" && groups.map((gr, gi) => (
                <button className="it" key={gr.name} onClick={() => push(`g:${gi}`)}>{gr.name}<span>&rsaquo;</span></button>
              ))}
              {g && g.items.map((p) => <a key={p.name} href={p.href} onClick={close}>{p.name}</a>)}
            </section>
          );
        })}
      </aside>
    </>
  );
}
