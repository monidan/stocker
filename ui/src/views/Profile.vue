<script setup>
import DoughnutChart from '@/components/DoughnutChart.vue';
import PortfolioList from '@/components/PortfolioList.vue';

import portfolioStocksDummyData from '@/dummy-data/portfolio-stocks.json';
</script>

<template>
    <div class="container flex items-center justify-between h-full">
        <div>
          <PortfolioList :stocks="[]" />
        </div>

        <div class="md:w-[400px] lg:w-[800px]">
          <DoughnutChart :data="portfolioStocksDummyData" />
        </div>
    </div>
</template>