<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
  <div class="relative bg-dark-gradient h-screen z-10 before:absolute before:content-[''] before:bg-dark-gradient before:bg-blend-color-dodge before:bottom-0 before:top-1/2 before:inset-x-0 before:-z-[5]">
    
    <main class="h-full">
      <RouterView />
    </main>
  </div>
</template>