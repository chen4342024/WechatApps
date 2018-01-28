
//房产信息
const houseInfoEnum = [
  { code: -1, text: "不限", label: "选择房产" },
  { code: 2, text: '供房1~3个月' },
  { code: 3, text: '供房3~6个月' },
  { code: 4, text: '供房6~12个月' },
  { code: 5, text: '供房1~3年' },
  { code: 6, text: '供房3~5年' },
  { code: 7, text: '供房5年以上' },
  { code: 8, text: '房子买断' }
];

const carTypeEnum = [
  { code: -1, text: "请选择", label: "选择车辆" },
  { code: 2, text: "供车6~12个月" },
  { code: 3, text: "供车1~3年" },
  { code: 4, text: "车子买断" }
];

const policyTypesEnum = [
  { code: -1, text: "请选择", label: "选择保单" },
  { code: 2, text: "保单3~6个月" },
  { code: 3, text: "保单6~12个月" },
  { code: 4, text: "保单1~2年" },
  { code: 5, text: "保单2~5年" },
  { code: 6, text: "保单5年以上" },
  { code: 7, text: "保单供断" },
];

const followStatus = [
  { code: 1, text: "跟进中" },
  { code: 2, text: "已约见" },
  { code: 3, text: "洽谈中" },
  { code: 4, text: "签订合同" },
  { code: 5, text: "完成签约" },
];

module.exports = {
  houseInfoEnum,
  carTypeEnum,
  policyTypesEnum,
  followStatus
};