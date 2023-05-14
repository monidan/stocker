<script setup>
import { watch, computed } from 'vue';
import { Transition } from 'vue';

const props = defineProps({
    type: {
        type: String,
        validation: (v) => ['error', 'success', 'warning', 'info'].includes(v),
        default: 'success'
    },
    isOpen: {
        type: Boolean,
        default: false,
    },
    hideNotification: {
        type: Function,
        required: true,
        default: () => {}
    }
})

const isNotificationActive = computed(() => props.isOpen);

let timeout;

watch(isNotificationActive, () => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
        props.hideNotification();
    }, 2000);
})
</script>

<template>
    <Transition name="show-up">
        <div 
            class="border-4 md:min-w-[300px] md:max-w-[300px] rounded-[12px] absolute left-5 top-5 transition-all duration-300 z-20"
            :class="{
                'border-secondary-400 bg-secondary-200/[0.15] text-secondary-400': type === 'error',
                'border-green-700 bg-green-200/[0.15] text-green-700': type === 'success',
                '': type === 'info',
                '': type === 'warning',
            }"
    
            v-show="isOpen"
        >
            <div class="md:py-4 md:px-6">
                <slot />
            </div>
        </div>
    </Transition>
</template>

<style scoped>
    .show-up-enter-from,
    .show-up-leave-to {
        opacity: 0;
        transform: translateY(-100%);
    }

    .show-up-enter-to,
    .show-up-leave-from {
        opacity: 1;
        transform: translateY(0);
    }
</style>