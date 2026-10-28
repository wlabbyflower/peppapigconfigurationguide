# 客户端共存

目标：第三方代理客户端与懒猫微服客户端同时开启时，既能正常科学上网，也能通过浏览器或微服客户端访问微服应用。

如果你只是「开了代理后打不开微服」，直接按下面的通用参数检查，再进入对应客户端教程。

## 通用参数

| 项目 | 值 |
| --- | --- |
| 微服客户端网络模式 | **Proxy**（切换后从后台彻底关闭并重开客户端） |
| 本地 SOCKS5 | `127.0.0.1:31086` |
| 本地 HTTP | `127.0.0.1:31085` |
| 微服相关域名 | `*.heiyu.space`、`*.lazycat.cloud`、`*.lazycatmicroserver.com` |
| 需要旁路的地址 | `6.6.6.6/32`、`2000::6666/128` |
| IPv6 | 开启 |

> 端口以微服客户端「网络模式」页面显示为准。不同版本的客户端界面可能略有差异，但原理一致。

## 配置思路

1. **微服客户端切到 Proxy 模式**：在「我的 → 微服管理 → 网络模式」选择 Proxy，并从后台彻底关闭后重开客户端。
2. **代理客户端添加本地节点**：SOCKS5 指向 `127.0.0.1:31086`，或 HTTP 指向 `127.0.0.1:31085`。
3. **添加分流 / 旁路规则**：微服域名走本地微服节点或直连，`6.6.6.6/32` 和 `2000::6666/128` 绕过代理，并开启 IPv6。
4. **验证**：保持代理客户端开启，确认既能访问外网，也能通过浏览器打开微服应用。

支持「覆写脚本 / 模块」的客户端（ClashMi、FlClash、Stash、Surge）建议优先使用覆写方式，后续更新订阅不会覆盖共存配置。

## Android

| 客户端 | 配置方式 | 入口 |
| --- | --- | --- |
| NekoBox（猫箱） | 参考视频 | [NekoBox](./Android/NekoBox/README.md) |
| ClashMi | 覆写脚本（推荐） | [ClashMi](./cross-platform/ClashMi/README.md) |
| FlClash | 覆写脚本 | [FlClash](./cross-platform/FlClash/README.md) |

## iOS

| 客户端 | 配置方式 | 入口 |
| --- | --- | --- |
| Shadowrocket（小火箭） | 本地节点 + 规则 + 旁路路由 | [Shadowrocket](./iOS/Shadowrocket/README.md) |
| Loon | 本地节点 + 策略组 + 规则 | [Loon](./iOS/Loon/README.md) |
| Quantumult X | 本地节点 + 分流 + 兼容性增强 | [Quantumult X](./iOS/QuantumultX/README.md) |
| Stash | 覆写配置（推荐）或手动配置 | [Stash](./iOS/Stash/README.md) |
| Surge | 懒人配置（推荐）或模块配置 | [Surge](./iOS/Surge/README.md) |
| ClashMi | 覆写脚本（iOS 1.0.24.1006+） | [ClashMi](./cross-platform/ClashMi/README.md) |

## macOS

| 客户端 | 配置方式 | 入口 |
| --- | --- | --- |
| Shadowrocket | 修改默认配置文件 | [Shadowrocket](./macOS/Shadowrocket/README.md) |
| Surge | 导入模块 | [Surge](./macOS/Surge/README.md) |
| Quantumult X | 规则分流 + 兼容性增强 | [Quantumult X](./macOS/QuantumultX/README.md) |
| ClashMi | 覆写脚本 | [ClashMi](./cross-platform/ClashMi/README.md) |
| FlClash | 覆写脚本 | [FlClash](./cross-platform/FlClash/README.md) |

## Windows / 跨平台

| 客户端 | 适用平台 | 入口 |
| --- | --- | --- |
| Clash Verge | Windows（Clash for Windows 同理） | [Clash Verge](./cross-platform/ClashVerge/README.md) |
| ClashMi | Windows / macOS / Linux / Android / iOS | [ClashMi](./cross-platform/ClashMi/README.md) |
| FlClash | Windows / macOS / Android | [FlClash](./cross-platform/FlClash/README.md) |
| Hiddify | 跨平台 | [Hiddify](./cross-platform/Hiddify/README.md) |
| sing-box | 跨平台（示例适用于 1.12.0） | [sing-box](./cross-platform/sing-box/README.md) |
| v2rayN / v2rayA | Windows / Linux / 微服 | [v2ray 系列](./cross-platform/v2ray/README.md) |

## 排错速查

| 现象 | 优先检查 |
| --- | --- |
| 能上外网，但浏览器打不开微服 | 是否切到 Proxy 模式；端口是否为 31085 / 31086；是否为微服域名配置本地节点 / 直连规则；是否旁路 `6.6.6.6/32`、`2000::6666/128`；是否开启 IPv6 |
| 微服能上网，但其他 App 不走代理 | 代理客户端是否已开启 TUN / 增强模式；是否选中了正确配置 |
| 微服域名解析失败 / 没有 AAAA 记录 | 代理软件是否伪造了 IPv6；尝试关闭增强模式或按教程配置 |
| 更新订阅后共存规则消失 | 改用覆写脚本或模块，不要直接修改订阅配置 |
| Clash 重启后代理失效 | 重新手动开启 TUN |
| iOS 客户端切后台后断连 | 开启定位保活，并允许客户端后台运行 |
| 本地端口连不上 | 在微服客户端「网络模式」确认端口；切换模式后彻底重开客户端 |
| macOS Surge 增强模式导致无法访问微服 | 参考 [macOS Surge 教程](./macOS/Surge/README.md) 的 IPv6 与模块配置 |

---

返回：[文档索引](../README.md) · [项目首页](../../README.md)
