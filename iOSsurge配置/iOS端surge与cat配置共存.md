## iOS端surge与cat配置共存

## cat的app侧的配置



打开懒猫微服客户端登陆成功后

1. 在“我的”——微服管理——网络模式——选择proxy模式
2. 点击“我点”——右上角设置齿轮——客户端保活——定位保活（可能会有些耗电）
3. 配置完成之后把整个客户端从后台拉掉

## surge端配置

#### 1、创建副本配置文件

<img src="https://lzc-playground-1301583638.cos.ap-chengdu.myqcloud.com/guidelines/395/image-20251124134451222.png?imageSlim" alt="image-20251124134451222" style="zoom:33%;" /> 

#### 2、配置策略组

点击策略组，找到一个不常用的策略，长按进行编辑策略

名称可以自定义（这里命令为lazycat）代理类型选择socks5  服务器地址 127.0.0.1  端口号31086

<img src="https://lzc-playground-1301583638.cos.ap-chengdu.myqcloud.com/guidelines/395/image-20251124135634341.png?imageSlim" alt="image-20251124135634341" style="zoom: 50%;" /> 

#### 3、配置规则

回到首页——出战模式选择规则模式——点击代理规则——新增规则

规则类型：DOMAIN-SUFFIX

内容：heiyu.space          (注意大小写)

扩展匹配：开启

策略：选择上一步创建的策略

![](https://lzc-playground-1301583638.cos.ap-chengdu.myqcloud.com/guidelines/395/image-20251124140131759.png?imageSlim)

#### 5、验证

![image-20251124140534687](https://lzc-playground-1301583638.cos.ap-chengdu.myqcloud.com/guidelines/395/image-20251124140534687.png?imageSlim)
