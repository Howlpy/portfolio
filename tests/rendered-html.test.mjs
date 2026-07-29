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
  assert.match(html, /<title>HOWL \/ Signal Core/);
  assert.match(html, /HOWL/);
  assert.match(html, /SIGNAL/);
  assert.match(html, /CORE\./);
  assert.match(html, /Omniscius/);
  assert.match(html, /BBEAT/);
  assert.match(html, /adriangcpy@gmail\.com/);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape/);
});
