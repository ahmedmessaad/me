import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

export const COOKIE = "admin_session";
const MAX_AGE = 60 * 60 * 12;

function secret() {
  const s = process.env.SESSION_SECRET || process.env.ADMIN_SESSION_SECRET;
  if (!s || s.length < 16) throw new Error("SESSION_SECRET is missing or too short");
  return s;
}

function sign(payload: string) {
  return createHmac("sha256", secret()).update(payload).digest("hex");
}

function safeEqual(a: string, b: string) {
  const ba = Buffer.from(a);
  const bb = Buffer.from(b);
  return ba.length === bb.length && timingSafeEqual(ba, bb);
}

export function checkPassword(input: string) {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) return false;
  const h = (v: string) => createHmac("sha256", "pw").update(v).digest("hex");
  return safeEqual(h(input), h(expected));
}

export function createSessionValue() {
  const exp = Math.floor(Date.now() / 1000) + MAX_AGE;
  return `${exp}.${sign(String(exp))}`;
}

export const sessionCookieOptions = {
  httpOnly: true,
  sameSite: "strict" as const,
  secure: process.env.NODE_ENV === "production",
  path: "/",
  maxAge: MAX_AGE,
};

export async function isAuthed() {
  const value = (await cookies()).get(COOKIE)?.value;
  if (!value) return false;
  const [exp, sig] = value.split(".");
  if (!exp || !sig) return false;
  if (Number(exp) < Date.now() / 1000) return false;
  return safeEqual(sig, sign(exp));
}
