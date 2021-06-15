import API from './api/index'
import WEB_CONFIG from './config'
import { AxiosInstance } from './request'

const instance = new AxiosInstance({
  baseURL: WEB_CONFIG.HOST,
  timeout: 60000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json;charset=utf-8'
  }
})

const request = (eventName, data = {}, config = {}) => {
  const _api = API[eventName]
  if (!_api)
    return Promise.reject(new Error(`axios: ${eventName} doesn't exist`))

  const cfg = _api(data)
  const fetch = instance[cfg.method || 'post']
  if (!cfg.url) return Promise.reject(new Error('axios: url is empty'))
  if (!fetch) return Promise.reject(new Error('axios: method is error'))
  return fetch.call(instance, cfg.url, data, config)
}

export default request