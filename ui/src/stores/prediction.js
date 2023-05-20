import { defineStore } from "pinia";

import _axios from '@/shared/plugins/axios';

export const usePredictionStore = defineStore('prediction', () => {
    async function pullStockHistoryData(stockName = '') {
        if (!stockName.length) return console.error('No stockname provided for pulling.');
        return await _axios.request({
            method: 'POST',
            url: '/retrieve-stock-history',
            data: {
                stock: stockName,
            }
        })
    }
    async function predictStockPrice(stockName = '') {
        if (!stockName.length) return console.error('No stockname provided for predicting.');
        return await _axios.request({
            method: 'POST',
            url: '/predict-stock',
            data: {
                stock: stockName,
            }
        })
    }

    async function fetchDataForPredictionChart(stock) {
        return await Promise.all([
            pullStockHistoryData(stock),
            predictStockPrice(stock),
        ])
    }

    return {
        fetchDataForPredictionChart
    }
})