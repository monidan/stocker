<script setup>
defineProps({
    type: {
        required: true,
        type: String,
        default: 'text',
    },
    modelValue: String,
    placeholder: String
});

defineEmits(['update:modelValue']);
</script>

<template>
    <input 
        class="w-full rounded-[120px] bg-blue-200 border-4 border-white md:px-10 md:py-12 md:text-4xl placeholder:text-white placeholder:font-sans text-white"

        :type="type"
        :placeholder="placeholder"

        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
    />
</template>