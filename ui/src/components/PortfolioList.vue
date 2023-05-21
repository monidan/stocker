<script setup>
import BaseButton from '@/components/BaseComponents/BaseButton.vue';

const props = defineProps({
    stocks: {
        type: Array,
        default: []
    },
    isLoading: {
        type: Boolean,
        default: false
    }
})

defineEmits(['add-asset', 'investment-click']);

function totalStockPrice(averagePrice, amount) {
    return (Number(averagePrice) * Number(amount)).toFixed(0);
}
</script>

<template>
    <section>
        <div class="flex flex-col md:gap-y-8 md:min-w-[400px] text-center">
            <template v-if="stocks.length">
                <ul class="flex flex-col md:gap-y-8 md:px-6 md:max-h-[300px] overflow-auto white-scroll">
                    <li v-for="stock of stocks"> 
                        <button 
                            class="w-full flex items-center justify-between text-white hover:bg-secondary-700/40 md:px-2 md:py-4 rounded-lg transition-all duration-300"
                            @click="$emit('investment-click', stock)"
                        >
                            <div class="md:text-6xl">
                                <p>{{ stock.stock }}</p>
                            </div>
        
                            <div>
                                <p class="md:text-xl">
                                    {{ totalStockPrice(stock.averagePrice, stock.amount) }} $
                                </p>
                            </div>
                        </button>
                    </li>
                </ul>
            </template>

            <div class="w-full" v-else>
                <p class="text-white md:text-4xl">Empty portfolio :(</p>
            </div>

            <div class="w-full">
                <BaseButton
                    @click="$emit('add-asset')"
                    :loading="isLoading"
                >
                    Add Asset
                </BaseButton>
            </div>
        </div>
    </section>
</template>