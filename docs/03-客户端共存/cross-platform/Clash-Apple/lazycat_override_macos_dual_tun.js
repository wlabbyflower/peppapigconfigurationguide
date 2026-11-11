// 懒猫微服 × Clash（clash.md）macOS 双 TUN 实验覆写
// 前提：懒猫 VPN/TUN 与 Clash TUN 同时活动，fc03::/40 仍由懒猫 utun 接管

function appendUnique(target, values) {
  for (const value of values) {
    if (!target.includes(value)) target.push(value);
  }
}

function isLazycatDNSFilter(value) {
  if (typeof value !== "string") return false;
  const normalized = value.trim().toLowerCase();
  return /(^|[,+*.])(heiyu\.space|lazycat\.cloud)(,|$)/.test(normalized);
}

function main(config) {
  // Clash DNS 返回真实 AAAA；macOS 随后按系统路由把 fc03::/40 交给懒猫 utun。
  if (!config.dns) config.dns = {};
  config.dns.enable = true;
  config.dns["enhanced-mode"] = "fake-ip";
  config.dns["fake-ip-filter-mode"] = "blacklist";
  if (!Array.isArray(config.dns["fake-ip-filter"])) {
    config.dns["fake-ip-filter"] = [];
  }
  config.dns["fake-ip-filter"] = config.dns["fake-ip-filter"].filter(
    (item) => !isLazycatDNSFilter(item)
  );
  appendUnique(config.dns["fake-ip-filter"], [
    "+.heiyu.space",
    "+.lazycat.cloud",
  ]);

  // 不修改 config.ipv6 与 dns.ipv6；双 TUN 模式要求用户原配置允许 AAAA。
  // 关键：fc03::/40 必须绕过 Clash TUN，才能继续匹配懒猫 utun 的系统路由。
  if (!config.tun) config.tun = {};
  if (!Array.isArray(config.tun["route-exclude-address"])) {
    config.tun["route-exclude-address"] = [];
  }
  appendUnique(config.tun["route-exclude-address"], [
    "6.6.6.6/32",
    "2000::6666/128",
    "fc03:1136:3800::/40",
  ]);

  // 避免 Clash 嗅探和改写懒猫域名；双 TUN 模式不创建本地 SOCKS5 节点。
  if (!config.sniffer) config.sniffer = {};
  if (!Array.isArray(config.sniffer["skip-domain"])) {
    config.sniffer["skip-domain"] = [];
  }
  appendUnique(config.sniffer["skip-domain"], [
    "+.heiyu.space",
    "+.lazycat.cloud",
  ]);

  const lazycatRules = [
    // 懒猫客户端建立穿透/中继连接时直接访问网络，避免代理回环。
    "PROCESS-NAME,懒猫微服,DIRECT",
    "PROCESS-NAME,lzc-core.darwin,DIRECT",

    // 正常情况下 heiyu/fc03 流量在系统路由层已绕过 Clash；以下作为兜底。
    "DOMAIN-SUFFIX,lazycat.cloud,DIRECT",
    "DOMAIN-SUFFIX,heiyu.space,DIRECT",
    "IP-CIDR6,fc03:1136:3800::/40,DIRECT,no-resolve",
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
