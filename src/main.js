import Vue from 'vue'
import App from './App.vue'
import './utils/vant/vant' // 引入vant的组件
import router from './router'

Vue.config.productionTip = false
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
