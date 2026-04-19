# Clash 部署教程

## 更新日志

[查看更新日志](./clash部署教程-更新日志.md#clash-change-log)

## 1、下载 Clash 应用

请先在电脑终端下载 Clash 的 `lpk` 安装包。

[clash.lpk](./com.lxy.app.clash-v1.21.1.lpk)

![image-20251013175802908](https://lzc-playground-1301583638.cos.ap-chengdu.myqcloud.com/guidelines/395/image-20251013175802908.png?imageSlim)

## 2、安装软件

将下载好的 `lpk` 文件拖入懒猫网盘，双击打开后按提示安装应用。

![image-20251013180050285](https://lzc-playground-1301583638.cos.ap-chengdu.myqcloud.com/guidelines/395/image-20251013180050285.png?imageSlim)

## 3、导入订阅

将订阅链接导入应用。默认每 24 小时会尝试更新一次订阅，本地会保留缓存；即使新订阅拉取失败，也不会影响当前已缓存配置的使用。

![image.png](https://lzc-playground-1301583638.cos.ap-chengdu.myqcloud.com/guidelines/2/626c33f7-4edb-4fc8-a315-04e917f4ee48.png "image.png")

> 说明：
>
> 1. 如果订阅拉取成功但没有节点，可以切换“宽松/严格”模式后重新拉取。
> 2. 如果订阅拉取失败，可以尝试修改 `UA` 后再次拉取。

### 3.1、手动添加节点信息

> 当前功能仍处于实验阶段。

除了导入订阅链接，也可以手动添加节点信息。

![image.png](https://lzc-playground-1301583638.cos.ap-chengdu.myqcloud.com/guidelines/2/c55e10a9-b80b-48dd-87c0-472021a7557b.png "image.png")
![image.png](https://lzc-playground-1301583638.cos.ap-chengdu.myqcloud.com/guidelines/2/8a1db1ba-4dd9-448e-b554-a2333c892bf3.png "image.png")

> 建议优先使用 YAML 格式直接导入。

参考格式如下：

```yaml
name: "xxx"
type: xxx
server: xxx
port: xxx
uuid: xxx
alterId: 0
cipher: auto
udp: true
tls: false
skip-cert-verify: false
servername: ""
network: tcp
ws-opts: null
h2-opts: null
http-opts: null
grpc-opts: null
```

## 4、进入应用并选择节点

**注意：需要手动开启 TUN。每次重启应用后，都需要重新开启 TUN。**

![image.png](https://lzc-playground-1301583638.cos.ap-chengdu.myqcloud.com/guidelines/2/5a6fd868-0cac-49d7-adc1-2a682d7f66fe.png "image.png")

> 模式说明：
>
> 1. 简单模式：只需要关注当前代理使用的是哪个节点，默认即为该模式。
> 2. 完整模式：可以为 Google、YouTube 等不同网站分别指定节点。
> 3. 如无精细化控制需求，建议直接使用默认的简单模式。

![image-20260118225208643](https://lzc-playground-1301583638.cos.ap-chengdu.myqcloud.com/guidelines/395/image-20260118225208643.png)

## 5、测试访问

可以通过以下方式验证代理是否生效。

### 5.1、SSH 到微服访问 Google

![image-20251013181237775](https://lzc-playground-1301583638.cos.ap-chengdu.myqcloud.com/guidelines/395/image-20251013181237775.png?imageSlim)

### 5.2、在即时通讯多合一中访问 YouTube

![image-20251013181402321](https://lzc-playground-1301583638.cos.ap-chengdu.myqcloud.com/guidelines/395/image-20251013181402321.png?imageSlim)

## 6、自定义添加路由

![image.png](https://lzc-playground-1301583638.cos.ap-chengdu.myqcloud.com/guidelines/2/37a9c47b-1548-4ca8-8b2b-4a65bdbf6458.png "image.png")

可以手动控制某些 IP 或域名，强制走代理或直连。
