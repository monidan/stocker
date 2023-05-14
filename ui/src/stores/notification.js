import { ref } from 'vue';
import { defineStore } from "pinia";

export const useNoficationStore = defineStore('notification', () => {
    const isNotificationActive = ref(false);
    const notificationText = ref('');
    const notificationType = ref('');

    function setNotificationText(text) {
        notificationText.value = text;
    }

    function setNotificationVisibility(isVisible) {
        isNotificationActive.value = isVisible;
    }

    function selectNotificationType(type) {
        switch(type) {
            case 'error': 
            case 'success':
            case 'info':
            case 'warning':
                notificationType.value = type;
                break;
            default: 
                console.error(`No notification of such type - ${type}.`);
        }
    }

    function pushNotification(type, text) {
        setNotificationVisibility(true);
        setNotificationText(text);
        selectNotificationType(type);
    }

    return {
        isNotificationActive,
        notificationText,
        notificationType,
        
        pushNotification,
        setNotificationVisibility,
    }
}) 