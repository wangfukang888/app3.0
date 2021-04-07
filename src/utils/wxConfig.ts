import wx from 'weixin-js-sdk'
import { getSignature } from '../api'

export default {
  /* 初始化wxjsdk各种接口 */
  init(apiList: string[], params: object) {
    //需要使用的api列表
    return new Promise((resolve, reject) => {
      getSignature(params).then((res) => {
        if (res && res.signature) {
          wx.config({
            appId: res.appId,
            timestamp: res.timestamp,
            nonceStr: res.noncestr,
            signature: res.signature,
            jsApiList: apiList
          })
          wx.ready(function () {
            // 微信SDK准备就绪后执行的回调。
            let isSuccess = true
            wx.error(function () {
              isSuccess = false
              reject()
            })
            if (isSuccess) resolve(wx)
          })
        }
      })
    })
  }
}
