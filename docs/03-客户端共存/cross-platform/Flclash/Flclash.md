# 使用Flclash的共存方案



Clash内核的程序都可以按照这个思路配置，脚本是通用的

开始配置前先确认Flclash和微服客户端都可以独立正常工作

# 一、Windows/Mac

这里以Windows为例，MAC是相同操作。

配置流程：添加覆写脚本 > 覆写订阅 > 正常使用

添加覆写脚本：

打开flclash

![](https://lzc-playground-1301583638.cos.ap-chengdu.myqcloud.com/guidelines/1369/20260602130720586.png)

覆写使用的URL：

```URL
https://raw.githubusercontent.com/wlabbyflower/peppapigconfigurationguide/refs/heads/main/docs/03-%E5%AE%A2%E6%88%B7%E7%AB%AF%E5%85%B1%E5%AD%98/cross-platform/Flclash/flclash_script.js
```

覆写订阅：

![](https://lzc-playground-1301583638.cos.ap-chengdu.myqcloud.com/guidelines/1369/20260601172612444.png)

重启下flclash

然后打开代理，正常使用

![](https://lzc-playground-1301583638.cos.ap-chengdu.myqcloud.com/guidelines/1369/20260601173355305.png)

可以随时更新订阅，不会影响脚本配置，配置一次可以一直使用。

# 二、安卓

## 关闭微服客户端VPN模式

配置流程：切换微服客户端网络模式为Proxy模式 > 添加覆写脚本 > VPN绕过微服客户端

我的页面-网络模式 > 选择Proxy模式 > 重启客户端（杀掉后台）

<img src="https://lzc-playground-1301583638.cos.ap-chengdu.myqcloud.com/guidelines/1369/20260601163212705.png"/>

## 添加覆写脚本

- 打开Flclash

- 点击下方“工具” > 进阶配置(提供多样化配置) > 脚本(覆写脚本) > 右上角“添加” > 粘贴下方脚本 > 保存 > 选中脚本

  这里安卓端与其他设备相同，可按相同操作进行配置。

![](https://lzc-playground-1301583638.cos.ap-chengdu.myqcloud.com/guidelines/1369/20260602130720586.png)

```URL
https://raw.githubusercontent.com/wlabbyflower/peppapigconfigurationguide/refs/heads/main/docs/03-%E5%AE%A2%E6%88%B7%E7%AB%AF%E5%85%B1%E5%AD%98/cross-platform/Flclash/flclash_script.js
```



## VPN绕过微服客户端

点击下方“工具” > “访问控制” > 打开“应用访问控制”开关 > 勾选懒猫微服

<img src="https://lzc-playground-1301583638.cos.ap-chengdu.myqcloud.com/guidelines/1369/20260601164831837.png"/>

## 配置文件覆写

点击下方“配置” > 选择您订阅 点击右侧的“三个点” > 更多 > 覆写 > 覆写模式：脚本 > 选择刚才添加的脚本，配置完成后退出并且杀掉应用。重新进入。

![](https://lzc-playground-1301583638.cos.ap-chengdu.myqcloud.com/guidelines/1369/20260601170116808.png)

## 选择Node

在“代理”功能中，找到“懒猫微服策略”组，选中“任意一个节点” ，接下来就可以去自己的节点进行调整，调整完成后 > 启动连接

![](https://lzc-playground-1301583638.cos.ap-chengdu.myqcloud.com/guidelines/1369/20260601170817248.png)

## 结束

可以测试浏览器和微服中是否能打开应用，客户端与微服连接是否直连

配置后需要为微服客户端配置后台留存：https://developer.lazycat.cloud/network.html#optimize-proxy-mode

 
