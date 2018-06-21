//index.js
//获取应用实例
const app = getApp();
const api = require('../../utils/api.js');
const util = require('../../utils/util.js');
const route = require('../../utils/route.js')
const globalData = require('../../utils/global.js');
const validateUtil = require('../../utils/validate.js')
const UploadItem = require('../../components/UploadItem/item.js');

// 默认的数据
let defaultData = {
  _id: -1,
  name: '',
  card_number: '',
  company_address: '',
  phone: '',
  remark: '',
  house_loan_period: '',
  car_loan_period: '',
  policy_loan_period: '',
  status: 1,
  lending_date: '',
  lending_period: '',

  credit_pictures: [],
  house_pictures: [],
  car_pictures: [],
  policy_pictures: [],

  houseTypesIndex: 0,
  policyTypesIndex: 0,
  carTypesIndex: 0,
  followStatusIndex: 0,
  lendingPeriodTypesIndex: 0,


  validateMessage: {},
  validateStatus: {},
};

Page({
  data: {
    _id: -1,
    name: '',
    card_number: '',
    company_address: '',
    phone: '',
    remark: '',
    house_loan_period: '',
    car_loan_period: '',
    policy_loan_period: '',
    credit_pictures: [],
    house_pictures: [],
    car_pictures: [],
    policy_pictures: [],
    status: 1,
    lending_date: '',
    lending_period: '',
    social_security: '',
    accumulation_funds: '',
    channel_number: '',
    business_license: '',

    followStatus: globalData.followStatus,
    followStatusIndex: 0,
    followStatusFunded: globalData.followStatusCode.FUNDED,

    houseTypes: globalData.houseInfoEnum,
    houseTypesIndex: 0,

    policyTypes: globalData.policyTypesEnum,
    policyTypesIndex: 0,

    lendingPeriodTypes: globalData.lendingPeriodTypesEnum,
    lendingPeriodTypesIndex: 0,

    carTypes: globalData.carTypeEnum,
    carTypesIndex: 0,

    businessLicenseTypes: globalData.businessLicenseTypeEnum,
    businessLicenseTypesIndex: 0,

    socialSecurityTypes: globalData.socialSecurityTypeEnum,
    socialSecurityTypesIndex: 0,

    accumulationFundsTypes: globalData.accumulationFundsTypeEnum,
    accumulationFundsTypesIndex: 0,

    validateConfig: {},
    validateMessage: {},
    validateStatus: {},
  },

  onLoad: function (options) {
    if (!wx.getStorageSync('token')) {
      wx.navigateTo({
        url: '/pages/login/index',
      });
    }
    this.initValidate();
    if (options.id && options.id.length > 0) {
      this.getCustomerById(options.id);
    }
  },
  getCustomerById: function (id) {
    wx.showLoading({ mask: true, title: "加载中" });
    api.getCustomerById(id, (res) => {
      wx.hideLoading();
      if (res.status === 0) {
        this.setDataByCustomer(res.data);
      } else {
        util.showError(res.message);
      }
    });
  },

  setDataByCustomer: function (customer) {
    let {
      followStatus,
      houseTypes, policyTypes, carTypes, lendingPeriodTypes,
      businessLicenseTypes, socialSecurityTypes, accumulationFundsTypes
    } = this.data;

    let { _id, name, card_number, company_address, phone, remark,
      house_loan_period, car_loan_period, policy_loan_period,
      house_pictures, car_pictures, policy_pictures, credit_pictures, status, lending_date, lending_period,
      business_license, social_security, accumulation_funds, channel_number
    } = customer;
    this.setData({
      _id, name, card_number, company_address, phone, remark, channel_number,
      house_loan_period, car_loan_period, policy_loan_period, social_security,
      accumulation_funds,
      channel_number,
      business_license,
      status,
      lending_date: lending_date ? util.formatDate(new Date(lending_date)) : '',
      lending_period: lending_period || '',
      house_pictures: this.mapUploadItem(house_pictures),
      credit_pictures: this.mapUploadItem(credit_pictures),
      car_pictures: this.mapUploadItem(car_pictures),
      policy_pictures: this.mapUploadItem(policy_pictures),
      followStatusIndex: globalData.findIndex(status, followStatus),
      houseTypesIndex: globalData.findIndex(house_loan_period, houseTypes),
      policyTypesIndex: globalData.findIndex(policy_loan_period, policyTypes),
      carTypesIndex: globalData.findIndex(car_loan_period, carTypes),
      lendingPeriodTypesIndex: globalData.findIndex(lending_period, lendingPeriodTypes),
      businessLicenseTypesIndex: globalData.findIndex(business_license, businessLicenseTypes),
      socialSecurityTypesIndex: globalData.findIndex(social_security, socialSecurityTypes),
      accumulationFundsTypesIndex: globalData.findIndex(accumulation_funds, accumulationFundsTypes),
    });
  },

  mapUploadItem: function (itemList) {
    return itemList.map((hash) => {
      let item = new UploadItem({
        imgSrc: api.getPictureUrl(hash)
      });
      item.done(hash);
      return item;
    });
  },


  // 绑定input改变事件
  bindInputChange: function (e) {
    let name = e.currentTarget.dataset.name;
    this.setData({
      [name]: e.detail.value
    })
  },

  //上传图片
  uploadImage: function (e) {
    let container = e.currentTarget.dataset.container;
    let itemList = this.data[container] || [];
    var that = this;
    wx.chooseImage({
      count: 9 - itemList.length, // 最多可以选择的图片张数，默认9
      sizeType: ['compressed'], // original 原图，compressed 压缩图，默认二者都有
      sourceType: ['album', 'camera'], // album 从相册选图，camera 使用相机，默认二者都有
      success: function (res) {
        var imgsrcList = res.tempFilePaths;
        that.uploadimg(container, imgsrcList);
      },
    })
  },

  //绑定图片删除
  bindItemDelete: function (e) {
    console.log(e);
    let container = e.currentTarget.dataset.container;
    let itemList = this.data[container] || [];
    let data = e.detail.data;
    itemList = itemList.filter((currentValue, index, arr) => {
      return currentValue.key !== data.uploadItem.key;
    });
    this.setData({
      [container]: itemList
    });
  },

  //上传图片
  uploadimg: function (container = '', imgSrcList = []) {//这里触发图片上传的方法

    let itemList = this.data[container] || [];
    for (let imgSrc of imgSrcList) {

      let uploadItem = new UploadItem({ imgSrc: imgSrc });
      itemList.push(uploadItem);
      this.setData({
        [container]: itemList
      });
      const data = {
        filePath: imgSrc
      }
      let uploadTask = api.uploadFile(data, (res) => {
        var data = JSON.parse(res.data);
        if (res.statusCode === 200) {
          uploadItem.done(data.hash);
          this.setData({
            [container]: itemList
          });
        } else {
          uploadItem.fail();
          this.setData({
            [container]: itemList
          });
          api.errorHandler(res);
        }
      }, (res) => {
        uploadItem.fail();
        this.setData({
          [container]: itemList
        });
        api.errorHandler(res);
      });

      uploadTask.onProgressUpdate((res) => {
        uploadItem.uploading(res.progress)
        this.setData({
          [container]: itemList
        });
        console.log('上传进度', res.progress)
        console.log('已经上传的数据长度', res.totalBytesSent)
        console.log('预期需要上传的数据总长度', res.totalBytesExpectedToSend)
      });
    }
  },

  // 图片预览
  previewImage: function (e) {
    let dataSet = e.currentTarget.dataset;
    let container = dataSet.container;
    let itemList = this.data[container] || [];
    let item = dataSet.item;
    let urls = itemList.map((uploadItem) => {
      return uploadItem.imgSrc;
    });
    wx.previewImage({
      current: item.imgSrc, // 当前显示图片的http链接
      urls: urls // 需要预览的图片http链接列表
    });
  },

  //绑定picker改变事件
  bindPickerChange: function (e) {
    let rangeStr = e.currentTarget.dataset.range;
    let name = e.currentTarget.dataset.name;
    let range = this.data[rangeStr];
    this.setData({
      [`${rangeStr}Index`]: e.detail.value,
      [name]: range[e.detail.value].code
    });
    let { validateConfig } = this.data;
    let configList = validateConfig[name];
    if (configList) {
      let result = validateUtil.validate(configList, range[e.detail.value].code);
      this.handleValidateResult(name, result);
    }
  },

  bindDateChange: function (e) {
    let name = e.currentTarget.dataset.name;
    this.setData({
      [name]: e.detail.value
    });
  },


  //验证表单
  validate: function () {
    let allPass = true;
    let { validateConfig } = this.data;
    for (let key of Object.keys(validateConfig)) {
      let value = this.data[key];
      let configlist = validateConfig[key];
      let result = validateUtil.validate(configlist, value);
      if (!result.validate) {
        allPass = false;
      }
      this.handleValidateResult(key, result);
    }
    return allPass;
  },

  //处理表单验证的结果
  handleValidateResult: function (name, result) {
    let { validateMessage, validateStatus } = this.data;
    if (result.validate) {
      validateMessage[name] = '';
      validateStatus[name] = '';
    } else {
      validateMessage[name] = result.msg;
      validateStatus[name] = 'error';
    }
    this.setData({
      validateMessage,
      validateStatus
    });
  },

  // 绑定input失去焦点
  bindInputBlur: function (e) {
    let { validateConfig } = this.data;
    let value = e.detail.value;
    let name = e.currentTarget.dataset.name;
    let configList = validateConfig[name];
    if (configList) {
      let result = validateUtil.validate(configList, value);
      this.handleValidateResult(name, result);
    }
  },

  // 绑定input聚焦
  bindInputFocus: function (e) {
    let value = e.detail.value;
    let name = e.currentTarget.dataset.name;
    let { validateStatus } = this.data;
    validateStatus[name] = 'focus';
    this.setData({
      validateStatus
    });
  },

  // 初始化表单的验证规则
  initValidate: function () {
    let { validateConfig } = this.data;
    validateConfig['name'] = [
      { validate: validateUtil.required, msg: "请输入姓名" }
    ];
    validateConfig['card_number'] = [
      { validate: validateUtil.required, msg: "请输入身份证" }
    ];
    validateConfig['company_address'] = [
      { validate: validateUtil.required, msg: "请输入工作单位" },
    ];
    validateConfig['phone'] = [
      { validate: validateUtil.required, msg: "请输入联系方式" },
    ];
    validateConfig['lending_date'] = [
      {
        validate: this.checkFundedRequire.bind(this), msg: "请选择放款时间"
      },
    ];
    validateConfig['lending_period'] = [
      {
        validate: this.checkPeriodRequire.bind(this), msg: "请选择放款期数"
      },
    ];
  },

  checkFundedRequire(value = "") {
    let { followStatusIndex, followStatusFunded } = this.data;
    return followStatusIndex != followStatusFunded || value.length > 0;
  },

  checkPeriodRequire(value = "") {
    let { followStatusIndex, followStatusFunded } = this.data;
    return followStatusIndex != followStatusFunded || value != '-1';
  },


  // 获取图片item的hash值以便提交
  getUploadItemHashList(itemList = []) {
    itemList = itemList.filter((item) => {
      return item.status === UploadItem.STATUS.done;
    })
    return itemList.map((item) => {
      return item.hash;
    })
  },

  //滚动到第一个错误的位置
  scrollToFirstError: function () {
    let { validateStatus, validateConfig } = this.data;
    for (let key of Object.keys(validateConfig)) {
      if (validateStatus[key] && validateStatus[key] === 'error') {
        util.scrollTo(`.J-form-${key}`);
        return;
      }
    }
  },

  isAllPictureDone() {
    let { credit_pictures = [], house_pictures = [], car_pictures = [], policy_pictures = [] } = this.data;
    let pictureList = [...credit_pictures, ...house_pictures, ...car_pictures, ...policy_pictures];
    let unDonePictures = pictureList.filter((item) => {
      return item.status !== UploadItem.STATUS.done;
    });
    return unDonePictures.length === 0;
  },

  // 提交表单
  onSubmit: function (e) {
    if (!this.validate()) {
      this.scrollToFirstError();
      return;
    }
    if (!this.isAllPictureDone()) {
      util.showConfirm("有些图片未上传完成，确定提交 ？", (res) => {
        if (res.confirm) {
          this.postSubmit();
        }
      });
    } else {
      this.postSubmit();
    }
  },

  postSubmit: function () {
    let data = {
      name: this.data.name,
      card_number: this.data.card_number,
      company_address: this.data.company_address,
      phone: this.data.phone,
      remark: this.data.remark,
      social_security: this.data.social_security,
      accumulation_funds: this.data.accumulation_funds,
      channel_number: this.data.channel_number,
      business_license: this.data.business_license,

      house_loan_period: this.data.house_loan_period,
      car_loan_period: this.data.car_loan_period,
      policy_loan_period: this.data.policy_loan_period,
      credit_pictures: this.getUploadItemHashList(this.data.credit_pictures),
      house_pictures: this.getUploadItemHashList(this.data.house_pictures),
      car_pictures: this.getUploadItemHashList(this.data.car_pictures),
      policy_pictures: this.getUploadItemHashList(this.data.policy_pictures),
      status: this.data.status,
      lending_date: this.data.lending_date,
      lending_period: this.data.lending_period
    };

    if (this.data._id && this.data._id.length > 0) {
      data._id = this.data._id;
      let self = this;
      // 修改客户信息
      api.putCustomer(data, function (res) {
        console.log(res);
        if (res.status === 0) {
          util.showAlert('修改客户信息成功', function () {
            self.setData({ ...defaultData });
            route.goBackAndRefresh();
          });
        } else {
          util.showError(res.message);
        }
      });
    } else {
      let self = this;
      // 添加客户信息
      api.postCustomer(data, function (res) {
        console.log(res);
        if (res.status === 0) {
          util.showAlert('恭喜你，提交信息成功', function () {
            self.setData({ ...defaultData });
            route.goCustomerAndRefresh();
          });
        } else {
          util.showError(res.message);
        }
      });
    }
  }
})
