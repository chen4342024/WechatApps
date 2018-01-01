//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    houseTypes: [
      { id: '1', text: "不限", label: "房产"},
      { id: '2', text: "供房1~3个月" },
      { id: '3', text: "供房3~6个月" },
      { id: '4', text: "供房6~12个月" },
      { id: '5', text: "供房1~3年" },
      { id: '6', text: "供房3~5年" },
      { id: '7', text: "供房5年以上" },
      { id: '8', text: "房子买断" },
    ],
    carTypes: [
      { id: '1', text: "请选择" },
      { id: '2', text: "供车6~12个月" },
      { id: '3', text: "供车1~3年" },
      { id: '4', text: "车子买断" }
    ],
    policyTypes: [
      { id: '1', text: "请选择" },
      { id: '2', text: "保单3~6个月" },
      { id: '3', text: "保单6~12个月" },
      { id: '4', text: "保单1~2年" },
      { id: '5', text: "保单2~5年" },
      { id: '6', text: "保单5年以上" },
      { id: '7', text: "保单供断" },
    ],
    houseTypesIndex: 0,
    carTypesIndex: 0,
    policyTypesIndex: 0,
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

  houseTypeChange: function (e) {
    this.setData({
      houseTypesIndex: e.detail.value
    });
  },

  carTypeChange: function (e) {
    this.setData({
      carTypesIndex: e.detail.value
    });
  },

  policyTypeChange: function (e) {
    this.setData({
      policyTypesIndex: e.detail.value
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
