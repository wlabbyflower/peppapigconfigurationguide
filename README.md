# 小猪佩奇配置指南

懒猫微服（cat）代理配置教程：**装代理、共享给局域网、和常见代理客户端共存**。

## 一、微服装代理（二选一）

| 方案 | 适合 | 教程 |
| --- | --- | --- |
| PeppaPig（v2rayA） | 图形界面，导入节点就能用 | [点这里](./docs/01-微服内代理部署/PeppaPig/README.md) |
| Clash | 需要 TUN、订阅、分流、链式代理 | [点这里](./docs/01-微服内代理部署/Clash/README.md) |

> 两个不要同时开。开启「自动连接」前，先确认 SSH 能用。

## 二、局域网设备也想用

微服代理跑通后，按下面配置端口分享和转发：

[局域网代理共享 →](./docs/02-局域网代理共享/README.md)

## 三、客户端共存（开了代理打不开微服，看这里）

| 平台 | 点对应的客户端 |
| --- | --- |
| iOS | [小火箭](./docs/03-客户端共存/iOS/Shadowrocket/README.md) · [Loon](./docs/03-客户端共存/iOS/Loon/README.md) · [Quantumult X](./docs/03-客户端共存/iOS/QuantumultX/README.md) · [Stash](./docs/03-客户端共存/iOS/Stash/README.md) · [Surge](./docs/03-客户端共存/iOS/Surge/README.md) · [ClashMi](./docs/03-客户端共存/cross-platform/ClashMi/README.md) |
| Android | [NekoBox（视频）](./docs/03-客户端共存/Android/NekoBox/README.md) · [ClashMi](./docs/03-客户端共存/cross-platform/ClashMi/README.md) · [FlClash](./docs/03-客户端共存/cross-platform/FlClash/README.md) |
| macOS | [小火箭](./docs/03-客户端共存/macOS/Shadowrocket/README.md) · [Surge](./docs/03-客户端共存/macOS/Surge/README.md) · [Quantumult X](./docs/03-客户端共存/macOS/QuantumultX/README.md) · [ClashMi](./docs/03-客户端共存/cross-platform/ClashMi/README.md) · [FlClash](./docs/03-客户端共存/cross-platform/FlClash/README.md) |
| Windows | [Clash Verge](./docs/03-客户端共存/cross-platform/ClashVerge/README.md) · [ClashMi](./docs/03-客户端共存/cross-platform/ClashMi/README.md) · [FlClash](./docs/03-客户端共存/cross-platform/FlClash/README.md) · [Hiddify](./docs/03-客户端共存/cross-platform/Hiddify/README.md) · [v2rayN](./docs/03-客户端共存/cross-platform/v2ray/README.md) |
| 跨平台 | [sing-box](./docs/03-客户端共存/cross-platform/sing-box/README.md) · [v2rayN / v2rayA](./docs/03-客户端共存/cross-platform/v2ray/README.md) · [Hiddify](./docs/03-客户端共存/cross-platform/Hiddify/README.md) |

## 共存只改三处

1. 微服客户端切 **Proxy** 模式，然后杀掉后台重新打开。
2. 代理客户端加本地节点：`socks5 127.0.0.1:31086` 或 `http 127.0.0.1:31085`。
3. 微服域名走本地节点 / 直连，`6.6.6.6/32`、`2000::6666/128` 绕过代理，开启 IPv6。

端口以微服客户端「网络模式」页面显示为准。详细步骤点上面的客户端教程。

## 说明

- 视频使用 Git LFS，克隆后执行：`git lfs install && git lfs pull`
- 本项目仅供学习交流，请遵守所在地法律法规。
- 完整文档索引：[docs/README.md](./docs/README.md)

## Star History

<p align="center">
  <a href="https://www.star-history.com/?repos=wlabbyflower%2Fpeppapigconfigurationguide&type=date&legend=top-left">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://api.star-history.com/chart?repos=wlabbyflower/peppapigconfigurationguide&type=date&theme=dark&legend=top-left" />
      <source media="(prefers-color-scheme: light)" srcset="https://api.star-history.com/chart?repos=wlabbyflower/peppapigconfigurationguide&type=date&legend=top-left" />
      <img alt="Star History Chart" src="https://api.star-history.com/chart?repos=wlabbyflower/peppapigconfigurationguide&type=date&legend=top-left" />
    </picture>
  </a>
</p>
