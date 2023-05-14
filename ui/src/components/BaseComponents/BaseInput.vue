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