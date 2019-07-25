//index.js
//获取应用实例
const app = getApp()
import {
  IndexModel
} from "../../models/index.js"
import {
  random
} from "../../utils/random.js"

const indexModel = new IndexModel();
Page({
  data: {
    articleList: [],
    markList: [],
    recommendList: [],

    getMore: {
      type: String,
      value: '',
      observer(newVal) {
      }
    }
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function() {
    this.getData();
    wx.showLoading();
  },
  getData() {
    const articleList = indexModel.getArticleList();
    const markList = indexModel.getMarkList();
    const recommendList = indexModel.getRecommendInfo()
    Promise.all([articleList, markList, recommendList]).then(res => {
      this.setData({
        articleList: res[0],
        markList: res[1],
        recommendList: res[2]
      });
      wx.hideLoading();

    })
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  onReachBottom() {
    this.setData({
      getMore: random(20)
    })
    
    console.log(this.data.getMore);
  }
})