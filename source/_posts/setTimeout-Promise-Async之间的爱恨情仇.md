---
title: setTimeout&Promise&Async之间的爱恨情仇
date: 2019-02-22 09:54:21
tags: JavaScript
categories: JavaScript
---

春节之后又到了换工作的高峰期，我换工作时候也遇到了这道面试题，这里将我前面写的文章保存在博客方便以后复习使用。


## **setTimeout**


### 一、setTimeout 初现

    定义：setTimeout() 方法用于在指定的毫秒数后调用函数或计算表达式。
    
语法：
```javascript
    setTimeout(code, milliseconds, param1, param2, ...)
    setTimeout(function, milliseconds, param1, param2, ...)
```
|参数                |描述|
|-----------------  |-----------------|
|code/function      |必需。要调用一个代码串，也可以是一个函数|
|milliseconds       |可选。执行或调用 code/function 需要等待的时间，以毫秒计。默认为 0。|
|param1, param2, ...|可选。 传给执行函数的其他参数（IE9 及其更早版本不支持该参数）。|


### 二、setTimeout 初识

**第一种**
```javascript

setTimeout(fn1, 1000);
setTimeout(fn2, 2000);
setTimeout(function fn3(){console.log(3);}, 3000);
setTimeout(function (){console.log(4);}, 4000);
function fn1(){
    console.log(1);
}

var fn2 = function(){
    console.log(2);
}
//输出结果如下：
// 分别延迟1,2,3,4秒之后输出 1 2 3 4
```

**第二种**
```javascript

setTimeout(fn1(), 1000);
setTimeout(fn2(), 2000);
setTimeout(function fn3(){console.log(3);}(), 3000);
setTimeout(function (){console.log(4);}(), 4000);
function fn1(){
    console.log(1);
}

var fn2 = function(){
    console.log(2);
}

//输出结果如下：
//直接输出 1 2 3 4  ,没有延迟
```


按照定义：setTimeout() 方法用于在指定的毫秒数后调用函数或计算表达式。第一种方法在指定毫秒数之后执行，第二种方法没有在指定毫秒数后执行，而是立刻执行。所以我个人将其分成正规军setTimeout和杂牌军setTimeout，方便后面记忆。

正规军我们在后面详细讲，现在先了解下杂牌军：
    由于setTimeout()的第一个参数是**直接可执行的代码**，所以它没有任何延迟效果，如下：

```javascript

setTimeout(console.log(1), 1000);

//输出结果如下：
//直接输出 1 ,没有延迟
```

### 三、setTimeout 再遇

```javascript

setTimeout(function(a,b){
　　console.log(a+b);
},1000,4,5);

//输出结果如下：
//9
```

从第三个参数开始，依次用来表示第一个参数（回调函数）传入的参数
一些古老的浏览器是不支持，可以用bind或apply方法来解决,如下：

```javascript

setTimeout(function(a,b){
　　console.log(a+b);
}.bind(this,4,5),1000);

//输出结果如下：
//9
```

第一个参数表示将原函数的this绑定全局作用域，第二个参数开始是要传入原函数的参数
当调用绑定函数时,绑定函数会以创建它时传入bind()方法的第一个参数作为 this


### 四、setTimeout 相知


对于setTimeout()的this问题，网上有很多的文章，我就不班门弄斧了，后面若总结的够到位了就写一篇文章介绍下。

```javascript

console.log(1);
setTimeout(function (){
    console.log(2);
},3000);
console.log(3);
//输出结果如下：
//1 3 2
```

```javascript

console.log(1);
setTimeout(function (){
    console.log(2);
},0);
console.log(3);

//输出结果如下：
//1 3 2
```
这里有些同学可能会疑惑，第一段代码延迟三秒之后执行输出1，3，2可以理解，但是第二段代码延迟0秒执行为什么也是会输出1，3，2呢？

这里就需要提到“任务队列”这个概念了，由于JavaScript是一种单线程的语言，也就是说同一时间只能做一件事情。但是HTML5提出Web Worker标准，允许JavaScript脚本创建多个线程，但是子线程完全受主线程控制。
单线程意味着，所有的任务需要排队，前一个任务结束，才会执行后一个任务。如果前一个任务耗时很长，后一个任务就不得不一直等待。

所以设计者将任务分成两种，一种 **同步任务** ，另一种是 **异步任务** 。
同步任务是，在主线程上排队执行的任务，只有前一个执行完，才能执行后一个；
异步任务是，不进入主线程，而是进入“任务队列”的任务，只有“任务队列”通知主线程，某个异步任务可以执行了，该任务才会进入主线程执行。

“任务队列”除了放置任务事件，还可以放置定时事件。即指定某些代码在多少时间之后执行。知道了这些我们基本上就可以解释上面两段代码为什么会输出这样的结果了。

第一段代码，因为setTimeout()将回调函数推迟了3000毫秒之后执行。如果将setTimeout()第二个参数设置为0，就表示当前代码执行完以后，立刻执行（0毫秒间隔）指定的回调函数。所以只有在打印出1和3之后，系统才会执行“任务队列”中的回调函数。

总之，setTimeout(fn,0)的含义是，指定某个任务在主线程最早可得的空闲时间执行，也就是说，尽可能早得执行。它在"任务队列"的尾部添加一个事件，因此要等到同步任务和"任务队列"现有的事件都处理完，才会得到执行。强调一遍：它在"任务队列"的尾部添加一个事件，记住是尾部，添加到"任务队列"尾部，所以后最后执行。

HTML5标准规定了setTimeout()的第二个参数的最小值（最短间隔），不得低于4毫秒，如果低于这个值，就会自动增加。在此之前，老版本的浏览器都将最短间隔设为10毫秒。

setTimeout()只是将事件插入了"任务队列"，必须等到当前代码（执行栈）执行完，主线程才会去执行它指定的回调函数。要是当前代码耗时很长，有可能要等很久，所以并没有办法保证，回调函数一定会在setTimeout()指定的时间执行。所以他们有时候不一定会守时的。守时的都是好孩子！


阮一峰老师对任务队列有详细的介绍，详情[戳这里](http://www.ruanyifeng.com/blog/2014/10/event-loop.html)

### 五、setTimeout 相熟

了解了上面的内容，我们得拉出来溜溜了，直接上测试题：

```javascript
    console.log(1);
    setTimeout(fn1, 1000);
    setTimeout(function(){
        console.log(2);
    },0);
    setTimeout(console.log(3),2000);
    function fn1(){
        console.log(4);
    }
    console.log(5);
    //输出结果：
    //1 3 5 2 4(4会延迟一秒)
```

>1.先执行主线程，打印出1；

>2.遇到第一个setTimeout,1秒后执行回调函数，所以添加到任务队列；

>3.遇到第二个setTimeout，0秒后执行回调函数，再次添加到任务队列；

>4.遇到第三个setTimeout，这个第一个参数不是回调函数，而是一个直接可执行的语句，记得我前面讲过的这个是个杂牌军，它不会添加到任务队列也不会延迟执行而是直接执行，所以打印出3；

>5.继续执行打印出5；

>6.第二个setTimeout，由于是0秒延迟所以主线程任务结束立刻执行，所以打印出2；

>7.最后执行第一个setTimeout，一秒后打印出4.


上面的试题明白之后我们就可以明白下面的代码了：

```javascript
    var timeoutId = setTimeout(function (){
        console("hello World");
    },1000);
   
    clearTimeout(timeoutId);
    //输出结果：
    //不会打印出hello World
```

>1先执行主线程，遇到setTimeout并且第一个参数是回调函数，添加到任务队列，1秒后执行；

>2.执行clearTimeout，则还未等到代码执行就 取消了定时器，所以不会打印出任何内容。


下面我们学习下promise

## **promise**

### 一、promise 初现

ES6 将promise写进了语言标准，统一了用法，原生提供了Promise对象。
详细介绍[戳这里](http://es6.ruanyifeng.com/#docs/promise)阮一峰老师进行了详细的说明；

这里我简单的说下，我后面会使用到的内容：
Promise 新建后就会立即执行，然后，then方法接受两个回调函数作为参数，将在当前脚本所有同步任务执行完才会执行。记住这里then之后的回调函数才异步执行的，所以会添加到任务队列中。
第一个回调函数是Promise对象的状态变为resolved时调用，第二个回调函数是Promise对象的状态变为rejected时调用。其中，第二个函数是可选的，不一定要提供。

### 二、promise 初识

下面我将以代码片段的方式，逐渐看出现的各种面试题，加深大家的理解

```javascript

    console.log(1);
    new Promise((resolve,reject)=>{
            console.log(2);
            resolve()
    }).then( ()=>{
        console.log(3)
    },()=>{
        console.log(4);
    });
    console.log(5);

    //输出结果：
    //1 2 5 3

```

>1.先执行主线程，打印出1；

>2. Promise 新建后就会立即执行，所以打印出2，执行resolve表明执行成功回调；

>3. then的成功执行的是回调函数，所以是异步执行，添加到任务队列之中，暂不执行；

>4. 继续执行主线程，打印出5；

>5. 主线程结束之后执行任务队列中的回调函数打印出3

```javascript

    console.log(1);
    new Promise((resolve,reject)=>{
            console.log(2);
            reject()
    }).then( ()=>{
        console.log(3)
    },()=>{
        console.log(4);
    });
    console.log(5);

    //输出结果：
    //1 2 5 4

```

这个例子同上，只是执行的是异步的失败的回调函数，所以最后一个打印出的是4

```javascript

    console.log(1);
    new Promise((resolve,reject)=>{
            console.log(2);
    }).then( ()=>{
        console.log(3)
    });
    console.log(4);

    //输出结果：
    //1 2 4

```

这个例子中打印出4之后没有打印3，是因为promise中没有指定是执行成功回调还是失败的回调所以不会执行then的回调函数

```javascript

    console.log(1);
    new Promise((resolve,reject)=>{
            console.log(2);
    }).then(console.log(3));
    console.log(4);

    //输出结果：
    //1 2 3 4

```

看到这个有同学可能就懵了，怎么回事怎么是1234而不是1243呢，这需要考察同学们是否细心呢，看这里then中的直接是可执行的语句而不是回调函数，所以会出现这种情况，异步任务必须是回调函数  如果不是回调函数就是同步的了
>1.先执行主线程，打印出1；

>2. Promise 新建后就会立即执行，所以打印出2；

>3. then中不是回调函数而是直接可执行的语句，所以直接执行打印出3；

>4. 继续执行主线程，打印出4；
    
  嘻嘻，看了上面的这些例子相信大家已经对promise理解了不少，所以我们继续深入看看下面这个例子，输出的结果是什么呢？   

```javascript

    console.log(1);
    new Promise((resolve,reject)=>{
            console.log(2);
            resolve();
            console.log(3);
    }).then( ()=>{
        console.log(4)
    });
    console.log(5);

    //输出结果：
    //1 2 3 5 4

```

大家有没有写对呢？
这里大家的疑问估计就是resolve()之后的console.log(3);这个地方咯
这是因为上面代码中，调用resolve()以后，后面的console.log(3)还是会执行，并且会首先打印出来。因为立即 resolved 的 Promise 是在本轮事件循环的末尾执行，总是晚于本轮循环的同步任务。


所以如果想让，调用resolve或reject以后，Promise 的使命完成，后继操作应该放到then方法里面，而不应该直接写在resolve或reject的后面。所以，最好在它们前面加上return语句，这样就不会有意外。如下：
    
```javascript

    console.log(1);
    new Promise((resolve,reject)=>{
        console.log(2);
        return resolve();
        console.log(3);
    }).then( ()=>{
        console.log(4)
    });
    console.log(5);
    //输出结果：
    //1 2 5 4
```

这样console.log(3);是不会执行的。

### 三、promise&setTimeout
   
 下面我们在来看如果promise&setTimeout同时出现会发生什么样的情况呢？如下：
```javascript

    console.log('a');
    setTimeout(function() {console.log('b')}, 0);
    new Promise((resolve, reject) => {
        for(let i=0; i<10000000; i++) {
            if(i==999999) {
                console.log('c');
                resolve();
            }
        }
        console.log('d');
    }).then(() => {
        console.log('e');
    });
    console.log('f');
    //输出结果：
    // a c d f e b
```
  大家是不是有些晕，哈哈哈，别着急这里我们得在拓展一点新概念，方便我们理解：事件循环、宏任务和微任务

JavaScript的一大特点就是单线程，而这个线程中拥有唯一的一个事件循环。

一个线程中，事件循环是唯一的，但是任务队列可以拥有多个。

任务队列又分为macro-task（宏任务）与micro-task（微任务），它们又被称为task与jobs。

宏任务（macro-task）大概包括：script(整体代码), setTimeout, setInterval, setImmediate, I/O, UI rendering。

微任务（micro-task）大概包括: process.nextTick, Promise, MutationObserver(html5新特性)

事件循环的顺序，决定了JavaScript代码的执行顺序。

它从script(整体代码)开始第一次循环。之后全局上下文进入函数调用栈。

直到调用栈清空(只剩全局)，然后执行所有的微任务（micro-task）。

当所有可执行的微任务（micro-task）执行完毕之后。
    
循环再次从宏任务（macro-task）开始，找到其中一个任务队列执行完毕，然后再执行所有的微任务（micro-task），这样一直循环下去。

注：本篇使用的宏任务（macro-task）：script(整体代码), setTimeout, setInterval；微任务（micro-task）： Promise。至于其他的浏览器没有，引用了node.js的API，如： setImmediate、 process.nextTick等，至于他们的执行顺序可参考[这篇文章](https://www.jianshu.com/p/12b9f73c5a4f)

比如上述例子，不同类型的任务会分别进入到他们所属类型的任务队列，比如所有setTimeout()的回调都会进入到setTimeout任务队列，既宏任务（macro-task）;所有then()回调都会进入到then队列,既微任务（micro-task）。

当前的整体代码我们可以认为是宏任务。事件循环从当前整体代码开始第一次事件循环，然后再执行队列中所有的微任务，当微任务执行完毕之后，事件循环再找到其中一个宏任务队列并执行其中的所有任务，然后再找到一个微任务队列并执行里面的所有任务，就这样一直循环下去。这就是我所理解的事件循环。


分析上面例子：

>1.首先执行整体代码，第一个打印出来a

>2.执行到第一个setTimeout时，发现它是宏任务，此时会新建一个setTimeout类型的宏任务队列并派发当前这个setTimeout的回调函数到刚建好的这个宏任务队列中去

>3.再执行到new Promise，Promise构造函数中的第一个参数在new的时候会直接执行，因此不会进入任何队列，所以第三个输出是c

>4.执行完resolve()之后，继续向后执行，打印出d

>5.上面有说到Promise.then是微任务，那么这里会生成一个Promise.then类型的微任务队列，这里的then回调会被push进这个队列中

>6.再向后走打印出f

>7.第一轮事件循环的宏任务执行完成（整体代码看做宏任务）。此时微任务队列中只有一个Promise.then类型微任务队列。宏任务队列中也只有一个setTimeout类型的宏任务队列。

>8.下面执行第一轮事件循环的微任务，很明显，会打印出e,至此第一轮事件循环完成

>9.开始第二轮事件循环：执行setTimeout类型队列（宏任务队列）中的所有任务，只有一个任务，所以打印出b

>10.第二轮事件的宏任务结束，这个事件循环结束。



再来一个你中有我我中有你的超级例子，体验下到处是坑的试题，嘿嘿;-)

```javascript

    console.log('a');

    setTimeout(function () {
        console.log('b')
        new Promise(resolve=> {
            console.log('c')
            resolve()
        }).then(()=> {
            console.log('d')
        })
    },2000);


    new Promise((resolve,reject)=>{
        console.log('e');
        resolve();
        console.log('f');
    }).then(()=>{
        console.log('g')
    });

    console.log('h');

    new Promise((resolve,reject)=>{
        setTimeout(function () {
            console.log('i');
        },0);
    }).then(console.log('j'));

    setTimeout(function () {
        console.log('k')
        new Promise(resolve=>{
            console.log('l')
            return resolve()
            console.log('m')
        }).then(()=>{
            console.log('n')
        })
    },1000);

    console.log('p');

    //输出结果：
    //a e f h j p g i
    //延迟1s 输出：k l n 
    //再延迟1s 输出：b c d
```


>1.首先执行整体代码，第一个打印出来"a";

>2.执行到第一个setTimeout时，发现它是宏任务，此时会新建一个setTimeout类型的宏任务队列并派发当前这个setTimeout的回调函数到刚建好的这个宏任务队列中去，并且轮到它执行时要延迟2秒后再执行;

>3.执行到第一个new Promise，Promise构造函数中的第一个参数在new的时候会直接执行，因此不会进入任何队列，所以第二个输出是"e"，resolve()之后的语句会继续执行，所以第三个输出的是"f",Promise.then是微任务，那么这里会生成一个Promise.then类型的微任务队列，这里的then回调会被push进这个队列中;

>4.再执行整体代码，第四个打印出来"h";

>5.执行到第一个new Promise，Promise构造函数中的第一个参数在new的时候会直接执行，但是这个是一个setTimeout，发现它是宏任务，派发它的回调到上面setTimeout类型的宏任务队列中去。后面Promise.then中是一个可执行的代码，并不是回调函数，所以会直接的执行，并不会添加到微任务中去，所以第五个输出的是："j";

>6.执行到第二个setTimeout时，发现它是宏任务，派发它的回调到上面setTimeout类型的宏任务队列中去，但是会延迟1s执行；

>7.执行整体代码，第六个输出的是"p";

>8.第一轮事件循环的宏任务执行完成（整体代码看做宏任务）。此时微任务队列中只有一个Promise.then类型微任务队列，它里面有一个任务;宏任务队列中也只有一个setTimeout类型的宏任务队列;

>9.下面执行第一轮事件循环的微任务，很明显，第七个输出的是："g"。此时第一轮事件循环完成;

>10.开始第二轮事件循环：执行setTimeout类型队列（宏任务队列）中的所有任务。发现有的有延时有的没有延时，所以先执行延时最短的宏任务；

>11.执行setTimeout，第八个输出的是"i";

>12.紧接着执行延迟1s的setTimeout，所以延迟一秒之后第九个输出的是："k";

>13.之后遇到new Promise，Promise构造函数中的第一个参数在new的时候会直接执行，因此不会进入任何队列，所以第十个输出是"l"，之后是一个return语句，所以后面的代码不会执行，"m"不会被输出出来；

>14.但这里发现了then，又把它push到上面已经被执行完的then队列中去，这里要注意，因为出现了微任务then队列，所以这里会执行该队列中的所有任务（此时只有一个任务），所以第十一个输出的是"n";

>15.再延迟1s执行setTimeout，所以延迟二秒之后第十二个输出的是："b";

>16.之后遇到new Promise，Promise构造函数中的第一个参数在new的时候会直接执行，因此不会进入任何队列，所以第十三个输出是"c"；

>17.但这里又发现了then，又把它push到上面已经被执行完的then队列中去，这里要注意，因为出现了微任务then队列，所以这里会执行该队列中的所有任务（此时只有一个任务），所以第十四个输出的是"d";

噗，终于完了，不知道大家有没有理解呢？
生活就是这样，你以为度过了一个难关前面就是阳光大道，但现实就是这样，他会给你再来一个难题，接着看下面的代码，嘿嘿嘿~~~

```javascript

    async function async1() {
        console.log("a");
        await  async2();
        console.log("b");
    }

    async  function async2() {
        console.log( 'c');
    }

    console.log("d");

    setTimeout(function () {
        console.log("e");
    },0);

    async1();

    new Promise(function (resolve) {
        console.log("x");
        resolve();
    }).then(function () {
        console.log("y");
    });

    console.log('z');

    //输出结果：
    // d a c x z y b e
```

是不是有点傻了，怎么又出现了async了，别慌别慌且听我慢慢道来，在说之前还得大家了解async，阮一峰老师对此有详细的介绍，详情[戳这里](http://es6.ruanyifeng.com/#docs/async)

## Async

### 一、async

async的用法，它作为一个关键字放到函数前面，用于表示函数是一个异步函数，因为async就是异步的意思， 异步函数也就意味着该函数的执行不会阻塞后面代码的执行。

我们先来观察下async的返回值，请看下面的代码：

```javascript

    async function testAsync() {
        return "hello async";
    }

    const result = testAsync();
    console.log(result);

    //输出结果：
    // Promise { 'hello async' }
```

看到这里我们知道了，saync输出的是一个promise对象

async 函数（包含函数语句、函数表达式）会返回一个 Promise 对象，如果在函数中 return 一个直接量，async 会把这个直接量通过 Promise.resolve() 封装成 Promise 对象。

那我们试下没有返回值会是怎么样呢？

```javascript

    async function testAsync() {
        console.log("hello async");
    }

    const result = testAsync();
    console.log(result);

    //输出结果：
    // hello async
    // Promise { undefined }
```

会返回一个为空的promis对象

### 二、await

从字面意思上看await就是等待，await 等待的是一个表达式，这个表达式的返回值可以是一个promise对象也可以是其他值。

注意到 await 不仅仅用于等 Promise 对象，它可以等任意表达式的结果，所以，await 后面实际是可以接普通函数调用或者直接量的。


```javascript

    function getSomething() {
        return "something";
    }

    async function testAsync() {
        return Promise.resolve("hello async");
    }

    async function test() {
        const v1 = await getSomething();
        const v2 = await testAsync();
        console.log(v1, v2);
    }

    test();

    //输出结果：
    // something hello async
```
await 是个运算符，用于组成表达式，await 表达式的运算结果取决于它等的东西,如果它等到的不是一个 Promise 对象，那 await 表达式的运算结果就是它等到的东西。


|内容                |描述|
|-----------------  |-----------------|
|语法                |[return_value] = await expression;|
|表达式（expression） |一个 Promise 对象或者任何要等待的值。|
|返回值（return_value）|返回 Promise 对象的处理结果。如果等待的不是 Promise 对象，则返回该值本身|    


但是当遇到await会怎么执行呢？

async函数完全可以看作多个异步操作，包装成的一个 Promise 对象，而await命令就是内部then命令的语法糖。
当函数执行的时候，一旦遇到await就会先返回，等到异步操作完成，再接着执行函数体内后面的语句.

即，

当遇到async函数体内的 `await test();`时候，执行test()，然后得到返回值value（可以是promise也可以是其他值），组成`await value;`,若 value是promise对象时候，此时返回的Promise会被放入到任务队列中等待，await会让出线程，跳出 async函数，继续执行后续代码；若 value是其他值，只是不会被添加到任务队列而已，await也会让出线程，跳出 async函数，继续执行后续代码。



明白了这些，我们分析上面最难的那部分代码：

>1.首先执行整体代码，遇到两个saync函数，没有调用所以继续向下执行，所以第一个输出的是："d";

>2.执行到第一个setTimeout时，发现它是宏任务，此时会新建一个setTimeout类型的宏任务队列并派发当前这个setTimeout的回调函数到刚建好的这个宏任务队列中去，并且轮到它执行时要立刻执行;

>3.遇到async1()， async1函数调用，执行async1函数，第二个输出的是："a";

>4.然后执行到 await async2()，发现 async2 也是个 async 定义的函数，所以直接执行了“console.log('c')”。所以第三个输出的是："c";

>5.同时async2返回了一个Promise,请注意：此时返回的Promise会被放入到任务队列中等待，await会让出线程，接下来就会跳出 async1函数，继续往下执行！！！

>6.执行到 new Promise，前面说过了promise是立即执行的，所以第四个输出的是："x";

>7.然后执行到 resolve 的时候，resolve这个任务就被放到任务队列中等待，然后跳出Promise继续往下执行，所以第五个输出的是："z";

>8.现在调用栈空出来了，事件循环就会去任务队列里面取任务继续放到调用栈里面；

>9.取到的第一个任务，就是前面 async1 放进去的Promise，执行Promise时候，遇到resolve或者reject函数，这次会又被放到任务队列中等待，然后再次跳出 async1函数 继续下一个任务！！！

>10.接下来取到的下一个任务，就是前面 new Promise 放进去的 resolve回调，执行then，所以第六个输出的是："y";

>11.调用栈再次空出来了，事件循环就取到了下一个任务,async1 函数中的 async2返回的promise对象的resolve或者reject函数执行，因为 async2 并没有return任何东西，所以这个resolve的参数是undefined；

>12.此时 await 定义的这个 Promise 已经执行完并且返回了结果，所以可以继续往下执行 async1函数 后面的任务了，那就是“console.log('b')”，所以第七个输出的是："b";

>13.调用栈再次的空了出来终于执行setTimeout的宏任务，所以第八个输出的是："e"


哇(*@ο@*) 哇～，解决了小伙伴们明白没有，希望大家了解了就再也不怕面试这种题目啦！
本想着简单的写下面试题的解决步骤没想到一下子写了这么多，耐心读到这里的小伙伴都是非常棒的，愿你在技术的路上越走越远！

