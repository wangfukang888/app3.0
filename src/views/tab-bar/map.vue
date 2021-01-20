<template>
  <div class="map-container">
    <div class="sticky fixed left-0 top-0 text-14 bg-gray-lg header">
      <div class="h-50 flex justify-between pl-16 pr-12">
        <div class="flex items-center" @click="linkToTMap">
          <img src="../../assets/images/icons/icon-map-style.png" class="w-20 h-20" />
          <div class="pl-8 text-16">地图模式</div>
        </div>
        <form action="javascript:return" class="searchBox">
          <Search left-icon="left-icon" v-model="query.keyword" shape="round" placeholder="搜索地址" @search="onSearch" />
        </form>
      </div>
      <MapSelectMenu ref="compSelect" @selectChange="menuChange" />
    </div>
    {{ state.listData }}
    <div class="px-12 empty" v-if="noData">
      <img class="w-130 h-130" src="../../assets/images/icons/icon-empty.png" />
      <p class="text-16 text-black-3 mt-10">当前所在城市未获取地图数据敬请期待</p>
    </div>
    <div class="list-container">
      <PullRefresh v-model="refreshing" @refresh="onRefresh" loading-text="刷新中" disabled>
        <List v-model="listLoading" :finished="finished" :finished-text="noData ? '' : '到底了~'" @load="onLoad">
          <template v-slot:loading>
            <Loading type="spinner" class="py-5" />
          </template>

          <div v-if="listData && listData.length > 0">
            <CardStoreInfo class="mb-10" v-for="(item, index) in listData" :key="index" :itemData="item"></CardStoreInfo>
          </div>
        </List>
      </PullRefresh>
    </div>
    <!-- <img src="../../assets/icons/icon-scroll-top.png" class="scroll-top" @click="scrollToTop" v-show="showScrollTop" /> -->
  </div>
</template>

<script>
import { defineComponent, reactive, onMounted } from 'vue'
import { getDataByAddr, getDataByXY, getDataBySearch } from '../../apis'
import { List, PullRefresh, Loading, Search } from 'vant'
import CardStoreInfo from '../../components/CardStoreInfo.vue'
import MapSelectMenu from '../../components/map/mapSelectMenu.vue'
import mapState from '../../mapState'
import wx from 'weixin-js-sdk'
const AMap = window.AMap

async function fetchType(params) {
  let ret
  const { locationLng, userSearch } = mapState.state
  if (locationLng) {
    ret = await getDataByXY(params)
  }
  if (!locationLng) {
    ret = await getDataByAddr(params)
  }
  if (userSearch) {
    ret = await getDataBySearch(params)
  }
  return ret
}

export default defineComponent({
  name: 'StoresMap',
  components: {
    List,
    PullRefresh,
    Loading,
    Search,
    CardStoreInfo,
    MapSelectMenu
  },
  setup() {
    const state = reactive({
      listData: []
    })
    const getList = async () => {
      // const list = await fetchType(1)
      state.listData = [1, 2, 3]
    }
    onMounted(() => {
      getList()
    })
    return { state }
  },
  data() {
    return {
      /* eslint-disable @typescript-eslint/camelcase */
      query: {
        mode: 1,
        keyword: '', //搜索
        orderBy: 1, //排序方式
        radius: '1500',
        page: 1,
        page_size: 10
      },
      signatureQuery: {
        url: location.href.split('#')[0]
      }
      // refreshing: false,
      // listLoading: false,
      // finished: false,
      // noData: false,
      // // listData: [],
      // shareState: mapState.state, //store共享信息
      // domHeight: document.documentElement.clientHeight,
      // domScrollTop: 0
    }
  },
  methods: {
    onLoad() {
      console.log('load')
    },
    menuChange(id) {
      console.log(this.state.listData, id)
      this.state.listData = [4, 5, 6]
    }
  }
  // async created() {
  //   this.loading = false
  //   await this.wxLocation()
  // },
  // mounted() {
  //   // this.query.keyword = this.shareState.keyword;
  //   console.log('mounted', this.state)
  //   this.query.orderBy = this.shareState.orderBy
  //   if (!this.shareState.locationLng) {
  //     const _locationLng = window.sessionStorage.getItem('locationLng')
  //     const _locationLat = window.sessionStorage.getItem('locationLat')
  //     if (_locationLng != null && _locationLng != 'null' && _locationLng != '' && _locationLng != undefined) {
  //       console.log(_locationLng + ',' + _locationLat)
  //       mapState.setLongitude(_locationLng)
  //       mapState.setLatitude(_locationLat)
  //       mapState.setLocationLng(_locationLng) //存储定位坐标
  //       mapState.setLocationLat(_locationLat)
  //     }
  //   }
  //   window.onscroll = e => {
  //     this.domScrollTop = e.target.scrollingElement.scrollTop
  //   }
  // },
  // computed: {
  //   showScrollTop() {
  //     return this.domScrollTop > this.domHeight * 2
  //   }
  // },
  // methods: {
  //   fetchType() {
  //     if (this.shareState.selectProvince && this.shareState.userSearch) {
  //       this.fetchBySearch()
  //     } else if (this.shareState.locationLng) {
  //       const _lngLat = this.shareState.locationLng + ',' + this.shareState.locationLat
  //       this.getAddrBylng(_lngLat)
  //       this.fetchByXY()
  //     } else {
  //       this.fetchByAddr()
  //     }
  //   },
  //   menuChange(id) {
  //     console.log('选择的id:' + id)
  //   },
  //   getAddrBylng(lnglat) {
  //     const geocoder = new AMap.Geocoder({
  //       city: ''
  //     })
  //     geocoder.getAddress(lnglat, function (status, result) {
  //       if (status === 'complete' && result.regeocode) {
  //         const _province = result.regeocode.addressComponent.province || ''
  //         const _city = result.regeocode.addressComponent.city || result.regeocode.addressComponent.province || ''
  //         const _area = result.regeocode.addressComponent.district || ''

  //         mapState.setProvince(_province)
  //         mapState.setCity(_city)
  //         mapState.setArea(_area)
  //       } else {
  //         console.log('根据经纬度查询地址失败')
  //       }
  //     })
  //   },
  //   linkToTMap() {
  //     this.$refs.compSelect.maskClose()
  //     this.$router.push('/TMapMode')
  //   },
  //   onChangeArea() {
  //     this.query.page = 1
  //     mapState.setSearchState(true)
  //     this.fetchBySearch()
  //   },
  //   onChangeOrder(checked) {
  //     this.query.orderBy = checked
  //     this.query.page = 1
  //     mapState.setSearchState(true)
  //     this.fetchType()
  //   },
  //   onSearch() {
  //     this.query.page = 1
  //     mapState.setSearchState(true)
  //     this.fetchBySearch()
  //   },
  //   Init() {
  //     this.refreshing = false
  //     this.finished = false
  //     this.listLoading = true
  //     this.noData = false
  //   },
  //   async fetchByAddr() {
  //     this.Init()
  //     /* eslint-disable @typescript-eslint/camelcase */
  //     const _addr = {
  //       mode: 1,
  //       orderBy: this.query.orderBy,
  //       radius: this.query.radius,
  //       page: this.query.page,
  //       page_size: 10
  //     }
  //     if (this.query.page == 1) {
  //       this.listData = []
  //     }
  //     try {
  //       const _listData = await getDataByAddr(_addr)
  //       if (_listData.Lng) {
  //         const _lngLat = _listData.Lng + ',' + _listData.Lat
  //         this.getAddrBylng(_lngLat)
  //       }
  //       this.noData = false
  //       this.listData = this.listData.concat(..._listData.OtherList)
  //       if (this.query.page == 1 && (!_listData.OtherList || _listData.OtherList.length == 0)) {
  //         this.noData = true
  //         this.finished = true
  //         return
  //       }
  //       if (_listData.OtherList.length < _addr.page_size) {
  //         this.finished = true
  //       } else {
  //         this.query.page++
  //       }
  //     } catch (err) {
  //       this.finished = true
  //       this.error = err
  //     }
  //     this.listLoading = false
  //   },
  //   async fetchByXY() {
  //     this.Init()
  //     /* eslint-disable @typescript-eslint/camelcase */
  //     const _xyPosition = {
  //       mode: 1,
  //       orderBy: this.query.orderBy,
  //       radius: this.query.radius,
  //       lng: this.shareState.locationLng,
  //       lat: this.shareState.locationLat,
  //       page: this.query.page,
  //       page_size: 10
  //     }
  //     if (this.query.page == 1) {
  //       this.listData = []
  //     }
  //     try {
  //       const _listData = await getDataByXY(_xyPosition)
  //       // this.fetchBySearch()
  //       this.noData = false
  //       this.listData = this.listData.concat(..._listData.OtherList)
  //       if (this.query.page == 1 && (!_listData.OtherList || _listData.OtherList.length == 0)) {
  //         this.noData = true
  //         this.finished = true
  //         return
  //       }
  //       if (_listData.OtherList.length < _xyPosition.page_size) {
  //         this.finished = true
  //       } else {
  //         this.query.page++
  //       }
  //     } catch (err) {
  //       this.finished = true
  //       this.noData = true
  //       this.error = err
  //     }
  //     this.listLoading = false
  //   },
  //   async fetchBySearch() {
  //     this.Init()
  //     /* eslint-disable @typescript-eslint/camelcase */
  //     const _bySearch = {
  //       mode: 1,
  //       orderBy: this.query.orderBy,
  //       radius: this.query.radius,
  //       lng: this.shareState.locationLng,
  //       lat: this.shareState.locationLat,
  //       keyword: this.query.keyword,
  //       province: this.shareState.selectProvince,
  //       city: this.shareState.selectCity,
  //       district: this.shareState.selectArea,
  //       page: this.query.page,
  //       page_size: 10
  //     }
  //     if (!_bySearch.lng) {
  //       delete _bySearch.lng
  //       delete _bySearch.lat
  //     }
  //     if (this.query.page == 1) {
  //       this.listData = []
  //     }
  //     try {
  //       const _listData = await getDataBySearch(_bySearch)
  //       this.noData = false
  //       if (this.query.page == 1 && (!_listData.OtherList || _listData.OtherList.length == 0)) {
  //         this.noData = true
  //         this.finished = true
  //         return
  //       }
  //       this.listData = this.listData.concat(..._listData.OtherList)
  //       if (_listData.OtherList && _listData.OtherList.length < this.query.page_size) {
  //         this.finished = true
  //       } else {
  //         this.query.page++
  //       }
  //     } catch (err) {
  //       this.finished = true
  //       this.error = err
  //     }
  //     this.listLoading = false
  //   },
  //   onRefresh() {
  //     this.refreshing = true
  //     this.finished = false
  //     this.listLoading = true
  //     this.noData = false
  //     this.query.page = 1
  //     this.fetchType()
  //   },
  //   onLoad() {
  //     if (this.noData) return
  //     console.log(this.state.listData)
  //     fetchType()
  //   },
  //   scrollToTop() {
  //     if (document.scrollingElement) {
  //       document.scrollingElement.scrollTop = 0
  //     }
  //   },
  //   async wxLocation() {
  //     wx.getLocation({
  //       type: 'gcj02', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
  //       success: res => {
  //         const latitude = res.latitude // 纬度，浮点数，范围为90 ~ -90
  //         const longitude = res.longitude // 经度，浮点数，范围为180 ~ -180。
  //         mapState.setLongitude(longitude)
  //         mapState.setLatitude(latitude)
  //         mapState.setLocationLng(longitude) //存储定位坐标
  //         mapState.setLocationLat(latitude)
  //       }
  //     })
  //   }
  // }
})
</script>
<style lang="scss" scoped>
.searchBox {
  width: 64%;
  z-index: 0;
}
.header {
  z-index: 2001;
}
.list-container {
  width: 93.6%;
  margin: 0 auto;
  padding-bottom: 90px;
}

.empty {
  position: fixed;
  text-align: center;
  left: 50%;
  top: 48%;
  transform: translate(-50%, -50%);
  width: 440px;

  img {
    display: inline-block;
  }

  p {
    line-height: 150%;
  }
}

.van-search {
  padding: 16px 0;
  background: transparent;
}

.picker-bar {
  height: 45px;
  box-sizing: content-box;
  padding: 10px 0 20px 0;
}

.scroll-top {
  position: fixed;
  right: 20px;
  bottom: 150px;
  width: 50px;
}
</style>