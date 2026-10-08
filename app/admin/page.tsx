"use client";

import { useEffect, useMemo, useState } from "react";
import { siteData as initialData } from "@/data";
import type { SiteData } from "@/lib/types";

const clone = <T,>(value: T): T => JSON.parse(JSON.stringify(value));

type FieldProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  multiline?: boolean;
  hint?: string;
};

function Field({ label, value, onChange, multiline = false, hint }: FieldProps) {
  return (
    <label className="cms-field">
      <span className="cms-label">{label}</span>
      {multiline ? (
        <textarea value={value} onChange={(event) => onChange(event.target.value)} rows={5} />
      ) : (
        <input value={value} onChange={(event) => onChange(event.target.value)} />
      )}
      {hint && <small>{hint}</small>}
    </label>
  );
}

function Section({ id, number, title, description, children }: { id: string; number: string; title: string; description: string; children: React.ReactNode }) {
  return (
    <section id={id} className="cms-section">
      <div className="cms-section-head">
        <div className="cms-section-number">{number}</div>
        <div>
          <h2>{title}</h2>
          <p>{description}</p>
        </div>
      </div>
      <div className="cms-section-body">{children}</div>
    </section>
  );
}

export default function AdminPage() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [checking, setChecking] = useState(true);
  const [password, setPassword] = useState("");
  const [data, setData] = useState<SiteData>(clone(initialData));
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    fetch("/api/admin/me")
      .then((response) => response.json())
      .then((result) => setLoggedIn(Boolean(result.authenticated)))
      .catch(() => setLoggedIn(false))
      .finally(() => setChecking(false));
  }, []);

  const update = (fn: (draft: SiteData) => void) => {
    setData((previous) => {
      const next = clone(previous);
      fn(next);
      return next;
    });
    setMessage("Unsaved changes");
  };

  async function login(event: React.FormEvent) {
    event.preventDefault();
    setMessage("");
    const response = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    if (!response.ok) {
      setMessage("Invalid password");
      return;
    }
    setLoggedIn(true);
    setPassword("");
    setMessage("Logged in");
  }

  async function save() {
    setSaving(true);
    setMessage("");
    try {
      const response = await fetch("/api/admin/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data }),
      });
      const result = await response.json();
      setMessage(response.ok ? "Saved successfully. Vercel will rebuild from the new commit." : result.error || "Save failed");
    } catch {
      setMessage("Could not reach the save endpoint");
    } finally {
      setSaving(false);
    }
  }

  const nav = useMemo(
    () => [
      ["hero", "Hero", "First impression"],
      ["work", "Research & work", "Projects and results"],
      ["publications", "Publications", "Papers and awards"],
      ["about", "About", "Bio and facts"],
      ["contact", "Contact", "Email and footer"],
    ],
    []
  );

  if (checking) return <main className="cms-login"><div className="cms-login-card"><div className="cms-brand">AHMED MESSAAD <span>CMS</span></div><p>Checking admin session…</p></div></main>;

  if (!loggedIn) {
    return (
      <main className="cms-login">
        <div className="cms-login-card">
          <div className="cms-brand">AHMED MESSAAD <span>CMS</span></div>
          <h1>Content editor</h1>
          <p>Manage the portfolio content from one clean workspace. Changes are committed to <code>data.ts</code>.</p>
          <form onSubmit={login} className="cms-login-form">
            <Field label="Admin password" value={password} onChange={setPassword} />
            <button className="cms-primary" type="submit">Sign in</button>
          </form>
          {message && <div className="cms-alert error">{message}</div>}
        </div>
      </main>
    );
  }

  return (
    <main className="cms-shell">
      <header className="cms-header">
        <div>
          <div className="cms-brand">AHMED MESSAAD <span>CMS</span></div>
          <h1>Portfolio editor</h1>
          <p>Update the content, review it, then save everything to GitHub.</p>
        </div>
        <div className="cms-header-actions">
          {message && <span className={message === "Unsaved changes" ? "cms-save-state dirty" : "cms-save-state"}>{message}</span>}
          <button className="cms-primary" type="button" onClick={save} disabled={saving}>{saving ? "Saving…" : "Save changes"}</button>
        </div>
      </header>

      <div className="cms-layout">
        <aside className="cms-sidebar">
          <div className="cms-sidebar-title">EDIT SECTIONS</div>
          {nav.map(([id, title, subtitle]) => (
            <a key={id} href={`#${id}`} className={activeSection === id ? "active" : ""} onClick={() => setActiveSection(id)}>
              <span>{title}</span><small>{subtitle}</small>
            </a>
          ))}
          <div className="cms-sidebar-tip"><strong>Tip</strong><span>Use the Save changes button after editing. The current form is only local until you save.</span></div>
        </aside>

        <div className="cms-content">
          <Section id="hero" number="01" title="Hero" description="The first screen visitors see. Keep the headline short and punchy.">
            <div className="cms-grid two">
              <Field label="Eyebrow" value={data.hero.eyebrow} onChange={(value) => update((draft) => { draft.hero.eyebrow = value; })} />
              <Field label="Primary button" value={data.hero.primaryLabel} onChange={(value) => update((draft) => { draft.hero.primaryLabel = value; })} />
            </div>
            <div className="cms-grid three">
              {data.hero.headline.map((line, index) => <Field key={index} label={`Headline line ${index + 1}`} value={line} onChange={(value) => update((draft) => { draft.hero.headline[index] = value; })} />)}
            </div>
            <Field label="Lead paragraph" value={data.hero.lead} multiline onChange={(value) => update((draft) => { draft.hero.lead = value; })} />
            <div className="cms-grid two">
              <Field label="Primary link" value={data.hero.primaryHref} onChange={(value) => update((draft) => { draft.hero.primaryHref = value; })} />
              <Field label="CV label" value={data.hero.cvLabel} onChange={(value) => update((draft) => { draft.hero.cvLabel = value; })} />
              <Field label="CV link" value={data.hero.cvHref} onChange={(value) => update((draft) => { draft.hero.cvHref = value; })} hint="Example: /resume.pdf" />
            </div>
          </Section>

          <Section id="work" number="02" title="Research & work" description="Edit the featured case study, projects, and the smaller project list.">
            <div className="cms-subhead"><span>Featured project</span></div>
            <div className="cms-grid two">
              <Field label="Eyebrow" value={data.work.featured.eyebrow} onChange={(value) => update((draft) => { draft.work.featured.eyebrow = value; })} />
              <Field label="Name" value={data.work.featured.name} onChange={(value) => update((draft) => { draft.work.featured.name = value; })} />
            </div>
            <Field label="Description" value={data.work.featured.description} multiline onChange={(value) => update((draft) => { draft.work.featured.description = value; })} />
            <div className="cms-grid two">
              <Field label="Link label" value={data.work.featured.linkLabel} onChange={(value) => update((draft) => { draft.work.featured.linkLabel = value; })} />
              <Field label="Project URL" value={data.work.featured.href} onChange={(value) => update((draft) => { draft.work.featured.href = value; })} />
            </div>
            <Field label="Technology chips" value={data.work.featured.chips.join(", ")} onChange={(value) => update((draft) => { draft.work.featured.chips = value.split(",").map((item) => item.trim()).filter(Boolean); })} hint="Separate each chip with a comma." />
            <div className="cms-subhead"><span>Pipeline</span></div>
            <div className="cms-stack">
              {data.work.featured.pipeline.map((step, index) => (
                <div className="cms-item" key={index}>
                  <div className="cms-item-title">Step {index + 1}</div>
                  <div className="cms-grid three">
                    <Field label="Number" value={step.num} onChange={(value) => update((draft) => { draft.work.featured.pipeline[index].num = value; })} />
                    <Field label="Title" value={step.title} onChange={(value) => update((draft) => { draft.work.featured.pipeline[index].title = value; })} />
                    <Field label="Description" value={step.description} onChange={(value) => update((draft) => { draft.work.featured.pipeline[index].description = value; })} />
                  </div>
                </div>
              ))}
            </div>

            <div className="cms-subhead"><span>Projects</span><button type="button" className="cms-secondary" onClick={() => update((draft) => draft.work.projects.push({ number: String(draft.work.projects.length + 1).padStart(2, "0"), kind: "", name: "New project", description: "", resultLabel: "Result", result: "", stack: [], linkLabel: "View ↗", href: "#" }))}>+ Add project</button></div>
            <div className="cms-stack">
              {data.work.projects.map((project, index) => (
                <div className="cms-item" key={`${project.number}-${index}`}>
                  <div className="cms-item-head"><div><b>{project.number} · {project.name || "Untitled project"}</b><small>{project.kind || "Project"}</small></div><button type="button" className="cms-danger" onClick={() => update((draft) => { draft.work.projects.splice(index, 1); })}>Remove</button></div>
                  <div className="cms-grid two">
                    <Field label="Name" value={project.name} onChange={(value) => update((draft) => { draft.work.projects[index].name = value; })} />
                    <Field label="Kind" value={project.kind} onChange={(value) => update((draft) => { draft.work.projects[index].kind = value; })} />
                  </div>
                  <Field label="Description" value={project.description} multiline onChange={(value) => update((draft) => { draft.work.projects[index].description = value; })} />
                  <div className="cms-grid two">
                    <Field label="Result" value={project.result} multiline onChange={(value) => update((draft) => { draft.work.projects[index].result = value; })} />
                    <Field label="Stack" value={project.stack.join(", ")} onChange={(value) => update((draft) => { draft.work.projects[index].stack = value.split(",").map((item) => item.trim()).filter(Boolean); })} hint="Comma separated" />
                  </div>
                  <div className="cms-grid two">
                    <Field label="Link label" value={project.linkLabel} onChange={(value) => update((draft) => { draft.work.projects[index].linkLabel = value; })} />
                    <Field label="Link URL" value={project.href} onChange={(value) => update((draft) => { draft.work.projects[index].href = value; })} />
                  </div>
                </div>
              ))}
            </div>

            <div className="cms-subhead"><span>More work</span><button type="button" className="cms-secondary" onClick={() => update((draft) => draft.work.more.push({ number: String(draft.work.more.length + 5).padStart(2, "0"), name: "New project", kind: "", linkLabel: "View ↗", href: "#" }))}>+ Add item</button></div>
            <div className="cms-stack">
              {data.work.more.map((item, index) => (
                <div className="cms-item compact" key={`${item.number}-${index}`}>
                  <div className="cms-item-head"><b>{item.number} · {item.name}</b><button type="button" className="cms-danger" onClick={() => update((draft) => { draft.work.more.splice(index, 1); })}>Remove</button></div>
                  <div className="cms-grid three">
                    <Field label="Name" value={item.name} onChange={(value) => update((draft) => { draft.work.more[index].name = value; })} />
                    <Field label="Kind" value={item.kind} onChange={(value) => update((draft) => { draft.work.more[index].kind = value; })} />
                    <Field label="URL" value={item.href} onChange={(value) => update((draft) => { draft.work.more[index].href = value; })} />
                  </div>
                </div>
              ))}
            </div>
          </Section>

          <Section id="publications" number="03" title="Publications" description="Keep conference details, tags, awards, and certificate links in one place.">
            <div className="cms-grid two">
              <Field label="Section label" value={data.publications.label} onChange={(value) => update((draft) => { draft.publications.label = value; })} />
              <Field label="Section note" value={data.publications.note} onChange={(value) => update((draft) => { draft.publications.note = value; })} />
            </div>
            <div className="cms-grid two">
              {data.publications.heading.map((line, index) => <Field key={index} label={`Heading line ${index + 1}`} value={line} onChange={(value) => update((draft) => { draft.publications.heading[index] = value; })} />)}
            </div>
            <div className="cms-subhead"><span>Entries</span><button type="button" className="cms-secondary" onClick={() => update((draft) => draft.publications.entries.push({ status: "", title: "New publication", description: "", tags: [], linkLabel: "View ↗", href: "#", note: "" }))}>+ Add publication</button></div>
            <div className="cms-stack">
              {data.publications.entries.map((publication, index) => (
                <div className="cms-item" key={`${publication.title}-${index}`}>
                  <div className="cms-item-head"><div><b>{publication.title || "New publication"}</b><small>{publication.status || "No status"}</small></div><button type="button" className="cms-danger" onClick={() => update((draft) => { draft.publications.entries.splice(index, 1); })}>Remove</button></div>
                  <div className="cms-grid two">
                    <Field label="Status" value={publication.status} onChange={(value) => update((draft) => { draft.publications.entries[index].status = value; })} />
                    <Field label="Award" value={publication.award || ""} onChange={(value) => update((draft) => { draft.publications.entries[index].award = value || undefined; })} />
                  </div>
                  <Field label="Title" value={publication.title} onChange={(value) => update((draft) => { draft.publications.entries[index].title = value; })} />
                  <Field label="Description" value={publication.description} multiline onChange={(value) => update((draft) => { draft.publications.entries[index].description = value; })} />
                  <Field label="Tags" value={publication.tags.join(", ")} onChange={(value) => update((draft) => { draft.publications.entries[index].tags = value.split(",").map((item) => item.trim()).filter(Boolean); })} hint="Comma separated" />
                  <div className="cms-grid two">
                    <Field label="Link label" value={publication.linkLabel} onChange={(value) => update((draft) => { draft.publications.entries[index].linkLabel = value; })} />
                    <Field label="Certificate / paper URL" value={publication.href} onChange={(value) => update((draft) => { draft.publications.entries[index].href = value; })} />
                  </div>
                  <Field label="Small note" value={publication.note} onChange={(value) => update((draft) => { draft.publications.entries[index].note = value; })} />
                </div>
              ))}
            </div>
          </Section>

          <Section id="about" number="04" title="About" description="Your positioning, biography, and quick facts.">
            <Field label="Section label" value={data.about.label} onChange={(value) => update((draft) => { draft.about.label = value; })} />
            <Field label="Statement" value={data.about.statement} multiline onChange={(value) => update((draft) => { draft.about.statement = value; })} />
            <div className="cms-subhead"><span>Paragraphs</span></div>
            <div className="cms-stack">
              {data.about.paragraphs.map((paragraph, index) => (
                <div className="cms-item compact" key={index}>
                  <Field label={`Paragraph ${index + 1}`} value={paragraph} multiline onChange={(value) => update((draft) => { draft.about.paragraphs[index] = value; })} />
                </div>
              ))}
            </div>
            <div className="cms-subhead"><span>Facts</span></div>
            <div className="cms-stack">
              {data.about.facts.map((fact, index) => (
                <div className="cms-grid two cms-fact" key={index}>
                  <Field label="Label" value={fact.label} onChange={(value) => update((draft) => { draft.about.facts[index].label = value; })} />
                  <Field label="Value" value={fact.value} onChange={(value) => update((draft) => { draft.about.facts[index].value = value; })} />
                </div>
              ))}
            </div>
          </Section>

          <Section id="contact" number="05" title="Contact & footer" description="Everything shown at the bottom of the portfolio. This section uses the current data structure, so there is no undefined footer state.">
            <div className="cms-grid two">
              <Field label="Contact label" value={data.contact.label} onChange={(value) => update((draft) => { draft.contact.label = value; })} />
              <Field label="Button label" value={data.contact.buttonLabel} onChange={(value) => update((draft) => { draft.contact.buttonLabel = value; })} />
            </div>
            <Field label="Contact heading" value={data.contact.heading} multiline onChange={(value) => update((draft) => { draft.contact.heading = value; })} />
            <Field label="Contact description" value={data.contact.description} multiline onChange={(value) => update((draft) => { draft.contact.description = value; })} />
            <Field label="Email" value={data.contact.email} onChange={(value) => update((draft) => { draft.contact.email = value; })} />
            <div className="cms-subhead"><span>Footer</span></div>
            <Field label="Copyright name" value={data.footer.copyrightName} onChange={(value) => update((draft) => { draft.footer.copyrightName = value; })} />
            <div className="cms-stack">
              {data.footer.links.map((link, index) => (
                <div className="cms-item compact" key={index}>
                  <div className="cms-item-head"><b>Footer link {index + 1}</b><button type="button" className="cms-danger" onClick={() => update((draft) => { draft.footer.links.splice(index, 1); })}>Remove</button></div>
                  <div className="cms-grid two">
                    <Field label="Label" value={link.label} onChange={(value) => update((draft) => { draft.footer.links[index].label = value; })} />
                    <Field label="URL" value={link.href} onChange={(value) => update((draft) => { draft.footer.links[index].href = value; })} />
                  </div>
                </div>
              ))}
            </div>
            <button type="button" className="cms-secondary" onClick={() => update((draft) => draft.footer.links.push({ label: "New link", href: "#" }))}>+ Add footer link</button>
          </Section>

          <div className="cms-bottom-save">
            <span>{message || "All changes are local until you save."}</span>
            <button className="cms-primary" type="button" onClick={save} disabled={saving}>{saving ? "Saving…" : "Save changes"}</button>
          </div>
        </div>
      </div>
    </main>
  );
}
