// axios为ajax工具，用法和jQ的ajax类似，不过支持promise用法
import axios from 'axios'
const Qs = require('qs')

const baseURL = ''
let router
let whiteList

const GetToken = () => {
  let url = location.search; //获取url中"?"符后的字串
  let theRequest = {};
  let hasToken = false;
  if (url.indexOf("?") !== -1 && url.length > 64) {
    let str = url.substr(1);
    let strs = str.split("&");
    for (let i = 0; i < strs.length; i++) {
      let tokenKey = strs[i].split("=")[0]
      let tokenValue = strs[i].split("=")[1]
      if (tokenKey.length === 32) {
        localStorage.setItem('tokenKey', tokenKey)
        localStorage.setItem('token', tokenValue)
        theRequest[tokenKey] = tokenValue;
        hasToken = true
        return theRequest
      }
    }
  }
  if (!hasToken && localStorage.tokenKey) {
    theRequest[localStorage.tokenKey] = localStorage.token
  }
  return theRequest;
}

const BackToLogin = (response) => {
  if (process.env.NODE_ENV === "development") {
    return
  }
  if (router && whiteList.length > 1) {
    let rouName = router.currentRoute.name
    let gotoLogin = whiteList.some((item) => {
      return item == rouName
    })
    if (!gotoLogin) {
      if (process.env.PROJECT_ENV === "marketing") {
        if (process.env.NODE_ENV === "development") {
          location.href = '/#/login';
        } else {
          location.href = '/marketing/#/login';
        }
      } else {
        location.href = '/landlord/account/#/login';
      }
    }
  }

  if (process.env.PROJECT_ENV === "marketing") {
    if (process.env.NODE_ENV === "development") {
      location.href = '/#/login';
    } else {
      location.href = '/marketing/#/login';
    }
  } else {
    location.href = '/landlord/account/#/login';
  }
}

const setAxiosRouter = (_router, _whiteList) => {
  router = _router;
  whiteList = _whiteList
}

GetToken();

axios.defaults.baseURL = baseURL
axios.defaults.timeout = 30000

axios.interceptors.request.use(config => {
  config.headers['X-Requested-With'] = 'XMLHttpRequest';
  if (config.method === 'get' || config.method === 'delete') {
    config.params = config.params || {}
    config.data = Qs.stringify(config.params, {arrayFormat: 'brackets'})
  } else {
    config.data = config.data || {}
    config.data = Qs.stringify(config.data, {arrayFormat: 'brackets'})
  }
  return config
}, function (error) {
  return Promise.reject(error)
})
axios.interceptors.response.use(response => {
  return response.data
}, error => {
  if (error.response && error.response.status == 401) {
    BackToLogin(error.response);
  }
  return Promise.reject(error)
})

// ajax get方法，使用通用的返回code过滤
export const get = (url, data) => {
  return axios.get(url, {params: data})
}

// ajax post方法，使用通用的返回code过滤
export const post = (url, data) => {
  return axios.post(url, data)
}

// ajax put方法，使用通用的返回code过滤
export const put = (url, data) => {
  return axios.put(url, data)
}

// ajax delete方法，使用通用的返回code过滤
export const _delete = (url, data) => {
  return axios.delete(url, {params: data})
}

let instance = axios.create({
  baseURL: baseURL,
  timeout: 30000,
  withCredentials: true
})

instance.interceptors.response.use(response => {
  return response.data
}, error => {
  console.log(error)
  return Promise.reject(error)
})

// 变种ajax get方法，不使用通用的返回code过滤，会返回原始ajax响应
export const _get = (url, data) => {
  return instance.get(url, {params: data})
}
// 变种ajax post方法，不使用通用的返回code过滤，会返回原始ajax响应
export const _post = (url, data) => {
  return instance.post(url, data)
}

export default {
  get: get,
  _get: _get,
  post: post,
  _post: _post,
  put: put,
  delete: _delete,
  axios: axios,
  _axios: instance,
  setAxiosRouter: setAxiosRouter
}
