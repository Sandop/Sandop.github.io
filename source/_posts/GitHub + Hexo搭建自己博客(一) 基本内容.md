---
title: 'GitHub + Hexo搭建自己博客(一) 基本内容'
date: 2019-02-18 16:30:36
tags: [hexo,github]
categories: hexo
---

## 一、基本环境

### 1、安装Node.js和配置好Node.js环境

[NodeJs安装（Windows版本）](https://jingyan.baidu.com/article/48b37f8dd141b41a646488bc.html)

### 2、安装Git和配置好Git环境

[Git安装](https://www.liaoxuefeng.com/wiki/0013739516305929606dd18361248578c67b8067c8c017b000)

## 二、Hexo安装

### 1、在自己认为合适的地方创建文件夹，并进入
![01](/assets/images/20190218/01.png)

### 2、安装Hexo，输入`npm install hexo -g`,并检查是否安装成功`hexo -v`
![02](/assets/images/20190218/02.png)

### 3、初始化文件，输入`hexo init`
![03](/assets/images/20190218/03.png)

### 4、安装所需组件，输入`npm install`
![04](/assets/images/20190218/04.png)

### 5、生成静态文件，输入`hexo g` 或者 `hexo generate`
![05](/assets/images/20190218/05.png)

### 6、启动本地服务，输入`hexo s` 或者 `hexo server`
![06](/assets/images/20190218/06.png)

若页面一直无法跳转，那么可能端口被占用了。此时我们`ctrl+c`停止服务器，接着输入`hexo server -p 端口号`来改变端口号，例如`hexo server -p 5000`

### 7、若能看见如下图就成功啦
![07](/assets/images/20190218/07.png)


## 三、创建GitHub仓库

### 1、创建项目
![08](/assets/images/20190218/08.png)

> **注意：**项目必须要遵守格式：账户名.github.io

### 2、查看项目

在新建项目的`setting`设置中，可以看到`GitHub Pages`板块，如下图说明创建成功，点击`https://账户名.github.io/`可以看到自己的博客
![09](/assets/images/20190218/09.png)
![10](/assets/images/20190218/10.png)
![11](/assets/images/20190218/11.png)

## 四、关联博客
### 1、设置Git的user name和email

如果是第一次使用Git需要在Git Base Here 中分别输入`git config --global user.name "用户名"` 及 `git config --global user.name "邮箱"`
![12](/assets/images/20190218/12.png)

### 2、创建SSH Key

在用户主目录下，看看有没有.ssh目录，如果有，再看看这个目录下有没有id_rsa和id_rsa.pub这两个文件，如果已经有了，可直接跳到下一步。

也可以输入`cd ~/.ssh`检查是否有.ssh文件夹，输入`ls`，列出该文件下的内容。下图说明存在
![13](/assets/images/20190218/13.png)

如果没有，打开Git Bash，创建SSH Key：

> `ssh-keygen -t rsa -C "youremail@example.com"`

你需要把邮件地址换成你自己的邮件地址，然后一路回车，使用默认值即可，由于这个Key也不是用于军事目的，所以也无需设置密码。

如果一切顺利的话，可以在用户主目录里找到.ssh目录，里面有id_rsa和id_rsa.pub两个文件，这两个就是SSH Key的秘钥对，id_rsa是私钥，不能泄露出去，id_rsa.pub是公钥，可以放心地告诉任何人。

### 3、添加SSH Key

(1).登陆GitHub，打开“settings”，“SSH and GPG Keys”页面
![14](/assets/images/20190218/14.png)
(2).填上任意Title，在Key文本框里粘贴id_rsa.pub文件的内容
(3).点“Add Key”，你就应该看到已经添加的Key
(4).输入`ssh -T git@github.com`，测试添加ssh是否成功。如果看到Hi后面是你的用户名，就说明成功了
![15](/assets/images/20190218/15.png)

### 4、配置Deployment

在博客的根目录文件夹中，找到_config.yml文件
```
deploy:
  type: git
  repository: git@github.com:Sandop/Sandop.github.io.git
  branch: master

```
> **注意：** 1.每个冒号之后必须有空格；2.repository中的用户名更改为自己的用户名

### 5、安装扩展

在生成以及部署文章之前，需要安装一个扩展`npm install hexo-deployer-git --save`
![16](/assets/images/20190218/16.png)

### 6、生成部署

输入命令`hexo g`及`hexo d`

![17](/assets/images/20190218/17.png)
![18](/assets/images/20190218/18.png)

### 7、部署成功
部署成功后访问你的地址：http://用户名.github.io。那么将看到自己的博客

## 五、设置主题

在 Hexo 中有两份主要的配置文件，其名称都是 _config.yml。 其中，一份位于**站点根目录**下，主要包含 Hexo 本身的配置；另一份位于**主题目录**下，这份配置由主题作者提供，主要用于配置主题相关的选项。

为了描述方便，在以下说明中，将前者称为 **站点配置文件**， 后者称为 **主题配置文件**。

> PS：需要特别注意的地方是，冒号后面必须有一个空格，否则可能会出问题。

### 1、安装 NexT主题

在终端窗口下，定位到 Hexo 站点目录下。使用 Git checkout 代码：

`git clone https://github.com/iissnan/hexo-theme-next themes/next`

![19](/assets/images/20190218/19.png)

### 2、启用主题

当 克隆/下载 完成后，打开 站点配置文件， 找到 theme 字段，并将其值更改为 next。
![20](/assets/images/20190218/20.png)

### 3、查看效果
在切换主题之后、验证之前， 我们最好使用 `hexo clean` 来清除 Hexo 的缓存。
![21](/assets/images/20190218/21.png)
然后在本地查看效果
> hexo s -g      //生成静态文件，启动本地服务
![22](/assets/images/20190218/22.png)

### 4、同步博客

在本地浏览没有问题之后就可以同步到博客 执行`hexo d`

### 5、访问我的hexo+github博客

可以访问我的git博客来查看效果： https://sandop.github.io/