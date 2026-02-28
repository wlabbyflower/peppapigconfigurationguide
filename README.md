# 小猪佩奇配置指南

本仓库用于整理懒猫微服（cat）相关代理配置教程，覆盖微服内代理部署、局域网共享代理、以及与常见客户端的共存配置。

## 快速入口

### 1) 微服内代理部署
- [PeppaPig（v2raya）部署指南](./docs/01-微服内代理部署/PeppaPigConfigurationGuide/PeppaPigConfigurationGuide.md)
- [Clash 部署教程](./docs/01-微服内代理部署/PeppaPigConfigurationGuide/clash部署教程.md)

### 2) 局域网共享代理
- [构建内网代理（同 LAN 设备可访问）](./docs/02-局域网代理共享/构建内网代理方法：配置代理为微服所在局域网可访问.md)

### 3) 客户端共存配置
- 跨平台：
[Clash](./docs/03-客户端共存/cross-platform/clash/clash.md) / [Sing-box](./docs/03-客户端共存/cross-platform/singbox/singbox.json配置.md) / [v2ray 系列](./docs/03-客户端共存/cross-platform/v2ray系列/v2ray系列.md) / [Hiddify](./docs/03-客户端共存/cross-platform/Hiddify/Hiddify.md)
- Android：
[FlClash](./docs/03-客户端共存/Android/Flclash/Flclash-Android.md) / [NekoBox 参考视频](./docs/03-客户端共存/Android/Android的猫箱（nekobox）/nekobox.mp4)
- iOS：
[小火箭](./docs/03-客户端共存/iOS/iOS小火箭配置/iOS端小火箭与cat配置共存.md) / [Loon](./docs/03-客户端共存/iOS/ios端Loon/Loon配置共存教程.md) / [QX](./docs/03-客户端共存/iOS/iOSqx配置/iOSqx.md) / [Stash（手动）](./docs/03-客户端共存/iOS/iOSstash配置/iOS端stash与cat配置共存.md) / [Stash（Quick）](./docs/03-客户端共存/iOS/iOSstash配置/iOSQuickStash.md) / [Surge](./docs/03-客户端共存/iOS/iOSsurge配置/README.md)
- macOS：
[QX](./docs/03-客户端共存/macOS/macos端QX配置/macos端QX配置.md) / [Shadowrocket](./docs/03-客户端共存/macOS/macos端shadowrocket（小火箭）/shadowrocket.md) / [Surge](./docs/03-客户端共存/macOS/macos端surge/surge.md)

## 目录结构（已优化）

```text
docs/
  01-微服内代理部署/
  02-局域网代理共享/
  03-客户端共存/
    Android/
    iOS/
    macOS/
    cross-platform/
```

## 说明

- 本次结构优化仅调整目录与文档链接，未修改教程中的配置代码内容。
- iOS 端与原 VPN 可能冲突，建议优先使用 cat 的 `Proxy` 模式并按教程配置绕过路由。
