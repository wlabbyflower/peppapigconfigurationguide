# surge

```asciiarmor
#前提注意，必看！！！
#配置之前，先把surge代理关掉，访问下面网站，如果没有ipv6，配置之后就不要开启"增强模式"
https://ipw.cn/
#原因：因为微服的域名需要有一个ipv6的地址来做4A解析，但是没有ipv6的环境，surge的增强模式会分配一个假的ipv6，导致微服域名不能解析
```

1、导入配置

注意：Surge在本地网卡没有公共IPv6地址时，会禁用AAAA的DNS查询 访问微服依赖IPv6，会导致无法解析IPv6的地址

打开surge——>点击更多——>点击模块——>选择从url模块——>这是会多一个分类选项——>勾选启用——>应用

导入的url链接：[Lazycat.sgmodule](https://raw.githubusercontent.com/wlabbyflower/peppapigconfigurationguide/refs/heads/main/docs/03-%E5%AE%A2%E6%88%B7%E7%AB%AF%E5%85%B1%E5%AD%98/macOS/macos%E7%AB%AFsurge/Lazycat.sgmodule)

<img src="https://lzc-playground-1301583638.cos.ap-chengdu.myqcloud.com/guidelines/395/202506171621575.png" alt="image-20250617162111468" style="zoom:50%;" /> 

<img src="https://lzc-playground-1301583638.cos.ap-chengdu.myqcloud.com/guidelines/395/202506171622409.png" alt="image-20250617162245336" style="zoom:50%;" /> 



导入完成之后，开关一下增强模式或者代理

<img src="https://lzc-playground-1301583638.cos.ap-chengdu.myqcloud.com/guidelines/395/202506171648180.jpg" alt="90e4d7610e060700fb38ccda5f19e46f" style="zoom:50%;" /> 

这样网络检测是0，也可以正常在浏览器科学上网同时浏览器访问微服应用

<img src="https://lzc-playground-1301583638.cos.ap-chengdu.myqcloud.com/guidelines/395/202506171649112.jpg" alt="d88217c1d2c62a06673f17a2de8af87c" style="zoom: 33%;" /> 

<img src="https://lzc-playground-1301583638.cos.ap-chengdu.myqcloud.com/guidelines/395/202506171649499.jpg" alt="11888298ef44255b80e009cf9d6ab3cb" style="zoom: 33%;" />  
