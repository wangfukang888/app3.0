import req from '../utils/fetch'
import { GrowupDataResponse } from '../interfaces/api'

//首页降级拆分
export async function getHome(): Promise<any> {
  const ret: any = {}
  const partner: any = await req.get('wxmp/home/partner')
  const relation: any = await req.get('wxmp/home/relation')
  const income: any = await req.get('wxmp/home/income')
  if (partner) ret.partner = partner
  if (relation) ret.relation = relation
  if (income) ret.income = income
  return ret
}

//获取token
export function getToken(uuid: string, id: string): Promise<string> {
  return req.get(`public/wxmp/auth/${uuid}/token/${id}`)
}

//获取成长信息
export function getGrowupData(): Promise<GrowupDataResponse> {
  return req.get('wxmp/growup')
}

//获取signature
export function getSignature(params: object): Promise<any> {
  return req.get('wxmp/store_map/signature', { params })
}

//获取不到经纬度
export function getDataByAddr(params: object): Promise<any> {
  return req.get('wxmp/store_map/list_by_useraddr', { params })
}

//获取到经纬度
export function getDataByXY(params: object): Promise<any> {
  return req.get('wxmp/store_map/list_by_xy', { params })
}

//搜索接口
export function getDataBySearch(params: object): Promise<any> {
  return req.get('wxmp/store_map/search', { params })
}
