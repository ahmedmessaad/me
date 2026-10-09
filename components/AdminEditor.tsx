"use client";

import { useState } from "react";
import type { SiteData } from "@/lib/types";

type J = string | number | boolean | null | J[] | { [k: string]: J };

const blank = (v: J): J =>
  Array.isArray(v) ? [] : v && typeof v === "object" ? Object.fromEntries(Object.entries(v).map(([k, x]) => [k, blank(x)])) : typeof v === "string" ? "" : v;

function Node({ label, value, onChange }: { label: string; value: J; onChange: (v: J) => void }) {
  if (typeof value === "string") {
    const long = value.length > 70 || value.includes("\n");
    return (
      <>
        <label>{label}</label>
        {long ? <textarea value={value} onChange={(e) => onChange(e.target.value)} /> : <input value={value} onChange={(e) => onChange(e.target.value)} />}
      </>
    );
  }
  if (Array.isArray(value)) {
    const move = (i: number, d: number) => {
      const a = [...value]; const j = i + d;
      if (j < 0 || j >= a.length) return;
      [a[i], a[j]] = [a[j], a[i]]; onChange(a);
    };
    const simple = value.every((x) => typeof x === "string");
    return (
      <>
        <label>{label}</label>
        {value.map((item, i) => (
          <div key={i} className={simple ? "row2" : "card"}>
            {simple ? (
              ((item as string).length > 70 ? <textarea value={item as string} onChange={(e) => onChange(value.map((x, k) => (k === i ? e.target.value : x)))} /> : <input value={item as string} onChange={(e) => onChange(value.map((x, k) => (k === i ? e.target.value : x)))} />)
            ) : (
              <Node label={`${label} ${i + 1}`} value={item} onChange={(v) => onChange(value.map((x, k) => (k === i ? v : x)))} />
            )}
            <div className="row2">
              <button type="button" onClick={() => move(i, -1)}>Up</button>
              <button type="button" onClick={() => move(i, 1)}>Down</button>
              <button type="button" onClick={() => onChange(value.filter((_, k) => k !== i))}>Remove</button>
            </div>
          </div>
        ))}
        <button type="button" onClick={() => onChange([...value, value.length ? blank(value[0]) : ""])}>Add</button>
      </>
    );
  }
  if (value && typeof value === "object") {
    return (
      <div>
        {Object.entries(value).map(([k, v]) => (
          <Node key={k} label={k} value={v} onChange={(nv) => onChange({ ...value, [k]: nv })} />
        ))}
      </div>
    );
  }
  return null;
}

export default function AdminEditor({ initial, source }: { initial: SiteData; source: string }) {
  const [data, setData] = useState<SiteData>(initial);
  const [tab, setTab] = useState(Object.keys(initial)[0]);
  const [msg, setMsg] = useState(`Loaded from ${source}.`);
  const [busy, setBusy] = useState(false);

  async function save() {
    setBusy(true); setMsg("Saving...");
    const res = await fetch("/api/admin/data", { method: "PUT", body: JSON.stringify(data) });
    const j = await res.json().catch(() => ({}));
    setMsg(res.ok ? "Saved. Vercel is redeploying; changes go live in about a minute." : `Save failed: ${j.error ?? res.status}`);
    setBusy(false);
  }
  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    location.reload();
  }

  return (
    <div className="adm">
      <h1>Admin</h1>
      <div className="tabs">
        {Object.keys(data).map((k) => (
          <button key={k} className={k === tab ? "on" : ""} onClick={() => setTab(k)}>{k}</button>
        ))}
      </div>
      <Node label={tab} value={(data as unknown as Record<string, J>)[tab]} onChange={(v) => setData({ ...data, [tab]: v } as SiteData)} />
      <div className="bar2">
        <button className="pri" onClick={save} disabled={busy}>Save to GitHub</button>
        <button onClick={logout}>Log out</button>
        <span className="msg">{msg}</span>
      </div>
    </div>
  );
}
