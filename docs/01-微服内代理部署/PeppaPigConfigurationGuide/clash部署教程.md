# clash部署教程

## 更新日志

[查看更新日志](./clash部署教程-更新日志.md#clash-change-log)

## 1、clash软件

在电脑终端下载clash这个lpk文件

[clash.lpk](./com.lxy.app.clash-v1.20.40.lpk)

![image-20251013175802908](https://lzc-playground-1301583638.cos.ap-chengdu.myqcloud.com/guidelines/395/image-20251013175802908.png?imageSlim)

## 2、安装软件

将下载好的lpk文件拖入懒猫网盘——>双击打开——>安装应用

![image-20251013180050285](https://lzc-playground-1301583638.cos.ap-chengdu.myqcloud.com/guidelines/395/image-20251013180050285.png?imageSlim)

## 3、导入订阅

将订阅连接导入（默认是每24小时会尝试去更新订阅， 本地会有缓存。即使新订阅拉取失败也不影响）
![image.png](https://lzc-playground-1301583638.cos.ap-chengdu.myqcloud.com/guidelines/2/626c33f7-4edb-4fc8-a315-04e917f4ee48.png "image.png")

> ps: 1. 如果拉取订阅拉取成功但是没有节点，可以通过调整（宽松/严格）模式来拉取2. 如果订阅拉取失败，可以通过修改UA来拉取订阅

### 3.1、手动添加节点信息

> ps 目前在实验阶段
> ![image.png](https://lzc-playground-1301583638.cos.ap-chengdu.myqcloud.com/guidelines/2/c55e10a9-b80b-48dd-87c0-472021a7557b.png "image.png")
> ![image.png](https://lzc-playground-1301583638.cos.ap-chengdu.myqcloud.com/guidelines/2/8a1db1ba-4dd9-448e-b554-a2333c892bf3.png "image.png")
> 推荐使用yaml格式直接导入

基本格式为：

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

## 4、进入应用选择节点

**需要手动开tun！！！重启应用每次需要手动起tun**
![image.png](https://lzc-playground-1301583638.cos.ap-chengdu.myqcloud.com/guidelines/2/5a6fd868-0cac-49d7-adc1-2a682d7f66fe.png "image.png")

> 这里分为简单模式和完整模式
> 简单模式：只需要关注代理走的是哪个节点（默认为简单模式）
> 完整模式：可以控制google/YouTube 等网址走不通的节点
> 建议使用默认的简单模式即可，除非是需要精细化控制不同的站点。

![image-20260118225208643](https://lzc-playground-1301583638.cos.ap-chengdu.myqcloud.com/guidelines/395/image-20260118225208643.png)

## 5、测试访问

ssh到微服访问谷歌

![image-20251013181237775](https://lzc-playground-1301583638.cos.ap-chengdu.myqcloud.com/guidelines/395/image-20251013181237775.png?imageSlim)

即时通讯多合一访问YouTube

![image-20251013181402321](https://lzc-playground-1301583638.cos.ap-chengdu.myqcloud.com/guidelines/395/image-20251013181402321.png?imageSlim)

## 6. 自定 添加路由

![image.png](https://lzc-playground-1301583638.cos.ap-chengdu.myqcloud.com/guidelines/2/37a9c47b-1548-4ca8-8b2b-4a65bdbf6458.png "image.png")
可以手动控制某些ip或者域名强制走代理或者直连
