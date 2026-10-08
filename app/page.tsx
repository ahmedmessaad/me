"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { siteData } from "@/data";

function ExternalLink({ href, children, className = "" }: { href: string; children: React.ReactNode; className?: string }) {
  const external = /^https?:\/\//.test(href);
  return <a className={className} href={href} target={external ? "_blank" : undefined} rel={external ? "noopener noreferrer" : undefined}>{children}</a>;
}

export default function Home() {
  const [moreOpen, setMoreOpen] = useState(false);
  const [topScrolled, setTopScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [backTop, setBackTop] = useState(false);
  const [activeSection, setActiveSection] = useState("work");
  const moreTimers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const reduced = useMemo(() => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches, []);

  useEffect(() => {
    const onScroll = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0);
      setTopScrolled(window.scrollY > 20);
      setBackTop(window.scrollY > 500);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = ["work", "publications", "about", "contact"];
    const observers = sections.map(id => {
      const section = document.getElementById(id);
      if (!section) return null;
      return new IntersectionObserver(entries => {
        entries.forEach(entry => { if (entry.isIntersecting) setActiveSection(id); });
      }, { rootMargin: "-35% 0px -55% 0px" });
    });
    sections.forEach((id, i) => { const section = document.getElementById(id); if (section && observers[i]) observers[i]!.observe(section); });
    return () => observers.forEach(obs => obs?.disconnect());
  }, []);

  useEffect(() => {
    const h1 = document.getElementById("heroH1");
    const cursor = document.getElementById("h1Cursor");
    if (!h1) return;

    const words = Array.from(h1.querySelectorAll<HTMLElement>(".tw-word span"));
    const timers: ReturnType<typeof setTimeout>[] = [];

    if (reduced) {
      words.forEach(word => word.classList.add("in"));
      if (cursor) cursor.style.display = "none";
      h1.style.opacity = "1";
      h1.style.transform = "none";
      return;
    }

    if (cursor) cursor.style.opacity = "1";

    words.forEach((word, i) => {
      timers.push(setTimeout(() => {
        word.classList.add("in");
        if (i === words.length - 1 && cursor) {
          timers.push(setTimeout(() => {
            cursor.style.animation = "none";
            cursor.style.opacity = "0";
          }, 900));
        }
      }, 120 + i * 80));
    });

    return () => timers.forEach(clearTimeout);
  }, [reduced]);

  useEffect(() => {
    if (reduced) return;
    const items = document.querySelectorAll<HTMLElement>(".sr");
    const obs = new IntersectionObserver(entries => entries.forEach(e => e.target.classList.toggle("visible", e.isIntersecting)), { threshold: 0.1, rootMargin: "0px 0px -60px 0px" });
    items.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, [reduced]);

  useEffect(() => {
    const pipeline = document.querySelectorAll<HTMLElement>(".pipe-step");
    const card = document.getElementById("featuredCard");
    if (reduced) { pipeline.forEach(s => s.classList.add("in")); return; }
    if (!card) return;
    let timers: ReturnType<typeof setTimeout>[] = [];
    const obs = new IntersectionObserver(([entry]) => {
      timers.forEach(clearTimeout); timers = [];
      if (entry.isIntersecting) pipeline.forEach((s, i) => { timers.push(setTimeout(() => s.classList.add("in"), i * 140)); });
      else pipeline.forEach(s => s.classList.remove("in"));
    }, { threshold: 0.35 });
    obs.observe(card);
    return () => { timers.forEach(clearTimeout); obs.disconnect(); };
  }, [reduced]);

  useEffect(() => {
    if (reduced) return;
    const orb = document.getElementById("heroOrb") as HTMLElement | null;
    const orb2 = document.getElementById("heroOrb2") as HTMLElement | null;
    const fn = () => {
      if (orb) orb.style.transform = `translateY(${window.scrollY * 0.18}px)`;
      if (orb2) orb2.style.transform = `translateY(${window.scrollY * -0.10}px)`;
    };
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, [reduced]);

  const headlineWords = siteData.hero.headline.flatMap((line, i) => i < siteData.hero.headline.length - 1 ? [line, "\n"] : [line]);
  const marqueeItems = siteData.marquee.flatMap((item, i) => i < siteData.marquee.length - 1 ? [item, "dot"] : [item]);

  return (
    <>
      <div id="progress" style={{ width: `${progress}%` }} />
      <header className={`topbar ${topScrolled ? "scrolled" : ""}`} id="topbar">
        <div className="wrap nav">
          <a className="brand" href="#top" aria-label="Ahmed Messaad home"><span className="brand-mark">A</span><span>{siteData.name}</span></a>
          <nav className="nav-links" aria-label="Main navigation">
            <a className={activeSection === "work" ? "active" : ""} href="#work">Research & Work</a><a className={activeSection === "publications" ? "active" : ""} href="#publications">Publications</a><a className={activeSection === "about" ? "active" : ""} href="#about">About</a><a className={activeSection === "contact" ? "active" : ""} href="#contact">Contact</a>
          </nav>
          <a className="nav-cta" href="#contact">Get in touch ↗</a>
        </div>
      </header>

      <main id="top">
        <section className="hero">
          <div className="hero-orb" id="heroOrb" aria-hidden="true" /><div className="hero-orb-2" id="heroOrb2" aria-hidden="true" />
          <div className="wrap hero-grid">
            <div>
              <div className="hero-eyebrow h-r">{siteData.hero.eyebrow}</div>
              <h1 className="h-r" id="heroH1">
                {headlineWords.map((word, i) => word === "\n" ? <br key={i} /> : <span className="tw-word" key={i}><span>{word}</span></span>)}
                <span className="h1-cursor" id="h1Cursor" aria-hidden="true" />
              </h1>
              <p className="hero-lead h-r">{siteData.hero.lead}</p>
              <div className="hero-actions h-r"><a className="btn-primary" href={siteData.hero.primaryHref}>{siteData.hero.primaryLabel} <span className="arr">↗</span></a><ExternalLink className="txt-link" href={siteData.hero.cvHref}>{siteData.hero.cvLabel}</ExternalLink></div>
            </div>
            <div className="hero-panel h-r">
              <div className="panel-network"><span className="panel-network-label">Model architecture</span><NetworkSvg /></div>
              <div className="panel-badges">{siteData.stats.map((s, i) => <div className="p-badge" key={i}><div className="p-badge-val">{s.value}</div><div className="p-badge-lbl">{s.label}</div></div>)}</div>
            </div>
          </div>
          <div className="marquee-wrap" style={{position:"absolute",bottom:0,left:0,right:0}} aria-hidden="true"><div className="marquee-track">{[...marqueeItems, ...marqueeItems, ...marqueeItems].map((item, i) => item === "dot" ? <i className="dot" key={i} /> : <span key={i}>{item}</span>)}</div></div>
        </section>

        <section id="work"><div className="wrap">
          <div className="sec-head sr"><div><div className="sec-label">{siteData.work.label}</div><h2>{siteData.work.heading.map((x,i)=><span key={i}>{x}{i < siteData.work.heading.length-1 && <br/>}</span>)}</h2></div><p className="sec-note">{siteData.work.note}</p></div>
          <article className="featured sr" id="featuredCard"><div className="featured-inner"><div><div className="feat-label">{siteData.work.featured.eyebrow}</div><h3>{siteData.work.featured.name}</h3><p className="feat-copy">{siteData.work.featured.description}</p><div className="feat-chips">{siteData.work.featured.chips.map(c=><span className="chip" key={c}>{c}</span>)}</div><ExternalLink className="feat-link" href={siteData.work.featured.href}>{siteData.work.featured.linkLabel} <span className="arr">↗</span></ExternalLink></div><div className="pipeline"><div className="pipe-caption">From smear image to clinical output</div><div className="pipe-row">{siteData.work.featured.pipeline.map((p,i)=><div key={p.num} style={{display:"contents"}}>{i>0 && <span className="pipe-arr" aria-hidden="true">→</span>}<div className="pipe-step"><div className="pipe-num">{p.num}</div><b>{p.title}</b><small>{p.description}</small></div></div>)}</div><div className="pipe-foot">{siteData.work.featured.pipelineFoot.map(x=><span key={x}>{x}</span>)}</div></div></div></article>
          <div className="project-grid sr sr-d1">{siteData.work.projects.map(p=><div className="proj-card" key={p.number}><div className="proj-top"><span className="proj-num">{p.number}</span><span className="proj-kind">{p.kind}</span></div><div className="proj-name">{p.name}</div><p className="proj-desc">{p.description}</p><div className="proj-result"><strong>{p.resultLabel}</strong><p>{p.result}</p></div><div className="proj-footer"><div className="proj-stack">{p.stack.map(s=><span key={s}>{s}</span>)}</div><ExternalLink className="proj-link" href={p.href}>{p.linkLabel}</ExternalLink></div></div>)}</div>
          <div className="more-wrap sr sr-d2"><button className="more-toggle" onClick={()=>{ moreTimers.current.forEach(clearTimeout); if (!moreOpen) { moreTimers.current = siteData.work.more.map((_,i)=>setTimeout(()=>{},55+i*75)); } setMoreOpen(v=>!v); }} aria-expanded={moreOpen} aria-controls="moreList">More work <span className="chevron" aria-hidden="true">▾</span></button><div className={`more-list ${moreOpen ? "open" : ""}`} id="moreList" role="region"><div className="more-inner">{siteData.work.more.map(p=><div className={`more-item ${moreOpen ? "mi-in" : ""}`} style={{transitionDelay: moreOpen ? `${55 + siteData.work.more.findIndex(x => x.number === p.number) * 75}ms` : "0ms"}} key={p.number}><span className="mi-num">{p.number}</span><span className="mi-name">{p.name}</span><span className="mi-kind">{p.kind}</span><ExternalLink className="mi-link" href={p.href}>{p.linkLabel}</ExternalLink></div>)}</div></div></div>
        </div></section>

        <section className="publications" id="publications"><div className="wrap"><div className="sec-head sr"><div><div className="sec-label">{siteData.publications.label}</div><h2>{siteData.publications.heading.map((x,i)=><span key={i}>{x}{i < siteData.publications.heading.length-1 && <br/>}</span>)}</h2></div><p className="sec-note">{siteData.publications.note}</p></div>{siteData.publications.entries.map((p,i)=><article className="publication-entry sr sr-d1" key={`${p.title}-${i}`}><div className="pub-index">{String(i+1).padStart(2,"0")}</div><div className="pub-content"><div className="pub-status">{p.status}</div><h3>{p.title}</h3><p>{p.description}</p><div className="pub-tags">{p.tags.map(t=><span key={t}>{t}</span>)}</div>{p.award && <div className="pub-award">★ <strong>{p.award}</strong></div>}<ExternalLink className="pub-link" href={p.href}>{p.linkLabel} <span aria-hidden="true">↗</span></ExternalLink></div><span className="pub-note">{p.note}</span></article>)}</div></section>

        <section className="about" id="about">
          <div className="wrap about-grid">
            <div className="sr">
              <div className="sec-label">{siteData.about.label}</div>
              <p className="about-statement">{siteData.about.statement}</p>
            </div>
            <div className="sr sr-d1">
              <div className="about-copy">
                {siteData.about.paragraphs.map((p, i) => <p key={i}>{p}</p>)}
              </div>
              <div className="about-facts">
                {siteData.about.facts.map((f, i) => <div className="fact" key={i}><small>{f.label}</small><strong>{f.value}</strong></div>)}
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer" id="contact">
        <div className="footer-main">
          <div className="wrap footer-grid">
            <div className="footer-brand-block">
              <a className="footer-brand" href="#top" aria-label="Ahmed Messaad home">
                <span className="footer-brand-mark">A</span>
                <span>{siteData.footer.copyrightName}</span>
              </a>
              <p className="footer-copy">
                PhD researcher and AI/ML engineer working across medical AI,
                deep learning, and the systems that turn research into useful products.
              </p>
              <a className="footer-email" href={`mailto:${siteData.contact.email}`}>{siteData.contact.email} ↗</a>
            </div>
            <div className="footer-column">
              <h3>Research</h3>
              <a href="#work">Selected work</a>
              <a href="#publications">Publications</a>
              <a href="#about">About</a>
            </div>
            <div className="footer-column">
              <h3>Connect</h3>
              <ExternalLink href="https://github.com/RYANX9">GitHub ↗</ExternalLink>
              <ExternalLink href="https://linkedin.com/in/ahmedmessaad">LinkedIn ↗</ExternalLink>
              <ExternalLink href="https://kaggle.com/ahmedmessaad">Kaggle ↗</ExternalLink>
            </div>
          </div>
        </div>
        <div className="footer-art" aria-hidden="true" />
        <div className="wrap footer-bottom">
          <span>© {new Date().getFullYear()} {siteData.footer.copyrightName} · All rights reserved</span>
          <div className="footer-socials">
            <ExternalLink href="https://github.com/RYANX9">GitHub</ExternalLink>
            <ExternalLink href="https://linkedin.com/in/ahmedmessaad">LinkedIn</ExternalLink>
            <a href={`mailto:${siteData.contact.email}`}>Email</a>
          </div>
        </div>
      </footer>

      <button className={`back-top ${backTop ? "show" : ""}`} onClick={()=>window.scrollTo({top:0,behavior:"smooth"})} type="button" aria-label="Back to top">↑</button>
    </>
  );
}

function NetworkSvg() {
  const input = [40,70,100,130,160], hidden1=[30,70,110,150], hidden2=[50,90,130], output=[70,110];
  const edges = [
    ...input.flatMap((y,i)=>hidden1.map((x,j)=>({x1:40,y1:y,x2:130,y2:x,d:.30+i*.05+j*.01,k:`a-${i}-${j}`}))),
    ...hidden1.flatMap((y,i)=>hidden2.map((x,j)=>({x1:130,y1:y,x2:220,y2:x,d:.70+i*.02+j*.02,k:`b-${i}-${j}`}))),
    ...hidden2.flatMap((y,i)=>output.map((x,j)=>({x1:220,y1:y,x2:300,y2:x,d:1.10+i*.04+j*.02,k:`c-${i}-${j}`})))
  ];
  return <svg className="net-svg" viewBox="0 0 320 180" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <g stroke="rgba(44,84,200,.18)" strokeWidth="1">
      {edges.map(e=><line key={e.k} x1={e.x1} y1={e.y1} x2={e.x2} y2={e.y2} strokeDasharray="240" strokeDashoffset="120" style={{animation:`edgeDraw .8s ${e.d}s var(--ease) forwards`}} />)}
    </g>
    <text x="40" y="178" textAnchor="middle" fontFamily="DM Mono,monospace" fontSize="8" fill="#a8ada9">Input</text><text x="130" y="178" textAnchor="middle" fontFamily="DM Mono,monospace" fontSize="8" fill="#a8ada9">Hidden</text><text x="220" y="178" textAnchor="middle" fontFamily="DM Mono,monospace" fontSize="8" fill="#a8ada9">Hidden</text><text x="300" y="178" textAnchor="middle" fontFamily="DM Mono,monospace" fontSize="8" fill="#a8ada9">Output</text>
    {input.map((y,i)=><circle key={`i-${i}`} cx="40" cy={y} r="5" fill="rgba(44,84,200,.22)" stroke="rgba(44,84,200,.55)" strokeWidth="1" style={{animation:`nodePulse 2.8s ${.1+i*.2}s ease-in-out infinite`}} />)}
    {hidden1.map((y,i)=><circle key={`h1-${i}`} cx="130" cy={y} r="5" fill="rgba(44,84,200,.28)" stroke="rgba(44,84,200,.6)" strokeWidth="1" style={{animation:`nodePulse 2.8s ${.2+i*.2}s ease-in-out infinite`}} />)}
    {hidden2.map((y,i)=><circle key={`h2-${i}`} cx="220" cy={y} r="5" fill="rgba(44,84,200,.28)" stroke="rgba(44,84,200,.6)" strokeWidth="1" style={{animation:`nodePulse 2.8s ${.15+i*.3}s ease-in-out infinite`}} />)}
    {output.map((y,i)=><circle key={`o-${i}`} cx="300" cy={y} r="6" fill="rgba(44,84,200,.4)" stroke="rgba(44,84,200,.8)" strokeWidth="1.5" style={{animation:`nodePulse 2.4s ${i*.5}s ease-in-out infinite`}} />)}
  </svg>;
}
