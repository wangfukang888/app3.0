<template>
  <div class="inline-flex" v-if="isStop">
    <img v-for="n in num" :key="n" class="w-16 h-16 mr-5 inline-block" src="/img/icons/icon-diamond-disabled.png" alt="Icon Diamond" />
  </div>
  <div class="inline-flex" v-else>
    <img v-for="n in num" :key="n" class="w-16 h-16 mr-5 inline-block" src="/img/icons/icon-diamond.png" alt="Icon Diamond" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Level',
  props: {
    num: {
      type: Number
    },
    isStop: {
      type: Boolean,
      default: false
    }
  }
})
</script>
