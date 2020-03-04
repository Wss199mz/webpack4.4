// axios为ajax工具，用法和jQ的ajax类似，不过支持promise用法
import axios from 'axios';

var Qs = require('qs');

var baseURL = '';
var router;
var whiteList;

var GetToken = function GetToken () {
  var url = window.location.search; // 获取url中"?"符后的字串

  var theRequest = {};
  var hasToken = false;

  if (url.indexOf('?') !== -1 && url.length > 64) {
    var str = url.substr(1);
    var strs = str.split('&');

    for (var i = 0; i < strs.length; i++) {
      var tokenKey = strs[i].split('=')[0];
      var tokenValue = strs[i].split('=')[1];

      if (tokenKey.length === 32) {
        window.localStorage.setItem('tokenKey', tokenKey);
        window.localStorage.setItem('token', tokenValue);
        theRequest[tokenKey] = tokenValue;
        hasToken = true;
        return theRequest;
      }
    }
  }

  if (!hasToken && window.localStorage.tokenKey) {
    theRequest[window.localStorage.tokenKey] = window.localStorage.token;
  }

  return theRequest;
};

var BackToLogin = function BackToLogin (response) {
  if (process.env.NODE_ENV === 'development') {
    return;
  }

  if (router && whiteList.length > 1) {
    var rouName = router.currentRoute.name;
    var gotoLogin = whiteList.some(function (item) {
      return item === rouName;
    });

    if (!gotoLogin) {
      if (process.env.PROJECT_ENV === 'marketing') {
        if (process.env.NODE_ENV === 'development') {
          window.location.href = '/#/login';
        } else {
          window.location.href = '/marketing/#/login';
        }
      } else {
        window.location.href = '/landlord/account/#/login';
      }
    }
  }

  if (process.env.PROJECT_ENV === 'marketing') {
    if (process.env.NODE_ENV === 'development') {
      window.location.href = '/#/login';
    } else {
      window.location.href = '/marketing/#/login';
    }
  } else {
    window.location.href = '/landlord/account/#/login';
  }
};

var setAxiosRouter = function setAxiosRouter (_router, _whiteList) {
  router = _router;
  whiteList = _whiteList;
};

GetToken();
axios.defaults.baseURL = baseURL;
axios.defaults.timeout = 30000;
axios.interceptors.request.use(function (config) {
  config.headers['X-Requested-With'] = 'XMLHttpRequest';

  if (config.method === 'get' || config.method === 'delete') {
    config.params = config.params || {};
    config.data = Qs.stringify(config.params, {
      arrayFormat: 'brackets'
    });
  } else {
    config.data = config.data || {};
    config.data = Qs.stringify(config.data, {
      arrayFormat: 'brackets'
    });
  }

  return config;
}, function (error) {
  return Promise.reject(error);
});
axios.interceptors.response.use(function (response) {
  return response.data;
}, function (error) {
  if (error.response && error.response.status === 401) {
    BackToLogin(error.response);
  }

  return Promise.reject(error);
}); // ajax get方法，使用通用的返回code过滤

export var get = function get (url, data) {
  return axios.get(url, {
    params: data
  });
}; // ajax post方法，使用通用的返回code过滤

export var post = function post (url, data) {
  return axios.post(url, data);
}; // ajax put方法，使用通用的返回code过滤

export var put = function put (url, data) {
  return axios.put(url, data);
}; // ajax delete方法，使用通用的返回code过滤

export var _delete = function _delete (url, data) {
  return axios.delete(url, {
    params: data
  });
};
var instance = axios.create({
  baseURL: baseURL,
  timeout: 30000,
  withCredentials: true
});
instance.interceptors.response.use(function (response) {
  return response.data;
}, function (error) {
  console.log(error);
  return Promise.reject(error);
}); // 变种ajax get方法，不使用通用的返回code过滤，会返回原始ajax响应

export var _get = function _get (url, data) {
  return instance.get(url, {
    params: data
  });
}; // 变种ajax post方法，不使用通用的返回code过滤，会返回原始ajax响应

export var _post = function _post (url, data) {
  return instance.post(url, data);
};
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
};
