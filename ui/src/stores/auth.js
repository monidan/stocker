import { ref } from 'vue';
import { defineStore } from 'pinia'

import _axios from '@/shared/plugins/axios';

export const useAuthStore = defineStore('auth', () => {
  const isAuthenticated = ref(false);
  const token = ref('');
  const username = ref('');

  async function registerUser(username, password) {
      return await _axios.request({
        method: 'POST',
        url: '/sign-up',
        data: {
          username,
          password,
        },
      })
  }

  function setUsername(inputUsername) {
    username.value = inputUsername;
  }

  function logInUser() {

  }

  return { 
    isAuthenticated,
    token,
    username,

    registerUser,
    logInUser,
    setUsername,
  }
})
