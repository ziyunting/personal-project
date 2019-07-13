// pages/list/list.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        date: "十月七日",
        title: "点评人荐文：居安思危的前瞻性",
        imgSrc: "/image/list/recommend-image.png",
        aaa: true,
        listLike: {
            0: true,
            1: false,
            2: false,
            3: true
        }
    },
    test() {
        wx.showActionSheet({
            itemList: ["内容过期了", '内容和深度阅读不相关', '不再显示来自深度阅读的内容'],
            success: res => {


            }
        })
    },
    onLikeTap: function () {
        var temp = this.data.aaa;
        temp = !temp;
        this.setData({aaa: temp});
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
wx.request({
  url: 'https://easy-mock.com/mock/5bd149fab36f2c5eac3a9274/QM_magazine/getRecommendInfo',
  success:function(res){
    console.log(res.data);
  }
})
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

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