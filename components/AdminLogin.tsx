"use client";

import { useState } from "react";

export default function AdminLogin() {
  const [pw, setPw] = useState("");
  const [err, setErr] = useState("");

  async function submit() {
    const res = await fetch("/api/admin/login", { method: "POST", body: JSON.stringify({ password: pw }) });
    if (res.ok) return location.reload();
    setErr(((await res.json().catch(() => ({}))) as { error?: string }).error ?? "Login failed.");
  }

  return (
    <div className="adm" style={{ maxWidth: 420 }}>
      <h1>Admin</h1>
      <label htmlFor="pw">Password</label>
      <input id="pw" type="password" value={pw} autoFocus onChange={(e) => setPw(e.target.value)} onKeyDown={(e) => e.key === "Enter" && submit()} />
      <div className="bar2"><button className="pri" onClick={submit}>Log in</button><span className="msg">{err}</span></div>
    </div>
  );
}
