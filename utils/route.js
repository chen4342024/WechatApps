
const app = getApp();

function getParam() {
  let globalData = app.globalData || {}
  return globalData.param || {};
}

function resetParam() {
  app.globalData = app.globalData || {}
  return app.globalData.param = {};
}

function setParam(param) {
  app.globalData = app.globalData || {}
  return app.globalData.param = param;
}


function goCustomerAndRefresh() {
  setParam({ refresh: true });
  wx.switchTab({ url: '/pages/customer/customer' });
}


function goCustomerEditById(id) {
  setParam({ id: id })
  wx.switchTab({ url: '/pages/index/index' });
}




module.exports = {
  goCustomerAndRefresh,
  goCustomerEditById,
  getParam,
  resetParam,
  setParam
}