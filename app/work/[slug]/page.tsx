import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { site } from "@/data/site";
import { allWork, drawerGroups } from "@/lib/work";
import Drawer from "@/components/Drawer";
import CountUp from "@/components/CountUp";
import Footer from "@/components/Footer";
import Detect from "@/components/Detect";
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
    openGraph: { title: w.seoTitle, description: w.seoDescription, url: `/work/${w.slug}`, type: "article", images: w.image ? [{ url: w.image }] : undefined },
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
    name: w.seoTitle,
    description: w.seoDescription,
    keywords: w.stack.join(", "),
    url: `${site.meta.url}/work/${w.slug}`,
    ...(w.image ? { image: `${site.meta.url}${w.image}` } : {}),
    author: { "@type": "Person", name: site.meta.name, url: site.meta.url },
  };
  return (
    <>
      <Drawer name={site.meta.name} groups={drawerGroups()} home="/" menu={site.menu} />
      <main className="wrap case" id="top">
        <a className="back" href="/work">All work</a>
        <p className="kind">{w.kind}</p>
        <h1>{w.name}</h1>
        <p className="lead">{w.description}</p>
        {w.slug === site.featured.slug && <div className="figure"><Detect /></div>}
        {w.image && (<figure className="figure"><img src={w.image} alt={w.imageAlt} loading="lazy" />{w.imageCaption && <figcaption>{w.imageCaption}</figcaption>}</figure>)}
        <div className="nums">
          {w.stats.map((s) => (<div key={s.label}><CountUp value={s.value} /><span>{s.label}</span></div>))}
        </div>
        <dl className="facts">{w.facts.map((f) => (<div key={f.label}><dt>{f.label}</dt><dd>{f.value}</dd></div>))}</dl>
        <div className="body">{w.writeup.map((p) => <p key={p}>{p}</p>)}</div>
        {w.insight && <blockquote className="insight">{w.insight}</blockquote>}
        <div className="chips">{w.stack.map((c) => <span key={c}>{c}</span>)}</div>
        <a className="ext" href={w.link.href} {...external(w.link.href)}>{w.link.label}</a>
        <a className="row" href={`/work/${next.slug}`}><i>Next</i><h3>{next.name}</h3><em>Read</em></a>
      </main>
      <Footer meta={site.meta} footer={site.footer} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
    </>
  );
}
