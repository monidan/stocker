<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router'
import { useForm } from 'vee-validate';
import { string, ref as yupRef, object } from 'yup';

import { useAuthStore } from '@/stores/auth';
import { useNoficationStore } from '@/stores/notification';

import BaseInput from '@/components/BaseComponents/BaseInput.vue';
import BaseButton from '@/components/BaseComponents/BaseButton.vue';

const router = useRouter();

const form = ref({
  login: '',
  password: '',
  confirmPassword: ''
});
const isLoading = ref(false);

const authStore = useAuthStore();
const notificationStore = useNoficationStore();

const {
  meta,
  resetForm
} = useForm({
    validationSchema: object({
      login: string().required('Username is required'),
      password: string().required('Password is required'),
      confirmPassword: string().required()
        .oneOf([yupRef('password')], 'Passwords do not match!'),
    })
})

async function register() {
  isLoading.value = true;

  return await authStore.registerUser(form.value.login, form.value.password)
    .then(({ data }) => authStore.setUsername(data.username))
    .then(() => {
      // todo: implement setting of JWT token
      notificationStore.pushNotification('success', 'User was successfully registered!');
      router.push({ name: 'auth' });
      resetForm();
    })
    .catch(err => notificationStore.pushNotification('error', 'Auth error!'))
    .finally(() => isLoading.value = false);
}
</script>

<template>
  <section class="h-full">
    <div class="container h-full flex items-center justify-center">
      <form @submit.prevent class="relative grow md:max-w-[800px] flex flex-col md:gap-y-7 block-shadow-layer z-10">
        <BaseInput
          name="login"
          type="text"
          placeholder="Username"

          v-model="form.login"
        />

        <BaseInput 
          name="password"
          type="password"
          placeholder="Password"

          v-model="form.password"
        />

        <BaseInput
          name="confirmPassword" 
          type="password"
          placeholder="Confirm password"

          v-model="form.confirmPassword"
        />

        <div class="flex justify-between md:gap-x-14 w-full">
          <BaseButton 
            color="green"
            hoverClasses="hover:bg-brand-700 hover:border-brand-700 hover:text-blue-700"

            :loading="isLoading"
            :disabled="!meta.valid"

            @click="register"
          >
            Sign Up
          </BaseButton>
        </div>
      </form>
    </div>
  </section>
</template>
