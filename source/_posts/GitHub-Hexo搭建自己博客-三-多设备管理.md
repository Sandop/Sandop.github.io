---
title: GitHub + Hexo搭建自己博客(三) 多设备管理
date: 2019-02-21 14:11:49
tags: [hexo,github]
categories: GitHub
---

介绍：正常情况下, 我们博客的相关配置信息都是在本地的, 并未上传服务器, 这样当我们想在其他设备, 比如公司的电脑或者原电脑重装了系统, 那么我们便无法再维护我们的博客了

### 一、环境配置

安装Node.js
安装git
安装hexo

### 二、创建分支

> `hexo`生成的静态博客文件都是上传到GitHub上的, 且默认放在`master`分支上, 而一些相关的配置文件都在本地

> `hexo`的源文件（部署环境文件）可以都放在`hexo`分支上（可以新创建一个hexo分支），换新电脑时，直接`git clone hexo`分支

#### 1、仓库新建hexo分支

在Github的username.github.io仓库上新建一个hexo(分支名字可自定义)分支, 在下图箭头位置输入分支名字,完成创建；
![01](/assets/images/20190221/01.png)

#### 2、设置默认分支

切换到该`hexo分支`，并在`该仓库->Settings->Branches->Default branch`中将默认分支设为`hexo`,然后点击`update`进行保存；
![02](/assets/images/20190221/02.png)

### 三、配置文件上传Github

该步骤需要在博客配置文件和主题配置文件所在的电脑上操作，想了解git相关命令，[请移步这里](https://github.com/Sandop/Git-Command)

#### 1.克隆hexo分支
1.1 在合适位置将上述新建的hexo分支克隆到本地, `git clone git@github.com:Sandop/Sandop.github.io.git`，克隆地址换成自己的地址；
1.2 在终端中cd进入该username.github.io文件目录,`cd username.github.io`；
1.3 在当前目录使用Git Bash执行`git branch`命令查看当前所在分支，应为新建的分支hexo
![03](/assets/images/20190221/03.png)

#### 2.上传部署文件
2.1 先将本地博客的部署文件（Hexo博客项目目录下的全部文件）全部拷贝进`username.github.io`文件目录中去

2.2 准备将所有的文件都提交到hexo分支，提交时考虑以下注意事项：
> 将themes目录以内中的主题的.git目录删除（如果有），因为一个git仓库中不能包含另一个git仓库，否则提交主题文件夹会失败

> 可能有人会问，删除了themes目录中的.git不就不能`git pull`更新主题了吗，很简单，需要更新主题时在另一个地方git clone下来该主题的最新版本，然后将内容拷到当前主题目录即可

2.3 最后用终端或者管理工具将所有文件提交到hexo分支,命令`git add .`、`git commit -m "first commit hexo branch"`（引号内容可改）、`git push`;

![04](/assets/images/20190221/04.png)
![05](/assets/images/20190221/05.png)

2.4 `master`分支和`hexo`分支各自保存着一个版本。`master分支`用于保存博客静态资源，提供博客页面供人访问；`hexo分支`用于备份博客部署文件，供自己维护更新，两者在一个GitHub仓库内也不会有任何冲突

![06](/assets/images/20190221/06.png)
![07](/assets/images/20190221/07.png)

### 四、同步到其他电脑
1. 将新电脑的生成的`ssh key`添加到GitHub账户上

2. 在新电脑上克隆`username.github.io`仓库的`hexo`分支到本地，此时本地git仓库处于hexo分支

3. 切换到`username.github.io`目录，执行`npm install`(由于仓库有一个.gitignore文件，里面默认是忽略掉 node_modules文件夹的，也就是说仓库的hexo分支并没有存储该目录，所以需要install下)

4. 到这里了就可以开始在自己的新电脑上写博客了！

>编辑、撰写文章或其他博客更新改动

>依次执行`git add .`、`git commit -m '***'（引号内容可改）`、`git push`指令，保证xxx分支版本最新

>执行`hexo clean && hexo g && hexo d`指令，完成后就会发现，最新改动已经更新到master分支了，两个分支互不干扰！

5. 每次换电脑更新博客的时候, 在修改之前最好也要`git pull`拉取一下最新的更新