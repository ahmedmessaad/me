export function Emph({ text }: { text: string }) {
  const parts = text.split(/\*(.+?)\*/g);
  return (
    <>
      {parts.map((p, i) => (i % 2 ? <em key={i}>{p}</em> : p))}
    </>
  );
}

export function Lines({ text }: { text: string }) {
  const lines = text.split("\n");
  return (
    <>
      {lines.map((l, i) => (
        <span key={i}>
          {l}
          {i < lines.length - 1 && <br />}
        </span>
      ))}
    </>
  );
}

export const external = (href: string) =>
  /^https?:\/\//.test(href) ? { target: "_blank", rel: "noopener noreferrer" } : {};
