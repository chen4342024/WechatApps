
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

/**
 * 获取节点相对于viewport的位置
 */
function getElementScollOffset(select, callback = noop) {
  let query = wx.createSelectorQuery();
  query.selectViewport().scrollOffset();
  query.select(select).boundingClientRect();
  query.exec((res) => {
    let viewPortScrollTop = res[0].scrollTop;
    let rect = res[1];
    if (!rect) {
      console.log(`select --> ${select} not found !!!`);
      return;
    }
    let elemScrollTop = rect.top;
    callback(viewPortScrollTop + elemScrollTop);
  })
}


module.exports = {
  formatTime: formatTime,
  showError: showError,
  showAlert: showAlert,
  getElementScollOffset: getElementScollOffset
}
