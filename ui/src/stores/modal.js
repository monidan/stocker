import { ref } from 'vue';
import { defineStore } from "pinia";

export const useModalStore = defineStore('modal', () => {
    const isModalActive = ref(false);

    function close() {
        isModalActive.value = false;
    }

    function open() {
        isModalActive.value = true;
    }

    return {
        isModalActive,

        close,
        open
    }
})