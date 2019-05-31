/**
 * 这是一个对分页功能进行封装的指令器
 */
angular.module("myApp")
.directive('ngPage', function () {
    return {
        restrict: 'E',
        scope: {
            listPerPage: '= listPerPage',
            currentPage: '=currentPage',
            tNum: '@',
        },
        replace: true,
        templateUrl: './view/page.html',
        link(scope, ele, attr) {
            scope.pageArr = [5, 6, 7, 8, 9, 10];
            //监听每页数据是否发生变化，变化了则重新生成页码
            scope.$watch('listPerPage', function (newVal, oldVal) {
                if (newVal !== oldVal) {
                    pages = getTotalPages();
                    scope.pageNums = getPageNums(pages, scope.currentPage);

                }
            })
            //监听数据总数是否发生变化，变化了则重新生成页码
            scope.$watch('tNum', function (newVal, oldVal) {
                if (newVal !== oldVal) {
                    pages = getTotalPages();
                    scope.pageNums = getPageNums(pages, scope.currentPage);

                }
            })
            /**判断page页面中的点击事件是否能触发
             * 如果能触发，更改currentPage,并生成新的数组用于显示
             *
             * @param num{number} 如果是符合规则的数，则能实现跳转页面
             */
            scope.setPage = function (num) {
                if (num === '...' || num === 0 || num > Math.ceil(scope.tNum / scope.listPerPage) || num === '') {
                    return;
                }
                scope.currentPage = num;
                scope.pageNums = getPageNums(pages, scope.currentPage);

            };
            //计算得到最大页数，也就是总页数
            var getTotalPages = function () {
                return Math.ceil(scope.tNum / scope.listPerPage);
            };
            var pages = getTotalPages();
            /**该函数用于得到一个用于页面显示的数组
             *
             * 需要通过判定得到不同情况下的数组
             *
             * @param pages{number}最大页码
             * @param currentPage{number}当前页码
             * @returns {Array}
             */
            var getPageNums = function (pages, currentPage) {
                var pageNum = []; //生成页码数组
                if (pages === 0) {
                    pageNum.push(1);
                }
                //总页数<最大展示页数：展示全部
                else if (pages <= 6) {
                    for (var i = 1; i <= pages; i++) {
                        pageNum.push(i);
                    }
                }
                //当前页靠近首页前4页，显示：首页前4页，..., 尾页后2页
                else if (pages > 6 && currentPage <= 3) {
                    pageNum.push(1);
                    pageNum.push(2);
                    pageNum.push(3);
                    pageNum.push(4);
                    pageNum.push("...");
                    pageNum.push(pages - 1);
                    pageNum.push(pages);
                }
                // 当前页靠近尾页后4页，显示
                else if (pages > 6 && (pages - currentPage) < 3) {
                    pageNum.push(1);
                    pageNum.push(2);
                    pageNum.push("...");
                    pageNum.push(pages - 3);
                    pageNum.push(pages - 2);
                    pageNum.push(pages - 1);
                    pageNum.push(pages);
                }
                //当前页既不靠近首页前4页也不靠近尾页后4页，
                else {
                    pageNum.push(1);
                    pageNum.push(2);
                    pageNum.push("...");
                    pageNum.push(currentPage - 1);
                    pageNum.push(currentPage);
                    pageNum.push(currentPage + 1);
                    pageNum.push("...");
                    pageNum.push(pages);
                }
                return pageNum;
            };
            scope.pageNums = getPageNums(pages, scope.currentPage);
        }

    }
});

angular.module("myApp")
    .directive('searchSelect', function () {
    return {
        restrict: 'AE', //attribute or element
        scope: {
            infos: '=',
            textValue: '=',
        },
        templateUrl: '../view/page1.html',
        link(scope, ele, atr) {
            scope.copyInfos = scope.infos;   //下拉框中的数值拷贝一份
            scope.hide = true; //显示隐藏下拉框
            scope.textValue = "";  //文本框数值

            //将下拉选的数据值赋值给文本框，并且隐藏下拉框
            scope.change = function (x) {
                scope.hide = true;  //下拉框隐藏
                scope.textValue = x;   //文本框中的值

            };
            scope.changeKeyValue = function (v) {
                var newData = [];  //创建一个临时下拉框副本
                angular.forEach(scope.infos, function (data, index, array) {
                    //如果
                    if (data.indexOf(v) >= 0) {
                        newData.unshift(data);
                    }
                });
                scope.infos = newData; //newData中的数值赋值给scope.infos
                scope.hide = false;   //文本框显示

                //如果不包含或者输入框中的值为空时，把拷贝出的$scope.copyInfos赋值给$scope.infos
                if (scope.infos.length == 0 || v == "") {
                    scope.infos = scope.copyInfos;
                }
            };

            //如果点击后，数组的长度大于一，那么我们就将文本框展示出来
            scope.test = function () {
                if (scope.infos.length > 1) {
                    scope.hide = false;
                }
            }
        }
    };
})