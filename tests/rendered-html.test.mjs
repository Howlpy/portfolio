import assert from "node:assert/strict";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  return worker.fetch(
    new Request("http://localhost/", { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("server-renders Adrian's portfolio", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);
  const html = await response.text();
  assert.match(html, /<title>Adrián Gómez/);
  assert.match(html, /Hago software/);
  assert.match(html, /sin manual/);
  assert.match(html, /Desmodus/);
  assert.match(html, /CO-FOUNDER &amp; CTO/);
  assert.match(html, /Mira tu empresa como la ve un atacante/);
  assert.match(html, /PRUEBAS, NO TEATRO/);
  assert.match(html, /href="https:\/\/desmodus\.co"/);
  assert.match(html, /Bbeat/);
  assert.match(html, /Mi primer portátil acabó convertido en laboratorio/);
  assert.match(html, /BBEAT RADIO/);
  assert.match(html, /Calcifer/);
  assert.match(html, /Vamos a limpiar el VPS/);
  assert.match(html, /NÚCLEO PROPIO/);
  assert.match(html, /HEXAGONAL/);
  assert.match(html, /CONTEXT/);
  assert.match(html, /POLICY/);
  assert.match(html, /TRACE/);
  assert.match(html, /Entender/);
  assert.match(html, /Operar/);
  assert.match(html, /AHORA/);
  assert.match(html, /Adrián Gómez/);
  assert.match(html, /href="\/favicon\.svg\?v=5"/);
  assert.doesNotMatch(html, /Omniscius|OMNISCIUS|omniscius/);
  assert.doesNotMatch(html, /Garm|GARM|garm-panel|MIKOSHI/);
  assert.doesNotMatch(html, /HARD CAP|>TESTS<|>ADRs<|>PACKS</);
  assert.doesNotMatch(html, /SOMEONE(?:<br\/>)?KNOWS/);
  assert.match(html, /adriangcpy@gmail\.com/);
  assert.match(html, /class="tech-grid"/);
  assert.match(html, /DJANGO/);
  assert.match(html, /AI AGENTS/);
  assert.match(html, /class="swipe-cue"/);
  assert.match(html, /class="arrow-icon/);
  assert.doesNotMatch(html, /class="tool-strip"/);
  assert.doesNotMatch(html, /stroke-mobile/);
  assert.doesNotMatch(html, /Disponible para construir|PRODUCTO PROPIO|class="vinyl"/);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape/);
  assert.doesNotMatch(html, /github\.com\/Howlpy\/(?:calcifer|garm)/i);
});
