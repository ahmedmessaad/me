import { NextResponse } from "next/server";
import { adminCookie, sessionForPassword } from "@/lib/admin-auth";

export async function POST(request: Request) {
  try {
    const { password } = await request.json();
    const session = typeof password === "string" ? sessionForPassword(password) : null;
    if (!session) return NextResponse.json({ error: "Invalid password" }, { status: 401 });
    const response = NextResponse.json({ ok: true });
    response.cookies.set(adminCookie, session, { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "strict", path: "/", maxAge: 60 * 60 * 24 * 7 });
    return response;
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
