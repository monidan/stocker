const axios = require('axios');

const PREDICTION_API_ENDPOINT = 'http://localhost:8000/stock_price';

class Stock {
    _stock;
    cachedPredictions;
    cachedStockHistories;

    constructor(stockName) {
        this._stock = stockName;

        this.cachedPredictions = new Map();
        this.cachedStockHistories = new Map();
    }

    async predictStock(stockName = this._stock) {
        if (this.cachedPredictions.has(stockName))
            return Promise.resolve({
                price: this.cachedPredictions.get(stockName),
                stock: stockName,
            });

        return await axios.request({
            url: PREDICTION_API_ENDPOINT,
            method: 'POST',
            data: {
                symbol: stockName
            }
        })
        .then(({data}) => {
            this.cachedPredictions.set(data.stock, data.price);
            return data;
        });
    }

    async getStockPriceHistory(stockName = this._stock) {
        if (this.cachedStockHistories.has(stockName))
            return Promise.resolve({
                stock: stockName,
                history: this.cachedStockHistories.get(stockName)
            })

        return await axios.request({
            method: 'GET',
            url: `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${stockName}&outputsize=compact&apikey=7NYLN5LMJVH1TEUR`
        })
        .then(({ data }) => {
            this.cachedStockHistories.set(stockName, data['Time Series (Daily)']);
            return data;
        })
    }
}

module.exports = Stock;