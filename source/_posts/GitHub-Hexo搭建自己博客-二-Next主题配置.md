---
title: 'GitHub + Hexo搭建自己博客(二) Next主题配置 '
date: 2019-02-19 15:35:40
tags: [hexo,github]
categories: hexo
top: 10
---

## 一、基本配置

在 Hexo 中有两份主要的配置文件，其名称都是 _config.yml。 其中，一份位于**站点根目录**下，主要包含 Hexo 本身的配置；另一份位于**主题目录**下，这份配置由主题作者提供，主要用于配置主题相关的选项。

为了描述方便，在以下说明中，将前者称为 **站点配置文件**， 后者称为 **主题配置文件**。

### 1、站点基本设置

在**站点配置文件** 即博客根目录下的`_config.yml`中

```

# Site
title: Sando博客       
subtitle: 代码日记      
description: 寄杂志第
keywords:
author: Sando
language: zh-Hans
timezone:

```
![01](/assets/images/20190219/01.png)

### 2、头像设置

2.1 设置头像
在**站点配置文件** 中新增avatar，值设置为头像的链接地址。地址可以是网络地址，也可以是本地地址（放置在source/images/ 目录下）
```
#侧边栏头像设置
avatar: /images/user.jpg
```

2.2 头像旋转动画
打开\themes\next\source\css\_common\components\sidebar\sidebar-author.styl，在里面添加如下代码：
``` css
.site-author-image {
  display: block;
  margin: 0 auto;
  padding: $site-author-image-padding;
  max-width: $site-author-image-width;
  height: $site-author-image-height;
  border: $site-author-image-border-width solid $site-author-image-border-color;
 
  /* 头像圆形 */
  border-radius: 80px;
  -webkit-border-radius: 80px;
  -moz-border-radius: 80px;
  box-shadow: inset 0 -1px 0 #333sf;
 
  /* 设置循环动画 [animation: (play)动画名称 (2s)动画播放时长单位秒或微秒 (ase-out)动画播放的速度曲线为以低速结束 
    (1s)等待1秒然后开始动画 (1)动画播放次数(infinite为循环播放) ]*/
 
 
  /* 鼠标经过头像旋转360度 */
  -webkit-transition: -webkit-transform 1.0s ease-out;
  -moz-transition: -moz-transform 1.0s ease-out;
  transition: transform 1.0s ease-out;
}
 
img:hover {
  /* 鼠标经过停止头像旋转 
  -webkit-animation-play-state:paused;
  animation-play-state:paused;*/
 
  /* 鼠标经过头像旋转360度 */
  -webkit-transform: rotateZ(360deg);
  -moz-transform: rotateZ(360deg);
  transform: rotateZ(360deg);
}
 
/* Z 轴旋转动画 */
@-webkit-keyframes play {
  0% {
    -webkit-transform: rotateZ(0deg);
  }
  100% {
    -webkit-transform: rotateZ(-360deg);
  }
}
@-moz-keyframes play {
  0% {
    -moz-transform: rotateZ(0deg);
  }
  100% {
    -moz-transform: rotateZ(-360deg);
  }
}
@keyframes play {
  0% {
    transform: rotateZ(0deg);
  }
  100% {
    transform: rotateZ(-360deg);
  }
}

```
### 3、主题布局设置

在**主题配置文件**即在next主题目录下的_config.yml文件中将scheme设定为Pisces,可根据个人喜好设置成其他的值

```
# Schemes
#scheme: Muse
#scheme: Mist
scheme: Pisces
#scheme: Gemini
```

### 4、菜单项设置
在**主题配置文件**中的menu中设置，增添一个movies
注：千万不要在这设置中文，后面的值那是查找文件的地方！
如下
```
menu:
  home: / || home
  about: /about/ || user
  tags: /tags/ || tags
  categories: /categories/ || th
  #archives: /archives
  #search: /search
  #schedule: /schedule/ || calendar
  #sitemap: /sitemap.xml || sitemap
  #commonweal: /404
  movies: /movies || film
```

这些配置都要与你主题目录下的languages文件中对应的yml文档里配置相关联。
比如你在站点根目录中的配置文件设置language为zh-Hans，那么就要进入到主题目录下的languages文件中修改zh-Hans.yml，这样才能显示出菜单项新增的中文内容
```
menu:
  home: 首页
  archives: 归档
  categories: 分类
  tags: 标签
  about: 关于
  search: 搜索
  schedule: 日程表
  sitemap: 站点地图
  commonweal: 公益404
  movies: 电影
```


### 5、菜单项图标设置
在**主题配置文件**中对应的字段是menu_icons。格式为item name：icon name，其中item name与所配置的菜单名字对应，icon name是Font Awesome图标的名字。而 enable 可用于控制是否显示图标，你可以设置成 false 来去掉图标。
```
menu_icons:
  enable: true
  home: home
  about: user
  categories: th
  tags: tags
  archives: archive
  commonweal: heartbeat
  movies: film
```
![05](/assets/images/20190219/05.png)

新建的栏目icon，需要在[Font Awesome图标库](http://fontawesome.io/icons/)存在，例如新建的movies，在图标库中查询选择film图标，在**主题配置文件**的menu_icons中，更改movies: film

### 6、侧栏位置设置

在**主题配置文件**中修改主题目录下sidebar的position值
```
sidebar:
  # Sidebar Position, available value: left | right (only for Pisces | Gemini).
  position: left
  #position: right
```

### 7、添加标签页面
前面通过修改next主题下的_config.yml文件中的menu选项，可以在主页面的菜单栏添加标签选项，但是此时点击标签，跳转的页面会显示page not found。此时我们要新建一个页面
在git bush中输入`hexo new page tags`
![02](/assets/images/20190219/02.png)

在新建的index.md文件中添加type: "tags"
```
---
title: tags
date: 2019-02-18 17:16:00
type: "tags"
---
```
当要为某一篇文章添加标签，只需在blog/source/_post目录下的具体文章的tags中添加标签即可，如：
![03](/assets/images/20190219/03.png)
成功后为
![04](/assets/images/20190219/04.png)

### 8、侧边栏社交栏目

侧栏社交链接的修改包含两个部分，第一是链接，第二是链接图标。 两者配置均在 **主题配置文件** 中

（1）链接放置在 social 字段下，一行一个链接。其键值格式是 显示文本: 链接地址。
```
# Social links
social:
  GitHub: https://github.com/your-user-name
  Twitter: https://twitter.com/your-user-name
  微博: http://weibo.com/your-user-name
  豆瓣: http://douban.com/people/your-user-name
  知乎: http://www.zhihu.com/people/your-user-name
  # 等等
```
（2）设定链接的图标，对应的字段是 social_icons。其键值格式是 匹配键: Font Awesome 图标名称， 匹配键 与上一步所配置的链接的 显示文本 相同（大小写严格匹配），图标名称 是 Font Awesome 图标的名字（不必带 fa- 前缀）。 enable 选项用于控制是否显示图标，你可以设置成 false 来去掉图标。
其中seoial_icons节点中后面的值是http://fontawesome.io/icons/ 中提供的图标的名称。之后其他链接如推特，微博等都可自行增减。
```
# Social Icons
social_icons:
  enable: true
  # Icon Mappings
  GitHub: github
  Twitter: twitter
  微博: weibo
```
### 9、显示当前浏览进度
**主题配置文件** 即`themes/*/_config.yml`中的`b2t`（返回顶部）及`scrollpercent`（浏览百分数）
![12](/assets/images/20190219/12.png)


## 二、个性化设置

### 1、添加萌萌哒二次元看板娘

[英文介绍](https://github.com/EYHN/hexo-helper-live2d)
[中文介绍](https://github.com/EYHN/hexo-helper-live2d/blob/master/README.zh-CN.md)

#### 1.1、安装插件
> `npm install --save hexo-helper-live2d`

#### 1.2、配置
请向根目录的 _config.yml 文件或主题的 _config.yml 文件中添加配置.

```

live2d:
  enable: true
  scriptFrom: local
  pluginRootPath: live2dw/
  pluginJsPath: lib/
  pluginModelPath: assets/
  tagMode: false
  log: false
  model:
    use: live2d-widget-model-<你喜欢的模型名字>
  display:
    position: right
    width: 150
    height: 300
  mobile:
    show: true

```

[模型连接](https://huaji8.top/post/live2d-plugin-2.0/)
[配置详细介绍](https://l2dwidget.js.org/docs/class/src/index.js~L2Dwidget.html#instance-method-init)

#### 1.3、配置文件

配置文件有很多方法这里主要讲我使用的方法：详情请参考如下：

[英文介绍](https://github.com/EYHN/hexo-helper-live2d)
[中文介绍](https://github.com/EYHN/hexo-helper-live2d/blob/master/README.zh-CN.md)

##### 1.3.1 在博客根目录下建文件夹live2d_models；
##### 1.3.2 再在live2d_models下建文件夹<你喜欢的模型名字>；
##### 1.3.3 再在<你喜欢的模型名字>下建json文件：<你喜欢的模型名字>.model.json；

#### 1.4、安装模型

在命令行（即Git Bash）运行以下命令即可：
> `npm install --save live2d-widget-model-<你喜欢的模型名字>`
[模型安装](https://github.com/xiazeyu/live2d-widget-models)
#### 1.5、查看结果

在命令行（即Git Bash）运行以下命令， 在`http://127.0.0.1:4000/`查看测试结果：
> `hexo clean && hexo g && hexo s`

#### 1.6、更改模型

若更改模型请从第二步更改model.use；删除第三步原有文件，重新创建，安装模型，查看结果

### 2、实现fork me on github

 2.1、点击 [这里](https://github.blog/2008-12-19-github-ribbons/) 挑选自己喜欢的样式，并复制代码
 2.2、然后粘贴刚才复制的代码到`themes/*/layout/_layout.swig`文件中(放在`<div class="headband"></div>`的下面)，并把href改为你的github地址 
 2.3、若位置不对，在 img 标签中修改 `  style="position:fixed;top:0;right:0" `

![06](/assets/images/20190219/06.png)

### 3、设置网站的图标Favicon

在[EasyIcon](https://www.easyicon.net/)或者[Iconfont](https://www.iconfont.cn/)中找一张（32*32）的ico图标，并将图标名称改为favicon.ico，然后把图标放在/themes/next/source/images里，并且修改**主题配置文件** ：

![07](/assets/images/20190219/07.png)

### 4、首页文章添加阴影效果

打开\themes\next\source\css\_custom\custom.styl,向里面加入：
```css
//文章内容添加边框阴影
.post {
   margin-top: 0px;
   margin-bottom: 60px;
   padding: 25px;
   -webkit-box-shadow: 0 0 5px rgba(202, 203, 203, .5);
   -moz-box-shadow: 0 0 5px rgba(202, 203, 204, .5);
}
```
### 5、网站顶部加载条

修改主题配置文件(_config.yml)将pace: false改为pace: true就行了，你还可以换不同样式的加载条，如下图： 
![08](/assets/images/20190219/08.png)

### 6、统计文章阅读量

通过leanCloud统计您网站的文章阅读量
1.注册[LeanCloud](https://leancloud.cn/), 并创建一个你自己的应用;
2.点击图片右上角的设置图标进入应用界面;
![20](/assets/images/20190219/20.png)
3.到此，你的应用创建成功，继续表的创建,创建表，并将表的名字命名为：Counter, 如图:
![21](/assets/images/20190219/21.png)
4.打开设置 -> 应用key 获取`App ID`和`App Key`;
5.最后打开**主题配置文件**: `themes/*/_config.yml`;
```
leancloud_visitors:
  enable: true
  app_id: #你的app_id
  app_key: #你的的app_key
```
6.完成配置并重新编译。到此您已经成功设置了阅读量的统计

### 7、文章加密访问

打开themes->next->layout->_partials->head.swig文件,在以下位置插入这样一段代码：
```html
<script>
    (function(){
        if('{{ page.password }}'){
            if (prompt('请输入文章密码') !== '{{ page.password }}'){
                alert('密码错误！');
                history.back();
            }
        }
    })();
</script>

```
![09](/assets/images/20190219/09.png)

然后在文章上写上`password: ****`,如下：
![10](/assets/images/20190219/10.png)
![11](/assets/images/20190219/11.png)

### 8、修改链接URL
编辑 **站点配置文件**下的 _config.yml 文件，修改其中的 permalink字段：`permalink: :category/:title/`

### 9、文章置顶

 9.1 安装插件
>`npm uninstall hexo-generator-index --save`
>`npm install hexo-generator-index-pin-top --save`

 9.2 在需要置顶的文章中加上top即可，数值越大文章越靠前

```
---
title: 'GitHub + Hexo搭建自己博客(二) Next主题配置 '
date: 2019-02-19 15:35:40
tags: [hexo,github]
categories: blog,hexo,next
top: 10
---
```
 9.3 设置置顶标志

打开：/themes/*/layout/_macro/post.swig，定位到`<div class="post-meta">`标签下，插入如下代码：
```html
{% if post.top %}
  <i class="fa fa-thumb-tack"></i>
  <font color=7D26CD>置顶</font>
  <span class="post-meta-divider">|</span>
{% endif %}
```

如下：
![13](/assets/images/20190219/13.png)
![14](/assets/images/20190219/14.png)

### 10、隐藏网页底部powered By Hexo / 强力驱动
打开themes/next/layout/_partials/footer.swig,使用`<!-- -->`隐藏之间的代码即可，或者直接删除。位置如图：
![15](/assets/images/20190219/15.png)

### 11、实现统计功能

1.在根目录下安装 hexo-wordcount,运行：`npm install hexo-wordcount --save`
2.然后在**主题配置文件**中，配置如下：
```
# Post wordcount display settings
# Dependencies: https://github.com/willin/hexo-wordcount
post_wordcount:
  item_text: true
  wordcount: true
  min2read: true
  totalcount: false
  separated_meta: true
```

### 12、网站底部字数统计
1.在根目录下安装 hexo-wordcount,运行：`npm install hexo-wordcount --save`
2.然后在/themes/next/layout/_partials/footer.swig文件尾部加上：
```html
  <div class="theme-info">
    <div class="powered-by"></div>
    <span class="post-count">博客全站共{{ totalcount(site) }}字</span>
  </div>
```

### 13、添加 README.md 文件
每个项目下一般都有一个 README.md 文件，但是使用 hexo 部署到仓库后，项目下是没有 README.md 文件的。

在 Hexo 目录下的 source 根目录下添加一个 README.md 文件，修改**站点配置文件** _config.yml，将 skip_render 参数的值设置为`skip_render: README.md`

### 14、修改文章底部的那个带#号的标签
修改模板/themes/next/layout/_macro/post.swig，搜索 rel="tag">#，将 # 换成<i class="fa fa-tag"></i>
![16](/assets/images/20190219/16.png)

### 15、添加RSS

1.站点根目录下安装插件，`npm install --save hexo-generator-feed`;
2.在**站点配置文件**_config.yml中，添加如下内容：

```
# Extensions
## Plugins: http://hexo.io/plugins/
plugins: hexo-generate-feed
```
3.然后再**主题配置文件**中配置`rss`;
```
rss: /atom.xml
```
4.配置完之后运行：`hexo clean && hexo g && hexo s`;
5.重新生成一次，你会在./public 文件夹中看到 atom.xml 文件。然后启动服务器查看是否有效，之后再部署到 Github 中

### 16、点击出现桃心效果
1.在路径`/themes/*/source/js/src`里面新建`love.js`文件并将代码复制进去；
```javascript
! function (e, t, a) {
  function n() {
    c(".heart{width: 10px;height: 10px;position: fixed;background: #f00;transform: rotate(45deg);-webkit-transform: rotate(45deg);-moz-transform: rotate(45deg);}.heart:after,.heart:before{content: '';width: inherit;height: inherit;background: inherit;border-radius: 50%;-webkit-border-radius: 50%;-moz-border-radius: 50%;position: fixed;}.heart:after{top: -5px;}.heart:before{left: -5px;}"), o(), r()
  }

  function r() {
    for (var e = 0; e < d.length; e++) d[e].alpha <= 0 ? (t.body.removeChild(d[e].el), d.splice(e, 1)) : (d[e].y--, d[e].scale += .004, d[e].alpha -= .013, d[e].el.style.cssText = "left:" + d[e].x + "px;top:" + d[e].y + "px;opacity:" + d[e].alpha + ";transform:scale(" + d[e].scale + "," + d[e].scale + ") rotate(45deg);background:" + d[e].color + ";z-index:99999");
    requestAnimationFrame(r)
  }

  function o() {
    var t = "function" == typeof e.onclick && e.onclick;
    e.onclick = function (e) {
      t && t(), i(e)
    }
  }

  function i(e) {
    var a = t.createElement("div");
    a.className = "heart", d.push({
      el: a,
      x: e.clientX - 5,
      y: e.clientY - 5,
      scale: 1,
      alpha: 1,
      color: s()
    }), t.body.appendChild(a)
  }

  function c(e) {
    var a = t.createElement("style");
    a.type = "text/css";
    try {
      a.appendChild(t.createTextNode(e))
    } catch (t) {
      a.styleSheet.cssText = e
    }
    t.getElementsByTagName("head")[0].appendChild(a)
  }

  function s() {
    return "rgb(" + ~~(255 * Math.random()) + "," + ~~(255 * Math.random()) + "," + ~~(255 * Math.random()) + ")"
  }
  var d = [];
  e.requestAnimationFrame = function () {
    return e.requestAnimationFrame || e.webkitRequestAnimationFrame || e.mozRequestAnimationFrame || e.oRequestAnimationFrame || e.msRequestAnimationFrame || function (e) {
      setTimeout(e, 1e3 / 60)
    }
  }(), n()
}(window, document);

```

2.在`\themes\*\layout\_layout.swig`文件末尾`</body>`之前添加
```html
<!-- 页面点击小红心 -->
<script type="text/javascript" src="/js/src/love.js"></script>
```

3.我选择的是社会主义核心价值观的特效，因为我们都是社会主义接班人！！
```javascript
(function() {
    
    var T_color = "";//字体颜色,你不设置就是随机颜色,
    
    var T_size = [10,20];//文字大小区间,不建议太大
    
    var T_font_weight = "bold";//字体粗斜度-->normal,bold,900
    
    var AnimationTime = 1500;//文字消失总毫秒
    
    var Move_up_Distance = 388;//文字移动距离,正数代表上移，反之下移
    
    var a_index = 0;
    $("html").click(function(e){
        var a = new Array("富强", "民主", "文明", "和谐", "自由", "平等", "公正" ,"法治", "爱国", "敬业", "诚信", "友善");
        var $i = $("<span/>").text(a[a_index]);
        a_index = (a_index + 1) % a.length;
        var x = e.pageX,y = e.pageY;
        var x_color =  "#" + ('00000' + (Math.random() * 0x1000000 << 0).toString(16)).substr(-6);//-->随机颜色
        //console.log(x_color);
        if(T_color.length>=4){
            x_color = T_color;
        }
        
        var x_size = Math.random()*(T_size[1]-T_size[0]) + T_size[0];
        x_size +=  "px";
        
        $i.css({
            "z-index": 99999,
            "top": y - 20,
            "left": x,
            "position": "absolute",
            "font-weight": "bold",
            "font-size":x_size,
            "color": x_color
        });
        $("html").append($i);
        $i.animate({"top": y-Move_up_Distance,"opacity": 0},AnimationTime,function() {
            $i.remove();
        });
    });
})();
```

### 17、修改文章内链接文本样式

1.修改文件 `themes\*\source\css\_common\components\post\post.styl`，在末尾添加如下css样式，：
```css
// 文章内链接文本样式
.post-body p a{
  color: #0593d3;
  border-bottom: none;
  border-bottom: 1px solid #0593d3;
  &:hover {
    color: #fc6423;
    border-bottom: none;
    border-bottom: 1px solid #fc6423;
  }
}
```

### 18、在文章末尾添加“本文结束”标记

1.在路径 `\themes\*\layout\_macro` 中新建 `passage-end-tag.swig` 文件,并添加以下内容：
```html
<div>
    {% if not is_index %}
        <div style="text-align:center;color: #ccc;font-size:14px;">-------------本文结束<i class="fa fa-paw"></i>感谢您的阅读-------------</div>
    {% endif %}
</div>
```

2.打开`\themes\*\layout\_macro\post.swig`文件，在`post-body` 之后， `post-footer `之前添加如下代码（post-footer之前两个DIV）
```html
<div>
  {% if not is_index %}
    {% include 'passage-end-tag.swig' %}
  {% endif %}
</div>

```
![17](/assets/images/20190219/17.png)


3.打开**主题配置文件**（_config.yml),在末尾添加：
```
# 文章末尾添加“本文结束”标记
passage_end_tag:
  enabled: true
```
4.完成以上设置之后，在每篇文章之后都会添加如此效果图
![18](/assets/images/20190219/18.png)

### 19、自定义鼠标样式
打开 `themes/*/source/css/_custom/custom.styl` ,在里面写下如下代码：
```
// 鼠标样式
  * {
      cursor: url("http://om8u46rmb.bkt.clouddn.com/sword2.ico"),auto!important
  }
  :active {
      cursor: url("http://om8u46rmb.bkt.clouddn.com/sword1.ico"),auto!important
  }
```
### 20、Canvas背景

在**主题配置文件**中，找到Canvas配置项，可以应用NNext自带的Canvas特效，如下：
![19](/assets/images/20190219/19.png)

想要更改颜色和数量？修改文件：`/themes/next/source/lib/canvas-nest/canvas-nest.min.js`,[修改参考](https://github.com/hustcc/canvas-nest.js/blob/master/README-zh.md)

### 21、修改内容区域的宽度
1. 编辑主题的 source/css/_variables/custom.styl 文件，新增变量：
```
// 修改成你期望的宽度
$content-desktop = 700px

// 当视窗超过 1600px 后的宽度
$content-desktop-large = 900px
```
2. 但是此方法不适用于 Pisces Scheme，对于 Pisces Scheme，需要同时修改 `header` 的宽度、`.main-inner` 的宽度以及 `.content-wrap` 的宽度。例如，使用百分比（Pisces 的布局定义在 `source/css/_schemes/Picses/_layout.styl` 中）
```css
.header{ width: 60%; }
.container .main-inner { width: 60%; }
.content-wrap { width: calc(100% - 260px); }
```
  > 超过一定宽度后（一行内文字太多导致换行跨度太大），阅读体验不好，我调整的宽度为60%，各位可以自行测试进行调整

### 22、打赏功能

1.准备支付宝和微信二维码，存放在`themes/*/source/images`
2.在**主题配置文件**（_config.yml）中进行设置
```
# Reward
reward_comment: 谢谢请我吃辣条！
wechatpay: /images/wechatpay.png
alipay: /images/alipay.jpg
```
3.修复图片闪动bug，修改`next/source/css/_common/components/post/post-reward.styl`，注释`wechat:hover`和`alipay:hover`


### 23、配置Valine评论系统
1.Valine 是一款基于Leancloud的快速、简洁且高效的无后端评论系统；
2.获取Leancloud的APP ID和 APP KEY, 上面第六步设置中已经介绍了获取方法；
3.打开**主题配置文件**: `themes/*/_config.yml`;
```
# Valine.
# You can get your appid and appkey from https://leancloud.cn
# more info please open https://valine.js.org
valine:
  enable: true
  appid:  # your leancloud application appid
  appkey: # your leancloud application appkey
  notify: true # mail notifier , https://github.com/xCss/Valine/wiki
  verify: false # Verification code
  placeholder: 在这里说点什么吧... # comment box placeholder
  avatar: identicon # 评论表头样式  /mm/identicon/monsterid/wavatar/retro/hide
  guest_info: nick,mail,link # custom comment header
  pageSize: 10 # pagination size
```
4.其他相关配置和邮件提醒方式可查看[Valline详细配置官网](https://valine.js.org/configuration/configuration.html)

### 24、添加搜索功能

1.在根目录下安装`hexo-generator-searchdb`插件，`npm install hexo-generator-searchdb --save
`;
2.**站点配置文件**中添加以下字段
```
search:
  path: search.xml
  field: post
  format: html
  limit: 10000
```
3.编辑**主题配置文件**启用本地搜索
```
# Local search
local_search:
  enable: true
```
### 25、不蒜子访问统计

1.编辑 **主题配置文件** `themes/*/_config.yml`中的`busuanzi_count`的配置项即可;
```
busuanzi_count:
  # count values only if the other configs are false
  enable: true
  # custom uv span for the whole site
  site_uv: true
  site_uv_header: <i class="fa fa-user"></i>
  site_uv_footer:
  # custom pv span for the whole site
  site_pv: true
  site_pv_header: <i class="fa fa-eye"></i>
  site_pv_footer:
  # custom pv span for one page only
  page_pv: true
  page_pv_header: <i class="fa fa-file-o"></i>
  page_pv_footer:
```
2.找到主题调用不蒜子的swig文件`\themes*\layout_third-party\analytics\busuanzi-counter.swig`
3.更改域名
```html
把原有的：
<script async src="https://dn-lbstatics.qbox.me/busuanzi/2.3/busuanzi.pure.mini.js"></script>
域名改一下即可：
<script async src="https://busuanzi.ibruce.info/busuanzi/2.3/busuanzi.pure.mini.js"></script>
```
### 26、添加404公益界面

1.在根目录下输入`hexo new page 404`;
2.打开刚新建的页面文件，默认在 Hexo 文件夹根目录下 `/source/404/index.md`；
3.将文件名`index.md`改为`404.html`;
4.在文件中写入内容，这里使用的是腾讯公益；
```html
---
title: 404 Not Found：该页无法显示
toc: false
comments: false
permalink: /404
---
<!DOCTYPE html>
<html>
    <head>
         <meta charset="UTF-8" />
         <title>404</title>                                                                                                                                        
    </head>
    <body>
         <script type="text/javascript" src="//qzonestyle.gtimg.cn/qzone/hybrid/app/404/search_children.js" homePageName="返回首页" homePageUrl="https://sandop.github.io"></script>
	</body>
</html>
```
5.将`返回首页`的链接更改为自己的链接。

### 27、网页代码压缩

网上有很多相关的博文，常规的做法是使用gulp来进行压缩，但是没有成功，所以更换为`hexo-neat`压缩插件进行。

1.站点根目录下安装插件`npm install hexo-neat --save`；
2.修改**站点配置文件**，在末尾添加以下代码；
```
# hexo-neat
# 博文压缩
neat_enable: true
# 压缩html
neat_html:
  enable: true
  exclude:
# 压缩css  
neat_css:
  enable: true
  exclude:
    - '**/*.min.css'
# 压缩js
neat_js:
  enable: true
  mangle: true
  output:
  compress:
  exclude:
    - '**/*.min.js'
    - '**/jquery.fancybox.pack.js'
    - '**/index.js'

```
3.执行`hexo clean && hexo g && hexo s`查看效果。
