import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { VERIFIED_RELEASE_FILES } from "./release-assets.mjs";

const base = new URL(process.env.CONTAINER_URL || "http://127.0.0.1:18089/");
assert.equal(base.protocol, "http:");
assert.equal(base.hostname, "127.0.0.1", "Container smoke tests must target loopback only");
const sha = process.env.SOURCE_COMMIT;
assert.match(sha || "", /^[0-9a-f]{40}$/);
const read = (path, options = {}) => fetch(new URL(path, base), {
  redirect: "manual", signal: AbortSignal.timeout(10000), ...options
});
const marker = await read("release.json");
assert.equal(marker.status, 200);
assert.match(marker.headers.get("cache-control"), /no-store/);
const release = await marker.json();
assert.equal(release.app, "cubaresort");
assert.equal(release.sha, sha);
assert.deepEqual(Object.keys(release.assets).sort(), [...VERIFIED_RELEASE_FILES].sort());
for (const path of VERIFIED_RELEASE_FILES) {
  const response = await read(path === "index.html" ? "./" : path);
  assert.equal(response.status, 200, path);
  assert.equal(createHash("sha256").update(Buffer.from(await response.arrayBuffer())).digest("hex"), release.assets[path], path);
}
assert.equal(await (await read("healthz")).text(), "ok\n");
for (const path of [".env", ".git/config", "README.md", "package.json", "docs/AGENT_HANDOFF.md", "assets/missing.js"]) {
  assert.equal((await read(path)).status, 404, path);
}
assert.equal((await read("assets/app.js", { method: "POST" })).status, 405);
console.log(`PASS container ${sha}: health, exact commit, all asset digests, cache and private-path isolation`);
