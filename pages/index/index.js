//index.js
//获取应用实例
const app = getApp();
const api = require('../../utils/api.js');
const util = require('../../utils/util.js');
const globalData = require('../../utils/global.js');
const validateUtil = require('../../utils/validate.js')
const UploadItem = require('../../components/UploadItem/item.js');

let defaultData = {
  name: '',
  card_number: '',
  address: '',
  phone: '',
  house_loan_period: '',
  car_loan_period: '',
  policy_loan_period: '',
  house_pictures: [],
  car_pictures: [],
  policy_pictures: [],

  houseTypesIndex: 0,
  policyTypesIndex: 0,
  carTypesIndex: 0,

  validateConfig: {},
  validateMessage: {},
  validateStatus: {},
};

Page({
  data: {
    name: '陈佳佳',
    card_number: '4452021991052223000',
    address: '租租车',
    phone: '13070238489',
    house_loan_period: '',
    car_loan_period: '',
    policy_loan_period: '',
    house_pictures: [],
    car_pictures: [],
    policy_pictures: [],

    houseTypes: globalData.houseInfoEnum,
    houseTypesIndex: 0,

    policyTypes: globalData.policyTypesEnum,
    policyTypesIndex: 0,

    carTypes: globalData.carTypeEnum,
    carTypesIndex: 0,

    validateConfig: {},
    validateMessage: {},
    validateStatus: {},

    pics: ["https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1514490091890&di=5f459c8428321e17cc2f9bb00d72b1a2&imgtype=jpg&src=http%3A%2F%2Fimg2.imgtn.bdimg.com%2Fit%2Fu%3D3191248617%2C1635470861%26fm%3D214%26gp%3D0.jpg"],
    testImg: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1514490091890&di=5f459c8428321e17cc2f9bb00d72b1a2&imgtype=jpg&src=http%3A%2F%2Fimg2.imgtn.bdimg.com%2Fit%2Fu%3D3191248617%2C1635470861%26fm%3D214%26gp%3D0.jpg"
  },

  bindInputChange: function (e) {
    let name = e.currentTarget.dataset.name;
    this.setData({
      [name]: e.detail.value
    })
  },

  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },

  uploadImage: function (e) {
    let container = e.currentTarget.dataset.container;

    var that = this, pics = this.data.pics;
    wx.chooseImage({
      count: 9 - pics.length, // 最多可以选择的图片张数，默认9
      sizeType: ['original', 'compressed'], // original 原图，compressed 压缩图，默认二者都有
      sourceType: ['album', 'camera'], // album 从相册选图，camera 使用相机，默认二者都有
      success: function (res) {
        var imgsrcList = res.tempFilePaths;
        that.uploadimg(container, imgsrcList);
      },
    })
  },

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

  bindPickerChange: function (e) {
    let rangeStr = e.currentTarget.dataset.range;
    let name = e.currentTarget.dataset.name;
    let range = this.data[rangeStr];
    this.setData({
      [`${rangeStr}Index`]: e.detail.value,
      [name]: range[e.detail.value].code
    });
  },

  onLoad: function () {
    if (!wx.getStorageSync('token')) {
      wx.navigateTo({
        url: '/pages/login/index',
      })
    }
    this.initValidate();
  },

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

  bindInputBlur: function (e) {
    let { validateConfig } = this.data;
    let value = e.detail.value;
    let name = e.currentTarget.dataset.name;
    let configList = validateConfig[name];
    let result = validateUtil.validate(configList, value);
    this.handleValidateResult(name, result);
  },

  bindInputFocus: function (e) {
    let value = e.detail.value;
    let name = e.currentTarget.dataset.name;
    let { validateStatus } = this.data;
    validateStatus[name] = 'focus';
    this.setData({
      validateStatus
    });
  },

  initValidate: function () {
    let { validateConfig } = this.data;
    validateConfig['name'] = [
      { validate: validateUtil.required, msg: "请输入姓名" }
    ];
    validateConfig['card_number'] = [
      { validate: validateUtil.required, msg: "请输入身份证" }
    ];
    validateConfig['address'] = [
      { validate: validateUtil.required, msg: "请输入工作单位" },
    ];
    validateConfig['phone'] = [
      { validate: validateUtil.required, msg: "请输入联系方式" },
    ];
  },

  getUploadItemHashList(itemList = []) {
    return itemList.map((item) => {
      return item.hash;
    })
  },

  onSubmit: function (e) {
    if (this.validate()) {
      let data = {
        name: this.data.name,
        card_number: this.data.card_number,
        address: this.data.address,
        phone: this.data.phone,
        house_loan_period: this.data.house_loan_period,
        car_loan_period: this.data.car_loan_period,
        policy_loan_period: this.data.policy_loan_period,
        house_pictures: this.getUploadItemHashList(this.data.house_pictures),
        car_pictures: this.getUploadItemHashList(this.data.car_pictures),
        policy_pictures: this.getUploadItemHashList(this.data.policy_pictures)
      };
      let self = this;
      api.postCustomer(data, function (res) {
        console.log(res);
        if (res.status === 0) {
          util.showAlert('恭喜你，提交信息成功', function () {
            self.setData({ ...defaultData });
            wx.switchTab({
              url: '/pages/customer/customer'
            });
          });
        } else {
          util.showError(res.message);
        }
      });
    }
  }
})
