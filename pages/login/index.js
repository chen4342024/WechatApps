//index.js
//获取应用实例
const app = getApp();
const api = require('../../utils/api.js');
const store = require('../../utils/store.js');

Page({
  data: {
    userName: '',
    password: ''

  },
  //事件处理函数
  bindViewTap: function () {

  },


  onReady: function () {
    console.log("login page onReady");
  },
  onShow: function () {
    console.log("login page show");
  },
  onHide: function () {
    console.log("login page hide");
  },
  onLoad: function () {

  },

  bindUserNameInput: function (e) {
    this.setData({
      userName: e.detail.value
    })
  },
  bindPasswordInput: function (e) {
    this.setData({
      password: e.detail.value
    })
  },

  validate: function () {
    let { userName, password } = this.data;
    if (userName.length === 0) {
      return { result: false, error: '请输入账号' };
    }
    if (password.length === 0) {
      return { result: false, error: '请输入密码' };
    }
    return { result: true };
  },

  onSubmitLogin: function () {
    let validate = this.validate();
    if (validate.result) {
      let { userName, password } = this.data;
      let data = { userName, password };
      api.accountLogin(data,(res)=>{
        if(res.status === 0){
          let token = res.data.token;
          wx.setStorageSync('token', token);
          wx.navigateBack();
          wx.switchTab({
            url: '/pages/index/index'
          })
        }else{
          this.showError(res.message);
        }
      });
    } else {
      this.showError(validate.error);
    }
  },

  
  showError: function (msg) {
    wx.showModal({
      title: '错误提示',
      content: msg,
      showCancel: false,
      confirmText: '我知道了',
      confirmColor: '#ff784b',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    });
  }

})
