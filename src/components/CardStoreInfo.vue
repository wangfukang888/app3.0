<template>
  <div class="px-12 py-12 bg-white rounded-8 mb-10 text-14" v-if="itemData">
    <div @click="linkToDetail(itemData.id)">
      <div class="flex items-center">
        <div class="storeType text-12 px-4 text-white flex items-center">待开发</div>
        <span class="van-ellipsis text-16 font-semibold">{{ itemData.name }}</span>
      </div>
      <div class="flex justify-between mt-8">
        <span class="hotStyle px-4 flex items-center text-red-hot">热度指数：{{ itemData.degree }}</span>
        <span class="text-black-1"
          >距离<span class="text-red-distance pl-5">{{ Math.floor(itemData.distance) }}</span></span
        >
      </div>
      <p class="van-ellipsis text-black-7 mt-12 text-14" style="line-height: 120%">{{ itemData.address }}</p>
    </div>
    <div class="flex justify-end items-center mt-12">
      <!-- <span class="text-black-1" @click="linkToDetail(itemData.id)" v-if="itemData.fans">{{ itemData.fans }}人签到</span> -->
      <div class="flex items-center">
        <!-- <router-link class="button" to="TMapMode">签到</router-link> -->
        <a :href="'tel:' + itemData.mobile" class="button rounded-full" v-if="itemData.mobile">联系门店</a>
        <div
          class="button flex justify-center items-center rounded-full text-black-5 btn-active text-red-map"
          @click.stop="goNav(itemData)"
        >
          <span>导航到店</span>
        </div>
      </div>
    </div>
    <ActionSheet v-model="isSelect" :actions="actions" cancel-text="取消" close-on-click-action @select="onSelect" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ActionSheet } from 'vant'

export default defineComponent({
  name: 'CardStoreInfo',
  components: {
    ActionSheet
  },
  data() {
    return {}
  },
  props: {
    itemData: {}
  },
  methods: {
    linkToDetail(value: string) {
      this.$router.push({ path: '/ShopDetail', query: { id: value } })
    }
  }
})
</script>

<style lang="scss" scoped>
.storeType {
  background: #ff4400;
  border-radius: 2px;
  margin-right: 12px;
  white-space: nowrap;
  padding: 0 8px;
  height: 36px;
  border-radius: 4px;
}

.hotStyle {
  background: #fff6da;
  border-radius: 4px;
  height: 46px;
  display: block;
  line-height: 45px;
}

.button {
  width: 150px;
  height: 58px;
  line-height: 58px;
  border: 1px solid #bababa;
  margin-right: 24px;
  font-weight: 550;
}

.btn-active {
  border: 1px solid #ff530c;
  margin-right: 0;
}
</style>