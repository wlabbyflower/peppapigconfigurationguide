# 文档索引

> [返回项目首页](../README.md)

本目录集中存放懒猫微服代理相关文档。建议按「部署 → 共享 → 共存」的顺序阅读；如果只想解决客户端冲突，可以直接跳到 [03 客户端共存](#03-客户端共存)。

## 阅读路径

1. **部署**：在微服内部运行代理 → [01 微服内代理部署](#01-微服内代理部署)
2. **共享**：让局域网内其他设备复用代理 → [02 局域网代理共享](#02-局域网代理共享)
3. **共存**：让第三方代理客户端与微服客户端同时工作 → [03 客户端共存](#03-客户端共存)

## 01 微服内代理部署

两种方案**二选一**，不要同时启用。

| 方案 | 说明 | 入口 |
| --- | --- | --- |
| PeppaPig（v2rayA） | 图形化界面，支持导入代理 URL、透明代理 / 系统代理 | [PeppaPig 教程](./01-微服内代理部署/PeppaPig/README.md) |
| Clash | 支持订阅导入、TUN、自定义路由、链式代理 | [Clash 教程](./01-微服内代理部署/Clash/README.md) |
| — | Clash 历史版本更新记录 | [CHANGELOG](./01-微服内代理部署/Clash/CHANGELOG.md) |

> 开启「自动连接」或让应用接管系统网络前，请先确认 SSH 可用、网络配置已测试通过，避免配置失误后无法远程恢复。

## 02 局域网代理共享

| 教程 | 说明 | 入口 |
| --- | --- | --- |
| 构建内网代理 | 开启端口分享、配置端口转发，让同 LAN 设备通过微服代理上网 | [局域网代理共享](./02-局域网代理共享/README.md) |

## 03 客户端共存

目标：第三方代理客户端与懒猫微服客户端同时开启时，既能正常访问外网，也能通过浏览器 / 客户端访问微服应用。

### 开始之前：通用参数

| 项目 | 值 |
| --- | --- |
| 微服客户端网络模式 | **Proxy**（切换后从后台彻底关闭并重开客户端） |
| 本地 SOCKS5 | `127.0.0.1:31086` |
| 本地 HTTP | `127.0.0.1:31085` |
| 微服相关域名 | `*.heiyu.space`、`*.lazycat.cloud`、`*.lazycatmicroserver.com` |
| 需要旁路的地址 | `6.6.6.6/32`、`2000::6666/128` |
| IPv6 | 开启 |

> 端口以微服客户端「网络模式」页面显示为准。不同客户端的详细写法见下方教程。

### Android

| 客户端 | 配置方式 | 入口 |
| --- | --- | --- |
| NekoBox（猫箱） | 参考视频 | [NekoBox](./03-客户端共存/Android/NekoBox/README.md) |
| ClashMi | 覆写脚本（推荐） | [ClashMi](./03-客户端共存/cross-platform/ClashMi/README.md) |
| FlClash | 覆写脚本 | [FlClash](./03-客户端共存/cross-platform/FlClash/README.md) |

### iOS

| 客户端 | 配置方式 | 入口 |
| --- | --- | --- |
| Shadowrocket（小火箭） | 本地节点 + 规则 + 旁路路由 | [Shadowrocket](./03-客户端共存/iOS/Shadowrocket/README.md) |
| Loon | 本地节点 + 策略组 + 规则 | [Loon](./03-客户端共存/iOS/Loon/README.md) |
| Quantumult X | 本地节点 + 分流 + 兼容性增强 | [Quantumult X](./03-客户端共存/iOS/QuantumultX/README.md) |
| Stash | 覆写配置（推荐）或手动配置 | [Stash](./03-客户端共存/iOS/Stash/README.md) |
| Surge | 懒人配置（推荐）或模块配置 | [Surge](./03-客户端共存/iOS/Surge/README.md) |
| ClashMi | 覆写脚本（iOS 1.0.24.1006+） | [ClashMi](./03-客户端共存/cross-platform/ClashMi/README.md) |

### macOS

| 客户端 | 配置方式 | 入口 |
| --- | --- | --- |
| Shadowrocket | 修改默认配置文件 | [Shadowrocket](./03-客户端共存/macOS/Shadowrocket/README.md) |
| Surge | 导入模块 | [Surge](./03-客户端共存/macOS/Surge/README.md) |
| Quantumult X | 规则分流 + 兼容性增强 | [Quantumult X](./03-客户端共存/macOS/QuantumultX/README.md) |
| ClashMi | 覆写脚本 | [ClashMi](./03-客户端共存/cross-platform/ClashMi/README.md) |
| FlClash | 覆写脚本 | [FlClash](./03-客户端共存/cross-platform/FlClash/README.md) |

### 跨平台

| 客户端 | 适用平台 | 入口 |
| --- | --- | --- |
| Clash Verge | Windows（Clash for Windows 同理） | [Clash Verge](./03-客户端共存/cross-platform/ClashVerge/README.md) |
| ClashMi | Windows / macOS / Linux / Android / iOS | [ClashMi](./03-客户端共存/cross-platform/ClashMi/README.md) |
| FlClash | Windows / macOS / Android | [FlClash](./03-客户端共存/cross-platform/FlClash/README.md) |
| Hiddify | 跨平台 | [Hiddify](./03-客户端共存/cross-platform/Hiddify/README.md) |
| sing-box | 跨平台（示例适用于 1.12.0） | [sing-box](./03-客户端共存/cross-platform/sing-box/README.md) |
| v2rayN / v2rayA | Windows / Linux / 微服 | [v2ray 系列](./03-客户端共存/cross-platform/v2ray/README.md) |

### 排错速查

| 现象 | 优先检查 |
| --- | --- |
| 能上外网，但浏览器打不开微服 | 是否切到 Proxy 模式；端口是否为 31085 / 31086；是否为微服域名配置本地节点 / 直连规则；是否旁路 `6.6.6.6/32`、`2000::6666/128`；是否开启 IPv6 |
| 微服能上网，但其他 App 不走代理 | 代理客户端是否已开启 TUN / 增强模式；是否选中了正确配置 |
| 微服域名解析失败 / 没有 AAAA 记录 | 代理软件是否伪造了 IPv6；尝试关闭增强模式或按教程配置 |
| 更新订阅后共存规则消失 | 改用覆写脚本或模块，不要直接改订阅配置 |
| Clash 重启后代理失效 | 重新手动开启 TUN |
| iOS 客户端切后台后断连 | 开启定位保活，并允许客户端后台运行 |
| 本地端口连不上 | 在微服客户端「网络模式」确认端口；切换模式后彻底重开客户端 |
| macOS Surge 增强模式导致无法访问微服 | 参考 [macOS Surge 教程](./03-客户端共存/macOS/Surge/README.md) 的 IPv6 与模块配置 |

## 资源文件

以下文件由教程直接引用，通常需要复制原始链接到客户端中导入：

| 文件 | 用途 | 位置 |
| --- | --- | --- |
| `PeppaPig.lpk` | PeppaPig 安装包 | [01-微服内代理部署/PeppaPig](./01-微服内代理部署/PeppaPig/PeppaPig.lpk) |
| `clashmi.js` | ClashMi 覆写脚本 | [cross-platform/ClashMi](./03-客户端共存/cross-platform/ClashMi/clashmi.js) |
| `flclash.js` | FlClash 覆写脚本 | [cross-platform/FlClash](./03-客户端共存/cross-platform/FlClash/flclash.js) |
| `lzc.stash` | Stash 覆写配置 | [iOS/Stash](./03-客户端共存/iOS/Stash/lzc.stash) |
| `Surge.conf` | iOS Surge 完整配置 | [iOS/Surge](./03-客户端共存/iOS/Surge/Surge.conf) |
| `Lazycat_ios.sgmodule` | iOS Surge 共存模块 | [iOS/Surge](./03-客户端共存/iOS/Surge/Lazycat_ios.sgmodule) |
| `Lazycat.sgmodule` | macOS Surge 共存模块 | [macOS/Surge](./03-客户端共存/macOS/Surge/Lazycat.sgmodule) |
| `singbox-example.json` | sing-box 配置示例 | [cross-platform/sing-box](./03-客户端共存/cross-platform/sing-box/singbox-example.json) |

> 教程中的导入地址使用 `raw.githubusercontent.com` 原始链接。如果你 Fork 了本仓库，请将链接中的用户名和分支替换成自己的。

## 文档约定

- 每个客户端一个目录，教程统一命名为 `README.md`。
- 客户端需要导入的脚本、配置、模块与教程放在同一目录。
- 新增平台时，在 `docs/03-客户端共存/<平台>/` 下创建客户端目录，并同步更新本索引和根 README。
- 视频等大文件使用 Git LFS 存储。
