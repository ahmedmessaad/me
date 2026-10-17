import type { Metadata, Viewport } from "next";
import { DM_Mono, Instrument_Serif } from "next/font/google";
import localFont from "next/font/local";
import { site } from "@/data/site";
import "./globals.css";

const serif = Instrument_Serif({ subsets: ["latin"], weight: "400", style: ["normal", "italic"], variable: "--f-serif" });
const sans = localFont({ src: "./fonts/sellendra.ttf", variable: "--f-sans", display: "swap" });
const mono = DM_Mono({ subsets: ["latin"], weight: "400", variable: "--f-mono" });

const { meta } = site;

export const metadata: Metadata = {
  metadataBase: new URL(meta.url),
  title: meta.title,
  description: meta.description,
  alternates: { canonical: "/" },
  icons: {
    icon: [{ url: "/favicon.ico", sizes: "48x48" }, { url: "/icon-192.png", sizes: "192x192", type: "image/png" }],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  openGraph: { title: meta.title, description: meta.description, url: meta.url, siteName: meta.name, type: "website" },
  twitter: { card: "summary_large_image", title: meta.title, description: meta.description },
  verification: meta.googleVerification ? { google: meta.googleVerification } : undefined,
};

export const viewport: Viewport = { viewportFit: "cover", themeColor: "#ebe7dd" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const ld = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: meta.name,
    url: meta.url,
    email: meta.email,
    jobTitle: "PhD Researcher and AI/ML Engineer",
    sameAs: site.footer.socials.filter((s) => s.type !== "email").map((s) => s.href),
  };
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable} ${mono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: "try{var t=localStorage.getItem('theme');if(t)document.documentElement.dataset.theme=t}catch(e){}" }} />
      </head>
      <body>
        <div className="prog" aria-hidden="true" />
        {children}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      </body>
    </html>
  );
}
