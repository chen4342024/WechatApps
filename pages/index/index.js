//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    length: 3,
    objectArray: [
      { id: 5, unique: 'unique_5' },
      { id: 4, unique: 'unique_4' },
      { id: 3, unique: 'unique_3' },
      { id: 2, unique: 'unique_2' },
      { id: 1, unique: 'unique_1' },
      { id: 0, unique: 'unique_0' },
    ],
    array: ['请选择', '美国', '中国', '巴西', '日本'],
    pics: [],
    index: 0,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    testImg: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1514490091890&di=5f459c8428321e17cc2f9bb00d72b1a2&imgtype=jpg&src=http%3A%2F%2Fimg2.imgtn.bdimg.com%2Fit%2Fu%3D3191248617%2C1635470861%26fm%3D214%26gp%3D0.jpg"
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
    wx.uploadFile({
      url: 'http://127.0.0.1:7002/api/v1/upload',//这里是你图片上传的接口
      filePath: pics[0],//这里是选取的图片的地址数组
      name: 'file',
      formData: {
        'user': 'test'
      },
      success: function (res) {
        var data = res.data
        //do something
      }
    });
  },

  onReady: function () {
    console.log("index page onReady");
  },
  onShow: function () {
    console.log("index page show");
  },
  onHide: function () {
    console.log("index page hide");
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
