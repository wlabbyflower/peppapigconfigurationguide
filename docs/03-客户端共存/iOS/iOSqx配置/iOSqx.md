## cat的app侧的配置

打开懒猫微服客户端登陆成功后

1. 在“我的”——微服管理——网络模式——选择proxy模式

2. 点击“我点”——右上角设置齿轮——客户端保活——定位保活（可能会有些耗电）
3. 配置完成之后把整个客户端从后台拉掉

## qx端配置

1、编辑配置文件

<img src="https://lzc-playground-1301583638.cos.ap-chengdu.myqcloud.com/guidelines/395/image-20251117191627595.png?imageSlim" alt="image-20251117191627595" style="zoom:50%;" /> 

2、找到`[server local]`

```yaml
socks5和http,任选其一（优先socks5）,或者都写
[server local]
socks5=127.0.0.1:31086,fast-open=false,udp-relay=false,tag=lazycat
http=127.0.0.1:31085,fast-open=false,udp-relay=false,tag=lazycat
```

<img src="https://lzc-playground-1301583638.cos.ap-chengdu.myqcloud.com/guidelines/395/050058e031a63ca35359a1c449bbf1b8.jpg?imageSlim" alt="050058e031a63ca35359a1c449bbf1b8" style="zoom:50%;" /> 

同时注意下面的dns部分，不要有no-ipv6的配置

<img src="https://pic1.imgdb.cn/item/69479b2f2bbc57ce91120276.png"  style="zoom:50%;" /> 

3、找到 `[policy]`

```
[policyl
static=lc,lazycat,img-url=https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/Proxy.png
```

<img src="https://lzc-playground-1301583638.cos.ap-chengdu.myqcloud.com/guidelines/395/5bdd873afb5d354158cc7aca71d69632.jpg?imageSlim" alt="5bdd873afb5d354158cc7aca71d69632" style="zoom:50%;" /> 

4、以上配置完成之后点有右上角√保存

5、点击顶部“分流”——再点+号

<img src="https://lzc-playground-1301583638.cos.ap-chengdu.myqcloud.com/guidelines/395/image-20251117192612079.png?imageSlim" alt="image-20251117192612079" style="zoom:50%;" /> 

6、新增一个分流规则

```bash
类型：HOST-SUFFIX
参数：heiyu.space
策略：lc
```

<img src="https://pic1.imgdb.cn/item/69479edd2bbc57ce91120adf.png" style="zoom:50%;" /> 

7.点击右下角小风车，下滑找到其他设置，找到VPN，打开兼容性增强

<img src="https://pic1.imgdb.cn/item/69479e4b2bbc57ce91120986.png" style="zoom:50%;" /> 

8、配置完成之后保存

9、点击右下角风车，运行模式选择规则分流

 <img src="https://lzc-playground-1301583638.cos.ap-chengdu.myqcloud.com/guidelines/395/image-20251117193039424.png?imageSlim" alt="image-20251117193039424" style="zoom:50%;" /> 

10、验证

能运行cat的同时，还能科学上网

<img src="https://lzc-playground-1301583638.cos.ap-chengdu.myqcloud.com/guidelines/395/5d053ac11e5f074eb98f0fb2c91f33fd.jpg?imageSlim" alt="5d053ac11e5f074eb98f0fb2c91f33fd" style="zoom:50%;" /> 
