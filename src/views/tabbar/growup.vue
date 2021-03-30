<template>
  <div class="growup-container">
    <div class="skeleton" v-if="loading">
      <div class="_ __" style="height: 100%; z-index: 990; background: #fff"></div>
      <div class="_" style="height: 3.294%; top: 3.898%; left: 9.067%; width: 90.933%"></div>
      <div class="_" style="height: 3.148%; top: 14.234%; left: 13.858%; width: 72.283%"></div>
      <div class="_" style="height: 1.799%; top: 22.515%; left: 13.858%; width: 72.283%"></div>
      <div class="_" style="height: 3.148%; top: 31.803%; left: 13.858%; width: 72.283%"></div>
      <div class="_" style="height: 1.799%; top: 40.084%; left: 13.858%; width: 72.283%"></div>
      <div class="_" style="height: 3.198%; top: 93.656%; left: 13.821%; width: 5.688%"></div>
      <div class="_" style="height: 3.198%; top: 93.656%; left: 47.154%; width: 5.688%"></div>
      <div class="_" style="height: 3.198%; top: 93.656%; left: 80.487%; width: 5.688%"></div>
    </div>
    <div class="padding-tabbar">
      <!-- <p class="title pl-35 pt-27 pb-18 bg-white text-21 font-semibold relative">成长</p> -->
      <div class="mx-12">
        <div class="mt-10 px-40 py-20 bg-white rounded-8 font-medium" v-for="item in growupData" :key="item.desc">
          <p class="text-22 text-center font-digit">
            {{ item.current }}
            <span class="text-black-2">/ {{ item.criteria }}</span>
          </p>
          <progress class="mt-15" :max="item.criteria" :value="item.current" />
          <p class="mt-15 text-13 text-black-1">{{ item.desc }}</p>
        </div>
        <p v-if="isTop" class="mt-10 pl-2 text-12">您的成长之路已到达顶点</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from 'vue'
import { getGrowupData } from '../../apis'

function apex(data: any) {
  for (let i = 0; i < data.length; i++) {
    const item = data[i]
    if (item.current < item.criteria) return false
  }
  return true
}

export default defineComponent({
  setup() {
    const growupData = ref([] as any)
    const isTop = ref<boolean>(false)
    const loading = ref<boolean>(true)
    const getList = async () => {
      const ret = await getGrowupData()
      if (ret instanceof Array) {
        loading.value = false
        isTop.value = apex(ret)
        growupData.value = ret
      }
    }
    onMounted(() => {
      getList()
    })
    return {
      growupData,
      loading,
      isTop
    }
  }
})
</script>

<style lang="scss" scoped>
.title {
  &::before {
    content: '';
    display: block;
    width: 10px;
    height: 38px;
    background: theme('colors.primary.default');
    border-radius: 5px;
    position: absolute;
    left: 32px;
  }
}
</style>
