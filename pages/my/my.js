//index.js
//获取应用实例
const app = getApp();
const api = require('../../utils/api.js');
const util = require('../../utils/util.js');
const route = require('../../utils/route.js')
const jwtDecode = require('../../libs/jwt/index.js');
const globalData = require('../../utils/global.js');
const store = require('../../utils/store.js');

Page({
  data: {
    userInfo: {},
    genderEnum: globalData.genderEnum
  },

  onLoad: function () {
    // this.getUserInfo();
  },

  onShow: function () {
    this.getUserInfo();
  },

  refreshUser(user) {
    let genderObj = globalData.findByCode(user.gender, globalData.genderEnum)
    let mapUser = {
      genderText: genderObj[0] ? genderObj[0].text : '',
      birthText: util.formatDate(new Date(user.birth)),
      companyText: user.organzation ? user.organzation.name : "无"
    }
    this.setData({
      userInfo: { ...user, ...mapUser }
    });
  },

  getUserInfo: function () {
    let token = store.get('token');
    let userInfo = store.get('userInfo');
    if (token && userInfo) {
      this.refreshUser(userInfo);
      return;
    }

    let decoded;
    let validUserId;

    if (token) {
      decoded = jwtDecode(token);
      validUserId = decoded.user_id && decoded.user_id.length > 0;
    }

    if (!token || !validUserId) {
      wx.navigateTo({
        url: '/pages/login/index',
      });
      return {};
    }

    wx.showLoading({
      title: '加载中...',
    });
    api.getUserById(decoded.user_id, (res) => {
      wx.hideLoading();
      if (res.status === 0) {
        let user = res.data;
        this.refreshUser(user);
        store.set('userInfo', user, 1 * store.MINUTE);
      } else {
        this.showError(res.message);
      }
    });
  },

  bindChangePassword: function () {
    wx.navigateTo({
      url: '/pages/change_password/change_password',
    })
  },

  bindLogout: function () {
    try {
      this.clearCache();
      wx.navigateTo({
        url: '/pages/login/index',
      });
    } catch (e) {
      console.log(e);
    }
  },

  //删除跟用户有关的信息
  clearCache: function () {
    store.remove('token');
    store.remove('userInfo');
  },
})
