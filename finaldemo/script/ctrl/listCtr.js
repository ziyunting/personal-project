/**
 * 用于表格界面展示的控制器
 *
 * 包含基础的增删查找和单选全选等功能
 */
angular.module("myApp").controller('listCtr', function ($scope) {
    $scope.editStu = {}; //当前编辑/添加 中的学生对象
    $scope.studentList = [];//学生信息数组
    $scope.checkedList = [];//选中学生id数组
    $scope.schoolList = [
        {name: '学校1', code: 1},
        {name: '学校2', code: 2},
        {name: '学校3', code: 3}
    ];//学校信息数组
    $scope.searchName = '';
    $scope.mainCtr = {

        key: 'studentInfo',
        isAction: false,//按钮是否可点击
        actionType: "add",
        isOpen: false,
        //初始化数据，从localstorage得到数据
        init: function () {
            $scope.studentList = Util.getLocalDate(this.key);
        },
        /**用于弹出编辑/添加界面框
         *
         * @param type{Sting} edit 编辑页面  add 添加页面
         * @param stu{Array、Null}ArrAy 编辑页面 stu是待编辑学生的数据  Null 增加数据
         */
        showActionWindow: function (type, stu) {

            this.actionType = type;
            this.isAction = true;
            if (this.actionType === 'edit' && !stu) {
                stu = Util.findByArray($scope.studentList, {id: $scope.checkedList[0]});
            }
            this.resetInfo(stu);
        },
        //单击取消按钮触发此事件，隐藏信息框
        hideActionWindow: function () {
            this.isAction = false;
            this.resetInfo();
        },
        /**
         * 该函数与点击保存按钮相绑定，实现点击后的事件
         */
        saveInfo: function () {
            var student = angular.copy($scope.editStu);
            if (this.actionType === 'add') {
                var isRepeat = Util.findIndexByArray($scope.studentList, {name: student.name}) > -1 ? true : false;
                if (isRepeat) {
                    alert('学生姓名为:' + student.name + '的学生在系统中已经存在！请更改姓名后提交');
                    return;
                }
                var school = Util.findByArray($scope.schoolList, {code: student.school});
                student.id = Util.getStudentId();
                student.schoolName = school.name;
                $scope.studentList.unshift(student);
            } else {
                var index = Util.findIndexByArray($scope.studentList, {id: student.id});
                $scope.studentList.splice(index, 1, student);//提交一个新的数组去替代
            }
            this.resetInfo();
            this.hideActionWindow();//关闭编辑框
            this.refresh();//更新本地缓存数据
        },
        /**
         * 用于实现单选和多选的一系列操作
         *
         * 如果不包含id 就将所有的数据存入或移除checkedList数组，如果包含id就将对应的数据存入或移除数组
         *
         * @param event{}传递一个事件，事件包含选中状态
         * @param id{string Null} sting 用于单选，与每一行数据绑定  Null 用于多选
         */
        select: function (event, id) {
            var isChecked = angular.element(event.target)[0].checked;
            if (!id) {
                //select all
                if (isChecked) {
                    $scope.checkedList = $scope.studentList.map(function (d) {
                        return d.id;
                    });//这里起到的就是循环的作用
                } else
                    $scope.checkedList = [];

            } else {
                if (isChecked)
                    $scope.checkedList.push(id);
                else
                    $scope.checkedList.remove1(id);
            }
        },
        /**
         * 与删除按钮相绑定有行删除和选中删除
         * @param id{number、Array}传入的当前行id ,已选中数组id，或全部数组
         */
        delInfo: function (id) {
            var ids = id && [id] || $scope.checkedList;
            angular.forEach(ids, function (ele) {
                $scope.studentList.remove1({id: ele});//remove1是删除当行，如果有多个就是遍历删除。
            });
            this.refresh();//更新本地缓存数据

        },
        //重置信息
        resetInfo: function (stu) {
            stu = stu && angular.copy(stu) || {sex: 0, school: 1 };
            $scope.editStu = stu;
        },
        //更新信息
        refresh: function () {
            Util.saveLocalDate(this.key, $scope.studentList);
        }

    }
    $scope.mainCtr.init();
    // $('.ui.checkbox').checkbox();
    $('select.dropdown').dropdown();
});
