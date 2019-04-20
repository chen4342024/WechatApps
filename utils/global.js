
//房产信息
const houseInfoEnum = [
  { code: -1, text: "不限", label: "选择房产" },
  { code: 8, text: '无' },
  { code: 1, text: '供房1~3个月' },
  { code: 2, text: '供房3~6个月' },
  { code: 3, text: '供房6~12个月' },
  { code: 4, text: '供房1~3年' },
  { code: 5, text: '供房3~5年' },
  { code: 6, text: '供房5年以上' },
  { code: 7, text: '房子买断' }
];

const carTypeEnum = [
  { code: -1, text: "请选择", label: "选择车辆" },
  { code: 4, text: '无' },
  { code: 1, text: "供车6~12个月" },
  { code: 2, text: "供车1~3年" },
  { code: 3, text: "车子买断" }
];

const policyTypesEnum = [
  { code: -1, text: "请选择", label: "选择保单" },
  { code: 7, text: '无' },
  { code: 1, text: "保单3~6个月" },
  { code: 2, text: "保单6~12个月" },
  { code: 3, text: "保单1~2年" },
  { code: 4, text: "保单2~5年" },
  { code: 5, text: "保单5年以上" },
  { code: 6, text: "保单供断" },
];

const lendingPeriodTypesEnum = [
  { code: -1, text: "请选择", label: "选择期数" },
  { code: 12, text: "12期" },
  { code: 24, text: "24期" },
  { code: 36, text: "36期" },
];


const followStatusCode = {
  FOLLOWING: 1, // 跟进中
  NEGOTIATION: 2, // 约见洽谈
  CONTRACT: 3, // 签订合同
  FUNDED: 4, // 已放款
  REJECT: 5, // 已拒绝
  AUDITED: 6 // 已初审
};

const followStatus = [
  { code: -1, text: "请选择" },
  { code: 1, text: "跟进中" },
  { code: 2, text: "约见洽谈" },
  { code: 3, text: "签订合同" },
  { code: 4, text: "已放款" },
  { code: 5, text: "已拒绝" },
  { code: 6, text: "已初审" },
];

const genderEnum = [
  { code: 0, text: "女" },
  { code: 1, text: "男" }
];

const businessLicenseTypeEnum = [
  { code: -1, text: "请选择" },
  { code: 4, text: "无" },
  { code: 1, text: "1年以内" },
  { code: 2, text: "1~2年" },
  { code: 3, text: "2年以上" }
];

const socialSecurityTypeEnum = [
  { code: -1, text: "请选择", label: "选择社保" },
  { code: 1, text: '无' },
  { code: 2, text: '有' },
];

const accumulationFundsTypeEnum = [
  { code: -1, text: "请选择", label: "选择公积金" },
  { code: 1, text: '无' },
  { code: 2, text: '有' },
];

const taxLevelTypeEnum = [
  { code: -1, text: "请选择", label: "选择税务评级" },
  { code: 1, text: 'A' },
  { code: 2, text: 'B' },
  { code: 3, text: 'C' },
  { code: 4, text: 'D' },
  { code: 5, text: 'M' },
  { code: 6, text: '无' },
];


const billLevelTypeEnum = [
  { code: -1, text: "请选择", label: "选择开票额度" },
  { code: 1, text: '100万以下' },
  { code: 2, text: '100万-200万' },
  { code: 2, text: '200万以上' },
];

function findByCode(code, data) {
  return data.filter((value) => {
    return value.code == code;
  });
};

function findIndex(code, data) {
  for (let i = 0; i < data.length; i++) {
    if (data[i].code == code) {
      return i;
    }
  }
  return -1;
};


module.exports = {
  houseInfoEnum,
  carTypeEnum,
  policyTypesEnum,
  followStatus,
  followStatusCode,
  findByCode: findByCode,
  findIndex,
  genderEnum,
  lendingPeriodTypesEnum,
  businessLicenseTypeEnum,
  socialSecurityTypeEnum,
  accumulationFundsTypeEnum,
  taxLevelTypeEnum,
  billLevelTypeEnum
};