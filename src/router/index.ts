import { createWebHistory, createRouter } from 'vue-router'
import Home from '../views/tab-bar/home.vue'
import Map from '../views/tab-bar/map.vue'
import Growup from '../views/tab-bar/growup.vue'

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
