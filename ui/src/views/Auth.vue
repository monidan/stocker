<script setup>
import { ref } from 'vue';
import { useForm } from 'vee-validate';
import { string } from 'yup';
import { useRouter } from 'vue-router';

import { useAuthStore } from '@/stores/auth';
import { useNotificationStore } from '@/stores/notification';

import BaseInput from '@/components/BaseComponents/BaseInput.vue';
import BaseButton from '@/components/BaseComponents/BaseButton.vue';

const router = useRouter();

const authStore = useAuthStore();
const notificationStore = useNotificationStore();

const login = ref('');
const password = ref('');
const isLoading = ref(false);

const {
  validate
} = useForm({
  validationSchema: {
    login: string().required('Username is required!'),
    password: string().required('Password is required')
  }
})

async function submitForm() {
    const {
      valid
    } = await validate();

    if (valid) {
      isLoading.value = true;

      await authStore.logInUser(login.value, password.value)
        .then(() => {
          authStore.setUsername(login.value);
          authStore.authenticateApp();
          router.push({ name: 'main' });
        })
        .catch(err => notificationStore.pushNotification('error', 'Auth error!'))
        .finally(() => isLoading.value = true);
    }
}
</script>

<template>
  <section class="h-full">
    <div class="container h-full flex items-center justify-center">
      <form @submit.prevent class="relative grow md:max-w-[800px] flex flex-col md:gap-y-14 block-shadow-layer z-10">
        <BaseInput 
          name="login"
          type="text"
          placeholder="Username"

          v-model="login"
        />

        <BaseInput 
          name="password"
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
            
            :loading="isLoading"

            @click="submitForm"
          >
            Log In
          </BaseButton>
        </div>
      </form>
    </div>
  </section>
</template>

