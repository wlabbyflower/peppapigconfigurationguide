# iOS：Stash 手动配置

> 返回：[Stash 方案选择](./README.md) · [客户端共存总览](../../README.md)

适合想保留现有 Stash 配置、只手动添加节点和规则的用户。另一种方式是 [覆写配置](./override.md)。

## 一、配置微服客户端

打开懒猫微服客户端登录成功后

1. 在“我的”——微服管理——网络模式——选择proxy模式
2. 点击“我的”——右上角设置齿轮——客户端保活——定位保活（可能会有些耗电）
3. 配置完成之后把整个客户端从后台拉掉

## 二、配置 Stash

### 1、创建副本配置文件

<img src="https://lzc-playground-1301583638.cos.ap-chengdu.myqcloud.com/guidelines/395/image-20251124151825093.png?imageSlim" alt="image-20251124151825093" style="zoom:50%;" />

### 2、新增本地代理

可视化编辑器——本地代理——新增一个

名字：lazycat

代理类型：socks5

服务器地址：127.0.0.1

端口：31086

![image-20251124152005346](https://lzc-playground-1301583638.cos.ap-chengdu.myqcloud.com/guidelines/395/image-20251124152005346.png?imageSlim)

### 3、新增规则

可视化编辑器——规则——新增一个

类型：DOMAIN-SUFFIX

内容：heiyu.space   （注意大小写）

分流规则：选择上一条配置的本地代理节点

![image-20251124152315132](https://lzc-playground-1301583638.cos.ap-chengdu.myqcloud.com/guidelines/395/image-20251124152315132.png?imageSlim)

### 4、跳过路由

设置——网络设置——跳过路由——新增：6.6.6.6/32   2000::6666/128

![image-20251221143441923](https://lzc-playground-1301583638.cos.ap-chengdu.myqcloud.com/guidelines/395/image-20251221143441923.png?imageSlim)

### 5、验证

![e7ad1f687417c80817443d23ea982908](https://lzc-playground-1301583638.cos.ap-chengdu.myqcloud.com/guidelines/395/e7ad1f687417c80817443d23ea982908.jpg?imageSlim)

---

返回：[Stash 方案选择](./README.md) · [客户端共存总览](../../README.md)

