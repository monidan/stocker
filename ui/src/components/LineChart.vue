<script setup>
import { ref, onMounted, computed, isRef } from 'vue';
import Chart from 'chart.js/auto';

import { PROFIT_COLOR, LOSS_COLOR } from '@/shared/utils/chart-utils';

const lineChartEl = ref(null);
const chart = ref(null);

const context = ref(null);
const gradientBg = ref(null);

function isProfitable() {
    return transformedDataset.value[0] - transformedDataset.value[transformedDataset.length - 1] > 0
}

const props = defineProps({
    labels: {
        type: Array,
        default: []
    },
    dataset: {
        type: Array,
        required: true,
        default: []
    },
    predictedPrice: {
        type: Number,
    }
})

const transformedDataset = computed(() => {
    const dataset = isRef(props.dataset)
        ? props.dataset.value
        : props.dataset;

    return dataset.map(stockPrice => {
        return parseFloat(stockPrice['4. close']);
    })
});
const transformedLabels = computed(() => [...isRef(props.dataset) ? props.labels.value : props.labels, 'Predicted Price']);
const borderColor = computed(() => isProfitable ? PROFIT_COLOR(1) : LOSS_COLOR(1));
const bgColor = computed(() => isProfitable ? PROFIT_COLOR(0.35) : LOSS_COLOR(0.35));

onMounted(() => {
    context.value = lineChartEl.value.getContext('2d');
    gradientBg.value = context.value.createLinearGradient(0, 10, 0, 450);
    gradientBg.value.addColorStop(0, bgColor.value);
    gradientBg.value.addColorStop(1, 'rgba(0, 0, 0, 0)');

    chart.value = new Chart(lineChartEl.value, {
        type: 'line',
        data: {
            labels: transformedLabels.value,
            datasets: [
                {
                    data: transformedDataset.value,
                    tension: 0.2,
                    borderColor: borderColor.value,
                    borderWidth: 8,
                    backgroundColor: gradientBg.value,
                    pointBorderWidth: 10,
                    pointBorderColor: bgColor.value,
                    fill: true,
                },
                { 
                    data: {
                        x: 'Predicted Price',
                        'Predicted Price': props.predictedPrice,
                    },
                    tension: 0.2,
                    borderWidth: 8,
                    borderColor: 'rgba(255, 155, 51, 1)',
                    backgroundColor: 'rgba(255, 155, 51, 1)',
                }
                
            ]
        },
        options: {
            plugins: {
                legend: {
                    display: false,
                },
            },
            responsive: true,
            scales: {
                x: {
                    display: false,
                },
                y: {
                    display: false,
                }
            }
        }
    });
})
</script>

<template>
    <section>
        <div class="flex items-center">
            <canvas ref="lineChartEl"></canvas>
        </div>        
    </section>
</template>