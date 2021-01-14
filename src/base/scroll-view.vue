<template>
  <div class="scroll-container" ref="scroll">
    <div class="wrapper">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'

export default {
  props: {
    list_data: {
      type: Array,
      default: null
    },
    pullup: {
      type: Boolean,
      default: false
    },
    pullDown: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    list_data() {
      setTimeout(() => {
        this.refresh()
      })
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initScroll()
    })
  },
  methods: {
    // 滚动初始化
    initScroll() {
      let scroll = this.$refs.scroll
      if (!scroll) return
      this.scroll = new BScroll(scroll, {
        click: true,
        probeType: 1,
        scrollbar: {
          // 设置滚动条
          fade: true
        }
      })
      if (this.pullup) {
        this.scroll.on('scrollEnd', pos => {
          if (this.scroll.y <= this.scroll.maxScrollY + 50) {
            this.$emit('scrollToEnd')
          }
        })
      }
      if (this.pullDown) {
        this.scroll.on('scroll', pos => {
          if (pos.y > 5) {
            this.$emit('scrollDown', pos.y)
          }
        })
        this.scroll.on('touchEnd', pos => {
          this.$emit('touchEnd', pos.y)
        })
      }
    },
    scrollTop() {
      this.scroll && this.scroll.scrollTo(0, 0)
    },
    refresh() {
      this.scroll && this.scroll.refresh()
    },
    destroy() {
      this.scroll && this.scroll.destroy()
    }
  }
}
</script>
