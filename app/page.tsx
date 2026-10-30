import type { CSSProperties } from "react";
import { site } from "@/data/site";
import Drawer from "@/components/Drawer";
import Detect from "@/components/Detect";
import Footer from "@/components/Footer";
import { Emph, external } from "@/components/Emph";
import { drawerGroups } from "@/lib/work";

export default function Home() {
  const { meta, hero, work, featured, projects, more, publications, about, footer } = site;
  const groups = drawerGroups();
  const all = [...projects.map((p) => ({ name: p.name, text: p.description, tag: p.kind.split(" · ")[0], href: `/work/${p.slug}` })),
    ...more.map((m) => ({ name: m.name, text: m.kind, tag: m.link.label, href: m.link.href }))];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebSite", name: meta.name, alternateName: ["Messaad", "Ahmed Messaad portfolio"], url: `${meta.url}/` }) }} />
      <Drawer name={meta.name} groups={groups} menu={site.menu} />
      <main id="top">
        <section className="hero wrap">
          {hero.eyebrow && <small>{hero.eyebrow}</small>}
          <h1>{hero.titleLines.map((l, i) => (<span className="ln" key={l}><span style={{ "--i": i } as CSSProperties}>{l}</span>{" "}</span>))}</h1>
          <div className="lede">
            <p>{hero.lead}</p>
            <a href={hero.primaryCta.href}>{hero.primaryCta.label}</a>
          </div>

          <div className="plate" id="work">
            <div className="pl-media">
            <div className="cap"><b>{featured.title}</b><span>{featured.label.split(" · ").pop()}</span></div>
            <Detect />
            <div className="cap"><span>{featured.pipelineCaption}. Simulated here; tap to run.</span></div>
            </div>
            <div className="pl-info">
            <div className="nums">
              {featured.stats.map((s) => (<div key={s.label}><strong>{s.value}</strong><span>{s.label}</span></div>))}
            </div>
            <p className="cap"><span>{featured.description} <a href={`/work/${featured.slug}`} style={{ color: "var(--ink)", borderBottom: "1px solid" }}>More on {featured.title}</a></span></p>
            </div>
          </div>

          <div className="list">
            <h2>Projects</h2>
            <p className="note">{work.note}</p>
            {all.map((p) => (
              <a className="row" key={p.name} href={p.href} {...(p.href.startsWith("/") ? {} : external(p.href))}>
                <h3>{p.name}</h3><em>{p.tag}</em><p>{p.text}</p>
              </a>
            ))}
            <a className="all" href="/work">All projects</a>
          </div>

          <div className="about" id="about">
            {about.statement && <p><Emph text={about.statement} /></p>}
            <div className="about-grid">
              <figure className="portrait">
                <img src={about.photo} alt={about.photoAlt} width={900} height={918} loading="lazy" />
              </figure>
              <div className="about-body">
                {about.paragraphs.map((t) => <p key={t}>{t}</p>)}
                <p>Email is the best way to reach me: <a href={`mailto:${meta.email}`} style={{ borderBottom: "1px solid" }}>{meta.email}</a></p>
                <dl className="facts">
                  {about.facts.map((f) => (<div key={f.label}><dt>{f.label}</dt><dd>{f.value}</dd></div>))}
                </dl>
              </div>
            </div>
          </div>

          <div className="list" id="publications">
            <h2>{publications.heading.replace("\n", " ")}</h2>
            {publications.items.map((p) => (
              <a className="row" key={p.title} href={p.link.href} {...external(p.link.href)}>
                <h3>{p.title}</h3><em>{p.note}</em><p>{p.award}. {p.description}</p>
              </a>
            ))}
          </div>
        </section>
      </main>
      <Footer meta={meta} footer={footer} />
    </>
  );
}
