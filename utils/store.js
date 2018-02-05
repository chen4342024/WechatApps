
function now() {
  return (new Date()).getTime();
}

class Store {
  constructor() {
    this.TIME_STAMP = "TimeStamp";
    this.MINUTE = 1000 * 60;
    this.HOUT = 1000 * 60 * 60;
    this.DAY = 1000 * 60 * 60 * 24;
  }

  get(key) {
    let data = wx.getStorageSync(key);
    if (!this.isExpired(key)) {
      return data;
    }
    return null;
  }

  set(key, data, cacheTime) {
    if (cacheTime) {
      let timeKey = this.getCacheTimeKey(key);
      let expiredTime = now() + cacheTime;
      wx.setStorageSync(timeKey, expiredTime);
    }
    return wx.setStorageSync(key, data);
  }

  isExpired(key) {
    let timeKey = this.getCacheTimeKey(key);
    let expiredTime = wx.getStorageSync(timeKey);
    if (expiredTime) {
      let currentTime = now();
      let isExpired = (currentTime > expiredTime);
      if (isExpired) {
        this.remove(key);
      }
      return isExpired;
    }
    return false;
  }

  remove(key) {
    let timeKey = this.getCacheTimeKey(key);
    wx.removeStorageSync(timeKey);
    return wx.removeStorageSync(key);
  }

  getCacheTimeKey(key) {
    return `${this.TIME_STAMP}_${key}`
  }

  clear() {
    return wx.clearStorageSync();
  }

};

let wxStore = new Store();

module.exports = wxStore;