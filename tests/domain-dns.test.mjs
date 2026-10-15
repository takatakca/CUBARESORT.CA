import test from "node:test";
import assert from "node:assert/strict";
import { assertMailSafeDomainDns, verifyDomainDns } from "../scripts/check-domain-dns.mjs";

const ready = () => ({
  domain:"cubaresort.ca", webIPv4:"31.220.96.134",
  apexIPv4:["31.220.96.134"],wwwIPv4:["31.220.96.134"],
  mx:[{priority:0,exchange:"mail.cubaresort.ca."}],
  mailIPv4ByHost:{"mail.cubaresort.ca":["209.42.24.125"]}
});

test("a mail-separated domain with only the verified web target passes the DNS guard",()=>{
  assert.equal(assertMailSafeDomainDns(ready()).mailHosts[0],"mail.cubaresort.ca");
});
test("existing apex MX must block a dangerous web cutover",()=>{
  const value=ready();
  value.mx=[{priority:0,exchange:"CUBARESORT.CA."}];
  assert.throws(()=>assertMailSafeDomainDns(value),/MX still targets the web apex/);
});
test("mail exchanger must not redirect to Contabo web hosting",()=>{
  const value=ready();
  value.mailIPv4ByHost["mail.cubaresort.ca"]=["31.220.96.134"];
  assert.throws(()=>assertMailSafeDomainDns(value),/separate verified mail host/);
});
test("unknown or missing mail routing cannot be treated as ready",()=>{
  const value=ready();
  value.mailIPv4ByHost={};
  assert.throws(()=>assertMailSafeDomainDns(value),/separate verified mail host/);
  value.mx=[];
  assert.throws(()=>assertMailSafeDomainDns(value),/must be present/);
});
test("both apex and www must route only to Contabo",()=>{
  const value=ready();
  value.apexIPv4=["209.42.24.125"];
  assert.throws(()=>assertMailSafeDomainDns(value),/apex must resolve/);
  value.apexIPv4=["31.220.96.134"];
  value.wwwIPv4=["31.220.96.134","209.42.24.125"];
  assert.throws(()=>assertMailSafeDomainDns(value),/www must resolve/);
});
test("unexpected IPv6 and wrong target hostname must fail closed",()=>{
  const value=ready();
  value.apexIPv6=["2001:db8::1"];
  assert.throws(()=>assertMailSafeDomainDns(value),/Unapproved IPv6/);
  value.apexIPv6=[];
  value.domain="takatak.ca";
  assert.throws(()=>assertMailSafeDomainDns(value),/Unexpected domain/);
});
test("live DNS checker refuses apex MX before doing any other DNS requests",async()=>{
  const called=[];
  const lookup={
    async resolveMx(){called.push("mx");return [{priority:0,exchange:"cubaresort.ca."}];},
    async resolve4(){called.push("a");return ["209.42.24.125"];},
    async resolve6(){called.push("aaaa");return [];}
  };
  await assert.rejects(verifyDomainDns({lookup}),/MX still targets the web apex/);
  assert.deepEqual(called,["mx"]);
});
test("a resolved www alias and missing IPv6 are supported with a separate mail host",async()=>{
  const lookup={
    async resolveMx(){return [{priority:10,exchange:"mail.cubaresort.ca"}];},
    async resolve4(host){return [host==="mail.cubaresort.ca"?"209.42.24.125":"31.220.96.134"];},
    async resolve6(){const error=new Error("No AAAA");error.code="ENODATA";throw error;}
  };
  assert.equal((await verifyDomainDns({lookup})).webIPv4,"31.220.96.134");
});
