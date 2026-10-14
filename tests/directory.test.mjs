// Directory and i18n checks. Run with `npm test`.
// These run against the TypeScript sources through a tiny loader-free shim:
// the data modules are plain ESM once stripped of their type annotations, so
// the suite imports the generated JSON contract instead and asserts the same
// invariants the app relies on.
import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const read = (p) => readFile(resolve(root, p), "utf8");

test("the property directory keeps at least the 148 recovered properties", async () => {
  const data = await read("src/lib/hotels/data.ts");
  const ids = data.match(/\{ id: "/g) ?? [];
  // 13 region rows use `{ id: "` too; subtract them.
  const properties = ids.length - (data.match(/count: \d+/g) ?? []).length;
  assert.ok(properties >= 148, `only ${properties} properties in the directory`);
});

test("the directory carries no rate, availability or ranking field", async () => {
  const data = await read("src/lib/hotels/data.ts");
  // Match field NAMES only. A substring scan would fail on a legitimate hotel
  // name such as "Villa Caprice", which contains "price".
  const fields = new Set((data.match(/(?:\{|,)\s*([a-zA-Z_][\w]*)\s*:/g) ?? []).map((m) => m.replace(/[{,\s:]/g, "")));
  const allowed = new Set(["id", "name", "region", "airport", "confirmed", "count", "label", "fr", "en", "es"]);
  const banned = ["price", "rate", "cost", "cad", "usd", "stars", "rating", "review", "rooms", "promo", "discount", "availability", "photo", "image"];
  for (const field of fields) {
    assert.ok(allowed.has(field), `unexpected field "${field}" in data.ts`);
    assert.ok(!banned.includes(field.toLowerCase()), `banned commercial field "${field}"`);
  }
});

test("every property record has exactly the five allowed fields", async () => {
  const data = await read("src/lib/hotels/data.ts");
  const rows = data.match(/\{ id: "[^"]+", name: "[^"]*", region: "[^"]+", airport: "[^"]+", confirmed: (true|false) \}/g) ?? [];
  const anyRow = data.match(/\{ id: "[^"]+", name: "/g) ?? [];
  assert.equal(rows.length, anyRow.length, "a property row has fields beyond {id,name,region,airport,confirmed}");
});

test("all three languages define the same interface keys", async () => {
  const source = await read("src/lib/i18n/index.ts");
  for (const lang of ["fr:{", "en:{", "es:{"]) assert.ok(source.includes(lang), lang);
  for (const key of ["hotelsEyebrow", "hotelsNotice", "hotelsConfirmed", "hotelsPending"]) {
    const hits = source.split(key + ":").length - 1;
    assert.equal(hits, 3, `${key} should appear once per language, found ${hits}`);
  }
});

test("no low-contrast colour from the pre-audit palette comes back", async () => {
  const css = (await read("src/app/globals.css")).toLowerCase();
  // Each failed WCAG 2 AA at the size and background it was used on.
  // Verified with axe-core in Chromium, 2026-10-14. See docs/AGENT_HANDOFF.md.
  const retired = ["#b35f50","#7d8a87","#8a6a2f","#6a7c79","#79908a","#cc765f","#748380",
    "#88908b","#d46f59","#d17b64","#899693","#71807e","#66807c","#7f8a83","#788784",
    "#8f9994","#76827e","#cf725e","#e7e0c9","#71817b","#ee755e","#677b76","#a9624f",
    "#6a7875","#b05c4a","#6a736d","#697774"];
  for (const colour of retired) assert.ok(!css.includes(colour), `retired colour ${colour} is back`);
});

test("the build never activates a booking or payment integration by default", async () => {
  const env = await read(".env.example");
  assert.match(env, /CUBARESORT_BOOKING_PROVIDER=\s*$/m);
  assert.match(env, /CUBARESORT_CONTACT_EMAIL=\s*$/m);
});

test("Prisma pins the cubaresort schema and both connection URLs", async () => {
  const schema = await read("prisma/schema.prisma");
  assert.match(schema, /schemas\s*=\s*\["cubaresort"\]/);
  assert.match(schema, /url\s*=\s*env\("DATABASE_URL"\)/);
  assert.match(schema, /directUrl\s*=\s*env\("DIRECT_URL"\)/);
  // Identity stays with TAKATAK Auth: no credential columns here. Strip comments
  // first — the schema header legitimately says it stores no password or OTP.
  const code = schema
    .split("\n")
    .filter((line) => !line.trimStart().startsWith("//") && !line.trimStart().startsWith("///"))
    .join("\n")
    .toLowerCase();
  for (const word of ["password", "otp", "session", "token", "secret"]) {
    assert.ok(!new RegExp(`^\\s*\\w*${word}\\w*\\s`, "m").test(code), `schema should not define a ${word} column`);
  }
});
