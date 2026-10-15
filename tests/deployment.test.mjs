import test from "node:test";
import assert from "node:assert/strict";
import { verifyLive } from "../scripts/verify-live.mjs";
const sha="a".repeat(40);
function fetchSite({releaseSha=sha,missingDirectory=false}={}){
 return async(url,options)=>{
  assert.equal(options.redirect,"manual");
  assert.ok(url.pathname.startsWith("/CUBARESORT.CA/"),"project Pages path must be preserved");
  if(url.pathname.endsWith("release.json"))return Response.json({app:"cubaresort",sha:releaseSha});
  const homepage='CUBARESORT.CA <script src="/CUBARESORT.CA/_next/static/chunks/main.js"></script>'
   +'<div class="region-chips"><button class="region-chip">Varadero (50)</button></div><ul class="hotel-grid"></ul>';
  if(missingDirectory && url.pathname.endsWith("/CUBARESORT.CA/"))
   return new Response('CUBARESORT.CA <script src="/CUBARESORT.CA/_next/static/chunks/main.js"></script>');
  return new Response(url.pathname.endsWith("/CUBARESORT.CA/")?homepage:"/* a non-empty static CUBARESORT asset for the release test */");
 };
}
test("live verification proves the exact release and preserves the project URL path",async()=>{
 const result=await verifyLive({url:"https://takatakca.github.io/CUBARESORT.CA/",sha,fetchImpl:fetchSite()});
 assert.equal(result.sha,sha);
 assert.equal(result.checks.length,5);
});
test("a green homepage cannot hide an older commit or a missing directory",async()=>{
 const options={url:"https://takatakca.github.io/CUBARESORT.CA/",sha};
 await assert.rejects(verifyLive({...options,fetchImpl:fetchSite({releaseSha:"b".repeat(40)})}),/expected commit/);
 await assert.rejects(verifyLive({...options,fetchImpl:fetchSite({missingDirectory:true})}),/property directory/);
});
test("verification rejects insecure URLs and partial commit identifiers",async()=>{
 await assert.rejects(verifyLive({url:"http://example.com/",sha}),/HTTPS/);
 await assert.rejects(verifyLive({url:"https://user:secret@example.com/",sha}),/HTTPS/);
 await assert.rejects(verifyLive({url:"https://example.com/",sha:"abc123"}),/full 40-character/);
});
