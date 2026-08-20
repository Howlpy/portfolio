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
  assert.match(html, /HAGO SOFTWARE/);
  assert.match(html, /SIN MANUAL/);
  assert.match(html, /Omniscius/);
  assert.match(html, /CTO/);
  assert.match(html, /BBEAT/);
  assert.match(html, /Mi primer portátil acabó convertido en laboratorio/);
  assert.match(html, /RANSOMWARE/);
  assert.match(html, /BBEAT RADIO/);
  assert.match(html, /GARM/);
  assert.match(html, /Harness propio en Python/);
  assert.match(html, /NÚCLEO PROPIO/);
  assert.match(html, /HEXAGONAL/);
  assert.match(html, /CONTEXT/);
  assert.match(html, /POLICY/);
  assert.match(html, /TRACE/);
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
});
