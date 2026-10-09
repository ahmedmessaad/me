import { NextResponse } from "next/server";
import { isAuthed } from "@/lib/auth";
import { commitData, isSiteData, loadLatest } from "@/lib/github";

export async function GET() {
  if (!(await isAuthed())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  return NextResponse.json(await loadLatest());
}

export async function PUT(req: Request) {
  if (!(await isAuthed())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await req.text();
  if (body.length > 500_000) return NextResponse.json({ error: "Payload too large" }, { status: 413 });
  let data: unknown;
  try {
    data = JSON.parse(body);
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  if (!isSiteData(data)) return NextResponse.json({ error: "Missing required sections" }, { status: 400 });
  try {
    await commitData(data);
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ error: e instanceof Error ? e.message : "Commit failed" }, { status: 502 });
  }
}
