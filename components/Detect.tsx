"use client";

import { useEffect, useRef, useState } from "react";

type Cell = { x: number; y: number; r: number; type: "RBC" | "WBC" };
const W = 800, H = 520;

export default function Detect() {
  const ref = useRef<HTMLCanvasElement>(null);
  const base = useRef<ImageData | null>(null);
  const cells = useRef<Cell[]>([]);
  const timer = useRef<number>(0);
  const [on, setOn] = useState(false);
  const [status, setStatus] = useState("");

  useEffect(() => {
    const c = ref.current!.getContext("2d")!;
    let s = 7;
    const rnd = () => ((s = (s * 16807) % 2147483647) / 2147483647);
    c.fillStyle = "#e7c2b8"; c.fillRect(0, 0, W, H);
    const g = c.createRadialGradient(W * 0.4, H * 0.4, 40, W / 2, H / 2, W * 0.7);
    g.addColorStop(0, "rgba(255,235,225,.5)"); g.addColorStop(1, "rgba(150,90,95,.35)");
    c.fillStyle = g; c.fillRect(0, 0, W, H);
    const list: Cell[] = [];
    const place = (r: number, n: number, type: Cell["type"]) => {
      for (let t = 0; n && t < 4000; t++) {
        const x = r + rnd() * (W - 2 * r), y = r + rnd() * (H - 2 * r);
        if (list.every((o) => Math.hypot(o.x - x, o.y - y) >= (o.r + r) * 0.86)) { list.push({ x, y, r, type }); n--; }
      }
    };
    place(46, 3, "WBC"); place(26, 46, "RBC");
    list.forEach((k) => {
      if (k.type === "RBC") {
        const q = c.createRadialGradient(k.x, k.y, k.r * 0.15, k.x, k.y, k.r);
        q.addColorStop(0, "#e9a8a1"); q.addColorStop(0.5, "#cf7b7e"); q.addColorStop(1, "#b45e66");
        c.fillStyle = q; c.beginPath(); c.arc(k.x, k.y, k.r, 0, 7); c.fill();
      } else {
        c.fillStyle = "rgba(190,170,215,.55)"; c.beginPath(); c.arc(k.x, k.y, k.r, 0, 7); c.fill();
        c.fillStyle = "#5a3f91";
        [[-0.28, -0.12, 0.5], [0.26, 0.1, 0.46], [0, 0.34, 0.3]].forEach(([dx, dy, f]) => {
          c.beginPath(); c.arc(k.x + dx * k.r, k.y + dy * k.r, k.r * f, 0, 7); c.fill();
        });
      }
    });
    cells.current = list;
    base.current = c.getImageData(0, 0, W, H);
    return () => clearInterval(timer.current);
  }, []);

  const draw = (n: number) => {
    const c = ref.current!.getContext("2d")!;
    c.putImageData(base.current!, 0, 0);
    c.lineWidth = 2.5; c.font = "600 13px monospace";
    cells.current.slice(0, n).forEach((k, i) => {
      const col = k.type === "WBC" ? "#ffd84a" : "#2c54c8";
      c.strokeStyle = col; c.strokeRect(k.x - k.r, k.y - k.r, k.r * 2, k.r * 2);
      c.fillStyle = col; c.fillRect(k.x - k.r, k.y - k.r - 17, 62, 17);
      c.fillStyle = k.type === "WBC" ? "#131311" : "#fff";
      c.fillText(`${k.type} ${(0.93 + ((i * 37) % 7) / 100).toFixed(2)}`, k.x - k.r + 4, k.y - k.r - 4);
    });
    setStatus(n >= cells.current.length ? `${cells.current.length} cells found in 0.04 s` : "detecting...");
  };

  const toggle = () => {
    clearInterval(timer.current);
    if (on) { setOn(false); ref.current!.getContext("2d")!.putImageData(base.current!, 0, 0); return; }
    setOn(true);
    let n = 0;
    timer.current = window.setInterval(() => {
      n += 2; draw(n);
      if (n >= cells.current.length) clearInterval(timer.current);
    }, 45);
  };

  return (
    <div className="screen">
      <canvas ref={ref} width={W} height={H} role="img" aria-label="Simulated blood smear with detected cells" />
      <button className="run" onClick={toggle}>{on ? "Clear" : "Run detection"}</button>
      <div className={`read${on ? " on" : ""}`}>{status}</div>
    </div>
  );
}
