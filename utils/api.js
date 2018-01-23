const origin = 'http://127.0.0.1:7001'

const noop = () => { };
const util = require('./util.js');


function accountLogin(data, successCB = noop, errorCB = noop) {
  const url = origin + '/api/v1/account/login';
  let { userName, password } = data;
  return request({
    url: url, //仅为示例，并非真实的接口地址
    method: 'POST',
    data: {
      "login_name": userName,
      "login_password": password
    },
    success: successCB,
    fail: errorCB
  })
}


function request(data) {
  let successCB = data.success;
  let newData = {
    success: (response) => {
      if (response.statusCode === 200) {
        let res = response.data;
        if (res.message && res.message.length > 0) {
          successCB(res)
        } else {
          successCB({
            status: 0,
            data: res
          });
        }
      } else {
        errorHandler(response);
      }
    }
  }
  data.success = newData.success;
  return wx.request(data);
}

function postCustomer(data, successCB = noop, errorCB = noop) {
  const url = origin + '/api/v1/customers';
  let { userName, password } = data;
  return request(authHeader({
    url: url, //仅为示例，并非真实的接口地址
    method: 'POST',
    data: data,
    success: successCB,
    fail: errorCB
  }));
}


function uploadFile(data, successCB = noop, errorCB = noop) {
  //图片上传的接口
  const url = origin + '/api/v1/upload';
  const { filePath } = data;
  wx.uploadFile(authHeader({
    url: url,
    filePath: filePath,//这里是选取的图片的地址数组
    name: 'file',
    success: successCB,
    fail: errorCB
  }));
}



function errorHandler(res) {
  if (res.statusCode !== 200) {
    switch (res.statusCode) {
      case 401:
        wx.navigateTo({
          url: '/pages/login/index',
        });
        break;
      case 500:
        util.showError(res.data.message);
        break;
    }
  }
}


function authHeader(data = {}) {
  const auth = {
    Authorization: wx.getStorageSync('token')
  }
  if (!data.header) {
    data.header = {};
  }
  data.header = { ...data.header, ...auth }
  return data;
}



module.exports = {
  accountLogin: accountLogin,
  errorHandler: errorHandler,
  postCustomer: postCustomer,
  uploadFile: uploadFile
}
