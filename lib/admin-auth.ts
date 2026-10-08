import crypto from "node:crypto";
import { cookies } from "next/headers";

const COOKIE = "ahmed_admin_session";

function expectedSession() {
  const password = process.env.ADMIN_PASSWORD;
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!password || !secret) return null;
  return crypto.createHmac("sha256", secret).update(password).digest("hex");
}

export function sessionForPassword(password: string) {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret || !process.env.ADMIN_PASSWORD) return null;
  const expectedPassword = Buffer.from(process.env.ADMIN_PASSWORD);
  const actualPassword = Buffer.from(password);
  if (actualPassword.length !== expectedPassword.length || !crypto.timingSafeEqual(actualPassword, expectedPassword)) return null;
  return crypto.createHmac("sha256", secret).update(password).digest("hex");
}

export async function isAdmin() {
  const expected = expectedSession();
  if (!expected) return false;
  const cookieStore = await cookies();
  const actual = cookieStore.get(COOKIE)?.value;
  if (!actual) return false;
  const actualBuffer = Buffer.from(actual);
  const expectedBuffer = Buffer.from(expected);
  return actualBuffer.length === expectedBuffer.length && crypto.timingSafeEqual(actualBuffer, expectedBuffer);
}

export const adminCookie = COOKIE;
