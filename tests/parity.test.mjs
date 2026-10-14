import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const read = (file) => readFile(resolve(root, file), "utf8");

test("Next.js route preserves discovery and request-drafting components", async () => {
  const page = await read("src/app/page.tsx");
  for (const component of ["TravelUiProvider", "TravelExperiences", "HotelDirectory", "SiteFaq", "SiteFooter"]) {
    assert.ok(page.includes("<" + component), component + " was dropped from the home page");
  }
});

test("the editorial catalogue still has nine ideas and six destinations", async () => {
  const catalog = await read("src/lib/hotels/catalog.ts");
  const ideas = catalog.match(/\{ id: "[^"]+", destination: "/g) ?? [];
  const places = catalog.match(/\{ id: "[^"]+", name: "[^"]+", image: "/g) ?? [];
  assert.equal(ideas.length, 9, "editorial stay ideas lost during migration");
  assert.equal(places.length, 6, "editorial destinations lost during migration");
});

test("discovery filters and favourites remain on-device and shareable", async () => {
  const app = await read("src/components/travel-experiences.tsx");
  for (const key of ["destination", "style", "query", "favorites", "localStorage", "URLSearchParams", "history.replaceState", "aria-pressed"]) {
    assert.ok(app.includes(key), key + " missing from Next.js discovery");
  }
  assert.ok(!app.includes("fetch("), "editorial filters must not transmit personal data");
});

test("request form only creates a draft and has a manual clipboard fallback", async () => {
  const ui = await read("src/components/travel-ui.tsx");
  for (const key of ["navigator.clipboard", "manualCopy", "dialog", "openInquiry", "openLegal", "privacyHtml", "termsHtml"]) {
    assert.ok(ui.includes(key), key + " missing from the request flow");
  }
  assert.ok(!ui.includes("fetch("), "request draft must not submit data to a backend");
  assert.ok(!ui.includes("mailto:"), "do not send to an unverified mailbox");
});

test("header, mobile navigation and footer expose all restored sections", async () => {
  const chrome = await read("src/components/site-chrome.tsx");
  for (const key of ['href="#destinations"', 'href="#experiences"', 'href="#hotels"', 'href="#questions"', "mobile-menu", "privacyLink", "termsLink"]) {
    assert.ok(chrome.includes(key), key + " missing from site navigation");
  }
});
