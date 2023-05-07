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
        type: String || Object,
        default: ''
    },
    disabled: Boolean
});

defineEmits('click');

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
        
    <template v-if="!Object.keys(link).length">
        <button
            class="border-4 rounded-[120px] md:py-8 md:text-4xl font-bold w-full transition-all duration-300"
            :class="[colorClasses, hoverClasses].join(' ')"
         
            :disabled="disabled"
            
            @click="$emit('click')"
        >
            <slot />
        </button>
    </template>

    <router-link
        v-if="Object.keys(link).length"
        :to="link"
        class="block text-center border-4 rounded-[120px] md:py-8 md:text-4xl font-bold w-full transition-all duration-300"
        :class="[colorClasses, hoverClasses].join(' ')"
    >
        <slot />
    </router-link>
</template>