import axios from 'axios'
import store from '@/store/index.js'
import global from '@/global.js'
import Vue from 'vue'
import Cookie from 'vue-cookie'

const axiosFactory = function (type = 'json') {
  const vueInstance = new Vue()
  const instance = axios.create({
    timeout: 1000000,
    baseURL: global.baseUrl,
    headers: {
      'Content-Type':
        type === 'json'
          ? 'application/json; charset=UTF-8'
          : 'application/x-www-form-urlencoded',
      'X-Requested-With': 'XMLHttpRequest',
    },
  })

  instance.interceptors.request.use(
    (config) => {
      if (store.state.token) {
        config.headers.accessToken = store.state.token
      }
      return config
    },
    (err) => {
      return Promise.reject(err)
    }
  )

  instance.interceptors.response.use(
    (response) => {
      return response
    },
    (error) => {
      vueInstance.$message.closeAll()
      console.log(error.message)
      if (isNotLogin(error.response.data)) {
        store.commit('logOutInpage')
        Cookie.delete('userNameHead')
        //  router.replace('/login')
      } else if (isError(error.response.data)) {
        vueInstance.$message.error(error.response.data.message)
      } else if (isNotAuthorized(error.response.data)) {
        vueInstance.$message.error('请求失败：算法未授权')
      } else {
        vueInstance.$message.error('请求失败')
      }

      return Promise.reject(error)
    }
  )

  function isError(data) {
    let code = data.code
    return code == '500'
  }

  function isNotLogin(data) {
    let code = data.code
    return code == '401' || code == '403'
  }

  function isNotAuthorized(data) {
    let code = data.code
    return code == '406'
  }

  return instance
}

var instance = axiosFactory()

export { axiosFactory }
export default instance
