---
title: Windows上搭建Flutter开发环境
date: 2019-09-06 10:12:55
tags: [Flutter]
categories: Flutter
---

介绍：在搭建Flutter开发环境时候遇到了很多的坑，在这里特此记录！！必须得会科学上网！！！

[Flutter官网](https://flutterchina.club/)

### 一、系统要求

 1.操作系统：必须Windows 7 或更高版本 (64-bit)
 2.磁盘空间: 官方说的是400 MB (不包括Android Studio的磁盘空间)，但是需要安装Android Studio 和 虚拟机，所以至少要3个G左右
 3.Git for Windows (Git命令行工具) [Git安装及教程](https://www.liaoxuefeng.com/wiki/896043488029600)

### 二、JAVA环境安装

  1.[JAVA环境下载地址](https://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html)

`https://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html`

 2.[安装教程](https://blog.csdn.net/zhys0902/article/details/79499329)

`https://blog.csdn.net/zhys0902/article/details/79499329`

按照这篇文章安装就可以了，安装完成记得配置环境变量

### 三、Flutter SDK安装

1. 使用镜像
Flutter官方为中国开发者搭建了临时镜像，大家可以将如下环境变量加入到用户环境变量中：
` PUB_HOSTED_URL=https://pub.flutter-io.cn
  FLUTTER_STORAGE_BASE_URL=https://storage.flutter-io.cn`
![03](/assets/images/20190906/03.png)
![04](/assets/images/20190906/04.png)


注意： 此镜像为临时镜像，并不能保证一直可用，读者可以参考详情请参考 Using Flutter in China 以获得有关镜像服务器的最新动态。

2.Flutter SDK下载

[下载地址](https://flutter.dev/docs/development/tools/sdk/releases#windows)

`https://flutter.dev/docs/development/tools/sdk/releases#windows`

3.把下载好的Flutter SDK随便解压到你想安装的目录，如（D:\software\run\flluttersdk\flutter）
![01](/assets/images/20190906/01.png)

4.Flutter SDK安装目录的bin目录配置到环境变量

把D:\software\run\flluttersdk\flutter\bin目录配置到path环境变量里面

![02](/assets/images/20190906/02.png)

5.git bash输入flutter -v检测是否安装成功

![05](/assets/images/20190906/05.png)

### 四、Android Studio安装

之前的安装都很顺利，但是Android Studio的安装真的是难受！！！！

这个的安装很费时间，安装需要耐心，而且谷歌被墙的厉害，需要科学上网！！！

1.Android Studio下载

[下载地址](https://developer.android.com/studio/index.html)

`https://developer.android.com/studio/index.html`

2.Android Studio安装

[安装详细教程](https://www.cnblogs.com/xiadewang/p/7820377.html)

`https://www.cnblogs.com/xiadewang/p/7820377.html`

执行“Android Studio安装向导”，这将安装最新的Android SDK，Android SDK平台工具和Android SDK构建工具

3.打开Android Stuido 软件，然后找到Plugin的配置，搜索Flutter插件。 

4.Android SDK安装出现问题

我在安装过程中出现如下问题，这个问题困扰我很久，翻墙也不成功
![06](/assets/images/20190906/06.jpg)
单独的安装Android SDK，运行也是有问题，但是我在家里自己电脑上很快就完成了全部安装，最后找到原因是公司的网络自己又加了一层墙，所以老是报这个错误！！

5.解决办法

公司使用的是台式机，所有买了一个wifi发射器，装上之后连接自己手机，使用手机流量进行下载安装，成功！！！！

### 五、检测开发环境

1.输入`flutter doctor`

会出现如下所示
![09](/assets/images/20190906/09.jpg)

2.输入 `flutter doctor --android-licenses`,一律选择Y
![08](/assets/images/20190906/08.jpg)

3.输入`flutter doctor`
![07](/assets/images/20190906/07.jpg)

至此，开发环境搭建好了

### 六、Android Stuido创建项目

1.打开软件，如下
![07](/assets/images/20190906/07.png)

2.选择如下
![08](/assets/images/20190906/08.png)

3.如flutter SDK没有选择需要手动选择
![09](/assets/images/20190906/09.png)

4.点击下一步，进行创建，这一步时间比较长
![10](/assets/images/20190906/10.png)

5.创建完成之后，得重新导入，Fill>Open File or Project,如下所示
![11](/assets/images/20190906/11.png)

6.导入之后会下载暗转一些文件，这个过程会比较长，耐心等待，如若失败操作Fill>Sync project with Gradle Files重新安装

![12](/assets/images/20190906/12.png)
![13](/assets/images/20190906/13.png)

7.成功之后运行Run>Run App如下运行
![14](/assets/images/20190906/14.png)

8.这一步之后，若没有安装虚拟机、模拟器或者连接真机，会出现如下
![15](/assets/images/20190906/15.png)

真机测试：
手机调试成开发者模式，使用数据线连接手机，就可以在手机上预览
虚拟机测试
在菜单Tool>AVD Manager选项中，创建虚拟机
模拟器测试
我这里使用的是模拟器开发，Android Studio太卡，后面使用VSCode开发，所以使用模拟器，这里我使用的是夜神模拟器

![16](/assets/images/20190906/16.png)
![17](/assets/images/20190906/17.png)


### 七、VS Code开发

1.导入刚才创建的项目，在终端输入`flutter run`，出现`No connected devices`,表示没有设备连接
![18](/assets/images/20190906/18.png)

2.我们也可使在这里开发者模式连接真机进行开发测试

3.我们使用夜神模拟器来开发，夜神模拟器安装目录的bin目录下，终端输入：nox_adb.exe connect 127.0.0.1:62001
![19](/assets/images/20190906/19.png)
4.再次输入`flutter run`，就会在模拟器上安装flutter app应用
![20](/assets/images/20190906/20.png)
![21](/assets/images/20190906/21.png)



OK！到这里就结束了！谢谢！

