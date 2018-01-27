//index.js
//获取应用实例
const app = getApp();
const globalData = require('../../utils/global.js');

Page({
  data: {
    house_loan_period: '',
    car_loan_period: '',
    policy_loan_period: '',

    houseTypes: globalData.houseInfoEnum,
    houseTypesIndex: 0,

    policyTypes: globalData.policyTypesEnum,
    policyTypesIndex: 0,

    carTypes: globalData.carTypeEnum,
    carTypesIndex: 0,

    customerList: [
      { id: '1', name: 'andy chen', status: '跟进中' },
      { id: '2', name: 'andy chen', status: '已约见' },
      { id: '3', name: 'andy chen', status: '洽谈中' },
      { id: '4', name: 'andy chen', status: '跟进中' },
      { id: '5', name: 'andy chen', status: '已约见' },
      { id: '6', name: 'andy chen', status: '已约见' },
      { id: '7', name: 'andy chen', status: '洽谈中' },
      { id: '8', name: 'andy chen', status: '跟进中' },
      { id: '9', name: 'andy chen', status: '跟进中' }
    ]
  },
  //事件处理函数
  bindchange: function (e) {
    console.log(e);
  },

  bindPickerChange: function (e) {
    let rangeStr = e.currentTarget.dataset.range;
    let name = e.currentTarget.dataset.name;
    let range = this.data[rangeStr];
    this.setData({
      [`${rangeStr}Index`]: e.detail.value,
      [name]: range[e.detail.value].code
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


  },


  
  onReachBottom: function (event) {
    console.log("onReachBottom");
    this.getMoreCustomer();
  },

  getMoreCustomer: function () {
    let newCustomerlist = this.data.customerList;
    newCustomerlist.push({ id: '10', name: 'andy chen2222', status: '跟进中' })
    this.setData({
      customerList: newCustomerlist
    });
  },

})
