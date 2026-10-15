// Writes out/release.json so the deploy job can prove the public site is the
// exact commit CI tested. Run after a static build.
import { writeFile, access } from "node:fs/promises";
import { resolve } from "node:path";

const out = resolve(process.cwd(), "out");
await access(out); // fail loudly if the export did not run

const sha = process.env.RELEASE_SHA ?? "local";
const payload = {
  app: "cubaresort",
  sha,
  builtAt: new Date().toISOString(),
  target: process.env.BUILD_TARGET === "node" ? "node" : "static",
};
await writeFile(resolve(out, "release.json"), JSON.stringify(payload, null, 2) + "\n");
// Pages would otherwise strip /_next/ as a Jekyll underscore directory.
await writeFile(resolve(out, ".nojekyll"), "");
console.log(`release.json written for ${sha}`);
