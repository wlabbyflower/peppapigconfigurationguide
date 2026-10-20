# iOS Loon 与懒猫微服共存配置

按以下顺序操作：**配置 Loon → 添加本地节点、策略组和规则 → 最后切换懒猫微服客户端的 Proxy 模式并重启客户端**。

## 一、配置 Loon

### 1. 打开高级配置

打开 **Loon**，点击底部的 **配置 → 高级配置**。

接下来依次设置 **IP Stack**、**绕过路由**和**代理模式**。

<p>
  <img src="https://pic1.imgdb.cn/item/6936bc4a2a4ee13cb951c8cf.png" alt="Loon 配置页面：高级配置入口" width="320" />
  <img src="https://pic1.imgdb.cn/item/6936bc4a2a4ee13cb951c8cd.png" alt="Loon 高级配置页面：IP Stack 和绕过路由入口" width="320" />
</p>

### 2. 设置 IP Stack

进入 **IP Stack**，按下表设置：

| 设置项 | 选择 |
| --- | --- |
| IP 查询模式 | `IPv4 & IPv6` |
| TUN IPV6 配置 | **开启** |

<img src="https://pic1.imgdb.cn/item/6936bc4a2a4ee13cb951c8ce.png" alt="IP Stack：选择 IPv4 & IPv6，并开启 TUN IPV6" width="320" />

### 3. 添加绕过路由

返回 **高级配置 → 绕过路由**，保留原有内容，在末尾用英文逗号追加以下两项：

```text
6.6.6.6/32,2000::6666/128
```

填写后，点击右上角的 **完成** 保存。

<img src="https://pic1.imgdb.cn/item/6936bc4a2a4ee13cb951c8cc.png" alt="绕过路由：在原有内容末尾追加 6.6.6.6/32 和 2000::6666/128" width="640" />

### 4. 设置 Loon 代理模式

返回 **高级配置**，向下找到 **代理模式**，选择 **TUN Only**。

<img src="https://pic1.imgdb.cn/item/6936bc4a2a4ee13cb951c8d0.png" alt="Loon 高级配置：代理模式设为 TUN Only" width="320" />

### 5. 添加两个本地节点

在 Loon 中新增以下两个**本地节点**，分别填写并保存：

| 设置项 | Socks5 节点 | HTTP 节点 |
| --- | --- | --- |
| 别名 | `懒猫 socks` | `懒猫 http` |
| 网络协议 | `Socks5` | `HTTP` |
| 地址 | `127.0.0.1` | `127.0.0.1` |
| 端口 | `31086` | `31085` |
| 用户名 / 密码 | 留空 | 留空 |
| 其他设置 | Over-TLS 关闭 | IP Mode 选择 `IPv4 & IPv6` |

<p>
  <img src="https://pic1.imgdb.cn/i/034UCnIFrghSC7b4EYVGw5.jpg" alt="本地 Socks5 节点：127.0.0.1，端口 31086，Over-TLS 关闭" width="320" />
  <img src="https://pic1.imgdb.cn/i/034UCnIDcaOpCtMBQTj0lu.jpg" alt="本地 HTTP 节点：127.0.0.1，端口 31085，IP Mode 为 IPv4 & IPv6" width="320" />
</p>

### 6. 创建策略组

点击 Loon 底部的 **策略**，新增一个策略组，按下表填写：

| 设置项 | 填写内容 |
| --- | --- |
| 别名 | `懒猫微服` |
| 策略类型 | `url-test` |
| Test-URL | `http://www.gstatic.com/generate_204` |
| 添加节点 | `懒猫 socks`、`懒猫 http` |

添加两个节点后，点击右上角的 **✓** 保存。

> 策略组名称可以自定义，后续规则中的「策略」需选择同一个策略组。

<img src="https://pic1.imgdb.cn/i/034UCq4gzeQoBu415GaB08.jpg" alt="懒猫微服策略组：url-test 类型，包含懒猫 socks 和懒猫 http 两个节点" width="320" />

### 7. 添加本地规则

进入 Loon 底部的 **配置 → 规则**，新增一条**本地规则**：

| 设置项 | 填写内容 |
| --- | --- |
| 类型 | `DOMAIN-SUFFIX`（域名后缀匹配） |
| 策略 | `懒猫微服`（上一步创建的策略组） |
| 域名后缀 | `heiyu.space` |

填写后，点击右上角的 **✓** 保存。匹配 `heiyu.space` 的流量将交由该策略组处理。

<img src="https://pic1.imgdb.cn/i/034UCtkc6Mqn8mYw2rqnGT.jpg" alt="本地规则：DOMAIN-SUFFIX 匹配 heiyu.space，策略选择懒猫微服" width="320" />

---

## 二、最后开启懒猫微服客户端的 Proxy 模式

**完成以上全部 Loon 配置后，再操作懒猫微服客户端。**

1. 打开 **懒猫微服客户端**，进入 **微服管理 → 网络模式**。
2. 将网络模式从 **VPN** 切换为 **Proxy**。截图中的端口为 `http:31085`、`socks:31086`，与前面创建的两个本地节点对应。
3. **从后台完全关闭懒猫微服客户端，再重新打开**，使网络模式生效。

<img src="https://pic1.imgdb.cn/item/6936bc4a2a4ee13cb951c8d1.png" alt="懒猫微服网络模式：选择 Proxy，HTTP 端口 31085，Socks 端口 31086；修改后需重启客户端" width="320" />

完成后，保持 **Loon 开启**，尝试从懒猫微服客户端外部打开微服应用，确认可以正常访问。
