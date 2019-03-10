//index.js
//获取应用实例
const app = getApp();
const globalData = require('../../utils/global.js');
const api = require('../../utils/api.js');
const util = require('../../utils/util.js');
const route = require('../../utils/route.js');
const store = require('../../utils/store.js');

const followUserEmptyEnum = [
  { code: -1, text: "请选择", label: '请选择跟进人' },
];

Page({
  data: {
    house_loan_period: '',
    car_loan_period: '',
    policy_loan_period: '',
    status: '',
    auth_user: '',
    search: '',
    social_security: '',
    accumulation_funds: '',

    houseTypes: globalData.houseInfoEnum,
    houseTypesIndex: 0,

    policyTypes: globalData.policyTypesEnum,
    policyTypesIndex: 0,

    carTypes: globalData.carTypeEnum,
    carTypesIndex: 0,

    followStatus: globalData.followStatus,
    followStatusIndex: 0,

    followPeople: followUserEmptyEnum,
    followPeopleIndex: 0,

    socialSecurity: globalData.socialSecurityTypeEnum,
    socialSecurityIndex: 0,

    accumulationFunds: globalData.accumulationFundsTypeEnum,
    accumulationFundsIndex: 0,

    customerList: [],
    currentPage: 0,
    hasNext: true,
    loadingMore: false
  },

  resetSearchResult: function () {
    this.setData({
      customerList: [],
      currentPage: 0,
      hasNext: true,
      loadingMore: false
    });
  },

  mapCustomerList: function (customerList) {
    return customerList.map((customer) => {
      let { followStatus, houseTypes, policyTypes, carTypes } = this.data;
      let getText = function (code, data) {
        let filterData = globalData.findByCode(code, data);
        return filterData[0] ? filterData[0].text : '';
      }
      let viewCustomer = {
        statusText: getText(customer.status, followStatus)
      }
      return { ...customer, ...viewCustomer }
    });
  },

  //事件处理函数
  bindInputChange: function (e) {
    let name = e.currentTarget.dataset.name;
    this.setData({
      [name]: e.detail.value
    });
  },

  bindSearch: function (e) {
    let value = e.detail.value;
    this.resetSearchResult();
    this.getCustomer();
  },

  bindDeleteSearch: function () {
    this.setData({
      search: ''
    });
    this.resetSearchResult();
    this.getCustomer();
  },

  bindPickerChange: function (e) {
    let rangeStr = e.currentTarget.dataset.range;
    let name = e.currentTarget.dataset.name;
    let range = this.data[rangeStr];
    this.setData({
      [`${rangeStr}Index`]: e.detail.value,
      [name]: range[e.detail.value].code
    });
    this.resetSearchResult();
    this.getCustomer();
  },

  onReady: function () {
    console.log("index page onReady");
    this.setData({
      globalToken: store.get('token')
    });
  },


  onShow: function () {
    let storeToken = store.get('token');
    let isSameUser = storeToken === this.data.globalToken;
    let param = route.getParam();

    if (!isSameUser) {
      this.data.globalToken = storeToken;
    }

    if (!isSameUser || param.refresh) {
      route.resetParam();
      this.resetSearchResult();
      this.getCustomer();
      this.getFollowUser();
    }
    console.log("index page show");
  },

  onHide: function () {
    console.log("index page hide");
  },

  // onLoad: function () {
  //   this.getCustomer();
  // },

  getFollowUser: function () {
    api.getFollowUser((res) => {
      if (res.status === 0) {
        this.setData({
          followPeople: this.mapFollowUser(res.data)
        });
      } else {
        util.showError(res.message);
      }
    });
  },

  mapFollowUser: function (data) {
    if (data) {
      let list = data.map((user) => {
        return { code: user._id, text: user.name };
      });
      return [...followUserEmptyEnum, ...list];
    }
    return followUserEmptyEnum;
  },

  getCustomer: function () {
    let {
      search, currentPage, house_loan_period, car_loan_period,
      policy_loan_period, status, auth_user, social_security, accumulation_funds
    } = this.data;
    let query = {
      currentPage: currentPage,
    }
    if (house_loan_period && house_loan_period != '-1') {
      query.house_loan_period = house_loan_period;
    }
    if (car_loan_period && car_loan_period != '-1') {
      query.car_loan_period = car_loan_period;
    }
    if (policy_loan_period && policy_loan_period != '-1') {
      query.policy_loan_period = policy_loan_period;
    }

    if (status && status != '-1') {
      query.status = status;
    }

    if (auth_user && auth_user != '-1') {
      query.auth_user = auth_user;
    }

    if (social_security && social_security != '-1') {
      query.social_security = social_security;
    }

    if (accumulation_funds && accumulation_funds != '-1') {
      query.accumulation_funds = accumulation_funds;
    }

    if (search && search.length > 0) {
      query.search = search;
    }
    this.setData({
      loadingMore: true
    });
    api.getCustomer(query, (res) => {
      if (res.status === 0) {
        let pagination = res.data.pagination;
        this.setData({
          customerList: this.mapCustomerList([...this.data.customerList, ...res.data.data]),
          currentPage: pagination.currentPage + 1,
          hasNext: (pagination.currentPage * pagination.pageSize < pagination.total)
        });
      } else {
        util.showError(res.message);
      }
      this.setData({
        loadingMore: false
      });
    });
  },


  onReachBottom: function (event) {
    console.log("onReachBottom");
    let { loadingMore, hasNext } = this.data;
    if (!loadingMore && hasNext) {
      this.getCustomer();
    }
  },
})
