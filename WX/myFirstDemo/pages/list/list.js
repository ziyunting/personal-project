// pages/list/list.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        date: "十月七日",
        title: "点评人荐文：居安思危的前瞻性",
        imgSrc: "/image/list/recommend-image.png"
    },
    test() {
        console.log("success");
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
        wx.showToast({
            title:"标题",
            icon:"loading",
            // image:"/image/list/article/icon/Icon_circle.png",
            // duration:5000,
            mask:true,
            success:function(res){
                console.log(res);
            },
            // fail:function(res){
            //     console.log(res);
            // }
        })
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})