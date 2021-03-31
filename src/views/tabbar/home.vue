<template>
  <div class="home-container">
    <div class="skeleton" v-if="loading">
      <div class="_ __" style="height: 100%; z-index: 990; background: #fff"></div>
      <div class="_" style="height: 17.04%; top: 4.798%; left: 3.2%; width: 93.6%"></div>
      <div class="_" style="height: 2.399%; top: 20.186%; left: 12.525%; width: 78.95%"></div>
      <div class="_" style="height: 3.448%; top: 26.328%; left: 11.188%; width: 36.075%"></div>
      <div class="_" style="height: 1.949%; top: 30.224%; left: 11.188%; width: 36.075%"></div>
      <div class="_" style="height: 3.448%; top: 26.328%; left: 55.4%; width: 36.075%"></div>
      <div class="_" style="height: 1.949%; top: 30.224%; left: 55.4%; width: 36.075%"></div>
      <div class="_" style="height: 3.448%; top: 38.245%; left: 11.188%; width: 14.925%"></div>
      <div class="_" style="height: 1.947%; top: 42.443%; left: 11.188%; width: 14.925%"></div>
      <div class="_" style="height: 1.949%; top: 40.342%; left: 71.758%; width: 14.921%"></div>
      <div class="_" style="height: 1.947%; top: 40.194%; left: 88.013%; width: 3.463%"></div>
      <div class="_" style="height: 10.963%; top: 48.131%; left: 3.196%; width: 93.608%; border-radius: 7.99999px"></div>
      <div class="_" style="height: 2.399%; top: 63.585%; left: 12.525%; width: 78.95%"></div>
      <div class="_" style="height: 3.448%; top: 68.977%; left: 11.188%; width: 36.075%"></div>
      <div class="_" style="height: 1.949%; top: 73.323%; left: 11.188%; width: 36.075%"></div>
      <div class="_" style="height: 4.317%; top: 77.518%; left: 11.188%; width: 21.329%; border-radius: 5332.8px"></div>
      <div class="_" style="height: 3.448%; top: 68.977%; left: 55.4%; width: 36.075%"></div>
      <div class="_" style="height: 1.949%; top: 73.323%; left: 55.4%; width: 36.075%"></div>
      <div class="_" style="height: 4.317%; top: 77.518%; left: 55.4%; width: 21.329%; border-radius: 5332.8px"></div>
      <div class="_" style="height: 2.399%; top: 89.32%; left: 12.525%; width: 78.95%"></div>
      <div class="_" style="height: 2.558%; top: 88.957%; left: 89.412%; width: 4.55%"></div>
      <div class="_" style="height: 2.877%; top: 88.913%; left: 6.321%; width: 5.117%"></div>
      <div class="_" style="height: 3.198%; top: 93.656%; left: 13.821%; width: 5.688%"></div>
      <div class="_" style="height: 3.198%; top: 93.656%; left: 47.154%; width: 5.688%"></div>
      <div class="_" style="height: 3.198%; top: 93.656%; left: 80.487%; width: 5.688%"></div>
    </div>
    <div class="padding-bar" v-else>
      <div class="cover flex">
        <Img v-if="state.partner" class="w-60 h-60 rounded-full border border-white mr-5" radius="50%" :src="state.partner.avatar" />
        <div class="flex-1 ml-10 flex flex-col" @click="goBack('/detail')">
          <span class="text-18 text-left mt-5 text-white mb-10 ellipsis-1 font-semibold">{{ state.partner.nickname }}</span>
          <Level :num="state.partner.level" />
        </div>
        <div class="flex pt-20 pl-16">
          <p class="text-15 text-white font-medium">退出</p>
        </div>
      </div>

      <div class="mx-12 -mt-40 text-left">
        <Card title="我的收入" class="font-medium">
          <div class="pt-10 pb-20 flex relative fb-w550">
            <div class="flex-1 pl-10">
              <p class="text-24 font-digit">
                {{ state.income.month_estimated }}
              </p>
              <p class="mt-3 text-14 text-black-6">本月预估推广奖励</p>
            </div>
            <div class="line"></div>
            <div class="flex-1 pl-30">
              <p class="text-24 font-digit letter-small-2">
                {{ state.income.month_mission_reward }}
              </p>
              <p class="mt-3 text-14 text-black-6">本月任务奖励</p>
            </div>
          </div>
          <div class="text-14 reward-sum pt-10 pb-10 pl-10" v-if="state.partner.level > 1 && state.bred_info">
            <div class="arrow-top"></div>
            <p class="font-semibold">
              本月新增育成<span v-if="state.partner.level == 2">导师</span><span v-else>顾问</span
              ><span class="px-2">{{ state.bred_info.bred_members }}</span
              >人，奖励<span class="text-red-reward text-24 letter-small-2 pl-2">{{ state.bred_info.extra_bred_bonus }}</span>
            </p>
            <p class="text-black-6 pt-5">
              (&nbsp;新增育成<span v-if="state.partner.level == 2">导师</span><span v-else>顾问</span>前30天，可额外获得<span
                v-if="state.partner.level == 2"
                >200</span
              ><span v-else>300</span>%育成奖&nbsp;)
            </p>
          </div>
          <div class="flex relative b-line" v-else></div>
          <div class="flex items-center justify-between pt-20 pb-10 fb-w550">
            <div class="pl-10">
              <p class="text-24 font-digit letter-small-2">{{ state.income.today_estimated }}</p>
              <p class="text-14 text-black-6 pt-5">今日收入</p>
            </div>
            <router-link to="/">
              <div class="flex items-center justify-center">
                <p class="text-14 text-black-6 pr-5">累计收入</p>
                <img class="w-13 h-13 -mt-2" src="@img/icons/n-right.png" />
              </div>
            </router-link>
          </div>
        </Card>

        <router-link to="/">
          <img class="mt-10 w-full rounded-8" src="@img/banner.png" />
        </router-link>

        <Card class="mt-10 font-medium" title="团队管理">
          <div class="pt-5 pb-15 flex relative fb-w550">
            <div class="flex-1 pl-10">
              <p class="text-24 font-digit">
                {{ state.family.today_referral }}
              </p>
              <p class="mt-6 text-14 text-black-2">今日邀请(人）</p>
              <router-link class="button mt-15 text-13 text-white flex justify-center items-center rounded-full" to="/"
                >查看详情</router-link
              >
            </div>
            <div class="line"></div>
            <div class="flex-1 pl-30">
              <p class="text-24 font-digit letter-small-2">
                {{ state.family.total_referral }}
              </p>
              <p class="mt-6 text-14 text-black-2">总邀请社区(人）</p>
              <router-link class="button mt-15 text-13 text-white flex justify-center items-center rounded-full" to="/"
                >查看详情</router-link
              >
            </div>
          </div>
          <div class="flex relative bt"></div>
          <div class="mt-20 fb-w550" v-if="state.partner.level !== 1">
            <p class="pl-10">
              <span class="text-24 font-digit letter-small-2">{{ state.family.total_members }}</span>
              <span class="text-14 text-black-2 ml-10" style="position: relative; bottom: 3px">团队总人数(人）</span>
            </p>
          </div>
        </Card>

        <Card class="mt-10 bar" title="热销商品对比" :is_bg="false" to="/price/compare">
          <img class="arrow-more" src="@img/icons/n-right.png" />
          <img class="icon w-13 h-13 title-icon" src="@img/icons/icon-goods.png" />
        </Card>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, onMounted } from 'vue'
import { getHome } from '../../apis'
import Card from '../../base/card.vue'
import Level from '../../base/level.vue'

export default defineComponent({
  props: {
    icon_img: {
      type: String,
      default: ''
    }
  },
  components: {
    Card,
    Level
  },
  setup(props: any) {
    const is_icon = ref<Boolean>(false)
    const loading = ref<Boolean>(true)
    is_icon.value = !props.icon_img ? false : true
    const state = reactive({
      partner: {},
      income: {},
      family: {},
      bred_info: {}
    })
    const getInfo = async () => {
      const ret = await getHome()
      if (ret) {
        loading.value = false
        state.partner = ret.partner
        state.income = ret.income
        state.family = ret.family
        state.bred_info = ret.bred_info
      }
    }
    onMounted(() => {
      getInfo()
    })
    return {
      is_icon,
      loading,
      state
    }
  },
  methods: {
    goBack(path: string) {
      this.$router.push(path)
    }
  }
})
</script>

<style lang="scss" scoped>
.cover {
  width: 100%;
  height: 290px;
  padding: 60px 24px 18px 24px;
  background: url('../../assets/images/cover-background.png');
  background-size: 100% 100%;
}
.line {
  width: 1px;
  border-right: 1px solid #d8d8d8;
  transform: scaleX(0.5);
}
.b-line {
  height: 1px;
  width: 100%;
  border-bottom: 1px solid #d8d8d8;
  transform: scaley(0.5);
}
.button {
  width: 150px;
  height: 54px;
  background: linear-gradient(86deg, theme('colors.primary.default') 0%, theme('colors.primary.light') 100%);
}
.bar {
  position: relative;

  .title-icon {
    position: absolute;
    width: 36px;
    height: 36px;
    top: 48%;
    transform: translateY(-50%);
    left: 22px;
  }

  .arrow-more {
    width: 32px;
    height: 32px;
    position: absolute;
    right: 20px;
    bottom: 40px;
  }
}
</style>