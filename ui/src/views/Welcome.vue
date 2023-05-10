<script setup>
import BaseButton from '@/components/BaseComponents/BaseButton.vue';
</script>

<template>
    <section class="h-full container flex justify-center items-center">
        <div class="relative flex flex-col md:gap-y-12 justify-center items-center block-shadow-layer z-10">
            <h1 class="text-white font-bold text-[64px] text-center">Happy to see you here!</h1>
            <div class="w-[420px]">
                <BaseButton 
                    color="green" 
                    hoverClasses="hover:bg-brand-700 hover:border-brand-700 hover:text-blue-700"
                    :link="{ name: 'auth' }"
                >
                    Start using
                </BaseButton>
            </div>
        </div>
    </section>
</template>