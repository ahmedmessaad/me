import type { Metadata } from "next";
import { isAuthed } from "@/lib/auth";
import { loadLatest } from "@/lib/github";
import AdminEditor from "@/components/AdminEditor";
import AdminLogin from "@/components/AdminLogin";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Admin", robots: { index: false, follow: false } };

export default async function AdminPage() {
  if (!(await isAuthed())) return <AdminLogin />;
  const { data, source } = await loadLatest();
  return <AdminEditor initial={data} source={source} />;
}
