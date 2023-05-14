<script setup>
import { RouterView } from 'vue-router'

import Notification from '@/components/Notification.vue';

import { useNotificationStore } from '@/stores/notification';

const notificationStore = useNotificationStore();
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
    
    <main class="h-full">
      <RouterView />
    </main>
  </div>
</template>