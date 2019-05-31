/**
 *这是一个用来实现在搜索界面输入部分高亮显示的过滤器
 *
 * 主要过程：数据文本化 --> 替换search部分内容 --> 将文本转化为原来的格式
 *
 *text{数据类型} 该参数表示使用该过滤器时过滤器前的数据
 * search{string} 该参数表示过滤器待过滤部分
 */
angular.module("myApp")
    .filter('highLight', function ($sce) {
        var fn = function (text, search) {
            JSON.stringify(text);
            if (!search) {
                return $sce.trustAsHtml(text);
            }
            text = encodeURI(text);
            search = encodeURI(search);
            var regex = new RegExp(search, 'gi')
            var result = text.replace(regex, '<span class="highlightedText">$&</span>');
            result = decodeURI(result);
            result = $sce.trustAsHtml(result)
            try {
                result = angular.fromJson(result)
            } catch (e) {
            } finally {
                return result;
            }
        };
        return fn;
    });