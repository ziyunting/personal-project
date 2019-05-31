/**
 * 实现数据显示页面的控制器
 */
angular.module("myApp")
    .controller('detailController', function ($scope, $http,$timeout) {

        /**
         * 基于准备好的dom，初始化echarts实例
         *
         * @param a{Array}传入一个数组,作为x轴的显示数据
         * @param b{Array}传入一个数组,作为y轴的显示数据
         */
        $scope.hideLoad = false;
        $scope.setEcharts = function (a, b) {
            var myChart = echarts.init(document.getElementById('detail'));

            // 指定图表的配置项和数据
            var option = {
                toolbox: {
                    show: false,
                },
                brush: {
                    brushType: 'lineX',
                    xAxisIndex: 0,
                    throttleType: 'debounce',//延迟显示
                    throttleDelay: 400,//延时时间
                },
                title: {
                    text: '数据呈现'
                },
                tooltip: {
                    formatter: function (params) {
                        return "获取详细信息";
                    },

                },
                legend: {
                    data: ['数据量']
                },
                xAxis: {
                    splitLine: {show: false},
                    data: a,
                },
                yAxis: {
                    type: 'value',
                    axisLabel: {formatter: '{value} k'},
                    splitLine: {show: false},
                },
                series: [{
                    name: '数据量',
                    type: 'bar',
                    data: b,
                    cursor: 'pointer',
                    itemStyle: {
                        normal: {
                            color: '#44BBA3'
                        }
                    },
                }],
                grid: {
                    left: "4.5%",
                    right: "2.5%",
                },
            };
            //点击柱状图，弹出对应的数据
            myChart.on('click', function (params) {
                $scope.$apply(function () {
                    $scope.selectedData = $scope.idList[params.dataIndex];
                    console.log($scope.selectedData);
                    console.log(params.dataIndex);

                });
            });
            //实现刷选操作
            myChart.on('brushSelected', function (params) {

                var tempList = []
                var brushComponent = params.batch[0];
                var rawIndices = brushComponent.selected[0].dataIndex;
                console.log(rawIndices)
                $scope.$apply(function () {
                    if (rawIndices.length != 0) {
                        var sjList = [],
                            timeList = [];
                        $scope.idList = [];

                        $scope.massData = $scope.massData.splice(rawIndices[0], rawIndices.length)
                        $scope.tNum = $scope.massData.length;//更新选中的数据的条数
                        for (var i = 0; i < $scope.massData.length; i++) {
                            timeList.push($scope.massData[i].fields["@timestamp"][0].substring(0, 10) + " " + $scope.massData[i].fields["@timestamp"][0].substring(11, 19));
                            $scope.idList.push($scope.massData[i]._id);
                            sjList.push($scope.massData[i]._source.offset / 1000);
                        }
                        option.xAxis.data = timeList;
                        option.series[0].data = sjList;
                        myChart.setOption(option);
                        $scope.selectedData = [];
                        //清除选框
                        myChart.dispatchAction({
                            type: 'brush',
                            areas: []
                        });

                    }
                })
            })
            myChart.setOption(option);
            //默认eCharts柱状图为拉选状态
            myChart.dispatchAction({
                type: 'takeGlobalCursor',
                key: 'brush',
                brushOption: {
                    brushType: 'lineX'
                }
            });
            window.onresize = myChart.resize
        }
        //得到传入的数据并将其初始化
        window.onload = function(){

        }
        $http.get("data/date.json")
            .success(function (response) {
                $timeout(function () {
                    $scope.massData = response.responses[0].hits.hits;
                    var timeList = [];
                    var sjList = [];
                    $scope.idList = []
                    for (var i = 250; i < 310; i++) {
                        if ($scope.massData[i]._source.offset && $scope.massData[i].fields["@timestamp"]) {
                            timeList.push($scope.massData[i].fields["@timestamp"][0].substring(0, 10) + " " + $scope.massData[i].fields["@timestamp"][0].substring(11, 19));
                            $scope.idList.push($scope.massData[i]._id);
                            sjList.push($scope.massData[i]._source.offset / 1000);
                        }
                    }
                    $scope.setEcharts(timeList, sjList);

                    $scope.hideLoad = true;

                }, 2000);

                // $scope.massData = response.responses[0].hits.hits;
                // var timeList = [];
                // var sjList = [];
                // $scope.idList = []
                // for (var i = 250; i < 310; i++) {
                //     if ($scope.massData[i]._source.offset && $scope.massData[i].fields["@timestamp"]) {
                //         timeList.push($scope.massData[i].fields["@timestamp"][0].substring(0, 10) + " " + $scope.massData[i].fields["@timestamp"][0].substring(11, 19));
                //         $scope.idList.push($scope.massData[i]._id);
                //         sjList.push($scope.massData[i]._source.offset / 1000);
                //     }
                // }
                // $scope.setEcharts(timeList, sjList);
                //初始化页码数据
                $scope.tNum = 59;
                $scope.currentPage = 1;
                $scope.listPerPage = 8;
            });
    })

