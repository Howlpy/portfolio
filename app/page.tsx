"use client";

import { SignalScene } from "./signal-scene";

const stack = [
  "Python", "TypeScript", "Go", "FastAPI", "Django", "Node.js", "React",
  "Next.js", "SvelteKit", "PostgreSQL", "Redis", "Docker", "Kubernetes",
  "LLMs", "RAG", "Web3", "OSINT",
];

const experience = [
  {
    period: "2025—NOW",
    role: "Full-stack developer",
    company: "Omniscius / CTI platform",
    url: "https://omniscius.pro",
    text: "Threat intelligence built end-to-end: dark-web crawling, ransomware tracking, infostealer logs and real-time correlation across millions of compromised credentials.",
    tags: ["CTI", "DATA", "INFRA"],
  },
  {
    period: "2024—25",
    role: "Frontend developer",
    company: "IntentX",
    text: "Interfaces and web applications in Next.js and Node.js, with reusable systems and backend integrations.",
    tags: ["NEXT.JS", "UI SYSTEMS"],
  },
  {
    period: "2023",
    role: "Backend developer",
    company: "Chronos Exchange",
    text: "APIs and Web3 subgraphs for an exchange platform, with on-chain data pipelines and automated indexing.",
    tags: ["WEB3", "SUBGRAPHS", "APIS"],
  },
];

export default function Home() {
  return (
    <main>
      <SignalScene />
      <div className="noise" aria-hidden="true" />

      <nav className="nav" aria-label="Navegación principal">
        <a className="wordmark" href="#top" aria-label="Inicio de Adrian Gomez">HOWL<span>/</span></a>
        <div className="nav-links">
          <a href="#work">Trabajo</a>
          <a href="#about">Perfil</a>
          <a href="#contact">Contacto</a>
        </div>
        <span className="live"><i /> CORE ONLINE · 37.6°N</span>
      </nav>

      <section className="hero" id="top">
        <div className="hero-kicker"><span>AG / 01</span> Backend engineer · AI systems · threat intelligence</div>
        <h1 className="core-title">
          <span className="howl-line">HOWL <small>/</small></span>
          <span className="signal-line">SIGNAL</span>
          <span className="core-line">CORE.</span>
        </h1>
        <p className="hero-copy">
          Adrian Gomez construye sistemas que encuentran la señal dentro del ruido:
          backend, inteligencia artificial, automatización y ciberseguridad.
        </p>
        <div className="hero-actions">
          <a className="magnetic primary" href="#work">Explorar trabajo <span>↘</span></a>
          <a className="magnetic ghost" href="mailto:adriangcpy@gmail.com">Escríbeme <span>↗</span></a>
        </div>
        <div className="core-readout" aria-label="Estado del núcleo">
          <span>{"// SIGNAL COMPRESSION"}</span>
          <dl><div><dt>RATIO</dt><dd>7:1</dd></div><div><dt>STATUS</dt><dd>ACTIVE</dd></div><div><dt>MODE</dt><dd>BUILD</dd></div></dl>
          <i><b /><b /><b /><b /><b /><b /><b /></i>
        </div>
        <div className="hero-domains" aria-hidden="true">
          <span>THREAT INTELLIGENCE</span><span>SYSTEMS</span><span>AUTOMATION</span>
        </div>
        <div className="scroll-cue"><span>SCROLL TO DECODE</span><i /></div>
      </section>

      <section className="manifesto" id="about">
        <div className="section-index">02 / PROFILE</div>
        <p>
          Diseño y construyo productos <em>end-to-end</em>: desde la infraestructura y
          los datos hasta la interfaz. Mi terreno está donde se cruzan los
          <strong> sistemas distribuidos</strong>, la <strong>IA aplicada</strong> y la
          <strong> inteligencia de amenazas</strong>.
        </p>
        <aside>
          <span>Operating mode</span>
          <b>Think in systems.</b>
          <b>Ship in layers.</b>
          <b>Automate the rest.</b>
        </aside>
      </section>

      <section className="work" id="work">
        <header className="section-head">
          <div><span>03</span> Selected trajectory</div>
          <h2>WORK / <i>FIELD NOTES</i></h2>
        </header>
        <div className="timeline">
          {experience.map((item, index) => (
            <article className="job" key={item.company}>
              <span className="job-number">0{index + 1}</span>
              <time>{item.period}</time>
              <div className="job-main">
                <h3>{item.role}</h3>
                {item.url ? <a href={item.url} target="_blank" rel="noreferrer">{item.company} ↗</a> : <p className="company">{item.company}</p>}
                <p>{item.text}</p>
                <div className="tags">{item.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="projects">
        <header className="section-head compact">
          <div><span>04</span> Independent builds</div>
          <h2>OWN / <i>SIGNALS</i></h2>
        </header>
        <div className="project-grid">
          <a className="project featured" href="https://github.com/Howlpy/bbeat" target="_blank" rel="noreferrer">
            <div className="project-top"><span>01</span><span>OPEN SOURCE ↗</span></div>
            <div className="disc" aria-hidden="true"><i /></div>
            <div>
              <h3>BBEAT</h3>
              <p>Tu música. Tu servidor. Tus reglas.</p>
              <ul><li>FastAPI</li><li>SvelteKit</li><li>Android</li><li>Subsonic</li></ul>
            </div>
          </a>
          <article className="project talent">
            <div className="project-top"><span>02</span><span>PRIVATE BUILD</span></div>
            <div className="talent-mark" aria-hidden="true"><span>SK</span><i /><b>42</b></div>
            <div>
              <h3>SOMEONE KNOWS</h3>
              <p>Automatización inteligente para encontrar y conectar talento técnico.</p>
              <ul><li>TypeScript</li><li>Automation</li><li>Data</li></ul>
            </div>
          </article>
        </div>
      </section>

      <section className="stack" aria-label="Tecnologías">
        <div className="section-index">05 / ARSENAL</div>
        <div className="ticker">
          {stack.concat(stack).map((tech, index) => <span key={`${tech}-${index}`}>{tech}<i>✦</i></span>)}
        </div>
      </section>

      <section className="contact" id="contact">
        <div className="section-index">06 / OPEN CHANNEL</div>
        <p>¿Tienes un problema complejo?</p>
        <a href="mailto:adriangcpy@gmail.com">LET’S MAKE IT<br /><span>WORK.</span> ↗</a>
        <div className="contact-meta">
          <span>Disponible para proyectos ambiciosos</span>
          <a href="https://github.com/Howlpy" target="_blank" rel="noreferrer">GitHub ↗</a>
          <a href="mailto:adriangcpy@gmail.com">Email ↗</a>
        </div>
      </section>

      <footer><span>© 2026 ADRIAN GOMEZ</span><span>BUILT FROM SIGNAL, NOT NOISE</span><a href="#top">BACK TO TOP ↑</a></footer>
    </main>
  );
}
