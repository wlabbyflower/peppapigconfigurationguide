# 使用Flclash(安卓)的共存方案



Clash内核的程序都可以按照这个思路配置，脚本是通用的

开始配置前先确认Flclash和微服客户端都可以独立正常工作

# 一、Windows/Mac

这里以Windows为例，MAC是相同操作。

配置流程：添加覆写脚本 > 覆写订阅 > 正常使用

添加覆写脚本：

打开flclash

![](https://lzc-playground-1301583638.cos.ap-chengdu.myqcloud.com/guidelines/1369/20260601172120802.png)

覆写使用的脚本：

```
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

  const lazycatProxy = {
    name: lazycatProxyName,
    type: "http",
    server: "127.0.0.1",
    port: 31085,
  };

  if (!Array.isArray(config.proxies)) {
    config.proxies = [];
  }

  const oldProxyIndex = config.proxies.findIndex((p) => p.name === lazycatProxyName);
  if (oldProxyIndex === -1) {
    config.proxies.push(lazycatProxy);
  } else {
    config.proxies[oldProxyIndex] = {
      ...config.proxies[oldProxyIndex],
      ...lazycatProxy,
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
```



覆写订阅：

![](https://lzc-playground-1301583638.cos.ap-chengdu.myqcloud.com/guidelines/1369/20260601172612444.png)

重启下flclash

然后打开代理，正常使用

![](https://lzc-playground-1301583638.cos.ap-chengdu.myqcloud.com/guidelines/1369/20260601173355305.png)

可以随时更新订阅，不会影响脚本配置，配置一次可以一直使用。

# 二、安卓

## 关闭微服客户端VPN模式

配置流程：切换微服客户端网络模式为Proxy模式 > 添加覆写脚本 > VPN绕过微服客户端

我的页面-网络模式 > 选择Proxy模式 > 重启客户端（杀掉后台）

<img src="https://lzc-playground-1301583638.cos.ap-chengdu.myqcloud.com/guidelines/1369/20260601163212705.png"/>

## 添加覆写脚本

- 打开Flclash

- 点击下方“工具” > 进阶配置(提供多样化配置) > 脚本(覆写脚本) > 右上角“添加” > 粘贴下方脚本 > 保存 > 选中脚本

<img src="https://lzc-playground-1301583638.cos.ap-chengdu.myqcloud.com/guidelines/1369/20260601163921211.png"/>

```
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

  const lazycatProxy = {
    name: lazycatProxyName,
    type: "http",
    server: "127.0.0.1",
    port: 31085,
  };

  if (!Array.isArray(config.proxies)) {
    config.proxies = [];
  }

  const oldProxyIndex = config.proxies.findIndex((p) => p.name === lazycatProxyName);
  if (oldProxyIndex === -1) {
    config.proxies.push(lazycatProxy);
  } else {
    config.proxies[oldProxyIndex] = {
      ...config.proxies[oldProxyIndex],
      ...lazycatProxy,
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
```

## VPN绕过微服客户端

点击下方“工具” > “访问控制” > 打开“应用访问控制”开关 > 勾选懒猫微服

<img src="https://lzc-playground-1301583638.cos.ap-chengdu.myqcloud.com/guidelines/1369/20260601164831837.png"/>

## 配置文件覆写

点击下方“配置” > 选择您订阅 点击右侧的“三个点” > 更多 > 覆写 > 覆写模式：脚本 > 选择刚才添加的脚本，配置完成后退出并且杀掉应用。重新进入。

![](https://lzc-playground-1301583638.cos.ap-chengdu.myqcloud.com/guidelines/1369/20260601170116808.png)

## 选择Node

在“代理”功能中，找到“懒猫微服策略”组，选中“任意一个节点” ，接下来就可以去自己的节点进行调整，调整完成后 > 启动连接

![](https://lzc-playground-1301583638.cos.ap-chengdu.myqcloud.com/guidelines/1369/20260601170817248.png)

## 结束

可以测试浏览器和微服中是否能打开应用，客户端与微服连接是否直连

配置后需要为微服客户端配置后台留存：https://developer.lazycat.cloud/network.html#optimize-proxy-mode

 
