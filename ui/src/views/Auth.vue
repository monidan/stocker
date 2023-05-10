<script setup>
import { ref } from 'vue';

import BaseInput from '@/components/BaseComponents/BaseInput.vue';
import BaseButton from '@/components/BaseComponents/BaseButton.vue';

const login = ref('');
const password = ref('');
</script>

<template>
  <section class="h-full">
    <div class="container h-full flex items-center justify-center">
      <form class="relative grow md:max-w-[800px] flex flex-col md:gap-y-14 block-shadow-layer z-10">
        <BaseInput 
          type="text"
          placeholder="Username"

          v-model="login"
        />

        <BaseInput 
          type="password"
          placeholder="Password"

          v-model="password"
        />

        <div class="flex justify-between md:gap-x-14 w-full">
          <BaseButton 
            color="green"
            hoverClasses="hover:bg-brand-700 hover:border-brand-700 hover:text-blue-700"

            :link="{ name: 'signUp' }"
          >
            Sign Up
          </BaseButton>

          <BaseButton 
            color="white" 
            hoverClasses="hover:text-blue-700 fade-in-bg-to-right before:bg-white relative overflow-hidden z-10"
            :outlined="true"
          >
            Log In
          </BaseButton>
        </div>
      </form>
    </div>
  </section>
</template>

