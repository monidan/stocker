import { createRouter, createWebHistory } from 'vue-router'

import WelcomePage from '@/views/Welcome.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: WelcomePage,
    },
    {
      path: '/auth',
      name: 'auth',
      component: () => import('@/views/Auth.vue')
    },
    {
      path: '/sign-up',
      name: 'signUp',
      component: () => import('@/views/SignUp.vue')
    },
    {
      path: '/stock-prediction',
      name: 'main',
      component: () => import('@/views/Main.vue'),
    }
  ]
})

export default router
