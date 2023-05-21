<script setup>
import { ref, onMounted, computed, watch } from 'vue';
import Chart from 'chart.js/auto';

const props = defineProps({
    labels: {
      type: Array,
      default: []
    },
    dataset: {
        type: Array,
        required: true,
        default: []
    }
})

const investmentPortfolio = ref(null);
const chart = ref(null);
// const labels = computed(() => props.labels);
// const dataset = computed(() => props.dataset);

const chartColors = tailwindConfig.theme.colors;

const data = computed(() => ({
  labels: props.labels,
  datasets: [{
    label: 'Amount of $',
    data: props.dataset,
    backgroundColor: [
      chartColors.blue['200'],
      chartColors.blue['400'],
      chartColors.blue['700']
    ],
    hoverOffset: 4,
    borderWidth: 0
  }],
}));

watch(data, () => {
  chart.value.destroy();
  chart.value = createChart();
})

function createChart() {
  return new Chart(investmentPortfolio.value, {
        type: 'doughnut', 
        data: data.value,
        options: {
          plugins: {
            legend: {
              align: 'center',
              position: 'bottom',
              labels: {
                color: 'white',
              }
            },
            
          },
          cutout: '65%',
        },
    })
}

onMounted(() => {
    chart.value = createChart()
})
</script>

<template>
    <canvas ref="investmentPortfolio"></canvas>
</template>