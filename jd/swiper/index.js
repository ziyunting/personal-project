(function () {


    // 面向对象编程方式  ---> 
    // 所有变量以对象属性的方式存在
    // 把所有的函数 以对象方法的形式存在


    function Swiper(options) {
        // 把需要用到的方法属性保存到对象身上
        // 轮播图的父级
        this.wrap = options.wrap;
        // 需要轮播的图片列表
        this.imgList = options.imgList;
        // 轮播土拍你的长度
        this.imgLen = this.imgList.length;
        // 是否显示左右按钮
        this.showBtn = options.showBtn;
        // 图片得宽度
        this.imgWidth = options.width || $(this.wrap).width();
        // 图片的高度
        this.imgHeight = options.height || '100%';
        // 当前显示的图片索引值
        this.nowIndex = 0;
        // 当前图片是否完全展示出阿来
        this.flag = false;
        // 创建轮播图结构
        this.createDom();
        // 初始化轮播图样式
        this.initStyle();
        // 绑定事件
        this.bindEvent();
        // 自动轮播
        this.slideAuto();
    }
    Swiper.prototype.createDom = function () {
        //     <div class="swiper">
        //     <ul>
        //         <li><img src="./image/pic1.png" alt=""></li>
        //         <li><img src="./image/pic2.png" alt=""></li>
        //         <li><img src="./image/pic3.png" alt=""></li>
        //     </ul>
        // </div>
        // carousel
        var swiperContent = $('<div class="swiper"></div>');
        var imgList = $('<ul class="swiper-list"></ul>');
        var dotDiv = $('<div class="dot"></div>');
        for (var i = 0; i < this.imgLen; i++) {
            $('<li><img src="' + this.imgList[i] + '" /></li>').appendTo(imgList);
            $('<span></span>').appendTo(dotDiv);
        }
        swiperContent.append(imgList)
            .append($('<div class="left-btn"> &lt;</div><div class="right-btn"> &gt;</div>'))
            .append(dotDiv)
            .appendTo($(this.wrap));

    }

    Swiper.prototype.initStyle = function () {
        $('.swiper').css({
            width: this.imgWidth,
            height: this.imgHeight,
            overflow: 'hidden',
            position: 'relative',
            textAlign: 'center',
        })
        $('.swiper > .swiper-list').css({
            padding: 0,
            margin: 0,
            width: '100%',
            height: '100%',
            position: 'relative',
        });
        $('.swiper > .swiper-list > li').css({
            listStyle: 'none',
            width: '100%',
            height: '100%',
            position: 'absolute',
            top: 0,
            left: 0,
            display: 'none',
        }).eq(0).css({
            display: 'block'
        }).end().find('img').css({
            width: '100%',
            height: '100%',
        });
        $('.left-btn,.right-btn').css({
            width: 24,
            height: 40,
            lineHeight: '40px',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            color: '#fff',
            fontSize: '20px',
            position: 'absolute',
            textAlign: 'center',
            top: '50%',
            marginTop: -20,
            cursor: 'pointer',
        });
        $('.left-btn').css({
            left: 5
        });
        $('.right-btn').css({
            right: 5
        });
        $('.dot').css({
            position: "absolute",
            bottom: 10,
            display: 'inline-block',
        })
        $('.dot span').css({
            display: 'inline-block',
            width: 8,
            height: 8,
            backgroundColor: '#fff',
            borderRadius: '50%',
            marginRight: 10,
            cursor: 'pointer',
        }).eq(this.nowIndex).css({
            backgroundColor: 'red'
        });
    }

    Swiper.prototype.bindEvent = function () {
        var self = this;
        // 点击左侧按钮 图片向前一张
        $('.left-btn').on('click', function () {
            self.move('prev');
        });
        // 点击右侧按钮  图片向后一张
        $('.right-btn').on('click', function () {
            self.move('next');
        });
        // 点击每一个小圆点  展示相应图片
        $('.dot span').on('click', function () {
            var index = $(this).index();
            self.move(index);
            // move()
        })
    }
    Swiper.prototype.slideAuto = function() {
        var self = this;
        clearTimeout(self.timer);
        self.timer = setTimeout(function() {
            self.move('next');
        }, 1000)
    }
    // 切换图片方法
    Swiper.prototype.move = function (direction) {
        // 判断当前展示的图片是否展示完全  如果没有 则不进行切换
        if (this.flag) {
            return false;
        }
        // 如果已经展示完全 则继续切换 枷锁
        this.flag = true;
        // 判断切换方向
        switch (direction) {
            // 向前一张 nowIndex --
            case "prev":
                // ...
                if (this.nowIndex == 0) {
                    this.nowIndex = this.imgLen - 1;
                } else {
                    this.nowIndex--;
                }
                break;
                // 向后一张  nowIndex++
            case "next":
                if (this.nowIndex == this.imgLen - 1) {
                    this.nowIndex = 0;
                } else {
                    this.nowIndex ++;
                }
                break;
                // 数字 nowIndex = direction
            default:
                this.nowIndex = direction;
                break;
        }
        var self = this;
        // 淡入淡出效果
        $('.swiper-list li').fadeOut().eq(this.nowIndex).fadeIn(function() {
            // 当图片完全展示出来之后 自动轮播 并且锁打开
            self.slideAuto();
            self.flag = false;
        });
        $('.dot span').css({
            backgroundColor: '#fff',
        }).eq(this.nowIndex).css({
            backgroundColor: 'red',
        });

    }

    $.fn.extend({
        carousel: function (options) {
            // 兼容父级 保存轮播图的父级
            options.wrap = this || $('body');
            // 构建轮播图对象
            var swiper = new Swiper(options);
            return this;
        }
    })
}());