<template>
  <div class="fixed w-full py-5 bg-white bottom-0 z-idx">
    <Tabbar v-model="active" class="bar-container static">
      <TabbarItem replace to="/">
        <span class="mt-3 text-12 font-medium" :class="{ 'text-red': $route.name === 'Home' }">首页</span>
        <template #icon="props">
          <img v-if="props.active" src="../assets/images/tabbar/icon-home-active.png" />
          <img v-else src="../assets/images/tabbar/icon-home.png" />
        </template>
      </TabbarItem>
      <TabbarItem replace to="/map">
        <span class="mt-3 text-12 font-medium" :class="{ 'text-red': $route.name === 'Map' }">地图</span>
        <template #icon="props">
          <img v-if="props.active" src="../assets/images/tabbar/icon-map-active.png" />
          <img v-else src="../assets/images/tabbar/icon-map.png" />
        </template>
      </TabbarItem>
      <TabbarItem replace to="/growup">
        <span class="mt-3 text-12 font-medium" :class="{ 'text-red': $route.name === 'Growup' }">成长</span>
        <template #icon="props">
          <img v-if="props.active" src="../assets/images/tabbar/icon-growup-active.png" />
          <img v-else src="../assets/images/tabbar/icon-growup.png" />
        </template>
      </TabbarItem>
    </Tabbar>
  </div>
</template>

<script lang="ts">
import { Tabbar, TabbarItem } from 'vant'
import { ref, defineComponent } from 'vue'

export default defineComponent({
  components: { Tabbar, TabbarItem },
  setup() {
    const active = ref(0)
    return {
      active
    }
  },
  watch: {
    $route(to) {
      let num: number = -1
      switch (to.path) {
        case '/':
          num = 0
          break
        case '/map':
          num = 1
          break
        case '/growup':
          num = 2
          break
      }
      this.active = num
    }
  }
})
</script>

<style lang="scss" scoped>
.van-tabbar-item--active {
  color: rgba(255, 68, 0, var(--text-opacity));
}
.bar-container {
  height: inherit;
  padding-bottom: env(safe-area-inset-bottom);
}
.z-idx {
  z-index: 999;
}
img {
  width: 40px;
  height: 40px;
}
</style>
