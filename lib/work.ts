import { site } from "@/data/site";

export type Work = {
  slug: string; name: string; kind: string; group: string; description: string;
  stack: string[]; stats: { value: string; label: string }[]; link: { label: string; href: string };
  writeup: string[]; seoTitle: string; seoDescription: string;
  facts: { label: string; value: string }[]; insight: string; image: string; imageAlt: string;
};

export function allWork(): Work[] {
  const { featured: f, projects } = site;
  const head: Work = {
    slug: f.slug, name: f.title, kind: f.label, group: "Clinical AI", description: f.description,
    stack: f.chips, stats: f.stats, link: f.link, writeup: f.writeup, seoTitle: f.seoTitle, seoDescription: f.seoDescription,
    facts: f.facts, insight: f.insight, image: "", imageAlt: "",
  };
  const rest = projects.map<Work>((p) => ({
    slug: p.slug, name: p.name, kind: p.kind, group: p.group, description: p.description,
    stack: p.stack, stats: p.stats, link: p.link, writeup: p.writeup, seoTitle: p.seoTitle, seoDescription: p.seoDescription,
    facts: p.facts, insight: p.insight, image: p.image, imageAlt: p.imageAlt,
  }));
  return [head, ...rest];
}

export function drawerGroups() {
  const names = [...new Set(allWork().map((w) => w.group))];
  return names.map((name) => ({
    name,
    items: allWork().filter((w) => w.group === name).map((w) => ({ name: w.name.split(" — ")[0], href: `/work/${w.slug}` })),
  }));
}
