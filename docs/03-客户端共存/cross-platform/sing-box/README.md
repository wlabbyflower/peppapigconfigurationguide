# sing-box 与懒猫微服共存（JSON）

> 返回：[客户端共存总览](../../README.md) · [文档索引](../../../README.md)

本文适用于 sing-box `1.12.0` 的 JSON 配置文件，完整示例见 [singbox-example.json](./singbox-example.json)。

## 配置步骤

1、在 route 的 rules 添加这个字段

```json
{
  "rule_set": "lazy_cat",
  "action": "route",
  "outbound": "lazycat-socks"
},
```

![image-20250805115441138](https://lzc-playground-1301583638.cos.ap-chengdu.myqcloud.com/guidelines/395/image-20250805115441138.png?imageSlim) 

2、在route的rule_set添加这个字段

```json
   {
    "tag": "lazy_cat",
    "type": "inline",
     "rules": [
        {
         "domain_suffix": [
           ".heiyu.space",
           ".lazycat.cloud",
           ".lazycatmicroserver.com"
            ]
          }
        ]
      },
```

![image-20250805120146431](https://lzc-playground-1301583638.cos.ap-chengdu.myqcloud.com/guidelines/395/image-20250805120146431.png?imageSlim) 

3、在outbounds的outbounds添加这个字段

```json
   {
      "type": "socks",
      "tag": "lazycat-socks",
      "server": "127.0.0.1",
      "server_port": 31086,
      "version": "5",
      "network": "tcp",
      "udp_over_tcp": false
    },
```

![image-20250805120321962](https://lzc-playground-1301583638.cos.ap-chengdu.myqcloud.com/guidelines/395/image-20250805120321962.png?imageSlim)

---

返回：[客户端共存总览](../../README.md) · [文档索引](../../../README.md)