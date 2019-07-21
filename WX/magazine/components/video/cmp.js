// components/video/cmp.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    src: String,
    poster: String,
    duration: String,
    mainTitle: String,
    videoId: String
  },

  /**
   * 组件的初始数据
   */
  data: {
    showPoster: true,
  },
  lifetimes: {
    attached() {
      this._getVedioInfo();
    },
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onPlay() {
      this._toggleVideoPoster();
      this.video.play();
    },
    onMaskTap() {
      this._toggleVideoPoster();
      this.video.seek(0);
      this.video.stop();
    },
    onVedioEnd() {
      this._toggleVideoPoster();
    },
    _getVedioInfo() {
      const id = this.properties.videoId;
      this.video = wx.createVideoContext(id, this)
    },
    _toggleVideoPoster() {
      this.setData({
        showPoster: !this.data.showPoster
      })
    },
  }
})