<script setup>
import { ref, TransitionGroup } from 'vue';

import PredictionInput from '@/components/PredictionInput.vue';
import LineChart from '@/components/LineChart.vue';

import { usePredictionStore } from '@/stores/prediction';
import { useNotificationStore } from '@/stores/notification';

const predictionStore = usePredictionStore();
const notificationStore = useNotificationStore();

const stockName = ref('');
const predictedPrice = ref(null);

const dataset = ref([]);
const labels = ref([]);

const isSearched = ref(false);
const isLoading = ref(false);

function findStockPrediction() {
    isSearched.value = true;
    isLoading.value = true;

    predictionStore.fetchDataForPredictionChart(stockName.value)
        .then((data) => {
            const [
                historyResponse, 
                predictionResponse
            ] = data;
            const [
                _,
                historyDataKey
            ] = Object.keys(historyResponse.data.data);

            dataset.value = Object.values(historyResponse.data.data[historyDataKey]).reverse();
            labels.value = Object.keys(historyResponse.data.data[historyDataKey]).reverse();
            predictedPrice.value = parseFloat(predictionResponse.data.data.price);
        })
        .catch(err => {
            notificationStore.pushNotification('error', 'Prediction issue.');
            isSearched.value = false;
        })
        .finally(() => isLoading.value = false);
}
</script>

<template>
    <section class="min-h-full h-full">
        <div class="min-h-full container flex items-center justify-center relative">
            <TransitionGroup name="fade-out">
                <div class="md:w-[700px]" v-if="!isSearched">
                    <PredictionInput
                        v-model="stockName"
                        @find="findStockPrediction"
                    />
                </div>

                <div v-else class="w-full flex flex-col md:gap-y-5">
                    <div class="md:w-[700px]">
                        <PredictionInput
                            v-model="stockName"
                            @find="findStockPrediction"
                        />
                    </div>

                    <div class="md:min-h-[500px] rounded-xl flex items-center justify-center">
                        <TransitionGroup name="fade-out">
                            <LineChart 
                                class="w-full h-full md:-translate-x-[30%]"
                                v-if="!isLoading" 

                                :predictedPrice="predictedPrice"
                                :labels="labels"
                                :dataset="dataset"
                            />  
                            <div v-else>
                                <span class="w-12 h-12 block border-4 border-dark-700/20 border-t-brand-700 rounded-full animate-spin" ></span>
                            </div>
                        </TransitionGroup>
                    </div>
                </div>
            </TransitionGroup>
        </div>
    </section>
</template>

<style scoped>
    .fade-out-enter-active,
    .fade-out-leave-active {
        transition: all 0.5s ease;
    }

    .fade-out-enter-to,
    .fade-out-leave-from {
        opacity: 1;
    }

    .fade-out-leave-to,
    .fade-out-enter-from {
        opacity: 0;
        position: absolute;
    }
</style>