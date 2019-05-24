//标量声明
var clientWidth = $(window).outerWidth();
var clientHeight = $(window).outerHeight();
var sliderPage = document.getElementsByClassName('sliderPage')[0];
var index = 0;
var lock = true
var timer = null;
var oSpanArray = document.getElementsByClassName('sliderIndex')[0].getElementsByTagName('span');


//轮播图样式
$('.top-wrap').css({width: clientWidth, height: clientHeight, overflow: 'hidden', position: 'relative'})
    .find('.sliderPage').css({height: clientHeight, width: 8 * clientWidth, position: 'absolute', left: 0, top: 0})
    .find('li').css({width: clientWidth, height: clientHeight, float: 'left'})
    .find('img').css({width: '100%', height: '118%', marginTop: '-60px'})
$('.top-wrap').find('.sliderIndex').css({
    position: 'absolute',
    bottom: 30,
    width: "100%",
    textAlign: 'center',
    cursor: 'pointer'
}).find('span').css({
    display: 'inline-block',
    width: 10,
    height: 10,
    border: '1px solid #fff',
    borderRadius: '50%',
    marginLeft: 20
})

//轮播运动


for (var i = 0; i < oSpanArray.length; i++) {
    (function (myIndex) {
        oSpanArray[i].onclick = function () {
            lock = false;
            clearTimeout(timer);
            index = myIndex;
            startMove(sliderPage, {left: -index * clientWidth}, function () {
                lock = true;
                timer = setTimeout(autoMove, 5000);
                changeIndex(index);
            })
        }
    })(i)
}

function autoMove() {
    if (lock) {
        lock = false
        clearTimeout(timer);
        startMove(sliderPage, {left: sliderPage.offsetLeft - clientWidth}, function () {
            index++;
            if (sliderPage.offsetLeft == -clientWidth * 7) {
                index = 0;
                sliderPage.style.left = '0px';

            }
            timer = setTimeout(autoMove, 5000);
            lock = true;
            changeIndex(index)
        })
    }
}

function changeIndex(_index) {
    $('.sliderIndex span').removeClass().eq(_index).addClass('active')
}

timer = setInterval(autoMove, 5000)
