//index.js
//获取应用实例
const app = getApp();
const api = require('../../utils/api.js');

function noop() { };

Page({
  data: {
    old_password: '',
    password: '',
    confirm_password: '',
    toastContent: '',
    submitLoading: false,
  },
  //事件处理函数
  bindViewTap: function () {

  },

  bindInputChange: function (e) {
    let name = e.currentTarget.dataset.name;
    this.setData({
      [name]: e.detail.value
    })
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


  validate: function () {
    let { old_password, password, confirm_password } = this.data;
    if (old_password.length === 0) {
      return { result: false, error: '请输入旧密码' };
    }
    if (password.length === 0) {
      return { result: false, error: '请输入新密码' };
    }
    if (confirm_password.length === 0) {
      return { result: false, error: '请确认新密码' };
    }
    if (password !== confirm_password) {
      return { result: false, error: '两次输入密码不一致' };
    }
    return { result: true };
  },

  bindSubmit: function () {
    let validate = this.validate();

    if (validate.result) {
      let { old_password, password } = this.data;
      let data = { old_password, password };
      this.setData({ submitLoading: true });
      api.changePassword(data, (res) => {
        this.setData({ submitLoading: false });
        if (res.status === 0) {
          this.showMsg("修改成功，请重新登录", 2000, () => {
            wx.removeStorageSync('token');
            wx.navigateTo({
              url: '/pages/login/index',
            });
          });
        } else {
          this.showMsg(res.message);
        }
      });
    } else {
      this.showMsg(validate.error);
    }
  },

  showMsg: function (msg, delay = 2000, callback = noop) {
    this.setData({
      toastContent: msg
    });
    setTimeout(() => {
      this.setData({
        toastContent: ""
      });
      callback();
    }, delay)
    // wx.showModal({
    //   title: '错误提示',
    //   content: msg,
    //   showCancel: false,
    //   confirmText: '我知道了',
    //   confirmColor: '#ff784b',
    //   success: function (res) {
    //     if (res.confirm) {
    //       console.log('用户点击确定')
    //     } else if (res.cancel) {
    //       console.log('用户点击取消')
    //     }
    //   }
    // });
  }
})
