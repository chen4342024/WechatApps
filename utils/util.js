
const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}


function showError(msg, callback) {
  wx.showModal({
    title: '错误提示',
    content: msg,
    showCancel: false,
    confirmText: '我知道了',
    confirmColor: '#ff784b',
    success: callback
  });
}

function showAlert(msg, callback) {
  wx.showModal({
    title: '温馨提示',
    content: msg,
    showCancel: false,
    confirmText: '确定',
    confirmColor: '#1AAD19',
    success: callback
  });
}


module.exports = {
  formatTime: formatTime,
  showError: showError,
  showAlert: showAlert
}
