/*
简单store模式管理地图搜索，位置基准点等信息
默认基准点，获取到的定位信息，
如没有获取到定位，则使用该团长所属城市的团点
选择省市区搜索会改变基准点，此时变动，用于在列表和地图模式下展示数据
*/
const MapState = {
  state: {
    keyword: '', //搜索框输入信息
    orderBy: 1, //排序，只用在列表模式
    selectProvince: '', //已选择的省
    selectCity: '',
    selectArea: '',
    adcode: '',
    lng: 0, //经度
    lat: 0, //纬度
    hiddenNicetuan: false, //在地图模式下是否隐藏nice团点位
    locationLng: 112.93886, //开启定位的经度
    locationLat: 28.22778, //开启定位的纬度
    userSearch: false,
    mapTab: false
  },
  setMapTab(val: boolean) {
    this.state.mapTab = val
  },
  setKeywords(data: string) {
    this.state.keyword = data
  },
  setOrderBy(data: number) {
    this.state.orderBy = data
  },
  setProvince(data: string) {
    this.state.selectProvince = data
  },
  setCity(data: string) {
    this.state.selectCity = data
  },
  setArea(data: string) {
    this.state.selectArea = data
  },
  setAdcode(data: string) {
    this.state.adcode = data
  },
  setLatitude(data: number) {
    this.state.lat = data
  },
  setLongitude(data: number) {
    this.state.lng = data
  },
  setHiddenNicetuan(data: boolean) {
    this.state.hiddenNicetuan = data
  },
  setLocationLng(data: number) {
    this.state.locationLng = data
    window.sessionStorage.setItem('locationLng', data + '')
  },
  setLocationLat(data: number) {
    this.state.locationLat = data
    window.sessionStorage.setItem('locationLat', data + '')
  },
  setSearchState(data: boolean) {
    this.state.userSearch = data
  }
}
export default MapState
