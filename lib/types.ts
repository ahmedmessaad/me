export type Link = { label: string; href: string };

export type SiteData = {
  meta: {
    name: string;
    title: string;
    description: string;
    url: string;
    email: string;
    googleVerification: string;
  };
  hero: {
    eyebrow: string;
    titleLines: string[];
    lead: string;
    primaryCta: Link;
    cv: Link;
    badges: { value: string; label: string }[];
    marquee: string[];
  };
  work: { label: string; heading: string; note: string };
  featured: {
    label: string;
    title: string;
    description: string;
    chips: string[];
    link: Link;
    pipelineCaption: string;
    steps: { kind: string; title: string; text: string }[];
    pipelineFoot: string[];
    stats: { value: string; label: string }[];
    slug: string;
    seoTitle: string;
    seoDescription: string;
    writeup: string[];
    facts: { label: string; value: string }[];
    insight: string;
  };
  projects: {
    image: string;
    imageAlt: string;
    insight: string;
    facts: { label: string; value: string }[];
    stats: { value: string; label: string }[];
    slug: string;
    seoTitle: string;
    seoDescription: string;
    writeup: string[];
    group: string;
    kind: string;
    name: string;
    description: string;
    resultLabel: string;
    result: string;
    stack: string[];
    link: Link;
  }[];
  more: { name: string; kind: string; link: Link }[];
  publications: {
    label: string;
    heading: string;
    note: string;
    items: {
      status: string;
      title: string;
      description: string;
      tags: string[];
      award: string;
      link: Link;
      note: string;
    }[];
  };
  about: {
    label: string;
    statement: string;
    paragraphs: string[];
    facts: { label: string; value: string }[];
    photo: string;
    photoAlt: string;
  };
  footer: {
    blurb: string;
    wordmark: string;
    columns: { title: string; links: Link[] }[];
    socials: { type: string; label: string; href: string }[];
  };
};
