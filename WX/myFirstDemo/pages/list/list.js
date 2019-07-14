// pages/list/list.js
Page({
  /**
   * 页面的初始数据
   */
  data: {

  },
  showList(e) {
    let type = e.currentTarget.dataset.articletype;
    wx.showActionSheet({
      itemList: ["内容过期了", '内容和' + type + '不相关', '不再显示来自' + type + '的内容'],
      success: res => {
      }
    })
  },
  onLikeTap: function(e) {
    var index = e.currentTarget.dataset.articleindex
    var listLike = this.data.listLike;
    var isLike = listLike[index];
    listLike[index] = !isLike;
    this.setData({
      listLike: listLike
    });
    wx.setStorageSync("listLike", listLike)
  },
  getLikeData() {
    let listLikeStorage = wx.getStorageSync('listLike') || {};
    this.setData({
      listLike: listLikeStorage
    })
  },
  onArticleTap(e) {
    let typeId = e.currentTarget.dataset.articletypeid;
    wx.navigateTo({
      url: '/pages/type/type?typeId='+typeId,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getHomeData();
    this.getLikeData();
  },

  getHomeData: function() {
    wx.request({
      url: 'https://easy-mock.com/mock/5bb8c1c63ccc501a316e3ccb/magazine/home',
      success: res => {
        this.setData({
          recommend: res.data.recommend,
          markType: res.data.markType,
          articleList: res.data.articleList,
        })
      }


    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})