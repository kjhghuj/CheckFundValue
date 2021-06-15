import axios from 'axios'
// import store from '@store'
// import router from 'vue-router'
// import router from '../router'
// import { HTTP_OK, AUTH_ERROR } from '@constant/sever'
import { Toast } from 'vant'
// import API from './api'

function AxiosInstance(config) {
  const me = this
  let instance = null

  function init() {
    instance = axios.create(config)
    // 添加拦截器
    instance.interceptors.request.use(
      (config) => {
        // if (!store.state.user.token) {
        //   // 如果本地没有token 调去登录页面
        //   router.push({ name: 'Login' })
        //   return
        // }

        // if (store.state.user.token) {
        //   config.headers.Authorization = store.state.user.token
        // }

        // if (
        //   !config.headers.Authorization &&
        //   process.env.VUE_APP_ENV === 'development'
        // ) {
        //   config.headers.Authorization = 'd74b426b-d3ac-4eda-a60e-94be70baec2d'
        // }

        return config
      },
      (err) => {
        Promise.reject(err)
        // store.commit('endLoading')
      }
    )

    instance.interceptors.response.use(
      (res) => {
        // store.commit('endLoading')
        // 要处理i深圳登录的接口
        // if (res.data.code === HTTP_OK) {
          // console.log('$$$$$:', res)
          // 正常返回
          /*  if (res.config.url === API.loginSubmit().url) {
            // 如果是登陆的接口
            store.commit('saveUserInfo', res.data.data)
            store.commit('saveToken', res.data.token)
          } */
        //   return res.data.data
        // } else if (res.data.code === AUTH_ERROR) {
        //   store.commit('saveToken', '')
        //   if (store.state.user.fromIsz === 'isz') {
        //     if (window.sc) {
        //       window.sc.close()
        //     }
        //   } else {
        //     router.push({ name: 'Login' })
        //   }

        //   return Promise.reject(new Error())
        // } else if (res.data.status === 'OK') {
          return res.data.data
        // } else {
        //   if (res.config.url === API.iszLogin().url) {
        //     Toast.fail(res.data.msg || '网络异常')
        //     return res.data.data
        //   }
        //   const msg = res.data.msg || '网络异常'
        //   Toast.fail(msg)
        //   return Promise.reject(new Error(msg))
        // }
      },
      (err) => {
        Toast.fail('网络异常')
        // store.commit('endLoading')
        return Promise.reject(err)
      }
    )
  }
  init()
  me.instance = instance
}
/* post */
AxiosInstance.prototype.post = function (url, data = {}, config = {}) {
  if (!config.noLoad) {
    // store.commit('startLoading')
  }

  return new Promise((resolve, reject) => {
    this.instance
      .post(url, data, config)
      .then((res) => resolve(res))
      .catch((err) => reject(err))
  })
}
/* get */
AxiosInstance.prototype.get = function (url, data = {}, config = {}) {
  config.params = data
  if (!config.noLoad) {
    // store.commit('startLoading')
  }

  return new Promise((resolve, reject) => {
    this.instance
      .get(url, config)
      .then((res) => resolve(res))
      .catch((err) => reject(err))
  })
}

/* put */
AxiosInstance.prototype.put = function (url, data = {}, config = {}) {
  config.params = data
  if (!config.noLoad) {
    // store.commit('startLoading')
  }

  return new Promise((resolve, reject) => {
    this.instance
      .put(url, config)
      .then((res) => resolve(res))
      .catch((err) => reject(err))
  })
}

export { AxiosInstance }
