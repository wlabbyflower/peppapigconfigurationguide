# iOS Surge 与懒猫微服共存配置

> 返回：[客户端共存总览](../../README.md) · [文档索引](../../../README.md)

> 配置更新日期：2025-12-23。

先从以下两种方案中**任选一种**完成 Surge 设置，再执行文末的 **Proxy 模式切换与共存验证**。

| 方案 | 适用情况 | 需要操作 |
| --- | --- | --- |
| 一、懒人配置（推荐） | 直接使用本教程提供的完整配置 | 导入配置、填写订阅地址、更新资源 |
| 二、模块配置 | 继续使用自己的配置和分流规则 | 手动添加本地节点和策略组，再安装模块 |

## 一、懒人配置（推荐）

### 1. 下载配置文件

打开 **Surge**，点击首页左上角的**配置名称**，选择 **从 URL 下载配置**。

<p>
  <img src="https://files.mdnice.com/user/158113/0ba85c82-40b5-47df-a388-18860691247c.png" alt="Surge 首页：点击左上角的配置名称，打开配置菜单" width="320" />
  <img src="https://files.mdnice.com/user/158113/d55614a6-f421-4d6a-a1a9-728881b2e513.png" alt="Surge 配置菜单：选择从 URL 下载配置" width="320" />
</p>

粘贴以下地址并下载：

```text
https://raw.githubusercontent.com/wlabbyflower/peppapigconfigurationguide/refs/heads/main/docs/03-%E5%AE%A2%E6%88%B7%E7%AB%AF%E5%85%B1%E5%AD%98/iOS/Surge/Surge.conf
```

### 2. 完成首次资源导入

下载后会进入 **外部资源** 页面，点击 **全部更新**。

此时「✈️ 我的节点」可能提示 **资源不存在**，因为配置中的订阅地址仍是占位文字。可先点击右上角的 **完成**，继续下一步填写订阅地址。

> 这里只暂时跳过「我的节点」因订阅地址未填写产生的错误；其他资源若更新失败，需检查对应链接或网络连接。

<img src="https://files.mdnice.com/user/158113/4f949fad-9d2a-4222-a0ef-56b792223cb9.png" alt="首次导入外部资源：我的节点尚未填写订阅地址，提示资源不存在" width="320" />

### 3. 填写自己的订阅地址

再次打开首页左上角的**配置菜单**，确认已选中刚下载的配置，点击 **在文本模式中编辑**。

<img src="https://files.mdnice.com/user/158113/24c329af-baae-4398-8b10-f4901da072bf.png" alt="选中新下载的 Surge 配置，点击在文本模式中编辑" width="320" />

找到 `[Proxy Group]` 下的 **✈️ 我的节点**，将 `policy-path=` 后面的 `你的订阅地址` 替换为自己的 **Surge 格式订阅链接**，保留这一行的其他参数。

填写后，点击右上角的 **完成** 保存。

<img src="https://files.mdnice.com/user/158113/53921a6b-06e5-41b3-9f66-30d08fb36c40.png" alt="文本编辑器：在我的节点中，将 policy-path 后的占位文字替换为自己的订阅地址" width="320" />

### 4. 重新更新外部资源

返回 **配置菜单 → 外部资源**，再次点击 **全部更新**。

确认「✈️ 我的节点」和规则资源更新成功后，点击 **完成**。接下来直接执行文末的 **第三部分**。

---

## 二、模块配置（保留现有配置）

本教程的模块提供共存所需的网络设置和规则，两个本地节点及 `LC` 策略组需要手动添加。**先创建节点和策略组，再启用模块**，使模块中的规则能够找到对应策略。

### 1. 打开现有配置的文本编辑器

在 Surge 首页点击左上角的**配置名称**，选中自己正在使用的配置，点击 **在文本模式中编辑**。

<img src="https://files.mdnice.com/user/158113/61ee15b4-1356-4d09-ae36-7aebddb8c101.png" alt="Surge 配置菜单：在文本模式中编辑现有配置" width="320" />

### 2. 添加两个本地节点

找到 `[Proxy]` 分区，在其中添加以下两行：

```ini
LazyCat-Socks5 = socks5, 127.0.0.1, 31086
LazyCat-HTTP = http, 127.0.0.1, 31085
```

| 节点名称 | 协议 | 地址 | 端口 |
| --- | --- | --- | --- |
| `LazyCat-Socks5` | `socks5` | `127.0.0.1` | `31086` |
| `LazyCat-HTTP` | `http` | `127.0.0.1` | `31085` |

### 3. 添加 LC 策略组

找到 `[Proxy Group]` 分区，在其中添加以下一行：

```ini
LC = fallback, LazyCat-Socks5, LazyCat-HTTP, url=http://www.gstatic.com/generate_204, interval=300
```

> 如果配置中没有对应分区，再新增 `[Proxy]` 或 `[Proxy Group]` 标题；已有分区时直接追加内容，并保留原有节点和策略组。节点名称需与策略组中的引用一致，`LC` 名称需与模块中的规则保持一致。

两个分区填写完成后，点击右上角的 **完成** 保存。

<img src="https://files.mdnice.com/user/158113/4bc143cf-0496-4cd8-ba2e-f63678a4ce22.png" alt="文本配置示例：在 Proxy 分区添加两个本地节点，在 Proxy Group 分区添加 LC 策略组" width="480" />

### 4. 安装并启用模块

返回首页，进入 **修改 → 模块 → 安装新模块**，粘贴以下地址：

```text
https://raw.githubusercontent.com/wlabbyflower/peppapigconfigurationguide/refs/heads/main/docs/03-%E5%AE%A2%E6%88%B7%E7%AB%AF%E5%85%B1%E5%AD%98/iOS/Surge/Lazycat_ios.sgmodule
```

安装后，勾选 **Lazycat直连与共存**，确认模块左侧出现 **✓**，再点击右上角的 **完成** 保存。

<img src="https://files.mdnice.com/user/158113/7c7bb654-ba3d-4350-a1b9-144eb329f828.png" alt="Surge 模块页面：勾选启用 Lazycat直连与共存模块" width="320" />

---

## 三、最后切换 Proxy 模式并验证共存

**无论选择哪一种方案，完成 Surge 配置后，都需要执行以下操作。**

### 1. 启动 Surge

返回 Surge 首页，确认选中了刚才配置的文件，再启动 Surge。

### 2. 切换懒猫微服客户端的网络模式

打开 **懒猫微服客户端**，进入 **微服管理 → 网络模式**，将 **VPN** 切换为 **Proxy**。

截图中的端口为 `http:31085`、`socks:31086`，与前面配置的两个本地节点对应。

**切换后，从后台完全关闭懒猫微服客户端，再重新打开，使网络模式生效。**

<img src="https://files.mdnice.com/user/158113/98831ba6-454f-4d7a-af68-e721e94eeb4a.png" alt="懒猫微服网络模式：选择 Proxy，HTTP 端口 31085，Socks 端口 31086；修改后需重启客户端" width="320" />

### 3. 验证共存访问

保持 **Surge 开启**，确认懒猫微服客户端可以正常连接，再尝试通过浏览器打开微服应用。

> 从中继升级为直连可先等待约 3–5 秒，实际以连接状态为准。

以下为懒猫微服客户端与浏览器同时运行的多任务界面示例：

<img src="https://files.mdnice.com/user/158113/eec256ea-c894-40ee-ba1f-c7a14c051c9a.png" alt="iOS 多任务界面：懒猫微服客户端与浏览器同时运行" width="320" />

---

返回：[客户端共存总览](../../README.md) · [文档索引](../../../README.md)
