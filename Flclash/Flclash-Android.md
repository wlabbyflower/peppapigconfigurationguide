# 使用Flclash(安卓)的共存方案

配置流程：切换微服客户端网络模式为Proxy模式 > 添加覆写脚本 > VPN绕过微服客户端

Clash内核的程序都可以按照这个思路配置，脚本是通用的，本篇只提供安卓Flclash的配置截图

开始配置前先确认Flclash和微服客户端都可以独立正常工作

## 关闭微服客户端VPN模式

我的页面-网络模式 > 选择Proxy模式 > 重启客户端（杀掉后台）

<img width="576" height="640" alt="o1" src="https://github.com/user-attachments/assets/2dd29dcc-ae43-4349-94ff-589c7a00baa9" />

## 添加覆写脚本

- 打开Flclash

- 点击下方“配置” > 右上角“Σ”符号 > 右下角“+”新建 > 点击“未命名”改为“Lzc” > 粘贴下方脚本 > 保存 > 选中脚本

<img width="884" height="1295" alt="o2" src="https://github.com/user-attachments/assets/049ed1a5-8911-4c08-8da0-097e595f0a02" />

```
// Define main function (script entry)
function main(config) {
    // 确保 `proxy-groups` 存在
    if (!config["proxy-groups"]) {
        config["proxy-groups"] = [];
    }

    // 定义 "Lzc" 策略组
    const LzcGroup = {
        name: "Lzc",
        type: "select",
        icon: "https://developer.lazycat.cloud/manage/assets/logo-BVvfUYI1.png",
        proxies: [
            "DIRECT",
            "Lzc-Node"
        ]
    };

    // 插入 "Lzc" 策略组到末尾
    config["proxy-groups"].push(LzcGroup);

    // 确保 `proxies` 存在
    if (!config["proxies"]) {
        config["proxies"] = [];
    }

    // 定义 "Lzc-Node" 节点
    const LzcNode = {
        name: "Lzc-Node",
        type: "http",
        server: "127.0.0.1",
        port: 31085
    };

    // 插入 "Lzc-Node" 节点
    config["proxies"].push(LzcNode);

    const rule = 'DOMAIN-SUFFIX,heiyu.space,Lzc';
    const rule_ip = 'IP-CIDR,fc03:1136:3800::/40,Lzc';
    const rule_processname1 = 'PROCESS-NAME-REGEX,.*lzc-core.*,DIRECT';
    const rule_processname2 = 'PROCESS-NAME-REGEX,.*懒猫微服.*,DIRECT';
    const rule_apk = 'PROCESS-NAME,cloud.lazycat.client,DIRECT';
    const rule_cloud = 'DOMAIN-SUFFIX,lazycat.cloud,DIRECT';
    const rule_lcms = 'DOMAIN-SUFFIX,lazycatmicroserver.com,DIRECT';

    // 确保 rules 存在
    if (Array.isArray(config.rules)) {
        config.rules.unshift(rule);
        config.rules.unshift(rule_cloud);
        config.rules.unshift(rule_ip);
        config.rules.unshift(rule_processname1);
        config.rules.unshift(rule_processname2);
        config.rules.unshift(rule_apk);
        config.rules.unshift(rule_lcms);
        config.rules.unshift('IP-CIDR,6.6.6.6/32,DIRECT');
        config.rules.unshift('IP-CIDR,2000::6666/128,DIRECT');
    } else {
        config.rules = [
            'IP-CIDR,2000::6666/128,DIRECT',
            'IP-CIDR,6.6.6.6/32,DIRECT',
            rule,
            rule_cloud,
            rule_ip,
            rule_processname1,
            rule_processname2,
            rule_apk,
            rule_lcms
        ];
    }

    // 确保 DNS 配置存在
    if (!config.dns) config.dns = {};
    if (!config.dns['fake-ip-filter']) config.dns['fake-ip-filter'] = [];
    if (!Array.isArray(config.dns['fake-ip-filter'])) config.dns['fake-ip-filter'] = [];

    // heiyu.space 不使用 fake-ip
    config.dns['fake-ip-filter'].push('+.heiyu.space');
    config.dns['fake-ip-filter'].push('+.lazycat.cloud');

    // 确保 `tun` 存在
    if (!config["tun"]) {
        config["tun"] = [];
    }
    if (!config.tun['route-exclude-address']) config.tun['route-exclude-address'] = [];
    //6.6.6.6/32 不走 TUN
    config.tun['route-exclude-address'].push('6.6.6.6/32');
    //2000::6666/128 不走 TUN
    config.tun['route-exclude-address'].push('2000::6666/128');
    //183.136.206.164 不走 TUN
    config.tun['route-exclude-address'].push('183.136.206.164/32');
    
    return config;
}
```

## VPN绕过微服客户端

点击下方“工具” > “访问控制” > 打开“应用访问控制”开关 > 勾选懒猫微服

<img width="591" height="650" alt="o3" src="https://github.com/user-attachments/assets/65bfa029-cf80-4d64-8339-7d79989bc28b" />

## 选择Node

在“代理”功能中，找到“Lzc”组，选中“Lzc-node” > 启动连接

<img width="591" height="650" alt="o4" src="https://github.com/user-attachments/assets/009913fa-c635-4ec4-ad41-fb785d6a3544" />

## 结束

可以测试浏览器和微服中是否能打开应用，客户端与微服连接是否直连

配置后需要为微服客户端配置后台留存：https://developer.lazycat.cloud/network.html#optimize-proxy-mode

<img width="298" height="650" alt="o12" src="https://github.com/user-attachments/assets/7a0d58df-6905-4ec7-85a2-41293488571e" />
