function main(config) {
  if (!config || typeof config !== 'object') {
    return config;
  }

  // ── 常量 ──────────────────────────────────────────────────────────────────
  var SNIFFER_SKIP_DOMAINS = ['+.heiyu.space', '+.lazycat.cloud'];
  var FAKE_IP_FILTER_DOMAINS = ['+.heiyu.space', '+.lazycat.cloud'];

  var SKIP_ADDRESSES = [
    '6.6.6.6/32',
    '2000::6666/128',
    'fc03:1136:3800::/40',
    '10.0.0.0/8',
    '172.16.0.0/12',
    '169.254.0.0/16',
    '192.168.0.0/16',
    '127.0.0.0/8',
    'fd00::/8',
    'fe80::/10',
    '::1/128',
  ];

  var TUN_EXCLUDE_ADDRESSES = [
    '6.6.6.6/32',
    '2000::6666/128',
    'fc03:1136:3800::/40',
    '127.0.0.0/8',
    '192.168.0.0/16',
    '10.0.0.0/8',
    '172.16.0.0/12',
    '169.254.0.0/16',
    '224.0.0.0/4',
    'fd00::/8',
    'fe80::/10',
    '::1/128',
  ];

  var LAZYCAT_PROXY_NAME = '懒猫微服';
  var LAZYCAT_GROUP_NAME = '懒猫微服策略';

  // ── 工具函数 ──────────────────────────────────────────────────────────────
  function isPlainObject(v) {
    return v !== null && typeof v === 'object' && !Array.isArray(v);
  }

  // 保证 parent[key] 是数组，返回它（原地复用，不丢失已有内容）
  function ensureArray(parent, key) {
    if (!Array.isArray(parent[key])) {
      parent[key] = [];
    }
    return parent[key];
  }

  // 追加去重
  function pushUnique(arr, items) {
    var seen = {};
    for (var i = 0; i < arr.length; i++) {
      seen[String(arr[i])] = true;
    }
    for (var j = 0; j < items.length; j++) {
      var v = String(items[j]);
      if (!seen[v]) {
        arr.push(v);
        seen[v] = true;
      }
    }
    return arr;
  }

  // 单个域名归一化：'+xxx' -> '+.xxx'
  function normalizePlusWildcard(domain) {
    if (typeof domain !== 'string') {
      return domain;
    }
    var d = domain.trim();
    if (d.charAt(0) === '+' && d.charAt(1) !== '.') {
      return '+.' + d.slice(1);
    }
    return d;
  }

  // 域名列表清洗：归一化 + 去空 + 去重
  function normalizeDomainList(arr) {
    var out = [];
    var seen = {};
    for (var i = 0; i < arr.length; i++) {
      var d = normalizePlusWildcard(arr[i]);
      if (typeof d !== 'string' || d === '') {
        continue;
      }
      if (!seen[d]) {
        seen[d] = true;
        out.push(d);
      }
    }
    return out;
  }

  // ── sniffer ───────────────────────────────────────────────────────────────
  if (!isPlainObject(config.sniffer)) {
    config.sniffer = {};
  }

  var skipDomain = normalizeDomainList(ensureArray(config.sniffer, 'skip-domain'));
  pushUnique(skipDomain, SNIFFER_SKIP_DOMAINS);
  config.sniffer['skip-domain'] = skipDomain;

  var addressKeys = ['skip-src-address', 'skip-dst-address'];
  for (var a = 0; a < addressKeys.length; a++) {
    pushUnique(ensureArray(config.sniffer, addressKeys[a]), SKIP_ADDRESSES);
  }

  // ── tun ───────────────────────────────────────────────────────────────────
  if (!isPlainObject(config.tun)) {
    config.tun = {};
  }
  pushUnique(ensureArray(config.tun, 'route-exclude-address'), TUN_EXCLUDE_ADDRESSES);

  // ── dns ───────────────────────────────────────────────────────────────────
  if (!isPlainObject(config.dns)) {
    config.dns = {};
  }
  config.dns['fake-ip-filter-mode'] = 'blacklist';

  var fakeIpFilter = normalizeDomainList(ensureArray(config.dns, 'fake-ip-filter'));
  pushUnique(fakeIpFilter, FAKE_IP_FILTER_DOMAINS);
  config.dns['fake-ip-filter'] = fakeIpFilter;

  // ── proxies ───────────────────────────────────────────────────────────────
  var lazycatProxy = {
    name: LAZYCAT_PROXY_NAME,
    type: 'http',
    server: '127.0.0.1',
    port: 31085,
  };

  var proxies = ensureArray(config, 'proxies');
  var proxyIndex = -1;
  for (var p = 0; p < proxies.length; p++) {
    if (proxies[p] && proxies[p].name === LAZYCAT_PROXY_NAME) {
      proxyIndex = p;
      break;
    }
  }
  if (proxyIndex === -1) {
    proxies.push(lazycatProxy);
  } else {
    // 保留订阅侧已有的额外字段，只覆盖本补丁负责的键
    proxies[proxyIndex] = Object.assign({}, proxies[proxyIndex], lazycatProxy);
  }

  // ── proxy-groups ──────────────────────────────────────────────────────────
  var groups = ensureArray(config, 'proxy-groups');
  var group = null;
  for (var g = 0; g < groups.length; g++) {
    if (groups[g] && groups[g].name === LAZYCAT_GROUP_NAME) {
      group = groups[g];
      break;
    }
  }

  if (!group) {
    groups.unshift({
      name: LAZYCAT_GROUP_NAME,
      type: 'select',
      proxies: ['DIRECT', LAZYCAT_PROXY_NAME],
    });
  } else {
    group.type = 'select';
    pushUnique(ensureArray(group, 'proxies'), ['DIRECT', LAZYCAT_PROXY_NAME]);
  }

  // ── rules ─────────────────────────────────────────────────────────────────
  var NEW_RULES = [
    // 懒猫自身进程必须直连，避免代理回环
    // 注: lzc-core.darwin 为 macOS 客户端进程名，Linux 下进程名可能不同，
    //     未匹配到的 PROCESS-NAME 规则不会报错，仅不生效
    'PROCESS-NAME,懒猫微服,DIRECT',
    'PROCESS-NAME,lzc-core.darwin,DIRECT',

    // 指定域名走可选策略组（客户端内可选 DIRECT 或 懒猫微服）
    'DOMAIN,appstore.api.lazycat.cloud,DIRECT',
    'DOMAIN,dl.lazycat.cloud,DIRECT',
    'DOMAIN-SUFFIX,heiyu.space,' + LAZYCAT_GROUP_NAME,
    'DOMAIN-SUFFIX,lazycat.cloud,' + LAZYCAT_GROUP_NAME,
  ];

  var rules = ensureArray(config, 'rules');
  var newRuleSet = {};
  for (var r = 0; r < NEW_RULES.length; r++) {
    newRuleSet[NEW_RULES[r]] = true;
  }

  var keptRules = [];
  for (var k = 0; k < rules.length; k++) {
    if (!newRuleSet[String(rules[k])]) {
      keptRules.push(rules[k]);
    }
  }
  config.rules = NEW_RULES.concat(keptRules);

  return config;
}
