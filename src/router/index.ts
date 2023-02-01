import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CryptoView from '../views/CryptoView.vue'
import StockView from '../views/StockView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL || '/'),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/crypto',
      name: 'crypto',
      component: CryptoView
    },
    {
      path: '/stock',
      name: 'stock',
      component: StockView
    },
  ]
})

export default router
