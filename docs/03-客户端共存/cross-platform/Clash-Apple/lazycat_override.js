// 懒猫微服 × Clash（clash.md）统一共存覆写
// iPhone、iPad、macOS 默认推荐：heiyu.space 使用 Fake IP 后交给本地懒猫代理

function appendUnique(target, values) {
  for (const value of values) {
    if (!target.includes(value)) target.push(value);
  }
}

function isHeiyuFakeIPFilter(value) {
  if (typeof value !== "string") return false;
  const normalized = value.trim().toLowerCase();
  return /(^|[,+*.])heiyu\.space(,|$)/.test(normalized);
}

function main(config) {
  const proxyName = "Lazycat Client";
  const groupName = "Lazycat";

  // 懒猫客户端 Proxy 模式提供的本地 SOCKS5 代理。
  const lazycatProxy = {
    name: proxyName,
    type: "socks5",
    server: "127.0.0.1",
    port: 31085,
    udp: true,
  };

  if (!Array.isArray(config.proxies)) config.proxies = [];
  const proxyIndex = config.proxies.findIndex((item) => item && item.name === proxyName);
  if (proxyIndex === -1) {
    config.proxies.push(lazycatProxy);
  } else {
    config.proxies[proxyIndex] = { ...config.proxies[proxyIndex], ...lazycatProxy };
  }

  // 默认选择 Lazycat Client，让 heiyu.space 与微服虚拟网段开箱即用；
  // 排障时可在 Clash 的代理页临时切换为 DIRECT。
  if (!Array.isArray(config["proxy-groups"])) config["proxy-groups"] = [];
  const wantedGroup = {
    name: groupName,
    type: "select",
    proxies: [proxyName, "DIRECT"],
  };
  const groupIndex = config["proxy-groups"].findIndex(
    (item) => item && item.name === groupName
  );
  if (groupIndex === -1) {
    config["proxy-groups"].unshift(wantedGroup);
  } else {
    const group = config["proxy-groups"][groupIndex];
    group.type = "select";
    const existing = Array.isArray(group.proxies) ? group.proxies : [];
    group.proxies = [
      proxyName,
      "DIRECT",
      ...existing.filter((name) => name !== proxyName && name !== "DIRECT"),
    ];
  }

  // 不嗅探懒猫域名及内部地址，避免目的地址被覆写。
  if (!config.sniffer) config.sniffer = {};
  if (!Array.isArray(config.sniffer["skip-domain"])) {
    config.sniffer["skip-domain"] = [];
  }
  appendUnique(config.sniffer["skip-domain"], ["+.heiyu.space", "+.lazycat.cloud"]);

  if (!Array.isArray(config.sniffer["skip-dst-address"])) {
    config.sniffer["skip-dst-address"] = [];
  }
  appendUnique(config.sniffer["skip-dst-address"], ["fc03:1136:3800::/40"]);

  // 仅旁路懒猫客户端用于探测本地网络出口的两个地址，避免扩大旁路范围。
  if (!config.tun) config.tun = {};
  if (!Array.isArray(config.tun["route-exclude-address"])) {
    config.tun["route-exclude-address"] = [];
  }
  appendUnique(config.tun["route-exclude-address"], [
    "6.6.6.6/32",
    "2000::6666/128",
  ]);

  // heiyu.space 必须使用 Fake IP：应用只连接 Fake IPv4，Clash 再把原始域名
  // 交给本地懒猫 SOCKS5，因而不依赖 macOS/iOS 的原生 IPv6 网络栈。
  if (!config.dns) config.dns = {};
  config.dns.enable = true;
  config.dns["enhanced-mode"] = "fake-ip";
  config.dns["fake-ip-filter-mode"] = "blacklist";
  if (!Array.isArray(config.dns["fake-ip-filter"])) {
    config.dns["fake-ip-filter"] = [];
  }
  config.dns["fake-ip-filter"] = config.dns["fake-ip-filter"].filter(
    (item) => !isHeiyuFakeIPFilter(item)
  );
  appendUnique(config.dns["fake-ip-filter"], ["+.lazycat.cloud"]);

  // 不修改 config.ipv6 与 dns.ipv6，保留用户和原 Profile 的 IPv6 选择。
  const lazycatRules = [
    // macOS 可识别进程；iOS/iPadOS 会主要依赖后面的域名和地址规则。
    "PROCESS-NAME,懒猫微服,DIRECT",
    "PROCESS-NAME,lzc-core.darwin,DIRECT",

    // 公共服务直接访问；微服域名和内部 IPv6 网段交给本地懒猫代理。
    "DOMAIN-SUFFIX,lazycat.cloud,DIRECT",
    `DOMAIN-SUFFIX,heiyu.space,${groupName}`,
    `IP-CIDR6,fc03:1136:3800::/40,${groupName},no-resolve`,
  ];

  if (!Array.isArray(config.rules)) config.rules = [];
  const managedPrefixes = [
    "PROCESS-NAME,懒猫微服,",
    "PROCESS-NAME,lzc-core.darwin,",
    "DOMAIN-SUFFIX,lazycat.cloud,",
    "DOMAIN-SUFFIX,heiyu.space,",
    "DOMAIN-KEYWORD,heiyu.space,",
    "IP-CIDR6,fc03:1136:3800::/40,",
  ];
  config.rules = config.rules.filter(
    (rule) =>
      typeof rule !== "string" ||
      !managedPrefixes.some((prefix) => rule.startsWith(prefix))
  );
  config.rules = [...lazycatRules, ...config.rules];

  return config;
}
