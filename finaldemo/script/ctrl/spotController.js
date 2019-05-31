angular.module("myApp")
    .controller('spotController', function ($scope, $http) {

        $scope.setEcharts = function (arr) {
            var myChart = echarts.init(document.getElementById('spot'));

            option = {
                xAxis: {},
                yAxis: {},
                series: [{
                    symbolSize: 10,
                    data: arr,
                    type: 'scatter'
                }]
            };

            myChart.setOption(option);


        }
        $scope.setEcharts();

        $http.get("data/date.json")
            .success(function (response) {
                $scope.massData = response.responses[0].hits.hits;
                var timeList = [];
                var sjList = [];
                var  spotList=[];
                var arr = [];
                for (var i = 250; i < 310; i++) {
                    if ($scope.massData[i]._source.offset && $scope.massData[i].fields["@timestamp"]) {
                        timeList.push( $scope.massData[i].fields["@timestamp"][0].substring(11, 23));
                        sjList.push($scope.massData[i]._source.offset / 1000);
                    }
                }
                for(var j=0;j<=timeList.length;j++){
                    arr=[j,sjList[j]]
                    spotList.push(arr);
                }
                $scope.setEcharts(spotList);
            });
    })