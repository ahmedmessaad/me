import type { SiteData } from "@/lib/types";
import { SocialIcon } from "./Icons";
import { external } from "./Emph";

export default function Footer({ meta, footer }: Pick<SiteData, "meta" | "footer">) {
  return (
    <footer id="contact">
      <div className="wrap ft">
        <div>
          <a className="brand" href="/">
            <span className="mark">{meta.name.charAt(0)}</span>
            {meta.name}
          </a>
          <p className="copy">Copyright {new Date().getFullYear()} {meta.name}. All rights reserved.</p>
          <div className="soc">
            {footer.socials.map((s) => (
              <a key={s.href} href={s.href} aria-label={s.label} {...external(s.href)}>
                <SocialIcon type={s.type} />
              </a>
            ))}
          </div>
        </div>
        <nav className="cols" aria-label="Footer">
          {footer.columns.map((c) => (
            <div key={c.title}>
              <h4>{c.title}</h4>
              {c.links.map((l) => (
                <a key={l.label} href={l.href.startsWith("#") ? `/${l.href}` : l.href} {...external(l.href)}>{l.label}</a>
              ))}
            </div>
          ))}
        </nav>
      </div>
      <div className="art" aria-hidden="true">
        <span className="word">{footer.wordmark}</span>
      </div>
    </footer>
  );
}
