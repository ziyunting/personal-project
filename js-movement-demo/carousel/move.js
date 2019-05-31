function getStyle(dom, attr) {
    if (window.getComputedStyle) {
        return window.getComputedStyle(dom, null)[attr];
    } else {
        return dom.currentStyle[attr];
    }
}

function startMove(dom, attrObj, callback) {
    clearInterval(dom.timer);
    let iSpeed = null, iCur = null;
    dom.timer = setInterval(function () {
        let bStop = true;
        for (let attr in attrObj) {
            if (attr == 'opacity') {
                iCur = parseFloat(getStyle(dom, attr)) * 100;
            } else {
                iCur = parseInt(getStyle(dom, attr));
            }
            iSpeed = (attrObj[attr] - iCur) / 7;
            iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
            if (attr == "opacity") {
                dom.style.opacity = (iCur + iSpeed) / 100;
            } else {
                dom.style[attr] = iCur + iSpeed + 'px';
            }
            if (iCur != attrObj[attr]) {
                bStop = false
            }
        }
        if (bStop) {
            clearInterval(dom.timer);
            typeof callback == 'function' && callback();
        }
    }, 30)

}