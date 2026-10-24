/* Decorative images are static files; next/image optimisation is not needed here. */
/* eslint-disable @next/next/no-img-element */
"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { FabricScene } from "./fabric-scene";

const chapters = ["Portada", "Enfoque", "Desmodus", "Bbeat", "Calcifer", "Trayectoria", "Contacto"];
const slugs = ["portada", "enfoque", "desmodus", "bbeat", "calcifer", "trayectoria", "contacto"];

const tools = [
  { name: "PYTHON", group: "LANG" }, { name: "TYPESCRIPT", group: "LANG" }, { name: "JAVASCRIPT", group: "LANG" },
  { name: "GO", group: "LANG" }, { name: "C++", group: "LANG" }, { name: "FASTAPI", group: "BACK" },
  { name: "DJANGO", group: "BACK" }, { name: "NODE.JS", group: "BACK" }, { name: "WEBSOCKETS", group: "BACK" },
  { name: "WEB3", group: "BACK" }, { name: "REACT", group: "FRONT" }, { name: "NEXT.JS", group: "FRONT" },
  { name: "SVELTEKIT", group: "FRONT" }, { name: "TAILWIND", group: "FRONT" }, { name: "PWA", group: "FRONT" },
  { name: "POSTGRESQL", group: "DATA" }, { name: "SQLITE", group: "DATA" }, { name: "MONGODB", group: "DATA" },
  { name: "REDIS", group: "DATA" }, { name: "SUBGRAPHS", group: "DATA" }, { name: "DOCKER", group: "OPS" },
  { name: "KUBERNETES", group: "OPS" }, { name: "LINUX", group: "OPS" }, { name: "NGINX", group: "OPS" },
  { name: "CI/CD", group: "OPS" }, { name: "LLMs", group: "AI + SEC" }, { name: "RAG", group: "AI + SEC" },
  { name: "AI AGENTS", group: "AI + SEC" }, { name: "OSINT", group: "AI + SEC" }, { name: "CTI", group: "AI + SEC" },
];

const method = ["Entender", "Investigar", "Construir", "Operar"];
const harness = ["CONTEXT", "ROUTER", "MODEL", "TOOLS", "POLICY", "TRACE"];

const vars = (values: Record<string, string | number>) => values as React.CSSProperties;

function Loader() {
  const [done, setDone] = useState(false);
  useEffect(() => {
    let seen = false;
    try { seen = sessionStorage.getItem("howl-loader-seen") === "1"; } catch { /* storage unavailable */ }
    const hasDeepLink = location.hash.length > 1;
    const id = setTimeout(() => setDone(true), seen || hasDeepLink ? 40 : 2300);
    try { sessionStorage.setItem("howl-loader-seen", "1"); } catch { /* storage unavailable */ }
    return () => clearTimeout(id);
  }, []);
  return (
    <div className={`loader ${done ? "loader-done" : ""}`} aria-hidden="true">
      <div className="loader-core">
        <svg className="loader-ring" viewBox="0 0 120 120">
          <circle className="loader-track" cx="60" cy="60" r="52" />
          <circle className="loader-arc" cx="60" cy="60" r="52" pathLength="1" />
        </svg>
        <i className="loader-flare" />
      </div>
      <div className="loader-name">Adrián Gómez</div>
      <div className="boot-log">
        <span style={vars({ "--n": 22, "--t": "0.2s" })}>BIOS v26.10 · howl.wtf</span>
        <span style={vars({ "--n": 31, "--t": "0.7s" })}>memory check .......... 640K OK</span>
        <span style={vars({ "--n": 24, "--t": "1.3s" })}>loading adrian_gomez.sys</span>
        <span style={vars({ "--n": 6, "--t": "1.85s" })}>ready_</span>
      </div>
      <div className="loader-meta">PORTFOLIO / 2026 · CARTAGENA / ES</div>
    </div>
  );
}

function MotionLayer() {
  const cursor = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const move = (event: PointerEvent) => {
      const node = cursor.current;
      if (!node) return;
      node.style.transform = `translate3d(${event.clientX}px,${event.clientY}px,0)`;
      node.style.opacity = "1";
      document.body.classList.add("has-cursor");
      const target = event.target instanceof Element ? event.target : null;
      node.classList.toggle("is-hot", Boolean(target?.closest("a, button, [role='button']")));
    };
    addEventListener("pointermove", move, { passive: true });
    return () => {
      removeEventListener("pointermove", move);
      document.body.classList.remove("has-cursor");
    };
  }, []);
  return <div className="cursor" ref={cursor} aria-hidden="true" style={{ opacity: 0 }}><i /></div>;
}

function isInteractiveTarget(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) return false;
  return ["BUTTON", "A", "INPUT", "TEXTAREA", "SELECT"].includes(target.tagName) || target.isContentEditable;
}

function ArrowIcon({ direction = "up-right", className = "" }: { direction?: "up-right" | "right" | "left" | "down"; className?: string }) {
  const paths = {
    "up-right": "M4 14 14 4M7 4h7v7",
    right: "M3 9h12M10 4l5 5-5 5",
    left: "M15 9H3M8 4 3 9l5 5",
    down: "M9 3v12M4 10l5 5 5-5",
  };
  return <svg className={`arrow-icon ${className}`} viewBox="0 0 18 18" aria-hidden="true" focusable="false"><path d={paths[direction]} /></svg>;
}

function TextLink({ href, children }: { href: string; children: React.ReactNode }) {
  return <a className="text-link" href={href} target="_blank" rel="noreferrer"><span>{children}</span><i aria-hidden="true" /></a>;
}

const ribbons = [
  "M540 0C620 180 800 330 1045 425",
  "M230 160C520 160 800 340 1045 428",
  "M180 735C500 620 800 470 1045 450",
  "M460 900C560 700 800 480 1045 452",
  "M1195 428C1300 432 1380 430 1425 428",
];

/* Faint contour lines for the contact chapter: the hero fabric language, returning quietly. */
const contours = Array.from({ length: 9 }, (_, k) => {
  const base = 70 + k * 36;
  const points = Array.from({ length: 49 }, (_, i) => {
    const x = i * 30;
    const y = base + Math.sin(i * 0.21 + k * 0.55) * (22 + k * 3) + Math.sin(i * 0.09 - k * 0.3) * 28;
    return `${x.toFixed(1)} ${y.toFixed(1)}`;
  });
  return `M${points.join("L")}`;
});

function DesmodusLight() {
  return (
    <svg className="desmodus-light" viewBox="0 0 1425 900" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">
      {ribbons.map((d, i) => <path key={d} d={d} pathLength="100" style={vars({ "--i": i })} />)}
      <circle className="light-ring-pulse" cx="1120" cy="438" r="75" />
      <circle className="light-ring-pulse light-ring-pulse-2" cx="1120" cy="438" r="75" />
      <path className="light-shaft" d="M1120 150V726" />
    </svg>
  );
}

export default function Home() {
  const [page, setPage] = useState(0);
  const [direction, setDirection] = useState<"next" | "prev">("next");
  const [sweep, setSweep] = useState(0);
  const [copied, setCopied] = useState(false);
  const current = useRef(0);
  const locked = useRef(false);
  const touchY = useRef<number | null>(null);

  const jumpTo = useCallback((target: number, withSweep = true) => {
    const next = Math.max(0, Math.min(chapters.length - 1, target));
    if (next === current.current) return;
    setDirection(next > current.current ? "next" : "prev");
    current.current = next;
    setPage(next);
    if (withSweep) setSweep((value) => value + 1);
  }, []);

  const goTo = useCallback((target: number) => {
    const next = Math.max(0, Math.min(chapters.length - 1, target));
    if (next === current.current || locked.current) return;
    jumpTo(next);
    locked.current = true;
    window.setTimeout(() => { locked.current = false; }, 820);
    const hash = `#${slugs[next]}`;
    if (location.hash !== hash) history.pushState(null, "", hash);
  }, [jumpTo]);

  useEffect(() => {
    document.body.classList.add("book-mode");
    const wheel = (event: WheelEvent) => {
      event.preventDefault();
      if (Math.abs(event.deltaY) < 16) return;
      goTo(current.current + (event.deltaY > 0 ? 1 : -1));
    };
    const keys = (event: KeyboardEvent) => {
      if (event.key === " " && isInteractiveTarget(event.target)) return;
      if (["ArrowDown", "ArrowRight", "PageDown", " "].includes(event.key)) { event.preventDefault(); goTo(current.current + 1); }
      if (["ArrowUp", "ArrowLeft", "PageUp"].includes(event.key)) { event.preventDefault(); goTo(current.current - 1); }
      if (event.key === "Home") goTo(0);
      if (event.key === "End") goTo(chapters.length - 1);
    };
    addEventListener("wheel", wheel, { passive: false });
    addEventListener("keydown", keys);
    return () => {
      document.body.classList.remove("book-mode");
      removeEventListener("wheel", wheel);
      removeEventListener("keydown", keys);
    };
  }, [goTo]);

  useEffect(() => {
    const fromHash = () => {
      const index = slugs.indexOf(location.hash.replace("#", ""));
      if (index >= 0 && index !== current.current && !locked.current) jumpTo(index);
    };
    const index = slugs.indexOf(location.hash.replace("#", ""));
    if (index > 0) jumpTo(index, false);
    addEventListener("popstate", fromHash);
    addEventListener("hashchange", fromHash);
    return () => {
      removeEventListener("popstate", fromHash);
      removeEventListener("hashchange", fromHash);
    };
  }, [jumpTo]);

  const copyEmail = useCallback(async () => {
    try {
      await navigator.clipboard.writeText("adriangcpy@gmail.com");
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch { /* clipboard unavailable */ }
  }, []);

  const pageClass = (index: number) => `chapter ${index === page ? "is-active" : index < page ? "is-past" : "is-future"}`;

  return (
    <main className={`book page-${page} direction-${direction}`} onTouchStart={(event) => { touchY.current = event.touches[0]?.clientY ?? null; }} onTouchEnd={(event) => {
      if (touchY.current === null) return;
      const distance = touchY.current - (event.changedTouches[0]?.clientY ?? touchY.current);
      if (Math.abs(distance) > 45) goTo(current.current + (distance > 0 ? 1 : -1));
      touchY.current = null;
    }}>
      <Loader />
      <MotionLayer />
      <div className="grain" aria-hidden="true" />
      {sweep > 0 && <div className={`light-sweep light-sweep-${direction}`} key={sweep} aria-hidden="true"><i /></div>}

      <nav className="nav" aria-label="Navegación principal">
        <button className="wordmark" onClick={() => goTo(0)} aria-label="Volver a la portada">Adrián Gómez</button>
        <div className="chapter-name"><span>{String(page + 1).padStart(2, "0")}</span>{chapters[page]}</div>
        <div className="page-count">{String(page + 1).padStart(2, "0")} / {String(chapters.length).padStart(2, "0")}</div>
      </nav>

      <div className="book-stage">
        <section className={`${pageClass(0)} chapter-hero`} aria-hidden={page !== 0} inert={page !== 0}>
          <FabricScene active={page === 0} />
          <div className="hero-label reveal" style={vars({ "--d": ".1s" })}><span>Adrián Gómez</span><span>software engineer</span><span>Cartagena, ES</span></div>
          <h1>
            <span className="reveal" style={vars({ "--d": ".2s" })}>Hago software</span>
            <span className="reveal" style={vars({ "--d": ".32s" })}>para problemas</span>
            <span className="reveal dim" style={vars({ "--d": ".44s" })}>sin manual.</span>
          </h1>
          <div className="hero-bottom reveal" style={vars({ "--d": ".7s" })}>
            <p>Me muevo entre backend, IA, automatización y ciberseguridad. Si algo es lento, repetitivo o difícil de entender, probablemente quiera construir una herramienta para arreglarlo.</p>
            <button className="ghost-button" onClick={() => goTo(1)}>Abrir portfolio <ArrowIcon direction="right" /></button>
          </div>
          <div className="coordinate" aria-hidden="true">37°36′N<br />00°59′W</div>
          <div className="swipe-cue" aria-hidden="true"><span>SWIPE</span><ArrowIcon direction="down" /></div>
        </section>

        <section className={`${pageClass(1)} chapter-about`} aria-hidden={page !== 1} inert={page !== 1}>
          <div className="graze-ring about-ring" aria-hidden="true"><i /><i /></div>
          <div className="eyebrow reveal">02 — DE DÓNDE SALE TODO ESTO</div>
          <div className="about-grid">
            <h2 className="reveal" style={vars({ "--d": ".1s" })}>Soy <em>Adrián</em>.<span>27 AÑOS / CARTAGENA</span></h2>
            <div className="about-story reveal" style={vars({ "--d": ".24s" })}>
              <p>Soy Adrián, tengo 27 años y llevo desde los 13 metiendo mano a todo lo que mezcla hardware y software. Mi primer portátil acabó convertido en laboratorio: desmontaba, rompía cosas, las arreglaba y aprendía a construir las mías. Ahí entendí que no quería limitarme a usar tecnología; quería crearla.</p>
              <p>De ahí salieron dos caminos que nunca he separado: <strong>desarrollo y ciberseguridad.</strong> Cuando apareció la IA sentí otra vez que tenía delante algo enorme. Empecé a estudiar cómo funcionan los modelos, cómo se entrenan y cómo convertirlos en herramientas reales. Hoy trabajo en esa intersección: construyo software, investigo sistemas y uso IA para ampliar lo que puedo crear.</p>
            </div>
          </div>
          <div className="origin-line reveal" style={vars({ "--d": ".5s" })} aria-label="Recorrido personal">
            <span><b>2012</b>Primer portátil</span><i />
            <span><b>DESPUÉS</b>Desarrollo + seguridad</span><i />
            <span><b>AHORA</b>Software + IA</span>
          </div>
        </section>

        <section className={`${pageClass(2)} chapter-case case-desmodus`} aria-hidden={page !== 2} inert={page !== 2}>
          <div className="case-copy">
            <span className="case-number reveal">03 — CO-FOUNDER &amp; CTO</span>
            <h2 className="reveal" style={vars({ "--d": ".08s" })}><img src="/desmodus-logo.png" alt="" width="64" height="64" />Desmodus</h2>
            <p className="case-lead reveal" style={vars({ "--d": ".18s" })}>Cofundé Desmodus y lidero su tecnología.</p>
            <p className="case-body reveal" style={vars({ "--d": ".26s" })}>Desmodus es una empresa de ciberseguridad: encontramos lo que está expuesto, desde contraseñas filtradas hasta portátiles infectados y personas a las que se puede engañar, y probamos lo que de verdad se puede explotar para que el cliente lo cierre antes de que alguien lo use. Yo construyo la plataforma, la inteligencia y las herramientas que hay detrás.</p>
            <ul className="work-lines reveal" style={vars({ "--d": ".34s" })}>
              <li><b>Inteligencia de amenazas</b><span>Monitorizamos logs de infostealers, bases filtradas, foros clandestinos y sitios de ransomware buscando los dominios y las personas del cliente, y avisamos cuando aparece algo.</span></li>
              <li><b>Human Security</b><span>Las personas a las que se puede engañar.</span></li>
              <li><b>Investigación e ingeniería</b><span>Si las herramientas disponibles no bastan, construimos la capacidad que falta.</span></li>
            </ul>
            <div className="reveal" style={vars({ "--d": ".44s" })}><TextLink href="https://desmodus.co">Visitar desmodus.co</TextLink></div>
          </div>
          <div className="desmodus-stage" aria-hidden="true">
            <div className="browser reveal" style={vars({ "--d": ".2s" })}>
              <div className="browser-bar"><i /><span>desmodus.co</span><i /></div>
              <div className="browser-view">
                <img src="/desmodus-preview.webp" alt="" width="1425" height="900" />
                <DesmodusLight />
              </div>
            </div>
            <p className="tagline reveal" style={vars({ "--d": ".4s" })}>Mira tu empresa como la ve un atacante.</p>
            <ol className="method">
              {method.map((step, index) => (
                <li key={step} style={vars({ "--i": index })}>
                  <svg viewBox="0 0 40 40" focusable="false"><circle className="glyph-track" cx="20" cy="20" r="13" /><circle className="glyph-ring" cx="20" cy="20" r="13" pathLength="1" /><circle className="glyph-dot" cx="20" cy="20" r="2.2" /></svg>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
            <p className="method-note reveal" style={vars({ "--d": ".6s" })}>El monitoreo continúa tras el informe: cada nueva exposición llega como alerta.</p>
          </div>
          <div className="case-stat"><strong>PRUEBAS, NO TEATRO.</strong><span>ciberseguridad · inteligencia · ingeniería</span></div>
        </section>

        <section className={`${pageClass(3)} chapter-case case-music`} aria-hidden={page !== 3} inert={page !== 3}>
          <div className="bbeat-stage" aria-hidden="true">
            <div className="graze-ring bbeat-rings"><i /><i /><i /></div>
            <div className="bbeat-logo" />
            <div className="bbeat-bars">{Array.from({ length: 40 }, (_, i) => <i key={i} style={vars({ "--i": i })} />)}</div>
            <div className="bbeat-player">
              <span>NOW STREAMING / LOCAL</span><b>BBEAT RADIO</b>
              <div><i /><em>02:17</em><em>04:06</em></div>
            </div>
          </div>
          <div className="case-copy">
            <span className="case-number reveal">04 — OPEN SOURCE</span>
            <h2 className="reveal" style={vars({ "--d": ".08s" })}>Bbeat</h2>
            <p className="case-lead reveal" style={vars({ "--d": ".18s" })}>Quería mi música en mi servidor y bajo mis reglas. Construí el reproductor que me faltaba.</p>
            <p className="case-body reveal" style={vars({ "--d": ".26s" })}>FastAPI, SvelteKit, Android, descargas offline e ingesta automática desde Spotify, YouTube y SoundCloud.</p>
            <div className="reveal" style={vars({ "--d": ".36s" })}><TextLink href="https://github.com/Howlpy/bbeat">Ver código</TextLink></div>
          </div>
          <div className="case-stat"><strong>SELF-HOSTED</strong><span>web · móvil · compatible con Subsonic</span></div>
        </section>

        <section className={`${pageClass(4)} chapter-case case-calcifer`} aria-hidden={page !== 4} inert={page !== 4}>
          <div className="case-copy">
            <span className="case-number reveal">05 — PRIVATE SYSTEM · LIVE</span>
            <h2 className="reveal" style={vars({ "--d": ".08s" })}>Calcifer</h2>
            <p className="case-lead reveal" style={vars({ "--d": ".18s" })}>No quería otro chatbot. Construí un asistente que vive en mi servidor, recuerda, actúa y sabe cuándo pedir permiso.</p>
            <p className="case-body reveal" style={vars({ "--d": ".26s" })}>Mi IA personal autoalojada, la que mantiene el castillo en marcha. Habla por Telegram, WhatsApp o terminal, recuerda, busca y navega con permiso, cuida el servidor, programa en entornos aislados y deja traza de todo. Más de 460 commits desde mediados de agosto.</p>
            <div className="calcifer-proof reveal" style={vars({ "--d": ".36s" })} aria-label="Cómo está construido">
              <span><b>PYTHON</b>NÚCLEO PROPIO</span><span><b>DDD</b>HEXAGONAL</span><span><b>SQLITE</b>MEMORIA</span><span><b>TELEGRAM · WHATSAPP</b>CLI</span>
            </div>
          </div>
          <div className="calcifer-stage" aria-hidden="true">
            <div className="ember-glow" />
            <div className="sparks">{Array.from({ length: 10 }, (_, i) => <i key={i} style={vars({ "--i": i })} />)}</div>
            <div className="chat reveal" style={vars({ "--d": ".15s" })}>
              <div className="chat-bar"><span className="chat-avatar">🔥</span><div><b>Calcifer</b><em>en línea</em></div><span className="chat-channel">TELEGRAM</span></div>
              <div className="chat-body">
                <p className="msg msg-user" style={vars({ "--t": "1s" })}>Vamos a limpiar el VPS</p>
                <p className="msg msg-bot" style={vars({ "--t": "2.2s" })}>Inventario: 14 contenedores en marcha, 6 imágenes huérfanas.</p>
                <p className="msg msg-bot" style={vars({ "--t": "3.4s" })}>Espacio recuperable: 8,2 GB. No toco nada que esté en uso.</p>
                <div className="msg msg-bot msg-approval" style={vars({ "--t": "4.8s" })}>
                  <span className="approval-label">APROBACIÓN · USO ÚNICO</span>
                  <code>sudo docker image prune -a</code>
                  <span className="approval-risk">Riesgo medio</span>
                  <div className="approval-actions"><span>Rechazar</span><span className="approve">Aprobar</span></div>
                  <div className="approval-done">Aprobado</div>
                </div>
                <p className="msg msg-bot msg-final" style={vars({ "--t": "7.6s" })}>Hecho. Liberados 8,2 GB. 🔥</p>
              </div>
            </div>
            <div className="harness-flow" aria-label="Flujo del harness">
              {harness.map((step, index) => <span key={step} style={vars({ "--i": index })}><b>{String(index + 1).padStart(2, "0")}</b>{step}</span>)}
            </div>
          </div>
        </section>

        <section className={`${pageClass(5)} chapter-experience`} aria-hidden={page !== 5} inert={page !== 5}>
          <div className="eyebrow reveal">06 — TRAYECTORIA</div>
          <div className="timeline">
            <div className="reveal" style={vars({ "--d": ".1s" })}><time>AHORA</time><h3>Desmodus</h3><p>Co-founder &amp; CTO · Ciberseguridad</p></div>
            <div className="reveal" style={vars({ "--d": ".18s" })}><time>2024—2025</time><h3>IntentX</h3><p>Frontend · Next.js</p></div>
            <div className="reveal" style={vars({ "--d": ".26s" })}><time>2023</time><h3>Chronos Exchange</h3><p>Backend · Web3</p></div>
          </div>
          <div className="experience-stack reveal" style={vars({ "--d": ".4s" })}>
            <div className="stack-heading">
              <span>STACK — HERRAMIENTAS</span>
              <p>No colecciono tecnologías. Elijo la que hace que el producto llegue antes y aguante después.</p>
            </div>
            <div className="tech-grid">
              {tools.reduce<{ group: string; items: string[] }[]>((groups, tool) => {
                const last = groups[groups.length - 1];
                if (last && last.group === tool.group) last.items.push(tool.name);
                else groups.push({ group: tool.group, items: [tool.name] });
                return groups;
              }, []).map((group) => (
                <div className="tech-group" key={group.group}>
                  <b>{group.group}</b>
                  <ul>{group.items.map((name) => <li key={name}>{name}</li>)}</ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className={`${pageClass(6)} chapter-contact`} aria-hidden={page !== 6} inert={page !== 6}>
          <div className="warm-drift" aria-hidden="true">
            <div className="warm-glow" />
            <div className="warm-glow warm-glow-2" />
            <svg className="warm-contours" viewBox="0 0 1440 400" preserveAspectRatio="none" focusable="false">
              {contours.map((d, i) => <path key={i} d={d} style={vars({ "--i": i })} />)}
            </svg>
          </div>
          <div className="contact-content">
            <div className="eyebrow reveal">07 — HABLEMOS</div>
            <p className="contact-lead reveal" style={vars({ "--d": ".1s" })}>Tengo debilidad por los problemas difíciles.</p>
            <a className="contact-cta reveal" style={vars({ "--d": ".2s" })} href="mailto:adriangcpy@gmail.com">Cuéntame<br /><span>el tuyo.</span> <ArrowIcon /></a>
            <div className="contact-meta reveal" style={vars({ "--d": ".4s" })}><span>Cartagena, España</span><a href="https://github.com/Howlpy" target="_blank" rel="noreferrer">GitHub <ArrowIcon /></a><a href="mailto:adriangcpy@gmail.com">Email <ArrowIcon /></a><button type="button" className="copy-email" aria-live="polite" onClick={copyEmail}>{copied ? "Copiado" : "Copiar email"}</button></div>
          </div>
        </section>
      </div>

      <aside className="chapter-rail" aria-label="Capítulos">
        {chapters.map((chapter, index) => <button key={chapter} className={index === page ? "active" : ""} onClick={() => goTo(index)} aria-label={`Ir a ${chapter}`}><i /><span>{chapter}</span></button>)}
      </aside>
      {page === 0 && <div className="book-controls">
        <button disabled aria-label="Capítulo anterior"><ArrowIcon direction="left" /></button>
        <span>SCROLL · SWIPE · FLECHAS</span>
        <button onClick={() => goTo(1)} aria-label="Capítulo siguiente"><ArrowIcon direction="right" /></button>
      </div>}
    </main>
  );
}
