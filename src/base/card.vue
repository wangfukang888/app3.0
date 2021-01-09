<template>
  <div class="w-full px-20 py-5 rounded-8 bg-white" @click.stop="goBack">
    <p class="title my-15 pl-15 text-17 font-semibold relative" :class="classObject()">
      {{ title }}
    </p>
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Card',
  props: {
    title: {
      type: String
    },
    to: {
      type: String,
      default: ''
    },
    /* eslint-disable @typescript-eslint/camelcase */
    is_bg: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    classObject() {
      return this.is_bg ? 'bg' : 'text-red'
    },
    goBack() {
      if (this.to) {
        console.log(this.$router)
      }
    }
  }
})
</script>

<style lang="scss" scoped>
.title {
  &.bg {
    &:before {
      content: '';
      display: block;
      width: 10px;
      height: 30px;
      background: theme('colors.primary.default');
      border-radius: 5px;
      position: absolute;
      left: 0;
      top: -2px;
    }
  }
}
</style>
