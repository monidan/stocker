<script setup>
import { RouterView } from 'vue-router'

import Notification from '@/components/Notification.vue';

import Header from '@/layout/Header.vue';
import Footer from '@/layout/Footer.vue';

import { useNotificationStore } from '@/stores/notification';
import { useAuthStore } from '@/stores/auth';

const notificationStore = useNotificationStore();
const authStore = useAuthStore();
</script>

<template>
  <div class="relative h-full z-10">
    <aside class="container">
      <Notification 
        :isOpen="notificationStore.isNotificationActive"
        :type="notificationStore.notificationType"
        :hideNotification="notificationStore.setNotificationVisibility.bind(undefined, false)"
      >
        {{ notificationStore.notificationText }}
      </Notification>
    </aside>

    <div class="h-full flex flex-col">
      <Header 
        v-show="authStore.isAuthenticated && $route.name !== 'profile'"
      />
  
      <main class="min-h-[0px] grow shrink-0"> 
        <RouterView />
      </main>
  
      <Footer 
        v-show="authStore.isAuthenticated"
      />
    </div>
  </div>
</template>