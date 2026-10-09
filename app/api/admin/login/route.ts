import { NextResponse } from "next/server";
import { COOKIE, checkPassword, createSessionValue, sessionCookieOptions } from "@/lib/auth";

const attempts = new Map<string, { n: number; t: number }>();

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  const now = Date.now();
  const rec = attempts.get(ip);
  if (rec && now - rec.t < 15 * 60_000 && rec.n >= 5) {
    return NextResponse.json({ error: "Too many attempts. Try again in 15 minutes." }, { status: 429 });
  }

  const body = (await req.json().catch(() => null)) as { password?: string } | null;
  if (!body?.password || !checkPassword(body.password)) {
    attempts.set(ip, { n: (rec && now - rec.t < 15 * 60_000 ? rec.n : 0) + 1, t: rec && now - rec.t < 15 * 60_000 ? rec.t : now });
    await new Promise((r) => setTimeout(r, 600));
    return NextResponse.json({ error: "Wrong password." }, { status: 401 });
  }

  attempts.delete(ip);
  const res = NextResponse.json({ ok: true });
  res.cookies.set(COOKIE, createSessionValue(), sessionCookieOptions);
  return res;
}
