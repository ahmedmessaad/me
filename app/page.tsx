import { site } from "@/data/site";
import Drawer from "@/components/Drawer";
import Detect from "@/components/Detect";
import Footer from "@/components/Footer";
import { Emph, external } from "@/components/Emph";
import { drawerGroups } from "@/lib/work";

export default function Home() {
  const { meta, hero, featured, projects, more, publications, about, footer } = site;
  const [first, ...rest] = meta.name.split(" ");
  const groups = drawerGroups();
  const all = [...projects.map((p) => ({ name: p.name, text: p.description, tag: p.result.split(" ")[0], href: `/work/${p.slug}` })),
    ...more.map((m) => ({ name: m.name, text: m.kind, tag: m.link.label, href: m.link.href }))];

  return (
    <>
      <Drawer name={meta.name} groups={groups} />
      <main id="top">
        <section className="hero wrap">
          <small>{hero.eyebrow}</small>
          <h1>{first}<br />{rest.join(" ")}</h1>
          <div className="lede">
            <p>{hero.lead}</p>
            <a href={hero.primaryCta.href}>{hero.primaryCta.label}</a>
          </div>

          <div className="plate" id="work">
            <div className="cap"><b>Project: {featured.title}</b><span>{featured.label.split(" · ").pop()}</span></div>
            <Detect />
            <div className="cap"><span>{featured.pipelineCaption}. Simulated here; tap to run.</span></div>
            <div className="nums">
              {featured.stats.map((s) => (<div key={s.label}><strong>{s.value}</strong><span>{s.label}</span></div>))}
            </div>
            <p className="cap"><span>{featured.description} <a href={`/work/${featured.slug}`} style={{ color: "var(--ink)", borderBottom: "1px solid" }}>Read the case study</a></span></p>
          </div>

          <div className="list">
            <h2>Selected work</h2>
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

          <div className="about" id="about"><p><Emph text={about.statement} /></p></div>
        </section>
      </main>
      <Footer meta={meta} footer={footer} />
    </>
  );
}
