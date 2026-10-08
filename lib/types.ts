export type LinkItem = { label: string; href: string };
export type Project = { number: string; kind: string; name: string; description: string; resultLabel: string; result: string; stack: string[]; linkLabel: string; href: string };
export type MoreWork = { number: string; name: string; kind: string; linkLabel: string; href: string };
export type Publication = { status: string; title: string; description: string; tags: string[]; award?: string; linkLabel: string; href: string; note: string };
export type SiteData = {
  name: string; title: string; description: string;
  hero: { eyebrow: string; headline: string[]; lead: string; primaryLabel: string; primaryHref: string; cvLabel: string; cvHref: string };
  stats: { value: string; label: string }[]; marquee: string[];
  work: { label: string; heading: string[]; note: string; featured: { eyebrow: string; name: string; description: string; chips: string[]; linkLabel: string; href: string; pipeline: { num: string; title: string; description: string }[]; pipelineFoot: string[] }; projects: Project[]; more: MoreWork[] };
  publications: { label: string; heading: string[]; note: string; entries: Publication[] };
  about: { label: string; statement: string; paragraphs: string[]; facts: { label: string; value: string }[] };
  contact: { label: string; heading: string; description: string; buttonLabel: string; email: string };
  footer: {
    copyrightName: string; links: LinkItem[];
  };
};
