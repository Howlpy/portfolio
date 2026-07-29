"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { FabricScene } from "./fabric-scene";

const chapters = ["Portada", "Enfoque", "Omniscius", "Bbeat", "Someone Knows", "Trayectoria", "Contacto"];
const tools = ["PYTHON", "TYPESCRIPT", "FASTAPI", "NEXT.JS", "GO", "POSTGRESQL", "DOCKER", "KUBERNETES", "LLMs", "OSINT"];

function Loader() {
  const [done, setDone] = useState(false);
  useEffect(() => { const id = setTimeout(() => setDone(true), 1450); return () => clearTimeout(id); }, []);
  return <div className={`loader ${done ? "loader-done" : ""}`} aria-hidden="true">
    <div className="loader-name">ADRIÁN GÓMEZ</div><span>PORTFOLIO / 2026</span><b />
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
    <main className={`book direction-${direction}`} onTouchStart={(event) => { touchY.current = event.touches[0]?.clientY ?? null; }} onTouchEnd={(event) => {
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
          <div className="eyebrow">01 / CÓMO PIENSO</div>
          <p>No me quedo en una sola capa. <em>Diseño la arquitectura, escribo el backend, muevo los datos y termino la interfaz.</em></p>
          <div className="principles">
            <span><b>01</b>Entender antes de añadir</span>
            <span><b>02</b>Construir antes de teorizar</span>
            <span><b>03</b>Automatizar lo repetible</span>
          </div>
          <div className="side-word" aria-hidden="true">FULL STACK</div>
        </section>

        <section className={`${pageClass(2)} chapter-case case-cti`} aria-hidden={page !== 2} inert={page !== 2}>
          <div className="case-copy">
            <span className="case-number">02 / CTO · EN PRODUCCIÓN</span>
            <h2>OMNISCIUS</h2>
            <p className="case-lead">Como CTO, he construido la plataforma CTI de extremo a extremo.</p>
            <p>Crawling de dark web, ransomware, logs de infostealers y millones de credenciales comprometidas correlacionadas en tiempo real.</p>
            <a href="https://omniscius.pro" target="_blank" rel="noreferrer">Visitar proyecto ↗</a>
          </div>
          <div className="threat-map" aria-hidden="true">
            <i className="orbit o1" /><i className="orbit o2" /><i className="orbit o3" />
            <b className="node n1" /><b className="node n2" /><b className="node n3" /><b className="node n4" /><b className="node n5" />
            <span>ACTOR_07</span><span>185.***.42</span><span>TTP / 1059</span>
          </div>
          <div className="case-stat"><strong>END–TO–END</strong><span>producto · datos · infraestructura</span></div>
        </section>

        <section className={`${pageClass(3)} chapter-case case-music`} aria-hidden={page !== 3} inert={page !== 3}>
          <div className="vinyl" aria-hidden="true"><i /><b /></div>
          <div className="wave" aria-hidden="true">{Array.from({ length: 44 }, (_, i) => <i key={i} style={{ "--i": i } as React.CSSProperties} />)}</div>
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
