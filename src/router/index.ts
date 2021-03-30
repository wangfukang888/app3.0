import { createWebHistory, createRouter } from 'vue-router'
import Home from '../views/tabbar/home.vue'
import Map from '../views/tabbar/map.vue'
import Growup from '../views/tabbar/growup.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta: {
        index: 1,
        showTabBar: true
      }
    },
    {
      path: '/map',
      name: 'Map',
      component: Map,
      meta: {
        index: 1,
        showTabBar: true
      }
    },
    {
      path: '/growup',
      name: 'Growup',
      component: Growup,
      meta: {
        index: 1,
        showTabBar: true
      }
    },
    {
      path: '/debug',
      name: 'Debug',
      component: () => import('../views/debug/index.vue'),
      meta: {
        index: 99
      }
    },
    {
      path: '/detail',
      name: 'Detail',
      component: () => import('../views/detail.vue'),
      meta: {
        index: 2
      }
    },
    {
      path: '/detail2',
      name: 'Detail2',
      component: () => import('../views/detail2.vue'),
      meta: {
        index: 3
      }
    }
  ]
})

export default router
