import Vue from 'vue';
import ElementUI from 'element-ui';
import router from '@/router';
import store from '@/store';
import * as filters from '@/utils/filters'
import 'element-ui/lib/theme-chalk/index.css';
import axios from '@/api/axios';
import App from "@/App"; // 导入App组件（为什么这样导入？请看第四段中的第7）
Vue.use(ElementUI);
Vue.prototype.$axios = axios;
// 公用全局filters
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key]);
});
new Vue({
  router,
  store,
  // filters,
  render: h => h(App)
}).$mount("#app");

