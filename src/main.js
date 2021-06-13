import Vue from 'vue'
import App from './App.vue'
import './utils/vant/vant' // 引入vant的组件

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
