/**
 * 用于主界面展示的控制器
 */
angular.module("myApp").controller('homeController', function ($scope) {
    $scope.title = '这是主页面';
    $('.ui.accordion')
        .accordion()
    ;
})