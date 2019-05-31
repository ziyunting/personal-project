;(function () {
    var util = {
        getStudentId: function () {
            //获取一个不重复的id字符串 [用作学生的id]
            var d = new Date().getTime();
            var id = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                var r = (d + Math.random() * 16) % 16 | 0;
                d = Math.floor(d / 16);
                return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
            });
            return id;
        },
        findIndexByArray: function (arr, ele) {
            //从arr中寻找ele的索引;ele可以是一个对象，也可以是一个字符串，是对象时，返回该对象值匹配所在数组的index
            var i = 0, index = -1;
            var key = Object.keys(ele)[0];
            if (!arr.length) return index;
            for (i; i < arr.length; i++) {
                if (key) {
                    if (arr[i][key] === ele[key]) {
                        index = i;
                        break;
                    }
                } else {
                    if (arr[i] === ele) {
                        index = i;
                        break;
                    }
                }

            }
            return index;
        },
        findByArray: function (arr, ele) {
            //返回ele所在arr中的对象
            var result = {};
            var index = this.findIndexByArray(arr, ele);
            if (index == -1) return result;
            return arr[index];
        },
        saveLocalDate: function (key, data) {
            //缓存数据到本地
            if (!key || !data) return;
            localStorage.setItem(key, JSON.stringify(data));
        },
        getLocalDate: function (key) {
            //从本地缓存中获取数据 没有返回空数组
            var dataStr = localStorage.getItem(key);
            var resultData = [];
            if (!dataStr) return resultData;
            try {
                resultData = angular.fromJson(dataStr)
            } catch (e) {
            }
            finally {
                return resultData;
            }
        }
    };

    window.Util = util;

    //扩展Array
    Object.assign(Array.prototype, {
        indexOf1: function (ele) {
            // if(this.indexOf) return this.indexOf(ele);
            return Util.findIndexByArray(this, ele);
        },
        remove1: function (ele) {
            var index = this.indexOf1(ele);
            if(index == -1) return;
            this.splice(index,1);
        }
    });
})();