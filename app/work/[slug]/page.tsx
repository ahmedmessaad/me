import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { site } from "@/data/site";
import { allWork, drawerGroups } from "@/lib/work";
import Drawer from "@/components/Drawer";
import Footer from "@/components/Footer";
import Detect from "@/components/Detect";
import LivePreview from "@/components/LivePreview";
import { external } from "@/components/Emph";

export const dynamicParams = false;
export const generateStaticParams = () => allWork().map((w) => ({ slug: w.slug }));

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const w = allWork().find((x) => x.slug === slug);
  if (!w) return {};
  return {
    title: w.seoTitle,
    description: w.seoDescription,
    alternates: { canonical: `/work/${w.slug}` },
    openGraph: { title: w.seoTitle, description: w.seoDescription, url: `/work/${w.slug}`, type: "article", images: [{ url: w.image || "/og.png", alt: w.imageAlt || w.name }] },
    twitter: { card: "summary_large_image", title: w.seoTitle, description: w.seoDescription, images: [w.image || "/og.png"] },
  };
}

export default async function Case({ params }: Props) {
  const { slug } = await params;
  const list = allWork();
  const i = list.findIndex((x) => x.slug === slug);
  if (i < 0) notFound();
  const w = list[i];
  const next = list[(i + 1) % list.length];
  const ld = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: w.name,
    headline: w.seoTitle,
    inLanguage: "en",
    isPartOf: { "@type": "WebSite", name: site.meta.name, url: site.meta.url },
    description: w.seoDescription,
    keywords: w.stack.join(", "),
    url: `${site.meta.url}/work/${w.slug}`,
    image: `${site.meta.url}${w.image || "/og.png"}`,
    author: { "@type": "Person", name: site.meta.name, url: site.meta.url },
  };
  const crumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: site.meta.url },
      { "@type": "ListItem", position: 2, name: "Projects", item: `${site.meta.url}/work` },
      { "@type": "ListItem", position: 3, name: w.name, item: `${site.meta.url}/work/${w.slug}` },
    ],
  };
  return (
    <>
      <Drawer name={site.meta.name} groups={drawerGroups()} home="/" menu={site.menu} />
      <main className="wrap case" id="top">
        <a className="back" href="/work">All projects</a>
        <h1>{w.name}</h1>
        <p className="lead">{w.description}</p>
        {w.slug === site.featured.slug && <div className="figure"><Detect /></div>}
        {w.slug === "specmob" && <LivePreview url={w.link.href} alt={w.imageAlt} caption={w.imageCaption} />}
        {w.image && (<figure className="figure"><img src={w.image} alt={w.imageAlt} fetchPriority="high" />{w.imageCaption && <figcaption>{w.imageCaption}</figcaption>}</figure>)}
        <div className="body">{w.writeup.map((p) => <p key={p}>{p}</p>)}</div>
        <div className="chips">{w.stack.map((c) => <span key={c}>{c}</span>)}</div>
        <a className="ext" href={w.link.href} {...external(w.link.href)}>{w.link.label}</a>
        <a className="row" href={`/work/${next.slug}`}><h3>{next.name}</h3><em>Read</em></a>
      </main>
      <Footer meta={site.meta} footer={site.footer} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(crumbs) }} />
    </>
  );
}
