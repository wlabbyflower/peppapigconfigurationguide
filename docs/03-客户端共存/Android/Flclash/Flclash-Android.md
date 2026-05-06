# 使用Flclash(安卓)的共存方案

配置流程：切换微服客户端网络模式为Proxy模式 > 添加覆写脚本 > VPN绕过微服客户端

Clash内核的程序都可以按照这个思路配置，脚本是通用的，本篇只提供安卓Flclash的配置截图

开始配置前先确认Flclash和微服客户端都可以独立正常工作

## 关闭微服客户端VPN模式

我的页面-网络模式 > 选择Proxy模式 > 重启客户端（杀掉后台）

<img width="576" height="640" alt="o1" src="https://github.com/user-attachments/assets/2dd29dcc-ae43-4349-94ff-589c7a00baa9" />

## 添加覆写脚本

- 打开Flclash

- 点击下方“工具” > 进阶配置(提供多样化配置) > 脚本(覆写脚本) > 右上角“添加” > 粘贴下方脚本 > 保存 > 选中脚本

<img width="1577" height="872" alt="oNew" src="https://github.com/user-attachments/assets/ffb5186e-0baa-4d7b-9a91-43572cbf0289" />

```
// Define main function (script entry)
function main(config) {
  // ── sniffer ──────────────────────────────────────────────────────────────
  if (!config.sniffer) config.sniffer = {};

  const snifferSkipDomains = ["+.heiyu.space", "+.lazycat.cloud"];
  if (!config.sniffer["skip-domain"]) {
    config.sniffer["skip-domain"] = snifferSkipDomains;
  } else {
    for (const d of snifferSkipDomains) {
      if (!config.sniffer["skip-domain"].includes(d))
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
    "fd00::/8",
    "fe80::/10",
  ];
  for (const key of ["skip-src-address", "skip-dst-address"]) {
    if (!config.sniffer[key]) {
      config.sniffer[key] = [...skipAddresses];
    } else {
      for (const addr of skipAddresses) {
        if (!config.sniffer[key].includes(addr))
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
    "192.168.0.0/16",
    "10.0.0.0/8",
    "172.16.0.0/12",
    "169.254.0.0/16",
    "224.0.0.0/4",
    "fd00::/8",
    "fe80::/10",
  ];
  if (!config.tun["route-exclude-address"]) {
    config.tun["route-exclude-address"] = [...tunExclude];
  } else {
    for (const addr of tunExclude) {
      if (!config.tun["route-exclude-address"].includes(addr))
        config.tun["route-exclude-address"].push(addr);
    }
  }

  // ── dns ───────────────────────────────────────────────────────────────────
  if (!config.dns) config.dns = {};

  config.dns["fake-ip-filter-mode"] = "blacklist";

  const fakeIpAdd = ["+.heiyu.space"];
  if (!config.dns["fake-ip-filter"]) {
    config.dns["fake-ip-filter"] = [...fakeIpAdd];
  } else {
    for (const d of fakeIpAdd) {
      if (!config.dns["fake-ip-filter"].includes(d))
        config.dns["fake-ip-filter"].push(d);
    }
  }

  // ── proxies ───────────────────────────────────────────────────────────────
  const lazycatProxy = {
    name: "懒猫微服",
    type: "http",
    server: "127.0.0.1",
    port: 31085,
    "skip-cert-verify": true,
  };
  if (!config.proxies) {
    config.proxies = [lazycatProxy];
  } else if (!config.proxies.find((p) => p.name === "懒猫微服")) {
    config.proxies.push(lazycatProxy);
  }

  // ── rules (prepend, highest priority) ────────────────────────────────────
  const newRules = [
    "PROCESS-NAME,懒猫微服,DIRECT",
    "PROCESS-NAME,lzc-core.darwin,DIRECT,no-resolve",
  ];
  if (!config.rules) {
    config.rules = newRules;
  } else {
    for (const rule of [...newRules].reverse()) {
      if (!config.rules.includes(rule)) config.rules.unshift(rule);
    }
  }

  return config;
}
```

## VPN绕过微服客户端

点击下方“工具” > “访问控制” > 打开“应用访问控制”开关 > 勾选懒猫微服

<img width="591" height="650" alt="o3" src="https://github.com/user-attachments/assets/65bfa029-cf80-4d64-8339-7d79989bc28b" />

## 配置文件覆写

点击下方“配置” > 选择您订阅 点击右侧的“三个点” > 更多 > 覆写 > 覆写模式：脚本 > 选择刚才添加的脚本

<img width="1184" height="872" alt="oNew-1" src="https://github.com/user-attachments/assets/fdd8bbaa-aeaa-489f-bca3-20d56c5fb959" />

## 选择Node

在“代理”功能中，找到“Lzc”组，选中“Lzc-node” > 启动连接

<img width="591" height="650" alt="o4" src="https://github.com/user-attachments/assets/009913fa-c635-4ec4-ad41-fb785d6a3544" />

## 结束

可以测试浏览器和微服中是否能打开应用，客户端与微服连接是否直连

配置后需要为微服客户端配置后台留存：https://developer.lazycat.cloud/network.html#optimize-proxy-mode

<img width="298" height="650" alt="o12" src="https://github.com/user-attachments/assets/7a0d58df-6905-4ec7-85a2-41293488571e" />
