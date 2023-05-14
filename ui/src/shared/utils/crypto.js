export const encodeToBase64 = (text) => window.btoa 
    ? window.btoa(text) 
    : new Error('Issue with window.btoa method.');