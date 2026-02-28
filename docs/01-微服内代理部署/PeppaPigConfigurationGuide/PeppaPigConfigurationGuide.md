# 小猪佩奇配置指南


## 1、小猪佩奇软件

新版本可以设置开启应用自动连接代理：启动器页面右击查看应用详情 -> 环境变量 -> v2raya -> 添加配置 V2RAYA_AUTOSTART=true
使用这个版本需要注意：(⚠️⚠️⚠️建议有这个需求，并且懂得基本网络配置的用户使用)
> ⚠️⚠️⚠️若您有此需求。请务必先打开ssh且网络配置测试没有问题后再通过应用详情修改本参数。本软件会接管系统内部、外部网络，如果开启后，出现网络问题可能导致系统和ssh都无法访问。

> ⚠️⚠️⚠️若您有此需求。请务必先打开ssh且网络配置测试没有问题后再通过应用详情修改本参数。本软件会接管系统内部、外部网络，如果开启后，出现网络问题可能导致系统和ssh都无法访问。

> ⚠️⚠️⚠️若您有此需求。请务必先打开ssh且网络配置测试没有问题后再通过应用详情修改本参数。本软件会接管系统内部、外部网络，如果开启后，出现网络问题可能导致系统和ssh都无法访问。

![config.png](https://lzc-playground-1301583638.cos.ap-chengdu.myqcloud.com/guidelines/439/080ca6e8-fe71-43f3-bb1e-c6914d13693e.png)

在电脑终端下载小猪佩奇这个lpk文件

[PeppaPig.lpk](./PeppaPig.lpk)

![image-20250304170425630](https://lzc-playground-1301583638.cos.ap-chengdu.myqcloud.com/guidelines/395/20250305222154109.png?imageSlim)

## 2、安装软件

将下载好的lpk文件拖入懒猫网盘——>双击打开——>安装应用

![image-20250304162456293](https://lzc-playground-1301583638.cos.ap-chengdu.myqcloud.com/guidelines/395/20250305222154110.png?imageSlim)

## 3、注册登录

点击微服终端上的应用——>打开小猪佩奇创建一个用户名和密码（记住自己的用户名和密码以便下次登陆！！！）

![image-20250304152232040](https://lzc-playground-1301583638.cos.ap-chengdu.myqcloud.com/guidelines/395/20250305222154111.png?imageSlim)

## 4、导入代理

点击导入，导入代理的URL连接

![image-20250304152338844](https://lzc-playground-1301583638.cos.ap-chengdu.myqcloud.com/guidelines/395/20250305222154112.png?imageSlim)

## 5、导入后的配置

导入成功后设置一下代理方式，点击右上角“设置”——>**透明代理/系统代理实现方式**选择“tproxy“——>保存并应用

![image-20250304152949679](https://lzc-playground-1301583638.cos.ap-chengdu.myqcloud.com/guidelines/395/20250305222154113.png?imageSlim)

## 6、开始使用

选择一个节点点击连接——>点击左上角就绪——>左上角显示”正在运行“表明代理成功开启

![image-20250304153147025](https://lzc-playground-1301583638.cos.ap-chengdu.myqcloud.com/guidelines/395/20250305222154114.png?imageSlim)

成功开启后勾选节点可以测试延迟

![image-20250304153504263](https://lzc-playground-1301583638.cos.ap-chengdu.myqcloud.com/guidelines/395/20250305222154115.png?imageSlim)

## 7、验证代理服务

懒猫智慧屏可以打开YouTube

<img src="https://lzc-playground-1301583638.cos.ap-chengdu.myqcloud.com/guidelines/395/20250305222154116.png?imageSlim" alt="image-20250304160949850" style="zoom: 25%;" />    

打开YouTube就能正常访问了

![image-20250304161236738](https://lzc-playground-1301583638.cos.ap-chengdu.myqcloud.com/guidelines/395/20250305222154117.png?imageSlim)

通过开发者工具ssh进入 lzc-os 也可以正常访问Google

![image-20250304160710628](https://lzc-playground-1301583638.cos.ap-chengdu.myqcloud.com/guidelines/395/20250305222154118.png?imageSlim)

## 9、自己的代理软件和微服网络冲突解决方案:

#### macOS

在macOS操作系统上如果下载其他的代理软件，可能会导致能正常访问Google，但是用浏览器打不开微服

<img src="https://lzc-playground-1301583638.cos.ap-chengdu.myqcloud.com/guidelines/395/20250307172935201.png?imageSlim" alt="image-20250307172935125" style="zoom: 50%;" />

这个时候需要配置代理的默认配置文件

以shadowrocket为例：

点击配置——>右击default.conf——>点击编辑纯文本

<img src="https://lzc-playground-1301583638.cos.ap-chengdu.myqcloud.com/guidelines/395/20250307173215698.png?imageSlim" alt="image-20250307173215649" style="zoom:67%;" /> 

这是默认配置

<img src="https://lzc-playground-1301583638.cos.ap-chengdu.myqcloud.com/guidelines/395/20250307173409681.png?imageSlim" alt="image-20250307173409610" style="zoom:67%;" /> 

配置以下内容,添加完成后点击保存

```bash
在[General]下
skip-proxy后面加",*.heiyu.space, *.lazycat.cloud"(加引号内的内容)
tun-excluded-routes后面加",6.6.6.6/32, 2000::6666/128"(加引号内的内容)
找一个空行加这段"always-real-ip = *.heiyu.space, *.lazycat.cloud"(加引号内的内容)
```

![image-20250325180532623](https://lzc-playground-1301583638.cos.ap-chengdu.myqcloud.com/guidelines/395/20250325180532683.png?imageSlim) 

这时候就正常访问Google和浏览器打开微服

<img src="https://lzc-playground-1301583638.cos.ap-chengdu.myqcloud.com/guidelines/395/20250307175400319.png?imageSlim" alt="image-20250307175400234" style="zoom: 50%;" />

##### 注意！surge增强模式

surge中需要配置的选项有些不同

```
skip-proxy后面加",-*.heiyu.space, -*.lazycat.cloud"(加引号内的内容)
tun-excluded-routes后面加",6.6.6.6/32, 2000::6666/128"(加引号内的内容)
找一个空行加这段"always-real-ip = -*.heiyu.space, -*.lazycat.cloud"(加引号内的内容)
```

####  Windows

在Windows操作系统上如果下载其他的代理软件，可能会导致能正常访问Google，但是用浏览器打不开微服

<img src="https://lzc-playground-1301583638.cos.ap-chengdu.myqcloud.com/guidelines/395/20250308114051160.png?imageSlim" alt="image-20250308114051081" style="zoom: 50%;" />

这个时候需要配置代理的默认配置文件

以Clash为例：

点击订阅——>找到相关代理——>右击——>编辑文件

![image-20250401171345119](https://lzc-playground-1301583638.cos.ap-chengdu.myqcloud.com/guidelines/395/20250401171345218.png?imageSlim)

配置以下内容,添加完成后ctrl+s保存

```yaml
#规则模式
#特别注意！！！因为配置文件是yml格式的，添加时候需要对其格式
#在dns模块处加上
always-real-ip:
    - "*.heiyu.space"
    - "*.lazycat.cloud"
#在rules模块处加上
- 'DOMAIN-SUFFIX,heiyu.space,DIRECT'
- 'DOMAIN-SUFFIX,lazycat.cloud,DIRECT'

#————分—隔—线—规则和TUN二选一配置即可—————#

#TUN
#在dns模块上加上
tun:
  route-exclude-address:
    - 6.6.6.6/32
    - 2000::6666/128
#在rules模块处加上
- 'DOMAIN-SUFFIX,*.lazycat.cloud,DIRECT'
- 'DOMAIN-SUFFIX,*.lazycatmicroserver.com,DIRECT'
```

**规则**

![image-20250401171620007](https://lzc-playground-1301583638.cos.ap-chengdu.myqcloud.com/guidelines/395/20250401171620106.png?imageSlim)

**TUN**

![image-20250529180723017](https://lzc-playground-1301583638.cos.ap-chengdu.myqcloud.com/guidelines/395/20250529180723278.png?imageSlim)

Clash for Windows 配置是一样的，但是Clash for Windows需要在主页勾选**IPv6**选项

![image-20250611155728660](https://lzc-playground-1301583638.cos.ap-chengdu.myqcloud.com/guidelines/395/202506111557767.png)

修改完成之后，重启一下代理开关

这时候就正常访问Google和浏览器打开微服

![image-20250308120206695](https://lzc-playground-1301583638.cos.ap-chengdu.myqcloud.com/guidelines/395/20250308120206766.png?imageSlim)

注意！！！这个自动更新会定时向代理节点去拉取配置，取代修改的配置，这个自动更新可以点击关闭或者延长自动更新分钟

![image-20250401171801648](https://lzc-playground-1301583638.cos.ap-chengdu.myqcloud.com/guidelines/395/20250401171801743.png?imageSlim)

#### 其他代理

其他代理软件参考这个https://developer.lazycat.cloud/network.html#vpn_config

