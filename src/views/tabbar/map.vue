<template>
  <div class="map-container">
    <div class="sticky fixed left-0 top-0 text-14 bg-gray-lg header">
      <div class="h-50 flex justify-between pl-16 pr-12">
        <div class="flex items-center" @click="linkToTMap">
          <img src="/img/icons/icon-map-style.png" class="w-20 h-20" />
          <div class="pl-8 text-16">地图模式</div>
        </div>
        <form action="javascript:return" class="searchBox">
          <Search left-icon="left-icon" v-model="query.keyword" shape="round" placeholder="搜索地址" @search="onSearch" />
        </form>
      </div>
      <MapSelectMenu ref="compSelect" @selectChange="menuChange" />
    </div>
    {{ listData }}
    <div class="px-12 empty" v-if="noData">
      <img class="w-130 h-130" src="/img/icons/icon-empty.png" />
      <p class="text-16 text-black-3 mt-10">当前所在城市未获取地图数据敬请期待</p>
    </div>
    <div class="list-container">
      <PullRefresh loading-text="刷新中" disabled>
        <List v-model="listLoading" :finished="finished" :finished-text="noData ? '' : '到底了~'" @load="onLoad">
          <template v-slot:loading>
            <Loading type="spinner" class="py-5" />
          </template>

          <div v-if="listData && listData.length > 0">
            <CardStoreInfo class="mb-10" v-for="(item, index) in listData" :key="index" :itemData="item"></CardStoreInfo>
          </div>
        </List>
      </PullRefresh>
    </div>
  </div>
</template>

<script>
import { defineComponent, reactive, onMounted, toRefs } from 'vue'
import { getDataByAddr, getDataByXY, getDataBySearch } from '../../apis'
import { List, PullRefresh, Loading, Search } from 'vant'
import CardStoreInfo from '../../components/CardStoreInfo.vue'
import MapSelectMenu from '../../components/map/mapSelectMenu.vue'
import mapState from '../../mapState'

async function fetchType(params) {
  let ret
  const { locationLng, userSearch } = mapState.state
  if (locationLng) {
    ret = await getDataByXY(params)
  }
  if (!locationLng) {
    ret = await getDataByAddr(params)
  }
  if (userSearch) {
    ret = await getDataBySearch(params)
  }
  return ret
}

export default defineComponent({
  components: {
    List,
    PullRefresh,
    Loading,
    Search,
    CardStoreInfo,
    MapSelectMenu
  },
  setup() {
    const state = reactive({
      listData: [],
      query: {
        mode: 1,
        keyword: '', //搜索
        orderBy: 1, //排序方式
        radius: '1500',
        page: 1,
        page_size: 10
      },
      signatureQuery: {
        url: location.href.split('#')[0]
      }
    })
    const getList = async () => {
      // const list = await fetchType(1)
      state.listData = [1, 2, 3]
    }
    onMounted(() => {
      getList()
    })
    function menuChange(id) {
      state.listData = id == 2 ? [4, 5, 6] : [1, 2, 3]
    }
    function onSearch(val) {
      console.log(val)
    }
    return { ...toRefs(state), menuChange, onSearch }
  }
})
</script>

<style lang="scss" scoped>
.searchBox {
  width: 64%;
  z-index: 0;
}
.header {
  z-index: 2001;
}
.list-container {
  width: 93.6%;
  margin: 0 auto;
  padding-bottom: 90px;
}

.empty {
  position: fixed;
  text-align: center;
  left: 50%;
  top: 48%;
  transform: translate(-50%, -50%);
  width: 440px;

  img {
    display: inline-block;
  }

  p {
    line-height: 150%;
  }
}

.van-search {
  padding: 16px 0;
  background: transparent;
}

.picker-bar {
  height: 45px;
  box-sizing: content-box;
  padding: 10px 0 20px 0;
}

.scroll-top {
  position: fixed;
  right: 20px;
  bottom: 150px;
  width: 50px;
}
</style>