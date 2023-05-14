<script setup>
import { useField } from 'vee-validate';

const props = defineProps({
    name: String,
    type: {
        required: true,
        type: String,
        default: 'text',
    },
    modelValue: String,
    placeholder: String,
});

const {
    value: inputValue,
    errorMessage,
    handleBlur,
    handleChange,
    meta
} = useField(props.name, undefined, {
    initialValue: props.modelValue
})
</script>

<template>
    <div>
        <input 
            class="w-full rounded-[120px] bg-blue-200 border-4 border-white md:px-10 md:py-12 md:text-4xl placeholder:text-white focus:bg-blue-100 placeholder:font-sans text-white"
            :class="{ '!border-red-700 !shadow-red-700/30': !!errorMessage, 'border-green-700 !shadow-green-700/30': meta.valid && meta.dirty }"
    
            :name="name"
            :id="name"
            :type="type"
            :placeholder="placeholder"
    
            :value="inputValue"
            @input="handleChange"
            @blur="handleBlur"
        />
    
        <div class="md:pl-12 md:py-4">
            <small class="text-red-700 font-bold text-lg" v-show="errorMessage">{{ errorMessage }}</small>
        </div>
    </div>
</template>