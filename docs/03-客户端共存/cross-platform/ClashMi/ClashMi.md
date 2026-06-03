# 使用ClashMi的共存方案



Clash内核的程序都可以按照这个思路配置，脚本是通用的

开始配置前先确认ClashMi和微服客户端都可以独立正常工作



[TOC]

# 一、Windows/Mac/Linux

这里以Windows为例，MAC/Linux是相同操作。

配置流程：点击下方“核心设置” > “覆写” > 右上角点击后添加覆写链接 > 粘贴下方脚本 > 类型选择JS > 点击添加的脚本编辑配置 > “追加-覆写”改为“内置-覆写” > 选中该脚本变成默认脚本

添加覆写脚本：

打开ClashMi

![](https://lzc-playground-1301583638.cos.ap-chengdu.myqcloud.com/guidelines/1369/clashmi1.png)

覆写使用的URL：

```URL
https://raw.githubusercontent.com/wlabbyflower/peppapigconfigurationguide/refs/heads/main/docs/03-%E5%AE%A2%E6%88%B7%E7%AB%AF%E5%85%B1%E5%AD%98/cross-platform/ClashMi/clashmi_script.js
```

覆写订阅：

![](https://lzc-playground-1301583638.cos.ap-chengdu.myqcloud.com/guidelines/1369/%E6%96%B0%E5%BB%BA%E9%A1%B9%E7%9B%AE.png)

然后确认IPV6处于启用状态 > 打开代理，正常使用

![](https://lzc-playground-1301583638.cos.ap-chengdu.myqcloud.com/guidelines/1369/%E5%90%AF%E7%94%A8.png)

可以随时更新订阅，不会影响脚本配置，配置一次可以一直使用。

# 二、安卓



关闭微服客户端VPN模式

配置流程：切换微服客户端网络模式为Proxy模式 > 添加覆写脚本 > VPN绕过微服客户端

我的页面-网络模式 > 选择Proxy模式 > 重启客户端（杀掉后台）

<img src="https://lzc-playground-1301583638.cos.ap-chengdu.myqcloud.com/guidelines/1369/20260601163212705.png"/>



添加覆写脚本

- 打开ClashMI

- 配置流程：点击下方“核心设置” > “覆写” > 右上角点击后添加覆写链接 > 粘贴下方脚本 > 类型选择JS > 点击添加的脚本编辑配置 > “追加-覆写”改为“内置-覆写” > 选中该脚本变成默认脚本

  这里安卓端与其他设备相同，可按相同操作进行配置。

![](https://lzc-playground-1301583638.cos.ap-chengdu.myqcloud.com/guidelines/1369/clashmi1.png)

```URL
https://raw.githubusercontent.com/wlabbyflower/peppapigconfigurationguide/refs/heads/main/docs/03-%E5%AE%A2%E6%88%B7%E7%AB%AF%E5%85%B1%E5%AD%98/cross-platform/ClashMi/clashmi_script.js
```



VPN绕过微服客户端

配置流程：点击下方“核心设置” > “分应用代理” > 打开“启用”开关 > 勾选懒猫微服

![](https://lzc-playground-1301583638.cos.ap-chengdu.myqcloud.com/guidelines/1369/%E5%AE%89%E5%8D%93%E9%85%8D%E7%BD%AE1.png)



配置文件覆写

配置流程：点击下方“配置” > 选择您订阅 点击右侧的“三个点” > 编辑配置 > 核心覆写改为lzc > 配置完成后点右上角保存

![](https://lzc-playground-1301583638.cos.ap-chengdu.myqcloud.com/guidelines/1369/aaa.png)



启用IPV6和修改代理策略

配置流程：核心设置 > IPV6改为启用后返回 > 开启连接 > 配置代理 > 选择懒猫微服策略 > 选择懒猫微服 Http

![](https://lzc-playground-1301583638.cos.ap-chengdu.myqcloud.com/guidelines/1369/321.png)

后续可以随时更新订阅，不会影响脚本配置，配置一次可以一直使用。

# 三、IOS

关闭微服客户端VPN模式

clashmi版本大于1.0.24.1006

配置流程：切换微服客户端网络模式为Proxy模式 > 添加覆写脚本 > VPN绕过微服客户端

我的页面-网络模式 > 选择Proxy模式 > 重启客户端（杀掉后台）

![](https://lzc-playground-1301583638.cos.ap-chengdu.myqcloud.com/guidelines/1369/ios1.png)

添加覆写脚本

- 打开ClashMI

- 配置流程：点击下方“核心设置” > “覆写” > 右上角点击后添加覆写链接 > 粘贴下方脚本 > 类型选择JS > 点击添加的脚本编辑配置 > “追加-覆写”改为“内置-覆写” > 选中该脚本变成默认脚本

  这里IOS端与其他设备相同，可按相同操作进行配置。

![](https://lzc-playground-1301583638.cos.ap-chengdu.myqcloud.com/guidelines/1369/clashmi1.png)

```
https://raw.githubusercontent.com/wlabbyflower/peppapigconfigurationguide/refs/heads/main/docs/03-%E5%AE%A2%E6%88%B7%E7%AB%AF%E5%85%B1%E5%AD%98/cross-platform/ClashMi/clashmi_script.js
```



启用IPV6和配置TUN

配置流程：核心设置 > IPV6设置为启用 > 点击TUN > 按照图3开关状态进行配置

![](https://lzc-playground-1301583638.cos.ap-chengdu.myqcloud.com/guidelines/1369/tun%E9%85%8D%E7%BD%AE.png)



配置文件覆写

配置流程：点击下方“配置” > 选择您订阅 点击右侧的“三个点” > 编辑配置 > 核心覆写改为lzc > 配置完成后点右上角保存

![](https://lzc-playground-1301583638.cos.ap-chengdu.myqcloud.com/guidelines/1369/aaa.png)

修改代理策略

配置流程：开启代理 > 点击进入代理配置 > 进入懒猫微服策略组 > 选择懒猫微服Http

![](https://lzc-playground-1301583638.cos.ap-chengdu.myqcloud.com/guidelines/1369/ios3.png)

配置完成后可以自行选择节点，不影响更新订阅。

## 结束

可以测试浏览器和微服中是否能打开应用，客户端与微服连接是否直连

配置后需要为微服客户端配置后台留存：https://developer.lazycat.cloud/network.html#optimize-proxy-mode

 
