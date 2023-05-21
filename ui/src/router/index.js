import { createRouter, createWebHistory } from 'vue-router'

import { useAuthStore } from '@/stores/auth';
import { useNotificationStore } from '@/stores/notification';

import WelcomePage from '@/views/Welcome.vue';
import NotFound from '@/views/404.vue';

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
      meta: { requiresAuth: true }
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('@/views/Profile.vue'),
      meta: { requiresAuth: true }
    },


    {
      path: '/:pathMatch(.*)*',
      component: NotFound
    }
  ]
})

router.beforeEach((to, from) => {
  const authStore = useAuthStore();

  if (to.meta.requiresAuth && !authStore.isAuthenticated.value) {
    const notificationStore = useNotificationStore();

    notificationStore.pushNotification('error', 'Not logged in!');
    return {
      path: '/auth',
    }
  }
})

export default router
