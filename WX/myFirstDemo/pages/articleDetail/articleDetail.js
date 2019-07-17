// pages/articleDetail/articleDetail.js
let request = require('../utils/request.js');
let audio = wx.getBackgroundAudioManager();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    coverHidden: true,
    articleDetail: {},
    coverHidden: true,
    playing: false,
    audioCurTime: 0,
    progressPercent: 0,
    progressCircleLeft: 0,
    progressWidth: 520,
    audioCirclrOrigionX: 0,
    audioDuration: 0,
    originFlag: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getData(options.id);


  },
  hiddenVideoCover(e) {
    console.log(e);
    this.setData({
      coverHidden: false,
    });
    var myVideo = wx.createVideoContext('myVideo');
    myVideo.play();
  },
  audioplay() {
    audio.src = "http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E06DCBDC9AB7C49FD713D632D313AC4858BACB8DDD29067D3C601481D36E62053BF8DFEAF74C0A5CCFADD6471160CAF3E6A&fromtag=46";
    audio.title = "人生";
    this.listenAudioPlay();
    this.upDataAudioDate();
  },
  onAudioPlayTap() {
    audio.title = "人生";
    var playing = this.data.playing;
    if (playing) {
      audio.pause()
    } else {
      this.audioplay();
      this.listenAudioPlay();
      this.upDataAudioDate();
    }

    this.setData({
      playing: !playing,
    });


  },
  listenAudioPlay() {
    let that = this;
    audio.onPause(function() {
      that.setData({
        playing: false
      })
    });

    audio.onStop(function() {
      that.setData({
        playing: false
      })
    });

    audio.onEnded(function() {
      that.setData({
        playing: false
      })
    });

    audio.onPlay(function() {
      that.setData({
        playing: true
      })
    })
  },
  upDataAudioDate() {
    let that = this;
    let audioDuration = this.data.articleDetail.audio.duration;

    audio.onTimeUpdate(function() {
      let audioCurTime = audio.currentTime.toFixed()
      let percent = audioCurTime / audioDuration
      let progressPercent = percent * 100
      let progressCircleLeft = percent * that.data.progressWidth
      that.setData({
        audioCurTime: audioCurTime,
        progressPercent: progressPercent,
        progressCircleLeft: progressCircleLeft,
      })
    })

  },
  getData(id) {
    let that = this;
    request({
      url: 'getArticleDetail/' + id,
      success: res => {
        that.setData({
          articleDetail: res
        })

      }
    })
  },

  onAudioCircleStart(e) {
    if (this.data.originFlag) {
      var audioCirclrOrigionX = e.touches[0].pageX * this.getPhoneRadio();
      this.setData({
        audioCirclrOrigionX: audioCirclrOrigionX,
        originFlag: false
      })
    }

  },
  onAudioCircleMove(e) {
    var audioCirclrOrigionX = this.data.audioCirclrOrigionX;
    var audioCircleMoveX = e.touches[0].pageX * this.getPhoneRadio();
    var progressCircleLeft = audioCircleMoveX - audioCirclrOrigionX;
    if (progressCircleLeft <= 0) {
      progressCircleLeft = 0;
    } else if (progressCircleLeft > this.data.progressWidth) {
      progressCircleLeft = this.data.progressWidth;
    }
    var progressPercent = progressCircleLeft / this.data.progressWidth * 100
    var audioCurTime = (progressPercent * this.data.articleDetail.audio.duration / 100).toFixed();
    this.audioplay();
    audio.seek(Number(audioCurTime))
    this.setData({
      progressCircleLeft: progressCircleLeft,
      progressPercent: progressPercent,
      audioCurTime: audioCurTime
    })
  },
  getPhoneRadio: function() {
    var radio = 0
    wx.getSystemInfo({
      success: function(res) {
        var width = res.screenWidth;
        radio = 750 / width
      }
    })
    return radio;
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