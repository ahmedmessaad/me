"use client";
import { useState } from "react";

export default function LivePreview({ url, alt, caption }: { url: string; alt: string; caption?: string }) {
  const [ok, setOk] = useState(true);
  if (!ok) return null;
  const src = `https://api.microlink.io/?url=${encodeURIComponent(url)}&screenshot=true&meta=false&embed=screenshot.url&viewport.width=1280&viewport.height=800`;
  return (
    <figure className="figure">
      <a href={url} target="_blank" rel="noopener noreferrer">
        <img src={src} alt={alt} width={1280} height={800} loading="lazy" onError={() => setOk(false)} />
      </a>
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
}
