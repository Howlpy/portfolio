"use client";

import { useEffect, useRef, useState } from "react";
import { FabricScene } from "./fabric-scene";

const tools = ["PYTHON", "TYPESCRIPT", "FASTAPI", "NEXT.JS", "GO", "POSTGRESQL", "DOCKER", "KUBERNETES", "LLMs", "OSINT"];

function MotionLayer() {
  const cursor = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const reveals = document.querySelectorAll<HTMLElement>("[data-reveal]");
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add("is-visible");
    }), { threshold: .13 });
    reveals.forEach((item) => observer.observe(item));
    const move = (event: PointerEvent) => {
      if (cursor.current) cursor.current.style.transform = `translate3d(${event.clientX}px,${event.clientY}px,0)`;
    };
    addEventListener("pointermove", move, { passive: true });
    return () => { observer.disconnect(); removeEventListener("pointermove", move); };
  }, []);
  return <div className="cursor" ref={cursor} aria-hidden="true"><i /></div>;
}

function Loader() {
  const [done, setDone] = useState(false);
  useEffect(() => { const id = setTimeout(() => setDone(true), 1450); return () => clearTimeout(id); }, []);
  return <div className={`loader ${done ? "loader-done" : ""}`} aria-hidden="true">
    <div className="loader-name">ADRIÁN GÓMEZ</div><span>PORTFOLIO / 2026</span><b>00</b>
  </div>;
}

export default function Home() {
  return (
    <main>
      <Loader />
      <MotionLayer />
      <FabricScene />
      <div className="noise" aria-hidden="true" />

      <nav className="nav" aria-label="Navegación principal">
        <a className="wordmark" href="#top" aria-label="Volver al inicio">AG<span>●</span></a>
        <div className="nav-links"><a href="#projects">Proyectos</a><a href="#about">Sobre mí</a><a href="#contact">Contacto</a></div>
        <a className="nav-status" href="mailto:adriangcpy@gmail.com"><i /> Disponible para construir</a>
      </nav>

      <section className="hero" id="top">
        <div className="hero-label"><span>ADRIÁN GÓMEZ</span><span>SOFTWARE ENGINEER</span><span>CARTAGENA / ES</span></div>
        <h1>
          <span data-reveal>HAGO SOFTWARE</span>
          <span className="stroke" data-reveal>PARA PROBLEMAS</span>
          <span className="violet" data-reveal>SIN MANUAL.</span>
        </h1>
        <div className="hero-bottom">
          <p>Me muevo entre backend, IA, automatización y ciberseguridad. Si algo es lento, repetitivo o difícil de entender, probablemente quiera construir una herramienta para arreglarlo.</p>
          <a href="#projects">Ver lo que he construido <span>↓</span></a>
        </div>
        <div className="coordinate" aria-hidden="true">37°36′N<br />00°59′W</div>
      </section>

      <section className="about" id="about">
        <div className="eyebrow">01 / SOBRE MÍ</div>
        <p data-reveal>
          No me interesa quedarme en una sola capa. <em>Diseño la arquitectura, escribo el backend, muevo los datos y termino la interfaz.</em> Quiero entender el sistema completo.
        </p>
        <div className="about-aside" data-reveal>
          <span>Mi forma de trabajar</span>
          <ol><li><b>01</b> Entender antes de añadir</li><li><b>02</b> Construir antes de teorizar</li><li><b>03</b> Automatizar lo repetible</li></ol>
        </div>
      </section>

      <section className="projects" id="projects">
        <header className="projects-intro">
          <div className="eyebrow">02 / TRABAJO SELECCIONADO</div>
          <h2 data-reveal>TRES COSAS QUE<br />DECIDÍ CONSTRUIR.</h2>
        </header>

        <article className="case case-cti">
          <div className="case-copy" data-reveal>
            <span className="case-number">01 / EN PRODUCCIÓN</span>
            <h3>OMNISCIUS</h3>
            <p className="case-lead">Construí una plataforma CTI completa para encontrar relaciones donde otros solo ven ruido.</p>
            <p>Crawling de dark web, ransomware, logs de infostealers y millones de credenciales comprometidas correlacionadas en tiempo real.</p>
            <a href="https://omniscius.pro" target="_blank" rel="noreferrer">Visitar proyecto ↗</a>
          </div>
          <div className="threat-map" aria-hidden="true">
            <i className="orbit o1" /><i className="orbit o2" /><i className="orbit o3" />
            <b className="node n1" /><b className="node n2" /><b className="node n3" /><b className="node n4" /><b className="node n5" />
            <span>ACTOR_07</span><span>185.***.42</span><span>TTP / 1059</span>
          </div>
          <div className="case-stat"><strong>END–TO–END</strong><span>producto · datos · infraestructura</span></div>
        </article>

        <article className="case case-music">
          <div className="vinyl" aria-hidden="true"><i /><b /></div>
          <div className="wave" aria-hidden="true">{Array.from({ length: 44 }, (_, i) => <i key={i} style={{ "--i": i } as React.CSSProperties} />)}</div>
          <div className="case-copy" data-reveal>
            <span className="case-number">02 / OPEN SOURCE</span>
            <h3>BBEAT</h3>
            <p className="case-lead">Quería mi música en mi servidor y bajo mis reglas. Así que construí el reproductor que me faltaba.</p>
            <p>FastAPI, SvelteKit, Android, descargas offline e ingesta automática desde Spotify, YouTube y SoundCloud.</p>
            <a href="https://github.com/Howlpy/bbeat" target="_blank" rel="noreferrer">Ver código ↗</a>
          </div>
          <div className="case-stat"><strong>SELF–HOSTED</strong><span>web · móvil · compatible con Subsonic</span></div>
        </article>

        <article className="case case-talent">
          <div className="people-flow" aria-hidden="true"><span>DEV</span><span>DATA</span><span>OPS</span><span>AI</span><i /><b>✓</b></div>
          <div className="case-copy" data-reveal>
            <span className="case-number">03 / PRODUCTO PROPIO</span>
            <h3>SOMEONE<br />KNOWS</h3>
            <p className="case-lead">Estoy convirtiendo un proceso humano y caótico en un flujo de talento más inteligente.</p>
            <p>Captación, clasificación y conexión de perfiles técnicos con empresas mediante automatización y datos estructurados.</p>
          </div>
          <div className="case-stat"><strong>MATCHING</strong><span>TypeScript · automatización · datos</span></div>
        </article>
      </section>

      <section className="experience">
        <div className="eyebrow">03 / DE DÓNDE VENGO</div>
        <div className="experience-line" data-reveal><time>2025—AHORA</time><h3>Omniscius</h3><p>Full-stack · CTI</p></div>
        <div className="experience-line" data-reveal><time>2024—2025</time><h3>IntentX</h3><p>Frontend · Next.js</p></div>
        <div className="experience-line" data-reveal><time>2023</time><h3>Chronos Exchange</h3><p>Backend · Web3</p></div>
        <div className="education" data-reveal><span>DAM</span><span>SMR</span><p>Desarrollo multiplataforma, sistemas y redes. La base que me permite moverme por todo el stack.</p></div>
      </section>

      <section className="toolbelt" aria-label="Tecnologías">
        <div className="eyebrow">04 / CON QUÉ TRABAJO</div>
        <div className="marquee"><div>{tools.concat(tools).map((tool, i) => <span key={`${tool}-${i}`}>{tool}<b>↗</b></span>)}</div></div>
        <p>No colecciono tecnologías. Elijo la que hace que el producto llegue antes y aguante después.</p>
      </section>

      <section className="contact" id="contact">
        <div className="eyebrow">05 / HABLEMOS</div>
        <p>Tengo debilidad por los problemas difíciles.</p>
        <a href="mailto:adriangcpy@gmail.com" data-reveal>CUÉNTAME<br /><span>EL TUYO.</span> ↗</a>
        <div className="contact-meta"><span>Cartagena, España</span><a href="https://github.com/Howlpy" target="_blank" rel="noreferrer">GitHub ↗</a><a href="mailto:adriangcpy@gmail.com">Email ↗</a></div>
      </section>

      <footer><span>© 2026 ADRIÁN GÓMEZ</span><span>HECHO A MANO, NO DESDE UNA PLANTILLA</span><a href="#top">ARRIBA ↑</a></footer>
    </main>
  );
}
