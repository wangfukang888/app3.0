<template>
  <div class="filter-container">
    <ul class="flex items-center text-14">
      <li
        v-for="(item, index) in filterItems"
        :class="{ 'text-red': item.show }"
        :key="item.label"
        @click="changeItems(filterItems, item, index)"
      >
        {{ item.label }}{{ item.show ? 1 : 2 }}
      </li>
    </ul>
  </div>
  <teleport to="#pop">
    <transition name="slide-fade">
      <div class="fold-container" v-if="show_fold">
        <ul class="text-14">
          <li
            v-for="(item, index) in foldItems"
            :class="{ 'text-red': itemIndex == index }"
            :key="item.id"
            @click="changeFoldItems(item, index)"
          >
            {{ item.label }}
          </li>
        </ul>
      </div>
    </transition>
  </teleport>
  <teleport to="#pop">
    <transition name="slide-fade">
      <div class="pop-container" v-if="show_pop">
        <div class="content text-14 p-10">选择省市区</div>
      </div>
    </transition>
  </teleport>
  <teleport to="#pop">
    <transition name="fade">
      <div class="mask" v-if="show_pop || show_fold" @click="maskClose"></div>
    </transition>
  </teleport>
</template>

<script>
export default {
  data() {
    return {
      show_pop: false,
      show_fold: false,
      filterItems: [
        { label: '全部区域', show: false },
        { label: '距离由远到近', show: false }
      ],
      foldItems: [
        { label: '距离由远到近', show: true, id: 1 },
        { label: '热度从高到低', show: false, id: 2 }
      ],
      itemIndex: 0
    }
  },
  emits: ['selectChange'],
  methods: {
    changeItems(items, item, index) {
      item.show = !item.show
      switch (index) {
        case 0:
          this.show_pop = !this.show_pop
          this.show_fold = false
          items[1].show = false
          break
        case 1:
          this.show_fold = !this.show_fold
          this.show_pop = false
          items[0].show = false
          break
      }
    },
    changeFoldItems(item, index) {
      const filterItems = this.filterItems
      this.itemIndex = index
      filterItems[1].label = item.label
      this.$emit('selectChange', item.id)
      this.maskClose()
    },
    maskClose() {
      this.filterItems && this.filterItems.forEach(v => (v.show = false))
      this.show_pop = false
      this.show_fold = false
    }
  }
}
</script>

<style lang="scss" scoped>
.filter-container {
  ul {
    height: 90px;
    li {
      flex: 1;
    }
  }
}
.pop-container {
  position: fixed;
  width: 100%;
  height: 70vh;
  bottom: 0;
  background: #fff;
  z-index: 2000;
  &.slide-fade-enter-active {
    transition: all 0.3s ease-out;
  }
  &.slide-fade-leave-active {
    transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1);
  }
  &.slide-fade-enter-from,
  &.slide-fade-leave-to {
    transform: translate3d(0, 100%, 0);
    opacity: 0;
  }
}
.fold-container {
  position: fixed;
  width: 100%;
  top: 180px;
  z-index: 2000;
  padding: 0 40px;
  text-align: left;
  background: #fff;
  &.slide-fade-enter-active {
    transition: all 0.3s ease-out;
  }
  &.slide-fade-leave-active {
    transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1);
  }
  &.slide-fade-enter-from,
  &.slide-fade-leave-to {
    transform: translate3d(0, -20px, 0);
    opacity: 0;
  }
  li {
    height: 100px;
    line-height: 100px;
    border-bottom: 0.5px solid #eee;
    &:last-child {
      border-bottom: none;
    }
  }
}
.mask {
  position: fixed;
  width: 100%;
  left: 0;
  top: 0;
  z-index: 1000;
  bottom: 0;
  background: rgba($color: #000, $alpha: 0.6);
  &.fade-enter-active {
    transition: all 0.3s ease-out;
  }
  &.fade-leave-active {
    transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1);
  }
  &.fade-enter-from,
  &.fade-leave-to {
    opacity: 0;
  }
}
</style>