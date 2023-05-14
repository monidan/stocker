import axios from 'axios';

const API_ENDPOINT = 'http://127.0.0.1:3001/api';

const _axios = axios.create({
    baseURL: API_ENDPOINT,
})

export default _axios;