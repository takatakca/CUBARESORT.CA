// Which published files must match the tested build byte for byte.
//
// Next.js names its chunks by content hash, so the list cannot be hardcoded:
// it is produced at build time by scripts/write-release.mjs and travels in
// release.json. What stays fixed is the SHAPE the manifest must have, so a
// thin or forged manifest cannot pass verification.

/** Paths every release must publish and verify, whatever the build hashes. */
export const REQUIRED_RELEASE_FILES = Object.freeze(["index.html", "robots.txt", "sitemap.xml"]);

/**
 * Validate a release manifest before any byte is compared.
 * Returns the paths to verify, or throws explaining what is wrong.
 */
export function releaseFilesFrom(assets) {
  if (!assets || typeof assets !== "object" || Array.isArray(assets))
    throw new Error("Public release has a missing or invalid asset integrity manifest");

  const paths = Object.keys(assets);
  for (const path of paths) {
    if (!/^[0-9a-f]{64}$/.test(assets[path]))
      throw new Error(`Public release manifest has no valid SHA-256 for ${path}`);
    // Only first-party, relative paths may be verified.
    if (path.startsWith("/") || path.includes("..") || /^[a-z]+:/i.test(path))
      throw new Error(`Public release manifest contains an unsafe path: ${path}`);
  }
  for (const required of REQUIRED_RELEASE_FILES) {
    if (!paths.includes(required))
      throw new Error(`Public release manifest is missing ${required}`);
  }
  // The application bundle is the point of the check; a manifest of documents
  // alone would verify nothing about the running code.
  if (!paths.some((path) => path.endsWith(".js")))
    throw new Error("Public release manifest lists no JavaScript bundle");

  return paths;
}
