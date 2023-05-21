<script setup>
defineEmits(['backdrop-click']);
</script>

<template>
    <div class="absolute inset-0 bg-black/10 z-10 backdrop-blur-md" @click="$emit('backdrop-click')">
        
    </div>
</template>