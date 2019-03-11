---
title: 解决vuecli3+TypeScript在VScode中experimentalDecorators报错问题
date: 2019-03-11 09:25:40
tags: [Vue,TypeScript]
categories: Vue
---

## 一、问题描述

最近在使用 `VueCli3+TypeScript` 构建的项目在`VSCode`中打开,总是会出现如下的红色下划线错误提示问题，看着着实难受，于是就在网上百度方法，试了多次仍然不成功，无意中发现一个解决方法居然成功了，真是无心插柳柳成荫，特此记录！

> 错误提示内容
```
Experimental support for decorators is a feature that is subject to change in a future release. Set the 'experimentalDecorators' option to remove this warning.
```

## 二、解决办法

### 1.网上方法

(1).新建一个`jsconfig.json`或者`tsconfig.json`，配置`experimentalDecorators`参数的值为`true`，但是`vue-cli3`构建项目的时候已经在`tsconfig.json`中配置了这个参数,so,没有用啦！
(2).有的说修改vsCode的配置，`文件->首选项->设置 `中搜索`experimentalDecorators`，设置为`true`，这个也不生效。

### 2.成功方法

(1).确保在项目根目录下有`jsconfig.json`或者`tsconfig.json`文件，并配置`experimentalDecorators`参数的值为`true`；
(2).将项目所在的根目录文件夹单独在VSCode中打开，然后，没有然后了，就oj8k了！