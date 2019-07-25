// components/articleList/cmp.js

const app = getApp()
import {
  IndexModel
} from "../../models/index.js"
import {
  random
} from "../../utils/random.js"
const indexModel = new IndexModel();
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    articleList: {
      type: Array,
      value: [],
      observer() {
        type: Array
      }
    },
    more: {
      type: String,
      value: '',
      observer: 'loadMore'
    },
    magazineId: Number
  },
  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    loadMore() {
      const magazineId = this.data.magazineId;
      const start = this.data.articleList.length;
      console.log(magazineId,start);
      indexModel.getArticleList(magazineId, start).then(res => {
        let combineList = this.data.articleList.concat(res);
        this.setData({
          articleList: combineList
        })
      })
    }
  }
})