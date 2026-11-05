import type { Metadata } from "next";
import { site } from "@/data/site";
import { allWork, drawerGroups } from "@/lib/work";
import Drawer from "@/components/Drawer";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Projects: medical AI, computer vision and reinforcement learning projects",
  description: "Projects by Ahmed Messaad: blood cell detection, brain tumor MRI classification, ICU treatment reinforcement learning, healthcare cost prediction and full-stack ML products.",
  alternates: { canonical: "/work" },
  openGraph: { title: "Projects by Ahmed Messaad", description: "Medical AI, computer vision and reinforcement learning projects by Ahmed Messaad.", url: "/work", type: "website", images: [{ url: "/og.png", alt: "Ahmed Messaad, medical AI" }] },
  twitter: { card: "summary_large_image", title: "Projects by Ahmed Messaad", images: ["/og.png"] },
};

export default function WorkIndex() {
  const list = allWork();
  const groups = [...new Set(list.map((w) => w.group))];
  const ld = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "CollectionPage", name: "Projects", url: `${site.meta.url}/work`, inLanguage: "en", about: "Medical AI, computer vision and reinforcement learning", author: { "@type": "Person", name: site.meta.name, url: site.meta.url } },
      { "@type": "ItemList", itemListElement: list.map((w, i) => ({ "@type": "ListItem", position: i + 1, name: w.name, url: `${site.meta.url}/work/${w.slug}` })) },
      { "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: site.meta.url }, { "@type": "ListItem", position: 2, name: "Projects", item: `${site.meta.url}/work` }] },
    ],
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <Drawer name={site.meta.name} groups={drawerGroups()} home="/" menu={site.menu} />
      <main className="wrap case idx" id="top">
        <a className="back" href="/">Home</a>
        <h1>Projects</h1>
        <p className="lead">{site.work.note}</p>
        {groups.map((g) => (
          <section key={g}>
            <h2 className="grp">{g}</h2>
            {list.filter((w) => w.group === g).map((w) => (
              <a className="row" key={w.slug} href={`/work/${w.slug}`}>
                <h3>{w.name}</h3>
                <em>{w.stack.slice(0, 2).join(", ")}</em>
                <p>{w.description}</p>
              </a>
            ))}
          </section>
        ))}
      </main>
      <Footer meta={site.meta} footer={site.footer} />
    </>
  );
}
