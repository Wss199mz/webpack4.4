import Vue from 'vue';
import ElementUI from 'element-ui';
import router from '@/router';
import store from '@/store';
import * as filters from '@/utils/filters';
import 'element-ui/lib/theme-chalk/index.css';
import './components';
import axios from '@/api/axios';
import App from '@/App';
Vue.use(ElementUI);
Vue.prototype.$axios = axios; // 公用全局filters

Object.keys(filters).forEach(function (key) {
  Vue.filter(key, filters[key]);
});
new Vue({
  router: router,
  store: store,
  // filters,
  render: function render (h) {
    return h(App);
  }
}).$mount('#app');
