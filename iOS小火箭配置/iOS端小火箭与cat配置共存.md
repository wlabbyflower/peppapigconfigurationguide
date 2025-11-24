## iOS端小火箭与cat配置共存

## cat的app侧的配置



打开懒猫微服客户端登陆成功后

1. 在“我的”——微服管理——网络模式——选择proxy模式
2. 点击“我点”——右上角设置齿轮——客户端保活——定位保活（可能会有些耗电）
3. 配置完成之后把整个客户端从后台拉掉

## 小火箭端配置

#### 1、新增本地节点

全局路由：选择配置

在首页点击右上角加号新增节点

类型：socks5

地址：127.0.0.1

端口：31086

备注：lazycat

<img src="https://lzc-playground-1301583638.cos.ap-chengdu.myqcloud.com/guidelines/395/image-20251124145325418.png?imageSlim" alt="image-20251124145325418" style="zoom:50%;" /> 

### 2、配置tun旁路路由

点击配置——default.conf——通用——找到”TUN旁路路由“

新增两条

```bash
6.6.6.6/32
2000::6666/128
#特别注意，英文冒号
```

![image-20251124145752395](https://lzc-playground-1301583638.cos.ap-chengdu.myqcloud.com/guidelines/395/image-20251124145752395.png?imageSlim)

#### 3、配置规则

点击配置——default.conf——规则

新增规则

类型：DOMAIN-SUFFIX

策略：选择第一步配置的lazycat

域名：heiyu.space   (注意一定是小写)

![image-20251124150222398](https://lzc-playground-1301583638.cos.ap-chengdu.myqcloud.com/guidelines/395/image-20251124150222398.png?imageSlim)

#### 4、验证

![9c6650d52c71eab0e9ac9b2e4e1197c1](https://lzc-playground-1301583638.cos.ap-chengdu.myqcloud.com/guidelines/395/9c6650d52c71eab0e9ac9b2e4e1197c1.jpg?imageSlim)