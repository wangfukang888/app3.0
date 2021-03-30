<template>
  <div class="p-10">
    <div>
      <h1 class="my-10 font-bold text-16"># Token 模拟登陆,设置成功后，点击去主页</h1>
      <div class="mt-10 flex">
        <input class="flex-1 p-10" type="text" placeholder="输入UUID" v-model.trim="uuid" />
      </div>
      <div class="mt-10 flex">
        <input class="flex-1 p-10" type="text" placeholder="输入用户 ID" v-model.trim="id" />
        <button class="button primary ml-10 p-10 px-15" @click="fetch">获取 TOKEN</button>
      </div>
      <textarea class="mt-10 w-full h-200 p-10" autofocus v-model="token" placeholder="在此处粘贴 TOKEN"></textarea>
      <div class="mt-20 flex">
        <button class="m-auto py-10 px-20 button primary" @click="save">保存</button>
        <button class="m-auto py-10 px-20 button primary" @click="goHqHome">去黄雀</button>
        <button class="m-auto py-10 px-20 button primary" @click="goWtHome">去万团</button>
      </div>
    </div>

    <div class="mt-50">
      <h1 class="mx-10 font-bold"># 清除缓存</h1>
      <button class="m-auto mt-20 py-10 px-20 button primary" @click="clear">清除缓存</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'
import { getToken } from '../../apis'
import { ENV } from '../../config'

export default defineComponent({
  setup() {
    const state = reactive({
      showTokenBlock: ENV.MODE !== 'production',
      id: '',
      token: '',
      uuid: ''
    })

    async function fetch() {
      const { uuid, id } = state
      const ret = await getToken(uuid, id)
      console.log(ret)
    }
    return {
      ...toRefs(state),
      fetch
    }
  }
})
</script>
