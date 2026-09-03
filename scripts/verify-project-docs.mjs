import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath, URL } from "node:url";
import { log } from "node:console";

// Offline documentation checks only: no API requests, emails or mutations.
const root = fileURLToPath(new URL("../", import.meta.url));
const read = (name) => readFileSync(path.join(root, name), "utf8");
const json = (name) => JSON.parse(read(name));
const baseline = json("docs/verification-baseline.json");
const blueprint = json("docs/automation/make.blueprint.sanitized.json");

for (const asset of baseline.assets) {
  const actual = createHash("sha256")
    .update(readFileSync(path.join(root, asset.path)))
    .digest("hex");
  assert.equal(actual, asset.sha256, `Snapshot changed: ${asset.path}`);
}

assert.deepEqual(blueprint.flow.map((module) => module.id), baseline.make.executionOrder);
const modules = new Map(blueprint.flow.map((module) => [module.id, module]));
assert.equal(modules.get(2).parameters.hook, null);
for (const id of [9, 10, 11, 12]) {
  assert.equal(modules.get(id).parameters.__IMTCONN__, null, "Private connection exported");
}
for (const id of [11, 12]) {
  assert.equal(modules.get(id).mapper.spreadsheetId, "RECONNECT_PRIVATE_SPREADSHEET");
}
for (const module of blueprint.flow) {
  assert.deepEqual(Object.keys(module.metadata), ["designer"], "Review exported metadata");
}
assert.ok(!/https?:\/\/hook\.[^\s"<>]+/i.test(JSON.stringify(blueprint)), "Webhook URL exported");

const normalizeHtml = (value) => value.replace(/>\s+</g, "><").trim();
for (const [id, name] of [[9, "interno"], [10, "cliente"]]) {
  assert.equal(
    normalizeHtml(read(`docs/automation/emails/${name}.html`)),
    normalizeHtml(modules.get(id).mapper.content),
    `Email and blueprint differ: ${name}`,
  );
}
const customerEmail = modules.get(10).mapper;
assert.equal(customerEmail.toRecipients[0].address, "{{2.email}}");
assert.equal(modules.get(9).mapper.toRecipients[0].address, "contacto@cuarentamas.com");
assert.ok(customerEmail.content.includes('src="https://cuarentamas.com/email/logo-40plus.jpg"'));
assert.ok(customerEmail.content.includes('width="88"'));
assert.ok(customerEmail.content.includes('href="{{2.ebookUrl}}"'));
assert.ok(customerEmail.content.includes('href="https://cuarentamas.com/producto/colageno-hidrolizado-40"'));

// Lock the observed limitations so future documentation updates acknowledge changes.
assert.equal(modules.get(11).mapper.filter[0][0].b, "CONFIGURACION-NO-PROCESAR");
assert.equal(modules.get(12).mapper.valueInputOption, "USER_ENTERED");
assert.equal(modules.get(12).mapper.values.estadoEnvio, "pendiente");

const schema = json("docs/automation/experience-payload.schema.json");
const example = json("docs/automation/experience-payload.example.json");
assert.deepEqual(Object.keys(example).sort(), schema.required.slice().sort());
assert.equal(schema.additionalProperties, false);
for (const [name, definition] of Object.entries(schema.properties)) {
  const value = example[name];
  if ("const" in definition) assert.equal(value, definition.const, name);
  if (definition.type) assert.equal(typeof value, definition.type, name);
  if (definition.minLength) assert.ok(value.length >= definition.minLength, name);
  if (definition.maxLength) assert.ok(value.length <= definition.maxLength, name);
}
assert.equal(example.email, "cliente@example.com");
assert.equal(example.ip, "192.0.2.1");
assert.equal(example.mensaje, example.experiencia);
assert.equal(example.ebookUrl, `https://cuarentamas.com${example.ebookPath}`);
assert.ok(read("api/experiencia.js").includes('source: "web-experiencia-ritual-40"'));
assert.ok(read("src/App.jsx").includes('path="/comparte-tu-experiencia"'));
assert.ok(read("src/App.jsx").includes('path="/producto/colageno-hidrolizado-40"'));

const columns = read("docs/automation/sheets-headers.csv").trim().split(",");
assert.equal(columns.length, 19);
for (const column of Object.keys(modules.get(12).mapper.values)) {
  assert.ok(columns.includes(column), `Missing header: ${column}`);
}
assert.deepEqual(columns.slice(-3), ["estadoEnvio", "fechaEnvio", "errorEnvio"]);

const markdownFiles = ["README.md", "README.es.md"];
assert.ok(read("README.md").includes("[Español](README.es.md)"), "Missing Spanish language link");
assert.ok(read("README.es.md").includes("[English](README.md)"), "Missing English language link");
assert.ok(read("docs/HISTORIA.md").includes("[English](HISTORIA.en.md)"), "Missing English history link");
assert.ok(read("docs/HISTORIA.en.md").includes("[Español](HISTORIA.md)"), "Missing Spanish history link");
const walk = (directory) => {
  for (const entry of readdirSync(path.join(root, directory), { withFileTypes: true })) {
    const relative = path.join(directory, entry.name);
    if (entry.isDirectory()) walk(relative);
    else if (entry.name.endsWith(".md")) markdownFiles.push(relative);
  }
};
walk("docs");
let checkedLinks = 0;
for (const file of markdownFiles) {
  const markdown = read(file);
  const links = [...markdown.matchAll(/\[[^\]]*\]\(([^)]+)\)/g)].map((match) => match[1]);
  const images = [...markdown.matchAll(/<img\b[^>]*\bsrc="([^"]+)"/g)].map((match) => match[1]);
  for (const target of [...links, ...images]) {
    if (/^(https?:|mailto:|#)/.test(target)) continue;
    const clean = decodeURIComponent(target.split("#")[0]);
    const absolute = path.resolve(root, path.dirname(file), clean);
    assert.ok(absolute.startsWith(root), `Link leaves repository: ${file}: ${target}`);
    assert.ok(existsSync(absolute), `Broken local link: ${file}: ${target}`);
    checkedLinks += 1;
  }
}

log(`Documentation OK: ${markdownFiles.length} Markdown files, ${checkedLinks} local links.`);
log("Snapshot hashes, sanitized bindings, email parity, sample payload and sheet headers: OK.");
log("No live-service, browser, import, full JSON Schema or end-to-end tests were performed by this script.");
