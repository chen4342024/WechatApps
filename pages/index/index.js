//index.js
//获取应用实例
const app = getApp();
const api = require('../../utils/api.js');
const globalData = require('../../utils/global.js');

Page({
  data: {
    name: 'andyChen',
    card_number: '445202199105223077',
    address: '租租车',
    phone: '13070238489',

    length: 3,
    houseTypes: globalData.houseInfoEnum,
    houseTypesIndex: 0,

    policyTypes: globalData.policyTypesEnum,
    policyTypesIndex: 0,

    carTypes: globalData.carTypeEnum,
    carTypesIndex: 0,

    pics: [],
    index: 0,
    testImg: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1514490091890&di=5f459c8428321e17cc2f9bb00d72b1a2&imgtype=jpg&src=http%3A%2F%2Fimg2.imgtn.bdimg.com%2Fit%2Fu%3D3191248617%2C1635470861%26fm%3D214%26gp%3D0.jpg"
  },

  bindInputChange: function (e) {
    let name = e.currentTarget.dataset.name;
    this.setData({
      [name]: e.detail.value
    })
  },

  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },

  uploadImage: function () {
    var that = this, pics = this.data.pics;
    wx.chooseImage({
      count: 9 - pics.length, // 最多可以选择的图片张数，默认9
      sizeType: ['original', 'compressed'], // original 原图，compressed 压缩图，默认二者都有
      sourceType: ['album', 'camera'], // album 从相册选图，camera 使用相机，默认二者都有
      success: function (res) {
        var imgsrc = res.tempFilePaths;
        pics = pics.concat(imgsrc);
        that.setData({
          pics: pics
        });
        that.uploadimg();
      },
    })
  },

  uploadimg: function () {//这里触发图片上传的方法
    var pics = this.data.pics;
    const data = {
      filePath: pics[0]
    }
    api.uploadFile(data, function (res) {
      var data = res.data;
      if (res.statusCode !== 200) {
        api.errorHandler(res);
      }
      //do something
    });
  },

  bindPickerChange: function (e) {
    let index = e.currentTarget.dataset.index;
    this.setData({
      [index]: e.detail.value
    });
  },

  onLoad: function () {
    if (!wx.getStorageSync('token')) {
      wx.navigateTo({
        url: '/pages/login/index',
      })
    }
  },

  onSubmit: function (e) {
    let data = {};
    api.postCustomer(data, function (res) {
      console.log(res);
    });
  }
})
