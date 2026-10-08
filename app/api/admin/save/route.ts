import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/admin-auth";

function clean(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(clean);
  if (value && typeof value === "object") return Object.fromEntries(Object.entries(value as Record<string, unknown>).map(([k,v]) => [k, clean(v)]));
  if (typeof value === "string") return value.replace(/\r\n/g, "\n");
  return value;
}

function tsLiteral(value: unknown, level = 0): string {
  const pad = "  ".repeat(level);
  const next = "  ".repeat(level + 1);
  if (typeof value === "string") return JSON.stringify(value);
  if (typeof value === "number" || typeof value === "boolean") return String(value);
  if (value === null) return "null";
  if (Array.isArray(value)) {
    if (!value.length) return "[]";
    return `[\n${value.map(v => `${next}${tsLiteral(v, level + 1)}`).join(",\n")}\n${pad}]`;
  }
  const entries = Object.entries(value as Record<string, unknown>);
  return ` {\n${entries.map(([k,v]) => `${next}${/^[A-Za-z_$][\w$]*$/.test(k) ? k : JSON.stringify(k)}: ${tsLiteral(v, level + 1)}`).join(",\n")}\n${pad}}`;
}

function makeDataFile(data: unknown) {
  return `import type { SiteData } from "@/lib/types";\n\nexport const siteData: SiteData = ${tsLiteral(data)};\n`;
}

export async function POST(request: Request) {
  if (!(await isAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const body = await request.json();
    const data = clean(body?.data);
    if (!data || typeof data !== "object") return NextResponse.json({ error: "Missing data" }, { status: 400 });

    const owner = process.env.GITHUB_OWNER || "ahmedmessaad";
    const repo = process.env.GITHUB_REPO || "me";
    const branch = process.env.GITHUB_BRANCH || "main";
    const path = process.env.GITHUB_DATA_PATH || "data.ts";
    const token = process.env.GITHUB_TOKEN;
    if (!token) return NextResponse.json({ error: "GITHUB_TOKEN is not configured" }, { status: 500 });

    const api = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;
    const headers = { Authorization: `Bearer ${token}`, Accept: "application/vnd.github+json", "X-GitHub-Api-Version": "2022-11-28" };
    const current = await fetch(`${api}?ref=${encodeURIComponent(branch)}`, { headers, cache: "no-store" });
    if (!current.ok) return NextResponse.json({ error: `GitHub read failed (${current.status})` }, { status: 502 });
    const currentJson = await current.json();
    const content = Buffer.from(makeDataFile(data), "utf8").toString("base64");

    const put = await fetch(api, {
      method: "PUT",
      headers: { ...headers, "Content-Type": "application/json" },
      body: JSON.stringify({ message: "Update portfolio content", content, sha: currentJson.sha, branch })
    });
    if (!put.ok) {
      const detail = await put.text();
      return NextResponse.json({ error: `GitHub commit failed (${put.status})`, detail }, { status: 502 });
    }
    const result = await put.json();
    return NextResponse.json({ ok: true, commit: result.commit?.html_url ?? null });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Save failed" }, { status: 500 });
  }
}
