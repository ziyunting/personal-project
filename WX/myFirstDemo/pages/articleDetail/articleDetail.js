// pages/articleDetail/articleDetail.js
let request = require('../utils/request.js');

Page({

    /**
     * 页面的初始数据
     */
    data: {
        articleDetail: [],
      coverHidden:true,
      playing:false
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.getData(options.id);
      

    },
  onAudioPlayTap(){
    var audio = wx.getBackgroundAudioManager();
    audio.title = "人生"
    audio.src = "http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E06DCBDC9AB7C49FD713D632D313AC4858BACB8DDD29067D3C601481D36E62053BF8DFEAF74C0A5CCFADD6471160CAF3E6A&fromtag=46";
    this.setData({
      playing:!this.data.playing
    })
  },
    getData(id) {
        let that = this
        request({
            url: 'getArticleDetail/' + id,
            success: res => {
                that.setData({
                        articleDetail: res
                    }
                )

            }
        })
    },
  hiddenCover(){
    this.setData({
      coverHidden:false,
    })
    var myVideo =wx.createVideoContext('myVideo');
    console.log(myVideo);
    myVideo.play();
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