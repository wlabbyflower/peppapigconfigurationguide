// Define main function
function main(config) {
  // ── sniffer ──────────────────────────────────────────────────────────────
  if (!config.sniffer) config.sniffer = {};

  const snifferSkipDomains = ["+.heiyu.space", "+.lazycat.cloud"];
  if (!Array.isArray(config.sniffer["skip-domain"])) {
    config.sniffer["skip-domain"] = [];
  }
  for (const d of snifferSkipDomains) {
    if (!config.sniffer["skip-domain"].includes(d)) {
      config.sniffer["skip-domain"].push(d);
    }
  }

  const skipAddresses = [
    "6.6.6.6/32",
    "2000::6666/128",
    "fc03:1136:3800::/40",
    "10.0.0.0/8",
    "172.16.0.0/12",
    "169.254.0.0/16",
    "192.168.0.0/16",
    "127.0.0.0/8",
    "fd00::/8",
    "fe80::/10",
    "::1/128",
  ];

  for (const key of ["skip-src-address", "skip-dst-address"]) {
    if (!Array.isArray(config.sniffer[key])) {
      config.sniffer[key] = [];
    }
    for (const addr of skipAddresses) {
      if (!config.sniffer[key].includes(addr)) {
        config.sniffer[key].push(addr);
      }
    }
  }

  // ── tun ──────────────────────────────────────────────────────────────────
  if (!config.tun) config.tun = {};

  const tunExclude = [
    "6.6.6.6/32",
    "2000::6666/128",
    "fc03:1136:3800::/40",
    "127.0.0.0/8",
    "192.168.0.0/16",
    "10.0.0.0/8",
    "172.16.0.0/12",
    "169.254.0.0/16",
    "224.0.0.0/4",
    "fd00::/8",
    "fe80::/10",
    "::1/128",
  ];

  if (!Array.isArray(config.tun["route-exclude-address"])) {
    config.tun["route-exclude-address"] = [];
  }
  for (const addr of tunExclude) {
    if (!config.tun["route-exclude-address"].includes(addr)) {
      config.tun["route-exclude-address"].push(addr);
    }
  }

  // ── dns ───────────────────────────────────────────────────────────────────
  if (!config.dns) config.dns = {};

  config.dns["fake-ip-filter-mode"] = "blacklist";

  const fakeIpAdd = ["+.heiyu.space", "+.lazycat.cloud"];
  if (!Array.isArray(config.dns["fake-ip-filter"])) {
    config.dns["fake-ip-filter"] = [];
  }
  for (const d of fakeIpAdd) {
    if (!config.dns["fake-ip-filter"].includes(d)) {
      config.dns["fake-ip-filter"].push(d);
    }
  }

  // ── proxies ───────────────────────────────────────────────────────────────
  const lazycatProxyName = "懒猫微服";
  const lazycatGroupName = "懒猫微服策略";

  if (!Array.isArray(config.proxies)) {
    config.proxies = [];
  }

  const oldProxyIndex = config.proxies.findIndex((p) => p.name === lazycatProxyName);
  if (oldProxyIndex === -1) {
    config.proxies.push(lazycatProxy);
  } else {
    config.proxies[oldProxyIndex] = {
      ...config.proxies[oldProxyIndex],
    };
  }

  // ── proxy-groups ──────────────────────────────────────────────────────────
  if (!Array.isArray(config["proxy-groups"])) {
    config["proxy-groups"] = [];
  }

  const lazycatGroup = {
    name: lazycatGroupName,
    type: "select",
    proxies: [
      "DIRECT",
      lazycatProxyName,
    ],
  };

  const oldGroupIndex = config["proxy-groups"].findIndex(
    (g) => g.name === lazycatGroupName
  );

  if (oldGroupIndex === -1) {
    config["proxy-groups"].unshift(lazycatGroup);
  } else {
    const oldGroup = config["proxy-groups"][oldGroupIndex];

    oldGroup.type = "select";

    if (!Array.isArray(oldGroup.proxies)) {
      oldGroup.proxies = [];
    }

    for (const p of lazycatGroup.proxies) {
      if (!oldGroup.proxies.includes(p)) {
        oldGroup.proxies.push(p);
      }
    }
  }

  // ── rules ─────────────────────────────────────────────────────────────────
  const newRules = [
    // 懒猫自身进程必须直连，避免代理回环
    "PROCESS-NAME,懒猫微服,DIRECT",
    "PROCESS-NAME,lzc-core.darwin,DIRECT",

    // 指定域名走可选策略组
    // 在客户端里面可以选择 DIRECT 或 懒猫微服
    `DOMAIN-SUFFIX,heiyu.space,${lazycatGroupName}`,
    `DOMAIN-SUFFIX,lazycat.cloud,${lazycatGroupName}`,
  ];

  if (!Array.isArray(config.rules)) {
    config.rules = [];
  }

  config.rules = config.rules.filter((r) => !newRules.includes(r));
  config.rules = [...newRules, ...config.rules];

  return config;
}
