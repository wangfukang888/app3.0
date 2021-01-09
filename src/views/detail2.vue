<template>
  <transition name="slide-left">
    <div class="de-container p-10">
      <div>
        <h1 class="my-10 font-bold"># Token 模拟登陆,设置成功后，点击去主页</h1>
        <div class="mt-10 flex">
          <input class="flex-1 p-10" type="text" placeholder="输入UUID" v-model="uuid" />
        </div>
      </div>
    </div>
  </transition>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
// import * as Api from '@/api'
export default defineComponent({
  name: 'Debug',
  data() {
    return {
      showTokenBlock: process.env.VUE_APP_ENV !== 'production',
      id: '',
      token: '',
      uuid: ''
    }
  },
  methods: {
    // async fetch() {
    //   try {
    //     this.token = await Api.getToken(this.id, this.uuid)
    //   } catch (error) {
    //     this.$toast('获取 TOKEN 失败')
    //   }
    // },
    save() {
      // window.localStorage.setItem('TOKEN', this.token)
      // this.$toast('设置成功')
      this.$router.push('/detail2')
    },
    goHome() {
      window.location.href = '/'
      window.sessionStorage.setItem('debug', '1')
    },
    clear() {
      window.localStorage.clear()
      this.$toast('清除成功')
    }
  }
})
</script>

<style lang="scss" scoped>
.de-container {
  position: fixed;
  top: 0;
  bottom: 0;
  background: #f1f1f1;
}
.primary {
  background: linear-gradient(86deg, theme('colors.primary.default') 0%, theme('colors.primary.light') 100%);
}
</style>
 
 