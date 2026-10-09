"use client";

import { useState } from "react";

type Group = { name: string; items: { name: string; href: string }[] };

export default function Drawer({ name, groups, home = "" }: { name: string; groups: Group[]; home?: string }) {
  const [open, setOpen] = useState(false);
  const [stack, setStack] = useState<string[]>(["menu"]);
  const [dir, setDir] = useState<"fwd" | "back">("fwd");
  const cur = stack[stack.length - 1];

  const close = () => setOpen(false);
  const go = (k: string) => { setDir("fwd"); setStack((s) => [...s, k]); };
  const back = () => { setDir("back"); setStack((s) => s.slice(0, -1)); };

  const group = cur.startsWith("g:") ? groups[Number(cur.slice(2))] : null;
  const title = cur === "menu" ? "Menu" : cur === "work" ? "Work" : group?.name ?? "";
  const prev = stack.length > 1 ? (stack[stack.length - 2] === "menu" ? "Menu" : "Work") : null;

  const Item = ({ label, to }: { label: string; to: string }) => (
    <button className="it" onClick={() => go(to)}>{label}<span>&rsaquo;</span></button>
  );
  const Link = ({ label, href }: { label: string; href: string }) => (
    <a href={href} onClick={close}>{label}</a>
  );

  return (
    <>
      <header className="bar">
        <a href="/"><b>{name}</b></a>
        <button className="pill" onClick={() => setOpen(true)} aria-expanded={open}>Menu</button>
      </header>
      <div className={`scrim${open ? " on" : ""}`} onClick={close} />
      <aside className={`drawer${open ? " on" : ""}`} aria-label="Menu" aria-hidden={!open}>
        <div className="dh">
          {prev ? <button onClick={back}>&lsaquo; {prev}</button> : <span>Menu</span>}
          <button onClick={close}>Close</button>
        </div>
        <div className="stage">
          <div className={`pg ${dir}`} key={cur}>
            <h5>{title}</h5>
            {cur === "menu" && (<><Item label="Work" to="work" /><Link label="Publications" href={`${home}#publications`} /><Link label="About" href={`${home}#about`} /><Link label="Contact" href="#contact" /></>)}
            {cur === "work" && groups.map((g, i) => <Item key={g.name} label={g.name} to={`g:${i}`} />)}
            {group && group.items.map((p) => <Link key={p.name} label={p.name} href={p.href} />)}
          </div>
        </div>
      </aside>
    </>
  );
}
