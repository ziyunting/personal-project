var app = angular.module('myApp', ['ui.router','oc.lazyLoad']);
app.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/home');
    $stateProvider.state('home', {
        url: '/home',
        templateUrl: 'view/home.html',
        controller: 'homeController',
        resolve : {
            loadMyCtrl : ['$ocLazyLoad',function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name: 'myApp',//模块的名字，单个模块可以省略
                    files: ['script/ctrl/homeController.js']//js文件地址
                })
            }]
        }
    });
    $stateProvider.state('list', {
        url: '/list',
        templateUrl: 'view/list.html',
        controller: 'listCtr',
        resolve : {
            loadMyCtrl : ['$ocLazyLoad',function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name: 'myApp',//模块的名字，单个模块可以省略
                    files: ['script/ctrl/listCtr.js']//js文件地址
                })
            }]
        }
    });
    $stateProvider.state('detail', {
        url: '/detail',
        templateUrl: 'view/detail.html',
        // controller:'detailController',
        resolve : {
            loadMyCtrl : ['$ocLazyLoad',function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name: 'myApp',//模块的名字，单个模块可以省略
                    files: ['script/ctrl/detailController.js']//js文件地址
                })
            }]
        }
    });
    $stateProvider.state('brokenLine', {
        url: '/brokenLine',
        templateUrl: 'view/brokenLine.html',
        // controller:'detailController',
        resolve : {
            loadMyCtrl : ['$ocLazyLoad',function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name: 'myApp',//模块的名字，单个模块可以省略
                    files: ['script/ctrl/brokenLineController.js']//js文件地址
                })
            }]
        }
    });
    $stateProvider.state('cake', {
        url: '/cake',
        templateUrl: 'view/cake.html',
        // controller:'detailController',
        resolve : {
            loadMyCtrl : ['$ocLazyLoad',function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name: 'myApp',//模块的名字，单个模块可以省略
                    files: ['script/ctrl/cakeController.js']//js文件地址
                })
            }]
        }
    });
    $stateProvider.state('spot', {
        url: '/spot',
        templateUrl: 'view/spot.html',
        // controller:'detailController',
        resolve : {
            loadMyCtrl : ['$ocLazyLoad',function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name: 'myApp',//模块的名字，单个模块可以省略
                    files: ['script/ctrl/spotController.js']//js文件地址
                })
            }]
        }
    });
    $stateProvider.state('map', {
        url: '/map',
        templateUrl: 'view/map.html',
        // controller:'detailController',
        resolve : {
            loadMyCtrl : ['$ocLazyLoad',function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name: 'myApp',//模块的名字，单个模块可以省略
                    files: ['script/ctrl/mapController.js']//js文件地址
                })
            }]
        }
    });
    $stateProvider.state('hotMap', {
        url: '/hotMap',
        templateUrl: 'view/hotMap.html',
        // controller:'detailController',
        resolve : {
            loadMyCtrl : ['$ocLazyLoad',function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name: 'myApp',//模块的名字，单个模块可以省略
                    files: ['script/ctrl/hotMapController.js']//js文件地址
                })
            }]
        }
    });
    $stateProvider.state('hot', {
        url: '/hot',
        templateUrl: 'view/hot.html',
        // controller:'detailController',
        resolve : {
            loadMyCtrl : ['$ocLazyLoad',function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name: 'myApp',//模块的名字，单个模块可以省略
                    files: ['script/ctrl/hotController.js']//js文件地址
                })
            }]
        }
    });
    $stateProvider.state('relation', {
        url: '/relation',
        templateUrl: 'view/relation.html',
        // controller:'detailController',
        resolve : {
            loadMyCtrl : ['$ocLazyLoad',function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name: 'myApp',//模块的名字，单个模块可以省略
                    files: ['script/ctrl/relationController.js']//js文件地址
                })
            }]
        }
    });
}]);






