####  Windows

在Windows操作系统上如果下载其他的代理软件，可能会导致能正常访问Google，但是用浏览器打不开微服

<img src="https://lzc-playground-1301583638.cos.ap-chengdu.myqcloud.com/guidelines/395/202506171600774.png" alt="image-20250308114051081" style="zoom: 50%;" />

这个时候需要配置代理的默认配置文件

以Clash为例：

点击订阅——>找到相关代理——>右击——>编辑文件

![image-20250401171345119](https://lzc-playground-1301583638.cos.ap-chengdu.myqcloud.com/guidelines/395/202506171600722.png)

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

![image-20250401171620007](https://lzc-playground-1301583638.cos.ap-chengdu.myqcloud.com/guidelines/395/202506171600589.png)

**TUN**

![image-20250529180723017](https://lzc-playground-1301583638.cos.ap-chengdu.myqcloud.com/guidelines/395/202506171600833.png)

Clash for Windows 配置是一样的，但是Clash for Windows需要在主页勾选**IPv6**选项

![image-20250611155728660](https://lzc-playground-1301583638.cos.ap-chengdu.myqcloud.com/guidelines/395/202506171600877.png)

修改完成之后，重启一下代理开关

这时候就正常访问Google和浏览器打开微服

![image-20250308120206695](https://lzc-playground-1301583638.cos.ap-chengdu.myqcloud.com/guidelines/395/202506171600760.png)

注意！！！这个自动更新会定时向代理节点去拉取配置，取代修改的配置，这个自动更新可以点击关闭或者延长自动更新分钟

![image-20250401171801648](https://lzc-playground-1301583638.cos.ap-chengdu.myqcloud.com/guidelines/395/202506171600239.png)