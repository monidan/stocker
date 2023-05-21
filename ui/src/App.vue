<script setup>
import { ref } from 'vue';
import { RouterView } from 'vue-router'

import Notification from '@/components/Notification.vue';
import StockFormModal from '@/components/StockFormModal.vue';
import Backdrop from '@/components/Backdrop.vue';

import Header from '@/layout/Header.vue';
import Footer from '@/layout/Footer.vue';

import { useNotificationStore } from '@/stores/notification';
import { useAuthStore } from '@/stores/auth';
import { useModalStore } from '@/stores/modal';
import { usePortfolioStore } from '@/stores/portfolio';

const notificationStore = useNotificationStore();
const authStore = useAuthStore();
const modalStore = useModalStore();
const portfolioStore = usePortfolioStore();

const isHTTPPending = ref(false);

async function addStockToPortfolio(investment) {
  isHTTPPending.value = true;
  await portfolioStore.addStockToPortfolio(authStore.username, investment)
    .then(() => modalStore.close())
    .catch(err => notificationStore.pushNotification('error', 'Unable to add this stock to portfolio.') || console.error(err))
    .finally(() => isHTTPPending.value = false);
}
</script>

<template>
  <div class="relative h-full z-10">
    <Backdrop @backdrop-click="modalStore.close()" v-show="modalStore.isModalActive" />
    <StockFormModal 
      v-if="modalStore.isModalActive" 
      @close-modal="modalStore.close()" 
      @add-stock="addStockToPortfolio"

      :isLoading="isHTTPPending"
    />
    
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
        v-show="authStore.isAuthenticated.value && $route.name !== 'profile'"
      />
  
      <main class="min-h-[0px] grow shrink-0"> 
        <RouterView />
      </main>
  
      <Footer 
        v-show="authStore.isAuthenticated.value"
      />
    </div>
  </div>
</template>