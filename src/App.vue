<template>
  <router-view v-slot="{ Component }">
    <transition :name="animate">
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </transition>
    <Tabbar v-show="$route.meta.showTabBar" />
  </router-view>
</template>

<script lang="ts">
import Tabbar from './base/tab-bar.vue'
import mapState from './mapState'
import wxApp from './utils/wxConfig'

export default {
  name: 'App',
  data() {
    return {
      animate: '',
      is_alive: false
    }
  },
  components: {
    Tabbar
  },
  //监听$router的变化
  //如果to索引大于from索引,判断为前进状态,反之则为后退状态
  watch: {
    $route(to, from) {
      // this.is_alive = to.meta.keepAlive;
      // document.title = to.meta.title;
      this.animate = ''
      if (to.meta.index > from.meta.index) {
        //设置动画名称
        console.log('left')
        this.animate = 'slide-left'
      }
      if (to.meta.index < from.meta.index) {
        console.log('right')
        this.animate = 'slide-right'
      }
    }
  },
  mounted() {
    this.wxLocation()
  },
  methods: {
    async wxLocation() {
      const wx: any = await wxApp.init(['getLocation', 'openLocation'], { url: location.href.split('#')[0] }).catch(() => {
        this.$toast('微信定位获取失败，请刷新重试!')
        return
      })
      wx &&
        wx.getLocation({
          type: 'gcj02', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
          success: (res: any) => {
            const latitude = res.latitude // 纬度，浮点数，范围为90 ~ -90
            const longitude = res.longitude // 经度，浮点数，范围为180 ~ -180。
            mapState.setLocationLng(longitude) //存储定位坐标
            mapState.setLocationLat(latitude)
          },
          fail: () => {
            this.$dialog.alert({
              message: '检测到未开启微信定位服务，请前往手机设置中打开微信定位服务，否则地图定位功能无法正常使用！',
              theme: 'round-button',
              confirmButtonText: '我知道了'
            })
          },
          cancel: () => {
            this.$toast('用户拒绝授权获取地理位置！')
          }
        })
    }
  }
}
</script>

<style lang="scss">
@import './assets/css/app.scss';

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  padding-bottom: env(safe-area-inset-bottom);
}
.padding-bar {
  padding-bottom: 110px;
}
</style>
