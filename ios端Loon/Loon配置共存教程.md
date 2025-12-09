## iOS Loon 与懒猫微服共存配置

## 操作步骤

#### 1. 打开 Loon，底部选择 **配置** → **高级配置**
####    需要修改以下三项设置：
- **IP Stack**
- **绕过路由**
- **代理模式**

![配置截图](https://pic1.imgdb.cn/item/6936bc4a2a4ee13cb951c8cf.png) ![配置截图](https://pic1.imgdb.cn/item/6936bc4a2a4ee13cb951c8cd.png)

#### 3. **IP Stack 设置**
- 点击 **IP Stack**
- 更改查询模式为 **IPv4&IPv6**
- **TUN IPV6** 配置为 **开启**

![配置截图](https://pic1.imgdb.cn/item/6936bc4a2a4ee13cb951c8ce.png) ![配置截图](https://pic1.imgdb.cn/item/6936bc4a2a4ee13cb951c8d0.png)

#### 4. **绕过路由设置**
- 返回上一级，选择 **绕过路由**
- 添加以下地址：
- **6.6.6.6/32,2000:6666/128**

![配置截图](https://pic1.imgdb.cn/item/6936bc4a2a4ee13cb951c8cc.png)

#### 5. **懒猫微服设置**
- 保存 Loon 配置后，在懒猫微服中的网络模式中，将 **VPN** 切换为 **Proxy**
- **重启手机客户端即可直连**

![配置截图](https://pic1.imgdb.cn/item/6936bc4a2a4ee13cb951c8d1.png)
