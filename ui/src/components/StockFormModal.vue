<script setup>
import { ref } from 'vue';

import BaseInput from '@/components/BaseComponents/BaseInput.vue';
import BaseButton from '@/components/BaseComponents/BaseButton.vue';

defineProps({
    isLoading: {
        type: Boolean,
        default: false
    },
})

defineEmits(['close-modal', 'add-stock'])

const investment = ref({
    stockName: '',
    amount: '',
    price: ''
})
</script>

<template>
    <div class="absolute inset-0 flex items-center justify-center z-20">
        <div class="bg-secondary md:py-12 md:px-20 rounded-xl">
            <div class="flex justify-end md:pb-6">
                <button class="font-bold text-white md:text-2xl" @click="$emit('close-modal')">
                    Close
                </button>
            </div>

            <form class="md:w-[700px]">
                <BaseInput
                    name="stockName"
                    type="text"
                    placeholder="Stock name"

                    v-model="investment.stockName"
                />

                <BaseInput
                    name="amount"
                    type="text"
                    placeholder="Amount of stocks"

                    v-model="investment.amount"
                />

                <BaseInput
                    name="price"
                    type="text"
                    placeholder="Price per one stock"

                    v-model="investment.price"
                />
    
                <BaseButton
                    @click="$emit('add-stock', investment)"
                    :loading="isLoading"
                >
                    Add Stock
                </BaseButton>
            </form>
        </div>
    </div>
</template>