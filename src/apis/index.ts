import api from '../utils/fetch'
import qs from 'qs'
import { GrowupDataResponse } from '../interfaces/api'

//获取首页信息
export function getHome(): Promise<any> {
  return api.get(`wxmp/home`)
}

//获取成长信息
export function getGrowupData(): Promise<GrowupDataResponse> {
  return api.get('wxmp/growup')
}

//获取signature
export function getSignature(params: object): Promise<any> {
  return api.get(`wxmp/store_map/signature?${qs.stringify(params)}`)
}

//获取不到经纬度
export function getDataByAddr(params: object): Promise<any> {
  return api.get(`wxmp/store_map/list_by_useraddr?${qs.stringify(params)}`)
}

//获取到经纬度
export function getDataByXY(params: object): Promise<any> {
  return api.get(`wxmp/store_map/list_by_xy?${qs.stringify(params)}`)
}

//搜索接口
export function getDataBySearch(params: object): Promise<any> {
  return api.get(`wxmp/store_map/search?${qs.stringify(params)}`)
}
