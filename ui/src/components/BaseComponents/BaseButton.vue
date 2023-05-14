<script setup>
import { computed } from 'vue';

const props = defineProps({
    color: {
        value: (v) => ['green', 'white'].includes(v),
        type: String,
        required: true,
        default: 'green',
    },
    outlined: Boolean,
    hoverClasses: {
        type: String,
        default: '',
    },
    link: {
        type: [String, Object],
        default: ''
    },
    disabled: Boolean,
    loading: Boolean,
});

const emits = defineEmits(['click']);

const colorClasses = computed(() => {
    switch(props.color) {
        case 'green': return isOutlinedClasses('bg-brand-400 border-brand-400 text-blue-400');
        case 'white': return isOutlinedClasses('bg-white border-white text-white');
    }
});

const isOutlinedClasses = (classes) => props.outlined 
    ? classes.trim().split(' ').map(className => className.includes('bg-') ? '' : className).join(' ')
    : classes;
</script>

<template>
    <div class="w-full">
        <template v-if="!Object.keys(link).length">
            <button
                class="flex justify-center border-4 rounded-[120px] md:py-8 md:text-4xl font-bold w-full transition-all duration-300"
                :class="[
                    colorClasses, 
                    hoverClasses,
                    loading || disabled ? '!bg-gray !text-blue-700/60 !border-gray' : ''
                ].join(' ')"
             
                :disabled="disabled || loading"
                
                @click="$emit('click')"
            >
                <span v-if="!loading">
                    <slot />
                </span>
                <span class="w-16 h-16 block border-4 border-dark-700/60 border-t-brand-700 rounded-full animate-spin" v-if="loading"></span>
            </button>
        </template>
    
        <template v-if="Object.keys(link).length">
            <router-link
                :to="link"
                class="block text-center border-4 rounded-[120px] md:py-8 md:text-4xl font-bold w-full transition-all duration-300"
                :class="[colorClasses, hoverClasses].join(' ')"
            >
                <slot />
            </router-link>
        </template>
    </div>
</template>