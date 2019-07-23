//index.js
//获取应用实例
const app = getApp()
import {
  IndexModel
} from "../../models/index.js"

const indexModel = new IndexModel();
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function() {
    this.getData();
  },
  getData() {
    const articleList = indexModel.getArticleList();
    const markList = indexModel.getMarkList();
    const recommendList = indexModel.getRecommendInfo()
    Promise.all([articleList, markList, recommendList]).then(res => {
      console.log(res[0], res[1], res[2]);
    })
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})