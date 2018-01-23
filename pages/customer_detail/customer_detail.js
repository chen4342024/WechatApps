
//获取应用实例
const app = getApp()

Page({
  data: {
    testImgs: [
      "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1514490091890&di=5f459c8428321e17cc2f9bb00d72b1a2&imgtype=jpg&src=http%3A%2F%2Fimg2.imgtn.bdimg.com%2Fit%2Fu%3D3191248617%2C1635470861%26fm%3D214%26gp%3D0.jpg",
      "https://mp.weixin.qq.com/debug/wxadoc/dev/image/cat/6.png?t=20171227",
      "https://mp.weixin.qq.com/debug/wxadoc/dev/image/cat/6.png?t=20171227",
    ]
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
  onLoad: function (options) {
    this.setData({
      title: options.title
    })
  },

  previewImage:function(event){
    let dataSet = event.currentTarget.dataset;
    let item = dataSet.item;
    wx.previewImage({
      current: item, // 当前显示图片的http链接
      urls: this.data.testImgs // 需要预览的图片http链接列表
    })
  }
  

})
