import { resolve4, resolve6, resolveMx } from "node:dns/promises";
import { isIP } from "node:net";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

const normalize = name => String(name || "").trim().toLowerCase().replace(/\.$/, "");
const optionalIPv6 = async (lookup, name) => {
  try { return await lookup.resolve6(name); }
  catch (error) {
    if (["ENODATA", "ENOTFOUND", "ENONAME"].includes(error.code)) return [];
    throw error;
  }
};

export function assertMailSafeDomainDns({
  domain, webIPv4, apexIPv4, wwwIPv4, apexIPv6=[], wwwIPv6=[], mx=[], mailIPv4ByHost={}
}) {
  const apex = normalize(domain);
  if (apex !== "cubaresort.ca" || isIP(webIPv4) !== 4)
    throw new Error("Unexpected domain or production IPv4 target");
  for (const [label, addresses] of [["apex",apexIPv4],["www",wwwIPv4]]) {
    if (!Array.isArray(addresses) || addresses.length===0 ||
        addresses.some(ip=>ip!==webIPv4))
      throw new Error(`${label} must resolve only to the verified Contabo IPv4 target`);
  }
  if (apexIPv6.length || wwwIPv6.length)
    throw new Error("Unapproved IPv6 addresses are present; check HTTPS and the expected target first");
  if (!Array.isArray(mx) || !mx.length)
    throw new Error("Mail exchange records must be present and independently preserved");
  const mailHosts = [];
  for (const record of mx) {
    const host = normalize(record.exchange);
    if (!host || host === apex)
      throw new Error("MX still targets the web apex; moving its A record would break mail");
    const addresses = mailIPv4ByHost[host];
    if (!Array.isArray(addresses) || !addresses.length || addresses.some(ip=>isIP(ip)!==4 || ip===webIPv4))
      throw new Error("MX destination must resolve to a separate verified mail host, not the web target");
    mailHosts.push(host);
  }
  return {domain:apex,webIPv4,mailHosts};
}

export async function verifyDomainDns({domain="cubaresort.ca",webIPv4="31.220.96.134",lookup={resolve4,resolve6,resolveMx}}={}) {
  const mx = await lookup.resolveMx(domain);
  // Do not rely on new web DNS until the mail exchanger is no longer the apex.
  if (mx.some(record=>normalize(record.exchange)===normalize(domain)))
    throw new Error("MX still targets the web apex; moving its A record would break mail");
  const [apexIPv4,wwwIPv4,apexIPv6,wwwIPv6]=await Promise.all([
    lookup.resolve4(domain),lookup.resolve4("www."+domain),
    optionalIPv6(lookup,domain),optionalIPv6(lookup,"www."+domain)
  ]);
  const mailIPv4ByHost={};
  for (const record of mx) {
    const host=normalize(record.exchange);
    if (host)mailIPv4ByHost[host]=await lookup.resolve4(host);
  }
  return assertMailSafeDomainDns({domain,webIPv4,apexIPv4,wwwIPv4,apexIPv6,wwwIPv6,mx,mailIPv4ByHost});
}

if (process.argv[1] && resolve(process.argv[1])===fileURLToPath(import.meta.url)) {
  try {
    const result=await verifyDomainDns();
    console.log(`PASS web DNS targets ${result.webIPv4}; mail uses separate hostnames. Manual mail delivery acceptance remains required.`);
  } catch(error) {
    console.error(`FAIL custom-domain DNS safety: ${error.message}`);
    process.exitCode=1;
  }
}
