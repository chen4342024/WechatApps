//index.js
//获取应用实例
const app = getApp();
const api = require('../../utils/api.js');
const util = require('../../utils/util.js');
const route = require('../../utils/route.js')



Page({
  data: {
    isDev: false
  },

  onLoad: function () {
    this.setData({
      isDev: api.isDev()
    });
  },

  onShow: function () {

  }

})
