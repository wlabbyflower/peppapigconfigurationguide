## iOS端stash与cat配置共存

## cat的app侧的配置



打开懒猫微服客户端登陆成功后

1. 在“我的”——微服管理——网络模式——选择proxy模式
2. 点击“我点”——右上角设置齿轮——客户端保活——定位保活（可能会有些耗电）
3. 配置完成之后把整个客户端从后台拉掉

## stash端配置

#### 1、创建副本配置文件

<img src="https://lzc-playground-1301583638.cos.ap-chengdu.myqcloud.com/guidelines/395/image-20251124151825093.png?imageSlim" alt="image-20251124151825093" style="zoom:50%;" /> 

#### 2、新增本地代理

可视化编辑器——本地代理——新增一个

名字：lazycat

代理类型：socks5

服务器地址：127.0.0.1

端口：31086

![image-20251124152005346](https://lzc-playground-1301583638.cos.ap-chengdu.myqcloud.com/guidelines/395/image-20251124152005346.png?imageSlim)

#### 3、新增规则

可视化编辑器——规则——新增一个

类型：DOMAIN-SUFFIX

内容：heiyu.space   （注意大小写）

分流规则：选择上一条配置的本地代理节点

![image-20251124152315132](https://lzc-playground-1301583638.cos.ap-chengdu.myqcloud.com/guidelines/395/image-20251124152315132.png?imageSlim)

#### 4、跳过路由

设置——网络设置——跳过路由——新增：6.6.6.6/32   2000::6666/128

![image-20251221143441923](https://lzc-playground-1301583638.cos.ap-chengdu.myqcloud.com/guidelines/395/image-20251221143441923.png?imageSlim)

#### 5、验证

![e7ad1f687417c80817443d23ea982908](https://lzc-playground-1301583638.cos.ap-chengdu.myqcloud.com/guidelines/395/e7ad1f687417c80817443d23ea982908.jpg?imageSlim)

