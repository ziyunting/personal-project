angular.module("myApp")
    .controller('cakeController', function ($scope, $http) {
        $scope.setEcharts = function (info, sjList) {
            var myChart = echarts.init(document.getElementById('cake'));

            option = {
                title: {
                    text: '数据范围分布',
                    // subtext: '纯属虚构',
                    x: 'center'
                },
                tooltip: {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                legend: {
                    orient: 'vertical',
                    left: 'left',
                    data: info,
                },
                series: [
                    {
                        name: '访问来源',
                        type: 'pie',
                        radius: '55%',
                        center: ['50%', '60%'],
                        data: sjList,
                        itemStyle: {
                            emphasis: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ]
            };
            myChart.setOption(option);
        }

        $http.get("data/date.json")
            .success(function (response) {
                var sjList = [];
                var obj = {};
                var tempNum = [0, 0, 0, 0, 0, 0, 0]
                var tempData = ['1000k内', '1000k-2000k', '2000k-3000k', '3000k-4000k', '4000k-5000k', '5000k-6000k', '大于6000k']
                $scope.massData = response.responses[0].hits.hits;
                for (var i = 250; i < 310; i++) {
                    if ($scope.massData[i]._source.offset) {
                        var offset = Math.floor($scope.massData[i]._source.offset / 1000000);
                        console.log(offset)
                        switch (offset) {
                            case 0:
                                tempNum[0]++;
                                break;
                            case 1:
                                tempNum[1]++;
                                break;
                            case 2:
                                tempNum[2]++;
                                break;
                            case 3:
                                tempNum[3]++;
                                break;
                            case 4:
                                tempNum[4]++;
                                break;
                            case 5:
                                tempNum[5]++;
                                break;
                            default:
                                tempNum[6]++;
                                break;
                        }
                    }
                }
                for (var j = 0; j <= 6; j++) {
                    obj = {
                        value: tempNum[j],
                        name: tempData[j],
                    }
                    sjList.push(obj)
                }
                $scope.setEcharts(tempData, sjList);

            })

    })