import { ref } from 'vue';
import { defineStore } from 'pinia'

import _axios from '@/shared/plugins/axios';
import { encodeToBase64 } from '@/shared/utils/crypto';

export const useAuthStore = defineStore('auth', () => {
  const isAuthenticated = ref(false);
  const token = ref('');
  const username = ref('');

  function setUsername(inputUsername) {
    username.value = inputUsername;
  }

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

  async function logInUser(username, password) {
    const encodedData = 
      [encodeToBase64(username), encodeToBase64(password)];
    return await _axios.request({
      method: 'GET', 
      url: '/auth',
      headers: {
        'Authorization': 'Bearer ' + encodedData.join('.'),
      }
    })
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
