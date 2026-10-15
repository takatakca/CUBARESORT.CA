import test from "node:test";
import assert from "node:assert/strict";
import { verifyLive } from "../scripts/verify-live.mjs";
import { VERIFIED_RELEASE_FILES } from "../scripts/release-assets.mjs";
import { createHash } from "node:crypto";
const sha="a".repeat(40);
function fetchSite({releaseSha=sha,missingAsset=false,tamperedAsset=false,invalidManifest=false}={}){
 const contents=Object.fromEntries(VERIFIED_RELEASE_FILES.map(path=>[
  path,path==="index.html"?'CUBARESORT.CA <script src="./assets/app.js"></script>':"/* CUBARESORT static first-party asset: "+path+" */"
 ]));
 const assets=Object.fromEntries(VERIFIED_RELEASE_FILES.map(path=>[
  path,createHash("sha256").update(contents[path]).digest("hex")
 ]));
 return async(url,options)=>{
  assert.equal(options.redirect,"manual");
  assert.ok(url.pathname.startsWith("/CUBARESORT.CA/"),"project Pages path must be preserved");
  if(url.pathname.endsWith("release.json"))return Response.json({app:"cubaresort",sha:releaseSha,assets:invalidManifest?{}:assets});
  const path=url.pathname.endsWith("/CUBARESORT.CA/")?"index.html":url.pathname.split("/CUBARESORT.CA/")[1];
  assert.ok(Object.hasOwn(contents,path),"Unexpected request: "+path);
  if(missingAsset && path==="assets/styles.css")return new Response("Not found",{status:404});
  return new Response(tamperedAsset && path==="assets/app.js"?"<!-- stale but HTTP 200 -->":contents[path]);
 };
}
test("live verification proves the exact release and preserves the project URL path",async()=>{
 const result=await verifyLive({url:"https://takatakca.github.io/CUBARESORT.CA/",sha,fetchImpl:fetchSite()});
 assert.equal(result.sha,sha);
 assert.equal(result.checks.length,6);
});
test("a green homepage cannot hide an older commit or broken stylesheet",async()=>{
 const options={url:"https://takatakca.github.io/CUBARESORT.CA/",sha};
 await assert.rejects(verifyLive({...options,fetchImpl:fetchSite({releaseSha:"b".repeat(40)})}),/expected commit/);
 await assert.rejects(verifyLive({...options,fetchImpl:fetchSite({missingAsset:true})}),/styles.css: HTTP 404/);
});
test("a 200 response with stale first-party application bytes fails integrity verification",async()=>{
 const options={url:"https://takatakca.github.io/CUBARESORT.CA/",sha};
 await assert.rejects(verifyLive({...options,fetchImpl:fetchSite({tamperedAsset:true})}),/deployed content does not match/);
 await assert.rejects(verifyLive({...options,fetchImpl:fetchSite({invalidManifest:true})}),/invalid asset integrity manifest/);
});
test("verification rejects insecure URLs and partial commit identifiers",async()=>{
 await assert.rejects(verifyLive({url:"http://example.com/",sha}),/HTTPS/);
 await assert.rejects(verifyLive({url:"https://user:secret@example.com/",sha}),/HTTPS/);
 await assert.rejects(verifyLive({url:"https://example.com/",sha:"abc123"}),/full 40-character/);
});
