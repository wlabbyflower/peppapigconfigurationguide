# 2025-12-23 更新

## 懒人配置与模块配置（按需选择，任选其一）

> **推荐使用懒人配置**  
> Surge 模块目前无法复写 Proxy 和 Proxy Group，需要手动配置这两项。

---

## 一、懒人配置

如果你不想搞什么乱七八糟的配置，这是一个开箱即用的教程，只需要更改你的订阅地址，其他的都不用管。

### 步骤 1：设置网络模式

在懒猫微服中设置网络模式为：**Proxy 模式**

![](https://files.mdnice.com/user/158113/98831ba6-454f-4d7a-af68-e721e94eeb4a.png)

### 步骤 2：下载配置文件

打开 Surge 软件，点击如图所示位置：

![](https://files.mdnice.com/user/158113/0ba85c82-40b5-47df-a388-18860691247c.png)

选择 **从 URL 下载配置**：

![](https://files.mdnice.com/user/158113/d55614a6-f421-4d6a-a1a9-728881b2e513.png)

输入以下地址：

```
https://raw.githubusercontent.com/wlabbyflower/peppapigconfigurationguide/refs/heads/main/docs/03-%E5%AE%A2%E6%88%B7%E7%AB%AF%E5%85%B1%E5%AD%98/iOS/iOSsurge%E9%85%8D%E7%BD%AE/Surge.conf
```

### 步骤 3：更新外部资源

会跳转到外部资源页面，点击 **全部更新**。这里会有一个错误提示，先不用管，点击 **完成**。

![](https://files.mdnice.com/user/158113/4f949fad-9d2a-4222-a0ef-56b792223cb9.png)

### 步骤 4：编辑订阅地址

点击 **在文本模式中编辑**：

![](https://files.mdnice.com/user/158113/24c329af-baae-4398-8b10-f4901da072bf.png)

下滑找到 **我的节点**，在 `policy-path=` 后粘贴你的订阅地址：

![](https://files.mdnice.com/user/158113/53921a6b-06e5-41b3-9f66-30d08fb36c40.png)

### 步骤 5：启动 Surge

点击完成，启动 Surge，即可直连懒猫微服，同时可在浏览器中打开应用。

> **注意**：中继升级直连需要一些时间，大概 3-5 秒。

![](https://files.mdnice.com/user/158113/eec256ea-c894-40ee-ba1f-c7a14c051c9a.png)

---

## 二、模块配置

如果你需要使用自己的模板和分流规则，可以通过模块的方式实现同样的效果。

### 步骤 1：安装模块

点击 **修改** → **模块** → **安装新模块**，粘贴以下地址：

```
https://raw.githubusercontent.com/wlabbyflower/peppapigconfigurationguide/refs/heads/main/docs/03-%E5%AE%A2%E6%88%B7%E7%AB%AF%E5%85%B1%E5%AD%98/iOS/iOSsurge%E9%85%8D%E7%BD%AE/Lazycat_ios.sgmodule
```

点击启用这个模块：

![](https://files.mdnice.com/user/158113/7c7bb654-ba3d-4350-a1b9-144eb329f828.png)

### 步骤 2：编辑配置文件

回到首页，点击左上角，然后以 **文本模式编辑**：

![](https://files.mdnice.com/user/158113/61ee15b4-1356-4d09-ae36-7aebddb8c101.png)

### 步骤 3：添加 Proxy 配置

```ini
LazyCat-socks5 = socks5, 127.0.0.1, 31086
LazyCat-http = http, 127.0.0.1, 31085
```

### 步骤 4：添加 Proxy Group 配置

```ini
LC = fallback, LazyCat-socks5, LazyCat-http, url=http://www.gstatic.com/generate_204, interval=300
```

![](https://files.mdnice.com/user/158113/4bc143cf-0496-4cd8-ba2e-f63678a4ce22.png)

### 步骤 5：启动 Surge

完成后启动 Surge，即可实现同样的效果。

---

**配置完成！** 
