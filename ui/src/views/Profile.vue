<script setup>
import { onMounted, ref, computed, setBlockTracking } from 'vue';

import DoughnutChart from '@/components/DoughnutChart.vue';
import PortfolioList from '@/components/PortfolioList.vue';

import { useModalStore } from '@/stores/modal';
import { usePortfolioStore } from '@/stores/portfolio';
import { useNotificationStore } from '@/stores/notification';
import { useAuthStore } from '@/stores/auth';

const modalStore = useModalStore();
const portfolioStore = usePortfolioStore();
const notificationStore = useNotificationStore();
const authStore = useAuthStore();

const isPortfolioFetched = ref(false);
const isLoading = ref(false);

const stocks = computed(() => portfolioStore.portfolio);
const chartDataset = computed(() => {
  if (!stocks.value.length) return [];

  if (stocks.value.length <= 3) {
      return stocks.value.map(stock => Number(stock.averagePrice) * Number(stock.amount))  
  } 

  return [
    ...stocks.value.slice(0, 3).map(stock => Number(stock.averagePrice) * Number(stock.amount)),
    stocks.value.slice(3, stocks.value.length)
      .reduce((accumulator, stock) => accumulator += Number(stock.averagePrice) * Number(stock.amount), 0)
  ]
})
const chartLabels = computed(() => {
  if (!stocks.value.length) return [];

  if (stocks.value.length <= 3) return stocks.value.map(stock => stock.stock);

  return [
    ...stocks.value.slice(0, 3).map(stock => stock.stock),
    'Other'
  ]
});

async function deleteStockFromPortfolio(stock) {
  isLoading.value = true;
  await portfolioStore.deleteStockFromPortfolio(authStore.username, { stockName: stock.stock })
    .catch(err => notificationStore.pushNotification('error', 'Unable to delete this stock.'))
    .finally(() => isLoading.value = false)
}

onMounted(() => {
    portfolioStore.fetchPortfolio(authStore.username)
      .catch(err => {
        if (err.response.data.msg !== 'Portfolio for this user does not exist') {
            notificationStore.pushNotification('error', 'Issue with getting the portfolio.');
        }
      })
      .finally(() => isPortfolioFetched.value = true);
})
</script>

<template>
    <div class="container h-full md:pt-16">
      <div 
        class="flex items-center h-full" 
        :class="{
          'justify-center': !stocks.length,
          'justify-around': stocks.length,
        }"
        v-if="isPortfolioFetched"
      >
        <div>
          <PortfolioList 
            :stocks="stocks"
            :isLoading="isLoading"
            @add-asset="modalStore.open()"
            @investment-click="deleteStockFromPortfolio"  
          />
        </div>

        <div class="md:w-[400px] lg:w-[600px]" v-if="stocks.length">
          <DoughnutChart :labels="chartLabels" :dataset="chartDataset" />
        </div>
      </div>

      <div class="flex items-center justify-center h-full" v-else>
        <span class="w-12 h-12 block border-4 border-dark-700/60 border-t-brand-700 rounded-full animate-spin"></span>
      </div>
    </div>
</template>