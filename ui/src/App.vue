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
  <div class="relative bg-dark-gradient h-screen z-10 before:absolute before:content-[''] before:bg-dark-gradient before:bg-blend-color-dodge before:bottom-0 before:top-1/2 before:inset-x-0 before:-z-[5]">
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
        v-show="authStore.isAuthenticated"
      />
  
      <main class="grow"> 
        <RouterView />
      </main>
  
      <Footer 
        v-show="authStore.isAuthenticated"
      />
    </div>
  </div>
</template>