时间线
7:30 起床
8:20- 9:00  复习昨天的内容
9:00-10:40  canvas入门基础剩余 学习
10:40-11:40   svg入门（因为小朋友干扰，进度较低）
2:00-6:00  svg基础学习

预计明天将开始d3的入门
canvas的旋转平移
```$xslt
//默认以canvas的左上角为原点作为起点
ctx.rotate(Math.PI/6)//以PI为单位
//如果想要改变坐标轴的位置，就需要平移坐标轴的原点。
ctx.translate(100,100)//也就是将坐标中心平移。
ctx.scale(2, 2);//x*2,y*2,来变成新的图形，必须在具体绘图之前使用才能生效
```
坐标系的平移和旋转是对全局都有作用的，一旦设置了就会对全局产生影响。  
在设置的初始位置添加ctx.save();  
save可以保存坐标系的平移，缩放，旋转。  
在需要的时候ctx.restore()就可以恢复成原来的默认状态。

canvas的背景填充(纯色和背景图片)
```$xslt
ctx.fillStyle='red';//可以填充颜色来设置，矩形框的填充颜色。

//也可以填充背景图片，但需要注意的是填充背景图片是默认以原点为起点来填充的
//所以当你需要设置背景图片时，需要不停地平移坐标轴，然后restore()来恢复
ctx.beginPath();
ctx.translate(100,100);
var img=new Image();
img.onload=function(){
var bg=ctx.createPattern(img,'no-repeat'); 
ctx.fill style=bg;
ctx.fillRect(0,0,200,100)
}
```
canvas线性渐变
```$xslt
ctx.beginPath();
var bg = ctx.createLinearGradient(0, 0, 200, 0);
bg.addColorStop(0, 'white');
bg.addColorStop(1, 'black');
ctx.fillStyle = bg;
ctx.fillRect(0,0,200,100);
```
ps:线性渐变也是根据坐标轴的起始位置来设置的  

canvas的辐射渐变
```$xslt
var bg = ctx.createRadialGradient(100,100,0,100,100,100)
//起始坐标，起始半径，结束坐标，结束半径
//以起始坐标按半径画圆作为始边，以终点坐标按半径画圆作为终边，始边与终边之间渐变
```
canvas的阴影
```$xslt
ctx.shadowColor='red';
ctx.shadowBlur=30//这个30是横跨在横线上的阴影距离，包含内部和外部
//可以通过ctx.shadowOffsetX和ctx.shadoeOffsetY来设置阴影的偏移
```
canvas文字渲染
```$xslt
ctx.font=30;
ctx.strokeText("panda",200,100)
ctx.strokeText("monkey",200,100)
```
canvas线端样式
```$xslt
ctx.lineCap ="butt"//默认样式
ctx.lineCap="square"//向两边延伸一个小方块。
ctx.lineCap="round"//会向两边延伸一个小圆形。
当两条线接触的时候
ctx.lineJoin="round"//就能够圆滑一些。
ctx.lineJoin="bevel"//会砍掉，创建斜角
ctx.lineJoin="miter"//尖角
ctx.miterlimit=10;//线段与线段交汇的时候，尖角的最大长度。
```



SVG  
与canvas的区别  
svg 矢量图 放大不会失真，适合大面积贴图  标签和css去画
canvas: 适合用于小面的的绘图，适合动画

svg画线与矩形
```$xslt
<svg width="500px" height="300px" style="border: 1px solid;">
    <line x1="100" y1="100" x2="200" y2="100" class="line1"></line>
    <line x1="200" y1="100" x2="200" y2="200" class="line2"></line>
    <rect height="50" width="100" x="0" y="0" rx="5"></rect>
</svg>
```
svg画圆形椭圆 折线
```$xslt
<circle r="50" cx="100" cy="200"></circle>
<ellipse rx="100" ry="30" cx="200" cy="100"></ellipse>
<polyline points="0 0,50 50,50 100,100 50"></polyline>
//上诉图形都是默认填充的，想看到线条效果就需要单独设置css。
polyline{
    fill:transparent;
    stroke:hotpink;
    stroke-width: 5px;
}
```
svg画多边形与文本
```$xslt
折线与多边形
<svg>
    <polyline points="0 0,50 50,50 100,100 50,"></polyline>
    <!--<polygon points="0 0,50 50,50 100,100 50,"></polygon>-->
    <text x="300" y="50">天气真的热</text>
</svg>
```
svg透明度&线条样式
```$xslt
stroke-opacity:线条透明度
fill-opacity:填充透明度
stroke-linecap:butt/square/round
stroke-lineJoin:bevel/miter/round
```
svg  Path
```
<path d="M 100 100 L 200 200 L 200 100"></path>
大写表示绝对位置，小写表示相对位置
<path d="M 100 100 H 200 V 200 z"></path>
H表示水平移动  v表示垂直移动 大写表示绝对位置，小写表示相对位置 
z表示闭合区间，不区分大小写
```
svg Path 画弧线
```
    <path d="M 100 100 A 100 50 90 0 1 150 200 "></path>
    //起始点横纵坐标 横半径 纵半径 旋转角度 大弧度（1）|小弧度（0） 顺时针（1）|逆时针（0）
```
svg  线性渐变
```
渐变都需要定义
<defs></defs>
完整实例
<defs>
    <linearGradient id="bg1" x1="0" y1="0" x2="0" y2="100%">
        <stop offset="0%" style="stop-color: rgb(255,255,0)"></stop>
        <stop offset="50%" style="stop-color: rgb(255,0,255)"></stop>
        <stop offset="100%" style="stop-color: rgb(0,255,255)"></stop>
    </linearGradient>
</defs>
<rect x="100" y="100" width="100" height="100" style="fill:url(#bg1)"></rect>
```
svg高斯模糊
```
<defs>
 <filter id="Gaussian">
    <feGaussianBlur in="sourceGraphic" stdDeviation="20"></feGaussianBlur>
</filter>
</defs>
<rect x="100" y="100" width="100" height="100" style="fill:url(#bg1);filter:url(#Gaussian)"></rect>
```
svg虚线和简单的小动画
```
stroke-dasharray: 10px;
//这个地方可以填写多个值，会按照实线 虚线  实线依次来对应实现虚线打点效果

line {
    stroke: black;
    stroke-width: 5px;
    stroke-dasharray: 200px;
    stroke-dashoffset: 0px;
    animation: move 1s linear infinite alternate-reverse;
}

@keyframes move {
    0% {
        stroke-dashoffset: 0;
    }
    100% {
        stroke-dashoffset: 200px
    }

}
```
svg viewBox
 ```
 viewBox="0,0,250,150"
 比例尺缩小，实际上就相当于100px实际代表的变大了
```
