# iOS端stash与cat配置共存

## cat的app侧的配置

打开懒猫微服客户端登陆成功后

1. 在“我的”——微服管理——网络模式——选择proxy模式
2. 点击“我点”——右上角设置齿轮——客户端保活——定位保活（可能会有些耗电）
3. 配置完成之后把整个客户端从后台拉掉

## Stash端配置

### 导入覆写配置

覆写文件地址：https://raw.githubusercontent.com/wlabbyflower/peppapigconfigurationguide/refs/heads/main/iOSstash%E9%85%8D%E7%BD%AE/lzc.stash

点击“覆写”卡片 > 点击“+”添加 > 输入覆写文件地址 > 点击“下载” > 下滑安装

<img width="1184" height="872" alt="o1" src="https://github.com/user-attachments/assets/aa5d1398-ee04-415d-9f44-17c529d2a14c" />  

### 启用IPv6/跳过路由

点击下方“设置” > 点击“网络设置” > 启用Tunnel IPv6路由 > 跳过路由

新增：6.6.6.6/32   2000::6666/128  移除：fc00::/7

<img width="1184" height="872" alt="o2" src="https://github.com/user-attachments/assets/b45fb188-ff73-4d5b-9011-8bab109ca030" />

### 启动，选择Lzc-Node

<img width="791" height="872" alt="o3" src="https://github.com/user-attachments/assets/a86e8c9c-4058-4247-a073-9cac6f1b6b21" />

## 验证

![e7ad1f687417c80817443d23ea982908](https://lzc-playground-1301583638.cos.ap-chengdu.myqcloud.com/guidelines/395/e7ad1f687417c80817443d23ea982908.jpg?imageSlim)
