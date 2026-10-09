import { site as bundled } from "@/data/site";
import type { SiteData } from "./types";

const API = "https://api.github.com";

function cfg() {
  const token = process.env.GITHUB_TOKEN;
  const rawRepo = process.env.GITHUB_REPO;
  if (!token || !rawRepo) throw new Error("GITHUB_TOKEN or GITHUB_REPO is not set");
  const repo = rawRepo.includes("/") ? rawRepo : `${process.env.GITHUB_OWNER}/${rawRepo}`;
  return {
    token,
    repo,
    branch: process.env.GITHUB_BRANCH || "main",
    path: process.env.DATA_PATH || "data/site.ts",
  };
}

function headers(token: string) {
  return {
    Authorization: `Bearer ${token}`,
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };
}

export function renderFile(data: SiteData) {
  return `import type { SiteData } from "@/lib/types";\n\nexport const site: SiteData = ${JSON.stringify(data, null, 2)};\n`;
}

function parseFile(text: string): SiteData | null {
  const m = text.match(/export const site: SiteData = ([\s\S]*?);\s*$/);
  if (!m) return null;
  try {
    return JSON.parse(m[1]) as SiteData;
  } catch {
    return null;
  }
}

async function getFile() {
  const { token, repo, branch, path } = cfg();
  const res = await fetch(`${API}/repos/${repo}/contents/${path}?ref=${branch}`, {
    headers: headers(token),
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`GitHub read failed (${res.status})`);
  const json = (await res.json()) as { sha: string; content: string };
  return { sha: json.sha, text: Buffer.from(json.content, "base64").toString("utf8") };
}

export async function loadLatest(): Promise<{ data: SiteData; source: "github" | "bundled" }> {
  try {
    const { text } = await getFile();
    const parsed = parseFile(text);
    if (parsed) return { data: parsed, source: "github" };
  } catch {}
  return { data: bundled, source: "bundled" };
}

export async function commitData(data: SiteData) {
  const { token, repo, branch, path } = cfg();
  const { sha } = await getFile();
  const res = await fetch(`${API}/repos/${repo}/contents/${path}`, {
    method: "PUT",
    headers: { ...headers(token), "Content-Type": "application/json" },
    body: JSON.stringify({
      message: "content: update site data from admin",
      content: Buffer.from(renderFile(data), "utf8").toString("base64"),
      sha,
      branch,
    }),
  });
  if (!res.ok) {
    const detail = await res.text();
    throw new Error(`GitHub write failed (${res.status}): ${detail.slice(0, 200)}`);
  }
}

export function isSiteData(v: unknown): v is SiteData {
  if (!v || typeof v !== "object") return false;
  const o = v as Record<string, unknown>;
  const keys = ["meta", "hero", "work", "featured", "projects", "more", "publications", "about", "footer"];
  return keys.every((k) => k in o && o[k] !== null && typeof o[k] === "object");
}
