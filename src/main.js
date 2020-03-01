import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from './api/axios';
import App from "./App"; // 导入App组件（为什么这样导入？请看第四段中的第7）
Vue.use(ElementUI);
Vue.prototype.$axios = axios;
// const div = document.createElement('div');
// document.body.appendChild(div);
new Vue({
  render: h => h(App)
}).$mount("#app");

