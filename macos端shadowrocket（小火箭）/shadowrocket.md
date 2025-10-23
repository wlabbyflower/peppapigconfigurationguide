# shadowrocket

#### macOS

在macOS操作系统上如果下载其他的代理软件，可能会导致能正常访问Google，但是用浏览器打不开微服

![image-20250307172935125](https://lzc-playground-1301583638.cos.ap-chengdu.myqcloud.com/guidelines/395/202506171552671.png)

这个时候需要配置代理的默认配置文件

以shadowrocket为例：

点击配置——>右击default.conf——>点击编辑纯文本

![image-20250307173215649](https://lzc-playground-1301583638.cos.ap-chengdu.myqcloud.com/guidelines/395/202506171552639.png) 

这是默认配置

![image-20250307173409610](https://lzc-playground-1301583638.cos.ap-chengdu.myqcloud.com/guidelines/395/202506171552681.png) 

配置以下内容,添加完成后点击保存

```bash
在[General]下
skip-proxy后面加",*.heiyu.space, *.lazycat.cloud"(加引号内的内容)
tun-excluded-routes后面加",6.6.6.6/32, 2000::6666/128"(加引号内的内容)
找一个空行加这段"always-real-ip = *.heiyu.space, *.lazycat.cloud"(加引号内的内容)
```

![image-20250325180532623](https://lzc-playground-1301583638.cos.ap-chengdu.myqcloud.com/guidelines/395/202506171552668.png) 

这时候就正常访问Google和浏览器打开微服

<img src="https://lzc-playground-1301583638.cos.ap-chengdu.myqcloud.com/guidelines/395/202506171552372.png" alt="image-20250617155237294" style="zoom:50%;" /> 