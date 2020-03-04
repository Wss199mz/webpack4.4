import Vue from 'vue'

// 将时间戳转化成yyyy/mm/dd
export const dateFormat = (value, divider) => {
  divider = divider || '/'
  let d = new Date(value)
  let year = d.getFullYear()
  let month = d.getMonth() + 1
  let date = d.getDate()
  if (month >= 1 && month <= 9) {
    month = "0" + month
  }
  if (date >= 0 && date <= 9) {
    date = "0" + date
  }
  return year + divider + month + divider + date
}

// 数字格式化，千分位逗号，四舍五入，123456.123456 => 123,456.12
export const formatNum = (value) => {
  value = Math.round((Number(value) || 0) * 1000 / 10) / 100
  return (Number(value).toFixed(2) + '').replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,')
}

// 去除null，显示「无」
export const formatNull = (value) => {
  return (value === null || value == '') ? '无' : value
}

// 无且保留两位小数
export const zeroFormatNull = (value) => {
  let retValue = ''
  if (value === null || value == '') {
    retValue = '无'
  } else {
    retValue = Number(value).toFixed(2)
  }
  return retValue
}

// 去除null，显示「-」
export const forNull = (value) => {
  return (value === null || value == '') ? '-' : value
}

//不进行四舍五入保留两位小数点
export const subTwoString = (value) => {
  var f = Math.round(value * 100) / 100;
  var s = f.toString();
  var rs = s.indexOf('.');
  if (rs < 0) {
    rs = s.length;
    s += '.'
  }
  while (s.length <= rs + 2) {
    s += '0'
  }
  return s
}
