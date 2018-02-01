const util = require('../../utils/util.js');
const api = require('../../utils/api.js');
const globalData = require('../../utils/global.js');
const route = require('../../utils/route.js');
//获取应用实例
const app = getApp()

Page({
  data: {
    customer: {},

    followStatus: globalData.followStatus,
    houseTypes: globalData.houseInfoEnum,
    policyTypes: globalData.policyTypesEnum,
    carTypes: globalData.carTypeEnum,
    id: 0,

  },

  mapCustomer: function (customer) {
    let {
      followStatus,
      houseTypes, policyTypes, carTypes
     } = this.data;
    let getText = function (code, data) {
      let filterData = globalData.findByCode(code, data);
      return filterData[0] ? filterData[0].text : '';
    }
    let viewCustomer = {
      statusText: getText(customer.status, followStatus),
      houceLoanPeriodText: getText(customer.house_loan_period, houseTypes),
      carLoanPeriodText: getText(customer.car_loan_period, carTypes),
      policyLoanPeriodText: getText(customer.policy_loan_period, policyTypes),
      housePicturesUrl: this.getUrl(customer.house_pictures),
      carPicturesUrl: this.getUrl(customer.car_pictures),
      policyPicturesUrl: this.getUrl(customer.policy_pictures),
    }
    return { ...customer, ...viewCustomer }
  },

  getUrl: function (hashs = []) {
    return hashs.map((hash) => {
      return api.getPictureUrl(hash);
    });
  },


  onReady: function () {
    console.log("index page onReady");
  },

  onShow: function () {
    let param = route.getParam();
    if (param.refresh) {
      route.resetParam();
      this.getCustomerById();
    }
  },
  onHide: function () {
    console.log("index page hide");
  },

  onLoad: function (options) {
    this.setData({
      id: options.id
    });
    this.getCustomerById();
  },

  getCustomerById: function (res) {
    let id = this.data.id;
    api.getCustomerById(id, (res) => {
      if (res.status === 0) {
        this.setData({
          customer: this.mapCustomer({ ...this.data.customer, ...res.data }),
        });
      } else {
        util.showError(res.message);
      }
    });
  },

  previewImage: function (event) {
    let dataSet = event.currentTarget.dataset;
    let item = dataSet.item;
    let urls = dataSet.pictures;
    wx.previewImage({
      current: item, // 当前显示图片的http链接
      urls: urls // 需要预览的图片http链接列表
    })
  },

  bindEdit: function () {
    let id = this.data.customer._id;
    wx.navigateTo({
      url: `/pages/customer_edit/customer_edit?id=${id}`,
    })
  },

  bindDelete: function () {
    let self = this;
    wx.showModal({
      title: '删除确认',
      content: '您确定要删除该客户吗？',
      success: function (res) {
        if (res.confirm) {
          console.log(res);
          self.deleteCustomer();
        }
      }
    })
  },

  deleteCustomer: function () {
    let id = this.data.customer._id;
    api.deleteCustomerById(id, (res) => {
      if (res.status === 0) {
        util.showAlert('删除成功', function () {
          route.goCustomerAndRefresh();
        });
      } else {
        util.showError(res.message);
      }
    });
  }
})
