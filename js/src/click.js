// build time:Fri Feb 22 2019 09:59:30 GMT+0800 (GMT+08:00)
(function(){var a="";var t=[10,20];var n="bold";var o=1500;var r=388;var e=0;$("html").click(function(n){var i=new Array("❤富强❤","❤民主❤","❤文明❤","❤和谐❤","❤自由❤","❤平等❤","❤公正❤","❤法治❤","❤爱国❤","❤敬业❤","❤诚信❤","❤友善❤");var v=$("<span/>").text(i[e]);e=(e+1)%i.length;var l=n.pageX,p=n.pageY;var c="#"+("00000"+(Math.random()*16777216<<0).toString(16)).substr(-6);if(a.length>=4){c=a}var s=Math.random()*(t[1]-t[0])+t[0];s+="px";v.css({"z-index":99999,top:p-20,left:l,position:"absolute","font-weight":"bold","font-size":s,color:c});$("html").append(v);v.animate({top:p-r,opacity:0},o,function(){v.remove()})})})();
//rebuild by neat 