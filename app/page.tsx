"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { FabricScene } from "./fabric-scene";

const chapters = ["Portada", "Enfoque", "Omniscius", "Bbeat", "Someone Knows", "Trayectoria", "Contacto"];
const tools = ["PYTHON", "TYPESCRIPT", "FASTAPI", "NEXT.JS", "GO", "POSTGRESQL", "DOCKER", "KUBERNETES", "LLMs", "OSINT"];

function Loader() {
  const [done, setDone] = useState(false);
  useEffect(() => { const id = setTimeout(() => setDone(true), 1450); return () => clearTimeout(id); }, []);
  return <div className={`loader ${done ? "loader-done" : ""}`} aria-hidden="true">
    <div className="loader-grid" />
    <div className="loader-head"><span>PORTFOLIO / 2026</span><span>CARTAGENA / ES</span><span>37°36′N · 00°59′W</span></div>
    <div className="loader-name"><span>ADRIÁN</span><strong>GÓMEZ</strong></div>
    <div className="loader-disciplines"><span>SOFTWARE</span><i /><span>SECURITY</span><i /><span>AI</span></div>
    <div className="loader-wave">{Array.from({ length: 28 }, (_, i) => <i key={i} style={{ "--i": i } as React.CSSProperties} />)}</div>
    <div className="loader-foot"><span>HOWL.WTF</span><em>ENTRANDO</em><b /></div>
  </div>;
}

function MotionLayer() {
  const cursor = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const move = (event: PointerEvent) => {
      if (cursor.current) cursor.current.style.transform = `translate3d(${event.clientX}px,${event.clientY}px,0)`;
    };
    addEventListener("pointermove", move, { passive: true });
    return () => removeEventListener("pointermove", move);
  }, []);
  return <div className="cursor" ref={cursor} aria-hidden="true"><i /></div>;
}

export default function Home() {
  const [page, setPage] = useState(0);
  const [direction, setDirection] = useState<"next" | "prev">("next");
  const [glitch, setGlitch] = useState(0);
  const current = useRef(0);
  const locked = useRef(false);
  const touchY = useRef<number | null>(null);

  const goTo = useCallback((target: number) => {
    const next = Math.max(0, Math.min(chapters.length - 1, target));
    if (next === current.current || locked.current) return;
    setDirection(next > current.current ? "next" : "prev");
    current.current = next;
    setPage(next);
    setGlitch((value) => value + 1);
    locked.current = true;
    window.setTimeout(() => { locked.current = false; }, 820);
  }, []);

  useEffect(() => {
    document.body.classList.add("book-mode");
    const wheel = (event: WheelEvent) => {
      event.preventDefault();
      if (Math.abs(event.deltaY) < 16) return;
      goTo(current.current + (event.deltaY > 0 ? 1 : -1));
    };
    const keys = (event: KeyboardEvent) => {
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

  const pageClass = (index: number) => `chapter ${index === page ? "is-active" : index < page ? "is-past" : "is-future"}`;

  return (
    <main className={`book direction-${direction} ${[1, 2, 3, 5].includes(page) ? "chrome-ink" : ""}`} onTouchStart={(event) => { touchY.current = event.touches[0]?.clientY ?? null; }} onTouchEnd={(event) => {
      if (touchY.current === null) return;
      const distance = touchY.current - (event.changedTouches[0]?.clientY ?? touchY.current);
      if (Math.abs(distance) > 45) goTo(current.current + (distance > 0 ? 1 : -1));
      touchY.current = null;
    }}>
      <Loader />
      <MotionLayer />
      <div className="noise" aria-hidden="true" />
      {glitch > 0 && <div className={`interference interference-${direction}`} key={glitch} aria-hidden="true"><i /><b /><span /></div>}

      <nav className="nav" aria-label="Navegación principal">
        <button className="wordmark" onClick={() => goTo(0)} aria-label="Volver a la portada">AG<span>●</span></button>
        <div className="chapter-name"><span>{String(page + 1).padStart(2, "0")}</span>{chapters[page]}</div>
        <div className="page-count">{String(page + 1).padStart(2, "0")} / {String(chapters.length).padStart(2, "0")}</div>
      </nav>

      <div className="book-stage">
        <section className={`${pageClass(0)} chapter-hero`} aria-hidden={page !== 0} inert={page !== 0}>
          <FabricScene />
          <div className="hero-label"><span>ADRIÁN GÓMEZ</span><span>SOFTWARE ENGINEER</span><span>CARTAGENA / ES</span></div>
          <h1><span>HAGO SOFTWARE</span><span className="stroke">PARA PROBLEMAS</span><span className="violet">SIN MANUAL.</span></h1>
          <div className="hero-bottom">
            <p>Me muevo entre backend, IA, automatización y ciberseguridad. Si algo es lento, repetitivo o difícil de entender, probablemente quiera construir una herramienta para arreglarlo.</p>
            <button onClick={() => goTo(1)}>Abrir portfolio <span>→</span></button>
          </div>
          <div className="coordinate" aria-hidden="true">37°36′N<br />00°59′W</div>
        </section>

        <section className={`${pageClass(1)} chapter-about`} aria-hidden={page !== 1} inert={page !== 1}>
          <div className="eyebrow">01 / DE DÓNDE SALE TODO ESTO</div>
          <div className="about-grid">
            <h2>SOY ADRIÁN.<span>27 AÑOS / CARTAGENA</span></h2>
            <div className="about-story">
              <p>Soy Adrián, tengo 27 años y llevo media vida intentando entender qué ocurre dentro de las máquinas. A los 13 me compraron mi primer portátil. En lugar de limitarme a usarlo, quise saber cómo se relacionaban el hardware y el software, qué podía modificar y por qué se rompían las cosas.</p>
              <p>De esa curiosidad salieron dos caminos que nunca he separado: <strong>desarrollo y ciberseguridad.</strong> Cuando apareció la IA sentí otra vez que tenía delante algo enorme. Empecé a estudiar cómo funcionan los modelos, cómo se entrenan y cómo convertirlos en herramientas reales. Hoy trabajo en esa intersección: construyo software, investigo sistemas y uso IA para ampliar lo que puedo crear.</p>
            </div>
          </div>
          <div className="origin-line" aria-label="Recorrido personal">
            <span><b>2012</b>Primer portátil</span><i />
            <span><b>DESPUÉS</b>Desarrollo + seguridad</span><i />
            <span><b>AHORA</b>Software + IA</span>
          </div>
        </section>

        <section className={`${pageClass(2)} chapter-case case-cti`} aria-hidden={page !== 2} inert={page !== 2}>
          <div className="case-copy">
            <span className="case-number">02 / CTO · EN PRODUCCIÓN</span>
            <h2>OMNISCIUS</h2>
            <p className="case-lead">Como CTO, he construido la plataforma CTI de extremo a extremo.</p>
            <p>Crawling de dark web, ransomware, logs de infostealers y millones de credenciales comprometidas correlacionadas en tiempo real.</p>
            <a href="https://omniscius.pro" target="_blank" rel="noreferrer">Visitar proyecto ↗</a>
          </div>
          <div className="intel-stage" aria-hidden="true">
            <div className="intel-window">
              <div className="window-bar"><i /><i /><i /><span>omniscius.pro</span></div>
              <div className="landing-preview" />
            </div>
            <div className="intel-graph">
              <b className="intel-core">OMNISCIUS<span>LIVE CTI</span></b>
              <span className="source s1"><i />RANSOMWARE</span>
              <span className="source s2"><i />TELEGRAM</span>
              <span className="source s3"><i />DARK FORUMS</span>
              <span className="source s4"><i />INFOSTEALERS</span>
              <span className="source s5"><i />LEAKS</span>
              <i className="graph-line g1" /><i className="graph-line g2" /><i className="graph-line g3" /><i className="graph-line g4" /><i className="graph-line g5" />
            </div>
          </div>
          <div className="case-stat"><strong>END–TO–END</strong><span>producto · datos · infraestructura</span></div>
        </section>

        <section className={`${pageClass(3)} chapter-case case-music`} aria-hidden={page !== 3} inert={page !== 3}>
          <div className="bbeat-stage" aria-hidden="true">
            <div className="sonic-ring r1" /><div className="sonic-ring r2" /><div className="sonic-ring r3" />
            <div className="bbeat-logo" />
            <div className="bbeat-bars">{Array.from({ length: 32 }, (_, i) => <i key={i} style={{ "--i": i } as React.CSSProperties} />)}</div>
            <div className="bbeat-player">
              <span>NOW STREAMING / LOCAL</span><b>BBEAT RADIO</b>
              <div><i /><em>02:17</em><em>04:06</em></div>
            </div>
          </div>
          <div className="case-copy">
            <span className="case-number">03 / OPEN SOURCE</span>
            <h2>BBEAT</h2>
            <p className="case-lead">Quería mi música en mi servidor y bajo mis reglas. Construí el reproductor que me faltaba.</p>
            <p>FastAPI, SvelteKit, Android, descargas offline e ingesta automática desde Spotify, YouTube y SoundCloud.</p>
            <a href="https://github.com/Howlpy/bbeat" target="_blank" rel="noreferrer">Ver código ↗</a>
          </div>
          <div className="case-stat"><strong>SELF–HOSTED</strong><span>web · móvil · compatible con Subsonic</span></div>
        </section>

        <section className={`${pageClass(4)} chapter-case case-talent`} aria-hidden={page !== 4} inert={page !== 4}>
          <div className="people-flow" aria-hidden="true"><span>DEV</span><span>DATA</span><span>OPS</span><span>AI</span><i /><b>✓</b></div>
          <div className="case-copy">
            <span className="case-number">04 / PRODUCTO · AUTOMATIZACIÓN</span>
            <h2>SOMEONE<br />KNOWS</h2>
            <p className="case-lead">He construido la parte técnica que convierte un proceso humano y caótico en un flujo de talento más inteligente.</p>
            <p>Captación, clasificación y conexión de perfiles técnicos con empresas mediante automatización y datos estructurados.</p>
          </div>
          <div className="case-stat"><strong>MATCHING</strong><span>TypeScript · automatización · datos</span></div>
        </section>

        <section className={`${pageClass(5)} chapter-experience`} aria-hidden={page !== 5} inert={page !== 5}>
          <div className="eyebrow">05 / TRAYECTORIA</div>
          <div className="timeline">
            <div><time>2025—AHORA</time><h3>Omniscius</h3><p>CTO · CTI</p></div>
            <div><time>2024—2025</time><h3>IntentX</h3><p>Frontend · Next.js</p></div>
            <div><time>2023</time><h3>Chronos Exchange</h3><p>Backend · Web3</p></div>
          </div>
          <div className="tool-strip">{tools.concat(tools).map((tool, index) => <span key={`${tool}-${index}`}>{tool}<b>↗</b></span>)}</div>
          <p className="tool-note">No colecciono tecnologías. Elijo la que hace que el producto llegue antes y aguante después.</p>
        </section>

        <section className={`${pageClass(6)} chapter-contact`} aria-hidden={page !== 6} inert={page !== 6}>
          <div className="eyebrow">06 / HABLEMOS</div>
          <p>Tengo debilidad por los problemas difíciles.</p>
          <a href="mailto:adriangcpy@gmail.com">CUÉNTAME<br /><span>EL TUYO.</span> ↗</a>
          <div className="contact-meta"><span>Cartagena, España</span><a href="https://github.com/Howlpy" target="_blank" rel="noreferrer">GitHub ↗</a><a href="mailto:adriangcpy@gmail.com">Email ↗</a></div>
        </section>
      </div>

      <aside className="chapter-rail" aria-label="Capítulos">
        {chapters.map((chapter, index) => <button key={chapter} className={index === page ? "active" : ""} onClick={() => goTo(index)} aria-label={`Ir a ${chapter}`}><i /><span>{chapter}</span></button>)}
      </aside>
      <div className="book-controls">
        <button onClick={() => goTo(page - 1)} disabled={page === 0} aria-label="Capítulo anterior">←</button>
        <span>SCROLL · SWIPE · FLECHAS</span>
        <button onClick={() => goTo(page + 1)} disabled={page === chapters.length - 1} aria-label="Capítulo siguiente">→</button>
      </div>
    </main>
  );
}
