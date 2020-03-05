/**
 * 所有自定义全局组件在此引入
 */
import Vue from 'vue'
import Image from './Image'

Image.install = function(Vue) {
  Vue.component(Image.name, Image)
}

Vue.use(Image)
