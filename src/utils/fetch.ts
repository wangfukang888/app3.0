import axios from 'axios'
import { Toast } from 'vant'

const OK = 0

axios.defaults.timeout = 10000

const headers = {
  'Content-Type': 'application/x-www-form-urlencoded'
}
// 通用参数
const params = {}

const http = axios.create({
  baseURL: '/api/v1',
  params,
  headers
})
// 响应拦截
http.interceptors.response.use(
  response => {
    const res = response.data
    if (res.code != OK) {
      Toast(res.msg || '获取数据失败，请刷新重试')
      return null
    }
    return res.data
  },
  err => {
    try {
      const err_code = err.response.status
      switch (err_code) {
        case 401:
          // 登录过期 ,2秒后跳转
          Toast('登录失效')
          // localStorage.removeItem('userInfo')
          // setTimeout(() => {
          //   router.push('/login')
          // }, 2000)
          break
        case 500:
          Toast('服务器访问失败,请刷新后重试')
          break
        default:
          Toast('服务器错误！')
      }
    } catch (err) {
      Toast('服务器错误或响应超时,请刷新重试')
    }
  }
)

// 请求拦截
http.interceptors.request.use(
  function (config) {
    const TOKEN = ''
    if (TOKEN) config.headers['Authorization'] = `Bearer ${TOKEN}`
    return config
  },
  err => {
    Toast('请求超时')
    return Promise.reject(err)
  }
)

export default http
