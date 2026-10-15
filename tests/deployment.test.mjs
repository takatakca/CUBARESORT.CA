import test from "node:test";
import assert from "node:assert/strict";
import { verifyLive } from "../scripts/verify-live.mjs";
import { REQUIRED_RELEASE_FILES } from "../scripts/release-assets.mjs";
import { createHash } from "node:crypto";
const sha="a".repeat(40);
const BUNDLE="_next/static/chunks/main-0123456789abcdef.js";
const HOMEPAGE='CUBARESORT.CA <script src="/CUBARESORT.CA/_next/static/chunks/main-0123456789abcdef.js"></script>'
 +'<div class="region-chips"><button class="region-chip">Varadero (50)</button></div><ul class="hotel-grid"></ul>';
function fetchSite({releaseSha=sha,missingAsset=false,tamperedAsset=false,invalidManifest=false}={}){
 const paths=[...REQUIRED_RELEASE_FILES,BUNDLE];
 const contents=Object.fromEntries(paths.map(path=>[
  path,path==="index.html"?HOMEPAGE:"/* CUBARESORT first-party release file: "+path+" */"
 ]));
 const assets=Object.fromEntries(paths.map(path=>[
  path,createHash("sha256").update(contents[path]).digest("hex")
 ]));
 return async(url,options)=>{
  assert.equal(options.redirect,"manual");
  assert.ok(url.pathname.startsWith("/CUBARESORT.CA/"),"project Pages path must be preserved");
  if(url.pathname.endsWith("release.json"))return Response.json({app:"cubaresort",sha:releaseSha,assets:invalidManifest?{}:assets});
  const path=url.pathname.endsWith("/CUBARESORT.CA/")?"index.html":url.pathname.split("/CUBARESORT.CA/")[1];
  assert.ok(Object.hasOwn(contents,path),"Unexpected request: "+path);
  if(missingAsset && path==="sitemap.xml")return new Response("Not found",{status:404});
  return new Response(tamperedAsset && path===BUNDLE?"/* stale but HTTP 200 */":contents[path]);
 };
}
test("live verification proves the exact release and preserves the project URL path",async()=>{
 const result=await verifyLive({url:"https://takatakca.github.io/CUBARESORT.CA/",sha,fetchImpl:fetchSite()});
 assert.equal(result.sha,sha);
 assert.equal(result.checks.length,5);
});
test("a green homepage cannot hide an older commit or a missing release file",async()=>{
 const options={url:"https://takatakca.github.io/CUBARESORT.CA/",sha};
 await assert.rejects(verifyLive({...options,fetchImpl:fetchSite({releaseSha:"b".repeat(40)})}),/expected commit/);
 await assert.rejects(verifyLive({...options,fetchImpl:fetchSite({missingAsset:true})}),/sitemap\.xml: HTTP 404/);
});
test("a 200 response with stale first-party application bytes fails integrity verification",async()=>{
 const options={url:"https://takatakca.github.io/CUBARESORT.CA/",sha};
 await assert.rejects(verifyLive({...options,fetchImpl:fetchSite({tamperedAsset:true})}),/deployed content does not match/);
 await assert.rejects(verifyLive({...options,fetchImpl:fetchSite({invalidManifest:true})}),/missing index\.html/);
});
test("verification rejects insecure URLs and partial commit identifiers",async()=>{
 await assert.rejects(verifyLive({url:"http://example.com/",sha}),/HTTPS/);
 await assert.rejects(verifyLive({url:"https://user:secret@example.com/",sha}),/HTTPS/);
 await assert.rejects(verifyLive({url:"https://example.com/",sha:"abc123"}),/full 40-character/);
});
