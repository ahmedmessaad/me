import type { Metadata } from "next";
import { site } from "@/data/site";
import { allWork, drawerGroups } from "@/lib/work";
import Drawer from "@/components/Drawer";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Selected work: medical AI, computer vision and reinforcement learning projects",
  description: "Projects by Ahmed Messaad: blood cell detection, brain tumor MRI classification, ICU treatment reinforcement learning, healthcare cost prediction and full-stack ML products.",
  alternates: { canonical: "/work" },
};

export default function WorkIndex() {
  const list = allWork();
  const groups = [...new Set(list.map((w) => w.group))];
  return (
    <>
      <Drawer name={site.meta.name} groups={drawerGroups()} home="/" menu={site.menu} />
      <main className="wrap case idx" id="top">
        <a className="back" href="/">Home</a>
        <p className="kind">{site.work.label}</p>
        <h1>Selected work</h1>
        <p className="lead">{site.work.note}</p>
        {groups.map((g) => (
          <section key={g}>
            <h2 className="grp">{g}</h2>
            {list.filter((w) => w.group === g).map((w) => (
              <a className="row" key={w.slug} href={`/work/${w.slug}`}>
                <i>{String(list.indexOf(w) + 1).padStart(2, "0")}</i>
                <h3>{w.name}</h3>
                <em>{w.stats[0]?.value ?? "Code"}</em>
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
