angular.module("myApp")
    .controller('brokenLineController', function ($scope, $http) {
        /**
         * 基于准备好的dom，初始化echarts实例
         *
         * @param a{Array}传入一个数组,作为x轴的显示数据
         * @param b{Array}传入一个数组,作为y轴的显示数据
         */
        $scope.setEcharts = function (a, b) {
            var myChart = echarts.init(document.getElementById('brokenLine'));

            option = {
                title:{
                    text:'数据变化趋势',
                    x:'center'

                },

                xAxis: {
                    type: 'category',
                    data: a,
                },
                yAxis: {
                    type: 'value'
                },
                tooltip: {
                    formatter: function (params) {
                        return "获取详细信息";
                    },

                },
                series: [{
                    data:b,
                    type: 'line',
                    itemStyle: {
                        normal: {
                            color: '#44BBA3'
                        }
                    },
                }]
            };

            myChart.setOption(option);


        }
        $http.get("data/date.json")
            .success(function (response) {
                $scope.massData = response.responses[0].hits.hits;
                var timeList = [];
                var sjList = [];
                $scope.idList = []
                for (var i = 250; i < 310; i++) {
                    if ($scope.massData[i]._source.offset && $scope.massData[i].fields["@timestamp"]) {
                        timeList.push(  $scope.massData[i].fields["@timestamp"][0].substring(11, 19));
                        $scope.idList.push($scope.massData[i]._id);
                        sjList.push($scope.massData[i]._source.offset / 1000);
                    }
                }
                $scope.setEcharts(timeList, sjList);
    })
    })