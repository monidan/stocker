import { ref, computed } from 'vue';
import { defineStore } from "pinia";

import _axios from '@/shared/plugins/axios';

export const usePortfolioStore = defineStore('portfolio', () => {
    const portfolio = ref([]);

    async function fetchPortfolio(username) {
        return await _axios.request({
            method: 'POST',
            url: '/portfolio',
            data: {
                username,
            }
        })
        .then(({ data }) => {
            portfolio.value = data.data.stocks;
            return portfolio.value;
        }) 
    }

    async function addStockToPortfolio(username, { stockName, amount, price }) {
        return await _axios.request({
            method: 'POST',
            url: '/add-investment',
            data: {
                username,
                amount,
                stock: stockName,
                averagePrice: price
            }
        })
        .then(({ data }) => {
            portfolio.value = data.data.stocks;
            return portfolio.value;
        })
    }

    async function deleteStockFromPortfolio(username, { stockName }) {
        return await _axios.request({
            method: 'POST',
            url: '/delete-investment',
            data: {
                username,
                stock: stockName
            }
        })
        .then(({ data }) => {
            portfolio.value = data.data.stocks;
            return portfolio.value;
        })
    }

    return {
        portfolio,

        fetchPortfolio,
        addStockToPortfolio,
        deleteStockFromPortfolio
    }
})