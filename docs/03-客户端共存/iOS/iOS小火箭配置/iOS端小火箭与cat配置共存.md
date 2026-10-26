# iOS 小火箭（Shadowrocket）与懒猫微服共存配置

本教程通过懒猫微服客户端的 **Proxy 模式**与小火箭的**本地 Socks5 节点**配合，让小火箭开启时仍可通过浏览器访问微服应用。

## 一、配置懒猫微服客户端

打开 **懒猫微服客户端**，登录成功后依次操作：

1. 进入 **我的 → 微服管理 → 网络模式**，选择 **Proxy** 模式。
2. 进入 **我的 → 右上角设置齿轮 → 客户端保活**，开启 **定位保活**。
3. **从后台完全关闭懒猫微服客户端，再重新打开**，使网络模式生效。

> 定位保活可能增加耗电。完成配置后，请保持懒猫微服客户端在后台运行。

## 二、配置小火箭

### 1. 设置全局路由并添加本地节点

打开 **小火箭（Shadowrocket）**，将首页的 **全局路由** 设为 **配置**。

点击首页右上角的 **＋**，按下表新增一个本地节点：

| 设置项 | 填写内容 |
| --- | --- |
| 类型 | `Socks5` |
| 地址 | `127.0.0.1` |
| 端口 | `31086` |
| 用户 / 密码 | 留空 |
| 备注 | `lazycat` |

填写后，点击右上角的 **保存**。后续规则中的策略需要选择这个 `lazycat` 节点。

<img src="https://lzc-playground-1301583638.cos.ap-chengdu.myqcloud.com/guidelines/395/image-20251124145325418.png?imageSlim" alt="小火箭首页：全局路由选择配置，并新增地址为 127.0.0.1、端口为 31086 的 lazycat 本地 Socks5 节点" width="680" />

### 2. 添加 TUN 旁路路由

点击底部的 **配置**，找到当前使用的配置文件，点击右侧的 **ⓘ**，进入 **通用**。

> 下文以 `default.conf` 为例。如果你使用其他配置文件，请在实际使用的配置中完成相同设置。

找到 **TUN 旁路路由**，保留原有条目，分别新增以下两条：

```text
6.6.6.6/32
2000::6666/128
```

注意：IPv6 地址中的冒号必须使用**英文半角冒号** `:`。

<img src="https://lzc-playground-1301583638.cos.ap-chengdu.myqcloud.com/guidelines/395/image-20251124145752395.png?imageSlim" alt="配置 → default.conf → 通用：在 TUN 旁路路由中追加 6.6.6.6/32 和 2000::6666/128" width="960" />

### 3. 配置跳过代理

在同一 **通用** 页面中找到 **跳过代理**，保留原有条目，新增：

```text
*.lazycat.cloud
```

<img src="https://lzc-playground-1301583638.cos.ap-chengdu.myqcloud.com/guidelines/395/image-20261026110744014.png" alt="通用设置：在跳过代理中追加 *.lazycat.cloud" width="320" />

### 4. 配置总是真实 IP

继续在 **通用** 页面中找到 **总是真实 IP**，保留原有条目，分别新增：

```text
*.heiyu.space
*.lazycat.cloud
```

完成以上三项通用设置后，点击右上角的 **✓** 保存。

<img src="https://lzc-playground-1301583638.cos.ap-chengdu.myqcloud.com/guidelines/395/image-20261026110821664.png" alt="通用设置：在总是真实 IP 中追加 *.heiyu.space 和 *.lazycat.cloud" width="320" />

### 5. 添加域名分流规则

返回 **配置 → default.conf → 规则**，点击右上角的 **＋**，新增一条规则：

| 设置项 | 填写内容 |
| --- | --- |
| 类型 | `DOMAIN-SUFFIX`（域名后缀匹配） |
| 策略 | `lazycat`（第 1 步创建的本地节点） |
| 域名 | `heiyu.space` |

域名请按示例使用**小写**，直接填写 `heiyu.space`，无需添加 `*.` 或 `https://`。填写后点击右上角的 **保存**。

<img src="https://lzc-playground-1301583638.cos.ap-chengdu.myqcloud.com/guidelines/395/image-20251124150222398.png?imageSlim" alt="新增域名分流规则：类型为 DOMAIN-SUFFIX，策略选择 lazycat，域名填写 heiyu.space" width="960" />

## 三、启动并验证共存

1. 返回小火箭首页，确认 **全局路由** 为 **配置**，并已选中刚才修改的配置文件，然后开启连接。
2. 打开懒猫微服客户端，确认可以正常连接微服，再切换到浏览器；让客户端继续在后台运行。
3. 在浏览器中打开自己的微服应用域名，确认可以正常访问。
4. 再访问一个平时需要通过小火箭代理访问的网站，确认原有代理功能也能正常使用。

两类访问均正常，即完成共存配置。下图为小火箭、微服应用页面和外部网站同时使用的示例：

<img src="https://lzc-playground-1301583638.cos.ap-chengdu.myqcloud.com/guidelines/395/9c6650d52c71eab0e9ac9b2e4e1197c1.jpg?imageSlim" alt="共存验证示例：小火箭运行时，浏览器可访问微服应用和外部网站" width="320" />

如果微服应用仍无法访问，可依次核对：

- 懒猫微服客户端是否已切换为 **Proxy** 模式，并在重启后保持后台运行。
- 本地节点是否使用 `Socks5`、`127.0.0.1` 和 `31086`。
- 两条 TUN 旁路路由、跳过代理和总是真实 IP 条目是否都已添加并保存。
- `heiyu.space` 规则是否选择了 `lazycat` 节点，修改的配置文件是否正在使用。
