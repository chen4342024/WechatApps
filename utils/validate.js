

/**
 * 是否必填
 * @param value
 * @returns {boolean}
 */
function required(value = "") {
  return value.length > 0;
}

/**
 * 是否邮箱
 * @param value
 * @returns {boolean}
 */
function email(value = "") {
  let filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]+)+$/;
  return filter.test(value)
}

function digit(value = "") {
  let filter = /^(\d+)$/;
  return filter.test(value)
}

function phoneCode(value) {
  let filter = /^\+?(\d+)$/; //验证规则---> 首位可以是+号也可以不是，其他位都是数字
  return filter.test(value)
}

function isPingYin(value = "") {
  let filter = /^[a-zA-Z\s]+$/;
  return filter.test(value)
}

function isChinese(value = "") {
  let filter = /^[\u2E80-\u9FFF]+$/;
  return filter.test(value)
}

function isDate(value = "") {
  let filter = /^((?:18|19|20|21)\d\d)-(0[1-9]|[1-9]|1[012])-(0[1-9]|[1-9]|[12][0-9]|3[01])$/;
  return filter.test(value);
}

function isFunction(func) {
  return typeof func === 'function';
}

function validate(configList, value = "") {
  value = '' + value; //转化为字符串
  for (let i = 0; i < configList.length; i++) {
    let config = configList[i];
    let { validate, msg } = config;
    if (isFunction(validate)) {
      if (!validate(value)) {
        return { validate: false, msg }
      }
    }
  }
  return { validate: true };
}


module.exports = {
  required,
  email,
  digit,
  isPingYin,
  isChinese,
  validate,
  phoneCode,
  isDate
}
