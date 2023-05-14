<script setup>
import { Transition, ref, onMounted } from 'vue';
import Typed from 'typed.js';

const stockName = ref('');
const typingText = ref(null);

const isInputActive = ref(false);

onMounted(() => {
    const typed = new Typed(typingText.value, {
        strings: ['AAPL', 'TSLA', 'GOOGL'],
        typeSpeed: 50,
        backSpeed: 80,
        smartBackspace: true,
        loop: true,
    })
})
</script>

<template>
    <div class="relative flex items-center">
        <input 
            class="w-full"
            type="text"

            v-model="stockName"

            @focus="isInputActive = true"
            @blur="isInputActive = false"
        />

        <Transition name="fade-out">
            <div 
                v-show="!isInputActive && !stockName.length"
                class="absolute text-white md:text-4xl left-12 flex transition-all duration-300"
            >
                <p ref="typingText"></p>
            </div>
        </Transition>

        <Transition name="fade-in">
            <button 
                class="absolute right-8 rounded-full bg-brand-200 border-4 border-brand-700 uppercase font-sans transition-all duration-300 md:text-4xl md:px-4 md:py-2"
                v-show="stockName.length"
            >
                Find
            </button>
        </Transition>
    </div>
</template>

<style scoped>
.fade-in-enter-to,
.fade-in-leave-from {
    opacity: 1;
    transform: translateX(0);
}

.fade-in-enter-from,
.fade-in-leave-to {
    opacity: 0;
    transform: translateX(30px)
}

.fade-out-enter-to,
.fade-out-leavet-from {
    opacity: 1;
}

.fade-out-enter-from,
.fade-out-leave-to {
    opacity: 0;
}
</style>