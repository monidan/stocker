import path from 'path';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

import tailwindConfig from './tailwind.config';

export default () => defineConfig({
    define: {
        tailwindConfig,
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
    plugins: [
        vue(),
    ]
});