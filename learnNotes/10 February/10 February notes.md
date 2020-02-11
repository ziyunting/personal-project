2月10日
时间线：  
7:30-8:00 洗漱  早餐  
8:00-12:00 学习linux基本指令，安装centOS（失败）  
12:00-13:30 午饭午休  
13:30-17:30 学习svg

由于疫情的原因，从今天起不得不在家开启远程办公的模式，现在是下午两点，公司的远程桌面仍然连接不上。  
于是自己开展新知识的学习。
之前在家学习了一下node的知识，上午花了点时间学习linux的基本指令，但由于自己电脑的原因，centOs始终无法安装成功，
于是在接下来一段时间的计划就是开始学习d3的相关知识，同时穿插一些node中不涉及linux的部分，在网络情况好的情况下对项目的代码进行优化。  

同时在这个过程中自己也慢慢复习git的相关操作和md文档的书写  
 
 在正式学习d3之前自己先学习一下canvas和svg的简单知识，方便自己d3的入门
 d3的学习大致是先阅读文档 然后尝试做一些小的demo,最后实现一个较为复杂的demo，更多的深入学习还是要结合具体的项目实践来学习更为有效。


canvas画线：  
```
var canvas = document.getElementById('can');  
var ctx = canvas.getContext("2d");  
ctx.moveTo();   //划线的起点  
ctx.lineTo();   //划线的终点，可以有多个lineTo(),会在之前的点上依次连接。  
ctx.stroke();   //划线操作  
ctx.closePath();//连接终点和起点。只针对单个生效
ctx.fill();     //将连接成的终点和起点填充满。  
ctx.beginPath();//开启一根新的线条。  
ctx.lineWidth=10//线条的宽度
```
  画直线
```
var canvas = document.getElementById("can");
var ctx = canvas.getContext('2d');
ctx.moveTo(100, 100);
ctx.lineTo(200, 100);
```
canvas画矩形
```$xslt
1. ctx.rect(100,100,200,100)
   ctx.stroke()
2. ctx.strokeRect(100,100,100,100);
3. ctx.fillRect(100,100,100,100) 
```
canvas画圆
```$xslt
//圆心（x，y） 半径(r),弧度(起始弧度，最终弧度,按照顺时针来算起始和最终)，顺时针还是逆时针
ctx.arc(100, 100, 50, 0, Math.PI / 5, 1)//1和true为逆时针
```
canvas画圆角矩形(理解起始点和终止点以及角度的关系)
```$xslt
B(x,y),C(x,y),圆角大小arcTo的参数。
var canvas = document.getElementById('can');
var ctx = canvas.getContext("2d");
ctx.moveTo(100,110);
ctx.arcTo(100,200,200,200,10);
ctx.arcTo(200,200,200,100,10);
ctx.arcTo(200,100,100,100,10);
ctx.arcTo(100,100,100,200,10);
```

canvas画贝塞尔曲线
二次贝塞尔曲线
```$xslt
ctx.beginPath();
ctx.moveTo(100,100);
ctx.quadraticCurveTo(200,200,300,100);
ctx.stroke();
```

三次贝塞尔曲线
```$xslt
ctx.bezierCurveTo(200,200, 300, 100, 200, 300);

```

运动的波浪线
```$xslt
    var canvas = document.getElementById('can');
    var ctx = canvas.getContext("2d");
    var offset = 0;
    var num = 0;
    var width = 500;
    var height = 300;
    var timer = setInterval(function () {
        ctx.clearRect(0, 0, 500, 300);
        ctx.beginPath();
        ctx.moveTo(0 + offset - 500, height / 2);
        ctx.quadraticCurveTo(width / 4 + offset - 500, height / 2 + Math.sin(num) * 120, width / 2+ offset-500, height / 2)
        ctx.quadraticCurveTo(width / 4 * 3 + offset - 500, height / 2 - Math.sin(num)*120, width+ offset-500, height / 2)
        ctx.moveTo(0 + offset, height / 2);
        ctx.quadraticCurveTo(width / 4 + offset, height / 2 + Math.sin(num)*120, width / 2+ offset, height / 2)
        ctx.quadraticCurveTo(width / 4 * 3 + offset, height / 2 - Math.sin(num)*120, width+ offset, height / 2)
        ctx.stroke();
        offset += 5;
        offset %= 500;
        num += 0.02;
    }, 1000 / 30)
```
