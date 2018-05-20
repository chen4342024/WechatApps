const noop = () => { };
const formatDate = (date, format = "yyyy-MM-dd") => {
  var o = {
    "M+": date.getMonth() + 1, //month
    "d+": date.getDate(),    //day
    "h+": date.getHours(),   //hour
    "m+": date.getMinutes(), //minute
    "s+": date.getSeconds(), //second
    "q+": Math.floor((date.getMonth() + 3) / 3),  //quarter
    "S": date.getMilliseconds() //millisecond
  }
  if (/(y+)/.test(format))
    format = format.replace(RegExp.$1,(date.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o) {
    if (new RegExp("(" + k + ")").test(format)){
      format = format.replace(RegExp.$1,RegExp.$1.length == 1 ? o[k] :("00" + o[k]).substr(("" + o[k]).length));
    }
  }
  return format;
};


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


function showError(msg = "", callback = noop) {
  wx.showModal({
    title: '错误提示',
    content: msg,
    showCancel: false,
    confirmText: '我知道了',
    confirmColor: '#ff784b',
    success: callback
  });
}

function showAlert(msg = "", callback = noop) {
  wx.showModal({
    title: '温馨提示',
    content: msg,
    showCancel: false,
    confirmText: '确定',
    confirmColor: '#1AAD19',
    success: callback
  });
}

function showConfirm(msg = "", callback = noop) {
  wx.showModal({
    title: '温馨提示',
    content: msg,
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

// 滚动到对应的元素
function scrollTo(select) {
  getElementScollOffset(select, (scrollTop) => {
    wx.pageScrollTo({
      scrollTop: scrollTop,
      duration: 300
    })
  });
}



module.exports = {
  formatDate: formatDate,
  formatTime: formatTime,
  showError: showError,
  showAlert: showAlert,
  getElementScollOffset,
  scrollTo,
  showConfirm
}
