"use client";

import { useEffect, useRef, useState } from "react";

type Cell = { x: number; y: number; r: number; type: "RBC" | "WBC"; conf: number };

const W = 800, H = 520;

// grid layout (the "real HemaVision" output): WBCs first, then RBCs
const COLS = 10, TILE = 72, GAP = 6, PAD = 1.2;
const GRID_W = COLS * TILE + (COLS - 1) * GAP;
const GX = (W - GRID_W) / 2;

const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const clamp = (v: number) => Math.min(1, Math.max(0, v));

export default function Detect() {
  const ref = useRef<HTMLCanvasElement>(null);
  const base = useRef<ImageData | null>(null);
  const off = useRef<HTMLCanvasElement | null>(null);
  const cells = useRef<Cell[]>([]);
  const order = useRef<Cell[]>([]);
  const timer = useRef<number>(0);
  const raf = useRef<number>(0);
  const wait = useRef<number>(0);
  const [on, setOn] = useState(false);
  const [status, setStatus] = useState("");

  const stop = () => {
    clearInterval(timer.current);
    clearTimeout(wait.current);
    cancelAnimationFrame(raf.current);
  };

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
        if (list.every((o) => Math.hypot(o.x - x, o.y - y) >= (o.r + r) * 0.86)) { list.push({ x, y, r, type, conf: 0 }); n--; }
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
    list.sort((a, b) => a.x - b.x);
    list.forEach((k, i) => { k.conf = 0.93 + ((i * 37) % 7) / 100; });
    cells.current = list;

    // grid order: WBC first, then RBC in reading order (top to bottom, left to right)
    const rbc = list.filter((k) => k.type === "RBC").sort((a, b) => (Math.round(a.y / 60) - Math.round(b.y / 60)) || a.x - b.x);
    order.current = [...list.filter((k) => k.type === "WBC"), ...rbc];

    base.current = c.getImageData(0, 0, W, H);
    const o = document.createElement("canvas");
    o.width = W; o.height = H;
    o.getContext("2d")!.putImageData(base.current, 0, 0);
    off.current = o;
    return () => stop();
  }, []);

  const draw = (n: number) => {
    const c = ref.current!.getContext("2d")!;
    c.putImageData(base.current!, 0, 0);
    c.lineWidth = 2.5; c.font = "600 13px monospace";
    cells.current.slice(0, n).forEach((k) => {
      const col = k.type === "WBC" ? "#ffd84a" : "#2c54c8";
      c.strokeStyle = col; c.strokeRect(k.x - k.r, k.y - k.r, k.r * 2, k.r * 2);
      c.fillStyle = col; c.fillRect(k.x - k.r, k.y - k.r - 17, 62, 17);
      c.fillStyle = k.type === "WBC" ? "#131311" : "#fff";
      c.fillText(`${k.type} ${k.conf.toFixed(2)}`, k.x - k.r + 4, k.y - k.r - 4);
    });
    if (n < cells.current.length) {
      const x = (n / cells.current.length) * W;
      const gr = c.createLinearGradient(x - 70, 0, x, 0);
      gr.addColorStop(0, "rgba(255,255,255,0)"); gr.addColorStop(1, "rgba(255,255,255,.42)");
      c.fillStyle = gr; c.fillRect(x - 70, 0, 70, H);
    }
    setStatus(n >= cells.current.length ? `${cells.current.length} cells found in 0.04 s` : "detecting...");
  };

  // t: 0 -> 1, boxes fly out of the smear into the grid
  const drawGrid = (t: number) => {
    const c = ref.current!.getContext("2d")!;
    const list = order.current;
    const rows = Math.ceil(list.length / COLS);
    const gridH = rows * TILE + (rows - 1) * GAP;
    const gy = (H - gridH) / 2 + 8;
    const slot = (i: number) => ({ x: GX + (i % COLS) * (TILE + GAP), y: gy + Math.floor(i / COLS) * (TILE + GAP) });

    const bg = ease(clamp(t / 0.35));
    c.globalAlpha = 1;
    c.fillStyle = "#f3eeeb"; c.fillRect(0, 0, W, H);
    c.globalAlpha = 1 - bg;
    c.drawImage(off.current!, 0, 0);
    c.globalAlpha = 1;

    // empty tiles
    c.globalAlpha = bg;
    c.fillStyle = "#fdfbfa";
    list.forEach((_, i) => { const p = slot(i); c.fillRect(p.x, p.y, TILE, TILE); });
    c.fillStyle = "#6f6a63"; c.font = "500 12px monospace";
    c.fillText(`EXTRACTED CELLS  ${list.length}`, GX, gy - 12);
    c.globalAlpha = 1;

    const n = list.length;
    list.forEach((k, i) => {
      const local = ease(clamp((t - 0.15 - (i / n) * 0.4) / 0.45));
      const p = slot(i);
      const s0 = k.r * 2 * PAD;
      const cx = k.x + (p.x + TILE / 2 - k.x) * local;
      const cy = k.y + (p.y + TILE / 2 - k.y) * local;
      const s = s0 + (TILE - s0) * local;
      const dx = cx - s / 2, dy = cy - s / 2;

      c.save();
      c.beginPath(); c.rect(dx, dy, s, s); c.clip();
      c.fillStyle = "#fdfbfa"; c.fillRect(dx, dy, s, s);
      c.drawImage(off.current!, k.x - s0 / 2, k.y - s0 / 2, s0, s0, dx, dy, s, s);
      c.restore();

      const col = k.type === "WBC" ? "#ffd84a" : "#2c54c8";
      const a = 1 - local;
      if (a > 0.01) {
        c.globalAlpha = a;
        c.lineWidth = 2.5; c.strokeStyle = col; c.strokeRect(dx, dy, s, s);
        c.fillStyle = col; c.fillRect(dx, dy - 17, 62, 17);
        c.fillStyle = k.type === "WBC" ? "#131311" : "#fff"; c.font = "600 13px monospace";
        c.fillText(`${k.type} ${k.conf.toFixed(2)}`, dx + 4, dy - 4);
        c.globalAlpha = 1;
      }
      if (local > 0.6) {
        c.globalAlpha = (local - 0.6) / 0.4;
        c.fillStyle = col; c.fillRect(p.x, p.y + TILE - 3, TILE, 3);
        c.globalAlpha = 1;
      }
    });
  };

  const organize = () => {
    const wbc = cells.current.filter((k) => k.type === "WBC").length;
    const total = cells.current.length;
    const t0 = performance.now(), D = 2200;
    setStatus("organizing...");
    const step = (now: number) => {
      const t = clamp((now - t0) / D);
      drawGrid(t);
      if (t < 1) raf.current = requestAnimationFrame(step);
      else setStatus(`${total} cells · ${wbc} WBC · ${total - wbc} RBC`);
    };
    raf.current = requestAnimationFrame(step);
  };

  const toggle = () => {
    stop();
    if (on) { setOn(false); setStatus(""); ref.current!.getContext("2d")!.putImageData(base.current!, 0, 0); return; }
    setOn(true);
    let n = 0;
    timer.current = window.setInterval(() => {
      n += 1; draw(n);
      if (n >= cells.current.length) {
        clearInterval(timer.current);
        wait.current = window.setTimeout(organize, 700);
      }
    }, 38);
  };

  return (
    <div className="screen">
      <canvas ref={ref} width={W} height={H} role="img" aria-label="Simulated blood smear with detected cells, then organized into a grid of cropped cells" />
      <button className="run" onClick={toggle}>{on ? "Clear" : "Run detection"}</button>
      <div className={`read${on ? " on" : ""}`}>{status}</div>
    </div>
  );
}
