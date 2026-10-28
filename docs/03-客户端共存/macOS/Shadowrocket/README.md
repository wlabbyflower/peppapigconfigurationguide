# macOS：Shadowrocket 与懒猫微服共存

> 返回：[客户端共存总览](../../README.md) · [文档索引](../../../README.md)

在 macOS 上同时使用 Shadowrocket 和懒猫微服客户端时，如果出现「能访问 Google，但浏览器打不开微服」的情况，需要修改 Shadowrocket 的默认配置文件。

## 配置步骤

以 shadowrocket 为例：

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

---

返回：[客户端共存总览](../../README.md) · [文档索引](../../../README.md)