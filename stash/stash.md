# stash

stash的配置，先按照一下内容编辑一下配置文件

```yml
#在dns模块处加上
always-real-ip:
    - "*.heiyu.space"
    - "*.lazycat.cloud"
#在rules模块处加上
- 'DOMAIN-SUFFIX,heiyu.space,DIRECT'
- 'DOMAIN-SUFFIX,lazycat.cloud,DIRECT'



#在dns模块上加上
tun:
  route-exclude-address:
    - 6.6.6.6/32
    - 2000::6666/128
#在rules模块处加上
- 'DOMAIN-SUFFIX,*.lazycat.cloud,DIRECT'
- 'DOMAIN-SUFFIX,*.lazycatmicroserver.com,DIRECT'
```

![03aeb10332fb9b916c4db860140061ff](https://lzc-playground-1301583638.cos.ap-chengdu.myqcloud.com/guidelines/395/202506171602559.png)

![9ddd0b1a9ef190342dfd785ca6efa8bf](https://lzc-playground-1301583638.cos.ap-chengdu.myqcloud.com/guidelines/395/202506171602619.png)

## 注意重点！！！

然后在stash设置——>网络设置——>跳过路由——>新增
6.6.6.6/32
2000::6666/128