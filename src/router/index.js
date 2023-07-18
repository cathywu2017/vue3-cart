import { createRouter, createWebHistory } from 'vue-router'
import LessonView from '../views/LessonView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'lesson',
      component: LessonView
    },
    {
      path: '/cart',
      name: 'cart',
      component: () => import('../views/CartView.vue')
    }
  ]
})

export default router
