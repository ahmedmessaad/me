import type { CSSProperties } from "react";
import { site } from "@/data/site";
import Drawer from "@/components/Drawer";
import CountUp from "@/components/CountUp";
import Detect from "@/components/Detect";
import Footer from "@/components/Footer";
import { Emph, external } from "@/components/Emph";
import { drawerGroups } from "@/lib/work";

export default function Home() {
  const { meta, hero, work, featured, projects, more, publications, about, footer } = site;
  const groups = drawerGroups();
  const all = [...projects.map((p) => ({ name: p.name, text: p.description, tag: p.stats[0]?.value ?? "Code", href: `/work/${p.slug}` })),
    ...more.map((m) => ({ name: m.name, text: m.kind, tag: m.link.label, href: m.link.href }))];

  return (
    <>
      <Drawer name={meta.name} groups={groups} menu={site.menu} />
      <main id="top">
        <section className="hero wrap">
          <small>{hero.eyebrow}</small>
          <h1>{hero.titleLines.map((l, i) => (<span className="ln" key={l}><span style={{ "--i": i } as CSSProperties}>{l}</span></span>))}</h1>
          <div className="lede">
            <p>{hero.lead}</p>
            <a href={hero.primaryCta.href}>{hero.primaryCta.label}</a>
          </div>

          <div className="plate" id="work">
            <div className="pl-media">
            <div className="cap"><b>Project: {featured.title}</b><span>{featured.label.split(" · ").pop()}</span></div>
            <Detect />
            <div className="cap"><span>{featured.pipelineCaption}. Simulated here; tap to run.</span></div>
            </div>
            <div className="pl-info">
            <div className="nums">
              {featured.stats.map((s) => (<div key={s.label}><CountUp value={s.value} /><span>{s.label}</span></div>))}
            </div>
            <p className="cap"><span>{featured.description} <a href={`/work/${featured.slug}`} style={{ color: "var(--ink)", borderBottom: "1px solid" }}>Read the case study</a></span></p>
            </div>
          </div>

          <div className="list">
            <h2>Selected work</h2>
            <p className="note">{work.note}</p>
            {all.map((p, i) => (
              <a className="row" key={p.name} href={p.href} {...(p.href.startsWith("/") ? {} : external(p.href))}>
                <i>{String(i + 1).padStart(2, "0")}</i><h3>{p.name}</h3><em>{p.tag}</em><p>{p.text}</p>
              </a>
            ))}
          </div>

          <div className="list" id="publications">
            <h2>{publications.heading.replace("\n", " ")}</h2>
            {publications.items.map((p, i) => (
              <a className="row" key={p.title} href={p.link.href} {...external(p.link.href)}>
                <i>{String(i + 1).padStart(2, "0")}</i><h3>{p.title}</h3><em>{p.note}</em><p>{p.status}. {p.award}.</p>
              </a>
            ))}
          </div>

          <div className="about" id="about">
            <p><Emph text={about.statement} /></p>
            <div className="about-grid">
              <figure className="portrait">
                <img src={about.photo} alt={about.photoAlt} width={900} height={918} loading="lazy" />
              </figure>
              <div className="about-body">
                {about.paragraphs.map((t) => <p key={t}>{t}</p>)}
                <dl className="facts">
                  {about.facts.map((f) => (<div key={f.label}><dt>{f.label}</dt><dd>{f.value}</dd></div>))}
                </dl>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer meta={meta} footer={footer} />
    </>
  );
}
