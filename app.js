const { useState, useRef, useEffect, useMemo } = React;
const IC = { vault: "M4 7h16v12H4zM8 7V4h8v3M9 13h6M12 10v6", skills: "M12 3l8 5v8l-8 5-8-5V8zM12 3v18M4 8l16 8M20 8L4 16", term: "M4 5h16v14H4zM7 9l3 3-3 3M12 15h5", user: "M12 4a4 4 0 100 8 4 4 0 000-8zM4 20c0-4 4-6 8-6s8 2 8 6", diag: "M3 12h4l3-7 4 14 3-7h4", gear: "M12 9a3 3 0 100 6 3 3 0 000-6zM12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M19 5l-2 2M7 17l-2 2", log: "M6 3h9l4 4v14H6zM9 11h7M9 15h7M9 7h3", dl: "M12 4v12M7 11l5 5 5-5M5 20h14", x: "M6 6l12 12M18 6L6 18", min: "M6 18h12", max: "M6 6h12v12H6z", search: "M11 4a7 7 0 100 14 7 7 0 000-14zM20 20l-4-4", grid: "M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z", vol: "M4 9h4l5-4v14l-5-4H4zM17 9a4 4 0 010 6", play: "M7 4l13 8-13 8z" };
const Ic = ({ n, s = 22, c = "currentColor" }) => /* @__PURE__ */ React.createElement("svg", { width: s, height: s, viewBox: "0 0 24 24", fill: "none", stroke: c, strokeWidth: "1.6", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ React.createElement("path", { d: IC[n] }));
const GAMES = [
  { id: "neon-requiem", name: "NEON REQUIEM", genre: "3D Action", engine: "Unreal Engine 5", date: "2025-03-14", role: "Lead Designer / Gameplay Programmer", c1: "#00f0ff", c2: "#8a2be2", size: "2.4 GB", ver: "v1.3.2", file: "NeonRequiem_Win64.exe", hash: "a91f3c07d2e84b56c0fa19e7", min: ["Win 10 64-bit", "i5-8400 / Ryzen 5 2600", "GTX 1060 6GB", "16 GB RAM", "30 GB SSD"], rec: ["Win 11 64-bit", "i7-12700 / Ryzen 7 5800X", "RTX 3070 8GB", "32 GB RAM", "30 GB NVMe"], blurb: "Chrome-soaked melee combat with a stamina-risk economy. Parry windows tuned to 83ms." },
  { id: "void-foundry", name: "VOID FOUNDRY", genre: "Factory Simulation", engine: "Unity 2022 LTS", date: "2024-09-02", role: "Systems & Economy Designer", c1: "#ffb000", c2: "#ff3d71", size: "612 MB", ver: "v0.9.8", file: "VoidFoundry_Android.apk", hash: "7be20d41c9a3f58e1d06b2a4", min: ["Android 9", "Snapdragon 660", "3 GB RAM", "1 GB storage", "OpenGL ES 3.0"], rec: ["Android 13", "Snapdragon 8 Gen 1", "8 GB RAM", "2 GB storage", "Vulkan 1.1"], blurb: "Orbital supply chains with a closed-loop market model and 14 balancing levers." },
  { id: "glitchwalker", name: "GLITCHWALKER", genre: "Indie Prototype", engine: "Python / Ursina", date: "2024-02-21", role: "Solo Developer", c1: "#39ff88", c2: "#00f0ff", size: "84 MB", ver: "v0.3.0", file: "Glitchwalker_Win.zip", hash: "3cd8a7e5f1029b64ae71c8d0", min: ["Win 7+ / Linux", "Dual-core 2 GHz", "Integrated GPU", "4 GB RAM", "200 MB disk"], rec: ["Win 10+", "Quad-core 3 GHz", "GTX 750", "8 GB RAM", "200 MB disk"], blurb: "A procedural .obj-driven platformer where level meshes corrupt as you move." }
];
const SKILLS = [["3D Modeling", 92], ["Mesh Optimization", 88], ["Unreal / Unity", 90], ["Ursina / Python", 84], ["Systems Design", 95], ["Combat Balancing", 89], ["Game Economy", 86], ["C++ / C# Arch", 87]];
const LOGO = "assets/logo.jpg";
const SPLASH = "assets/splash.jpg";
const BIO = { n: "NOTORIOUS X PHENOM", email: "hello@notoriousxphenom.dev", links: ["github.com/notoriousxphenom", "itch.io/notoriousxphenom", "linkedin.com/company/notorious-x-phenom"] };
let AC;
const beep = (f = 520, d = 0.05, on = true) => {
  if (!on) return;
  try {
    AC = AC || new (window.AudioContext || window.webkitAudioContext)();
    const o = AC.createOscillator(), g = AC.createGain();
    o.type = "square";
    o.frequency.value = f;
    g.gain.value = 0.03;
    o.connect(g);
    g.connect(AC.destination);
    o.start();
    g.gain.exponentialRampToValueAtTime(1e-4, AC.currentTime + d);
    o.stop(AC.currentTime + d);
  } catch (e) {
  }
};
const Art = ({ g, h = 160, i = 0 }) => /* @__PURE__ */ React.createElement("svg", { viewBox: "0 0 400 160", width: "100%", height: h, preserveAspectRatio: "xMidYMid slice" }, /* @__PURE__ */ React.createElement("defs", null, /* @__PURE__ */ React.createElement("linearGradient", { id: g.id + i, x1: "0", y1: "0", x2: "1", y2: "1" }, /* @__PURE__ */ React.createElement("stop", { offset: "0", stopColor: g.c1 }), /* @__PURE__ */ React.createElement("stop", { offset: "1", stopColor: g.c2 }))), /* @__PURE__ */ React.createElement("rect", { width: "400", height: "160", fill: "#0a0b10" }), /* @__PURE__ */ React.createElement("rect", { width: "400", height: "160", fill: `url(#${g.id + i})`, opacity: ".35" }), [...Array(9)].map((_, k) => /* @__PURE__ */ React.createElement("path", { key: k, d: `M${k * 50 - i * 30} 160L${180 + k * 5} 80L${k * 50 + 30} 160`, stroke: g.c1, strokeOpacity: ".4", fill: "none" })), /* @__PURE__ */ React.createElement("circle", { cx: 120 + i * 90, cy: "60", r: 26 + i * 6, fill: g.c2, opacity: ".6" }), /* @__PURE__ */ React.createElement("text", { x: "16", y: "146", fill: "#fff", fontSize: "20", fontWeight: "700", letterSpacing: "3" }, g.name));
function Vault({ dl, startDl, snd }) {
  const [sel, setSel] = useState(null);
  const [sl, setSl] = useState(0);
  const [demo, setDemo] = useState(false);
  if (sel) {
    const g = sel, p = dl[g.id];
    return /* @__PURE__ */ React.createElement("div", { className: "p-4 space-y-3" }, /* @__PURE__ */ React.createElement("button", { className: "btn text-xs", onClick: () => {
      setSel(null);
      setDemo(false);
    } }, "\u2190 VAULT"), /* @__PURE__ */ React.createElement("div", { className: "relative border border-cyan-400/30" }, /* @__PURE__ */ React.createElement(Art, { g, h: 200, i: sl }), /* @__PURE__ */ React.createElement("div", { className: "absolute bottom-2 right-2 flex gap-1" }, [0, 1, 2].map((i) => /* @__PURE__ */ React.createElement("button", { key: i, onClick: () => setSl(i), className: "w-3 h-3 border border-cyan-300", style: { background: sl === i ? "#00f0ff" : "transparent" } })))), /* @__PURE__ */ React.createElement("h2", { className: "text-2xl font-bold", style: { color: g.c1, textShadow: `0 0 12px ${g.c1}` } }, g.name), /* @__PURE__ */ React.createElement("p", { className: "text-sm opacity-80" }, g.blurb), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-2 gap-2 text-xs" }, [["GENRE", g.genre], ["ENGINE", g.engine], ["RELEASE", g.date], ["ROLE", g.role]].map(([a, b]) => /* @__PURE__ */ React.createElement("div", { key: a, className: "border border-white/10 p-2" }, /* @__PURE__ */ React.createElement("span", { className: "opacity-50" }, a), /* @__PURE__ */ React.createElement("br", null), b))), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-2 gap-2 text-xs" }, [["MINIMUM", g.min], ["RECOMMENDED", g.rec]].map(([t, l]) => /* @__PURE__ */ React.createElement("div", { key: t, className: "border border-white/10 p-2" }, /* @__PURE__ */ React.createElement("div", { className: "text-cyan-300 mb-1" }, t), ["OS", "CPU", "GPU", "RAM", "DISK"].map((k, i) => /* @__PURE__ */ React.createElement("div", { key: k }, /* @__PURE__ */ React.createElement("span", { className: "opacity-50" }, k, ":"), " ", l[i]))))), /* @__PURE__ */ React.createElement("div", { className: "border border-cyan-400/30 p-3 text-xs space-y-2" }, /* @__PURE__ */ React.createElement("div", null, g.file, " \xB7 ", g.size, " \xB7 ", g.ver, /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("span", { className: "opacity-60" }, "SHA-256: ", g.hash, "\u2026")), /* @__PURE__ */ React.createElement("button", { onClick: () => {
      startDl(g);
      beep(800, 0.1, snd);
    }, className: "w-full py-3 font-bold tracking-widest neon", style: { background: "rgba(0,240,255,.12)", color: "#00f0ff", border: "1px solid" } }, p == null ? `\u2B07 DOWNLOAD ${g.file.endsWith("apk") ? "APK" : "BUILD / EXE"}` : p >= 100 ? "\u2714 DOWNLOAD COMPLETE (MOCK)" : `TRANSFERRING\u2026 ${Math.floor(p)}%`), p != null && /* @__PURE__ */ React.createElement("div", { className: "h-1 bg-white/10" }, /* @__PURE__ */ React.createElement("div", { className: "h-full", style: { width: p + "%", background: "#00f0ff", boxShadow: "0 0 8px #00f0ff" } }))), /* @__PURE__ */ React.createElement("button", { className: "btn text-xs", onClick: () => setDemo(!demo) }, demo ? "CLOSE" : "LAUNCH", " WEB DEMO"), demo && /* @__PURE__ */ React.createElement("div", { className: "border border-dashed border-purple-400/60 h-32 grid place-items-center text-xs text-purple-300" }, "[ iframe placeholder \xB7 playable WebGL build mounts here ]"));
  }
  return /* @__PURE__ */ React.createElement("div", { className: "p-4 grid grid-cols-1 sm:grid-cols-2 gap-4" }, GAMES.map((g) => /* @__PURE__ */ React.createElement("button", { key: g.id, onClick: () => {
    setSel(g);
    setSl(0);
    beep(660, 0.05, snd);
  }, className: "glass text-left hover:neon transition overflow-hidden" }, /* @__PURE__ */ React.createElement(Art, { g }), /* @__PURE__ */ React.createElement("div", { className: "p-3 text-xs" }, /* @__PURE__ */ React.createElement("b", { style: { color: g.c1 } }, g.name), /* @__PURE__ */ React.createElement("div", { className: "opacity-60" }, g.genre, " \xB7 ", g.engine)))));
}
function Skills() {
  const [h, setH] = useState(null);
  const n = SKILLS.length, R = 110, pt = (i, v) => {
    const a = i / n * Math.PI * 2 - Math.PI / 2;
    return [150 + Math.cos(a) * R * v / 100, 150 + Math.sin(a) * R * v / 100];
  };
  return /* @__PURE__ */ React.createElement("div", { className: "p-4 grid md:grid-cols-2 gap-4 items-center" }, /* @__PURE__ */ React.createElement("svg", { viewBox: "0 0 300 300", className: "w-full max-w-xs mx-auto" }, [25, 50, 75, 100].map((l) => /* @__PURE__ */ React.createElement("polygon", { key: l, points: SKILLS.map((_, i) => pt(i, l).join(",")).join(" "), fill: "none", stroke: "#00f0ff", strokeOpacity: ".2" })), SKILLS.map((s, i) => {
    const [x, y] = pt(i, 100), [lx, ly] = pt(i, 122);
    return /* @__PURE__ */ React.createElement("g", { key: i }, /* @__PURE__ */ React.createElement("line", { x1: "150", y1: "150", x2: x, y2: y, stroke: "#00f0ff", strokeOpacity: ".2" }), /* @__PURE__ */ React.createElement("text", { x: lx, y: ly, fontSize: "8", fill: h === i ? "#00f0ff" : "#8fb", textAnchor: "middle" }, s[0]));
  }), /* @__PURE__ */ React.createElement("polygon", { points: SKILLS.map((s, i) => pt(i, s[1]).join(",")).join(" "), fill: "#8a2be2", fillOpacity: ".4", stroke: "#00f0ff", strokeWidth: "2", style: { filter: "drop-shadow(0 0 6px #00f0ff)" } }), SKILLS.map((s, i) => {
    const [x, y] = pt(i, s[1]);
    return /* @__PURE__ */ React.createElement("circle", { key: i, cx: x, cy: y, r: h === i ? 6 : 3.5, fill: "#00f0ff" });
  })), /* @__PURE__ */ React.createElement("div", { className: "space-y-2 text-xs" }, SKILLS.map((s, i) => /* @__PURE__ */ React.createElement("div", { key: i, onMouseEnter: () => setH(i), onMouseLeave: () => setH(null) }, /* @__PURE__ */ React.createElement("div", { className: "flex justify-between" }, /* @__PURE__ */ React.createElement("span", null, s[0]), /* @__PURE__ */ React.createElement("span", { className: "text-cyan-300" }, "LV ", s[1])), /* @__PURE__ */ React.createElement("div", { className: "h-1.5 bg-white/10" }, /* @__PURE__ */ React.createElement("div", { className: "h-full", style: { width: s[1] + "%", background: "linear-gradient(90deg,#8a2be2,#00f0ff)" } })))), /* @__PURE__ */ React.createElement("div", { className: "opacity-60 pt-2" }, "Toolchain: Blender \xB7 .obj/.fbx \xB7 Rigging \xB7 C++ \xB7 C# \xB7 Python")));
}
function Term({ startDl, setWins, snd }) {
  const [log, setLog] = useState(["Notorious X Phenom os_cli v2.6 \u2014 type help"]);
  const [v, setV] = useState("");
  const ref = useRef();
  useEffect(() => {
    ref.current && (ref.current.scrollTop = 1e6);
  }, [log]);
  const run = (c) => {
    const [cmd, ...a] = c.trim().split(/\s+/);
    const arg = a.join(" ").toLowerCase();
    let o = [];
    if (cmd === "help") o = ["help skills games download <game> contact clear"];
    else if (cmd === "skills") o = SKILLS.map((s) => `${s[0].padEnd(20)} ${"\u2588".repeat(s[1] / 5 | 0)} ${s[1]}`);
    else if (cmd === "games") o = GAMES.map((g) => `${g.id.padEnd(16)} ${g.genre} [${g.engine}]`);
    else if (cmd === "contact") o = [BIO.email, ...BIO.links];
    else if (cmd === "clear") {
      setLog([]);
      return;
    } else if (cmd === "download") {
      const g = GAMES.find((g2) => g2.id.includes(arg.replace(/\s/g, "-")) || g2.name.toLowerCase() === arg);
      o = g ? (startDl(g), [`Initiating ${g.file} (${g.size})\u2026 watch Diagnostics`]) : ["error: unknown game. try: games"];
    } else if (cmd) o = [`${cmd}: command not found`];
    setLog((l) => [...l, "> " + c, ...o]);
  };
  return /* @__PURE__ */ React.createElement("div", { className: "h-full flex flex-col p-3 text-sm bg-black/50", style: { color: "#39ff88" }, onClick: () => ref.current?.nextSibling?.querySelector("input")?.focus() }, /* @__PURE__ */ React.createElement("div", { ref, className: "flex-1 overflow-auto whitespace-pre-wrap" }, log.map((l, i) => /* @__PURE__ */ React.createElement("div", { key: i }, l))), /* @__PURE__ */ React.createElement("div", { className: "flex gap-2 pt-2" }, /* @__PURE__ */ React.createElement("span", null, "os_cli$"), /* @__PURE__ */ React.createElement("input", { autoFocus: true, value: v, onChange: (e) => setV(e.target.value), onKeyDown: (e) => {
    if (e.key === "Enter") {
      run(v);
      setV("");
      beep(400, 0.03, snd);
    }
  }, className: "flex-1 bg-transparent outline-none" })));
}
function Profile() {
  const [sent, setSent] = useState(false);
  return /* @__PURE__ */ React.createElement("div", { className: "p-4 space-y-4 text-sm" }, /* @__PURE__ */ React.createElement("div", { className: "flex gap-4 items-center" }, /* @__PURE__ */ React.createElement("img", { src: LOGO, alt: "Notorious X Phenom", className: "w-24 h-24 object-cover border border-cyan-400/50", style: { filter: "drop-shadow(0 0 8px #8a2be2)" } }), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "text-xl font-bold text-cyan-300" }, BIO.n), /* @__PURE__ */ React.createElement("div", { className: "opacity-60 text-xs" }, "Game Studio \xB7 Design & Development"), /* @__PURE__ */ React.createElement("div", { className: "text-xs text-green-400" }, "\u25CF ONLINE \xB7 open to collaborations"))), /* @__PURE__ */ React.createElement("p", { className: "opacity-80" }, "At Notorious X Phenom we design systems first, spectacle second. Every mechanic starts as a spreadsheet and a greybox, gets stress-tested against its economy, then earns its polish. Process: prototype \u2192 measure \u2192 balance \u2192 ship."), /* @__PURE__ */ React.createElement("div", { className: "text-xs opacity-70" }, "\u{1F3C6} Indie Showcase Finalist 2025 \xB7 Best Combat Design (Jam) \xB7 3\xD7 Game Jam winner"), sent ? /* @__PURE__ */ React.createElement("div", { className: "text-green-400 border border-green-400/40 p-3" }, "\u2714 SIGNAL TRANSMITTED. Expect a reply within 48h.") : /* @__PURE__ */ React.createElement("div", { className: "space-y-2 border border-cyan-400/30 p-3" }, /* @__PURE__ */ React.createElement("div", { className: "text-cyan-300 text-xs" }, "TRANSMIT SIGNAL"), ["Callsign", "Email"].map((p) => /* @__PURE__ */ React.createElement("input", { key: p, placeholder: p, className: "w-full bg-black/40 border border-white/15 p-2 outline-none focus:border-cyan-400" })), /* @__PURE__ */ React.createElement("textarea", { placeholder: "Message payload", rows: "3", className: "w-full bg-black/40 border border-white/15 p-2 outline-none focus:border-cyan-400" }), /* @__PURE__ */ React.createElement("button", { className: "btn", onClick: () => setSent(true) }, "TRANSMIT")));
}
function Diag({ dl, wins }) {
  const [cpu, setCpu] = useState([30]);
  useEffect(() => {
    const t = setInterval(() => setCpu((c) => [...c.slice(-39), Math.max(8, Math.min(95, (c.at(-1) || 30) + (Math.random() - 0.5) * 30))]), 500);
    return () => clearInterval(t);
  }, []);
  return /* @__PURE__ */ React.createElement("div", { className: "p-4 space-y-3 text-xs" }, /* @__PURE__ */ React.createElement("div", { className: "text-cyan-300" }, "CPU LOAD ", cpu.at(-1) | 0, "%"), /* @__PURE__ */ React.createElement("svg", { viewBox: "0 0 200 60", className: "w-full h-24 border border-cyan-400/30" }, /* @__PURE__ */ React.createElement("polyline", { fill: "none", stroke: "#00f0ff", points: cpu.map((v, i) => `${i * 5},${60 - v * 0.6}`).join(" ") })), /* @__PURE__ */ React.createElement("div", null, "Active windows: ", Object.values(wins).filter((w) => w.open).length, " \xB7 Mem 3.1/16 GB \xB7 Net 1 Gbps"), /* @__PURE__ */ React.createElement("div", { className: "text-cyan-300" }, "DOWNLOAD QUEUE"), Object.keys(dl).length === 0 && /* @__PURE__ */ React.createElement("div", { className: "opacity-50" }, "idle"), GAMES.filter((g) => dl[g.id] != null).map((g) => /* @__PURE__ */ React.createElement("div", { key: g.id }, g.file, " \u2014 ", Math.floor(dl[g.id]), "%", /* @__PURE__ */ React.createElement("div", { className: "h-1 bg-white/10" }, /* @__PURE__ */ React.createElement("div", { className: "h-full bg-green-400", style: { width: dl[g.id] + "%" } })))));
}
function Settings({ st, setSt }) {
  const T = ({ k, l }) => /* @__PURE__ */ React.createElement("label", { className: "flex justify-between items-center border border-white/10 p-3" }, /* @__PURE__ */ React.createElement("span", null, l), /* @__PURE__ */ React.createElement("input", { type: "checkbox", checked: st[k], onChange: (e) => setSt({ ...st, [k]: e.target.checked }) }));
  return /* @__PURE__ */ React.createElement("div", { className: "p-4 space-y-3 text-sm" }, /* @__PURE__ */ React.createElement(T, { k: "crt", l: "CRT scanlines" }), /* @__PURE__ */ React.createElement(T, { k: "snd", l: "UI audio" }), /* @__PURE__ */ React.createElement(T, { k: "glow", l: "Cursor glow" }), /* @__PURE__ */ React.createElement("div", { className: "border border-white/10 p-3" }, "Wallpaper ", /* @__PURE__ */ React.createElement("div", { className: "flex gap-2 mt-2" }, [["#0a0b10", "VOID"], ["#150a2a", "ULTRA"], ["#001a1f", "TEAL"]].map(([c, n]) => /* @__PURE__ */ React.createElement("button", { key: n, className: "btn text-xs", onClick: () => setSt({ ...st, wall: c }) }, n)))));
}
const APPS = [
  { id: "vault", t: "Games Vault", i: "vault", w: [720, 520] },
  { id: "skills", t: "Skill Matrix", i: "skills", w: [640, 440] },
  { id: "term", t: "os_cli", i: "term", w: [560, 380] },
  { id: "profile", t: "Holo-Profile", i: "user", w: [520, 560] },
  { id: "diag", t: "Diagnostics", i: "diag", w: [460, 420] },
  { id: "set", t: "Settings", i: "gear", w: [420, 340] }
];
function Win({ app, w, focus, upd, children }) {
  const drag = (e) => {
    if (w.max || e.target.closest("button")) return;
    focus();
    const sx = e.clientX - w.x, sy = e.clientY - w.y;
    const mv = (ev) => upd({ x: Math.max(0, ev.clientX - sx), y: Math.max(0, ev.clientY - sy) });
    const up = () => {
      removeEventListener("pointermove", mv);
      removeEventListener("pointerup", up);
    };
    addEventListener("pointermove", mv);
    addEventListener("pointerup", up);
  };
  const rs = (e) => {
    e.stopPropagation();
    const sx = e.clientX, sy = e.clientY, ow = w.w, oh = w.h;
    const mv = (ev) => upd({ w: Math.max(320, ow + ev.clientX - sx), h: Math.max(220, oh + ev.clientY - sy) });
    const up = () => {
      removeEventListener("pointermove", mv);
      removeEventListener("pointerup", up);
    };
    addEventListener("pointermove", mv);
    addEventListener("pointerup", up);
  };
  const st = w.max ? { left: 0, top: 0, width: "100%", height: "calc(100% - 64px)" } : { left: w.x, top: w.y, width: Math.min(w.w, innerWidth), height: w.h };
  return /* @__PURE__ */ React.createElement("div", { className: "win glass absolute flex flex-col " + (w.min ? "min" : ""), style: { ...st, zIndex: w.z, borderColor: w.active ? "#00f0ff" : void 0 }, onPointerDown: focus }, /* @__PURE__ */ React.createElement("div", { onPointerDown: drag, onDoubleClick: () => upd({ max: !w.max }), className: "flex items-center gap-2 px-3 py-2 border-b border-cyan-400/20 cursor-move select-none", style: { background: "linear-gradient(90deg,rgba(138,43,226,.3),transparent)" } }, /* @__PURE__ */ React.createElement(Ic, { n: app.i, s: 16, c: "#00f0ff" }), /* @__PURE__ */ React.createElement("span", { className: "flex-1 text-xs tracking-widest uppercase" }, app.t), /* @__PURE__ */ React.createElement("button", { onClick: () => upd({ min: true }), className: "hover:text-amber-300" }, /* @__PURE__ */ React.createElement(Ic, { n: "min", s: 16 })), /* @__PURE__ */ React.createElement("button", { onClick: () => upd({ max: !w.max }), className: "hover:text-green-300" }, /* @__PURE__ */ React.createElement(Ic, { n: "max", s: 14 })), /* @__PURE__ */ React.createElement("button", { onClick: () => upd({ open: false }), className: "hover:text-red-400" }, /* @__PURE__ */ React.createElement(Ic, { n: "x", s: 16 }))), /* @__PURE__ */ React.createElement("div", { className: "flex-1 overflow-auto" }, children), !w.max && /* @__PURE__ */ React.createElement("div", { onPointerDown: rs, className: "absolute right-0 bottom-0 w-4 h-4 cursor-se-resize", style: { borderRight: "2px solid #00f0ff", borderBottom: "2px solid #00f0ff" } }));
}
function Boot({ done }) {
  const L = ["BIOS CHECK ........ OK", "MOUNTING /vault ..... OK", "LOADING PHENOM ENGINE .. OK", "WELCOME, OPERATOR."];
  const [n, setN] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setN((x) => {
      if (x >= L.length) {
        clearInterval(t);
        setTimeout(done, 600);
        return x;
      }
      return x + 1;
    }), 520);
    return () => clearInterval(t);
  }, []);
  return /* @__PURE__ */ React.createElement("div", { className: "fixed inset-0 z-[9999] flex items-end justify-center", style: { background: "#05070c url(" + SPLASH + ") center/contain no-repeat" } }, /* @__PURE__ */ React.createElement("div", { className: "p-6 w-full max-w-md text-xs", style: { color: "#00f0ff", background: "linear-gradient(transparent,#05070c 70%)" } }, L.slice(0, n).map((l, i) => /* @__PURE__ */ React.createElement("div", { key: i }, ">", " ", l)), /* @__PURE__ */ React.createElement("div", { className: "mt-3 h-1 w-full bg-white/10" }, /* @__PURE__ */ React.createElement("div", { className: "h-full bg-cyan-400 transition-all", style: { width: n / L.length * 100 + "%", boxShadow: "0 0 8px #00f0ff" } }))));
}
function Welcome({ enter }) {
  const sp = useMemo(() => [...Array(26)].map(() => ({ l: Math.random() * 100, d: 5 + Math.random() * 8, dl: Math.random() * 8, s: 1 + Math.random() * 2 })), []);
  const P = [
    "This vortex marks the initialization of a relentless conquest\u2014pushing interactive worlds beyond uncharted horizons into the outer limits of digital craft. We reject the stagnant, formulaic boundaries of legacy gaming. Here, raw imagination collides with executable reality, forging high-octane battlefields, zero-latency simulations, and kinetic mechanics built from the ground up for total player dominion.",
    "Every pixel, custom shader, and physics model deployed in this enclave is engineered with precision and intent. These aren\u2019t merely software packages; they are living, high-performance runtime environments designed to pull you out of the ordinary and thrust you directly into the fire of interactive storytelling. Every payload is optimized, stripped of dead weight, and ready to breach your machine\u2019s hardware to deliver pure, uncompromised power."
  ];
  return /* @__PURE__ */ React.createElement("div", { className: "fixed inset-0 z-[9990] flex flex-col", style: { background: "#05070c" } }, /* @__PURE__ */ React.createElement("div", { className: "absolute inset-0 grid-bg" }), /* @__PURE__ */ React.createElement("div", { className: "absolute inset-0 pointer-events-none", style: { background: "radial-gradient(circle at 50% 15%,rgba(138,43,226,.3),transparent 55%),radial-gradient(circle at 85% 95%,rgba(255,154,60,.12),transparent 50%)" } }), sp.map((s, i) => /* @__PURE__ */ React.createElement("i", { key: i, className: "spark", style: { left: s.l + "%", width: s.s, height: s.s, animationDuration: s.d + "s", animationDelay: s.dl + "s" } })), /* @__PURE__ */ React.createElement("div", { className: "relative flex-1 overflow-auto px-5 pt-8 pb-6" }, /* @__PURE__ */ React.createElement("div", { className: "max-w-2xl mx-auto text-center space-y-6" }, /* @__PURE__ */ React.createElement("img", { src: LOGO, alt: "Notorious X Phenom", className: "rv w-44 h-44 mx-auto object-cover", style: { WebkitMaskImage: "radial-gradient(closest-side,#000 55%,transparent)", maskImage: "radial-gradient(closest-side,#000 55%,transparent)" } }), /* @__PURE__ */ React.createElement("div", { className: "rv text-[10px] tracking-[.4em] text-cyan-300/70", style: { animationDelay: ".3s" } }, "// INCOMING TRANSMISSION //"), /* @__PURE__ */ React.createElement("h1", { className: "rv font-bold leading-snug", style: { animationDelay: ".6s", fontSize: "clamp(1.4rem,4.5vw,2.2rem)", color: "#00f0ff", textShadow: "0 0 16px rgba(0,240,255,.7),0 0 40px rgba(138,43,226,.6)" } }, "Welcome to the nexus for mavericks, Ciphers, Anomalie and digital architects."), P.map((p, i) => /* @__PURE__ */ React.createElement("p", { key: i, className: "rv glass p-4 text-sm leading-relaxed text-left", style: { animationDelay: 1.2 + i * 0.9 + "s", color: "rgba(216,246,255,.88)" } }, p)), /* @__PURE__ */ React.createElement("p", { className: "rv text-lg font-bold tracking-wide", style: { animationDelay: "3.2s", color: "#ffb000", textShadow: "0 0 12px rgba(255,176,0,.6)" } }, "The firewall is down. The protocols are cleared."), /* @__PURE__ */ React.createElement("p", { className: "rv text-xl font-bold tracking-wide glitch", style: { animationDelay: "4s", color: "#fff", textShadow: "0 0 10px #00f0ff,0 0 26px #8a2be2" } }, "Jack in. Download the binaries. Welcome to the Oblivion."))), /* @__PURE__ */ React.createElement("div", { className: "rv relative p-4 text-center", style: { animationDelay: "4.6s", background: "linear-gradient(transparent,#05070c 45%)" } }, /* @__PURE__ */ React.createElement("button", { onClick: enter, className: "px-8 py-3 font-bold tracking-[.3em] text-sm neon", style: { background: "rgba(0,240,255,.12)", color: "#00f0ff", border: "1px solid #00f0ff", animation: "pulse 2s infinite" } }, "\u25B6 ENTER THE OBLIVION")));
}
const ORB_ST = { idle: [1, 0, 0, 1], listening: [1.5, 0.025, 0, 1.2], thinking: [3.2, 0, 0, 1.4], speaking: [2, 0, 1, 1.3] };
const rgbH = (h) => {
  const n = parseInt(h.slice(1), 16);
  return [n >> 16 & 255, n >> 8 & 255, n & 255];
};
const mixc = (a, b, t) => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t];
const sstep = (a, b, x) => {
  x = Math.max(0, Math.min(1, (x - a) / (b - a)));
  return x * x * (3 - 2 * x);
};
const rg = (c, a) => `rgba(${c[0] | 0},${c[1] | 0},${c[2] | 0},${a})`;
function AIOrb({ size = 160, extras, colors = ["#c8321e", "#ff6a28", "#ffb04a", "#2fd0ff"], speed = 1, glow = 1, state = "idle", interactive = true, className = "", style = {} }) {
  const cv = useRef();
  const [fb, setFb] = useState(false);
  const S = useRef(state), P = useRef({ speed, glow });
  S.current = state;
  P.current = { speed, glow };
  const detail = size >= 260, ex = extras ?? detail, asp = ex ? 1.75 : 1, ck = colors.join();
  useEffect(() => {
    const c = cv.current;
    if (!c) return;
    let ctx = null;
    try {
      ctx = c.getContext("2d");
    } catch (e) {
    }
    if (!ctx) {
      setFb(true);
      return;
    }
    const [cD, cM, cL, cR] = colors.map(rgbH), Y = [255, 214, 64];
    const N = detail ? 1100 : size >= 100 ? 420 : 200, NC = detail ? 240 : 90, ga = Math.PI * (3 - Math.sqrt(5));
    const fib = (n, f) => [...Array(n)].map((_, i) => {
      const y = 1 - 2 * (i + 0.5) / n, r = Math.sqrt(1 - y * y), a = i * ga;
      return f({ x: Math.cos(a) * r, y, z: Math.sin(a) * r, n: Math.random(), k: 0.7 + Math.random() * 0.6, ph: Math.random() * 6.28 });
    });
    const pts = fib(N, (o) => o), core = fib(NC, (o) => o);
    const nodes = ex ? [...Array(20)].map((_, i) => ({ lat: (i * 0.6180339 % 1 - 0.5) * 2.2, lon: i * 2.399, rad: 1.5 + i * 0.37 % 1 * 0.5 })) : [];
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches, dpr = Math.min(devicePixelRatio || 1, 2);
    let raf = 0, vis = true, t = Math.random() * 10, last = 0;
    const cur = { s: 1, b: 0, w: 0, g: 1 }, m = { x: 0, y: 0 }, tm = { x: 0, y: 0 };
    const resize = () => {
      c.width = Math.max(64, Math.round(c.clientWidth * dpr));
      c.height = Math.max(64, Math.round(c.clientHeight * dpr));
    };
    const ro = new ResizeObserver(resize);
    ro.observe(c);
    resize();
    const glyph = (i, s) => {
      ctx.beginPath();
      switch (i % 5) {
        case 0:
          ctx.moveTo(0.2 * s, -s);
          ctx.lineTo(-0.5 * s, 0.1 * s);
          ctx.lineTo(0, 0.1 * s);
          ctx.lineTo(-0.2 * s, s);
          ctx.lineTo(0.5 * s, -0.2 * s);
          ctx.lineTo(0, -0.2 * s);
          ctx.closePath();
          break;
        case 1:
          ctx.moveTo(0, -s);
          ctx.lineTo(s, 0.8 * s);
          ctx.lineTo(-s, 0.8 * s);
          ctx.closePath();
          break;
        case 2:
          ctx.arc(0, 0, 0.25 * s, 0, 6.3);
          [[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(([a, b]) => {
            ctx.moveTo(0.3 * a * s, 0.3 * b * s);
            ctx.lineTo(0.85 * a * s, 0.85 * b * s);
          });
          break;
        case 3:
          ctx.moveTo(0, -s);
          ctx.lineTo(s, 0);
          ctx.lineTo(0, s);
          ctx.lineTo(-s, 0);
          ctx.closePath();
          break;
        default:
          ctx.arc(0, 0, 0.7 * s, 0, 6.3);
      }
      ctx.stroke();
    };
    const draw = () => {
      const W = c.width, H = c.height, cx = W / 2, cy = H / 2, R0 = H * (ex ? 0.33 : 0.3), Rr = R0 * (1 + cur.b * Math.sin(t * 2.2)), G = cur.g * P.current.glow;
      ctx.clearRect(0, 0, W, H);
      const yaw = t * 0.28 + m.x * 0.5, pit = -0.35 + m.y * 0.3, ca = Math.cos(yaw), sa = Math.sin(yaw), cp = Math.cos(pit), sp = Math.sin(pit);
      let g = ctx.createRadialGradient(cx, cy, Rr * 0.6, cx, cy, Rr * 1.8);
      g.addColorStop(0, rg(cM, 0.2 * G));
      g.addColorStop(1, rg(cM, 0));
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, W, H);
      const th = 0.4, sT = Math.sin(th), cT = Math.cos(th), roll = -0.15, cr = Math.cos(roll), sr = Math.sin(roll), RR = Rr * 1.5;
      const rp = (ph) => {
        const x = Math.cos(ph) * RR, z = Math.sin(ph) * RR, y = -z * sT, z2 = z * cT;
        return [cx + x * cr - y * sr, cy + x * sr + y * cr, z2];
      };
      const ringGlow = (fr) => {
        for (const [w, a] of [[Rr * 0.07, 0.1], [Rr * 0.022, 0.4]]) {
          ctx.lineWidth = w;
          ctx.strokeStyle = rg([255, 176, 60], a * G);
          ctx.beginPath();
          let on = false;
          for (let i = 0; i <= 96; i++) {
            const p = rp(i / 96 * 6.2832);
            if (p[2] >= 0 === fr) {
              on ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1]);
              on = true;
            } else on = false;
          }
          ctx.stroke();
        }
      };
      const ringDots = (fr) => {
        const n = detail ? 48 : 32;
        for (let i = 0; i < n; i++) {
          const p = rp(i / n * 6.2832 + t * 0.12);
          if (p[2] >= 0 !== fr) continue;
          if (!fr && Math.hypot(p[0] - cx, p[1] - cy) < Rr * 0.98) continue;
          const r = Rr * 0.034 * (0.85 + 0.25 * p[2] / RR), al = fr ? 1 : 0.55;
          ctx.fillStyle = `rgba(24,14,8,${0.9 * al})`;
          ctx.strokeStyle = rg([255, 176, 60], 0.9 * al);
          ctx.lineWidth = Math.max(1, r * 0.28);
          ctx.beginPath();
          ctx.arc(p[0], p[1], r, 0, 6.3);
          ctx.fill();
          ctx.stroke();
          ctx.fillStyle = rg([255, 214, 150], 0.8 * al);
          ctx.fillRect(p[0] - r * 0.25, p[1] - r * 0.25, r * 0.5, r * 0.5);
        }
      };
      ringGlow(false);
      ringDots(false);
      const proj = (p) => {
        const x1 = p.x * ca + p.z * sa, z1 = -p.x * sa + p.z * ca;
        return [x1, p.y * cp - z1 * sp, p.y * sp + z1 * cp];
      };
      for (const front of [false, true]) {
        for (let i = 0; i < N; i++) {
          const p = pts[i], [x, y, z] = proj(p);
          if (z >= 0 !== front) continue;
          const e = front ? 1 - z : 0;
          let col = mixc(mixc(cD, cM, p.n), cL, sstep(0.78, 1, p.n) * 0.6);
          col = mixc(col, cL, sstep(0.4, 0.95, -y) * 0.5);
          const tt = sstep(0.58, 0.98, x) * (front ? 1 : 0.6);
          if (tt > 0) col = tt < 0.5 ? mixc(col, Y, tt * 2) : mixc(Y, cR, (tt - 0.5) * 2);
          let a = front ? 0.3 + 0.7 * Math.pow(e, 1.1) : 0.1 + 0.22 * (1 + z), r = front ? Rr * 0.017 * (0.4 + 0.9 * e) * p.k : Rr * 0.011 * p.k;
          a *= 0.85 + 0.15 * Math.sin(t * 2 + p.ph);
          r *= 1 + 0.35 * cur.w * Math.sin(t * 8 - y * 7);
          if (!reduce) a = Math.min(1, a * (0.9 + 0.1 * G));
          ctx.fillStyle = rg(col, a.toFixed(2));
          const X = cx + x * Rr, Y2 = cy + y * Rr;
          if (r < 1) ctx.fillRect(X - 0.5, Y2 - 0.5, 1, 1);
          else {
            ctx.beginPath();
            ctx.arc(X, Y2, r, 0, 6.3);
            ctx.fill();
          }
        }
      }
      g = ctx.createRadialGradient(cx, cy, 0, cx, cy, Rr * 0.36);
      g.addColorStop(0, `rgba(255,236,210,${0.26 * G})`);
      g.addColorStop(1, "rgba(255,236,210,0)");
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(cx, cy, Rr * 0.36, 0, 6.3);
      ctx.fill();
      const cy2 = Math.cos(-yaw * 1.3), sy2 = Math.sin(-yaw * 1.3);
      for (let i = 0; i < NC; i++) {
        const p = core[i], x = p.x * cy2 + p.z * sy2, z = -p.x * sy2 + p.z * cy2;
        if (z < 0) continue;
        ctx.fillStyle = rg([255, 238, 215], (0.4 + 0.6 * z).toFixed(2));
        const r = Rr * 0.011 * (0.6 + 0.6 * z);
        ctx.beginPath();
        ctx.arc(cx + x * Rr * 0.27, cy + p.y * Rr * 0.27, r, 0, 6.3);
        ctx.fill();
      }
      ringGlow(true);
      ringDots(true);
      if (ex) {
        const hr = Rr * 0.115;
        nodes.forEach((n, i) => {
          const lon = n.lon + t * 0.08, x = Math.cos(n.lat) * Math.sin(lon) * n.rad, y = Math.sin(n.lat) * n.rad * 0.75, z = Math.cos(n.lat) * Math.cos(lon);
          const X = cx + x * Rr, Y2 = cy + y * Rr;
          if (Math.hypot(X - cx, Y2 - cy) < Rr * 1.25) return;
          const al = z >= 0 ? 1 : 0.4;
          ctx.save();
          ctx.translate(X, Y2);
          ctx.beginPath();
          for (let k = 0; k < 6; k++) {
            const an = k * Math.PI / 3 + Math.PI / 6;
            ctx.lineTo(Math.cos(an) * hr, Math.sin(an) * hr);
          }
          ctx.closePath();
          ctx.fillStyle = `rgba(10,16,30,${0.85 * al})`;
          ctx.fill();
          ctx.strokeStyle = rg([120, 170, 255], 0.85 * al);
          ctx.lineWidth = 1.2;
          ctx.stroke();
          ctx.strokeStyle = rg([225, 238, 255], 0.9 * al);
          glyph(i, hr * 0.45);
          ctx.restore();
        });
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.font = `600 ${Math.max(8, Math.round(Rr * 0.075))}px ui-monospace,Menlo,monospace`;
        try {
          ctx.letterSpacing = Math.round(Rr * 0.03) + "px";
        } catch (e) {
        }
        [["MEMORY", 0, -1.18, [181, 140, 255]], ["APPLICATIONS", 1.9, -0.63, [157, 180, 224]], ["ROUTINES", -1.63, -0.34, [255, 179, 71]], ["SKILLS", 0, 0.42, [255, 255, 255]], ["AGENTS.md", 0, 0.1, [255, 255, 255]]].forEach(([s, x, y, col], i) => {
          ctx.fillStyle = rg(col, i > 3 ? 0.7 : 0.95);
          ctx.fillText(s, cx + x * Rr, cy + y * Rr);
        });
      }
    };
    const loop = (now) => {
      raf = 0;
      const dt = Math.min(0.05, (now - last) / 1e3 || 0.016);
      last = now;
      const T = ORB_ST[S.current] || ORB_ST.idle, k = 1 - Math.exp(-dt * 4);
      cur.s += (T[0] - cur.s) * k;
      cur.b += (T[1] - cur.b) * k;
      cur.w += (T[2] - cur.w) * k;
      cur.g += (T[3] - cur.g) * k;
      t += dt * cur.s * P.current.speed * (reduce ? 0.1 : 1);
      m.x += (tm.x - m.x) * k * 0.8;
      m.y += (tm.y - m.y) * k * 0.8;
      draw();
      if (vis && !document.hidden) raf = requestAnimationFrame(loop);
    };
    const start = () => {
      if (!raf) raf = requestAnimationFrame(loop);
    };
    const io = new IntersectionObserver((e) => {
      vis = e[0].isIntersecting;
      if (vis) start();
    });
    io.observe(c);
    const vc = () => {
      if (!document.hidden) start();
    };
    document.addEventListener("visibilitychange", vc);
    const mv = (e) => {
      if (!interactive || reduce) return;
      const r = c.getBoundingClientRect();
      tm.x = Math.max(-1, Math.min(1, (e.clientX - r.left - r.width / 2) / (innerWidth / 2)));
      tm.y = Math.max(-1, Math.min(1, (e.clientY - r.top - r.height / 2) / (innerHeight / 2)));
    };
    addEventListener("pointermove", mv);
    start();
    return () => {
      cancelAnimationFrame(raf);
      raf = 0;
      vis = false;
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", vc);
      removeEventListener("pointermove", mv);
    };
  }, [ck, interactive, detail, ex]);
  return /* @__PURE__ */ React.createElement("div", { role: "img", "aria-label": "AI orb, " + state, className, style: { position: "relative", width: `min(${Math.round(size * asp)}px,${ex ? 92 : 45}vw)`, aspectRatio: String(asp), pointerEvents: "none", ...style } }, fb ? /* @__PURE__ */ React.createElement("div", { style: { position: "absolute", inset: "15%", borderRadius: "50%", background: `radial-gradient(circle at 35% 30%,${colors[2]},${colors[1]} 45%,${colors[0]})`, boxShadow: `0 0 ${30 * glow}px ${colors[1]}aa`, animation: "orbf 4s ease-in-out infinite" } }) : /* @__PURE__ */ React.createElement("canvas", { ref: cv, style: { position: "absolute", inset: 0, width: "100%", height: "100%" } }));
}
function OrbStage({ apps, open, state, toggle }) {
  const ob = useRef(), els = useRef([]), hov = useRef(false);
  useEffect(() => {
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf, last = performance.now(), ang = 0;
    const loop = (now) => {
      const dt = Math.min(0.05, (now - last) / 1e3);
      last = now;
      if (!hov.current) ang += dt * (reduce ? 0.03 : 0.22);
      const W = ob.current ? ob.current.offsetWidth : 400, rx = W * 0.66, ry = rx * 0.4, n = apps.length;
      els.current.forEach((el, i) => {
        if (!el) return;
        const a = ang + i * 6.2832 / n, z = Math.sin(a);
        el.style.transform = `translate(${Math.cos(a) * rx}px,${-z * ry}px) translate(-50%,-50%) scale(${0.82 + 0.22 * z})`;
        el.style.opacity = 0.55 + 0.45 * (z + 1) / 2;
        el.style.zIndex = z > 0 ? 3 : 1;
      });
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [apps.length]);
  return /* @__PURE__ */ React.createElement("div", { className: "absolute pointer-events-none", style: { left: "50%", top: "45%", width: 0, height: 0, zIndex: 0 } }, /* @__PURE__ */ React.createElement("button", { ref: ob, "aria-label": "Toggle AI Orb", onClick: (e) => {
    e.stopPropagation();
    toggle();
  }, className: "absolute pointer-events-auto", style: { left: 0, top: 0, transform: "translate(-50%,-50%)", background: "none", border: 0, padding: 0, cursor: "pointer", zIndex: 2, width: "min(440px,78vw)", aspectRatio: "1" } }, /* @__PURE__ */ React.createElement(AIOrb, { size: 440, extras: false, state, style: { width: "100%" } })), apps.map((a, i) => /* @__PURE__ */ React.createElement("button", { key: a.id, ref: (el) => els.current[i] = el, onClick: (e) => {
    e.stopPropagation();
    open(a.id);
  }, onPointerEnter: () => hov.current = true, onPointerLeave: () => hov.current = false, className: "ico absolute pointer-events-auto flex flex-col items-center gap-1 text-[10px] text-cyan-200", style: { left: 0, top: 0, transition: "filter .15s" } }, /* @__PURE__ */ React.createElement("span", { className: "relative grid place-items-center", style: { width: 64, height: 72 } }, /* @__PURE__ */ React.createElement("svg", { viewBox: "0 0 64 72", className: "absolute inset-0" }, /* @__PURE__ */ React.createElement("polygon", { points: "32,2 61,18 61,54 32,70 3,54 3,18", fill: "rgba(10,16,30,.88)", stroke: "#78aaff", strokeWidth: "1.5" })), /* @__PURE__ */ React.createElement(Ic, { n: a.i, s: 26, c: "#00f0ff" })), a.t)));
}
function Orb({ open, snd }) {
  const [on, setOn] = useState(false);
  const [busy, setBusy] = useState(false);
  const [sp, setSp] = useState(false);
  const [v, setV] = useState("");
  const ref = useRef();
  const [msgs, setMsgs] = useState([{ r: "ai", t: "I am PHENOM-AI, the studio core. Ask about games, skills, downloads or contact." }]);
  useEffect(() => {
    ref.current && (ref.current.scrollTop = 1e6);
  }, [msgs, busy]);
  const ans = (q) => {
    q = q.toLowerCase();
    if (/^(hi|hello|hey)/.test(q)) return "Signal received, operator. What do you need?";
    if (/game|vault|play|title/.test(q)) {
      open("vault");
      return "Opening the Games Vault. Titles: " + GAMES.map((g) => g.name).join(", ") + ".";
    }
    if (/skill|tech|stack|engine|tool/.test(q)) {
      open("skills");
      return "Skill Matrix online. Core: Unreal, Unity, Ursina, C++/C#/Python, 3D modeling, systems and combat design.";
    }
    if (/download|build|apk|exe/.test(q)) return "Open a game in the Vault and press DOWNLOAD, or use os_cli: download <game>. Valid IDs: " + GAMES.map((g) => g.id).join(", ") + ".";
    if (/contact|email|hire|reach|message/.test(q)) {
      open("profile");
      return "Transmit a signal through Holo-Profile, or write to " + BIO.email + ".";
    }
    if (/terminal|cli|shell|command/.test(q)) {
      open("term");
      return "os_cli launched. Type help.";
    }
    if (/who|studio|about|phenom|notorious/.test(q)) {
      open("profile");
      return "Notorious X Phenom is a game studio building high-octane action, simulation and prototype titles.";
    }
    return "No match in my local index. Try: games, skills, download, contact, terminal.";
  };
  const send = (t) => {
    t = t.trim();
    if (!t || busy) return;
    setMsgs((m) => [...m, { r: "u", t }]);
    setV("");
    setBusy(true);
    beep(500, 0.04, snd);
    setTimeout(() => {
      setMsgs((m) => [...m, { r: "ai", t: ans(t) }]);
      setBusy(false);
      setSp(true);
      setTimeout(() => setSp(false), 1800);
      beep(760, 0.06, snd);
    }, 700);
  };
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(OrbStage, { apps: APPS, open, state: busy ? "thinking" : sp ? "speaking" : on ? "listening" : "idle", toggle: () => {
    setOn((o) => !o);
    beep(620, 0.06, snd);
  } }), /* @__PURE__ */ React.createElement("div", { className: "absolute z-[9200] flex flex-col items-end gap-4", style: { right: 20, bottom: 88 }, onClick: (e) => e.stopPropagation(), onContextMenu: (e) => e.stopPropagation() }, on && /* @__PURE__ */ React.createElement("div", { className: "glass w-[min(330px,90vw)] h-80 flex flex-col text-xs" }, /* @__PURE__ */ React.createElement("div", { className: "flex justify-between items-center px-3 py-2 border-b border-cyan-400/20 text-cyan-300 tracking-widest", style: { background: "linear-gradient(90deg,rgba(138,43,226,.3),transparent)" } }, "PHENOM-AI // CORE", /* @__PURE__ */ React.createElement("button", { onClick: () => setOn(false) }, /* @__PURE__ */ React.createElement(Ic, { n: "x", s: 14 }))), /* @__PURE__ */ React.createElement("div", { ref, className: "flex-1 overflow-auto p-3 space-y-2" }, msgs.map((m, i) => /* @__PURE__ */ React.createElement("div", { key: i, className: m.r === "u" ? "text-right" : "" }, /* @__PURE__ */ React.createElement("span", { className: "inline-block px-2 py-1.5 max-w-[85%] text-left", style: { border: "1px solid " + (m.r === "u" ? "#8a2be2" : "#00f0ff55"), background: m.r === "u" ? "rgba(138,43,226,.2)" : "rgba(0,240,255,.07)" } }, m.t))), busy && /* @__PURE__ */ React.createElement("div", { className: "text-cyan-300 animate-pulse" }, "processing\u2026")), /* @__PURE__ */ React.createElement("div", { className: "flex gap-1 px-2 flex-wrap" }, ["games", "skills", "download", "contact"].map((c) => /* @__PURE__ */ React.createElement("button", { key: c, className: "btn text-[10px] !px-2 !py-0.5", onClick: () => send(c) }, c))), /* @__PURE__ */ React.createElement("div", { className: "flex gap-2 p-2" }, /* @__PURE__ */ React.createElement("input", { value: v, onChange: (e) => setV(e.target.value), onKeyDown: (e) => e.key === "Enter" && send(v), placeholder: "Ask the orb\u2026", className: "flex-1 bg-black/40 border border-white/15 p-2 outline-none focus:border-cyan-400" }), /* @__PURE__ */ React.createElement("button", { className: "btn", onClick: () => send(v) }, "\u25B6")))));
}
function App() {
  const [boot, setBoot] = useState(true);
  const [welcome, setWelcome] = useState(true);
  const [st, setSt] = useState({ crt: false, snd: true, glow: true, wall: "#0a0b10" });
  const [wins, setWins] = useState(() => Object.fromEntries(APPS.map((a, i) => [a.id, { open: false, min: false, max: false, x: 60 + i * 34, y: 50 + i * 28, w: a.w[0], h: a.w[1], z: 1 }])));
  const [top, setTop] = useState(1);
  const [act, setAct] = useState(null);
  const [dl, setDl] = useState({});
  const [menu, setMenu] = useState(null);
  const [drawer, setDrawer] = useState(false);
  const [q, setQ] = useState("");
  const [now, setNow] = useState(/* @__PURE__ */ new Date());
  const [bat, setBat] = useState(87);
  const [mouse, setMouse] = useState([0, 0]);
  const [info, setInfo] = useState(false);
  useEffect(() => {
    const t = setInterval(() => {
      setNow(/* @__PURE__ */ new Date());
      setBat((b) => Math.max(20, b - (Math.random() < 0.1 ? 1 : 0)));
    }, 1e3);
    return () => clearInterval(t);
  }, []);
  useEffect(() => {
    const t = setInterval(() => setDl((d) => {
      let ch = false;
      const n = { ...d };
      for (const k in n) if (n[k] < 100) {
        n[k] = Math.min(100, n[k] + Math.random() * 9);
        ch = true;
      }
      return ch ? n : d;
    }), 250);
    return () => clearInterval(t);
  }, []);
  const startDl = (g) => setDl((d) => d[g.id] != null && d[g.id] < 100 ? d : { ...d, [g.id]: 0 });
  const focus = (id) => {
    setTop((t) => t + 1);
    setAct(id);
    setWins((w) => ({ ...w, [id]: { ...w[id], z: top + 1 } }));
  };
  const upd = (id) => (p) => setWins((w) => ({ ...w, [id]: { ...w[id], ...p } }));
  const open = (id) => {
    beep(700, 0.06, st.snd);
    setTop((t) => t + 1);
    setAct(id);
    setWins((w) => ({ ...w, [id]: { ...w[id], open: true, min: false, z: top + 1 } }));
    setDrawer(false);
  };
  const body = { vault: /* @__PURE__ */ React.createElement(Vault, { dl, startDl, snd: st.snd }), skills: /* @__PURE__ */ React.createElement(Skills, null), term: /* @__PURE__ */ React.createElement(Term, { startDl, snd: st.snd }), profile: /* @__PURE__ */ React.createElement(Profile, null), diag: /* @__PURE__ */ React.createElement(Diag, { dl, wins }), set: /* @__PURE__ */ React.createElement(Settings, { st, setSt }) };
  const list = APPS.filter((a) => a.t.toLowerCase().includes(q.toLowerCase()));
  return /* @__PURE__ */ React.createElement("div", { className: "relative h-full w-full " + (st.crt ? "crt" : ""), style: { background: st.wall }, onClick: () => {
    setMenu(null);
  }, onPointerMove: (e) => setMouse([e.clientX, e.clientY]), onContextMenu: (e) => {
    e.preventDefault();
    setMenu([e.clientX, e.clientY]);
  } }, boot && /* @__PURE__ */ React.createElement(Boot, { done: () => setBoot(false) }), !boot && welcome && /* @__PURE__ */ React.createElement(Welcome, { enter: () => {
    beep(900, 0.12, st.snd);
    setWelcome(false);
  } }), /* @__PURE__ */ React.createElement("div", { className: "absolute inset-0 grid-bg" }), /* @__PURE__ */ React.createElement("div", { className: "absolute top-3 right-4 text-[10px] tracking-[.3em] text-cyan-300/70 pointer-events-none" }, "NOTORIOUS ", /* @__PURE__ */ React.createElement("span", { style: { color: "#ff9a3c" } }, "X"), " PHENOM"), /* @__PURE__ */ React.createElement("div", { className: "absolute inset-0", style: { background: "radial-gradient(circle at 70% 20%,rgba(138,43,226,.22),transparent 55%)" } }), APPS.map((a) => wins[a.id].open && /* @__PURE__ */ React.createElement(Win, { key: a.id, app: a, w: { ...wins[a.id], active: act === a.id }, focus: () => focus(a.id), upd: upd(a.id) }, body[a.id])), info && /* @__PURE__ */ React.createElement("div", { className: "glass absolute top-1/3 left-1/2 -translate-x-1/2 p-5 text-xs z-[9000]", onClick: (e) => e.stopPropagation() }, "Notorious X Phenom OS 2.6 \xB7 Kernel NEON-7", /* @__PURE__ */ React.createElement("br", null), "React 18 \xB7 Tailwind \xB7 Web Audio", /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("button", { className: "btn mt-3", onClick: () => setInfo(false) }, "OK")), menu && /* @__PURE__ */ React.createElement("div", { className: "glass absolute z-[9500] text-xs w-44", style: { left: Math.min(menu[0], innerWidth - 180), top: Math.min(menu[1], innerHeight - 140) } }, [["Refresh", () => {
    setBoot(true);
    setWelcome(true);
  }], ["Change Wallpaper", () => setSt((s) => ({ ...s, wall: ["#0a0b10", "#150a2a", "#001a1f"][(["#0a0b10", "#150a2a", "#001a1f"].indexOf(s.wall) + 1) % 3] }))], ["System Info", () => setInfo(true)]].map(([l, f]) => /* @__PURE__ */ React.createElement("button", { key: l, className: "block w-full text-left px-3 py-2 hover:bg-cyan-400/20", onClick: f }, l))), drawer && /* @__PURE__ */ React.createElement("div", { className: "glass absolute left-1/2 -translate-x-1/2 bottom-20 w-[min(420px,94vw)] p-4 z-[9000]", onClick: (e) => e.stopPropagation() }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2 border-b border-cyan-400/30 pb-2 mb-3" }, /* @__PURE__ */ React.createElement(Ic, { n: "search", s: 16 }), /* @__PURE__ */ React.createElement("input", { autoFocus: true, value: q, onChange: (e) => setQ(e.target.value), placeholder: "Search launch matrix\u2026", className: "bg-transparent outline-none flex-1 text-sm" })), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-3 gap-3" }, list.map((a) => /* @__PURE__ */ React.createElement("button", { key: a.id, onClick: () => open(a.id), className: "ico flex flex-col items-center gap-1 text-[10px]" }, /* @__PURE__ */ React.createElement("span", { className: "glass w-12 h-12 grid place-items-center" }, /* @__PURE__ */ React.createElement(Ic, { n: a.i, c: "#00f0ff" })), a.t)))), /* @__PURE__ */ React.createElement("div", { className: "glass absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2 px-3 py-2 z-[9100] max-w-[96vw]", onClick: (e) => e.stopPropagation(), style: { borderRadius: 14 } }, /* @__PURE__ */ React.createElement("button", { onClick: () => {
    setDrawer(!drawer);
    setQ("");
  }, className: "btn flex items-center gap-1 text-xs" }, /* @__PURE__ */ React.createElement("img", { src: LOGO, alt: "", className: "w-5 h-5 object-cover" }), "LAUNCH"), APPS.filter((a) => wins[a.id].open).map((a) => /* @__PURE__ */ React.createElement("button", { key: a.id, onClick: () => wins[a.id].min || act !== a.id ? open(a.id) : upd(a.id)({ min: true }), className: "ico p-1.5 relative", style: { color: wins[a.id].min ? "#667" : "#00f0ff" } }, /* @__PURE__ */ React.createElement(Ic, { n: a.i, s: 20 }), act === a.id && !wins[a.id].min && /* @__PURE__ */ React.createElement("i", { className: "absolute -bottom-1 left-1/2 w-1 h-1 rounded-full bg-cyan-300" }))), /* @__PURE__ */ React.createElement("span", { className: "w-px h-6 bg-white/20" }), /* @__PURE__ */ React.createElement("button", { onClick: () => setSt({ ...st, snd: !st.snd }), style: { opacity: st.snd ? 1 : 0.4 } }, /* @__PURE__ */ React.createElement(Ic, { n: "vol", s: 16 })), /* @__PURE__ */ React.createElement("span", { className: "text-[10px] text-green-400 hidden sm:inline" }, "\u25AE NET \xB7 ", bat, "%"), /* @__PURE__ */ React.createElement("span", { className: "text-xs text-amber-300" }, now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" }))), /* @__PURE__ */ React.createElement(Orb, { open, snd: st.snd }), st.glow && /* @__PURE__ */ React.createElement("div", { className: "pointer-events-none fixed w-24 h-24 rounded-full z-[99998]", style: { left: mouse[0] - 48, top: mouse[1] - 48, background: "radial-gradient(circle,rgba(0,240,255,.18),transparent 70%)" } }));
}
ReactDOM.createRoot(document.getElementById("root")).render(/* @__PURE__ */ React.createElement(App, null));
